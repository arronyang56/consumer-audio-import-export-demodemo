const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const accessAuth = require("./access-auth")._private;

const FILE_NAME = "schedule-records.json";
const MAX_IMPORT_RECORDS = 1000;
const MAX_STORED_RECORDS = 5000;
const ALLOWED_SOURCE_IDS = new Set([
  "maersk-point-to-point",
  "oocl-schedule-download",
  "hapag-schedule-download",
  "one-point-to-point",
  "cosco-service-schedule",
  "cma-cgm-schedules",
  "lufthansa-cargo-download",
  "cathay-cargo-download",
  "cargolux-schedule"
]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
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

function cleanText(value = "", maxLength = 160) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanCode(value = "") {
  return cleanText(value, 12).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function parseDate(value = "", endOfDay = false) {
  const text = cleanText(value, 32);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const [year, month, day] = text.split("-").map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (year < 2000 || month < 1 || month > 12 || day < 1 || day > lastDay) return null;
  const time = new Date(`${text}T${endOfDay ? "23:59:59" : "00:00:00"}+08:00`).getTime();
  return Number.isFinite(time) ? { text, time } : null;
}

function deterministicId(record = {}) {
  const key = [
    record.mode,
    record.originCode,
    record.destinationCode,
    record.carrier,
    record.vessel,
    record.voyage,
    record.departureDate,
    record.arrivalDate,
    record.sourceId
  ].join("|");
  return `schedule-${crypto.createHash("sha256").update(key).digest("hex").slice(0, 20)}`;
}

function validateRecord(input = {}, now = Date.now()) {
  const mode = input.mode === "air" ? "air" : input.mode === "sea" ? "sea" : "";
  const originCode = cleanCode(input.originCode || input.origin);
  const destinationCode = cleanCode(input.destinationCode || input.destination);
  const carrier = cleanText(input.carrier, 80);
  const sourceId = cleanText(input.sourceId, 80);
  const departure = parseDate(input.departureDate);
  const arrival = parseDate(input.arrivalDate, true);
  const captured = parseDate(input.capturedAt, true);
  const transitHours = Number(input.transitHours);
  const reasons = [];
  if (!mode) reasons.push("mode 必须为 sea 或 air");
  if (!/^[A-Z0-9]{3,8}$/.test(originCode)) reasons.push("起点代码无效");
  if (!/^[A-Z0-9]{3,8}$/.test(destinationCode)) reasons.push("终点代码无效");
  if (!carrier) reasons.push("承运人缺失");
  if (!ALLOWED_SOURCE_IDS.has(sourceId)) reasons.push("来源未在固定白名单登记");
  if (!departure || !arrival || arrival.time <= departure.time) reasons.push("ETD/ETA 无效");
  if (!captured || captured.time > now + 86400000) reasons.push("抓取日期无效");
  if (!Number.isFinite(transitHours) || transitHours <= 0 || transitHours > 24 * 120) reasons.push("计划时长无效");
  if (reasons.length) return { ok: false, reasons };

  const record = {
    id: cleanText(input.id, 100),
    mode,
    originCode,
    destinationCode,
    carrier,
    vessel: cleanText(input.vessel, 100),
    voyage: cleanText(input.voyage || input.flightNumber, 60),
    departureDate: departure.text,
    arrivalDate: arrival.text,
    transitHours: Math.round(transitHours),
    directness: cleanText(input.directness, 100) || "按承运人文件/查询结果",
    sourceId,
    evidenceType: cleanText(input.evidenceType, 80) || "carrier-file-import",
    capturedAt: captured.text,
    confidence: "carrier-published",
    note: cleanText(input.note, 300) || "承运人发布的计划班期；计划可能调整，订舱前需重查。"
  };
  if (!/^[A-Za-z0-9._-]{6,100}$/.test(record.id)) record.id = deterministicId(record);
  return { ok: true, record };
}

function dataFilePath() {
  const directory = process.env.LOCAL_DATA_DIR || "/tmp";
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, FILE_NAME);
}

function readStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(dataFilePath(), "utf8"));
    return {
      updatedAt: parsed.updatedAt || "",
      records: Array.isArray(parsed.records) ? parsed.records : []
    };
  } catch {
    return { updatedAt: "", records: [] };
  }
}

function writeStore(store = {}) {
  const filePath = dataFilePath();
  const temporaryPath = `${filePath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(store, null, 2), { encoding: "utf8", mode: 0o600 });
  fs.renameSync(temporaryPath, filePath);
}

function isAuthenticated(event = {}) {
  if (!accessAuth?.accessConfigured()) return false;
  const cookies = accessAuth.readCookies(accessAuth.headerValue(event.headers || {}, "cookie"));
  return accessAuth.verifySessionToken(cookies[accessAuth.SESSION_COOKIE] || "");
}

function filteredRecords(records = [], params = {}) {
  const mode = cleanText(params.mode, 8);
  const origin = cleanCode(params.origin || params.originCode);
  const destination = cleanCode(params.destination || params.destinationCode);
  return records
    .filter((record) => !mode || record.mode === mode)
    .filter((record) => !origin || record.originCode === origin)
    .filter((record) => !destination || record.destinationCode === destination)
    .slice(0, 1000);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };

  if (event.httpMethod === "GET") {
    const store = readStore();
    const records = filteredRecords(store.records, event.queryStringParameters || {});
    return json(200, {
      ok: true,
      records,
      count: records.length,
      total: store.records.length,
      updatedAt: store.updatedAt,
      source: "persistent-schedule-snapshot"
    });
  }

  if (event.httpMethod !== "POST") return json(405, { ok: false, message: "Method not allowed" });
  if (!isAuthenticated(event)) return json(401, { ok: false, message: "请先登录平台后再写入班期。" });

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, message: "请求格式无效。" });
  }
  const incoming = Array.isArray(body.records) ? body.records : [];
  if (!incoming.length || incoming.length > MAX_IMPORT_RECORDS) {
    return json(400, { ok: false, message: `每次需要导入 1-${MAX_IMPORT_RECORDS} 条班期记录。` });
  }

  const checked = incoming.map((record, index) => ({ index, ...validateRecord(record) }));
  const accepted = checked.filter((item) => item.ok).map((item) => item.record);
  const rejected = checked.filter((item) => !item.ok).map((item) => ({ index: item.index, reasons: item.reasons }));
  if (!accepted.length) return json(422, { ok: false, message: "没有通过校验的班期记录。", rejected });

  const store = readStore();
  const merged = new Map(store.records.map((record) => [record.id, record]));
  accepted.forEach((record) => merged.set(record.id, record));
  const records = Array.from(merged.values())
    .sort((a, b) => String(b.departureDate || "").localeCompare(String(a.departureDate || "")))
    .slice(0, MAX_STORED_RECORDS);
  const updatedAt = new Date().toISOString();
  writeStore({ schemaVersion: "1.0", updatedAt, records });

  return json(200, {
    ok: true,
    accepted: accepted.length,
    rejected,
    total: records.length,
    updatedAt
  });
};

exports._private = { validateRecord, filteredRecords };
