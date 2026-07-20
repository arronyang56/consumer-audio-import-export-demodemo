exports.config = { schedule: "0 */6 * * *" };

const fs = require("fs/promises");
const path = require("path");

const topics = [
  { product: "锂离子电池 移动电源 充电宝", importCountry: "中国", direction: "进口", keyword: "CCC 认证 海关" },
  { product: "电源适配器 充电器", importCountry: "中国", direction: "进口", keyword: "CCC 认证 海关" },
  { product: "蓝牙 无线 音频设备", importCountry: "中国", direction: "进口", keyword: "CCC 认证 海关" },
  { product: "", importCountry: "中国", direction: "进口", keyword: "贸易救济 反倾销 反补贴" },
  { product: "蓝牙耳机 无线音箱", exportCountry: "中国", importCountry: "美国", direction: "出口", keyword: "关税 301 海关" },
  { product: "蓝牙耳机 无线音箱", exportCountry: "中国", importCountry: "欧盟", direction: "出口", keyword: "认证 RED RoHS 海关" },
  { product: "锂电池 移动电源", exportCountry: "中国", importCountry: "英国", direction: "出口", keyword: "认证 电池 进口" },
  { product: "蓝牙耳机 无线音箱", exportCountry: "中国", importCountry: "越南", direction: "出口", keyword: "海关 无线认证 进口政策" },
  { product: "蓝牙耳机 无线音箱", exportCountry: "中国", importCountry: "印度尼西亚", direction: "出口", keyword: "BTKI SDPPI 进口政策" },
  { product: "蓝牙耳机 无线音箱", exportCountry: "中国", importCountry: "日本", direction: "出口", keyword: "TELEC PSE 海关" },
  { product: "蓝牙耳机 无线音箱", exportCountry: "中国", importCountry: "韩国", direction: "出口", keyword: "KC RRA 海关" }
];

const policyCacheKey = "ca:policy-cache";
const hotspotCacheKey = "ca:hotspot-cache";

const trendTopics = [
  { id: "politics", label: "政治", keyword: "(geopolitics OR election OR sanction OR export control OR war OR conflict OR trade policy OR government) when:3d" },
  { id: "technology", label: "科技", keyword: "(technology OR AI OR semiconductor OR chip OR consumer electronics OR bluetooth OR battery OR software OR cybersecurity) when:3d" },
  { id: "finance", label: "金融", keyword: "(global economy OR inflation OR interest rates OR currency OR oil OR freight OR market OR stock OR bond OR central bank) when:3d" }
];

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

async function saveCache(storageKey, payload) {
  if (!storageConfigured()) return false;
  const value = JSON.stringify(payload);
  if (upstashConfigured()) {
    await redis(["SET", storageKey, value]);
    return true;
  }
  await fs.mkdir(localDataDir(), { recursive: true });
  await fs.writeFile(localFilePath(storageKey), value, "utf8");
  return true;
}

async function sendEmail(subject, text) {
  if (!process.env.RESEND_API_KEY || !process.env.ALERT_FROM_EMAIL || !process.env.POLICY_DIGEST_EMAIL) {
    return { sent: false, reason: "email_not_configured" };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.ALERT_FROM_EMAIL,
      to: [process.env.POLICY_DIGEST_EMAIL],
      subject,
      text
    })
  });
  return { sent: response.ok, status: response.status };
}

async function queryPolicy(topic) {
  const siteUrl = process.env.URL || process.env.SITE_URL || "https://logismaster.cn";
  const url = new URL("/.netlify/functions/policy-monitor", siteUrl);
  Object.entries(topic).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url);
  return response.json();
}

async function queryTrends(topic) {
  const siteUrl = process.env.URL || process.env.SITE_URL || "https://logismaster.cn";
  const url = new URL("/.netlify/functions/global-trends", siteUrl);
  if (topic.keyword) url.searchParams.set("keyword", topic.keyword);
  const response = await fetch(url);
  return response.json();
}

function hostFromUrl(url = "") {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function dedupeItems(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.url || ""}|${item.title || ""}`.toLowerCase();
    if (!key.trim() || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function topicScore(item = {}) {
  const text = `${item.title || ""} ${item.summary || ""} ${item.description || ""} ${item.category || ""} ${item.takeawayZh || item.takeaway || ""}`.toLowerCase();
  let score = 8;
  if (/tariff|customs|sanction|export control|import restriction|certification|regulation|battery|shipping|port|freight|supply chain|inflation|interest|currency|oil|geopolitics|conflict|strike|关税|海关|制裁|出口管制|认证|监管|电池|航运|港口|运费|供应链|通胀|汇率|利率|油价|地缘|冲突|罢工/.test(text)) score += 20;
  if (/gov|customs|wto|worldbank|imf|federalregister|cbp|ustr|europa|iata|imo/.test(String(item.domain || ""))) score += 10;
  const timestamp = Date.parse(item.seendate || item.date || item.pubDate || item.publishedAt || item.updatedAt || "");
  if (timestamp) {
    const ageHours = (Date.now() - timestamp) / 36e5;
    if (ageHours <= 24) score += 32;
    else if (ageHours <= 72) score += 18;
    else if (ageHours <= 168) score += 6;
    else score -= 18;
  }
  return score;
}

function hotText(item = {}, includeCategory = false) {
  return `${item.title || ""} ${includeCategory ? item.category || "" : ""} ${item.summary || ""} ${item.description || ""} ${item.takeawayZh || item.takeaway || ""} ${item.domain || ""}`.toLowerCase();
}

function isHotspotNoise(item = {}) {
  const text = hotText(item, true);
  return /review|movie|film|tv|series|horror|comedy|celebrity|sports|gaming|game review|trailer|box office|影视|电影|剧集|娱乐|明星|体育|游戏评测/.test(text)
    && !/policy|government|regulation|market|stock|finance|ai|chip|semiconductor|cyber|tariff|sanction|政策|政府|监管|金融|市场|芯片|网络安全|关税|制裁/.test(text);
}

function categoryForItem(item = {}) {
  if (isHotspotNoise(item)) return "";
  const text = hotText(item);
  if (/\bai\b|artificial intelligence|chip|semiconductor|bluetooth|battery|consumer electronics|software|cyber|data center|quantum|robot|hardware|telecom|\btechnology\b|科技|芯片|半导体|蓝牙|电池|消费电子|软件|网络安全|人工智能|数据中心|量子|机器人|硬件|通信/.test(text)) return "科技";
  if (/usb-c|charger|charging standard|充电标准|充电接口|适配器/.test(text)) return "科技";
  if (/rate|inflation|currency|oil|market|stock|bond|finance|central bank|economy|freight|surcharge|price|banking|yield|gdp|汇率|利率|通胀|油价|金融|经济|市场|运费|附加费|价格|成本|央行|股票|债券/.test(text)) return "金融";
  if (/geopolitic|election|government|policy|tariff|customs|sanction|export control|war|conflict|military|diplomatic|trade|regulation|law|court|minister|president|政治|选举|政府|政策|关税|海关|制裁|出口管制|战争|冲突|军事|外交|贸易|监管|法律|法院|总统|部长/.test(text)) return "政治";
  return "";
}

function buildHotspotBoards(topicResults = []) {
  const allItems = dedupeItems(topicResults.flatMap((result) => result.items || []))
    .map((item) => ({
      ...item,
      domain: item.domain || hostFromUrl(item.url),
      hotCategory: categoryForItem(item),
      hotScore: topicScore(item)
    }))
    .filter((item) => item.hotCategory)
    .sort((a, b) => b.hotScore - a.hotScore);
  const categories = ["政治", "科技", "金融"];
  const boards = categories.map((category) => ({
    category,
    items: allItems.filter((item) => item.hotCategory === category).slice(0, 10)
  }));
  return { allItems: allItems.slice(0, 30), boards };
}

exports.handler = async () => {
  const results = [];
  for (const topic of topics) {
    try {
      const data = await queryPolicy(topic);
      results.push({
        topic,
        summary: data.summary || "",
        evidenceStatus: data.evidenceStatus || "",
        recordBreakdown: data.recordBreakdown || {},
        items: (data.items || []).slice(0, 6).map((item) => ({
          title: item.title,
          url: item.url,
          takeaway: item.takeaway || item.takeawayZh || "",
          recordType: item.recordType || "news-analysis",
          bodyEvidence: Boolean(item.bodyEvidence),
          publishedAt: item.publishedAt || item.seendate || "",
          effectiveAt: item.effectiveAt || "",
          appliesTo: item.appliesTo || "",
          businessImpact: item.businessImpact || item.action || "",
          evidenceStatement: item.evidenceStatement || ""
        }))
      });
    } catch (error) {
      results.push({ topic, error: error.message || "policy query failed" });
    }
  }

  const payload = { ok: true, updatedAt: new Date().toISOString(), results };
  const stored = await saveCache(policyCacheKey, payload);
  const trendResults = [];
  for (const topic of trendTopics) {
    try {
      const data = await queryTrends(topic);
      trendResults.push({
        id: topic.id,
        label: topic.label,
        keyword: topic.keyword,
        ok: Boolean(data.ok),
        summary: data.summary || "",
        updatedAt: data.updatedAt || "",
        sourceBreakdown: data.sourceBreakdown || [],
        indicators: data.indicators || [],
        insights: data.insights || [],
        items: (data.items || []).slice(0, 10)
      });
    } catch (error) {
      trendResults.push({ id: topic.id, label: topic.label, keyword: topic.keyword, ok: false, error: error.message || "trend query failed", items: [] });
    }
  }
  const hotspotBoards = buildHotspotBoards(trendResults);
  const hotspotPayload = {
    ok: true,
    updatedAt: new Date().toISOString(),
    source: "scheduled global hotlist",
    topics: trendResults,
    boards: hotspotBoards.boards,
    items: hotspotBoards.allItems,
    indicators: trendResults.flatMap((item) => item.indicators || []).slice(0, 10),
    sourceBreakdown: trendResults.flatMap((item) => item.sourceBreakdown || []).slice(0, 24)
  };
  const hotspotStored = await saveCache(hotspotCacheKey, hotspotPayload);
  const text = results
    .map((item) => {
      const topic = [item.topic.importCountry, item.topic.product].filter(Boolean).join(" / ");
      const lines = (item.items || []).map((entry) => `- ${entry.title}\n  ${entry.url}`).join("\n");
      return `${topic}\n${item.summary || item.error || ""}\n${lines}`;
    })
    .join("\n\n");
  const email = await sendEmail("进出口政策定时摘要", text);

  return json(200, { ...payload, stored, hotspotStored, hotspotCount: hotspotPayload.items.length, email });
};
