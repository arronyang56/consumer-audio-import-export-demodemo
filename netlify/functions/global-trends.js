const https = require("https");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const fallbackItems = [
  {
    title: "全球宏观观察",
    sourceCountry: "Global",
    domain: "公开来源",
    url: "https://www.reuters.com/markets/",
    seendate: "",
    category: "经济/金融",
    takeaway: "关注利率、通胀、汇率、能源价格和航运需求变化，这些可能影响报价、成本和交期判断。",
    takeawayZh: "关注利率、通胀、汇率、能源价格和航运需求变化，这些可能影响报价、成本和交期判断。"
  },
  {
    title: "贸易和地缘风险观察",
    sourceCountry: "Global",
    domain: "公开来源",
    url: "https://www.wto.org/",
    seendate: "",
    category: "贸易/政策",
    takeaway: "关注关税、制裁、出口管制、海关执法和港口中断，这些可能影响进出口时效和清关资料。",
    takeawayZh: "关注关税、制裁、出口管制、海关执法和港口中断，这些可能影响进出口时效和清关资料。"
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

function makeTakeaway(article = {}) {
  const text = `${article.title || ""} ${article.seendate || ""}`.toLowerCase();
  if (/rate|inflation|central bank|fed|ecb|currency|market|stock|bond/.test(text)) {
    return "金融/汇率/利率变化可能影响采购成本、信用证、库存资金占用和报价有效期。";
  }
  if (/tariff|trade|customs|sanction|export control/.test(text)) {
    return "贸易政策或海关监管变化可能影响税率、监管条件、申报资料和目的国准入。";
  }
  if (/port|shipping|freight|supply chain|logistics|strike|weather/.test(text)) {
    return "供应链或物流事件可能影响船期、港口作业、仓储和交付承诺。";
  }
  return "建议作为宏观背景观察，具体业务仍需结合官方通知、船司/货代和关务复核。";
}

function makeCategory(article = {}) {
  const text = `${article.title || ""} ${article.domain || ""}`.toLowerCase();
  if (/tariff|customs|sanction|export control|trade/.test(text)) return "贸易/政策";
  if (/port|shipping|freight|supply chain|logistics/.test(text)) return "物流/供应链";
  if (/rate|inflation|central bank|currency|market|stock|bond|oil/.test(text)) return "金融/经济";
  if (/war|election|geopolitics|security/.test(text)) return "政治/地缘";
  return "经济/政治/金融";
}

function normalizeArticle(article = {}) {
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain: article.domain || "",
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    language: article.language || "",
    category: makeCategory(article),
    takeaway: makeTakeaway(article),
    takeawayZh: makeTakeaway(article)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const keyword = String(event.queryStringParameters?.keyword || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80);
  const baseTerms = [
    "economy",
    "inflation",
    "\"interest rates\"",
    "\"central bank\"",
    "trade",
    "tariff",
    "\"supply chain\"",
    "geopolitics",
    "\"financial markets\"",
    "currency",
    "oil",
    "shipping"
  ].join(" OR ");
  const query = keyword ? `(${keyword})` : `(${baseTerms})`;

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", query);
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", keyword ? "8" : "12");
  url.searchParams.set("sort", "datedesc");

  try {
    const response = await getJson(url);
    const data = response.data;
    const articles = Array.isArray(data.articles) ? data.articles.map(normalizeArticle) : [];

    if (!response.ok || !articles.length) {
      return json(200, {
        ok: false,
        fallback: true,
        source: "GDELT DOC 2.1",
        updatedAt: new Date().toISOString(),
        keyword,
        summary: keyword
          ? `暂时没有拿到“${keyword}”相关公开新闻。可以换中文/英文关键词，或用更宽泛的词搜索。`
          : "公开新闻接口暂时没有返回结果，先按固定趋势清单观察。",
        items: fallbackItems,
        message: "GDELT did not return article results."
      });
    }

    return json(200, {
      ok: true,
      source: "GDELT DOC 2.1",
      updatedAt: new Date().toISOString(),
      keyword,
      summary: `${keyword ? `围绕“${keyword}”，` : ""}过去一周找到 ${articles.length} 条公开新闻。建议重点看贸易政策、物流供应链、汇率利率和地缘风险是否会影响交期、成本或清关资料。`,
      items: articles
    });
  } catch (error) {
    return json(200, {
      ok: false,
      fallback: true,
      source: "GDELT DOC 2.1",
      updatedAt: new Date().toISOString(),
      keyword,
      summary: keyword
        ? `搜索“${keyword}”时公开新闻接口暂时失败，先显示固定趋势清单。`
        : "公开新闻接口暂时失败，先显示固定趋势清单。",
      items: fallbackItems,
      message: error.message || "Global trend query failed."
    });
  }
};
