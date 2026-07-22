#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

function readArgument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function serviceIdFromUrl(url) {
  try {
    const fileName = path.basename(decodeURIComponent(new URL(url).pathname)).replace(/\s+/g, "");
    return fileName.match(/^([A-Z0-9]+)_LT\.pdf$/i)?.[1]?.toUpperCase() || "";
  } catch (_error) {
    return "";
  }
}

function configuredServices(manifest) {
  const rows = new Map();
  (manifest.services || []).forEach((service) => rows.set(service.id.toUpperCase(), { ...service }));
  (manifest.discoverServiceIds || []).forEach((rawId) => {
    const id = String(rawId).toUpperCase();
    if (!rows.has(id)) rows.set(id, { id, fileName: `${id}_LT.pdf` });
  });
  return Array.from(rows.values());
}

function isPdf(body) {
  return body?.length >= 4096 && body.subarray(0, 5).toString("ascii") === "%PDF-";
}

async function fetchPdf(context, url, sourcePage) {
  const response = await context.request.get(url, {
    failOnStatusCode: false,
    headers: {
      accept: "application/pdf,application/octet-stream;q=0.9,*/*;q=0.8",
      referer: sourcePage
    },
    timeout: 45000
  });
  const body = await response.body();
  if (!response.ok() || !isPdf(body)) {
    throw new Error(`HTTP ${response.status()} returned ${body.length} non-PDF bytes`);
  }
  return body;
}

async function main() {
  const manifestPath = path.resolve(readArgument("--manifest", "scripts/oocl-schedule-services.json"));
  const outputDirectory = path.resolve(readArgument("--output", ".schedule-downloads"));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const services = configuredServices(manifest);
  fs.mkdirSync(outputDirectory, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    acceptDownloads: true,
    locale: "en-US",
    userAgent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/${browser.version()} Safari/537.36`
  });
  const page = await context.newPage();
  const failures = [];
  const downloaded = [];
  let discoveredLinkCount = 0;

  try {
    await page.goto(manifest.sourcePage, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);
    const officialLinks = await page.locator("a[href]").evaluateAll((anchors) => anchors
      .map((anchor) => anchor.href)
      .filter((href) => {
        try {
          return /_LT\.pdf(?:$|\?)/i.test(decodeURIComponent(href));
        } catch (_error) {
          return false;
        }
      }));
    discoveredLinkCount = officialLinks.length;
    const discovered = new Map();
    officialLinks.forEach((url) => {
      const id = serviceIdFromUrl(url);
      if (id) discovered.set(id, url);
    });

    let cursor = 0;
    const worker = async () => {
      while (cursor < services.length) {
        const service = services[cursor++];
        const id = service.id.toUpperCase();
        const fileName = service.fileName || `${id}_LT.pdf`;
        const fallbackUrl = service.url || new URL(encodeURIComponent(fileName), manifest.pdfBaseUrl).href;
        const url = discovered.get(id) || fallbackUrl;
        try {
          const body = await fetchPdf(context, url, manifest.sourcePage);
          fs.writeFileSync(path.join(outputDirectory, fileName), body);
          downloaded.push({ id, fileName, bytes: body.length, url });
        } catch (error) {
          failures.push({ id, reason: error.message });
        }
      }
    };
    await Promise.all(Array.from({ length: 4 }, () => worker()));
  } finally {
    await context.close();
    await browser.close();
  }

  const result = {
    sourcePage: manifest.sourcePage,
    discoveredLinks: discoveredLinkCount,
    requested: services.length,
    downloaded: downloaded.length,
    failures
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (downloaded.length < 8) process.exitCode = 2;
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 2;
});
