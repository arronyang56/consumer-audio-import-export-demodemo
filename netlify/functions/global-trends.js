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

const keywordMap = [
  [/船期|航运|港口|物流|海运|货代/i, ["shipping", "vessel schedule", "port", "freight", "logistics", "supply chain"]],
  [/关税|税率|税号|海关|清关/i, ["tariff", "duty", "customs", "HS code", "trade policy"]],
  [/电池|锂电|危险品|dg/i, ["lithium battery", "battery", "dangerous goods", "UN38.3"]],
  [/科技|消费电子|蓝牙|耳机|音箱|芯片|ai|人工智能/i, ["consumer electronics", "bluetooth", "headphones", "speaker", "chip", "AI", "technology"]],
  [/红海|苏伊士/i, ["Red Sea", "Suez", "shipping disruption"]],
  [/汇率|利率|通胀|金融|美元|人民币/i, ["currency", "exchange rate", "interest rates", "inflation", "central bank"]],
  [/美国|大选|选举/i, ["United States", "US election", "trade policy"]],
  [/欧盟|欧洲/i, ["EU", "European Union", "trade", "customs"]],
  [/中国|出口|进口/i, ["China", "export", "import", "customs"]],
  [/日本/i, ["Japan", "Japanese customs", "trade policy", "shipping"]],
  [/泰国|林查班|曼谷/i, ["Thailand", "Thai customs", "Laem Chabang", "Bangkok port"]],
  [/中东|沙特|阿联酋|迪拜/i, ["Middle East", "GCC", "Saudi", "UAE", "Dubai trade"]],
  [/南非|德班|开普敦/i, ["South Africa", "SARS customs", "Durban port", "Cape Town port"]],
  [/韩国/i, ["Korea", "Korea customs", "KC certification", "shipping"]],
  [/越南|胡志明/i, ["Vietnam", "Vietnam customs", "Cat Lai port", "shipping"]],
  [/新加坡/i, ["Singapore", "Singapore Customs", "transshipment", "port"]],
  [/马来西亚|巴生/i, ["Malaysia", "Port Klang", "Malaysia customs", "SIRIM"]],
  [/印度/i, ["India", "CBIC", "BIS", "shipping"]],
  [/巴西|桑托斯/i, ["Brazil", "Receita Federal", "Siscomex", "ANATEL", "Santos port"]],
  [/墨西哥/i, ["Mexico", "SNICE", "TIGIE", "IFETEL", "Manzanillo port"]],
  [/加拿大|温哥华/i, ["Canada", "CBSA", "ISED", "Vancouver port"]],
  [/印尼|印度尼西亚|雅加达/i, ["Indonesia", "DGCE", "INSW", "SDPPI", "Jakarta port"]],
  [/菲律宾|马尼拉/i, ["Philippines", "Bureau of Customs", "Tariff Commission", "Manila port"]],
  [/土耳其|伊斯坦布尔/i, ["Turkey", "Turkish customs", "BTK", "Istanbul port"]],
  [/阿联酋|迪拜|杰贝阿里/i, ["UAE", "Dubai Customs", "Dubai Trade", "Jebel Ali"]],
  [/沙特|吉达|达曼/i, ["Saudi Arabia", "ZATCA", "SABER", "Jeddah port", "Dammam port"]],
  [/拥堵|塞港|压港|排队/i, ["port congestion", "vessel queue", "berth waiting", "terminal delay"]]
];

const mediaFeeds = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", country: "Global", domain: "bbc.co.uk", category: "政治/地缘" },
  { name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml", country: "Global", domain: "bbc.co.uk", category: "金融/经济" },
  { name: "CNN Latest", url: "http://rss.cnn.com/rss/cnn_latest.rss", country: "Global", domain: "cnn.com", category: "经济/政治/金融" },
  { name: "CNN World", url: "http://rss.cnn.com/rss/edition_world.rss", country: "Global", domain: "cnn.com", category: "政治/地缘" },
  { name: "Al Jazeera World", url: "https://www.aljazeera.com/xml/rss/all.xml", country: "Global", domain: "aljazeera.com", category: "政治/地缘" },
  { name: "NPR World", url: "https://feeds.npr.org/1004/rss.xml", country: "United States", domain: "npr.org", category: "政治/地缘" },
  { name: "Politico", url: "https://www.politico.com/rss/politicopicks.xml", country: "United States", domain: "politico.com", category: "政治/政策" },
  { name: "CCTV World", url: "http://english.cctv.cn/service/rss/2/index.xml", country: "China", domain: "english.cctv.cn", category: "政治/地缘" },
  { name: "CCTV Biz", url: "http://english.cctv.cn/service/rss/3/index.xml", country: "China", domain: "english.cctv.cn", category: "金融/经济" },
  { name: "gCaptain", url: "https://gcaptain.com/feed/", country: "Global", domain: "gcaptain.com", category: "物流/供应链" },
  { name: "The Loadstar", url: "https://theloadstar.com/feed/", country: "Global", domain: "theloadstar.com", category: "物流/供应链" },
  { name: "Maritime Executive", url: "https://maritime-executive.com/feed", country: "Global", domain: "maritime-executive.com", category: "物流/供应链" },
  { name: "FreightWaves", url: "https://www.freightwaves.com/news/feed", country: "Global", domain: "freightwaves.com", category: "物流/供应链" },
  { name: "Splash247", url: "https://splash247.com/feed/", country: "Global", domain: "splash247.com", category: "物流/供应链" },
  { name: "Port Technology", url: "https://www.porttechnology.org/feed/", country: "Global", domain: "porttechnology.org", category: "港口/物流" },
  { name: "Hellenic Shipping News", url: "https://www.hellenicshippingnews.com/feed/", country: "Global", domain: "hellenicshippingnews.com", category: "航运/市场" },
  { name: "Safety4Sea", url: "https://safety4sea.com/feed/", country: "Global", domain: "safety4sea.com", category: "海事/安全" },
  { name: "WTO Latest News", url: "https://www.wto.org/library/rss/latest_news_e.xml", country: "Global", domain: "wto.org", category: "官方/贸易政策" },
  { name: "IMF News", url: "https://www.imf.org/en/News/RSS", country: "Global", domain: "imf.org", category: "金融/经济" },
  { name: "World Bank News", url: "https://www.worldbank.org/en/news/all?format=rss", country: "Global", domain: "worldbank.org", category: "金融/经济" },
  { name: "Federal Reserve Press", url: "https://www.federalreserve.gov/feeds/press_all.xml", country: "United States", domain: "federalreserve.gov", category: "金融/经济" },
  { name: "European Central Bank", url: "https://www.ecb.europa.eu/rss/press.html", country: "EU", domain: "ecb.europa.eu", category: "金融/经济" },
  { name: "BIS", url: "https://www.bis.org/list/press_releases/index.rss", country: "Global", domain: "bis.org", category: "金融/经济" },
  { name: "CNBC Economy", url: "https://www.cnbc.com/id/20910258/device/rss/rss.html", country: "United States", domain: "cnbc.com", category: "金融/经济" },
  { name: "MarketWatch Top Stories", url: "https://feeds.content.dowjones.io/public/rss/mw_topstories", country: "United States", domain: "marketwatch.com", category: "金融/市场" },
  { name: "S&P Global Market Intelligence", url: "https://www.spglobal.com/marketintelligence/en/news-insights/rss", country: "Global", domain: "spglobal.com", category: "金融/经济" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", country: "Global", domain: "techcrunch.com", category: "消费电子/科技" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml", country: "Global", domain: "theverge.com", category: "消费电子/科技" },
  { name: "Wired", url: "https://www.wired.com/feed/rss", country: "Global", domain: "wired.com", category: "消费电子/科技" },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/feeds/feed.rss", country: "Global", domain: "spectrum.ieee.org", category: "消费电子/科技" },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/feed/", country: "Global", domain: "technologyreview.com", category: "科技/AI" },
  { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index", country: "Global", domain: "arstechnica.com", category: "科技/硬件" },
  { name: "Bluetooth SIG News", url: "https://www.bluetooth.com/feed/", country: "Global", domain: "bluetooth.com", category: "消费电子/科技" }
];

const marketSources = {
  cn: { names: ["中国", "china", "大陆"], sources: [["海关总署", "http://www.customs.gov.cn/", "中国海关公告、政策法规和归类决定。"], ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/", "3C 目录和认证公告。"]] },
  us: { names: ["美国", "us", "usa", "united states"], sources: [["USITC HTS", "https://hts.usitc.gov/", "美国 HTS 税号和税率。"], ["CBP", "https://www.cbp.gov/", "美国海关政策和贸易执行。"], ["FCC", "https://www.fcc.gov/", "美国无线产品合规入口。"]] },
  uk: { names: ["英国", "uk", "united kingdom"], sources: [["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/", "英国税则、税率和进口措施。"], ["GOV.UK Import Goods", "https://www.gov.uk/import-goods-into-uk", "英国进口流程。"]] },
  eu: { names: ["欧盟", "欧洲", "eu", "europe", "德国", "法国", "荷兰"], sources: [["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home", "欧盟关税和产品要求。"], ["EU Safety Gate", "https://ec.europa.eu/safety-gate-alerts/", "欧盟消费品安全风险通报。"]] },
  jp: { names: ["日本", "japan", "jp"], sources: [["Japan Customs Tariff", "https://www.customs.go.jp/english/tariff/", "日本税则和关税。"], ["METI Product Safety", "https://www.meti.go.jp/english/policy/economy/consumer/product_safety/", "日本产品安全和 PSE。"], ["MIC Radio Use", "https://www.tele.soumu.go.jp/e/index.htm", "日本无线设备监管。"]] },
  th: { names: ["泰国", "thailand", "thai"], sources: [["Thai Customs", "https://www.customs.go.th/", "泰国海关和税则。"], ["NBTC", "https://www.nbtc.go.th/", "泰国无线设备监管。"], ["TISI", "https://www.tisi.go.th/", "泰国产品标准。"]] },
  gcc: { names: ["中东", "gcc", "沙特", "阿联酋", "uae", "saudi"], sources: [["GSO Conformity", "https://www.gso.org.sa/en/conformity/conformity-tracking-system/", "GCC 合格评定。"], ["SABER Saudi", "https://saber.sa/", "沙特 SABER 平台。"]] },
  za: { names: ["南非", "south africa", "za", "durban", "cape town"], sources: [["South African Revenue Service", "https://www.sars.gov.za/customs-and-excise/", "南非海关和消费税入口。"], ["ITAC South Africa", "https://www.itac.org.za/", "南非贸易措施和进口管制。"], ["NRCS South Africa", "https://www.nrcs.org.za/", "南非产品合规入口。"], ["ICASA", "https://www.icasa.org.za/", "南非无线通信监管。"]] },
  kr: { names: ["韩国", "korea", "south korea"], sources: [["Korea Customs Service", "https://www.customs.go.kr/english/main.do", "韩国海关入口。"], ["KATS", "https://www.kats.go.kr/en/main.do", "韩国标准和 KC 认证参考。"]] },
  vn: { names: ["越南", "vietnam"], sources: [["Vietnam Customs", "https://www.customs.gov.vn/", "越南海关入口。"], ["Vietnam National Single Window", "https://vnsw.gov.vn/", "越南单一窗口。"]] },
  sg: { names: ["新加坡", "singapore"], sources: [["Singapore Customs", "https://www.customs.gov.sg/", "新加坡海关入口。"], ["IMDA", "https://www.imda.gov.sg/", "新加坡无线/通信设备监管。"]] },
  my: { names: ["马来西亚", "malaysia", "port klang", "巴生"], sources: [["Royal Malaysian Customs", "https://www.customs.gov.my/", "马来西亚海关入口。"], ["SIRIM QAS", "https://www.sirim-qas.com.my/", "产品认证参考。"], ["MCMC", "https://www.mcmc.gov.my/", "通信/无线设备监管。"]] },
  in: { names: ["印度", "india"], sources: [["CBIC India", "https://www.cbic.gov.in/", "印度海关和税则。"], ["BIS", "https://www.bis.gov.in/", "印度标准和认证参考。"]] },
  ca: { names: ["加拿大", "canada", "vancouver"], sources: [["CBSA Customs Tariff", "https://www.cbsa.gc.ca/trade-commerce/tariff-tarif/menu-eng.html", "加拿大海关税则。"], ["ISED Canada", "https://ised-isde.canada.ca/", "加拿大无线和产品合规。"]] },
  br: { names: ["巴西", "brazil", "brasil", "santos"], sources: [["Receita Federal Classificação", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias", "巴西 NCM/商品归类。"], ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br", "巴西外贸单一门户。"], ["ANATEL", "https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos", "巴西无线/通信产品认证。"], ["INMETRO", "https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/produtos-e-servicos-regulados", "巴西受监管产品和合格评定。"]] },
  mx: { names: ["墨西哥", "mexico", "méxico", "manzanillo"], sources: [["SNICE TIGIE", "https://www.snice.gob.mx/cs/avi/snice/tfinicio.html", "墨西哥税则和修改信息。"], ["SAT Mexico", "https://www.sat.gob.mx/", "墨西哥税务和海关入口。"], ["IFETEL", "https://www.ift.org.mx/", "墨西哥无线监管。"]] },
  id: { names: ["印尼", "印度尼西亚", "indonesia", "jakarta"], sources: [["Indonesia Customs DGCE", "https://www.beacukai.go.id/", "印尼海关入口。"], ["Indonesia National Single Window", "https://www.insw.go.id/", "印尼单一窗口。"], ["SDPPI", "https://sertifikasi.postel.go.id/", "印尼无线/通信设备认证。"]] },
  ph: { names: ["菲律宾", "philippines", "manila"], sources: [["Philippines Tariff Commission", "https://tariffcommission.gov.ph/", "菲律宾税则和归类资料。"], ["Bureau of Customs Philippines", "https://customs.gov.ph/", "菲律宾海关入口。"], ["NTC Philippines", "https://ntc.gov.ph/", "菲律宾无线通信监管。"]] },
  tr: { names: ["土耳其", "turkey", "turkiye", "türkiye"], sources: [["Turkey Trade Ministry", "https://ticaret.gov.tr/", "土耳其贸易和进口监管。"], ["Turkey Tariff Search", "https://uygulama.gtb.gov.tr/Tara/", "土耳其税则查询。"], ["BTK Turkey", "https://www.btk.gov.tr/", "土耳其通信监管。"]] },
  ae: { names: ["阿联酋", "uae", "united arab emirates", "迪拜", "dubai"], sources: [["Dubai Customs", "https://www.dubaicustoms.gov.ae/", "迪拜海关入口。"], ["Dubai Trade", "https://www.dubaitrade.ae/", "迪拜贸易和清关服务。"], ["TDRA UAE", "https://tdra.gov.ae/", "阿联酋通信/无线设备监管。"]] },
  sa: { names: ["沙特", "saudi", "saudi arabia", "ksa"], sources: [["ZATCA Saudi Customs", "https://zatca.gov.sa/", "沙特海关和税务入口。"], ["SABER Saudi", "https://saber.sa/", "沙特产品合格评定平台。"], ["SASO Saudi", "https://www.saso.gov.sa/", "沙特标准和产品安全入口。"]] }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0"
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

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "consumer-audio-import-export-demo/1.0"
    }
  });
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/rss+xml,application/xml,text/xml,text/html",
      "User-Agent": "consumer-audio-import-export-demo/1.0"
    }
  });
  return { ok: response.ok, status: response.status, text: await response.text() };
}

function decodeXml(value = "") {
  return String(value || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(block = "", tag = "") {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return decodeXml(match?.[1] || "");
}

function linkValue(block = "") {
  const explicit = tagValue(block, "link");
  if (explicit) return explicit;
  return decodeXml(block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)?.[1] || "");
}

function parseRssItems(xml = "", source = {}) {
  const itemBlocks = [...String(xml || "").matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const entryBlocks = [...String(xml || "").matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  return [...itemBlocks, ...entryBlocks].slice(0, 8).map((block) => {
    const title = tagValue(block, "title");
    const link = linkValue(block);
    const description = tagValue(block, "description") || tagValue(block, "summary");
    const published = tagValue(block, "pubDate") || tagValue(block, "updated") || tagValue(block, "published");
    const sourceName = tagValue(block, "source") || source.name || source.domain || "";
    return {
      title: title.replace(/\s+-\s+[^-]{2,40}$/g, "") || sourceName || "RSS item",
      url: link,
      domain: source.domain || hostFromUrl(link) || sourceName,
      sourceCountry: source.country || "Global",
      seendate: published,
      language: "",
      description,
      summary: description,
      category: source.category || makeCategory({ title: `${title} ${description}`, domain: source.domain }),
      takeaway: makeTakeaway({ title: `${title} ${description}`, domain: source.domain }),
      takeawayZh: makeTakeaway({ title: `${title} ${description}`, domain: source.domain })
    };
  });
}

function hostFromUrl(url = "") {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
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
  return article.title ? `该来源标题指向：${article.title}。` : "该来源未返回可读摘要。";
}

function isOfficialLike(item = {}) {
  const domain = String(item.domain || "").toLowerCase();
  const category = String(item.category || "").toLowerCase();
  return category.includes("官方") || /(^|\.)gov(\.|$)|gov\.|wto\.org|worldbank\.org|imf\.org|unctad\.org|oecd\.org|europa\.eu|customs|anatel|inmetro|siscomex|receita|cbsa|snice|sat\.gob|beacukai|saber\.sa|zatca|saso/.test(domain);
}

function isTrendNoise(item = {}) {
  const text = `${item.title || ""} ${item.description || ""} ${item.summary || ""} ${item.category || ""}`.toLowerCase();
  return /review|movie|film|tv|series|horror|comedy|celebrity|sports|gaming|game review|trailer|box office|影视|电影|剧集|娱乐|明星|体育|游戏评测/.test(text)
    && !/policy|government|regulation|market|stock|finance|ai|chip|semiconductor|cyber|tariff|sanction|政策|政府|监管|金融|市场|芯片|网络安全|关税|制裁/.test(text);
}

function hasBusinessContext(item = {}) {
  const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();
  return /trade|tariff|customs|import|export|duty|tax|vat|sanction|regulation|policy|certification|standard|compliance|anatel|inmetro|siscomex|receita|ncm|hs code|shipping|port|freight|vessel|container|supply chain|logistics|congestion|strike|economy|economic|currency|exchange|interest|inflation|market|finance|geopolitic|election|government|war|conflict|ai|artificial intelligence|chip|semiconductor|cyber|data center|technology|software|hardware|battery|海关|关税|税率|进口|出口|税号|清关|通关|认证|标准|合规|监管|政策|港口|船期|航运|物流|供应链|拥堵|塞港|罢工|经济|金融|汇率|利率|通胀|市场|政治|政府|选举|冲突|芯片|半导体|网络安全|人工智能|科技/.test(text);
}

function isRelevant(item = {}, keyword = "") {
  if (isTrendNoise(item)) return false;
  const cleaned = cleanKeyword(keyword);
  if (!cleaned) return isOfficialLike(item) || hasBusinessContext(item);
  const haystack = `${item.title || ""} ${item.takeaway || ""} ${item.takeawayZh || ""} ${item.domain || ""} ${item.sourceCountry || ""} ${item.category || ""}`.toLowerCase();
  const market = detectMarket(cleaned);
  if (market) {
    const marketHaystack = `${item.title || ""} ${item.domain || ""} ${item.sourceCountry || ""}`.toLowerCase();
    const marketMatch = marketSources[market].names.some((name) => marketHaystack.includes(name.toLowerCase()));
    if (marketMatch && (isOfficialLike(item) || hasBusinessContext(item))) return true;
    if (/[^\x00-\x7F]/.test(cleaned)) return false;
  }
  const expandedTerms = expandKeywordTerms(cleaned).map((term) => term.toLowerCase());
  if (expandedTerms.some((term) => term && haystack.includes(term))) return true;
  const rawTerms = cleaned
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length >= 2);
  if (/[^\x00-\x7F]/.test(cleaned)) {
    const titleHaystack = `${item.title || ""} ${item.domain || ""} ${item.sourceCountry || ""}`.toLowerCase();
    return rawTerms.some((term) => titleHaystack.includes(term));
  }
  if (rawTerms.length > 1 && rawTerms.every((term) => /^[a-z0-9.'"-]+$/i.test(term))) {
    return rawTerms.every((term) => haystack.includes(term));
  }
  return rawTerms.some((term) => haystack.includes(term));
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
    description: article.description || "",
    summary: article.summary || article.description || "",
    category: makeCategory(article),
    takeaway: makeTakeaway(article),
    takeawayZh: makeTakeaway(article)
  };
}

function normalizeFederalRegister(document = {}) {
  const description = document.abstract || "";
  return {
    title: document.title || "Federal Register document",
    url: document.html_url || document.pdf_url || "",
    domain: "federalregister.gov",
    sourceCountry: "United States",
    seendate: document.publication_date || "",
    language: "English",
    description,
    summary: description,
    category: makeCategory({ title: `${document.title || ""} ${document.abstract || ""}`, domain: "federalregister.gov" }),
    takeaway: makeTakeaway({ title: `${document.title || ""} ${document.abstract || ""}` }),
    takeawayZh: makeTakeaway({ title: `${document.title || ""} ${document.abstract || ""}` })
  };
}

function normalizeGovUk(result = {}) {
  const description = result.description || "";
  return {
    title: result.title || "GOV.UK result",
    url: result.link ? `https://www.gov.uk${result.link}` : "https://www.gov.uk/",
    domain: "gov.uk",
    sourceCountry: "United Kingdom",
    seendate: result.public_timestamp || "",
    language: "English",
    description,
    summary: description,
    category: makeCategory({ title: `${result.title || ""} ${result.description || ""}`, domain: "gov.uk" }),
    takeaway: result.description || `GOV.UK 搜索结果：${result.title || "未返回摘要"}`,
    takeawayZh: result.description || `GOV.UK 搜索结果：${result.title || "未返回摘要"}`
  };
}

function detectMarket(keyword = "") {
  const lower = cleanKeyword(keyword).toLowerCase();
  return Object.entries(marketSources).find(([, config]) => config.names.some((name) => lower.includes(name.toLowerCase())))?.[0] || "";
}

function normalizeOfficialSource([title, url, note], market = "") {
  return {
    title,
    url,
    domain: new URL(url).hostname.replace(/^www\./, ""),
    sourceCountry: market ? marketSources[market]?.names?.[0] || "" : "",
    seendate: "",
    language: "",
    description: note || "",
    summary: note || "",
    category: "官方入口",
    takeaway: note,
    takeawayZh: note
  };
}

function marketOfficialItems(market = "") {
  return market && marketSources[market] ? marketSources[market].sources.map((item) => normalizeOfficialSource(item, market)) : [];
}

async function fetchFederalRegister(keyword = "") {
  const term = keyword ? `${keyword} tariff customs trade shipping logistics` : "tariff customs trade shipping logistics supply chain";
  const url = new URL("https://www.federalregister.gov/api/v1/documents.json");
  url.searchParams.set("conditions[term]", term);
  url.searchParams.set("per_page", "3");
  url.searchParams.set("order", "newest");
  const response = await fetchJson(url);
  return response.ok && Array.isArray(response.data.results) ? response.data.results.map(normalizeFederalRegister) : [];
}

async function fetchGovUk(keyword = "") {
  const term = keyword ? `${keyword} tariff customs import export` : "tariff customs import export trade";
  const url = new URL("https://www.gov.uk/api/search.json");
  url.searchParams.set("q", term);
  url.searchParams.set("count", "3");
  const response = await fetchJson(url);
  return response.ok && Array.isArray(response.data.results) ? response.data.results.map(normalizeGovUk) : [];
}

async function fetchWorldBankIndicators() {
  const indicators = [
    ["World GDP growth", "NY.GDP.MKTP.KD.ZG"],
    ["World inflation", "FP.CPI.TOTL.ZG"]
  ];
  const rows = [];
  for (const [name, code] of indicators) {
    const url = `https://api.worldbank.org/v2/country/WLD/indicator/${code}?format=json&per_page=5`;
    const response = await fetchJson(url);
    const values = Array.isArray(response.data?.[1]) ? response.data[1] : [];
    const latest = values.find((item) => item.value !== null && item.value !== undefined);
    if (latest) rows.push({ name, value: Number(latest.value).toFixed(2), date: latest.date, source: "World Bank" });
  }
  return rows;
}

async function fetchFxRates() {
  const response = await fetchJson("https://api.frankfurter.app/latest?from=USD&to=CNY,EUR,GBP,JPY");
  if (!response.ok || !response.data?.rates) return [];
  return Object.entries(response.data.rates).map(([currency, value]) => ({
    name: `USD/${currency}`,
    value,
    date: response.data.date,
    source: "Frankfurter"
  }));
}

async function fetchGoogleNews(keyword = "") {
  const term = keyword
    ? `${keyword} trade OR customs OR tariff OR shipping OR economy OR finance when:7d`
    : "global economy OR trade OR tariff OR shipping OR finance when:7d";
  const url = new URL("https://news.google.com/rss/search");
  url.searchParams.set("q", term);
  url.searchParams.set("hl", "zh-CN");
  url.searchParams.set("gl", "CN");
  url.searchParams.set("ceid", "CN:zh-Hans");
  const response = await fetchText(url);
  if (!response.ok) return [];
  return parseRssItems(response.text, {
    name: "Google News",
    domain: "news.google.com",
    country: "Global",
    category: "经济/政治/金融"
  })
    .filter((item) => isRelevant(item, keyword))
    .slice(0, 6);
}

async function fetchMediaFeeds(keyword = "") {
  const settled = await Promise.allSettled(mediaFeeds.map(async (source) => {
    const response = await fetchText(source.url);
    if (!response.ok) return [];
    return parseRssItems(response.text, source)
      .filter((item) => isRecentEnough(item) && isRelevant(item, keyword))
      .slice(0, keyword ? 3 : 2);
  }));
  return settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

function cleanKeyword(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

function expandKeywordTerms(keyword = "") {
  const cleaned = cleanKeyword(keyword);
  if (!cleaned) return [];
  const terms = new Set([cleaned]);
  keywordMap.forEach(([pattern, aliases]) => {
    if (pattern.test(cleaned)) aliases.forEach((alias) => terms.add(alias));
  });
  return Array.from(terms).slice(0, 8);
}

function expandKeyword(keyword = "") {
  return expandKeywordTerms(keyword)
    .map((term) => `"${term}"`)
    .join(" OR ");
}

function isRecentEnough(item = {}, days = 14) {
  const time = Date.parse(item.seendate || "");
  if (!Number.isFinite(time)) return true;
  const now = Date.now();
  return time >= now - days * 24 * 60 * 60 * 1000 && time <= now + 24 * 60 * 60 * 1000;
}

function keywordFallbackItems(keyword = "") {
  const cleaned = cleanKeyword(keyword);
  if (!cleaned) return fallbackItems;
  const lower = cleaned.toLowerCase();
  if (/船期|航运|港口|物流|shipping|port|freight/.test(lower)) {
    return [
      {
        title: `${cleaned}：物流和船期趋势观察`,
        sourceCountry: "Global",
        domain: "Manual checklist",
        url: "https://www.maritime-executive.com/",
        seendate: "",
        category: "物流/供应链",
        takeaway: "重点看港口拥堵、天气、罢工、红海/苏伊士绕航、船司调整和目的港提箱预约是否影响 ETA。",
        takeawayZh: "重点看港口拥堵、天气、罢工、红海/苏伊士绕航、船司调整和目的港提箱预约是否影响 ETA。"
      }
    ];
  }
  if (/电池|锂电|危险|battery|dg/.test(lower)) {
    return [
      {
        title: `${cleaned}：电池和危险品趋势观察`,
        sourceCountry: "Global",
        domain: "Manual checklist",
        url: "https://www.iata.org/",
        seendate: "",
        category: "电池/危险品",
        takeaway: "重点看锂电池运输限制、UN38.3、MSDS、包装标签、空运/快递渠道和目的港 DG 接受规则。",
        takeawayZh: "重点看锂电池运输限制、UN38.3、MSDS、包装标签、空运/快递渠道和目的港 DG 接受规则。"
      }
    ];
  }
  if (/关税|税率|海关|tariff|customs/.test(lower)) {
    return [
      {
        title: `${cleaned}：关税和海关政策观察`,
        sourceCountry: "Global",
        domain: "Manual checklist",
        url: "https://www.wto.org/",
        seendate: "",
        category: "贸易/政策",
        takeaway: "重点看关税、贸易救济、出口管制、原产地规则、海关估价和监管条件是否变化。",
        takeawayZh: "重点看关税、贸易救济、出口管制、原产地规则、海关估价和监管条件是否变化。"
      }
    ];
  }
  return [
    {
      title: `${cleaned}：趋势观察`,
      sourceCountry: "Global",
      domain: "Manual checklist",
      url: "https://www.reuters.com/markets/",
      seendate: "",
      category: "经济/政治/金融",
      takeaway: "先判断它是否会影响成本、汇率、交期、清关资料、目的国准入或客户交付承诺。",
      takeawayZh: "先判断它是否会影响成本、汇率、交期、清关资料、目的国准入或客户交付承诺。"
    }
  ];
}

function dedupeArticles(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.url || ""}|${item.title || ""}`.toLowerCase();
    if (!key.trim() || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildTrendSummary(items = [], indicators = [], keyword = "") {
  const text = items.map((item) => `${item.title} ${item.category} ${item.takeawayZh || item.takeaway}`).join(" ").toLowerCase();
  const conclusions = [];
  if (/tariff|customs|sanction|export|import|trade|关税|海关|制裁|进出口|贸易/.test(text)) {
    conclusions.push("贸易/海关：要重点看税率、准入、制裁或清关资料是否变化");
  }
  if (/shipping|port|freight|supply chain|logistics|vessel|船|港口|物流|供应链|红海|suez/.test(text)) {
    conclusions.push("物流：要提前确认船期、港口作业、绕航和费用是否影响交期");
  }
  if (/rate|inflation|currency|market|oil|central bank|汇率|利率|通胀|金融|油价/.test(text)) {
    conclusions.push("成本：要关注汇率、利率、能源和金融波动对报价/采购成本的影响");
  }
  if (/election|war|conflict|geopolitics|政治|选举|冲突|地缘/.test(text)) {
    conclusions.push("政治/地缘：要留意出口管制、贸易摩擦和客户交付风险");
  }
  if (!conclusions.length) conclusions.push("本次来源没有直接写明物流、清关、舱位或成本变化");
  const indicatorText = indicators.length ? `同时更新了 ${indicators.length} 个宏观/汇率指标。` : "";
  return `${keyword ? `关键词“${keyword}”：` : ""}本次综合官方公告、行业物流媒体、主流新闻、GDELT 和公开指标后，主要判断是：${conclusions.join("；")}。${indicatorText}`;
}

function buildTrendInsights(items = [], indicators = [], keyword = "") {
  const text = items.map((item) => `${item.title} ${item.category} ${item.takeawayZh || item.takeaway}`).join(" ").toLowerCase();
  const insights = [
    {
      title: "贸易/海关",
      signal: /tariff|customs|sanction|export|import|trade|关税|海关|制裁|进出口|贸易/.test(text) ? "有政策或清关信号" : "未见明显新信号",
      impact: "确认税率、监管证件、目的国准入、出口限制和清关资料是否变化。"
    },
    {
      title: "物流/港口",
      signal: /shipping|port|freight|supply chain|logistics|vessel|船|港口|物流|供应链|红海|suez|congestion|berth/.test(text) ? "有物流或港口信号" : "未见明显新信号",
      impact: "确认 ETA、绕航、塞港、码头预约、提箱和交付承诺。"
    },
    {
      title: "金融/成本",
      signal: /rate|inflation|currency|market|oil|central bank|汇率|利率|通胀|金融|油价/.test(text) || indicators.length ? "有金融或成本信号" : "未见明显新信号",
      impact: "关注汇率、利率、能源、运费和付款风险对报价/采购成本的影响。"
    },
    {
      title: "政治/地缘",
      signal: /election|war|conflict|geopolitics|政治|选举|冲突|地缘/.test(text) ? "有地缘或政策不确定性信号" : "未见明显新信号",
      impact: "关注制裁、出口管制、突发事件、进口限制和客户市场需求变化。"
    }
  ];
  if (keyword) insights.unshift({ title: "本次关键词", signal: keyword, impact: "已按关键词优先筛选；如果结果少，建议换国家英文名、港口英文名或更宽泛的业务词。" });
  return insights;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const keyword = cleanKeyword(event.queryStringParameters?.keyword || "");
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
  const expanded = expandKeyword(keyword);
  const market = detectMarket(keyword);
  const query = keyword ? `(${expanded || `"${keyword}"`})` : `(${baseTerms})`;

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", query);
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", keyword ? "8" : "12");
  url.searchParams.set("sort", "datedesc");

  try {
    const [gdeltResult, federalResult, govUkResult, worldBankResult, fxResult, googleNewsResult, mediaFeedsResult] = await Promise.allSettled([
      getJson(url),
      !market || market === "us" ? fetchFederalRegister(keyword) : Promise.resolve([]),
      !market || market === "uk" ? fetchGovUk(keyword) : Promise.resolve([]),
      fetchWorldBankIndicators(),
      fetchFxRates(),
      fetchGoogleNews(keyword),
      fetchMediaFeeds(keyword)
    ]);
    const gdeltResponse = gdeltResult.status === "fulfilled" ? gdeltResult.value : null;
    const gdeltArticles = gdeltResponse?.ok && Array.isArray(gdeltResponse.data?.articles)
      ? gdeltResponse.data.articles.map(normalizeArticle).filter((item) => isRelevant(item, keyword))
      : [];
    const filterForKeyword = (items = []) => keyword ? items.filter((item) => isRelevant(item, keyword)) : items;
    const federalItems = filterForKeyword(federalResult.status === "fulfilled" ? federalResult.value : []);
    const govUkItems = filterForKeyword(govUkResult.status === "fulfilled" ? govUkResult.value : []);
    const indicators = [
      ...(worldBankResult.status === "fulfilled" ? worldBankResult.value : []),
      ...(fxResult.status === "fulfilled" ? fxResult.value : [])
    ];
    const googleNewsItems = filterForKeyword(googleNewsResult.status === "fulfilled" ? googleNewsResult.value : []);
    const mediaItems = filterForKeyword(mediaFeedsResult.status === "fulfilled" ? mediaFeedsResult.value : []);
    const officialItems = marketOfficialItems(market);
    const articles = dedupeArticles([...officialItems, ...federalItems, ...govUkItems, ...googleNewsItems, ...mediaItems, ...gdeltArticles]).slice(0, keyword ? 14 : 18);

    if (!articles.length) {
      const fallbackTrendItems = keywordFallbackItems(keyword);
      return json(200, {
        ok: false,
        fallback: true,
        source: "多源趋势接口",
        updatedAt: new Date().toISOString(),
        keyword,
        summary: keyword
          ? `暂时没有拿到“${keyword}”相关公开新闻，但已尝试补充官方公告、宏观指标和汇率数据。`
          : "公开新闻接口暂时没有返回结果，先按基础观察清单和公开指标观察。",
        indicators,
        insights: buildTrendInsights(fallbackTrendItems, indicators, keyword),
        items: fallbackTrendItems,
        sourceBreakdown: [
          { source: "Federal Register", status: `${federalItems.length} 条` },
          { source: "GOV.UK", status: `${govUkItems.length} 条` },
          { source: "Google News", status: `${googleNewsItems.length} 条` },
          { source: "RSS 行业/新闻", status: `${mediaItems.length} 条` },
          { source: "GDELT", status: `${gdeltArticles.length} 条` },
          { source: "World Bank / FX", status: `${indicators.length} 个指标` }
        ],
        message: "Public trend sources did not return article results."
      });
    }

    return json(200, {
      ok: true,
      source: "Google News + industry RSS + GDELT + official APIs",
      updatedAt: new Date().toISOString(),
      keyword,
      summary: buildTrendSummary(articles, indicators, keyword),
      indicators,
      insights: buildTrendInsights(articles, indicators, keyword),
      sourceBreakdown: [
        { source: "Federal Register", status: `${federalItems.length} 条` },
        { source: "GOV.UK", status: `${govUkItems.length} 条` },
        { source: "Google News", status: `${googleNewsItems.length} 条` },
        { source: "RSS 行业/新闻", status: `${mediaItems.length} 条` },
        { source: "GDELT", status: `${gdeltArticles.length} 条` },
        { source: "World Bank / FX", status: `${indicators.length} 个指标` }
      ],
      items: articles
    });
  } catch (error) {
    const fallbackTrendItems = keywordFallbackItems(keyword);
    return json(200, {
      ok: false,
      fallback: true,
      source: "GDELT DOC 2.1",
      updatedAt: new Date().toISOString(),
      keyword,
      summary: keyword
        ? `搜索“${keyword}”时公开新闻接口暂时不可用，先显示基础观察清单。`
        : "公开新闻接口暂时不可用，先显示基础观察清单。",
      indicators: [],
      insights: buildTrendInsights(fallbackTrendItems, [], keyword),
      items: fallbackTrendItems,
      message: error.message || "Global trend query failed."
    });
  }
};
