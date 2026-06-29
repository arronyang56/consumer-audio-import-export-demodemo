exports.config = { schedule: "*/30 * * * *" };

const fs = require("fs/promises");
const path = require("path");
const tls = require("tls");

const alertKey = "ca:vessel-alert-rules";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
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
  const raw = upstashConfigured() ? await redis(["GET", alertKey]) : await localRead(alertKey);
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
    await redis(["SET", alertKey, value]);
    return true;
  }
  return localWrite(alertKey, value);
}

async function sendEmail(to, subject, text) {
  if (process.env.RESEND_API_KEY && process.env.ALERT_FROM_EMAIL) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.ALERT_FROM_EMAIL,
        to: [to],
        subject,
        text
      })
    });
    return { sent: response.ok, status: response.status, provider: "resend" };
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendSmtpEmail(to, subject, text);
  }
  return { sent: false, reason: "email_not_configured" };
}

function readSmtp(socket) {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("SMTP response timeout"));
    }, 15000);
    function cleanup() {
      clearTimeout(timer);
      socket.off("data", onData);
      socket.off("error", onError);
    }
    function onError(error) {
      cleanup();
      reject(error);
    }
    function onData(chunk) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1] || "";
      if (/^\d{3}\s/.test(last)) {
        cleanup();
        resolve(buffer);
      }
    }
    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function smtpCommand(socket, command, okPattern) {
  if (command) socket.write(`${command}\r\n`);
  const response = await readSmtp(socket);
  if (okPattern && !okPattern.test(response)) {
    const lines = response.split(/\r?\n/).filter(Boolean);
    throw new Error(`SMTP rejected command: ${lines[lines.length - 1] || response}`);
  }
  return response;
}

function encodeSubject(value = "") {
  return /^[\x00-\x7F]*$/.test(value) ? value : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function smtpSafeBody(value = "") {
  return String(value || "")
    .replace(/\r?\n/g, "\r\n")
    .replace(/^\./gm, "..");
}

async function sendSmtpEmail(to, subject, text) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const from = process.env.SMTP_FROM_EMAIL || process.env.ALERT_FROM_EMAIL || process.env.SMTP_USER;
  const socket = tls.connect({ host, port, servername: host, rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== "false" });
  try {
    await new Promise((resolve, reject) => {
      socket.once("secureConnect", resolve);
      socket.once("error", reject);
    });
    await smtpCommand(socket, "", /^220/m);
    await smtpCommand(socket, `EHLO ${process.env.SMTP_EHLO || "hs-platform.local"}`, /^250/m);
    await smtpCommand(socket, "AUTH LOGIN", /^334/m);
    await smtpCommand(socket, Buffer.from(process.env.SMTP_USER, "utf8").toString("base64"), /^334/m);
    await smtpCommand(socket, Buffer.from(process.env.SMTP_PASS, "utf8").toString("base64"), /^235/m);
    await smtpCommand(socket, `MAIL FROM:<${from}>`, /^250/m);
    await smtpCommand(socket, `RCPT TO:<${to}>`, /^(250|251)/m);
    await smtpCommand(socket, "DATA", /^354/m);
    const message = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${encodeSubject(subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      smtpSafeBody(text),
      "."
    ].join("\r\n");
    await smtpCommand(socket, message, /^250/m);
    await smtpCommand(socket, "QUIT", /^221/m);
    return { sent: true, provider: "smtp", host };
  } catch (error) {
    return { sent: false, provider: "smtp", host, reason: error.message || "smtp_failed" };
  } finally {
    socket.destroy();
  }
}

async function queryShip(rule) {
  const siteUrl = process.env.URL || process.env.SITE_URL || "https://consumer-audio-import-export-demo.netlify.app";
  const url = new URL("/.netlify/functions/shipxy-eta", siteUrl);
  url.searchParams.set("shipname", rule.vessel);
  url.searchParams.set("destination", rule.destination);
  const response = await fetch(url);
  return response.json();
}

function etaTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.getTime();
}

function needsNotification(rule, liveEta) {
  const now = Date.now();
  const expected = etaTime(rule.expectedEta);
  const actual = etaTime(liveEta);
  if (!expected) return false;
  if (rule.lastNotifiedAt && now - etaTime(rule.lastNotifiedAt) < 18 * 60 * 60 * 1000) return false;
  if (rule.rule === "late_eta") return Boolean(actual && actual > expected);
  const windowStart = expected - 36 * 60 * 60 * 1000;
  const windowEnd = expected - 12 * 60 * 60 * 1000;
  return now >= windowStart && now <= windowEnd;
}

exports.handler = async () => {
  const rules = await readRules();
  const events = [];
  const nextRules = [];

  for (const rule of rules) {
    let event = { id: rule.id, vessel: rule.vessel, checked: true, notify: false };
    try {
      const data = await queryShip(rule);
      const liveEta = data?.result?.eta || "";
      if (needsNotification(rule, liveEta)) {
        const subject = rule.rule === "late_eta" ? `ETA 延误提醒：${rule.vessel}` : `ETA 到港前提醒：${rule.vessel}`;
        const text = [
          `${rule.vessel} -> ${rule.destination}`,
          `预想 ETA：${rule.expectedEta || "未填写"}`,
          `接口 ETA：${liveEta || "未返回"}`,
          "请以船司、货代和码头信息为准。"
        ].join("\n");
        event.email = await sendEmail(rule.email, subject, text);
        event.notify = true;
        nextRules.push({ ...rule, lastNotifiedAt: new Date().toISOString() });
      } else {
        event.liveEta = liveEta;
        nextRules.push(rule);
      }
    } catch (error) {
      event.error = error.message || "alert check failed";
      nextRules.push(rule);
    }
    events.push(event);
  }

  const stored = await writeRules(nextRules);
  return json(200, { ok: true, storageConfigured: storageConfigured(), checked: rules.length, stored, events });
};
