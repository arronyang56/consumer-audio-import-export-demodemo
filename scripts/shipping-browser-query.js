#!/usr/bin/env node
"use strict";

/**
 * Optional browser automation runner for authorized shipping websites.
 *
 * It intentionally reads credentials only from environment variables. Do not
 * put usernames/passwords in frontend code or checked-in files.
 */

function arg(name, fallback = "") {
  const prefix = `--${name}=`;
  const hit = process.argv.find((item) => item.startsWith(prefix));
  return hit ? hit.slice(prefix.length).trim() : fallback;
}

function clean(value = "") {
  return String(value || "").trim().slice(0, 160);
}

function fail(code, message, extra = {}) {
  process.stdout.write(JSON.stringify({ ok: false, code, message, ...extra }, null, 2));
  process.exit(0);
}

function ok(payload) {
  process.stdout.write(JSON.stringify({ ok: true, ...payload }, null, 2));
  process.exit(0);
}

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch (error) {
    const modulePath = process.env.PLAYWRIGHT_MODULE_PATH || "/opt/hs-platform-deps/node_modules/playwright/index.mjs";
    try {
      return await import(modulePath);
    } catch (fallbackError) {
      fail(
        "PLAYWRIGHT_NOT_INSTALLED",
        "服务器尚未安装 Playwright，不能执行网页登录脚本；当前仍可使用 ShipXY API、船司或码头官网复核。",
        { detail: fallbackError.message || error.message }
      );
    }
  }
}

async function fillFirstVisible(page, selectors = [], value = "") {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    try {
      if ((await locator.count()) && (await locator.isVisible({ timeout: 800 }))) {
        await locator.fill(value);
        return selector;
      }
    } catch {
      // Try next selector.
    }
  }
  return "";
}

async function clickText(page, patterns = []) {
  for (const pattern of patterns) {
    const locator = page.getByText(pattern, { exact: false }).first();
    try {
      if ((await locator.count()) && (await locator.isVisible({ timeout: 1000 }))) {
        await locator.click();
        return String(pattern);
      }
    } catch {
      // Try next text.
    }
  }
  return "";
}

function parseCommonShippingText(text = "") {
  const compact = text.replace(/\s+/g, " ").trim();
  const eta = compact.match(/\bETA\*?[:：]?\s*([0-9]{4}[-/][0-9]{1,2}[-/][0-9]{1,2}(?:\s+[0-9]{1,2}:[0-9]{2})?)/i)?.[1] ||
    compact.match(/预计到港[:：]?\s*([^；;，,。]+)/)?.[1] ||
    compact.match(/靠泊(?:时间)?[:：]?\s*([^；;，,。]+)/)?.[1] ||
    "";
  const status = compact.match(/(已放行|未放行|查验中|查验|可提|不可提|已靠泊|未靠泊|延误|Delay|Released|Hold|Inspection)[^；;，,。]*/i)?.[0] || "";
  const vessel = compact.match(/(?:船名|Vessel)[:：]?\s*([A-Z0-9 .'-]{3,60})/i)?.[1] || "";
  const voyage = compact.match(/(?:航次|Voyage)[:：]?\s*([A-Z0-9-]{2,30})/i)?.[1] || "";
  const container = compact.match(/[A-Z]{4}\d{7}/)?.[0] || "";
  return { eta, status, vessel, voyage, container, rawText: compact.slice(0, 4000) };
}

const knownShipMmsi = {
  "xin zhanjiang": "413150000",
  "xin zhan jiang": "413150000"
};

const knownShipImo = {
  "xin zhanjiang": "9378814",
  "xin zhan jiang": "9378814"
};

function knownMmsiForVessel(name = "") {
  const key = String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
  return knownShipMmsi[key] || "";
}

function knownImoForVessel(name = "") {
  const key = String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
  return knownShipImo[key] || "";
}

function parsePositionFromText(text = "") {
  const compact = text.replace(/\s+/g, " ").trim();
  const latestEvent = compact.match(/Events\s+Time\s+Event\s+Details\s+Position\s*\/\s*Dest\s+Info\s+(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})\s+([A-Z ]+?)\s+(?:---|[A-Z][A-Z0-9 .-]+?)\s+(-?\d{1,2}\.\d{3,})\s*\/\s*(-?\d{1,3}\.\d{3,})(?:\s+([A-Z]{2}\s+[A-Z]{3}\s*>\s*[A-Z]{2}\s+[A-Z]{3}))?[\s\S]{0,160}?Speed:\s*([0-9.]+\s*kn)?/i);
  if (latestEvent) {
    return {
      lat: latestEvent[3],
      lon: latestEvent[4],
      speed: latestEvent[6] || "",
      destination: latestEvent[5] || "",
      status: latestEvent[2]?.trim() || "",
      reportedAt: `${latestEvent[1]} UTC`
    };
  }
  const latLon =
    compact.match(/Lat(?:itude)?[:：]?\s*(-?\d+(?:\.\d+)?)\D+Lon(?:gitude)?[:：]?\s*(-?\d+(?:\.\d+)?)/i) ||
    compact.match(/Latitude\s*(-?\d+(?:\.\d+)?)\s*Longitude\s*(-?\d+(?:\.\d+)?)/i) ||
    compact.match(/\b(-?\d{1,2}\.\d{3,})\s*[,/]\s*(-?\d{1,3}\.\d{3,})\b/);
  const speed = compact.match(/Speed[:：]?\s*([0-9.]+\s*(?:kn|kts|knots)?)/i)?.[1] || "";
  const destination = compact.match(/Destination[:：]?\s*([^；;，,|]+)/i)?.[1] || "";
  const reportedAt = compact.match(/(?:Last\s+Report|Updated|Received|reported\s+on)[:：]?\s*([^；;，,|]+)/i)?.[1] || "";
  if (!latLon) return { speed, destination, reportedAt };
  return {
    lat: latLon[1],
    lon: latLon[2],
    speed,
    destination,
    reportedAt
  };
}

async function queryShipfinder(page, input) {
  const mmsi = input.mmsi || knownMmsiForVessel(input.vessel);
  const imo = input.imo || knownImoForVessel(input.vessel);
  if (!mmsi) {
    fail("SHIPFINDER_MMSI_REQUIRED", "Shipfinder 当前脚本需要 MMSI；已内置 XIN ZHANJIANG 的测试映射，其他船名请补 MMSI 或继续用 ShipXY API。");
  }
  const sources = [
    { name: "Shipfinder public page", url: `https://www.shipfinder.com/ship/detail/mmsi/${mmsi}` },
    ...(imo ? [{ name: "VesselFinder public page", url: `https://www.vesselfinder.com/vessels/details/${imo}` }] : []),
    ...(imo ? [{ name: "MyShipTracking public page", url: `https://www.myshiptracking.com/vessels/${mmsi}-mmsi-${mmsi}-imo-${imo}` }] : [])
  ];
  let lastError = "";
  let text = "";
  let usedSource = sources[0];
  for (const source of sources) {
    try {
      await page.goto(source.url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(4500);
      text = await page.locator("body").innerText({ timeout: 10000 });
      usedSource = source;
      if (text && !/Access denied|Forbidden|Service Unavailable|captcha|验证码|verify|robot|人机/i.test(text)) break;
    } catch (error) {
      lastError = error.message || String(error);
      text = "";
    }
  }
  if (!text || /Access denied|Forbidden|Service Unavailable/i.test(text)) {
    fail("SHIPFINDER_PUBLIC_PAGE_BLOCKED", "Shipfinder 及公共备用船位页未向服务器返回可用内容，可能限制机房 IP；请稍后重试或补充 MMSI/IMO。", { detail: lastError || text.slice(0, 160) });
  }
  if (/captcha|验证码|verify|robot|人机/i.test(text)) {
    fail("SHIPFINDER_VERIFY_REQUIRED", "公共船位页面出现人机验证，脚本不绕过验证。", { url: usedSource.url });
  }
  const parsed = parseCommonShippingText(text);
  const position = parsePositionFromText(text);
  ok({
    source: usedSource.name,
    queriedAt: new Date().toISOString(),
    input: { ...input, mmsi, imo },
    result: {
      ...parsed,
      vessel: input.vessel || parsed.vessel || "",
      destination: position.destination || input.destination || "",
      status: position.status || parsed.status || "",
      position: position.lat && position.lon ? { lat: position.lat, lon: position.lon, speed: position.speed, updatedAt: position.reportedAt } : {},
      rawText: text.replace(/\s+/g, " ").trim().slice(0, 4000)
    },
    sourceLinks: [{ name: usedSource.name, url: usedSource.url }],
    note: "脚本已读取免登录公共船位页面；如没有坐标，说明页面未暴露结构化位置或需要人工验证。"
  });
}

async function queryShipxy(page, input) {
  await page.goto("https://www.shipxy.com/", { waitUntil: "domcontentloaded", timeout: 45000 });

  const username = process.env.SHIPXY_USERNAME || "";
  const password = process.env.SHIPXY_PASSWORD || "";
  if (username && password) {
    await clickText(page, [/登录|Login|Sign in/i]);
    await fillFirstVisible(page, [
      "input[name*=user i]",
      "input[name*=phone i]",
      "input[type='text']",
      "input[type='email']"
    ], username);
    await fillFirstVisible(page, ["input[type='password']", "input[name*=pass i]"], password);
    await clickText(page, [/登录|Login|Sign in/i]);
    await page.waitForTimeout(2500);
  }

  const searchSelector = await fillFirstVisible(page, [
    "input[type='search']",
    "input[placeholder*='船']",
    "input[placeholder*='ship' i]",
    "input[type='text']"
  ], input.vessel || input.mmsi || "");
  if (!searchSelector) {
    fail("SHIPXY_SEARCH_BOX_NOT_FOUND", "船讯网页面没有找到可自动填写的搜索框，可能改版或需要人工验证。");
  }
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  const text = await page.locator("body").innerText({ timeout: 10000 });
  ok({
    source: "ShipXY browser automation",
    queriedAt: new Date().toISOString(),
    input,
    result: parseCommonShippingText(text),
    note: "浏览器脚本已登录/搜索并抽取页面文字；如页面出现滑块或验证码，需要查询人完成验证后再运行。"
  });
}

async function queryHb56(page, input) {
  await page.goto("https://www.hb56.com/Index.aspx", { waitUntil: "domcontentloaded", timeout: 45000 });

  const username = process.env.HB56_USERNAME || "";
  const password = process.env.HB56_PASSWORD || "";
  if (username && password) {
    await fillFirstVisible(page, ["input[name*=user i]", "input[id*=user i]", "input[type='text']"], username);
    await fillFirstVisible(page, ["input[type='password']", "input[name*=pass i]", "input[id*=pass i]"], password);
    await clickText(page, [/登录|Login|Sign in/i]);
    await page.waitForTimeout(3000);
  }

  const queryValue = input.container || input.bl || input.vessel || "";
  const querySelector = await fillFirstVisible(page, [
    "input[placeholder*='箱']",
    "input[placeholder*='提单']",
    "input[name*=container i]",
    "input[name*=bill i]",
    "input[type='text']"
  ], queryValue);
  if (!querySelector) {
    fail("HB56_QUERY_BOX_NOT_FOUND", "港航纵横页面没有找到可自动填写的查询框，可能需要人工选择菜单或验证。");
  }
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  const text = await page.locator("body").innerText({ timeout: 10000 });
  ok({
    source: "HB56 browser automation",
    queriedAt: new Date().toISOString(),
    input,
    result: parseCommonShippingText(text),
    note: "浏览器脚本已尝试查询箱货/放行状态；如页面出现验证码、滑块或二次登录，需要查询人完成验证。"
  });
}

async function querySipg(page, input) {
  await page.goto("https://www.sipg.com.cn/conquery/index", { waitUntil: "domcontentloaded", timeout: 45000 });

  const queryValue = input.container || input.bl || "";
  if (!queryValue) {
    fail("SIPG_QUERY_EMPTY", "上港集团箱货查询需要箱号或提单号。");
  }

  const bodyTextBefore = await page.locator("body").innerText({ timeout: 10000 }).catch(() => "");
  if (/验证码|滑动|拖动|verify|captcha|人机/i.test(bodyTextBefore)) {
    fail("SIPG_MANUAL_VERIFY_REQUIRED", "上港集团页面出现验证码或滑动验证，需要查询人在原网站完成验证。");
  }

  const querySelector = await fillFirstVisible(page, [
    "input[placeholder*='箱']",
    "input[placeholder*='单']",
    "input[name*=container i]",
    "input[name*=bill i]",
    "input[type='search']",
    "input[type='text']"
  ], queryValue);
  if (!querySelector) {
    fail("SIPG_QUERY_BOX_NOT_FOUND", "上港集团页面没有找到可自动填写的查询框，可能改版或需要先完成滑块验证。");
  }

  const clicked = await clickText(page, [/查询|搜索|Search|提交/i]);
  if (!clicked) await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  const text = await page.locator("body").innerText({ timeout: 10000 });
  if (/验证码|滑动|拖动|verify|captcha|人机/i.test(text)) {
    fail("SIPG_MANUAL_VERIFY_REQUIRED", "上港集团页面要求验证码或滑动验证，脚本不绕过验证。");
  }
  ok({
    source: "SIPG browser automation",
    queriedAt: new Date().toISOString(),
    input,
    result: parseCommonShippingText(text),
    note: "浏览器脚本已尝试读取上海港箱货状态；如状态为空，请用原网站截图复核查询条件。"
  });
}

async function main() {
  const source = clean(arg("source", "shipxy")).toLowerCase();
  const input = {
    vessel: clean(arg("vessel")),
    destination: clean(arg("destination")),
    imo: clean(arg("imo")),
    mmsi: clean(arg("mmsi")),
    container: clean(arg("container")),
    bl: clean(arg("bl"))
  };
  if (!input.vessel && !input.mmsi && !input.container && !input.bl) {
    fail("QUERY_EMPTY", "请输入船名、MMSI、箱号或提单号。");
  }

  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({
    headless: process.env.SHIPPING_BROWSER_HEADLESS !== "0",
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const page = await browser.newPage({
    locale: "zh-CN",
    timezoneId: "Asia/Shanghai",
    viewport: { width: 1366, height: 900 }
  });

  try {
    if (source === "shipfinder") await queryShipfinder(page, input);
    if (source === "hb56") await queryHb56(page, input);
    if (source === "sipg") await querySipg(page, input);
    await queryShipxy(page, input);
  } catch (error) {
    fail("BROWSER_QUERY_FAILED", error.message || "浏览器查询失败。");
  } finally {
    await browser.close().catch(() => {});
  }
}

main();
