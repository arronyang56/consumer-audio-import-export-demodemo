const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const accessAuth = require("./access-auth")._private;

const FILE_NAME = "business-evidence-records.json";
const MAX_IMPORT_RECORDS = 500;
const MAX_STORED_RECORDS = 2000;
const TYPES = new Set(["quote", "schedule", "actual", "inspection"]);
const OUTCOMES = new Set(["", "passed", "documents", "inspection", "rejected"]);
const CURRENCIES = new Set(["USD", "CNY", "EUR", "GBP", "HKD", "JPY", "SGD", "THB", "AED"]);
const UNITS = new Set(["KG", "CBM", "20GP", "40GP", "40HQ", "45HQ", "SHIPMENT"]);

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

function validDateOnly(value = "") {
  const text = cleanText(value, 16);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return "";
  const [year, month, day] = text.split("-").map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (year < 2020 || month < 1 || month > 12 || day < 1 || day > lastDay) return "";
  return text;
}

function cleanTimestamp(value = "") {
  const text = cleanText(value, 40);
  if (!text) return "";
  const time = new Date(text).getTime();
  return Number.isFinite(time) ? text : "";
}

function validateRecord(input = {}, now = Date.now()) {
  const mode = input.mode === "air" ? "air" : input.mode === "sea" ? "sea" : "";
  const type = TYPES.has(input.type) ? input.type : "";
  const origin = cleanText(input.origin, 100);
  const destination = cleanText(input.destination, 100);
  const carrier = cleanText(input.carrier, 100);
  const evidenceDate = validDateOnly(input.evidenceDate);
  const unit = UNITS.has(String(input.unit || "").toUpperCase()) ? String(input.unit).toUpperCase() : "SHIPMENT";
  const currency = CURRENCIES.has(String(input.currency || "").toUpperCase()) ? String(input.currency).toUpperCase() : "USD";
  const price = Number(input.price || 0);
  const plannedDeparture = cleanTimestamp(input.plannedDeparture);
  const actualDeparture = cleanTimestamp(input.actualDeparture);
  const plannedArrival = cleanTimestamp(input.plannedArrival);
  const actualArrival = cleanTimestamp(input.actualArrival);
  const outcome = OUTCOMES.has(input.outcome || "") ? input.outcome || "" : "";
  const reasons = [];
  if (!mode) reasons.push("运输方式无效");
  if (!type) reasons.push("证据类型无效");
  if (!origin || !destination) reasons.push("起点或终点缺失");
  if (!carrier) reasons.push("承运人/报价方缺失");
  if (!evidenceDate || new Date(`${evidenceDate}T23:59:59+08:00`).getTime() > now + 86400000) reasons.push("证据日期无效");
  if (type === "quote" && (!Number.isFinite(price) || price <= 0 || price > 1_000_000_000)) reasons.push("报价金额无效");
  if (actualDeparture && actualArrival && new Date(actualArrival).getTime() <= new Date(actualDeparture).getTime()) reasons.push("实际到达时间早于出发时间");
  if (plannedDeparture && plannedArrival && new Date(plannedArrival).getTime() <= new Date(plannedDeparture).getTime()) reasons.push("计划到达时间早于出发时间");
  if (reasons.length) return { ok: false, reasons };

  const id = /^[A-Za-z0-9._-]{6,100}$/.test(cleanText(input.id, 100))
    ? cleanText(input.id, 100)
    : crypto.randomUUID();
  return {
    ok: true,
    record: {
      id,
      mode,
      type,
      origin,
      destination,
      carrier,
      evidenceDate,
      unit,
      currency,
      price: Number.isFinite(price) && price > 0 ? price : 0,
      plannedDeparture,
      actualDeparture,
      plannedArrival,
      actualArrival,
      outcome,
      note: cleanText(input.note, 500),
      createdAt: cleanTimestamp(input.createdAt) || new Date().toISOString()
    }
  };
}

function dataFilePath() {
  const directory = process.env.LOCAL_DATA_DIR || "/tmp";
  fs.mkdirSync(directory, { recursive: true });
  return path.join(directory, FILE_NAME);
}

function readStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(dataFilePath(), "utf8"));
    return { updatedAt: parsed.updatedAt || "", records: Array.isArray(parsed.records) ? parsed.records : [] };
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

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (!isAuthenticated(event)) return json(401, { ok: false, message: "请先登录平台后再访问实单证据库。" });

  if (event.httpMethod === "GET") {
    const store = readStore();
    return json(200, { ok: true, records: store.records.slice(0, MAX_STORED_RECORDS), total: store.records.length, updatedAt: store.updatedAt });
  }

  if (event.httpMethod !== "POST") return json(405, { ok: false, message: "Method not allowed" });

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, message: "请求格式无效。" });
  }
  const store = readStore();
  if (body.action === "delete") {
    const id = cleanText(body.id, 100);
    const records = store.records.filter((record) => record.id !== id);
    const updatedAt = new Date().toISOString();
    writeStore({ schemaVersion: "1.0", updatedAt, records });
    return json(200, { ok: true, deleted: store.records.length - records.length, total: records.length, updatedAt });
  }

  const incoming = Array.isArray(body.records) ? body.records : [];
  if (!incoming.length || incoming.length > MAX_IMPORT_RECORDS) {
    return json(400, { ok: false, message: `每次需要写入 1-${MAX_IMPORT_RECORDS} 条实单记录。` });
  }
  const checked = incoming.map((record, index) => ({ index, ...validateRecord(record) }));
  const accepted = checked.filter((item) => item.ok).map((item) => item.record);
  const rejected = checked.filter((item) => !item.ok).map((item) => ({ index: item.index, reasons: item.reasons }));
  if (!accepted.length) return json(422, { ok: false, message: "没有通过校验的实单记录。", rejected });

  const merged = new Map(store.records.map((record) => [record.id, record]));
  accepted.forEach((record) => merged.set(record.id, record));
  const records = Array.from(merged.values())
    .sort((a, b) => String(b.evidenceDate || b.createdAt || "").localeCompare(String(a.evidenceDate || a.createdAt || "")))
    .slice(0, MAX_STORED_RECORDS);
  const updatedAt = new Date().toISOString();
  writeStore({ schemaVersion: "1.0", updatedAt, records });
  return json(200, { ok: true, accepted: accepted.length, rejected, total: records.length, updatedAt });
};

exports._private = { validateRecord };
