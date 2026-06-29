const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const fs = require("fs/promises");
const path = require("path");

const cacheKey = "ca:hotspot-cache";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300" },
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

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });
  if (!storageConfigured()) return json(200, { ok: false, storageConfigured: false, message: "Hotspot cache storage is not configured." });

  const raw = upstashConfigured() ? await redis(["GET", cacheKey]) : await localRead(cacheKey);
  if (!raw) return json(200, { ok: false, storageConfigured: true, message: "No hotspot cache yet." });
  try {
    return json(200, JSON.parse(raw));
  } catch {
    return json(200, { ok: false, storageConfigured: true, message: "Hotspot cache is invalid." });
  }
};
