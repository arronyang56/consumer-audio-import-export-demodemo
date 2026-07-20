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
    takeaway: "用于观察关税、贸易、物流、汇率和地缘风险趋势。"
  }
];

const officialSourceGroups = [
  {
    title: "中国进出口与归类",
    items: [
      ["海关总署", "http://www.customs.gov.cn/", "公告、政策法规、归类决定和行政裁定。"],
      ["海关总署公告", "http://www.customs.gov.cn/customs/302249/2480148/index.html", "海关公告和监管政策更新，优先用于核验实施日期和适用范围。"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/", "正式通关、监管证件和业务入口，通常需要账号权限。"],
      ["互联网+海关", "http://online.customs.gov.cn/", "税率、商品编码、办事指南等政务查询入口。"],
      ["商务部贸易救济调查局", "https://trb.mofcom.gov.cn/", "反倾销、反补贴、保障措施和贸易救济调查。"],
      ["国家市场监督管理总局", "https://www.samr.gov.cn/", "产品质量、强制标准、召回和市场监管政策入口。"],
      ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/", "3C 目录、认证实施规则和公告。"],
      ["工业和信息化部", "https://www.miit.gov.cn/", "无线电、型号核准、电子信息产品政策和行业管理入口。"]
    ]
  },
  {
    title: "主要目的国要求",
    items: [
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home", "欧盟关税、进口程序、产品要求和原产地规则。"],
      ["USITC HTS", "https://hts.usitc.gov/", "美国 HTS 税号和税率。"],
      ["CBP CROSS", "https://rulings.cbp.gov/", "美国海关归类、原产地、估价等裁定。"],
      ["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/", "英国税号、税率、VAT、措施和文件代码。"],
      ["Japan Customs", "https://www.customs.go.jp/english/tariff/", "日本税则和关税制度。"],
      ["Thai Customs", "https://www.customs.go.th/", "泰国税则、进口清关和公告。"]
    ]
  },
  {
    title: "电池、无线和产品合规",
    items: [
      ["IATA Dangerous Goods", "https://www.iata.org/en/programs/cargo/dgr/", "空运危险品和锂电池规则。"],
      ["UNECE Dangerous Goods", "https://unece.org/transport/dangerous-goods", "危险品运输和 UN38.3 相关资料入口。"],
      ["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm", "美国无线设备 FCC ID 和授权信息。"],
      ["EU Safety Gate", "https://ec.europa.eu/safety-gate-alerts/", "欧盟消费品安全召回和风险通报。"],
      ["NBTC Thailand", "https://www.nbtc.go.th/", "泰国无线通信设备监管入口。"],
      ["TISI Thailand", "https://www.tisi.go.th/", "泰国产品标准和强制标准入口。"]
    ]
  },
  {
    title: "更多国家/地区官方入口",
    items: [
      ["South African Revenue Service", "https://www.sars.gov.za/customs-and-excise/", "南非海关和消费税入口。"],
      ["Australian Border Force Tariff", "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff", "澳大利亚进口税则和归类。"],
      ["Korea Customs Service", "https://www.customs.go.kr/english/main.do", "韩国海关和进口政策入口。"],
      ["Vietnam Customs", "https://www.customs.gov.vn/", "越南海关公告和手续入口。"],
      ["Singapore Customs", "https://www.customs.gov.sg/", "新加坡海关和进出口手续。"],
      ["CBIC India", "https://www.cbic.gov.in/", "印度海关税则和通关政策。"],
      ["Brazil Receita Federal Classificação", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias", "巴西 NCM/商品归类官方入口。"],
      ["Brazil Portal Siscomex", "https://www.gov.br/siscomex/pt-br", "巴西外贸单一门户和公告。"],
      ["Mexico SNICE TIGIE", "https://www.snice.gob.mx/cs/avi/snice/tfinicio.html", "墨西哥 TIGIE 税则和修改信息。"],
      ["Canada CBSA Customs Tariff", "https://www.cbsa.gc.ca/trade-commerce/tariff-tarif/menu-eng.html", "加拿大海关税则和归类指南。"],
      ["Indonesia Customs DGCE", "https://www.beacukai.go.id/", "印尼海关入口。"],
      ["Philippines Tariff Commission", "https://tariffcommission.gov.ph/", "菲律宾税则和归类资料。"],
      ["Turkey Trade Ministry", "https://ticaret.gov.tr/", "土耳其贸易和进口监管入口。"],
      ["Dubai Customs", "https://www.dubaicustoms.gov.ae/", "迪拜海关入口。"],
      ["ZATCA Saudi Customs", "https://zatca.gov.sa/", "沙特海关和税务入口。"]
    ]
  },
  {
    title: "无线/认证/产品安全",
    items: [
      ["Brazil ANATEL", "https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos", "巴西无线/通信产品认证。"],
      ["Brazil INMETRO", "https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/produtos-e-servicos-regulados", "巴西受监管产品和合格评定入口。"],
      ["Mexico IFETEL", "https://www.ift.org.mx/", "墨西哥无线/通信设备监管。"],
      ["ISED Canada", "https://ised-isde.canada.ca/", "加拿大无线和产品合规。"],
      ["SDPPI Indonesia", "https://sertifikasi.postel.go.id/", "印尼无线/通信设备认证。"],
      ["NTC Philippines", "https://ntc.gov.ph/", "菲律宾无线通信监管。"],
      ["BTK Turkey", "https://www.btk.gov.tr/", "土耳其通信监管。"],
      ["TDRA UAE", "https://tdra.gov.ae/", "阿联酋通信/无线设备监管。"],
      ["SABER Saudi", "https://saber.sa/", "沙特产品合格评定平台。"],
      ["SASO Saudi", "https://www.saso.gov.sa/", "沙特标准和产品安全入口。"]
    ]
  },
  {
    title: "国际公开数据库",
    items: [
      ["WTO", "https://www.wto.org/", "成员国贸易政策、通报和争端背景。"],
      ["WTO Trade Monitoring", "https://www.wto.org/english/tratop_e/tpr_e/trade_monitoring_e.htm", "全球贸易政策措施监测。"],
      ["WTO Tariff Tracker", "https://ttd.wto.org/en/reports/tariff-actions", "WTO/IMF 关税行动跟踪。"],
      ["ITC Market Access Map", "https://www.macmap.org/", "关税、贸易措施和市场准入参考。"],
      ["World Bank WITS", "https://wits.worldbank.org/", "关税和贸易统计背景数据。"],
      ["UN Comtrade", "https://comtradeplus.un.org/", "全球贸易统计。"],
      ["Global Trade Alert", "https://www.globaltradealert.org/", "贸易政策措施观察。"],
      ["IMF Trade", "https://www.imf.org/en/Topics/Trade", "宏观贸易和全球经济背景。"],
      ["UNCTAD Trade Analysis", "https://unctad.org/topic/trade-analysis", "国际贸易和供应链分析。"],
      ["OECD Trade", "https://www.oecd.org/trade/", "贸易政策、供应链和经济背景。"]
    ]
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
  澳大利亚: ["Australia", "ACMA"],
  南非: ["South Africa", "SARS", "ITAC", "NRCS", "ICASA"],
  韩国: ["Korea", "KCS", "KC certification"],
  越南: ["Vietnam", "Vietnam customs", "MIC Vietnam"],
  新加坡: ["Singapore", "Singapore Customs", "IMDA"],
  马来西亚: ["Malaysia", "Royal Malaysian Customs", "SIRIM", "MCMC"],
  印尼: ["Indonesia", "DGCE", "SDPPI"],
  印度: ["India", "CBIC", "BIS", "WPC"],
  加拿大: ["Canada", "CBSA", "ISED"],
  墨西哥: ["Mexico", "SAT Mexico"],
  巴西: ["Brazil", "Receita Federal", "ANATEL"],
  印尼: ["Indonesia", "DGCE", "SDPPI"],
  印度尼西亚: ["Indonesia", "DGCE", "SDPPI"],
  菲律宾: ["Philippines", "Bureau of Customs", "NTC"],
  土耳其: ["Turkey", "Turkiye", "BTK"],
  阿联酋: ["UAE", "Dubai Customs", "TDRA"],
  迪拜: ["UAE", "Dubai Customs", "TDRA"],
  沙特: ["Saudi Arabia", "SABER", "ZATCA", "SASO"]
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

const mediaFeeds = [
  { name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml", country: "Global", domain: "bbc.co.uk", category: "媒体/政策解读" },
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", country: "Global", domain: "bbc.co.uk", category: "媒体/政策解读" },
  { name: "CNN Business", url: "http://rss.cnn.com/rss/money_latest.rss", country: "Global", domain: "cnn.com", category: "媒体/政策解读" },
  { name: "CNN Latest", url: "http://rss.cnn.com/rss/cnn_latest.rss", country: "Global", domain: "cnn.com", category: "媒体/政策解读" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", country: "Global", domain: "aljazeera.com", category: "媒体/政策解读" },
  { name: "NPR World", url: "https://feeds.npr.org/1004/rss.xml", country: "United States", domain: "npr.org", category: "媒体/政策解读" },
  { name: "Politico", url: "https://www.politico.com/rss/politicopicks.xml", country: "United States", domain: "politico.com", category: "媒体/政策解读" },
  { name: "CCTV Biz", url: "http://english.cctv.cn/service/rss/3/index.xml", country: "China", domain: "english.cctv.cn", category: "媒体/政策解读" },
  { name: "CCTV World", url: "http://english.cctv.cn/service/rss/2/index.xml", country: "China", domain: "english.cctv.cn", category: "媒体/政策解读" },
  { name: "gCaptain", url: "https://gcaptain.com/feed/", country: "Global", domain: "gcaptain.com", category: "物流/趋势" },
  { name: "The Loadstar", url: "https://theloadstar.com/feed/", country: "Global", domain: "theloadstar.com", category: "物流/趋势" },
  { name: "Maritime Executive", url: "https://maritime-executive.com/feed", country: "Global", domain: "maritime-executive.com", category: "物流/趋势" },
  { name: "FreightWaves", url: "https://www.freightwaves.com/news/feed", country: "Global", domain: "freightwaves.com", category: "物流/趋势" },
  { name: "Splash247", url: "https://splash247.com/feed/", country: "Global", domain: "splash247.com", category: "物流/趋势" },
  { name: "Port Technology", url: "https://www.porttechnology.org/feed/", country: "Global", domain: "porttechnology.org", category: "港口/物流" },
  { name: "Hellenic Shipping News", url: "https://www.hellenicshippingnews.com/feed/", country: "Global", domain: "hellenicshippingnews.com", category: "航运/市场" },
  { name: "Safety4Sea", url: "https://safety4sea.com/feed/", country: "Global", domain: "safety4sea.com", category: "海事/安全" },
  { name: "WTO Latest News", url: "https://www.wto.org/library/rss/latest_news_e.xml", country: "Global", domain: "wto.org", category: "官方/贸易政策" },
  { name: "CBP Trade", url: "https://www.cbp.gov/trade/rss.xml", country: "United States", domain: "cbp.gov", category: "官方/海关" },
  { name: "IMF News", url: "https://www.imf.org/en/News/RSS", country: "Global", domain: "imf.org", category: "金融机构/宏观" },
  { name: "World Bank News", url: "https://www.worldbank.org/en/news/all?format=rss", country: "Global", domain: "worldbank.org", category: "金融机构/宏观" },
  { name: "Federal Reserve", url: "https://www.federalreserve.gov/feeds/press_all.xml", country: "United States", domain: "federalreserve.gov", category: "金融机构/宏观" },
  { name: "European Central Bank", url: "https://www.ecb.europa.eu/rss/press.html", country: "EU", domain: "ecb.europa.eu", category: "金融机构/宏观" },
  { name: "BIS Press", url: "https://www.bis.org/list/press_releases/index.rss", country: "Global", domain: "bis.org", category: "金融机构/宏观" },
  { name: "CNBC Economy", url: "https://www.cnbc.com/id/20910258/device/rss/rss.html", country: "United States", domain: "cnbc.com", category: "金融机构/宏观" },
  { name: "MarketWatch Top Stories", url: "https://feeds.content.dowjones.io/public/rss/mw_topstories", country: "United States", domain: "marketwatch.com", category: "金融机构/宏观" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", country: "Global", domain: "techcrunch.com", category: "科技/消费电子" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml", country: "Global", domain: "theverge.com", category: "科技/消费电子" },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/feeds/feed.rss", country: "Global", domain: "spectrum.ieee.org", category: "科技/消费电子" },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/feed/", country: "Global", domain: "technologyreview.com", category: "科技/消费电子" },
  { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index", country: "Global", domain: "arstechnica.com", category: "科技/消费电子" }
];

const chinaOfficialListSources = [
  {
    name: "海关总署公告",
    url: "https://www.customs.gov.cn/customs/302249/2480148/index.html",
    domain: "customs.gov.cn",
    category: "官方/海关"
  },
  {
    name: "商务部贸易救济调查局",
    url: "https://tdi.mofcom.gov.cn/",
    domain: "tdi.mofcom.gov.cn",
    category: "官方/贸易救济"
  },
  {
    name: "国家认监委强制性产品认证专栏",
    url: "https://www.cnca.gov.cn/hlwfw/ywzl/qzxcprz/index.html",
    domain: "cnca.gov.cn",
    category: "官方/认证合规"
  },
  {
    name: "财政部关税司",
    url: "https://gss.mof.gov.cn/",
    domain: "gss.mof.gov.cn",
    category: "官方/关税政策"
  }
];

const marketSources = {
  cn: {
    names: ["中国", "china", "大陆", "cn"],
    terms: ["China customs", "GACC", "CNCA", "MIIT", "single window"],
    sources: [
      ["海关总署", "http://www.customs.gov.cn/", "中国海关公告、政策法规、归类决定和行政裁定。"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/", "通关、监管证件和申报业务入口。"],
      ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/", "3C 目录、认证规则和公告。"],
      ["工业和信息化部", "https://www.miit.gov.cn/", "无线电和型号核准政策入口。"]
    ]
  },
  us: {
    names: ["美国", "us", "usa", "united states"],
    terms: ["United States", "CBP", "USITC", "FCC", "Federal Register"],
    sources: [
      ["USITC HTS", "https://hts.usitc.gov/", "美国 HTS 税号和税率。"],
      ["CBP CROSS", "https://rulings.cbp.gov/", "美国海关归类、原产地、估价裁定。"],
      ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies", "美国贸易救济措施。"],
      ["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm", "无线设备 FCC ID 和授权信息。"]
    ]
  },
  uk: {
    names: ["英国", "uk", "united kingdom"],
    terms: ["United Kingdom", "UKCA", "HMRC", "UK Trade Tariff"],
    sources: [
      ["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/", "英国商品编码、税率、VAT、措施和文件代码。"],
      ["GOV.UK Import Goods", "https://www.gov.uk/import-goods-into-uk", "英国进口流程和许可说明。"],
      ["CDS Declaration Instructions", "https://www.gov.uk/government/collections/uk-trade-tariff-volume-3-for-cds--2", "英国 CDS 申报说明。"]
    ]
  },
  eu: {
    names: ["欧盟", "欧洲", "eu", "europe", "德国", "法国", "荷兰", "意大利", "西班牙"],
    terms: ["European Union", "EU customs", "TARIC", "CE", "RoHS"],
    sources: [
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home", "欧盟关税、产品要求、进口程序和原产地规则。"],
      ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp", "欧盟 TARIC 税则和监管措施。"],
      ["EUR-Lex", "https://eur-lex.europa.eu/", "欧盟法规原文。"],
      ["EU Safety Gate", "https://ec.europa.eu/safety-gate-alerts/", "消费品安全召回和风险通报。"]
    ]
  },
  jp: {
    names: ["日本", "japan", "jp"],
    terms: ["Japan customs", "PSE", "TELEC", "MIC Japan"],
    sources: [
      ["Japan Customs Tariff", "https://www.customs.go.jp/english/tariff/", "日本税则和进口税率。"],
      ["Japan Customs", "https://www.customs.go.jp/english/", "日本海关政策和手续入口。"],
      ["METI Product Safety", "https://www.meti.go.jp/english/policy/economy/consumer/product_safety/", "日本产品安全和 PSE。"],
      ["MIC Radio Use", "https://www.tele.soumu.go.jp/e/index.htm", "日本无线设备和 TELEC/MIC 相关入口。"]
    ]
  },
  th: {
    names: ["泰国", "thailand", "thai", "林查班", "laem chabang"],
    terms: ["Thailand customs", "TISI", "NBTC", "Thai import"],
    sources: [
      ["Thai Customs", "https://www.customs.go.th/", "泰国海关税则、进口清关和公告。"],
      ["Thailand National Single Window", "https://www.thainsw.net/", "泰国单一窗口和跨境贸易单证入口。"],
      ["NBTC", "https://www.nbtc.go.th/", "泰国无线通信设备监管。"],
      ["TISI", "https://www.tisi.go.th/", "泰国产品标准和强制标准。"]
    ]
  },
  gcc: {
    names: ["中东", "gcc", "沙特", "saudi", "阿联酋", "uae", "dubai"],
    terms: ["GCC customs", "G-Mark", "Saudi Saber", "UAE customs"],
    sources: [
      ["GSO Conformity", "https://www.gso.org.sa/en/conformity/conformity-tracking-system/", "GCC G-Mark 和合格评定入口。"],
      ["SABER Saudi", "https://saber.sa/", "沙特产品合格评定平台。"],
      ["Dubai Trade", "https://www.dubaitrade.ae/", "迪拜贸易和清关服务入口。"]
    ]
  },
  za: {
    names: ["南非", "south africa", "za", "durban", "cape town"],
    terms: ["South Africa", "SARS customs", "ITAC", "NRCS", "ICASA"],
    sources: [
      ["South African Revenue Service", "https://www.sars.gov.za/customs-and-excise/", "南非海关和进口手续入口。"],
      ["ITAC South Africa", "https://www.itac.org.za/", "南非关税、贸易措施和进口管制参考。"],
      ["NRCS South Africa", "https://www.nrcs.org.za/", "南非强制规范和产品合规。"],
      ["ICASA", "https://www.icasa.org.za/", "南非无线通信设备监管入口。"]
    ]
  },
  au: {
    names: ["澳大利亚", "australia", "au"],
    terms: ["Australia", "Australian Border Force", "ACMA", "Product Safety Australia"],
    sources: [
      ["Australian Border Force Tariff", "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff", "澳大利亚税则和归类。"],
      ["ACMA", "https://www.acma.gov.au/", "澳大利亚无线/通信设备监管。"],
      ["Product Safety Australia", "https://www.productsafety.gov.au/", "澳大利亚消费品安全入口。"]
    ]
  },
  kr: {
    names: ["韩国", "korea", "south korea", "kr"],
    terms: ["Korea customs", "KCS", "KC certification", "RRA"],
    sources: [
      ["Korea Customs Service", "https://www.customs.go.kr/english/main.do", "韩国海关和进口政策入口。"],
      ["KATS", "https://www.kats.go.kr/en/main.do", "韩国标准和 KC 认证参考。"],
      ["RRA Korea", "https://www.rra.go.kr/en/index.do", "韩国无线/电磁兼容监管入口。"]
    ]
  },
  vn: {
    names: ["越南", "vietnam", "vn", "胡志明"],
    terms: ["Vietnam customs", "Vietnam import", "MIC Vietnam", "Vietnam standards"],
    sources: [
      ["Vietnam Customs", "https://www.customs.gov.vn/", "越南海关公告和手续入口。"],
      ["Vietnam National Single Window", "https://vnsw.gov.vn/", "越南单一窗口。"],
      ["MIC Vietnam", "https://mic.gov.vn/", "越南无线/通信设备监管参考。"]
    ]
  },
  sg: {
    names: ["新加坡", "singapore", "sg"],
    terms: ["Singapore Customs", "IMDA", "Enterprise Singapore"],
    sources: [
      ["Singapore Customs", "https://www.customs.gov.sg/", "新加坡海关和进出口手续。"],
      ["IMDA", "https://www.imda.gov.sg/", "新加坡通信/无线设备监管。"],
      ["Enterprise Singapore", "https://www.enterprisesg.gov.sg/", "产品安全和标准参考。"]
    ]
  },
  my: {
    names: ["马来西亚", "malaysia", "my", "port klang"],
    terms: ["Malaysia customs", "SIRIM", "MCMC", "Port Klang"],
    sources: [
      ["Royal Malaysian Customs", "https://www.customs.gov.my/", "马来西亚海关入口。"],
      ["SIRIM QAS", "https://www.sirim-qas.com.my/", "马来西亚产品认证参考。"],
      ["MCMC", "https://www.mcmc.gov.my/", "马来西亚通信/无线设备监管。"]
    ]
  },
  in: {
    names: ["印度", "india", "in"],
    terms: ["India customs", "CBIC", "BIS India", "WPC"],
    sources: [
      ["CBIC India", "https://www.cbic.gov.in/", "印度海关税则和通关政策。"],
      ["BIS", "https://www.bis.gov.in/", "印度标准和认证参考。"],
      ["WPC India", "https://dot.gov.in/spectrum-management/2457", "印度无线设备许可参考。"]
    ]
  },
  ca: {
    names: ["加拿大", "canada", "ca"],
    terms: ["Canada customs", "CBSA", "ISED"],
    sources: [
      ["CBSA Customs Tariff", "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html", "加拿大海关税则。"],
      ["ISED Canada", "https://ised-isde.canada.ca/", "加拿大无线和产品合规参考。"]
    ]
  },
  br: {
    names: ["巴西", "brazil", "brasil", "br", "santos"],
    terms: ["Brazil customs", "Receita Federal", "Siscomex", "ANATEL", "INMETRO"],
    sources: [
      ["Receita Federal Classificação Fiscal", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias", "巴西 NCM/商品归类官方入口。"],
      ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br", "巴西外贸单一门户和公告。"],
      ["ANATEL", "https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos", "巴西无线/通信产品认证。"],
      ["INMETRO", "https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/produtos-e-servicos-regulados", "巴西受监管产品和合格评定入口。"]
    ]
  },
  mx: {
    names: ["墨西哥", "mexico", "méxico", "mx", "manzanillo"],
    terms: ["Mexico customs", "SNICE", "TIGIE", "SAT Mexico", "IFETEL", "NOM"],
    sources: [
      ["SNICE TIGIE", "https://www.snice.gob.mx/cs/avi/snice/tfinicio.html", "墨西哥 TIGIE 税则和修改信息。"],
      ["SAT Mexico", "https://www.sat.gob.mx/", "墨西哥税务和海关入口。"],
      ["IFETEL", "https://www.ift.org.mx/", "墨西哥无线/通信设备监管。"]
    ]
  },
  id: {
    names: ["印尼", "印度尼西亚", "indonesia", "id", "jakarta"],
    terms: ["Indonesia customs", "DGCE", "INSW", "SDPPI", "SNI"],
    sources: [
      ["Indonesia Customs DGCE", "https://www.beacukai.go.id/", "印尼海关入口。"],
      ["Indonesia National Single Window", "https://www.insw.go.id/", "印尼单一窗口。"],
      ["SDPPI", "https://sertifikasi.postel.go.id/", "印尼无线/通信设备认证。"]
    ]
  },
  ph: {
    names: ["菲律宾", "philippines", "ph", "manila"],
    terms: ["Philippines customs", "Bureau of Customs", "Tariff Commission", "NTC"],
    sources: [
      ["Philippines Tariff Commission", "https://tariffcommission.gov.ph/", "菲律宾税则和归类资料。"],
      ["Bureau of Customs Philippines", "https://customs.gov.ph/", "菲律宾海关入口。"],
      ["NTC Philippines", "https://ntc.gov.ph/", "菲律宾无线通信监管。"]
    ]
  },
  tr: {
    names: ["土耳其", "turkey", "turkiye", "türkiye", "tr"],
    terms: ["Turkey customs", "Turkish tariff", "BTK", "CE"],
    sources: [
      ["Turkey Trade Ministry", "https://ticaret.gov.tr/", "土耳其贸易和进口监管入口。"],
      ["Turkey Tariff Search", "https://uygulama.gtb.gov.tr/Tara/", "土耳其税则查询。"],
      ["BTK Turkey", "https://www.btk.gov.tr/", "土耳其通信监管。"]
    ]
  },
  ae: {
    names: ["阿联酋", "uae", "united arab emirates", "迪拜", "dubai", "jebel ali"],
    terms: ["UAE customs", "Dubai Customs", "Dubai Trade", "TDRA"],
    sources: [
      ["Dubai Customs", "https://www.dubaicustoms.gov.ae/", "迪拜海关入口。"],
      ["Dubai Trade", "https://www.dubaitrade.ae/", "迪拜贸易和清关服务入口。"],
      ["TDRA UAE", "https://tdra.gov.ae/", "阿联酋通信/无线设备监管。"]
    ]
  },
  sa: {
    names: ["沙特", "saudi", "saudi arabia", "ksa", "jeddah", "dammam"],
    terms: ["Saudi customs", "ZATCA", "SABER", "SASO", "CST Saudi"],
    sources: [
      ["ZATCA Saudi Customs", "https://zatca.gov.sa/", "沙特海关和税务入口。"],
      ["SABER Saudi", "https://saber.sa/", "沙特产品合格评定平台。"],
      ["SASO Saudi", "https://www.saso.gov.sa/", "沙特标准和产品安全入口。"]
    ]
  }
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

async function fetchText(url, timeoutMs = 10000) {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller ? controller.signal : undefined,
      headers: {
        Accept: "application/rss+xml,application/xml,text/xml,text/html",
        "User-Agent": "LogisMaster-policy-monitor/1.0 (+https://logismaster.cn)"
      }
    });
    return { ok: response.ok, status: response.status, text: await response.text() };
  } finally {
    if (timer) clearTimeout(timer);
  }
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

function hostFromUrl(url = "") {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function parseRssItems(xml = "", source = {}) {
  const itemBlocks = [...String(xml || "").matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const entryBlocks = [...String(xml || "").matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  return [...itemBlocks, ...entryBlocks].slice(0, 8).map((block) => {
    const title = tagValue(block, "title");
    const url = linkValue(block);
    const description = tagValue(block, "description") || tagValue(block, "summary");
    const published = tagValue(block, "pubDate") || tagValue(block, "updated") || tagValue(block, "published");
    const domain = source.domain || hostFromUrl(url) || tagValue(block, "source");
    return normalizeArticle({
      title: title.replace(/\s+-\s+[^-]{2,40}$/g, "") || source.name || "RSS item",
      url,
      domain,
      sourcecountry: source.country || "Global",
      seendate: published,
      description
    });
  });
}

function isOfficialLinkNoise(title = "", href = "") {
  const cleanTitle = decodeXml(title).replace(/\s+/g, " ").trim();
  if (cleanTitle.length < 6 || /^(#|javascript:|mailto:)/i.test(String(href || "").trim())) return true;
  if (/^(?:首页|网站首页|返回网站首页|更多|more|下一页|上一页|政务服务|联系我们|网站地图|通知公告|法律法规|业务专栏|强制性产品认证专栏|目录描述与界定|实施规则|执法单位专区|认证收费|常见问题|财政部微信|视频栏目|新闻动态|工作动态)$/i.test(cleanTitle)) return true;
  if (/财政部网站\s*视频栏目\s*正式上线|夯实专业基础.*青春力量|举办\s*20\d{2}\s*年.*政策/i.test(cleanTitle)) return true;
  return false;
}

function parseOfficialHtmlLinks(html = "", source = {}) {
  const body = String(html || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ");
  const rows = [];
  const anchorPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match = anchorPattern.exec(body);
  while (match && rows.length < 40) {
    const title = decodeXml(match[2]);
    const href = String(match[1] || "").trim();
    if (!isOfficialLinkNoise(title, href)) {
      let url = "";
      try {
        url = new URL(href, source.url).href;
      } catch {
        url = "";
      }
      if (url) {
        const listStart = body.lastIndexOf("<li", match.index);
        const listEnd = body.indexOf("</li>", anchorPattern.lastIndex);
        const hasLocalList = listStart >= 0 && listEnd >= anchorPattern.lastIndex && listEnd - listStart <= 1600;
        const rawContext = hasLocalList
          ? body.slice(listStart, listEnd + 5)
          : body.slice(Math.max(0, match.index - 120), Math.min(body.length, anchorPattern.lastIndex + 120));
        const context = decodeXml(rawContext);
        const dateMatch = context.match(/20\d{2}[年\-\/.]\d{1,2}[月\-\/.]\d{1,2}日?/);
        const dateText = dateMatch?.[0] || "";
        rows.push(normalizeArticle({
          title,
          url,
          domain: source.domain || hostFromUrl(url),
          sourcecountry: "China",
          seendate: dateText.replace(/年|月/g, "-").replace(/日/g, ""),
          description: `${source.name}发布页：${title}${dateText ? `（页面日期 ${dateText}）` : ""}。`,
          category: source.category || "官方/中国政策"
        }));
      }
    }
    match = anchorPattern.exec(body);
  }
  return dedupeArticles(rows);
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

function relevanceTerms(filters = {}) {
  return [
    ...expandTerms(filters.exportCountry, countryAliases),
    ...expandTerms(filters.importCountry, countryAliases),
    ...expandTerms(filters.product, productAliases),
    ...expandTerms(filters.keyword, { ...countryAliases, ...productAliases })
  ]
    .flatMap((term) => String(term || "").split(/\s+/))
    .map((term) => term.toLowerCase().replace(/["']/g, ""))
    .filter((term) => term.length >= 2);
}

function itemEvidenceText(item = {}) {
  return [
    item.title,
    item.description,
    item.summary,
    item.takeaway,
    item.action,
    item.domain,
    item.sourceCountry,
    item.category,
    item.sourceType
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function containsEvidenceTerm(text = "", term = "") {
  const haystack = String(text || "").toLowerCase();
  const needle = String(term || "").trim().toLowerCase();
  if (!needle) return false;
  if (/^[a-z0-9. -]+$/i.test(needle)) {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(haystack);
  }
  return haystack.includes(needle);
}

function matchesEvidenceGroup(text = "", terms = []) {
  return terms.some((term) => containsEvidenceTerm(text, term));
}

function policyProductGroups(filters = {}) {
  const query = `${filters.product || ""} ${filters.keyword || ""}`.toLowerCase();
  const adapterQuery = query.replace(/移动电源|充电宝|power\s*bank/g, " ");
  const groups = [];
  if (/蓝牙|无线|耳机|音箱|bluetooth|wireless|headphone|earbud|headset|speaker|soundbar/.test(query)) {
    groups.push(["蓝牙", "无线", "耳机", "音箱", "bluetooth", "wireless", "radio equipment", "headphone", "earbud", "headset", "speaker", "soundbar", "audio equipment"]);
  }
  if (/电池|锂|充电宝|移动电源|battery|lithium|power bank/.test(query)) {
    groups.push(["电池", "锂", "充电宝", "移动电源", "battery", "lithium", "power bank", "un38.3", "dangerous goods"]);
  }
  if (/适配器|充电器|电源|adapter|charger|power supply/.test(adapterQuery)) {
    groups.push(["适配器", "充电器", "电源", "adapter", "charger", "power supply"]);
  }
  return groups;
}

function policyTopicGroups(filters = {}) {
  const query = `${filters.product || ""} ${filters.keyword || ""} ${filters.direction || ""}`.toLowerCase();
  const groups = [];
  if (/关税|税率|301|232|反倾销|反补贴|贸易救济|tariff|duty|trade remed|antidump|countervail/.test(query)) {
    groups.push(["关税", "税率", "301", "232", "贸易救济", "反倾销", "反补贴", "tariff", "duty", "trade remedy", "antidumping", "anti-dumping", "countervailing"]);
  }
  if (/认证|准入|标签|ccc|fcc|ce|red|anatel|nbtc|saber|rohs|certif|compliance|approval/.test(query)) {
    groups.push(["认证", "准入", "标签", "ccc", "fcc", "ce", "red", "anatel", "nbtc", "saber", "rohs", "certification", "compliance", "approval", "equipment authorization"]);
  }
  if (/税号|归类|申报|海关|清关|hs code|classification|customs|clearance/.test(query)) {
    groups.push(["税号", "归类", "申报", "海关", "清关", "hs code", "classification", "customs", "clearance"]);
  }
  if (/制裁|出口管制|禁令|实体清单|sanction|export control|entity list|restriction|ban/.test(query)) {
    groups.push(["制裁", "出口管制", "禁令", "实体清单", "sanction", "export control", "entity list", "restriction", "ban"]);
  }
  return groups;
}

const strictMarketTerms = {
  cn: ["中国", "中国原产", "china", "chinese", "prc", "gacc", "customs.gov.cn"],
  us: ["美国", "特朗普", "川普", "united states", "u.s.", "usa", "american", "trump", "cbp", "ustr", "usitc", "federal register", "federalregister.gov"],
  uk: ["英国", "united kingdom", "u.k.", "gov.uk", "hmrc", "uk trade tariff"],
  eu: ["欧盟", "欧洲联盟", "european union", "european commission", "eur-lex", "europa.eu"],
  br: ["巴西", "brazil", "brasil", "anatel", "receita federal", "siscomex"],
  th: ["泰国", "thailand", "thai customs", "nbtc", "tisi"],
  jp: ["日本", "japan", "japanese customs", "meti", "telec"],
  za: ["南非", "south africa", "sars customs", "itac", "icasa"],
  au: ["澳大利亚", "australia", "australian border force", "acma"],
  kr: ["韩国", "south korea", "korea customs", "kats", "rra korea"],
  vn: ["越南", "vietnam", "vietnam customs", "mic vietnam"],
  sg: ["新加坡", "singapore", "singapore customs", "imda"],
  my: ["马来西亚", "malaysia", "malaysian customs", "sirim", "mcmc"],
  in: ["印度", "india", "cbic", "bis india", "wpc india"],
  ca: ["加拿大", "canada", "cbsa", "ised canada"],
  mx: ["墨西哥", "mexico", "snice", "tigie", "ifetel"],
  id: ["印尼", "印度尼西亚", "indonesia", "dgce", "sdppi"],
  ph: ["菲律宾", "philippines", "bureau of customs philippines", "ntc philippines"],
  tr: ["土耳其", "turkey", "turkiye", "btk turkey"],
  ae: ["阿联酋", "迪拜", "united arab emirates", "uae", "dubai customs", "tdra"],
  sa: ["沙特", "saudi arabia", "zatca", "saber", "saso"],
  gcc: ["中东", "gcc", "gulf cooperation council", "saudi arabia", "united arab emirates"]
};

function policyMarketGroups(filters = {}) {
  return [filters.importCountry, filters.exportCountry]
    .filter(Boolean)
    .map((country) => detectMarkets({ importCountry: country }))
    .filter((markets) => markets.length)
    .map((markets) => Array.from(new Set(markets.flatMap((market) => strictMarketTerms[market] || marketSources[market]?.names || []))));
}

function isRelevant(item = {}, filters = {}) {
  if (item.entryOnly || item.evidenceMode === "directory") return false;
  const haystack = itemEvidenceText(item);
  const productGroups = policyProductGroups(filters);
  const topicGroups = policyTopicGroups(filters);
  const marketGroups = policyMarketGroups(filters);
  if (productGroups.length && !productGroups.every((group) => matchesEvidenceGroup(haystack, group))) return false;
  if (topicGroups.length && !topicGroups.some((group) => matchesEvidenceGroup(haystack, group))) return false;
  if (marketGroups.length && !marketGroups.every((group) => matchesEvidenceGroup(haystack, group))) return false;
  if (!topicGroups.length) {
    const generalPolicyTerms = ["关税", "海关", "认证", "准入", "法规", "制裁", "出口管制", "tariff", "customs", "certification", "regulation", "sanction", "export control", "trade policy"];
    if (!matchesEvidenceGroup(haystack, generalPolicyTerms)) return false;
  }
  return Boolean(haystack.trim());
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

  const market = detectMarket(filters);
  const groups = [`(${base})`];
  const countryTerms = [
    ...expandTerms(filters.exportCountry, countryAliases),
    ...expandTerms(filters.importCountry, countryAliases),
    ...(market ? marketSources[market].terms : [])
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

function detectMarket(filters = {}) {
  const text = [filters.importCountry, filters.exportCountry, filters.keyword].filter(Boolean).join(" ").toLowerCase();
  return Object.entries(marketSources).find(([, config]) => config.names.some((name) => text.includes(name.toLowerCase())))?.[0] || "";
}

function detectMarkets(filters = {}) {
  const fields = [filters.importCountry, filters.exportCountry, filters.keyword].filter(Boolean);
  const markets = new Set();
  fields.forEach((field) => {
    const lower = String(field || "").toLowerCase();
    Object.entries(marketSources).forEach(([key, config]) => {
      if (config.names.some((name) => lower.includes(name.toLowerCase()))) markets.add(key);
    });
  });
  return Array.from(markets);
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
  if (/customs\.gov\.cn|gov\.cn|cnca\.gov\.cn|singlewindow\.cn|europa\.eu|trade\.gov|cbp\.gov|gov\.uk|wto\.org|imf\.org|unctad\.org|oecd\.org|wits\.worldbank\.org|macmap\.org|globaltradealert\.org|sars\.gov\.za|itac\.org\.za|nrcs\.org\.za|icasa\.org\.za|abf\.gov\.au|acma\.gov\.au|customs\.go\.kr|customs\.gov\.vn|customs\.gov\.sg|customs\.gov\.my|cbic\.gov\.in|cbsa-asfc\.gc\.ca|cbsa\.gc\.ca|mcmc\.gov\.my|imda\.gov\.sg|kats\.go\.kr|rra\.go\.kr|mic\.gov\.vn|gov\.br|anatel\.gov\.br|inmetro\.gov\.br|snice\.gob\.mx|sat\.gob\.mx|ift\.org\.mx|beacukai\.go\.id|insw\.go\.id|postel\.go\.id|tariffcommission\.gov\.ph|customs\.gov\.ph|ntc\.gov\.ph|ticaret\.gov\.tr|btk\.gov\.tr|dubaicustoms\.gov\.ae|dubaitrade\.ae|tdra\.gov\.ae|zatca\.gov\.sa|saber\.sa|saso\.gov\.sa/.test(lower)) {
    return { score: 94, label: "高：官方/国际组织", reason: "可作为优先核验来源，仍需确认是否适用具体产品和日期。" };
  }
  if (/reuters\.com|bloomberg\.com|spglobal\.com|ft\.com|wsj\.com|joc\.com|theloadstar|maritime-executive|lloydslist/.test(lower)) {
    return { score: 78, label: "中高：媒体/行业解读", reason: "适合做趋势提醒和背景判断，不能替代官方法规。" };
  }
  if (/\.edu|\.org/.test(lower)) {
    return { score: 68, label: "中：机构来源", reason: "用于识别政策和市场信号，需记录发布主体、日期和适用范围。" };
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
  return article.title ? `该来源标题指向：${article.title}。` : "该来源未返回可读摘要。";
}

function actionFor(article = {}) {
  const category = categoryFor(article);
  if (category === "海关/税号") return "把标题、产品描述和疑似税号发给关务/报关行，确认是否影响 HS、监管条件或申报要素。";
  if (category === "认证/合规") return "让认证/质量同事确认是否影响现有型号、标签、说明书、测试报告或客户合规文件。";
  if (category === "电池/危险品") return "让物流/DG 同事复核 MSDS、UN38.3、包装方式、运输方式和承运人接受规则。";
  if (category === "进出口政策") return "确认影响国家、实施日期、适用产品范围，以及是否影响已出货/待出货订单。";
  if (category === "物流/趋势") return "同步货代和计划同事，确认船期、港口作业、费用和交期承诺是否需要调整。";
  return "提取发布日期、实施日期、适用产品、国家/地区和订单影响项。";
}

function normalizeArticle(article = {}) {
  const domain = article.domain || "";
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain,
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    description: article.description || "",
    summary: article.summary || article.description || "",
    category: article.category || categoryFor(article),
    sourceType: credibilityFor(domain).score >= 90 ? "官方/国际组织" : "公开解读/新闻",
    credibility: credibilityFor(domain),
    takeaway: takeawayFor(article),
    action: actionFor(article)
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
    description,
    summary: description,
    category: categoryFor({ title: `${document.title || ""} ${document.abstract || ""}`, domain: "federalregister.gov" }),
    sourceType: "官方公告",
    credibility: { score: 94, label: "高：美国官方公告", reason: "Federal Register 是美国官方公告来源，适合核验法规、贸易救济和政策变化。" },
    takeaway: takeawayFor({ title: `${document.title || ""} ${document.abstract || ""}`, domain: "federalregister.gov" }),
    action: actionFor({ title: `${document.title || ""} ${document.abstract || ""}`, domain: "federalregister.gov" })
  };
}

function normalizeGovUk(result = {}) {
  const description = result.description || "";
  return {
    title: result.title || "GOV.UK guidance",
    url: result.link ? `https://www.gov.uk${result.link}` : "https://www.gov.uk/",
    domain: "gov.uk",
    sourceCountry: "United Kingdom",
    seendate: result.public_timestamp || "",
    description,
    summary: description,
    category: categoryFor({ title: `${result.title || ""} ${result.description || ""}`, domain: "gov.uk" }),
    sourceType: "官方指南",
    credibility: { score: 93, label: "高：英国政府来源", reason: "GOV.UK 官方搜索结果，可用于核验英国进口、CDS 和税则相关说明。" },
    takeaway: result.description || `GOV.UK 搜索结果：${result.title || "未返回摘要"}`,
    action: "如果涉及英国进口，确认 commodity code、CDS 申报要求、VAT、许可和 UKCA/无线/电池要求。"
  };
}

function normalizeOfficialSource([title, url, note], market = "") {
  return {
    title,
    url,
    domain: new URL(url).hostname.replace(/^www\./, ""),
    sourceCountry: market ? marketSources[market]?.names?.[0] || "" : "",
    seendate: "",
    description: note || "",
    summary: note || "",
    category: "官方入口",
    sourceType: "官方入口",
    entryOnly: true,
    evidenceMode: "directory",
    credibility: { score: 92, label: "高：官方入口", reason: "用于打开原文核验适用范围和最新日期。" },
    takeaway: note,
    action: "记录发布日期、适用产品、实施日期和是否影响当前业务。"
  };
}

async function fetchFederalRegister(filters = {}) {
  const term = [filters.product, filters.importCountry, filters.exportCountry, "tariff customs import export trade"].filter(Boolean).join(" ");
  const url = new URL("https://www.federalregister.gov/api/v1/documents.json");
  url.searchParams.set("conditions[term]", term);
  url.searchParams.set("per_page", "4");
  url.searchParams.set("order", "newest");
  const response = await fetchJson(url);
  return response.ok && Array.isArray(response.data.results)
    ? response.data.results.map(normalizeFederalRegister).filter((item) => isRelevant(item, filters))
    : [];
}

async function fetchGovUk(filters = {}) {
  const term = [filters.product, filters.importCountry, "tariff customs import export"].filter(Boolean).join(" ");
  const url = new URL("https://www.gov.uk/api/search.json");
  url.searchParams.set("q", term);
  url.searchParams.set("count", "4");
  const response = await fetchJson(url);
  return response.ok && Array.isArray(response.data.results)
    ? response.data.results.map(normalizeGovUk).filter((item) => isRelevant(item, filters))
    : [];
}

async function fetchGoogleNews(filters = {}) {
  const market = detectMarket(filters);
  const marketTerms = market ? marketSources[market].terms.join(" OR ") : "";
  const term = [
    filters.product,
    filters.importCountry,
    filters.exportCountry,
    filters.direction,
    marketTerms,
    "customs OR tariff OR import OR export OR certification OR battery OR wireless when:7d"
  ]
    .filter(Boolean)
    .join(" ");
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
    category: "媒体/政策解读"
  })
    .filter((item) => isRelevant(item, filters))
    .slice(0, 6);
}

async function fetchMediaFeeds(filters = {}) {
  const settled = await Promise.allSettled(mediaFeeds.map(async (source) => {
    const response = await fetchText(source.url);
    if (!response.ok) return [];
    return parseRssItems(response.text, source).filter((item) => isRelevant(item, filters)).slice(0, 3);
  }));
  return settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

async function fetchChinaOfficialLists(filters = {}) {
  const settled = await Promise.allSettled(chinaOfficialListSources.map(async (source) => {
    const response = await fetchText(source.url);
    if (!response.ok) return [];
    return parseOfficialHtmlLinks(response.text, source)
      .filter((item) => isRelevant(item, filters))
      .slice(0, 5);
  }));
  return settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

function marketOfficialItems(market = "") {
  return market && marketSources[market] ? marketSources[market].sources.map((item) => normalizeOfficialSource(item, market)) : [];
}

function marketsOfficialItems(markets = []) {
  return markets.flatMap((market) => marketOfficialItems(market));
}

function productOfficialItems(filters = {}) {
  const text = [filters.product, filters.keyword].filter(Boolean).join(" ").toLowerCase();
  const items = [];
  if (/电池|锂|battery|dangerous|dg/.test(text)) {
    items.push(["IATA Dangerous Goods", "https://www.iata.org/en/programs/cargo/dgr/", "空运危险品和锂电池规则更新。"]);
    items.push(["UNECE Dangerous Goods", "https://unece.org/transport/dangerous-goods", "危险品和 UN38.3 相关资料入口。"]);
  }
  if (/蓝牙|无线|bluetooth|wireless|radio/.test(text)) {
    items.push(["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm", "美国无线设备 FCC ID 和授权信息。"]);
    items.push(["EU Radio Equipment", "https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en", "欧盟 RED 无线设备规则入口。"]);
  }
  return items.map((item) => normalizeOfficialSource(item));
}

function buildPolicyBaseline(filters = {}) {
  const countryText = `${filters.importCountry || ""} ${filters.exportCountry || ""}`.toLowerCase();
  const productText = `${filters.product || ""} ${filters.keyword || ""}`.toLowerCase();
  const isGermany = /德国|germany|deutschland/.test(countryText);
  const isEu = isGermany || /欧盟|欧洲|european union|\beu\b|france|netherlands|italy|spain|法国|荷兰|意大利|西班牙/.test(countryText);
  const isVietnam = /越南|vietnam/.test(countryText);
  const isPhone = /手机|智能手机|mobile\s*phone|smartphone|cellular\s*phone/.test(productText);
  const definition = "“变化”是指与上一次已保存的官方政策基线相比，法规状态、生效日期、适用国家/产品/HS、税率或贸易措施、认证/标签、申报资料或过渡期至少一项发生可核验改变。没有检索到新增公告，不等于现行政策不存在，也不等于政策一定没有变化。";
  const genericSources = [];
  const currentRules = [];
  const materials = ["商业发票、装箱单、运输单证", "准确商品描述、候选 HS、原产国和成交方式", "进口商/收货人主体、税号及授权资料"];

  if (isEu) {
    currentRules.push("进口税费：先用欧盟 TARIC/Access2Markets 按完整 CN/TARIC 编码、原产国和申报日期核验；德国进口增值税通常为 19%，手机示例税率不能替代具体商品编码查询。");
    currentRules.push("市场准入：无线/蜂窝手机属于欧盟无线电设备法规范围，上市前需完成适用的符合性评估、CE 标识、EU Declaration of Conformity 和技术文件。");
    currentRules.push("环保责任：电子电气设备需核对 RoHS；在德国投放市场还要核对 WEEE/生产者责任、回收标识及当地责任主体。");
    materials.push("EU Declaration of Conformity、适用测试报告/技术文件、CE 标签和说明书");
    materials.push("RoHS/材料合规声明、WEEE/德国生产者责任信息和回收标识");
    genericSources.push(
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home", "按产品和贸易路线查询关税、进口程序、原产地及文件。"],
      ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp", "核验申报日适用的欧盟税则和监管措施。"],
      ["EU Radio Equipment Directive", "https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/radio-equipment_en", "无线设备法规和协调标准官方入口。"],
      ["EU RoHS", "https://environment.ec.europa.eu/topics/waste-and-recycling/rohs-directive_en", "电子电气设备有害物质限制官方说明。"],
      ["German Customs", "https://www.zoll.de/EN/Businesses/businesses_node.html", "德国商业进口、关税和进口增值税官方入口。"]
    );
  }

  if (isEu && isPhone) {
    currentRules.push("手机专项：自 2024-12-28 起，欧盟通用充电要求已适用于手持手机；有线充电接口、USB-C/充电协议、是否随附充电器及包装图示需核对。适用于 2025-08-01 起投放市场的联网无线设备网络安全要求也要纳入 RED 技术评估。");
    materials.push("USB-C/充电协议规格、是否随附充电器的包装图示、用户说明");
    materials.push("蜂窝/Wi-Fi/蓝牙频段、射频/EMC/安全及适用网络安全测试证据");
    genericSources.push(["EU Common Charger", "https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red/one-common-charging-solution-all_en", "手机等设备通用充电接口、充电协议和包装图示要求。"]);
  }

  if (isVietnam) {
    currentRules.push("原产地/越南出口：如主张 EU-Vietnam FTA 优惠，必须按协定规则核对原产资格和声明文本；不能只凭“越南发货”认定越南原产。");
    materials.push("原产地证据、供应链/BOM 依据及符合协定要求的原产声明（如主张优惠）");
    genericSources.push(
      ["EU-Vietnam Free Trade Agreement", "https://trade.ec.europa.eu/access-to-markets/en/content/eu-vietnam-free-trade-agreement", "原产地、优惠关税和清关文件官方说明。"],
      ["Vietnam Customs", "https://www.customs.gov.vn/", "越南出口海关和手续入口。"]
    );
  }

  if (!currentRules.length) {
    currentRules.push("当前基线：先核对目的国税则/监管措施、产品认证和标签、进口商资质、原产地、申报资料及运输限制；未读到匹配官方正文前，不推断具体税率或准入结论。");
  }

  const sources = genericSources.map(([title, url, note]) => ({ title, url, note, domain: hostFromUrl(url) }));
  return {
    status: "current-baseline",
    asOf: new Date().toISOString().slice(0, 10),
    scope: [filters.exportCountry && `出口国 ${filters.exportCountry}`, filters.importCountry && `进口国 ${filters.importCountry}`, filters.product && `产品 ${filters.product}`].filter(Boolean).join(" · ") || "当前筛选条件",
    definition,
    headline: isGermany && isPhone
      ? "德国进口手机即使没有发现新增公告，也仍有明确现行要求：税则/进口税、RED/CE、USB-C、RoHS/WEEE、进口商和原产地文件必须逐项核对。"
      : "本次变化监测必须建立在现行政策基线上；未命中新增公告时，仍按下面的现行要求和材料清单执行。",
    currentRules: Array.from(new Set(currentRules)),
    materials: Array.from(new Set(materials)),
    sources,
    coverage: sources.length
      ? `本基线命中 ${sources.length} 个与当前国家/产品直接相关的官方入口；入口用于核验正文，不能冒充已读取的新增公告。`
      : "当前只形成通用基线；补充国家、产品和 HS 后再缩小到具体官方来源。"
  };
}

function baselineVerificationItems(baseline = {}) {
  return (baseline.sources || []).map((source) => ({
    title: source.title,
    url: source.url,
    domain: source.domain || hostFromUrl(source.url),
    sourceCountry: "",
    seendate: baseline.asOf || "",
    description: source.note || "",
    summary: source.note || "",
    category: "现行政策基线",
    sourceType: "官方入口",
    entryOnly: true,
    evidenceMode: "directory",
    credibility: { score: 94, label: "高：官方入口", reason: "用于核对当前政策正文、适用范围和生效日期。" },
    takeaway: source.note || "",
    action: "按具体商品编码、原产国、申报日期和产品型号核验。"
  }));
}

function buildAnalysis(items = [], filters = {}) {
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));
  const officialCount = items.filter((item) => item.credibility?.score >= 90).length;
  const product = filters.product || "当前产品";
  const exportMarket = filters.exportCountry || "未指定出口国";
  const importMarket = filters.importCountry || "未指定进口国";
  const market = [filters.exportCountry && `出口国 ${filters.exportCountry}`, filters.importCountry && `进口国 ${filters.importCountry}`]
    .filter(Boolean)
    .join("、");
  const productText = `${product} ${filters.keyword || ""}`.toLowerCase();
  const focus = [];
  if (/蓝牙|无线|bluetooth|wireless|radio/.test(productText)) focus.push("无线认证/射频合规");
  if (/电池|锂|battery|dg|dangerous/.test(productText)) focus.push("锂电池运输资料和危险品限制");
  if (/适配器|电源|charger|adapter|power/.test(productText)) focus.push("电源安全认证和插头标签");
  focus.push("HS/税率/监管条件");
  focus.push("进口商和标签/文件要求");
  const keyPoints = [
    `${exportMarket} 到 ${importMarket} 的 ${product}，先重点看：${Array.from(new Set(focus)).join("、")}。`,
    items.length
      ? `过去一周公开来源命中 ${items.length} 条，主要集中在：${categories.slice(0, 5).join("、") || "政策/合规"}。`
      : "暂未命中实时新闻；先输出目的国常规资料、认证、标签和税号检查项。",
    officialCount
      ? `有 ${officialCount} 条属于官方/国际组织入口，最终判断先看这些，再看媒体解读。`
      : "本次多为媒体/行业解读，只能作为风险提醒，不能直接作为申报依据。"
  ];
  const actions = [
    "我们要做：先确认商品编码/税率/监管证件，再确认无线、电池、电源、标签和进口商资料。",
    "如果新闻或公告涉及关税、制裁、出口管制、认证目录或危险品规则，把该票记录到异常日志并指定负责人复核。",
    "正式出货前把发布日期、适用产品、税号、认证、标签、电池/DG 和清关资料逐项归档。"
  ];
  if (/battery|电池|锂|dangerous/i.test(product)) actions.unshift("含电池产品优先复核 MSDS、UN38.3、包装方式和承运人规则。");
  if (/bluetooth|wireless|无线|蓝牙|radio/i.test(product)) actions.unshift("无线/蓝牙产品优先复核目的国无线认证和标签要求。");
  const markets = detectMarkets(filters);
  const marketGroups = markets.map((marketKey) => ({
    title: `${marketSources[marketKey].names[0]} 官方入口`,
    items: marketSources[marketKey].sources
  }));
  return {
    headline: items.length
      ? `${product} 有公开政策或新闻线索，需要按国家、产品和实施日期逐项复核。`
      : `${product} 暂未看到明显新增新闻；先按进口国常规准入、认证、标签和税号要求检查。`,
    keyPoints,
    actions,
    sourceGroups: [...marketGroups, ...officialSourceGroups].slice(0, 5)
  };
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

function fallback(message = "", filters = {}) {
  const markets = detectMarkets(filters);
  const baseline = buildPolicyBaseline(filters);
  const verificationEntries = [
    ...(markets.length ? marketsOfficialItems(markets) : officialSourceGroups[officialSourceGroups.length - 1].items.map((item) => normalizeOfficialSource(item))),
    ...productOfficialItems(filters),
    ...baselineVerificationItems(baseline)
  ];
  return {
    ok: false,
    fallback: true,
    source: "政策结论",
    updatedAt: new Date().toISOString(),
    filters,
    message,
    evidenceStatus: "source-unavailable",
    summary: "实时来源暂时不可用，因此不生成新增政策结论；仅保留对应国家和产品的官方核验入口。",
    baseline,
    analysis: buildAnalysis([], filters),
    sourceBreakdown: [],
    verificationEntries,
    items: []
  };
}

exports._test = { parseOfficialHtmlLinks, isRelevant, buildQuery };

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
    const markets = detectMarkets(filters);
    const baseline = buildPolicyBaseline(filters);
    const fetchFed = !markets.length || markets.includes("us");
    const fetchUk = !markets.length || markets.includes("uk");
    const fetchChina = !markets.length || markets.includes("cn");
    const [gdeltResult, federalResult, govUkResult, chinaOfficialResult, googleNewsResult, mediaFeedsResult] = await Promise.allSettled([
      getJson(url),
      fetchFed ? fetchFederalRegister(filters) : Promise.resolve([]),
      fetchUk ? fetchGovUk(filters) : Promise.resolve([]),
      fetchChina ? fetchChinaOfficialLists(filters) : Promise.resolve([]),
      fetchGoogleNews(filters),
      fetchMediaFeeds(filters)
    ]);
    const gdeltResponse = gdeltResult.status === "fulfilled" ? gdeltResult.value : null;
    const gdeltArticles = gdeltResponse?.ok && Array.isArray(gdeltResponse.data?.articles)
      ? gdeltResponse.data.articles.map(normalizeArticle).filter((item) => isRelevant(item, filters))
      : [];
    const federalItems = federalResult.status === "fulfilled" ? federalResult.value : [];
    const govUkItems = govUkResult.status === "fulfilled" ? govUkResult.value : [];
    const chinaOfficialItems = chinaOfficialResult.status === "fulfilled" ? chinaOfficialResult.value : [];
    const googleNewsItems = googleNewsResult.status === "fulfilled" ? googleNewsResult.value : [];
    const mediaItems = mediaFeedsResult.status === "fulfilled" ? mediaFeedsResult.value : [];
    const officialItems = [...marketsOfficialItems(markets), ...productOfficialItems(filters)];
    const articles = dedupeArticles([...chinaOfficialItems, ...federalItems, ...govUkItems, ...googleNewsItems, ...mediaItems, ...gdeltArticles])
      .filter((item) => isRelevant(item, filters))
      .slice(0, 18);
    const verificationEntries = dedupeArticles([...officialItems, ...baselineVerificationItems(baseline)]).slice(0, 16);

    return json(200, {
      ok: true,
      source: "政策结论",
      updatedAt: new Date().toISOString(),
      filters,
      evidenceStatus: articles.length ? "matched-summary" : "no-match",
      baseline,
      summary: articles.length
        ? `找到 ${articles.length} 条同时通过国家/地区、产品和政策主题校验的公开标题或摘要；是否改变税率、准入或申报要求，仍需打开原文确认生效日期和适用范围。`
        : "本次没有找到同时通过国家/地区、产品和政策主题校验的公告标题或摘要，因此不生成新增政策结论。",
      analysis: buildAnalysis(articles, filters),
      sourceBreakdown: [
        { source: "中国官方发布页", status: `${chinaOfficialItems.length} 条相关公告` },
        { source: "Federal Register", status: `${federalItems.length} 条相关公告` },
        { source: "GOV.UK", status: `${govUkItems.length} 条相关公告` },
        { source: "Google News/行业 RSS", status: `${googleNewsItems.length + mediaItems.length} 条相关线索` },
        { source: "GDELT", status: `${gdeltArticles.length} 条相关线索` }
      ],
      verificationEntries,
      items: articles
    });
  } catch (error) {
    return json(200, fallback(error.message || "Policy query failed.", filters));
  }
};
