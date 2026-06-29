const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

const fs = require("fs/promises");
const path = require("path");

const key = "ca:vessel-alert-rules";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body)
  };
}

function localDataDir() {
  return process.env.LOCAL_DATA_DIR || "";
}

function localFilePath(storageKey) {
  const fileName = `${storageKey.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}.json`;
  return path.join(localDataDir(), fileName);
}

function upstashConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function storageConfigured() {
  return upstashConfigured() || Boolean(localDataDir());
}

async function redis(command) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error || `Redis ${response.status}`);
  return data.result;
}

async function localRead(storageKey) {
  if (!localDataDir()) return null;
  try {
    return await fs.readFile(localFilePath(storageKey), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function localWrite(storageKey, value) {
  if (!localDataDir()) return false;
  await fs.mkdir(localDataDir(), { recursive: true });
  await fs.writeFile(localFilePath(storageKey), value, "utf8");
  return true;
}

async function readRules() {
  if (!storageConfigured()) return [];
  const raw = upstashConfigured() ? await redis(["GET", key]) : await localRead(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeRules(rules) {
  if (!storageConfigured()) return false;
  const value = JSON.stringify(rules.slice(0, 200));
  if (upstashConfigured()) {
    await redis(["SET", key, value]);
    return true;
  }
  return localWrite(key, value);
}

function clean(value = "") {
  return String(value || "").trim().slice(0, 160);
}

function cleanRule(input = {}) {
  return {
    id: clean(input.id) || Date.now().toString(36),
    vessel: clean(input.vessel),
    destination: clean(input.destination),
    expectedEta: clean(input.expectedEta),
    email: clean(input.email),
    rule: clean(input.rule) || "before_eta",
    createdAt: clean(input.createdAt) || new Date().toISOString(),
    lastNotifiedAt: clean(input.lastNotifiedAt)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };

  if (event.httpMethod === "GET") {
    const rules = await readRules();
    return json(200, { ok: true, storageConfigured: storageConfigured(), rules });
  }

  if (event.httpMethod !== "POST") return json(405, { ok: false, message: "Method not allowed" });

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, message: "Invalid JSON body." });
  }

  const rules = await readRules();
  if (body.action === "delete") {
    const next = rules.filter((item) => item.id !== clean(body.id));
    const stored = await writeRules(next);
    return json(200, { ok: true, stored, storageConfigured: storageConfigured(), rules: next });
  }

  const rule = cleanRule(body.rule || body);
  if (!rule.vessel || !rule.destination || !rule.email) {
    return json(400, { ok: false, message: "vessel, destination and email are required." });
  }

  const next = [rule, ...rules.filter((item) => item.id !== rule.id)];
  const stored = await writeRules(next);
  return json(200, { ok: true, stored, storageConfigured: storageConfigured(), rule });
};
