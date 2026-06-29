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

const dgClasses = [
  { classCode: "1", name: "爆炸品", meaning: "有爆炸或爆燃危险的货物。", examples: ["烟花", "弹药", "爆破器材"], un: ["UN0336", "UN0012"] },
  { classCode: "2.1", name: "易燃气体", meaning: "压缩、液化或溶解气体，遇火可能燃烧。", examples: ["打火机气体", "气雾剂", "液化石油气"], un: ["UN1950", "UN1075"] },
  { classCode: "2.2", name: "非易燃无毒气体", meaning: "通常为压缩气体，主要风险是压力释放。", examples: ["氮气", "二氧化碳"], un: ["UN1066", "UN1013"] },
  { classCode: "2.3", name: "有毒气体", meaning: "吸入可能造成严重健康风险。", examples: ["氯气", "氨气"], un: ["UN1017", "UN1005"] },
  { classCode: "3", name: "易燃液体", meaning: "闪点低，易形成可燃蒸气。", examples: ["油漆", "酒精", "香水", "清洗剂"], un: ["UN1263", "UN1170"] },
  { classCode: "4.1", name: "易燃固体", meaning: "固体状态下容易燃烧或摩擦起火。", examples: ["硫磺", "安全火柴"], un: ["UN1350", "UN1944"] },
  { classCode: "4.2", name: "易自燃物质", meaning: "接触空气可能自热或自燃。", examples: ["活性炭", "白磷"], un: ["UN1362", "UN1381"] },
  { classCode: "4.3", name: "遇水放出易燃气体", meaning: "遇水会释放易燃气体。", examples: ["金属钠", "电石"], un: ["UN1402", "UN1400"] },
  { classCode: "5.1", name: "氧化性物质", meaning: "本身不一定燃烧，但会助燃。", examples: ["过氧化氢", "硝酸盐"], un: ["UN2014", "UN1498"] },
  { classCode: "5.2", name: "有机过氧化物", meaning: "对温度敏感，可能剧烈分解。", examples: ["树脂固化剂", "有机过氧化物"], un: ["UN3105", "UN3107"] },
  { classCode: "6.1", name: "毒性物质", meaning: "摄入、吸入或皮肤接触有毒。", examples: ["农药", "部分化学品"], un: ["UN2811", "UN2902"] },
  { classCode: "6.2", name: "感染性物质", meaning: "含病原体或生物风险。", examples: ["医疗样本", "诊断标本"], un: ["UN3373", "UN2814"] },
  { classCode: "7", name: "放射性物质", meaning: "具有电离辐射风险。", examples: ["放射源", "医疗同位素"], un: ["UN2915", "UN3332"] },
  { classCode: "8", name: "腐蚀性物质", meaning: "会腐蚀皮肤、金属或包装。", examples: ["酸", "碱", "部分电池液"], un: ["UN2794", "UN3264"] },
  { classCode: "9", name: "杂项危险物质和物品", meaning: "不属于前八类但运输中有风险；消费电子常见锂电池就在此类。", examples: ["锂离子电池", "锂金属电池", "磁性材料"], un: ["UN3480", "UN3481", "UN3090", "UN3091"] }
];

const portMediaFeeds = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", domain: "bbc.co.uk" },
  { name: "CNN Latest", url: "http://rss.cnn.com/rss/cnn_latest.rss", domain: "cnn.com" },
  { name: "CCTV World", url: "http://english.cctv.cn/service/rss/2/index.xml", domain: "english.cctv.cn" },
  { name: "gCaptain", url: "https://gcaptain.com/feed/", domain: "gcaptain.com" },
  { name: "The Loadstar", url: "https://theloadstar.com/feed/", domain: "theloadstar.com" },
  { name: "Maritime Executive", url: "https://maritime-executive.com/feed", domain: "maritime-executive.com" },
  { name: "FreightWaves", url: "https://www.freightwaves.com/news/feed", domain: "freightwaves.com" },
  { name: "Splash247", url: "https://splash247.com/feed/", domain: "splash247.com" },
  { name: "Port Technology", url: "https://www.porttechnology.org/feed/", domain: "porttechnology.org" },
  { name: "Hellenic Shipping News", url: "https://www.hellenicshippingnews.com/feed/", domain: "hellenicshippingnews.com" },
  { name: "Safety4Sea", url: "https://safety4sea.com/feed/", domain: "safety4sea.com" }
];

const portProfiles = [
  {
    name: "Shanghai Port",
    region: "China",
    aliases: ["shanghai", "上海", "洋山", "外高桥", "cnsgh", "cnshg"],
    coordinates: { lat: 30.626, lon: 122.064 },
    baseline: "上海港进口重点看舱单、换单、海关放行、码头放行、查验指令和提箱预约；洋山/外高桥作业规则可能不同。",
    links: [
      ["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index"],
      ["上海港官网", "https://www.portshanghai.com.cn/"],
      ["上海海关", "http://shanghai.customs.gov.cn/"]
    ],
    checklist: [
      "用箱号或提单号核对：海关放行、码头放行、理货、换单、授权、放箱、查验指令。",
      "确认船司/货代最新 ETA、靠泊码头、换单安排、提箱预约和免堆期。",
      "如果含电池或 DG，提前确认码头危险品受理、船司限制、MSDS、UN38.3 和包装标签。"
    ],
    dgRules: [
      "锂电池类危险货物按 Class 9 场景重点复核；上海海事局发布过锂电池类危险货物水路运输指南。",
      "上海港危险货物集装箱港内堆存规则对部分高风险危险货物、具有副危险性的 8 类、9 类中的锂电池组等设置较短堆存要求，常见需提前协调直装直取/进港窗口。",
      "建议核验：船载危险货物申报、集装箱装箱证明、MSDS、UN38.3、锂电池标记、包装方式和码头作业附证限制。"
    ],
    dgSources: [
      ["IMO IMDG Code", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"],
      ["上海海事局锂电池运输申报优化", "https://www.sh.msa.gov.cn/tzgg/101130.jhtml"],
      ["上海港危险货物集装箱港内堆存作业管理规定", "https://jtw.sh.gov.cn/2025ngfxwj/20250225/4e7b1eb1d3ed416db671086f402676a8.html"],
      ["港口危险货物安全管理规定", "https://www.gov.cn/zhengce/2019-11/28/content_5711560.htm"]
    ]
  },
  {
    name: "Ningbo Zhoushan Port",
    region: "China",
    aliases: ["ningbo", "舟山", "宁波", "cnngb"],
    coordinates: { lat: 29.868, lon: 122.175 },
    baseline: "宁波舟山港需关注台风季、码头作业切换、危险品受理和提箱预约。",
    links: [["宁波舟山港", "https://www.nbport.com.cn/"], ["宁波海关", "http://ningbo.customs.gov.cn/"]],
    checklist: ["确认码头、靠泊计划和提箱预约。", "台风/大风季节关注港区公告。", "含电池/DG 货物提前确认堆存和申报要求。"]
  },
  {
    name: "Yantian Port",
    region: "China",
    aliases: ["yantian", "盐田", "shenzhen", "蛇口", "cnytn"],
    coordinates: { lat: 22.58, lon: 114.27 },
    baseline: "盐田/深圳口岸重点看截关、查验、危险品受理、华南天气和码头预约。",
    links: [["盐田国际", "https://www.yict.com.cn/"], ["深圳海关", "http://shenzhen.customs.gov.cn/"]],
    checklist: ["确认盐田/蛇口/南沙实际港区，避免走错查询入口。", "核对截关、还柜、查验和船司放行。", "台风季关注港区暂停作业公告。"]
  },
  {
    name: "Singapore Port",
    region: "Singapore",
    aliases: ["singapore", "新加坡", "sgsin"],
    coordinates: { lat: 1.264, lon: 103.82 },
    baseline: "新加坡作为中转港，重点看转运衔接、港口拥堵、船司改港和危险品转运限制。",
    links: [["MPA Singapore", "https://www.mpa.gov.sg/"], ["PSA Singapore", "https://www.singaporepsa.com/"]],
    checklist: ["确认是否为中转港及二程船信息。", "关注船司是否改港、甩柜或延迟接驳。", "DG/电池货物确认中转港接受规则。"]
  },
  {
    name: "Laem Chabang Port",
    region: "Thailand",
    aliases: ["laem chabang", "林查班", "莱姆查邦", "泰国", "thlch"],
    coordinates: { lat: 13.084, lon: 100.883 },
    baseline: "林查班是泰国主要集装箱港，消费电子进口重点看泰国海关税则、进口商资料、TISI/NBTC 要求、港区提箱和 DG 接受规则。",
    links: [
      ["Laem Chabang Port", "https://lcp.port.co.th/cs/internet/lcp/Information.html"],
      ["Port Authority of Thailand", "https://www.port.co.th/"],
      ["Thai Customs", "https://www.customs.go.th/"],
      ["Thailand National Single Window", "https://www.thainsw.net/"]
    ],
    checklist: [
      "确认当地进口商、清关代理、税号、税率、VAT 和是否需进口许可证。",
      "蓝牙/无线产品提前核验 NBTC；电源/插头或特定电子产品核验 TISI。",
      "含电池或 DG 时确认船司、码头和清关代理是否接受，以及 MSDS、UN38.3、包装标签是否齐全。"
    ],
    dgRules: [
      "泰国林查班危险品通常需要按港口/码头规则提前申报；船司公告提示部分危险品进口需通过 DG-Net 完成申报。",
      "林查班至曼谷驳船或内陆段可能对 DG 类别有额外限制；部分码头/驳船服务不接受 DG 或只接受有限类别。",
      "建议核验：DG-Net、船司泰国进口公告、码头是否接受该 Class、是否允许中转/驳船、ETA 前申报时限。"
    ],
    dgSources: [
      ["IMO IMDG Code", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"],
      ["DG-Net Thailand", "https://www.dg-net.org/en/home"],
      ["Maersk Thailand Imports", "https://www.maersk.com/local-information/asia-pacific/thailand/import"],
      ["Hapag-Lloyd Thailand DG barge restriction", "https://www.hapag-lloyd.com/en/services-information/news/2019/08/thailand---restriction-of-dangerous-goods-acceptance-by-barge.html"],
      ["Laem Chabang Port", "https://lcp.port.co.th/cs/internet/lcp/Information.html"]
    ]
  },
  {
    name: "Bangkok Port",
    region: "Thailand",
    aliases: ["bangkok", "曼谷", "คลองเตย", "klong toei", "thbkk"],
    coordinates: { lat: 13.71, lon: 100.57 },
    baseline: "曼谷港/คลองเตย更适合部分近洋和内陆配送场景，需和林查班区分实际卸港。",
    links: [["Port Authority of Thailand", "https://www.port.co.th/"], ["Thai Customs", "https://www.customs.go.th/"]],
    checklist: ["确认提单目的港是否为 Bangkok/Klong Toei 或 Laem Chabang。", "核对进口商清关安排和内陆配送。", "关注当地节假日和港区交通限制。"]
  },
  {
    name: "Ho Chi Minh / Cat Lai",
    region: "Vietnam",
    aliases: ["ho chi minh", "cat lai", "胡志明", "吉莱", "vnhcm"],
    coordinates: { lat: 10.75, lon: 106.79 },
    baseline: "胡志明 Cat Lai 重点看港区拥堵、单证一致性、进口许可和当地清关代理反馈。",
    links: [["Vietnam Customs", "https://www.customs.gov.vn/"], ["Saigon Newport", "https://saigonnewport.com.vn/"]],
    checklist: ["确认 Cat Lai / Cai Mep 实际卸港。", "核对当地进口许可、标签和清关资料。", "关注雨季、拥堵和查验安排。"]
  },
  {
    name: "Rotterdam Port",
    region: "Netherlands",
    aliases: ["rotterdam", "鹿特丹", "nlrtm"],
    coordinates: { lat: 51.948, lon: 4.142 },
    baseline: "鹿特丹重点看欧盟进口要求、港口拥堵、海关查验、内陆驳船/卡车衔接。",
    links: [["Port of Rotterdam", "https://www.portofrotterdam.com/"], ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"]],
    checklist: ["确认 EU EORI、进口商、CE/RoHS/电池法规资料。", "关注港口/铁路/卡车劳工或天气影响。", "确认内陆转运预约。"]
  },
  {
    name: "Port Klang",
    region: "Malaysia",
    aliases: ["port klang", "巴生", "mypkg", "malaysia"],
    coordinates: { lat: 2.999, lon: 101.392 },
    baseline: "巴生港重点看转运衔接、码头拥堵、清关代理反馈、当地进口许可和含电池/DG 接受规则。",
    links: [["Port Klang Authority", "https://www.pka.gov.my/"], ["Royal Malaysian Customs", "https://www.customs.gov.my/"]],
    checklist: ["确认实际码头和提箱预约。", "关注中转衔接和免堆期。", "含电池/DG 货物确认船司和码头接受规则。"]
  },
  {
    name: "Tanjung Pelepas",
    region: "Malaysia",
    aliases: ["tanjung pelepas", "丹戎帕拉帕斯", "mytpp", "ptp"],
    coordinates: { lat: 1.367, lon: 103.55 },
    baseline: "丹戎帕拉帕斯是重要转运港，重点看二程船衔接、甩柜、转运延误和危险品中转限制。",
    links: [["Port of Tanjung Pelepas", "https://www.ptp.com.my/"], ["Royal Malaysian Customs", "https://www.customs.gov.my/"]],
    checklist: ["确认二程船和转运时间。", "关注甩柜、改港和转运堆存。", "DG/电池确认中转规则。"]
  },
  {
    name: "Hamburg Port",
    region: "Germany",
    aliases: ["hamburg", "汉堡", "deham"],
    coordinates: { lat: 53.546, lon: 9.966 },
    baseline: "汉堡港重点看欧盟进口要求、铁路/卡车衔接、劳工/天气影响和内陆配送预约。",
    links: [["Port of Hamburg", "https://www.hafen-hamburg.de/en/"], ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"]],
    checklist: ["确认 EORI、进口商和欧盟合规资料。", "关注铁路/卡车衔接和劳工动态。", "确认内陆配送和仓库预约。"]
  },
  {
    name: "Durban Port",
    region: "South Africa",
    aliases: ["durban", "德班", "zadurb", "south africa", "南非"],
    coordinates: { lat: -29.871, lon: 31.051 },
    baseline: "德班港重点看南非进口商资料、SARS 清关、港口拥堵、电力/天气影响和内陆配送衔接。",
    links: [["Transnet National Ports Authority", "https://www.transnetnationalportsauthority.net/"], ["South African Revenue Service", "https://www.sars.gov.za/customs-and-excise/"]],
    checklist: ["确认南非进口商和清关代理。", "关注码头拥堵、电力和内陆运输。", "无线/电池产品提前确认 ICASA/NRCS 和 DG 文件。"]
  },
  {
    name: "Cape Town Port",
    region: "South Africa",
    aliases: ["cape town", "开普敦", "zacpt"],
    coordinates: { lat: -33.903, lon: 18.435 },
    baseline: "开普敦港重点看天气、靠泊等待、冷藏/集装箱作业和南非清关资料。",
    links: [["Transnet National Ports Authority", "https://www.transnetnationalportsauthority.net/"], ["South African Revenue Service", "https://www.sars.gov.za/customs-and-excise/"]],
    checklist: ["确认靠泊和提箱预约。", "关注风浪天气和港区作业。", "提前确认当地进口商/清关代理要求。"]
  },
  {
    name: "Port of Santos",
    region: "Brazil",
    aliases: ["santos", "桑托斯", "brazil", "巴西", "brssz"],
    coordinates: { lat: -23.933, lon: -46.333 },
    baseline: "桑托斯港是巴西主要集装箱港，进口重点看巴西 NCM、Siscomex、当地进口商、码头拥堵、罢工/天气和内陆转运。",
    links: [["Port of Santos", "https://www.portodesantos.com.br/en/"], ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br"], ["Receita Federal", "https://www.gov.br/receitafederal/pt-br"]],
    checklist: ["确认进口商、NCM、税费和 Siscomex 流程。", "关注港口拥堵、罢工、天气和内陆卡车/铁路。", "无线/电池产品提前确认 ANATEL/INMETRO 和 DG 文件。"],
    dgRules: [
      "巴西进口 DG 需让当地进口商/货代确认 Siscomex、港口/码头和船司是否接受该 UN/Class。",
      "锂电池类消费电子通常按 Class 9 复核，重点看 MSDS、UN38.3、包装方式、标签和船司 DG approval。",
      "公开接口未稳定提供桑托斯各码头实时 DG 限制；如系统没有抓到近期特殊公告，应由当地代理向实际卸港码头确认。"
    ],
    dgSources: [
      ["IMO IMDG Code", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"],
      ["Port of Santos", "https://www.portodesantos.com.br/en/"],
      ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br"],
      ["Receita Federal", "https://www.gov.br/receitafederal/pt-br"]
    ]
  },
  {
    name: "Vancouver Port",
    region: "Canada",
    aliases: ["vancouver", "温哥华", "canada", "加拿大", "cavan"],
    coordinates: { lat: 49.289, lon: -123.105 },
    baseline: "温哥华港重点看加拿大 CBSA 清关、铁路衔接、劳工/天气、内陆配送和 ISED/产品安全要求。",
    links: [["Port of Vancouver", "https://www.portvancouver.com/"], ["CBSA Customs Tariff", "https://www.cbsa.gc.ca/trade-commerce/tariff-tarif/menu-eng.html"]],
    checklist: ["确认 CBSA 税则、进口商和清关资料。", "关注铁路/卡车衔接和港区劳工动态。", "无线/电池产品确认 ISED 和 DG 文件。"]
  },
  {
    name: "Manzanillo Port",
    region: "Mexico",
    aliases: ["manzanillo", "曼萨尼约", "mexico", "墨西哥", "mxzan"],
    coordinates: { lat: 19.067, lon: -104.323 },
    baseline: "曼萨尼约是墨西哥主要集装箱港，重点看 SAT/SNICE、海关代理、NOM/IFETEL、港口拥堵和内陆配送。",
    links: [["ASIPONA Manzanillo", "https://www.puertomanzanillo.com.mx/"], ["SNICE", "https://www.snice.gob.mx/"], ["SAT", "https://www.sat.gob.mx/"]],
    checklist: ["确认海关代理、进口商登记和税则。", "无线/电源产品提前确认 IFETEL/NOM。", "关注港口拥堵和内陆运输。"]
  },
  {
    name: "Jebel Ali Port",
    region: "UAE",
    aliases: ["jebel ali", "杰贝阿里", "dubai", "迪拜", "uae", "阿联酋", "aejea"],
    coordinates: { lat: 25.011, lon: 55.061 },
    baseline: "杰贝阿里是中东重要港口和转运枢纽，重点看转运衔接、Dubai Trade、TDRA/产品合规、阿语标签和 DG 接受规则。",
    links: [["Dubai Customs", "https://www.dubaicustoms.gov.ae/"], ["Dubai Trade", "https://www.dubaitrade.ae/"], ["TDRA UAE", "https://tdra.gov.ae/"]],
    checklist: ["确认是否最终进口或转运。", "无线/消费电子确认 TDRA 和标签。", "含电池/DG 确认转运港和船司接受规则。"]
  },
  {
    name: "Jeddah Islamic Port",
    region: "Saudi Arabia",
    aliases: ["jeddah", "吉达", "saudi", "沙特", "sajed"],
    coordinates: { lat: 21.47, lon: 39.15 },
    baseline: "吉达港进口重点看 ZATCA、SABER/SASO、阿语标签、进口商证书和港口/内陆配送安排。",
    links: [["ZATCA", "https://zatca.gov.sa/"], ["SABER", "https://saber.sa/"], ["SASO", "https://www.saso.gov.sa/"]],
    checklist: ["确认 SABER/SASO 证书和进口商责任。", "确认阿语标签和清关资料。", "关注港口作业和 DG 接受规则。"]
  },
  {
    name: "Los Angeles / Long Beach",
    region: "United States",
    aliases: ["los angeles", "long beach", "洛杉矶", "uslax", "uslgb"],
    coordinates: { lat: 33.74, lon: -118.25 },
    baseline: "洛杉矶/长滩重点看港口拥堵、铁路/卡车衔接、美国 HTS、FCC、电池运输和贸易救济关税。",
    links: [["Port of Los Angeles", "https://www.portoflosangeles.org/"], ["Port of Long Beach", "https://polb.com/"], ["CBP", "https://www.cbp.gov/"]],
    checklist: ["确认 HTS、301/232/AD/CVD 等额外税费。", "无线产品核验 FCC；电池货物核验 DOT/IATA/IMDG。", "关注码头预约、铁路延误和 demurrage/detention。"]
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

function parseRssItems(xml = "", source = {}, port = "") {
  const itemBlocks = [...String(xml || "").matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const entryBlocks = [...String(xml || "").matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  return [...itemBlocks, ...entryBlocks].slice(0, 8).map((block) => {
    const title = tagValue(block, "title");
    const url = linkValue(block);
    const description = tagValue(block, "description") || tagValue(block, "summary");
    const published = tagValue(block, "pubDate") || tagValue(block, "updated") || tagValue(block, "published");
    return normalizeArticle({
      title: title.replace(/\s+-\s+[^-]{2,40}$/g, "") || source.name || "Port risk item",
      url,
      domain: source.domain || "news source",
      sourcecountry: "Global",
      seendate: published,
      description,
      port
    });
  });
}

function clean(value) {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

function findPortProfile(port = "", region = "") {
  const lower = `${clean(port)} ${clean(region)}`.toLowerCase();
  if (!lower.trim()) return portProfiles[0];
  return (
    portProfiles.find((profile) => {
      const haystack = [profile.name, profile.region, ...profile.aliases].join(" ").toLowerCase();
      return haystack.includes(lower.trim()) || profile.aliases.some((alias) => lower.includes(alias.toLowerCase()));
    }) || null
  );
}

function expandPort(port = "") {
  const cleaned = clean(port);
  const profile = findPortProfile(cleaned);
  const lower = cleaned.toLowerCase();
  const aliases = new Set([cleaned || profile?.name || "Shanghai Port"]);
  if (profile) {
    aliases.add(profile.name);
    profile.aliases.slice(0, 4).forEach((item) => aliases.add(item));
  }
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
  if (/林查班|莱姆查邦|laem chabang|thlch|泰国/.test(lower)) ["Laem Chabang Port", "Laem Chabang", "林查班"].forEach((item) => aliases.add(item));
  if (/巴生|port klang|mypkg|malaysia/.test(lower)) ["Port Klang", "Klang", "巴生港"].forEach((item) => aliases.add(item));
  if (/丹戎|tanjung pelepas|ptp|mytpp/.test(lower)) ["Tanjung Pelepas", "PTP"].forEach((item) => aliases.add(item));
  if (/德班|durban|南非|south africa/.test(lower)) ["Durban Port", "Durban", "South Africa"].forEach((item) => aliases.add(item));
  if (/开普敦|cape town/.test(lower)) ["Cape Town Port", "Cape Town"].forEach((item) => aliases.add(item));
  return Array.from(aliases).filter(Boolean).slice(0, 6);
}

function portTermsForRelevance(port = "", profile = null) {
  const stopwords = new Set(["port", "harbor", "terminal", "of", "the", "and", "islamic", "港", "港口"]);
  return expandPort(port || profile?.name || "")
    .flatMap((item) => String(item || "").toLowerCase().split(/\s+/))
    .filter((item) => item.length >= 2 && !stopwords.has(item));
}

function isRelevantArticle(item = {}, port = "", profile = null) {
  const terms = portTermsForRelevance(port, profile);
  if (!terms.length) return true;
  const haystack = `${item.title || ""} ${item.description || ""} ${item.domain || ""}`.toLowerCase();
  const portMatch = terms.some((term) => haystack.includes(term));
  const logisticsContext = /port|terminal|shipping|container|customs|clearance|logistics|vessel|berth|congestion|queue|backlog|delay|港口|码头|海关|清关|通关|船|箱|拥堵|塞港|压港|靠泊|提箱|放行/.test(haystack);
  return portMatch && logisticsContext;
}

async function getMarineWeather(profile) {
  if (!profile?.coordinates) return null;
  const url = new URL("https://marine-api.open-meteo.com/v1/marine");
  url.searchParams.set("latitude", profile.coordinates.lat);
  url.searchParams.set("longitude", profile.coordinates.lon);
  url.searchParams.set("current", "wave_height,wave_period,sea_surface_temperature,ocean_current_velocity,ocean_current_direction");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "1");
  url.searchParams.set("cell_selection", "sea");
  const response = await getJson(url);
  if (!response.ok || !response.data?.current) return null;
  const current = response.data.current;
  const wave = Number(current.wave_height);
  const currentVelocity = Number(current.ocean_current_velocity);
  const notes = [];
  if (Number.isFinite(wave)) {
    if (wave >= 3) notes.push("浪高偏大，港口/驳船/靠泊可能受天气影响");
    else if (wave >= 1.5) notes.push("海况需关注，但通常属于观察级");
    else notes.push("公开海况暂未显示明显大浪信号");
  }
  if (Number.isFinite(currentVelocity) && currentVelocity >= 1) notes.push("洋流速度偏高，谨慎看待靠泊/小船作业");
  return {
    source: "Open-Meteo Marine",
    updatedAt: current.time || "",
    waveHeightM: Number.isFinite(wave) ? wave : "",
    wavePeriodS: Number.isFinite(Number(current.wave_period)) ? Number(current.wave_period) : "",
    seaSurfaceTempC: Number.isFinite(Number(current.sea_surface_temperature)) ? Number(current.sea_surface_temperature) : "",
    oceanCurrentVelocity: Number.isFinite(currentVelocity) ? currentVelocity : "",
    oceanCurrentDirection: Number.isFinite(Number(current.ocean_current_direction)) ? Number(current.ocean_current_direction) : "",
    notes
  };
}

async function fetchGooglePortNews(port = "", profile = null) {
  const terms = expandPort(port || profile?.name || "").slice(0, 4).join(" OR ");
  const query = `(${terms || "Shanghai Port"}) (congestion OR backlog OR "berth waiting" OR "vessel queue" OR delay OR strike OR weather OR terminal OR customs OR logistics OR "port disruption") when:7d`;
  const url = new URL("https://news.google.com/rss/search");
  url.searchParams.set("q", query);
  url.searchParams.set("hl", "zh-CN");
  url.searchParams.set("gl", "CN");
  url.searchParams.set("ceid", "CN:zh-Hans");
  const response = await fetchText(url);
  if (!response.ok) return [];
  return parseRssItems(response.text, { name: "Google News", domain: "news.google.com" }, port)
    .filter((item) => isRecentEnough(item, 10) && isRelevantArticle(item, port, profile))
    .slice(0, 6);
}

async function fetchPortMediaFeeds(port = "", profile = null) {
  const settled = await Promise.allSettled(portMediaFeeds.map(async (source) => {
    const response = await fetchText(source.url);
    if (!response.ok) return [];
    return parseRssItems(response.text, source, port)
      .filter((item) => isRecentEnough(item) && isRelevantArticle(item, port, profile))
      .slice(0, 2);
  }));
  return settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

function isRecentEnough(item = {}, days = 14) {
  const time = Date.parse(item.seendate || "");
  if (!Number.isFinite(time)) return true;
  const now = Date.now();
  return time >= now - days * 24 * 60 * 60 * 1000 && time <= now + 24 * 60 * 60 * 1000;
}

function riskSignals(text = "") {
  const lowered = text.toLowerCase();
  const signals = [];
  if (/congestion|delay|queue|backlog|berth|waiting|拥堵|延误|排队|压港/.test(lowered)) signals.push("拥堵/等待");
  if (/strike|labor|protest|罢工|抗议/.test(lowered)) signals.push("罢工/劳工");
  if (/typhoon|storm|weather|fog|wind|rain|台风|风暴|大雾|天气/.test(lowered)) signals.push("天气");
  if (/customs|inspection|clearance|海关|查验|放行/.test(lowered)) signals.push("海关/查验");
  if (/dangerous|battery|hazardous|dg|危险品|电池/.test(lowered)) signals.push("DG/电池");
  if (/blank sailing|rollover|omission|transshipment|转运|甩柜|跳港|改港/.test(lowered)) signals.push("船期/转运");
  if (/tariff|sanction|trade|关税|制裁|贸易/.test(lowered)) signals.push("贸易政策");
  return signals;
}

function normalizeArticle(article = {}) {
  const signals = riskSignals(`${article.title || ""} ${article.description || ""} ${article.domain || ""}`);
  return {
    title: article.title || "Untitled",
    url: article.url || "",
    domain: article.domain || "",
    sourceCountry: article.sourcecountry || article.sourceCountry || "",
    seendate: article.seendate || "",
    description: article.description || "",
    signals
  };
}

function hasDisplayRiskContext(item = {}) {
  const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();
  const signals = Array.isArray(item.signals) ? item.signals : [];
  if (signals.length) return true;
  return /congestion|backlog|berth|waiting|queue|delay|strike|labor|weather|typhoon|storm|terminal|port operation|customs inspection|clearance delay|dangerous goods|hazardous|lithium|battery|dg|港口|码头|靠泊|泊位|压港|塞港|拥堵|延误|排队|罢工|天气|台风|查验|放行异常|危险品|锂电池|电池/.test(text);
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

function dedupeSourcePairs(items = []) {
  const seen = new Set();
  return items.filter(([title = "", url = ""]) => {
    const key = `${title}|${url}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function detectDangerousGoods(cargo = "") {
  const text = clean(cargo).toLowerCase();
  const unMatches = Array.from(new Set((text.match(/un\s?\d{4}/gi) || []).map((item) => item.replace(/\s+/g, "").toUpperCase())));
  const explicitClass = text.match(/(?:class|类别|第)\s*(\d(?:\.\d)?)/i)?.[1] || "";
  let matched = null;
  if (unMatches.length) {
    matched = dgClasses.find((item) => item.un.some((un) => unMatches.includes(un))) || null;
  }
  if (!matched && explicitClass) {
    matched = dgClasses.find((item) => item.classCode === explicitClass || item.classCode.startsWith(`${explicitClass}.`)) || null;
  }
  if (!matched && /锂|lithium|battery|电池|power bank|充电宝|储能|un3480|un3481|un3090|un3091/.test(text)) {
    matched = dgClasses.find((item) => item.classCode === "9");
  }
  if (!matched && /香水|酒精|油漆|涂料|墨水|易燃液体|flammable liquid|un1263|un1170/.test(text)) {
    matched = dgClasses.find((item) => item.classCode === "3");
  }
  if (!matched && /酸|碱|腐蚀|corrosive|电池液|un2794/.test(text)) {
    matched = dgClasses.find((item) => item.classCode === "8");
  }
  if (!matched && /气雾|喷雾|aerosol|打火机|gas|气体|un1950/.test(text)) {
    matched = dgClasses.find((item) => item.classCode === "2.1");
  }
  const dgFlag = Boolean(matched || unMatches.length || /危险|dangerous|hazard|dg|msds|un38\.3|imdg/.test(text));
  return {
    isDangerous: dgFlag,
    classCode: matched?.classCode || explicitClass || "",
    className: matched?.name || (dgFlag ? "危险品类别待确认" : "未识别为危险品"),
    meaning: matched?.meaning || (dgFlag ? "已识别到危险品线索，但缺少明确 UN 编号或 Class。" : "当前货物描述未明显命中危险品关键词。"),
    examples: matched?.examples || [],
    unNumbers: unMatches.length ? unMatches : matched?.un || [],
    likely: Boolean(matched),
    input: cargo
  };
}

function buildDgAdvice(profile, cargo = "", weather = null, articles = []) {
  const detected = detectDangerousGoods(cargo);
  const classText = detected.classCode ? `Class ${detected.classCode} ${detected.className}` : detected.className;
  const docs = detected.isDangerous
    ? ["MSDS/SDS", "UN38.3 或对应测试/鉴定资料", "危险品申报信息", "正确 UN 编号和 Proper Shipping Name", "包装方式、标签/唛头、净重/毛重", "船司 DG approval 或订舱确认"]
    : ["普通货物仍需确认是否含内置电池、液体、磁性、化学品或带压容器。"];
  const restrictions = [];
  if (detected.isDangerous) {
    restrictions.push("先确认实际卸港码头和船司是否接受该 UN/Class，不要只看城市港口名称。");
    restrictions.push("确认是否需要提前申报、预约进港、直装直取、限时堆存或指定危险品堆场。");
  } else {
    restrictions.push("如产品含电池、液体、化学品、磁性材料、喷雾或带压部件，应重新按危险品核验。");
  }
  if (detected.classCode === "9") {
    restrictions.push("Class 9 锂电池类重点核验 UN3480/UN3481/UN3090/UN3091、UN38.3、荷电状态、包装方式和锂电池标记。");
  }
  if (profile?.dgRules?.length) restrictions.push(...profile.dgRules);
  const articleSignals = articles.filter((item) => /dangerous|hazard|battery|lithium|dg|危险|电池|chemical|imdg/i.test(`${item.title} ${item.description}`));
  const specialStatus = articleSignals.length
    ? `近期公开消息命中 ${articleSignals.length} 条 DG/电池相关线索，建议打开原文核验。`
    : "未抓到与该港口和该类危险品直接相关的近期特殊限制；仍需以码头、船司和当地代理确认为准。";
  return {
    ...detected,
    displayClass: classText,
    documents: docs,
    restrictions: Array.from(new Set(restrictions)).slice(0, 8),
    specialStatus,
    sources: [
      ...dedupeSourcePairs([
        ["IMO IMDG Code", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"],
        ...(profile?.dgSources || [])
      ])
    ],
    relatedArticles: articleSignals.slice(0, 4)
  };
}

function buildOperationGuide(profile, dgAdvice = {}) {
  const portName = profile?.name || "目标港口";
  const dgClass = dgAdvice.displayClass || "普通货物/危险品待确认";
  const common = [
    {
      stage: "订舱前 7-14 天",
      action: dgAdvice.isDangerous
        ? `把 UN No、Proper Shipping Name、${dgClass}、包装等级、净重/毛重、MSDS/SDS、UN38.3 或鉴定资料发给货代，让船司确认是否接受。`
        : "先确认货物是否含电池、液体、磁性材料、喷雾、带压容器或化学品；如有任一项，按危险品边界重新核验。",
      owner: "物流/货代 + 认证/DG 资料提供人"
    },
    {
      stage: "订舱确认",
      action: dgAdvice.isDangerous
        ? "取得船司 DG approval，确认截危申报时间、是否允许中转/驳船、是否需要指定柜型或限重，避免临近截关被拒载。"
        : "确认船司、码头、截关、放行、免堆期和提箱预约；普通货也要确认是否有海关查验或港区特殊限制。",
      owner: "货代/船司"
    },
    {
      stage: "装箱/贴标",
      action: dgAdvice.isDangerous
        ? "按 IMDG/IATA 资料检查包装、危险品标签、锂电池标记、应急联系电话、装箱证明和 VGM；拍照留证。"
        : "检查唛头、箱单、封条、VGM、包装强度和电池/液体/磁性声明，避免到港补料。",
      owner: "仓库/供应商 + 物流"
    },
    {
      stage: "进港/靠泊前",
      action: `${portName} 需让货代确认实际码头、危险品进港窗口、是否要求直装直取或限时堆存；上海、林查班等港口尤其要区分具体码头规则。`,
      owner: "货代/码头/当地代理"
    },
    {
      stage: "到港/提货",
      action: "同步看海关放行、码头放行、船司放货、换单、查验、提箱预约和免堆期；如果 DG 审批或资料有缺口，马上升级给关务/认证/当地进口商。",
      owner: "清关代理 + 当地进口商 + 物流"
    }
  ];
  if (profile?.checklist?.length) {
    common.push({
      stage: "该港重点",
      action: profile.checklist.slice(0, 3).join("；"),
      owner: "港口/货代/当地代理"
    });
  }
  if (dgAdvice.classCode === "9") {
    common.splice(2, 0, {
      stage: "Class 9 锂电池专项",
      action: "确认 UN3480/UN3481/UN3090/UN3091、Wh、包装方式、SOC、UN38.3、MSDS/SDS、锂电池标记和船司是否接受该包装场景。",
      owner: "认证/DG 专员 + 货代"
    });
  }
  return common.slice(0, 7);
}

function fallback(port, cargo, profile = findPortProfile(port)) {
  const batteryCargo = /battery|电池|危险|dg|hazard/i.test(cargo);
  const dgAdvice = buildDgAdvice(profile, cargo);
  return {
    ok: false,
    fallback: true,
    source: "Port risk conclusion",
    updatedAt: new Date().toISOString(),
    port: profile?.name || port,
    region: profile?.region || "",
    congestionStatus: "未见明确塞港信号",
    congestionSummary: `${profile?.name || port} 当前没有抓到明确拥堵/塞港新闻。建议按正常计划推进，同时向货代确认最新靠泊、提箱和码头预约。`,
    impact: batteryCargo ? "含电池/DG 货物仍需提前确认船司和码头接受规则。" : "常规货物暂无明显港口异常信号。",
    recommendation: "出货前仍建议向货代确认 ETA、靠泊码头、免堆期和提箱预约。",
    summary: `${profile?.name || port} 暂未获取到明确实时拥堵新闻。${profile?.baseline ? ` ${profile.baseline}` : ""}`,
    level: batteryCargo ? "Medium" : "Watch",
    profileSummary: profile?.baseline || "",
    links: profile?.links?.length ? profile.links : officialPortLinks,
    dgAdvice,
    operationGuide: buildOperationGuide(profile, dgAdvice),
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
  const dgInput = clean(params.dg || params.dgInfo || "");
  const dgClass = clean(params.dgClass || "");
  const cargoForDg = [cargo, dgClass ? `Class ${dgClass}` : "", dgInput].filter(Boolean).join(" ");
  const profile = findPortProfile(port, region);
  const portTerms = expandPort(port).map((item) => `"${item}"`).join(" OR ");
  const query = `(${portTerms}) (${["congestion", "backlog", "\"berth waiting\"", "\"vessel queue\"", "delay", "strike", "weather", "customs", "terminal", "shipping", "logistics", "\"port disruption\"", "typhoon"].join(" OR ")})`;

  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", query);
  url.searchParams.set("mode", "artlist");
  url.searchParams.set("format", "json");
  url.searchParams.set("timespan", "1week");
  url.searchParams.set("maxrecords", "8");
  url.searchParams.set("sort", "datedesc");

  const [newsResult, weatherResult, googleNewsResult, mediaFeedsResult] = await Promise.allSettled([
    getJson(url),
    getMarineWeather(profile),
    fetchGooglePortNews(port, profile),
    fetchPortMediaFeeds(port, profile)
  ]);
  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : null;

  try {
    const response = newsResult.status === "fulfilled" ? newsResult.value : null;
    const data = response?.data || {};
    const gdeltArticles = Array.isArray(data.articles)
      ? data.articles.map(normalizeArticle).filter((item) => isRelevantArticle(item, port, profile))
      : [];
    const googleArticles = googleNewsResult.status === "fulfilled" ? googleNewsResult.value : [];
    const mediaArticles = mediaFeedsResult.status === "fulfilled" ? mediaFeedsResult.value : [];
    const articles = dedupeArticles([...googleArticles, ...mediaArticles, ...gdeltArticles]).slice(0, 12);
    const displayArticles = articles.filter(hasDisplayRiskContext).slice(0, 8);

    if (!articles.length && !weather) {
      const result = fallback(port, cargoForDg || cargo, profile);
      result.weather = weather;
      if (newsResult.status === "rejected") result.message = newsResult.reason?.message || "Port news query failed.";
      return json(200, result);
    }

    const allSignals = new Set(displayArticles.flatMap((item) => item.signals));
    const batteryCargo = /battery|电池|危险|dg|hazard|un38\.3|un\d{4}|lithium/i.test(cargoForDg);
    const dgAdvice = buildDgAdvice(profile, cargoForDg || cargo, weather, articles);
    const marineWatch = weather?.notes?.some((note) => /浪高偏大|洋流速度偏高/.test(note));
    const hasCongestion = allSignals.has("拥堵/等待");
    const hasOperationRisk = allSignals.has("罢工/劳工") || allSignals.has("天气") || marineWatch;
    const level = allSignals.has("罢工/劳工") || allSignals.has("天气") || allSignals.has("拥堵/等待") || marineWatch
      ? "Watch"
      : batteryCargo
        ? "Medium"
        : "Low";

    const base = fallback(port, cargo, profile);
    return json(200, {
      ok: true,
      source: "Google News + industry RSS + GDELT",
      updatedAt: new Date().toISOString(),
      port: profile?.name || port,
      region: profile?.region || region,
      cargo,
      dgAdvice,
      operationGuide: buildOperationGuide(profile, dgAdvice),
      level,
      congestionStatus: hasCongestion ? "可能存在拥堵/等待" : hasOperationRisk ? "港口作业需关注" : "未见明显塞港信号",
      congestionSummary: hasCongestion
        ? `${profile?.name || port} 的公开消息出现拥堵、等待或压港相关信号，需要向货代确认实际靠泊和提箱安排。`
        : hasOperationRisk
          ? `${profile?.name || port} 未见明确塞港，但存在天气/劳工/海况等作业风险信号。`
          : `${profile?.name || port} 公开消息暂未显示明显塞港或拥堵信号。`,
      impact: Array.from(allSignals).length
        ? `风险信号：${Array.from(allSignals).join("、")}。可能影响 ETA、靠泊、提箱预约或清关节奏。`
        : marineWatch
          ? `海况提示：${(weather?.notes || []).join("、")}。建议向货代确认靠泊和提箱安排。`
          : "暂无明显港口风险信号。",
      recommendation: batteryCargo ? "含电池/DG 货物建议提前确认码头危险品受理、MSDS、UN38.3 和船司限制。" : "建议向货代确认最新 ETA、靠泊码头、提箱预约和免堆期。",
      summary: `${profile?.name || port} 过去一周直接相关风险消息命中 ${displayArticles.length} 条，风险信号：${Array.from(allSignals).join("、") || "未见明显关键词"}。${profile?.baseline ? ` ${profile.baseline}` : ""}`,
      profileSummary: profile?.baseline || "",
      links: base.links,
      weather,
      articles: displayArticles
    });
  } catch (error) {
    const result = fallback(port, cargo, profile);
    result.weather = weather;
    result.message = error.message || "Port risk query failed.";
    return json(200, result);
  }
};
