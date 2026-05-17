const https = require("https");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const officialPortLinks = [
  ["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index"],
  ["港航纵横综合查询", "https://www.hb56.com/Main.aspx"],
  ["上海港官网", "https://www.portshanghai.com.cn/"]
];

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=900"
    },
    body: JSON.stringify(body)
  };
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "consumer-audio-import-export-demo/1.0"
        },
        timeout: 12000
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          try {
            resolve({
              ok: response.statusCode >= 200 && response.statusCode < 300,
              status: response.statusCode,
              data: JSON.parse(body)
            });
          } catch (error) {
            reject(new Error(`GDELT returned non-JSON response (${response.statusCode || "unknown"})`));
          }
        });
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error("GDELT request timed out"));
    });
    request.on("error", reject);
  });
}

function clean(value) {
  return String(value || "").trim().replace(/[^\w\s.'-]/g, "").replace(/\s+/g, " ").slice(0, 80);
}

function riskSignals(text = "") {
  const lowered = text.toLowerCase();
  const signals = [];
  if (/congestion|delay|queue|backlog|berth|waiting/.test(lowered)) signals.push("拥堵/等待");
  if (/strike|labor|protest/.test(lowered)) signals.push("罢工/劳工");
  if (/typhoon|storm|weather|fog|wind|rain/.test(lowered)) signals.push("天气");
  if (/customs|inspection|clearance/.test(lowered)) signals.push("海关/查验");
  if (/dangerous|battery|hazardous|dg/.test(lowered)) signals.push("DG/电池");
  if (/tariff|sanction|trade/.test(lowered)) signals.push("贸易政策");
  return signals;
}

function normalizeArticle(article = {}) {
  const signals = riskSignals(`${article.title || ""} ${article.domain || ""}`);
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain: article.domain || "",
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    signals
  };
}

function fallback(port, cargo) {
  return {
    ok: false,
    fallback: true,
    source: "Manual risk checklist",
    updatedAt: new Date().toISOString(),
    summary: `${port} 暂未获取到实时公开新闻结果，先按手工风险清单处理。`,
    level: cargo.toLowerCase().includes("battery") ? "Medium" : "Watch",
    checklist: [
      "查询上港集团箱货状态：海关放行、码头放行、理货、换单、授权、放箱、查验指令。",
      "确认船司/货代最新 ETA、靠泊计划、截关和提箱预约。",
      "如含电池或 DG，提前确认码头/船司危险品作业限制、MSDS、UN38.3 和包装标签。",
      "关注港口公告、天气、节假日、查验率和目的港政策变化。"
    ],
    links: officialPortLinks,
    articles: []
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const params = event.queryStringParameters || {};
  const port = clean(params.port) || "Shanghai Port";
  const region = clean(params.region) || "China";
  const cargo = clean(params.cargo) || "Consumer Audio";
  const query = `"${port}" (${["congestion", "delay", "strike", "weather", "customs", "terminal", "shipping", "logistics", "port"].join(" OR ")})`;

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", query);
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", "8");
  url.searchParams.set("sort", "datedesc");

  try {
    const response = await getJson(url);
    const data = response.data;
    const articles = Array.isArray(data.articles) ? data.articles.map(normalizeArticle) : [];

    if (!response.ok || !articles.length) return json(200, fallback(port, cargo));

    const allSignals = new Set(articles.flatMap((item) => item.signals));
    const level = allSignals.has("罢工/劳工") || allSignals.has("天气") || allSignals.has("拥堵/等待")
      ? "Watch"
      : cargo.toLowerCase().includes("battery")
        ? "Medium"
        : "Low";

    return json(200, {
      ok: true,
      source: "GDELT DOC 2.1",
      updatedAt: new Date().toISOString(),
      port,
      region,
      cargo,
      level,
      summary: `${port} 过去一周公开新闻命中 ${articles.length} 条，风险信号：${Array.from(allSignals).join("、") || "未见明显关键词"}。`,
      checklist: fallback(port, cargo).checklist,
      links: officialPortLinks,
      articles
    });
  } catch (error) {
    const result = fallback(port, cargo);
    result.message = error.message || "Port risk query failed.";
    return json(200, result);
  }
};
