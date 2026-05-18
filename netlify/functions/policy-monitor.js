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
    sourceType: "官方入口",
    credibility: { score: 96, label: "高：官方来源", reason: "海关官方门户，适合核验公告、归类和监管条件。" },
    takeaway: "用于核对税号、监管条件、归类口径、海关公告和行政裁定。"
  },
  {
    title: "中国国际贸易单一窗口",
    category: "通关入口",
    url: "https://www.singlewindow.cn/",
    domain: "singlewindow.cn",
    sourceType: "官方入口",
    credibility: { score: 94, label: "高：官方入口", reason: "通关业务入口，实际操作通常需要账号权限。" },
    takeaway: "正式通关、监管证件和业务查询通常需要账号权限。"
  },
  {
    title: "3C 目录和认证公告",
    category: "认证/3C",
    url: "https://www.cnca.gov.cn/",
    domain: "cnca.gov.cn",
    sourceType: "官方入口",
    credibility: { score: 95, label: "高：官方来源", reason: "认证认可监管官方入口，适合核验 3C 目录和公告。" },
    takeaway: "用于核对音频设备、电源适配器、低压电器等是否涉及强制认证。"
  },
  {
    title: "贸易政策和物流趋势解读",
    category: "趋势/解读",
    url: "https://www.reuters.com/markets/",
    domain: "reuters.com",
    sourceType: "媒体/行业解读",
    credibility: { score: 78, label: "中高：媒体解读", reason: "适合做趋势提醒，不能直接替代官方公告。" },
    takeaway: "用于观察关税、贸易、物流、汇率和地缘风险趋势，具体要求仍需官方核验。"
  }
];

const countryAliases = {
  中国: ["China", "Chinese customs", "GACC", "customs.gov.cn"],
  大陆: ["China", "GACC"],
  美国: ["United States", "US", "U.S.", "CBP", "HTS", "FCC"],
  欧盟: ["EU", "European Union", "Europe", "CE", "RoHS"],
  欧洲: ["EU", "European Union", "Europe"],
  英国: ["UK", "United Kingdom", "UKCA"],
  中东: ["GCC", "Middle East", "Saudi", "UAE"],
  日本: ["Japan", "PSE", "TELEC"],
  澳大利亚: ["Australia", "ACMA"]
};

const productAliases = {
  耳机: ["headphone", "earbuds", "headset", "audio"],
  蓝牙: ["bluetooth", "wireless", "radio equipment"],
  无线: ["wireless", "bluetooth", "radio equipment"],
  音箱: ["speaker", "soundbar", "loudspeaker", "audio"],
  电池: ["battery", "lithium battery", "dangerous goods", "UN38.3"],
  锂电: ["lithium battery", "battery", "dangerous goods"],
  适配器: ["adapter", "charger", "power supply", "3C certification"],
  关税: ["tariff", "duty", "customs"],
  税号: ["HS code", "tariff classification", "customs classification"],
  "3C": ["3C certification", "CNCA"]
};

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

function clean(value) {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 100);
}

function expandTerms(value, dictionary) {
  const cleaned = clean(value);
  if (!cleaned) return [];
  const terms = new Set([cleaned]);
  Object.entries(dictionary).forEach(([key, aliases]) => {
    const keyText = key.toLowerCase();
    const lower = cleaned.toLowerCase();
    if (lower.includes(keyText) || aliases.some((alias) => lower.includes(alias.toLowerCase()))) {
      aliases.forEach((alias) => terms.add(alias));
    }
  });
  return Array.from(terms).slice(0, 8);
}

function termGroup(terms) {
  return terms.length ? `(${terms.map((term) => `"${term}"`).join(" OR ")})` : "";
}

function buildQuery(filters = {}) {
  const base = [
    "customs",
    "tariff",
    "\"HS code\"",
    "\"product classification\"",
    "\"3C certification\"",
    "CNCA",
    "\"lithium battery\"",
    "\"dangerous goods\"",
    "\"export control\"",
    "\"trade policy\"",
    "certification",
    "compliance"
  ].join(" OR ");

  const groups = [`(${base})`];
  const countryTerms = [
    ...expandTerms(filters.exportCountry, countryAliases),
    ...expandTerms(filters.importCountry, countryAliases)
  ];
  const productTerms = expandTerms(filters.product, productAliases);
  const keywordTerms = expandTerms(filters.keyword, { ...countryAliases, ...productAliases });
  const direction = clean(filters.direction);

  if (countryTerms.length) groups.push(termGroup(countryTerms));
  if (productTerms.length) groups.push(termGroup(productTerms));
  if (keywordTerms.length) groups.push(termGroup(keywordTerms));
  if (direction.includes("进口")) groups.push("(import OR customs OR clearance)");
  if (direction.includes("出口")) groups.push("(export OR \"export control\" OR trade)");

  return groups.filter(Boolean).join(" AND ");
}

function categoryFor(article = {}) {
  const text = `${article.title || ""} ${article.domain || ""}`.toLowerCase();
  if (/customs|tariff|税则|海关|归类|hs code|classification/.test(text)) return "海关/税号";
  if (/certification|3c|cnca|ce|fcc|ukca|认证|强制性/.test(text)) return "认证/合规";
  if (/battery|dangerous|lithium|电池|危险品|un38/.test(text)) return "电池/危险品";
  if (/trade|export|import|sanction|出口|进口|贸易/.test(text)) return "进出口政策";
  if (/shipping|port|freight|logistics/.test(text)) return "物流/趋势";
  return "政策关注";
}

function credibilityFor(domain = "") {
  const lower = String(domain || "").toLowerCase();
  if (/customs\.gov\.cn|gov\.cn|cnca\.gov\.cn|singlewindow\.cn|europa\.eu|trade\.gov|cbp\.gov|gov\.uk|wto\.org/.test(lower)) {
    return { score: 94, label: "高：官方/国际组织", reason: "可作为优先核验来源，仍需确认是否适用具体产品和日期。" };
  }
  if (/reuters\.com|bloomberg\.com|spglobal\.com|ft\.com|wsj\.com|joc\.com|theloadstar|maritime-executive|lloydslist/.test(lower)) {
    return { score: 78, label: "中高：媒体/行业解读", reason: "适合做趋势提醒和背景判断，不能替代官方法规。" };
  }
  if (/\.edu|\.org/.test(lower)) {
    return { score: 68, label: "中：机构来源", reason: "可作为背景参考，建议和官方入口交叉核验。" };
  }
  return { score: 55, label: "中：普通公开来源", reason: "只作为提醒线索，需要打开原文并复核发布主体。" };
}

function takeawayFor(article = {}) {
  const category = categoryFor(article);
  if (category === "海关/税号") return "可能涉及税号、监管条件、归类口径或申报资料变化，建议关务复核。";
  if (category === "认证/合规") return "可能涉及 3C、CE、FCC、UKCA 或认证规则变化，建议按产品类别核对。";
  if (category === "电池/危险品") return "可能影响锂电池资料、包装标签、运输方式或承运人限制。";
  if (category === "进出口政策") return "可能影响进口准入、出口管制、目的国要求或清关资料。";
  if (category === "物流/趋势") return "可能影响船期、港口作业、运输成本或交付承诺。";
  return "作为政策背景观察；正式判断仍需打开权威来源核验。";
}

function normalizeArticle(article = {}) {
  const domain = article.domain || "";
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain,
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    category: categoryFor(article),
    sourceType: credibilityFor(domain).score >= 90 ? "官方/国际组织" : "公开解读/新闻",
    credibility: credibilityFor(domain),
    takeaway: takeawayFor(article)
  };
}

function fallback(message = "", filters = {}) {
  return {
    ok: false,
    fallback: true,
    source: "固定政策清单",
    updatedAt: new Date().toISOString(),
    filters,
    message,
    summary: "当前先提供官方入口、认证入口和行业解读入口。公开新闻只做提醒，不替代正式政策判断。",
    items: fallbackItems
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const params = event.queryStringParameters || {};
  const filters = {
    exportCountry: clean(params.exportCountry),
    importCountry: clean(params.importCountry),
    product: clean(params.product),
    keyword: clean(params.keyword),
    direction: clean(params.direction)
  };

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", buildQuery(filters));
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", "10");
  url.searchParams.set("sort", "datedesc");

  try {
    const response = await getJson(url);
    const data = response.data;
    const articles = Array.isArray(data.articles) ? data.articles.map(normalizeArticle) : [];
    if (!response.ok || !articles.length) return json(200, fallback("公开新闻接口没有返回结果。", filters));

    const targetText = [filters.exportCountry && `出口国 ${filters.exportCountry}`, filters.importCountry && `进口国 ${filters.importCountry}`, filters.product && `产品 ${filters.product}`, filters.direction]
      .filter(Boolean)
      .join("、");

    return json(200, {
      ok: true,
      source: "GDELT DOC 2.1 + 官方入口 + 可信度分层",
      updatedAt: new Date().toISOString(),
      filters,
      summary: `${targetText ? `围绕 ${targetText}，` : ""}过去一周找到 ${articles.length} 条公开消息。官方/国际组织可优先核验，媒体和行业内容用于趋势提醒，正式申报仍以法规和关务复核为准。`,
      items: articles
    });
  } catch (error) {
    return json(200, fallback(error.message || "Policy query failed.", filters));
  }
};
