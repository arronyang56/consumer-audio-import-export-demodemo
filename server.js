const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const rootDir = __dirname;
const siteDir = path.join(rootDir, "site");
const functionsDir = path.join(rootDir, "netlify", "functions");
const port = Number(process.env.PORT || 8787);

if (!process.env.LOCAL_DATA_DIR) {
  process.env.LOCAL_DATA_DIR = path.join(rootDir, ".data");
}
if (process.env.SITE_URL && !process.env.URL) {
  process.env.URL = process.env.SITE_URL;
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

const scheduledFunctions = [
  {
    name: "scheduled-alert-runner",
    intervalMs: Number(process.env.ALERT_RUNNER_INTERVAL_MS || 30 * 60 * 1000),
    initialDelayMs: Number(process.env.ALERT_RUNNER_INITIAL_DELAY_MS || 2 * 60 * 1000)
  },
  {
    name: "scheduled-policy-refresh",
    intervalMs: Number(process.env.POLICY_REFRESH_INTERVAL_MS || 6 * 60 * 60 * 1000),
    initialDelayMs: Number(process.env.POLICY_REFRESH_INITIAL_DELAY_MS || 5 * 60 * 1000)
  }
];

function send(res, statusCode, headers, body = "") {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function headersObject(headers = {}) {
  return Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]));
}

async function handleFunction(req, res, url, functionName) {
  if (!/^[a-z0-9-]+$/i.test(functionName || "")) {
    send(res, 404, { "Content-Type": "application/json; charset=utf-8" }, JSON.stringify({ ok: false, message: "Function not found" }));
    return;
  }

  const functionPath = path.join(functionsDir, `${functionName}.js`);
  if (!functionPath.startsWith(functionsDir) || !fs.existsSync(functionPath)) {
    send(res, 404, { "Content-Type": "application/json; charset=utf-8" }, JSON.stringify({ ok: false, message: "Function not found" }));
    return;
  }

  try {
    delete require.cache[require.resolve(functionPath)];
    const mod = require(functionPath);
    const result = await mod.handler({
      httpMethod: req.method,
      path: url.pathname,
      rawUrl: url.href,
      headers: headersObject(req.headers),
      queryStringParameters: Object.fromEntries(url.searchParams.entries()),
      body: req.method === "GET" || req.method === "HEAD" ? "" : await readBody(req)
    });

    send(res, result.statusCode || 200, result.headers || {}, result.body || "");
  } catch (error) {
    send(
      res,
      500,
      { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
      JSON.stringify({ ok: false, message: error.message || "Server function failed" })
    );
  }
}

function serveStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname);
  const candidate = pathname === "/" ? "/index.html" : pathname;
  const requestedPath = path.normalize(path.join(siteDir, candidate));
  const safePath = requestedPath.startsWith(siteDir) ? requestedPath : path.join(siteDir, "index.html");
  const filePath = fs.existsSync(safePath) && fs.statSync(safePath).isFile() ? safePath : path.join(siteDir, "index.html");
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found");
      return;
    }
    send(res, 200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
    }, data);
  });
}

async function invokeScheduledFunction(functionName) {
  const functionPath = path.join(functionsDir, `${functionName}.js`);
  if (!functionPath.startsWith(functionsDir) || !fs.existsSync(functionPath)) return;
  try {
    delete require.cache[require.resolve(functionPath)];
    const mod = require(functionPath);
    if (typeof mod.handler !== "function") return;
    const result = await mod.handler({
      httpMethod: "GET",
      path: `/.netlify/functions/${functionName}`,
      rawUrl: `http://127.0.0.1:${port}/.netlify/functions/${functionName}`,
      headers: {},
      queryStringParameters: {},
      body: "",
      scheduled: true
    });
    const status = result?.statusCode || 200;
    console.log(`[schedule] ${functionName} completed with ${status}`);
  } catch (error) {
    console.error(`[schedule] ${functionName} failed:`, error.message || error);
  }
}

function startInternalSchedules() {
  if (process.env.DISABLE_INTERNAL_SCHEDULES === "true") return;
  for (const job of scheduledFunctions) {
    if (!Number.isFinite(job.intervalMs) || job.intervalMs < 60_000) continue;
    setTimeout(() => {
      invokeScheduledFunction(job.name);
      setInterval(() => invokeScheduledFunction(job.name), job.intervalMs);
    }, Math.max(1_000, job.initialDelayMs));
  }
}

const server = http.createServer(async (req, res) => {
  const host = req.headers.host || "localhost";
  const url = new URL(req.url || "/", `http://${host}`);

  if (url.pathname === "/health" || url.pathname === "/api/health") {
    send(res, 200, { "Content-Type": "application/json; charset=utf-8" }, JSON.stringify({ ok: true, service: "hs-platform", time: new Date().toISOString() }));
    return;
  }

  const netlifyMatch = url.pathname.match(/^\/\.netlify\/functions\/([a-z0-9-]+)$/i);
  const apiMatch = url.pathname.match(/^\/api\/([a-z0-9-]+)$/i);
  if (netlifyMatch || apiMatch) {
    await handleFunction(req, res, url, (netlifyMatch || apiMatch)[1]);
    return;
  }

  serveStatic(req, res, url);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`HS platform server listening on http://127.0.0.1:${port}`);
  startInternalSchedules();
});
