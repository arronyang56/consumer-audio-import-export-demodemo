const https = require("https");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const fallbackItems = [
  {
    title: "海关公告、归类决定和监管条件",
    category: "海关/税号",
    url: "http://www.customs.gov.cn/",
    domain: "customs.gov.cn",
    takeaway: "用于核对税号、监管条件、归类口径、海关公告和行政裁定。"
  },
  {
    title: "中国国际贸易单一窗口",
    category: "通关入口",
    url: "https://www.singlewindow.cn/",
    domain: "singlewindow.cn",
    takeaway: "正式通关、监管证件和业务查询通常需要账号权限。"
  },
  {
    title: "3C 目录和认证公告",
    category: "认证/3C",
    url: "https://www.cnca.gov.cn/",
    domain: "cnca.gov.cn",
    takeaway: "用于核对音频设备、电源适配器、低压电器等是否涉及强制认证。"
  }
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
            reject(new Error(`Policy source returned non-JSON response (${response.statusCode || "unknown"})`));
          }
        });
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error("Policy query timed out"));
    });
    request.on("error", reject);
  });
}

function categoryFor(article = {}) {
  const text = `${article.title || ""} ${article.domain || ""}`.toLowerCase();
  if (/customs|tariff|税则|海关|归类|hs code/.test(text)) return "海关/税号";
  if (/certification|3c|cnca|认证|强制性/.test(text)) return "认证/3C";
  if (/battery|dangerous|lithium|电池|危险品|un38/.test(text)) return "电池/危险品";
  if (/trade|export|import|sanction|出口|进口|贸易/.test(text)) return "进出口政策";
  return "政策关注";
}

function takeawayFor(article = {}) {
  const category = categoryFor(article);
  if (category === "海关/税号") return "可能涉及税号、监管条件、归类口径或申报资料变化，建议关务复核。";
  if (category === "认证/3C") return "可能涉及 3C、认证目录或实施规则变化，建议按产品类别核对。";
  if (category === "电池/危险品") return "可能影响锂电池资料、包装标签、运输方式或承运人限制。";
  if (category === "进出口政策") return "可能影响进口准入、出口管制、目的国要求或清关资料。";
  return "作为政策背景观察；正式判断仍需打开权威来源核验。";
}

function normalizeArticle(article = {}) {
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain: article.domain || "",
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    category: categoryFor(article),
    takeaway: takeawayFor(article)
  };
}

function fallback(message = "") {
  return {
    ok: false,
    fallback: true,
    source: "固定政策清单",
    updatedAt: new Date().toISOString(),
    message,
    summary: "当前先提供海关、单一窗口、CNCA 等权威入口和固定核验清单；公开新闻仅作提醒，不替代正式政策判断。",
    items: fallbackItems
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const query = [
    "customs",
    "tariff",
    "\"HS code\"",
    "\"product classification\"",
    "\"3C certification\"",
    "CNCA",
    "\"lithium battery\"",
    "\"dangerous goods\"",
    "\"export control\""
  ].join(" OR ");

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", `(${query})`);
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", "8");
  url.searchParams.set("sort", "datedesc");

  try {
    const response = await getJson(url);
    const data = response.data;
    const articles = Array.isArray(data.articles) ? data.articles.map(normalizeArticle) : [];
    if (!response.ok || !articles.length) return json(200, fallback("公开新闻接口没有返回结果。"));

    return json(200, {
      ok: true,
      source: "GDELT DOC 2.1 + 官方入口",
      updatedAt: new Date().toISOString(),
      summary: `过去一周找到 ${articles.length} 条进出口政策相关公开消息。请优先关注海关/税号、认证/3C、电池危险品和出口管制类信息。`,
      items: articles
    });
  } catch (error) {
    return json(200, fallback(error.message || "Policy query failed."));
  }
};
