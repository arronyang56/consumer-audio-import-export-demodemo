#!/usr/bin/env node

const http = require("http");
const https = require("https");

const DEFAULT_TARGETS = [
  "https://logismaster.cn/health",
  "https://156-238-241-168.sslip.io/health",
  "https://logismaster.cn/",
  "https://156-238-241-168.sslip.io/"
];

const targets = (process.env.HEALTH_TARGETS || "")
  .split(/\s+/)
  .map((item) => item.trim())
  .filter(Boolean);

const urls = targets.length ? targets : DEFAULT_TARGETS;
const timeoutMs = Number(process.env.HEALTH_TIMEOUT_MS || 15000);

function requestUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;
    const req = client.get(url, { timeout: timeoutMs, headers: { "User-Agent": "logismaster-health-check/1.0" } }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
        if (body.length > 200000) req.destroy(new Error("Response body too large"));
      });
      res.on("end", () => resolve({ url, statusCode: res.statusCode, body }));
    });
    req.on("timeout", () => req.destroy(new Error(`Timed out after ${timeoutMs}ms`)));
    req.on("error", reject);
  });
}

function validate(result) {
  const okStatus = result.statusCode >= 200 && result.statusCode < 300;
  if (!okStatus) return `HTTP ${result.statusCode}`;

  if (/\/health(?:\?|$)/.test(result.url)) {
    try {
      const parsed = JSON.parse(result.body);
      return parsed.ok ? "" : "Health endpoint returned ok=false";
    } catch {
      return "Health endpoint did not return JSON";
    }
  }

  return /LogisMaster|物流查询平台|Trade Intelligence Desk/i.test(result.body)
    ? ""
    : "Homepage marker not found";
}

(async () => {
  const failures = [];

  for (const url of urls) {
    try {
      const result = await requestUrl(url);
      const failure = validate(result);
      if (failure) {
        failures.push(`${url} - ${failure}`);
        console.error(`FAIL ${url} ${failure}`);
      } else {
        console.log(`OK   ${url}`);
      }
    } catch (error) {
      failures.push(`${url} - ${error.message || error}`);
      console.error(`FAIL ${url} ${error.message || error}`);
    }
  }

  if (failures.length) {
    console.error(`Health check failed for ${failures.length} target(s).`);
    process.exit(1);
  }
})();
