const tls = require("tls");

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body)
  };
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

exports.handler = async (event = {}) => {
  const token = event.queryStringParameters?.token || event.headers?.["x-alert-test-token"] || "";
  if (!process.env.ALERT_TEST_TOKEN || token !== process.env.ALERT_TEST_TOKEN) {
    return json(403, { ok: false, message: "forbidden" });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return json(500, { ok: false, message: "smtp_not_configured" });
  }

  const to = event.queryStringParameters?.to || process.env.ALERT_TEST_RECIPIENT || process.env.SMTP_USER;
  const siteUrl = process.env.SITE_URL || process.env.URL || "https://156-238-241-168.sslip.io/";
  const sent = await sendSmtpEmail(
    to,
    "HS平台邮件预警测试",
    [
      "这是一封 HS 归类/进出口信息平台的邮件预警测试。",
      `测试时间：${new Date().toISOString()}`,
      `平台网址：${siteUrl}`,
      "说明：SMTP 配置在服务器后端环境变量中，网页前端不会保存或显示授权码。"
    ].join("\n")
  );

  return json(sent.sent ? 200 : 502, { ok: sent.sent, result: sent });
};
