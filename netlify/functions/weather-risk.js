const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};
const { portCoordinates, findPortCoordinate } = require("./lib/port-coordinates");

const weatherSources = [
  {
    id: "nmc-alert",
    name: "中央气象台气象灾害预警",
    url: "https://www.nmc.cn/publish/alarm.html",
    type: "official-weather"
  },
  {
    id: "nmc-typhoon-warning",
    name: "中央气象台台风预警",
    url: "https://www.nmc.cn/publish/typhoon/warning.html",
    type: "official-weather"
  },
  {
    id: "nmc-typhoon-track",
    name: "中央气象台台风路径",
    url: "https://www.nmc.cn/publish/typhoon/typhoon_new.html",
    type: "official-weather"
  },
  {
    id: "nmc-marine",
    name: "中央气象台海区预报",
    url: "https://www.nmc.cn/publish/marine/newcoastal.html",
    type: "official-marine"
  },
  {
    id: "nmc-traffic",
    name: "中央气象台交通气象",
    url: "https://www.nmc.cn/publish/traffic.html",
    type: "official-traffic"
  },
  {
    id: "jtwc",
    name: "JTWC Tropical Cyclone Warnings",
    url: "https://www.metoc.navy.mil/jtwc/jtwc.html",
    type: "official-weather"
  }
];

const controlSources = [
  {
    id: "china-msa-navwarn",
    name: "中国海事局航行警告",
    url: "https://www.msa.gov.cn/page/article.do?channelId=94e7e863-8099-444d-a9d5-86725dfc26d8",
    type: "navigation-warning"
  },
  {
    id: "nga-msi",
    name: "NGA Maritime Safety Information",
    url: "https://msi.nga.mil/",
    type: "navigation-warning"
  },
  {
    id: "mpa-port-marine-notices",
    name: "MPA Singapore Notices",
    url: "https://www.mpa.gov.sg/",
    type: "port-control"
  },
  {
    id: "suez-canal-authority",
    name: "Suez Canal Authority",
    url: "https://www.suezcanal.gov.eg/English/Pages/default.aspx",
    type: "canal-control"
  }
];

const weatherHazards = [
  {
    id: "typhoon",
    label: "台风/热带气旋",
    terms: ["台风", "热带风暴", "强热带风暴", "热带低压", "typhoon", "tropical storm", "tropical cyclone", "巴威"],
    action: "复核靠泊、截关、闸口、危险品/冷箱进港窗口和船司是否顺延。"
  },
  {
    id: "gale",
    label: "大风/阵风",
    terms: ["大风", "阵风", "强风", "海上大风", "风力", "gale", "strong wind", "high wind", "wind warning"],
    action: "大风会影响岸桥、堆场、靠泊、引航和驳船作业，需确认码头限作业规则。"
  },
  {
    id: "fog",
    label: "大雾/海雾/低能见度",
    terms: ["大雾", "海雾", "浓雾", "能见度", "低能见度", "fog", "sea fog", "low visibility"],
    action: "低能见度重点影响引航、靠泊、开航、闸口交通和机场起降。"
  },
  {
    id: "convective",
    label: "雷暴/强对流/冰雹",
    terms: ["强对流", "雷暴", "雷雨大风", "雷电", "闪电", "冰雹", "短时强降水", "thunderstorm", "lightning", "hail"],
    action: "雷暴和强对流会影响露天装卸、堆场安全、航班地勤和短时闸口作业。"
  },
  {
    id: "rain-flood",
    label: "暴雨/洪水/积涝",
    terms: ["暴雨", "强降雨", "洪水", "山洪", "内涝", "积水", "渍涝", "rainstorm", "heavy rain", "flood", "waterlogging"],
    action: "暴雨和积涝重点影响拖车道路、仓库、堆场、铁路/公路集疏运和末端派送。"
  },
  {
    id: "snow-ice",
    label: "暴雪/冰冻/寒潮",
    terms: ["暴雪", "降雪", "雨雪", "冻雨", "冰冻", "道路结冰", "寒潮", "低温", "snow", "blizzard", "freezing", "ice", "cold wave"],
    action: "冰雪低温会影响闸口、拖车、铁路、公路、堆场设备和电池/液体类货物保温。"
  },
  {
    id: "heat",
    label: "高温",
    terms: ["高温", "酷热", "heatwave", "high temperature", "extreme heat"],
    action: "高温需关注冷箱、危险品、锂电池、仓储温控和人员限时作业安排。"
  },
  {
    id: "dust-haze",
    label: "沙尘/霾",
    terms: ["沙尘", "沙尘暴", "浮尘", "霾", "dust storm", "sandstorm", "dust", "haze"],
    action: "沙尘和霾主要影响能见度、机场起降、陆运安全和部分露天装卸。"
  },
  {
    id: "marine-wave",
    label: "风暴潮/巨浪/涌浪",
    terms: ["风暴潮", "海浪", "巨浪", "狂浪", "涌浪", "浪高", "storm surge", "wave", "swell", "rough sea"],
    action: "风暴潮和巨浪会影响靠泊、引航、拖轮、驳船、支线船和海上航行安全。"
  }
];

const allWeatherTerms = [...new Set(weatherHazards.flatMap((item) => item.terms))];

const controlHazards = [
  {
    id: "military-exercise",
    label: "军演/实弹射击",
    terms: ["军演", "军事演习", "实弹射击", "射击训练", "演习区域", "military exercise", "live firing", "firing exercise", "exercise area"],
    action: "确认航行警告坐标、时间窗和船司是否绕行或调整靠泊/开航。"
  },
  {
    id: "navigation-warning",
    label: "航行警告/禁航区",
    terms: ["航行警告", "禁航", "禁航区", "临时交通管制", "交通管制", "警戒区", "navigation warning", "navarea", "exclusion zone", "restricted area", "security zone"],
    action: "按公告时间和区域判断是否压到常规航线；必要时向船司确认绕航、限速或等待。"
  },
  {
    id: "canal-port-control",
    label: "运河/港口管制",
    terms: ["限航", "停航", "封航", "暂停通航", "通航管制", "canal closure", "traffic suspension", "port restriction", "convoy delay", "transit restriction"],
    action: "确认运河/港口通行窗口和排队计划，更新 ETA、免堆免箱和客户交付承诺。"
  }
];

const allControlTerms = [...new Set(controlHazards.flatMap((item) => item.terms))];
const allRouteImpactTerms = [...new Set([...allWeatherTerms, ...allControlTerms])];

const portProfiles = [
  {
    code: "CNSHA",
    cn: "上海港",
    name: "Shanghai Port",
    aliases: ["上海", "shanghai", "cnsgh", "cnsha", "洋山", "外高桥"],
    weatherTerms: ["上海", "长江口", "浙江北部", "东海", "华东沿海"],
    notices: [
      ["上港集团", "https://www.sipg.com.cn/"],
      ["上海港官网", "https://www.portshanghai.com.cn/"],
      ["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index"]
    ]
  },
  {
    code: "CNNGB",
    cn: "宁波舟山港",
    name: "Ningbo Zhoushan Port",
    aliases: ["宁波", "舟山", "ningbo", "zhoushan", "cnngb"],
    weatherTerms: ["宁波", "舟山", "浙江", "浙江沿海", "东海"],
    notices: [["宁波舟山港", "https://www.nbport.com.cn/"]]
  },
  {
    code: "CNXMN",
    cn: "厦门港",
    name: "Xiamen Port",
    aliases: ["厦门", "xiamen", "cnxmn", "海沧", "嵩屿", "远海"],
    weatherTerms: ["厦门", "福建", "闽南", "台湾海峡", "福建沿海", "泉州", "漳州"],
    notices: [
      ["厦门港务控股", "https://www.xpgco.com.cn/"],
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["厦门港口管理局", "http://port.xm.gov.cn/"]
    ]
  },
  {
    code: "CNFOC",
    cn: "福州港",
    name: "Fuzhou Port",
    aliases: ["福州", "fuzhou", "cnfoc", "江阴", "马尾"],
    weatherTerms: ["福州", "福建", "福建沿海", "台湾海峡", "闽江口"],
    notices: [["福州港务集团", "https://www.fzport.com/"], ["福州海事局", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNYTN",
    cn: "盐田/深圳港",
    name: "Yantian / Shenzhen Port",
    aliases: ["盐田", "深圳", "蛇口", "yantian", "shenzhen", "shekou", "cnytn", "cnszx"],
    weatherTerms: ["深圳", "珠江口", "广东", "华南沿海", "南海北部"],
    notices: [["盐田国际", "https://www.yict.com.cn/"], ["招商局港口", "https://www.cmport.com.hk/"]]
  },
  {
    code: "CNGZG",
    cn: "广州南沙港",
    name: "Guangzhou Nansha Port",
    aliases: ["广州", "南沙", "guangzhou", "nansha", "cngzg"],
    weatherTerms: ["广州", "南沙", "珠江口", "广东", "华南沿海"],
    notices: [["广州港集团", "https://www.gzport.com/"], ["南沙港务", "https://www.goct.com.cn/"]]
  },
  {
    code: "CNTAO",
    cn: "青岛港",
    name: "Qingdao Port",
    aliases: ["青岛", "qingdao", "cntao"],
    weatherTerms: ["青岛", "山东半岛", "黄海", "山东沿海"],
    notices: [["山东港口青岛港", "https://www.qingdao-port.com/"]]
  },
  {
    code: "CNTSN",
    cn: "天津港",
    name: "Tianjin Port",
    aliases: ["天津", "tianjin", "cntsn", "新港"],
    weatherTerms: ["天津", "渤海", "渤海湾", "华北沿海"],
    notices: [["天津港集团", "https://www.tjgportnet.com/"]]
  },
  {
    code: "CNDLC",
    cn: "大连港",
    name: "Dalian Port",
    aliases: ["大连", "dalian", "cndlc"],
    weatherTerms: ["大连", "辽宁", "辽东半岛", "渤海", "黄海北部"],
    notices: [["辽港集团", "https://www.liaoganggf.cn/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNYIK",
    cn: "营口/鲅鱼圈港",
    name: "Yingkou / Bayuquan Port",
    aliases: ["营口", "鲅鱼圈", "yingkou", "bayuquan", "cnyik"],
    weatherTerms: ["营口", "鲅鱼圈", "辽宁", "辽东湾", "渤海"],
    notices: [["辽港集团", "https://www.liaoganggf.cn/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNHBW",
    cn: "环渤海港群",
    name: "Bohai Bay Ports",
    aliases: ["唐山", "京唐", "曹妃甸", "黄骅", "秦皇岛", "tangshan", "jingtang", "caofeidian", "huanghua", "qinhuangdao", "cntgs", "cnhua", "cnqhd"],
    weatherTerms: ["唐山", "曹妃甸", "黄骅", "秦皇岛", "河北沿海", "渤海", "渤海湾", "华北沿海"],
    notices: [["中国海事局航行警告", "https://www.msa.gov.cn/"], ["河北港口集团", "https://www.porthebei.com/"]]
  },
  {
    code: "CNLYG",
    cn: "连云港",
    name: "Lianyungang Port",
    aliases: ["连云港", "lianyungang", "cnlyg"],
    weatherTerms: ["连云港", "江苏沿海", "黄海", "黄海中部"],
    notices: [["连云港港", "https://www.lygport.com.cn/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNZAP",
    cn: "嘉兴/乍浦港",
    name: "Jiaxing / Zhapu Port",
    aliases: ["嘉兴", "乍浦", "jiaxing", "zhapu", "cnzap"],
    weatherTerms: ["嘉兴", "乍浦", "杭州湾", "浙江北部", "东海"],
    notices: [["嘉兴港区", "https://jxgq.jiaxing.gov.cn/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNWNZ",
    cn: "温州港",
    name: "Wenzhou Port",
    aliases: ["温州", "wenzhou", "cnwnz"],
    weatherTerms: ["温州", "浙南", "浙江沿海", "东海"],
    notices: [["温州港集团", "https://www.wzport.com/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNTZO",
    cn: "台州港",
    name: "Taizhou Port",
    aliases: ["台州", "taizhou", "cntzo"],
    weatherTerms: ["台州", "浙江沿海", "东海"],
    notices: [["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNFJG",
    cn: "福建沿海港群",
    name: "Fujian Coastal Ports",
    aliases: ["泉州", "莆田", "湄洲湾", "石湖", "quanzhou", "putian", "meizhou bay", "cnqzj", "cnput"],
    weatherTerms: ["泉州", "莆田", "湄洲湾", "福建沿海", "闽南", "台湾海峡"],
    notices: [["福建省港口集团", "https://www.fjpg.cn/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNPRD",
    cn: "珠江西岸/粤东港群",
    name: "Pearl River Delta Feeder Ports",
    aliases: ["珠海", "江门", "中山", "汕头", "zhuhai", "jiangmen", "zhongshan", "shantou", "cnzuh", "cnjmn", "cnzsn", "cnswa"],
    weatherTerms: ["珠江口", "广东", "华南沿海", "南海北部", "汕头", "粤东"],
    notices: [["广州港集团", "https://www.gzport.com/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNBBW",
    cn: "北部湾港群",
    name: "Beibu Gulf Ports",
    aliases: ["湛江", "钦州", "防城港", "北海", "北部湾", "zhanjiang", "qinzhou", "fangchenggang", "beihai", "cnzha", "cnqzh", "cnfan", "cnbih"],
    weatherTerms: ["湛江", "北部湾", "广西沿海", "广东西部沿海", "南海西北部"],
    notices: [["北部湾港", "https://www.bbwport.com/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "CNHIN",
    cn: "海南港群",
    name: "Hainan Ports",
    aliases: ["海口", "洋浦", "海南", "haikou", "yangpu", "cnhak", "cnypg"],
    weatherTerms: ["海南", "琼州海峡", "南海北部", "北部湾"],
    notices: [["海南港航", "https://www.hnhs.com.cn/"], ["中国海事局航行警告", "https://www.msa.gov.cn/"]]
  },
  {
    code: "SGSIN",
    cn: "新加坡港",
    name: "Singapore Port",
    aliases: ["新加坡", "singapore", "sgsin"],
    weatherTerms: ["新加坡", "马六甲", "南海", "southeast asia", "singapore"],
    notices: [["MPA Singapore", "https://www.mpa.gov.sg/"], ["PSA Singapore", "https://www.singaporepsa.com/"]]
  },
  {
    code: "THLCH",
    cn: "林查班港",
    name: "Laem Chabang Port",
    aliases: ["林查班", "莱姆查邦", "laem chabang", "thlch", "泰国"],
    weatherTerms: ["泰国", "林查班", "泰国湾", "laem chabang", "gulf of thailand"],
    notices: [["Laem Chabang Port", "https://lcp.port.co.th/cs/internet/lcp/Information.html"], ["Port Authority of Thailand", "https://www.port.co.th/"]]
  },
  {
    code: "VNSGN",
    cn: "胡志明/吉莱港",
    name: "Ho Chi Minh / Cat Lai",
    aliases: ["胡志明", "吉莱", "cat lai", "ho chi minh", "vnsgn"],
    weatherTerms: ["越南", "胡志明", "南海", "mekong", "vietnam"],
    notices: [["Saigon Newport", "https://saigonnewport.com.vn/"], ["Vietnam Customs", "https://www.customs.gov.vn/"]]
  },
  {
    code: "MYPKG",
    cn: "巴生港",
    name: "Port Klang",
    aliases: ["巴生", "port klang", "klang", "mypkg"],
    weatherTerms: ["马来西亚", "巴生", "马六甲", "malaysia", "klang"],
    notices: [["Port Klang Authority", "https://www.pka.gov.my/"]]
  },
  {
    code: "KRPUS",
    cn: "釜山港",
    name: "Busan Port",
    aliases: ["釜山", "busan", "krpus"],
    weatherTerms: ["韩国", "釜山", "朝鲜海峡", "黄海", "东海"],
    notices: [["Busan Port Authority", "https://www.busanpa.com/"]]
  },
  {
    code: "JPTYO",
    cn: "东京港",
    name: "Tokyo Port",
    aliases: ["东京", "tokyo", "jptyo"],
    weatherTerms: ["日本", "东京湾", "关东", "japan", "tokyo"],
    notices: [["Port of Tokyo", "https://www.kouwan.metro.tokyo.lg.jp/"]]
  },
  {
    code: "TWKHH",
    cn: "高雄港",
    name: "Kaohsiung Port",
    aliases: ["高雄", "kaohsiung", "twkhh", "台湾"],
    weatherTerms: ["台湾", "高雄", "台湾海峡", "巴士海峡"],
    notices: [["Taiwan International Ports", "https://www.twport.com.tw/"]]
  },
  {
    code: "USLAX",
    cn: "洛杉矶/长滩港",
    name: "Los Angeles / Long Beach",
    aliases: ["洛杉矶", "长滩", "los angeles", "long beach", "uslax", "uslgb"],
    weatherTerms: ["los angeles", "long beach", "southern california", "pacific coast"],
    notices: [["Port of Los Angeles", "https://www.portoflosangeles.org/"], ["Port of Long Beach", "https://polb.com/"]]
  },
  {
    code: "NLRTM",
    cn: "鹿特丹港",
    name: "Rotterdam Port",
    aliases: ["鹿特丹", "rotterdam", "nlrtm"],
    weatherTerms: ["rotterdam", "north sea", "netherlands", "鹿特丹", "北海"],
    notices: [["Port of Rotterdam", "https://www.portofrotterdam.com/"]]
  }
];

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=600"
    },
    body: JSON.stringify(body)
  };
}

function normalize(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clean(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

function decodeHtml(value = "") {
  return String(value || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function stripHtml(value = "") {
  return decodeHtml(String(value || ""))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termPattern(term = "") {
  const raw = String(term || "");
  const escaped = escapeRegExp(raw);
  return /^[a-z0-9\s-]+$/i.test(raw)
    ? new RegExp(`\\b${escaped}\\b`, "i")
    : new RegExp(escaped, "i");
}

function termMatches(text = "", term = "") {
  return termPattern(term).test(String(text || ""));
}

function termPositions(text = "", term = "", limit = 4) {
  const source = String(text || "");
  const raw = String(term || "");
  if (!raw) return [];
  const positions = [];
  const pattern = /^[a-z0-9\s-]+$/i.test(raw)
    ? new RegExp(`\\b${escapeRegExp(raw)}\\b`, "gi")
    : new RegExp(escapeRegExp(raw), "gi");
  let match = pattern.exec(source);
  while (match && positions.length < limit) {
    positions.push(match.index);
    if (pattern.lastIndex === match.index) pattern.lastIndex += raw.length || 1;
    match = pattern.exec(source);
  }
  return positions;
}

function findPortProfile(query = "", code = "") {
  const hay = normalize(`${query} ${code}`);
  if (!hay) return null;
  const detailedProfile = portProfiles.find((profile) => {
      const needles = [profile.code, profile.cn, profile.name, ...(profile.aliases || [])].map(normalize);
      return needles.some((needle) => needle && (hay.includes(needle) || needle.includes(hay)));
    }) || null;
  if (detailedProfile) return detailedProfile;
  const coordinate = findPortCoordinate(`${query} ${code}`);
  if (!coordinate) return null;
  const chinaTerms = coordinate.country === "China"
    ? coordinate.lat >= 37
      ? ["中国沿海", "渤海", "黄海", "华北沿海"]
      : coordinate.lat >= 27
        ? ["中国沿海", "东海", "华东沿海"]
        : ["中国沿海", "南海北部", "华南沿海", "台湾海峡"]
    : [];
  return {
    code: coordinate.code,
    cn: /[\u3400-\u9fff]/.test(query) ? clean(query) : coordinate.name,
    name: coordinate.name,
    aliases: coordinate.aliases || [],
    weatherTerms: [...(coordinate.aliases || []).slice(0, 5), coordinate.name, coordinate.country, ...chinaTerms],
    notices: coordinate.country === "China"
      ? [...(coordinate.official ? [coordinate.official] : []), ["中国海事局航行警告", "https://www.msa.gov.cn/"], ["中央气象台", "https://www.nmc.cn/"]]
      : []
  };
}

async function fetchText(url, timeoutMs = 7000) {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller ? controller.signal : undefined,
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "LogisMaster-weather-risk/1.0 (+https://logismaster.cn)"
      }
    });
    const raw = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      text: stripHtml(raw).slice(0, 180000)
    };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function snippetAround(text = "", terms = []) {
  const source = String(text || "");
  const lowered = source.toLowerCase();
  const hitTerm = terms.find((term) => term && lowered.includes(String(term).toLowerCase()));
  if (!hitTerm) return "";
  const index = lowered.indexOf(String(hitTerm).toLowerCase());
  const start = Math.max(0, index - 90);
  const end = Math.min(source.length, index + 210);
  return source.slice(start, end).replace(/\s+/g, " ").trim();
}

function focusWeatherText(text = "") {
  const source = String(text || "");
  const printIndex = source.indexOf("打印");
  if (printIndex >= 0 && printIndex < source.length - 80) {
    return source.slice(printIndex, printIndex + 40000);
  }
  const publishIndex = source.search(/中央气象台.{0,80}发布|预计|受.{0,12}影响|warning|advisory|bulletin/i);
  if (publishIndex >= 0) {
    return source.slice(Math.max(0, publishIndex - 400), publishIndex + 40000);
  }
  return source;
}

function detectHazards(text = "") {
  return weatherHazards
    .filter((hazard) => hazard.terms.some((term) => termMatches(text, term)))
    .map((hazard) => ({
      id: hazard.id,
      label: hazard.label,
      action: hazard.action,
      hits: hazard.terms.filter((term) => termMatches(text, term)).slice(0, 4)
    }));
}

function uniqueHazards(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function detectControlHazards(text = "") {
  return controlHazards
    .filter((hazard) => hazard.terms.some((term) => termMatches(text, term)))
    .map((hazard) => ({
      id: hazard.id,
      label: hazard.label,
      action: hazard.action,
      hits: hazard.terms.filter((term) => termMatches(text, term)).slice(0, 4)
    }));
}

function compactUnique(items = []) {
  return [...new Set(items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean))];
}

function profileText(profile = {}) {
  return normalize([
    profile.code,
    profile.cn,
    profile.name,
    ...(profile.aliases || []),
    ...(profile.weatherTerms || [])
  ].filter(Boolean).join(" "));
}

function profileMatches(profile = {}, patterns = []) {
  const text = profileText(profile);
  return patterns.some((pattern) => pattern.test(text));
}

function buildRouteProfile(originProfile = {}, destinationProfile = {}) {
  const terms = [];
  const areas = [];
  const addArea = (label, areaTerms = []) => {
    areas.push(label);
    terms.push(label, ...areaTerms);
  };
  terms.push(
    ...(originProfile.weatherTerms || []),
    ...(destinationProfile.weatherTerms || []),
    originProfile.cn,
    originProfile.name,
    destinationProfile.cn,
    destinationProfile.name
  );

  const chinaPortPattern = /中国|上海|宁波|舟山|嘉兴|乍浦|温州|台州|太仓|苏州港|厦门|福州|泉州|莆田|湄洲湾|深圳|盐田|蛇口|广州|南沙|珠海|江门|中山|汕头|湛江|钦州|防城港|北海|海口|洋浦|大连|营口|鲅鱼圈|唐山|京唐|曹妃甸|黄骅|秦皇岛|青岛|天津|连云港|cnsha|cnngb|cnzos|cnzap|cnwnz|cntzo|cntxg|cnxmn|cnfoc|cnqzj|cnput|cnytn|cnszx|cngzg|cnzuh|cnjmn|cnzsn|cnswa|cnzha|cnqzh|cnfan|cnbih|cnhak|cnypg|cndlc|cnyik|cntgs|cnhua|cnqhd|cntao|cntsn|cnlyg|cnfjg|cnprd|cnbbw|cnhin/;
  const originChina = profileMatches(originProfile, [chinaPortPattern]);
  const destChina = profileMatches(destinationProfile, [chinaPortPattern]);
  const eastChinaOrigin = profileMatches(originProfile, [/上海|宁波|舟山|嘉兴|乍浦|温州|台州|太仓|苏州港|东海|浙江|杭州湾|cnsha|cnngb|cnzos|cnzap|cnwnz|cntzo|cntxg/]);
  const fujianOrigin = profileMatches(originProfile, [/厦门|福州|泉州|莆田|湄洲湾|福建|台湾海峡|cnxmn|cnfoc|cnqzj|cnput|cnfjg/]);
  const southChinaOrigin = profileMatches(originProfile, [/深圳|盐田|蛇口|广州|南沙|珠海|江门|中山|汕头|湛江|钦州|防城港|北海|海口|洋浦|珠江口|广东|广西|海南|北部湾|南海|cnytn|cnszx|cngzg|cnzuh|cnjmn|cnzsn|cnswa|cnzha|cnqzh|cnfan|cnbih|cnhak|cnypg|cnprd|cnbbw|cnhin/]);
  const northChinaOrigin = profileMatches(originProfile, [/大连|营口|鲅鱼圈|唐山|京唐|曹妃甸|黄骅|秦皇岛|青岛|天津|连云港|渤海|黄海|山东|辽宁|河北|江苏沿海|cndlc|cnyik|cntgs|cnhua|cnqhd|cntao|cntsn|cnlyg|cnhbw/]);
  const southeastAsia = profileMatches(destinationProfile, [/新加坡|林查班|泰国|越南|巴生|马来西亚|胡志明|sgsin|thlch|vnsgn|mypkg|southeast|malacca|gulf of thailand/]);
  const usWest = profileMatches(destinationProfile, [/洛杉矶|长滩|los angeles|long beach|uslax|uslgb|california|pacific coast/]);
  const europe = profileMatches(destinationProfile, [/鹿特丹|rotterdam|nlrtm|europe|north sea|地中海|北海/]);

  if (originChina && destChina) {
    addArea("中国沿海", ["中国沿海", "华东沿海", "华南沿海", "渤海", "黄海", "东海", "台湾海峡", "南海北部"]);
  }
  if ((originChina || eastChinaOrigin || fujianOrigin || southChinaOrigin || northChinaOrigin) && southeastAsia) {
    addArea("东亚-东南亚常规水道", ["东海", "台湾海峡", "巴士海峡", "南海", "南海北部", "越南", "泰国湾", "马六甲", "新加坡", "gulf of thailand", "malacca", "south china sea"]);
  }
  if ((originChina || eastChinaOrigin || fujianOrigin || southChinaOrigin || northChinaOrigin) && usWest) {
    addArea("西北太平洋-美西航线", ["东海", "黄海", "日本南部", "琉球", "西北太平洋", "太平洋", "北太平洋", "southern california", "pacific coast", "north pacific"]);
  }
  if ((originChina || eastChinaOrigin || fujianOrigin || southChinaOrigin || northChinaOrigin) && europe) {
    addArea("远东-欧洲航线", ["东海", "台湾海峡", "南海", "马六甲", "印度洋", "亚丁湾", "红海", "苏伊士", "地中海", "北海", "malacca", "indian ocean", "red sea", "suez", "mediterranean", "north sea"]);
  }
  if (eastChinaOrigin) addArea("华东近海", ["长江口", "浙江沿海", "杭州湾", "东海"]);
  if (fujianOrigin) addArea("福建/台湾海峡近海", ["福建沿海", "闽南", "台湾海峡", "东海", "南海北部"]);
  if (southChinaOrigin) addArea("华南近海", ["珠江口", "广东沿海", "华南沿海", "南海北部", "南海"]);
  if (northChinaOrigin) addArea("华北/山东近海", ["渤海", "渤海湾", "黄海", "山东半岛", "山东沿海"]);

  const label = areas.length
    ? areas.slice(0, 3).join(" / ")
    : `${originProfile.cn || originProfile.name || "出发港"} - ${destinationProfile.cn || destinationProfile.name || "目的港"} 周边海区`;
  return {
    label,
    areas: compactUnique(areas),
    terms: compactUnique(terms)
  };
}

function routeAreaHit(context = "", routeProfile = {}) {
  const matched = (routeProfile.terms || []).filter((term) => termMatches(context, term)).slice(0, 6);
  return {
    matched,
    area: matched.length ? matched.join(" / ") : ""
  };
}

function routeImpactForText(sourceText = "", routeProfile = {}, detector = detectHazards, impactTerms = allWeatherTerms) {
  if (!sourceText || !routeProfile?.terms?.length) {
    return { level: 0, routeRelevant: false, hits: [], hazards: [], snippet: "", routeArea: "" };
  }
  const contexts = [];
  impactTerms.forEach((term) => {
    termPositions(sourceText, term, 3).forEach((index) => {
      if (contexts.length >= 16) return;
      const start = Math.max(0, index - 160);
      const end = Math.min(sourceText.length, index + 360);
      contexts.push(sourceText.slice(start, end));
    });
  });
  const activePattern = /发布|继续发布|预计|影响|受.{0,14}影响|签发|中心附近|将以|警告|管制|禁航|实弹|演习|warning|advisory|bulletin|expected|affect|exercise|restricted|closure|suspension/i;
  const activeContexts = contexts.filter((context) => activePattern.test(context));
  const directContext = activeContexts.find((context) => routeAreaHit(context, routeProfile).matched.length);
  const targetContext = directContext || activeContexts[0] || "";
  const hazards = detector(targetContext);
  const routeHit = routeAreaHit(targetContext, routeProfile);
  const eventHits = hazards.flatMap((hazard) => hazard.hits);
  const routeRelevant = Boolean(directContext && hazards.length);
  return {
    level: routeRelevant ? 2 : hazards.length ? 1 : 0,
    routeRelevant,
    hazards,
    hits: compactUnique([...eventHits.slice(0, 5), ...routeHit.matched.slice(0, 5)]),
    snippet: (targetContext || snippetAround(sourceText, impactTerms)).replace(/\s+/g, " ").trim(),
    routeArea: routeHit.area || routeProfile.label
  };
}

function sourceImpactForProfile(sourceText = "", profile = null) {
  if (!profile || !sourceText) {
    return { level: 0, hits: [], hazards: [], snippet: "" };
  }
  const areaTerms = profile.weatherTerms || [];
  const contexts = [];
  allWeatherTerms.forEach((term) => {
    termPositions(sourceText, term, 3).forEach((index) => {
      if (contexts.length >= 12) return;
      const start = Math.max(0, index - 120);
      const end = Math.min(sourceText.length, index + 300);
      contexts.push(sourceText.slice(start, end));
    });
  });
  const activePattern = /发布|继续发布|预计|影响|受.{0,12}影响|签发|中心附近|将以|warning|advisory|bulletin|expected|affect/i;
  const activeContexts = contexts.filter((context) => activePattern.test(context));
  const directContext = activeContexts.find((context) => areaTerms.some((term) => termMatches(context, term)));
  const hazardSourceText = directContext || activeContexts[0] || "";
  const hazards = detectHazards(hazardSourceText);
  const eventHits = hazards.flatMap((hazard) => hazard.hits);
  const areaHits = areaTerms.filter((term) => directContext && termMatches(directContext, term));
  const level = directContext && hazards.length ? 2 : hazards.length ? 1 : 0;
  return {
    level,
    hazards,
    hits: [...new Set([...eventHits.slice(0, 4), ...areaHits.slice(0, 4)])],
    snippet: (hazardSourceText || snippetAround(sourceText, ["中央气象台", "预警", "天气", "海区", "warning", "weather"])).replace(/\s+/g, " ").trim()
  };
}

function noticeImpactForText(text = "", profile = null) {
  const lower = normalize(text);
  const noticeTerms = [
    "台风",
    "typhoon",
    "大风",
    "阵风",
    "暴雨",
    "强风",
    "大雾",
    "海雾",
    "能见度",
    "低能见度",
    "雷暴",
    "雷电",
    "强对流",
    "冰雹",
    "暴雪",
    "降雪",
    "冻雨",
    "冰冻",
    "寒潮",
    "高温",
    "低温",
    "沙尘",
    "沙尘暴",
    "霾",
    "洪水",
    "积水",
    "内涝",
    "风暴潮",
    "巨浪",
    "涌浪",
    "浪高",
    "停航",
    "封港",
    "暂停作业",
    "停止作业",
    "恢复作业",
    "暂停装卸",
    "停止装卸",
    "暂停靠泊",
    "暂停引航",
    "引航暂停",
    "闸口关闭",
    "受天气影响",
    "storm",
    "gale",
    "fog",
    "low visibility",
    "thunderstorm",
    "lightning",
    "snow",
    "freezing",
    "ice",
    "heatwave",
    "dust storm",
    "sandstorm",
    "haze",
    "flood",
    "storm surge",
    "swell",
    "rough sea",
    "weather warning",
    "weather disruption",
    "closed due to weather",
    "suspended due to weather",
    "terminal suspended",
    "gate closure",
    "port closed",
    "pilotage suspended",
    "towage suspended",
    "berth suspended",
    "crane operations suspended",
    ...allControlTerms
  ];
  const portTerms = [profile?.cn, profile?.name, ...(profile?.aliases || []), ...(profile?.weatherTerms || [])].filter(Boolean);
  const eventHits = noticeTerms.filter((term) => termMatches(text, term));
  const portHits = portTerms.filter((term) => lower.includes(normalize(term))).slice(0, 4);
  const hazards = uniqueHazards([...detectHazards(text), ...detectControlHazards(text)]);
  const matched = eventHits.length > 0 && portHits.length > 0;
  return {
    matched,
    hazards,
    hits: [...new Set([...eventHits.slice(0, 4), ...portHits])],
    snippet: matched ? snippetAround(text, [...eventHits, ...portHits]) : ""
  };
}

async function scanWeatherSources(routeProfile = {}) {
  const results = await Promise.allSettled(
    weatherSources.map(async (source) => {
      const response = await fetchText(source.url, source.id === "jtwc" ? 8500 : 7000);
      const focusedText = focusWeatherText(response.text);
      const impact = routeImpactForText(focusedText, routeProfile, detectHazards, allWeatherTerms);
      const maritimeTrafficHit = source.type !== "official-traffic" || /港口|港区|码头|海区|沿海|航道|海峡|水域|航运|船舶|停航|封航/.test(impact.snippet || "");
      return {
        ...source,
        ok: response.ok,
        status: response.status,
        impactLevel: maritimeTrafficHit ? impact.level : 0,
        routeRelevant: Boolean(impact.routeRelevant && maritimeTrafficHit),
        routeArea: impact.routeArea,
        hazards: impact.hazards,
        hits: impact.hits,
        snippet: impact.snippet
      };
    })
  );
  return results
    .map((result, index) => {
      if (result.status === "fulfilled") return result.value;
      return {
        ...weatherSources[index],
        ok: false,
        status: "fetch-failed",
        impactLevel: 0,
        routeRelevant: false,
        hazards: [],
        hits: [],
        snippet: ""
      };
    })
    .filter((item) => item.routeRelevant && Number(item.impactLevel || 0) >= 2);
}

async function scanControlSources(routeProfile = {}) {
  const results = await Promise.allSettled(
    controlSources.map(async (source) => {
      const response = await fetchText(source.url, 7500);
      const focusedText = focusWeatherText(response.text);
      const impact = routeImpactForText(focusedText, routeProfile, detectControlHazards, allControlTerms);
      return {
        ...source,
        ok: response.ok,
        status: response.status,
        eventType: "control",
        impact: impact.routeRelevant ? "matched" : "unmatched",
        impactLevel: impact.level,
        routeRelevant: impact.routeRelevant,
        routeArea: impact.routeArea,
        hazards: impact.hazards,
        hits: impact.hits,
        snippet: impact.snippet
      };
    })
  );
  return results
    .map((result, index) => {
      if (result.status === "fulfilled") return result.value;
      return {
        ...controlSources[index],
        ok: false,
        status: "fetch-failed",
        eventType: "control",
        impact: "unmatched",
        impactLevel: 0,
        routeRelevant: false,
        hazards: [],
        hits: [],
        snippet: ""
      };
    })
    .filter((item) => item.routeRelevant && Number(item.impactLevel || 0) >= 2);
}

async function scanPortNotices(profile) {
  if (!profile) return [];
  const links = (profile.notices || []).slice(0, 3);
  const results = await Promise.allSettled(
    links.map(async ([name, url]) => {
      const response = await fetchText(url, 6500);
      const impact = noticeImpactForText(response.text, profile);
      return {
        port: profile.cn || profile.name,
        name,
        url,
        ok: response.ok,
        status: response.status,
        impact: impact.matched ? "matched" : "manual-check",
        hazards: impact.hazards,
        hits: impact.hits,
        snippet: impact.snippet
      };
    })
  );
  return results
    .map((result, index) => {
      if (result.status === "fulfilled") return result.value;
      const [name, url] = links[index];
      return {
        port: profile.cn || profile.name,
        name,
        url,
        ok: false,
        status: "unverified",
        impact: "manual-check",
        hazards: [],
        hits: [],
        snippet: ""
      };
    })
    .filter((item) => item.impact === "matched");
}

function conclusionHazards(weatherItems = [], noticeItems = [], controlItems = []) {
  return uniqueHazards([
    ...weatherItems.filter((item) => Number(item.impactLevel || 0) >= 2).flatMap((item) => item.hazards || []),
    ...controlItems.filter((item) => Number(item.impactLevel || 0) >= 2).flatMap((item) => item.hazards || []),
    ...noticeItems.filter((item) => item.impact === "matched").flatMap((item) => item.hazards || [])
  ]);
}

function buildRiskConclusion(weatherItems = [], noticeItems = [], controlItems = [], originProfile = null, destinationProfile = null, routeProfile = {}) {
  const directWeather = weatherItems.filter((item) => item.impactLevel >= 2);
  const controlHits = controlItems.filter((item) => item.impactLevel >= 2);
  const noticeHits = noticeItems.filter((item) => item.impact === "matched");
  const score = directWeather.length * 35 + controlHits.length * 35 + noticeHits.length * 30;
  const route = `${originProfile?.cn || "出发港"} → ${destinationProfile?.cn || "目的港"}`;
  const hazards = conclusionHazards(weatherItems, noticeItems, controlItems);
  const hazardText = hazards.length ? hazards.map((item) => item.label).join("、") : "天气/海况/管制异常";
  const hazardActions = hazards.map((item) => item.action).slice(0, 3);
  const routeAreaText = routeProfile?.areas?.length ? routeProfile.areas.slice(0, 3).join("、") : routeProfile?.label || "常规航线";
  if (score >= 60) {
    return {
      riskLevel: "high",
      label: "航线影响偏高",
      hazards,
      summary: `${route}：官方来源出现与${routeAreaText}相关的${hazardText}信号，预计可能造成靠泊、开航、绕航、等待或集疏运窗口不确定。`,
      actions: [
        "不要只按历史平均船期承诺客户，先复核船司 ETD/ETA、靠泊计划和码头闸口状态。",
        ...hazardActions,
        "危险品、冷箱、OOG 先确认是否调整进港窗口；必要时预留改配或顺延方案。",
        "把中央气象台、目的港/起运港码头公告截图和查询时间保存到订单备注。"
      ].slice(0, 5)
    };
  }
  if (score >= 25) {
    return {
      riskLevel: "elevated",
      label: "航线影响需关注",
      hazards,
      summary: `${route}：抓到与${routeAreaText}相关的${hazardText}信号，但未确认形成封港或停工结论；预计影响以短时等待、靠泊波动或改配复核为主。`,
      actions: [
        "先向订舱代理或船司确认是否有跳港、截关顺延、靠泊延误、绕航或临时关闸。",
        ...hazardActions,
        "对时效敏感订单保留 1-3 天缓冲，并同步客户这是天气待核验风险。",
        "点击下方命中的官方来源做人工复核，尤其是沿海大风、海雾、强对流、台风季、航行警告或军演管制。"
      ].slice(0, 5)
    };
  }
  return {
    riskLevel: "watch",
    label: "暂未核实到直接影响",
    hazards,
    summary: `${route}：本次自动扫描未抓到位于${routeAreaText}且与常规航线相关的公开天气、海况、军演/管制或码头限作业公告；不输出额外延误结论。`,
    actions: [
      "没有官方公告命中时，不把天气或管制风险写成确定延误。",
      "临近开船前仍需复核船司 ETD/ETA、码头公告和目的港靠泊计划。",
      "对急单、冷箱、DG/OOG 仍需由承运人或码头确认接收窗口。"
    ]
  };
}

exports.handler = async (event = {}) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  const params = event.queryStringParameters || {};
  const originProfile = findPortProfile(clean(params.origin), clean(params.originCode));
  const destinationProfile = findPortProfile(clean(params.destination), clean(params.destinationCode));
  const updatedAt = new Date().toISOString();

  if (!originProfile || !destinationProfile) {
    return json(200, {
      ok: false,
      fallback: true,
      updatedAt,
      riskLevel: "unknown",
      label: "港口未完整识别",
      summary: "天气/海况扫描需要先识别出发港和目的港；未命中主流港口库时不输出天气影响结论。",
      actions: ["请换用中文正式港名、英文港名或 UN/LOCODE 后再查。"],
      weatherSources: [],
      controlEvents: [],
      portNotices: []
    });
  }

  try {
    const routeProfile = buildRouteProfile(originProfile, destinationProfile);
    const [weatherItems, controlItems, originNotices, destinationNotices] = await Promise.all([
      scanWeatherSources(routeProfile),
      scanControlSources(routeProfile),
      scanPortNotices(originProfile),
      scanPortNotices(destinationProfile)
    ]);
    const portNotices = [...originNotices, ...destinationNotices];
    const conclusion = buildRiskConclusion(weatherItems, portNotices, controlItems, originProfile, destinationProfile, routeProfile);
    return json(200, {
      ok: true,
      updatedAt,
      query: {
        origin: originProfile,
        destination: destinationProfile,
        route: routeProfile
      },
      coverage: {
        portCoordinateCount: portCoordinates.length,
        originRecognized: true,
        destinationRecognized: true
      },
      ...conclusion,
      weatherSources: weatherItems,
      controlEvents: controlItems,
      portNotices,
      sourceNote: "只列出正文命中且与常规航线区域相关的官方来源；未命中、无关区域或抓不到正文的来源不会展示。"
    });
  } catch (error) {
    return json(200, {
      ok: false,
      fallback: true,
      updatedAt,
      riskLevel: "watch",
      label: "实时扫描未完成",
      summary: "天气/海况/管制/码头公告接口响应较慢；此时不能把影响说成确定结论，也不展示未命中的来源。",
      actions: ["待接口恢复后刷新风险中心。", "急单先向船司/货代确认 ETD/ETA、靠泊计划和是否有航行警告影响。"],
      message: error.message || "weather risk scan failed",
      weatherSources: [],
      controlEvents: [],
      portNotices: []
    });
  }
};
