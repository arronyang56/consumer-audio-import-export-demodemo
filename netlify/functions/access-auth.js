const crypto = require("crypto");

const SESSION_COOKIE = "lm_access_session";
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { ...corsHeaders, ...extraHeaders, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body)
  };
}

function sha256(value = "") {
  return crypto.createHash("sha256").update(String(value), "utf8").digest("hex");
}

function base64url(value = "") {
  return Buffer.from(String(value), "utf8").toString("base64url");
}

function fromBase64url(value = "") {
  return Buffer.from(String(value), "base64url").toString("utf8");
}

function safeEqual(a = "", b = "") {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function configuredAccessHash() {
  return String(process.env.PLATFORM_ACCESS_CODE_HASH || "").trim().toLowerCase();
}

function configuredAccessCode() {
  return String(process.env.PLATFORM_ACCESS_CODE || "").trim();
}

function accessConfigured() {
  return Boolean(configuredAccessHash() || configuredAccessCode());
}

function signingSecret() {
  return (
    process.env.PLATFORM_AUTH_SECRET ||
    configuredAccessHash() ||
    (configuredAccessCode() ? sha256(configuredAccessCode()) : "")
  );
}

function verifyCode(code = "") {
  const clean = String(code || "").trim();
  if (!clean || !accessConfigured()) return false;

  const expectedHash = configuredAccessHash();
  if (expectedHash && safeEqual(sha256(clean), expectedHash)) return true;

  const expectedCode = configuredAccessCode();
  return Boolean(expectedCode && safeEqual(clean, expectedCode));
}

function sign(payload = "") {
  return crypto.createHmac("sha256", signingSecret()).update(payload).digest("base64url");
}

function makeSessionToken(now = Date.now()) {
  const payload = base64url(JSON.stringify({
    scope: "logismaster",
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS * 1000
  }));
  return `${payload}.${sign(payload)}`;
}

function readCookies(header = "") {
  return Object.fromEntries(
    String(header || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        if (separator === -1) return [part, ""];
        return [decodeURIComponent(part.slice(0, separator)), decodeURIComponent(part.slice(separator + 1))];
      })
  );
}

function headerValue(headers = {}, name = "") {
  const direct = headers[name] || headers[name.toLowerCase()] || headers[name.toUpperCase()];
  if (direct) return direct;
  const found = Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase());
  return found?.[1] || "";
}

function verifySessionToken(token = "", now = Date.now()) {
  if (!token || !signingSecret()) return false;
  const [payload, signature] = String(token).split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return false;

  try {
    const parsed = JSON.parse(fromBase64url(payload));
    return parsed.scope === "logismaster" && Number(parsed.exp) > now;
  } catch {
    return false;
  }
}

function secureCookieFlag(event = {}) {
  const proto = headerValue(event.headers || {}, "x-forwarded-proto");
  return proto === "https" || /^https:/i.test(process.env.URL || process.env.SITE_URL || "");
}

function sessionCookie(token = "", event = {}) {
  const secure = secureCookieFlag(event) ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Max-Age=${SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

function clearCookie(event = {}) {
  const secure = secureCookieFlag(event) ? "; Secure" : "";
  return `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };

  const setupRequired = !accessConfigured();

  if (event.httpMethod === "GET") {
    const cookies = readCookies(headerValue(event.headers || {}, "cookie"));
    const authenticated = verifySessionToken(cookies[SESSION_COOKIE] || "");
    return json(200, { ok: true, authenticated, setupRequired });
  }

  if (event.httpMethod !== "POST") return json(405, { ok: false, message: "Method not allowed.", setupRequired });

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, message: "请求格式无效。", setupRequired });
  }

  if (body.action === "logout") {
    return json(200, { ok: true, authenticated: false, setupRequired }, { "Set-Cookie": clearCookie(event) });
  }

  if (setupRequired) {
    return json(503, { ok: false, authenticated: false, setupRequired, message: "服务器尚未配置访问码环境变量。" });
  }

  if (!verifyCode(body.code || "")) {
    return json(401, { ok: false, authenticated: false, setupRequired: false, message: "访问码不正确，请确认后重试。" });
  }

  return json(
    200,
    { ok: true, authenticated: true, setupRequired: false, expiresIn: SESSION_MAX_AGE_SECONDS },
    { "Set-Cookie": sessionCookie(makeSessionToken(), event) }
  );
};
