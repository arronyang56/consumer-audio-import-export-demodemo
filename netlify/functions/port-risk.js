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
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

function expandPort(port = "") {
  const cleaned = clean(port);
  const lower = cleaned.toLowerCase();
  const aliases = new Set([cleaned || "Shanghai Port"]);
  if (/上海|shanghai|洋山|外高桥|cnsgh|cnshg/.test(lower)) {
    ["Shanghai Port", "Yangshan", "Waigaoqiao", "上海港"].forEach((item) => aliases.add(item));
  }
  if (/宁波|舟山|ningbo/.test(lower)) {
    ["Ningbo Zhoushan Port", "Ningbo", "Zhoushan"].forEach((item) => aliases.add(item));
  }
  if (/盐田|深圳|蛇口|yantian|shenzhen|shekou/.test(lower)) {
    ["Yantian", "Shenzhen", "Shekou"].forEach((item) => aliases.add(item));
  }
  if (/洛杉矶|long beach|los angeles|lax|lgb/.test(lower)) {
    ["Los Angeles", "Long Beach"].forEach((item) => aliases.add(item));
  }
  if (/鹿特丹|rotterdam/.test(lower)) aliases.add("Rotterdam");
  if (/汉堡|hamburg/.test(lower)) aliases.add("Hamburg");
  if (/新加坡|singapore/.test(lower)) aliases.add("Singapore");
  return Array.from(aliases).filter(Boolean).slice(0, 6);
}

function riskSignals(text = "") {
  const lowered = text.toLowerCase();
  const signals = [];
  if (/congestion|delay|queue|backlog|berth|waiting|拥堵|延误|排队|压港/.test(lowered)) signals.push("拥堵/等待");
  if (/strike|labor|protest|罢工|抗议/.test(lowered)) signals.push("罢工/劳工");
  if (/typhoon|storm|weather|fog|wind|rain|台风|风暴|大雾|天气/.test(lowered)) signals.push("天气");
  if (/customs|inspection|clearance|海关|查验|放行/.test(lowered)) signals.push("海关/查验");
  if (/dangerous|battery|hazardous|dg|危险品|电池/.test(lowered)) signals.push("DG/电池");
  if (/tariff|sanction|trade|关税|制裁|贸易/.test(lowered)) signals.push("贸易政策");
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
  const batteryCargo = /battery|电池|危险|dg|hazard/i.test(cargo);
  return {
    ok: false,
    fallback: true,
    source: "Manual risk checklist",
    updatedAt: new Date().toISOString(),
    summary: `${port} 暂未获取到实时公开新闻结果，先按手工风险清单处理。`,
    level: batteryCargo ? "Medium" : "Watch",
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
  const portTerms = expandPort(port).map((item) => `"${item}"`).join(" OR ");
  const query = `(${portTerms}) (${["congestion", "delay", "strike", "weather", "customs", "terminal", "shipping", "logistics", "port", "typhoon"].join(" OR ")})`;

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
    const batteryCargo = /battery|电池|危险|dg|hazard/i.test(cargo);
    const level = allSignals.has("罢工/劳工") || allSignals.has("天气") || allSignals.has("拥堵/等待")
      ? "Watch"
      : batteryCargo
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
