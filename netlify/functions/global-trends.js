const https = require("https");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const fallbackItems = [
  {
    title: "Global macro watch",
    sourceCountry: "Global",
    domain: "Public sources",
    url: "https://www.reuters.com/markets/",
    seendate: "",
    category: "Economy / Markets",
    takeaway: "Follow central-bank rates, inflation, FX, energy prices and shipping demand before confirming lead time or landed cost assumptions."
  },
  {
    title: "Trade and geopolitics watch",
    sourceCountry: "Global",
    domain: "Public sources",
    url: "https://www.wto.org/",
    seendate: "",
    category: "Trade / Policy",
    takeaway: "Watch tariffs, sanctions, customs enforcement and port disruptions that can affect import/export timing."
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

function normalizeArticle(article = {}) {
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain: article.domain || "",
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    language: article.language || "",
    category: "Economy / Politics / Finance",
    takeaway: makeTakeaway(article)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const query = [
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

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", `(${query})`);
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", "12");
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
        items: fallbackItems,
        message: "GDELT did not return article results."
      });
    }

    return json(200, {
      ok: true,
      source: "GDELT DOC 2.1",
      updatedAt: new Date().toISOString(),
      items: articles
    });
  } catch (error) {
    return json(200, {
      ok: false,
      fallback: true,
      source: "GDELT DOC 2.1",
      updatedAt: new Date().toISOString(),
      items: fallbackItems,
      message: error.message || "Global trend query failed."
    });
  }
};
