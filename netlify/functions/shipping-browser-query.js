const { spawn } = require("child_process");
const path = require("path");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
    },
    body: JSON.stringify(body)
  };
}

function clean(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 160);
}

function runBrowserQuery(params = {}) {
  return new Promise((resolve) => {
    if (process.env.ENABLE_SHIPPING_BROWSER_QUERY !== "1") {
      resolve({
        ok: false,
        code: "BROWSER_QUERY_DISABLED",
        message: "服务器浏览器查询尚未启用；需要安装 Playwright 并配置 ENABLE_SHIPPING_BROWSER_QUERY=1。"
      });
      return;
    }

    const scriptPath = path.join(process.cwd(), "scripts", "shipping-browser-query.js");
    const args = [
      scriptPath,
      `--source=${clean(params.source || "shipxy")}`,
      `--vessel=${clean(params.vessel || params.shipname)}`,
      `--destination=${clean(params.destination)}`,
      `--imo=${clean(params.imo)}`,
      `--mmsi=${clean(params.mmsi)}`,
      `--container=${clean(params.container)}`,
      `--bl=${clean(params.bl)}`
    ];

    const child = spawn(process.execPath, args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 90000
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
    });
    child.on("error", (error) => {
      resolve({ ok: false, code: "BROWSER_QUERY_SPAWN_FAILED", message: error.message });
    });
    child.on("close", () => {
      try {
        resolve(JSON.parse(stdout || "{}"));
      } catch {
        resolve({
          ok: false,
          code: "BROWSER_QUERY_BAD_OUTPUT",
          message: "浏览器脚本没有返回可解析的 JSON。",
          stderr: stderr.slice(0, 800),
          stdout: stdout.slice(0, 800)
        });
      }
    });
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });
  const params = event.queryStringParameters || {};
  const token = process.env.SHIPPING_BROWSER_QUERY_TOKEN || "";
  const suppliedToken = params.token || event.headers?.["x-access-token"] || event.headers?.["X-Access-Token"] || "";
  if (token && suppliedToken !== token) {
    return json(403, { ok: false, code: "FORBIDDEN", message: "Browser query token is required." });
  }
  const result = await runBrowserQuery(params);
  return json(200, {
    ...result,
    queriedAt: new Date().toISOString()
  });
};
