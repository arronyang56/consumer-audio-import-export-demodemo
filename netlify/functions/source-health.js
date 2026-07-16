const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");

const CACHE_MAX_AGE_MS = 30 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 6000;
const CACHE_FILE = "source-health-cache.json";

const targets = [
  { id: "china-customs-tariff", name: "中国海关税目税号查询", url: "https://online.customs.gov.cn/ocportal/mySearch/" },
  { id: "china-mofcom-trade-remedy", name: "商务部贸易救济调查局", url: "https://tdi.mofcom.gov.cn/" },
  { id: "china-cnca", name: "国家认监委强制性产品认证", url: "https://www.cnca.gov.cn/hlwfw/ywzl/qzxcprz/index.html" },
  { id: "china-msa", name: "中国海事局", url: "https://www.msa.gov.cn/" },
  { id: "china-nmc", name: "中央气象台", url: "https://www.nmc.cn/" },
  { id: "caac", name: "中国民用航空局", url: "https://www.caac.gov.cn/" },
  { id: "unlocode", name: "UN/LOCODE", url: "https://unece.org/trade/cefact/unlocode-code-list-country-and-territory" },
  { id: "maersk-schedules", name: "Maersk Point-to-Point Schedules", url: "https://www.maersk.com/schedules/point-to-point" },
  { id: "oocl-schedules", name: "OOCL Sailing Schedules", url: "https://www.oocl.com/eng/ourservices/eservices/sailingschedule/Pages/default.aspx" },
  { id: "aviationweather-api", name: "AviationWeather Data API", url: "https://aviationweather.gov/data/api/" },
  { id: "noaa-marine", name: "NOAA Marine Forecast", url: "https://www.weather.gov/marine/" },
  { id: "jtwc", name: "JTWC Tropical Cyclone Warnings", url: "https://www.metoc.navy.mil/jtwc/jtwc.html" }
];

function response(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(payload)
  };
}

function cachePath() {
  const dataDir = process.env.LOCAL_DATA_DIR || "/tmp";
  return path.join(dataDir, CACHE_FILE);
}

function readCache() {
  try {
    const parsed = JSON.parse(fs.readFileSync(cachePath(), "utf8"));
    const checkedAt = Date.parse(parsed.checkedAt || "");
    if (!Number.isFinite(checkedAt) || Date.now() - checkedAt > CACHE_MAX_AGE_MS) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function writeCache(payload) {
  try {
    fs.mkdirSync(path.dirname(cachePath()), { recursive: true });
    fs.writeFileSync(cachePath(), JSON.stringify(payload), { mode: 0o600 });
  } catch (error) {
    // A read-only runtime should not prevent the live result from being returned.
  }
}

function conciseFailure(error = {}) {
  if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") return "timeout";
  if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") return "dns";
  if (error.code === "ECONNREFUSED") return "refused";
  return "network";
}

function probeUrl(rawUrl, redirectsLeft = 3, startedAt = Date.now()) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      resolve({ ...result, latencyMs: Date.now() - startedAt });
    };

    let url;
    try {
      url = new URL(rawUrl);
    } catch (error) {
      finish({ reachable: false, reason: "invalid-url", statusCode: 0 });
      return;
    }

    const client = url.protocol === "http:" ? http : https;
    const request = client.request(url, {
      method: "HEAD",
      headers: {
        "User-Agent": "LogisMaster-Source-Health/1.0",
        Accept: "text/html,application/json;q=0.9,*/*;q=0.5"
      }
    }, (res) => {
      const statusCode = Number(res.statusCode || 0);
      const location = res.headers.location;
      res.resume();
      if (location && statusCode >= 300 && statusCode < 400 && redirectsLeft > 0) {
        settled = true;
        resolve(probeUrl(new URL(location, url).toString(), redirectsLeft - 1, startedAt));
        return;
      }
      finish({
        reachable: statusCode > 0 && statusCode < 500,
        reason: statusCode >= 500 ? "server-error" : "",
        statusCode
      });
    });

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      const timeoutError = new Error("timeout");
      timeoutError.code = "ETIMEDOUT";
      request.destroy(timeoutError);
    });
    request.on("error", (error) => finish({ reachable: false, reason: conciseFailure(error), statusCode: 0 }));
    request.end();
  });
}

async function checkTargets() {
  const sources = await Promise.all(targets.map(async (target) => {
    const result = await probeUrl(target.url);
    return {
      id: target.id,
      name: target.name,
      reachable: result.reachable,
      statusCode: result.statusCode,
      latencyMs: result.latencyMs,
      reason: result.reason
    };
  }));
  return { ok: true, checkedAt: new Date().toISOString(), sources };
}

exports.handler = async (event = {}) => {
  if (event.httpMethod === "OPTIONS") return response(204, {});
  if (event.httpMethod !== "GET") return response(405, { ok: false, message: "Method not allowed" });

  const refresh = event.queryStringParameters?.refresh === "1";
  const cached = refresh ? null : readCache();
  if (cached) return response(200, { ...cached, cached: true });

  try {
    const payload = await checkTargets();
    writeCache(payload);
    return response(200, { ...payload, cached: false });
  } catch (error) {
    return response(502, { ok: false, message: "关键来源在线检查暂不可用" });
  }
};

exports._private = { probeUrl, targets };
