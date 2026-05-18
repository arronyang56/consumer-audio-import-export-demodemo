const defaultCases = [
  {
    code: "8517629400",
    name: "无线耳机 / 蓝牙耳机",
    keywords: "无线耳机,蓝牙耳机,earbuds,headset,bluetooth,wireless,anc,tws",
    regulation: "演示数据：关注无线电型号核准、3C 边界、锂电池运输文件。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "需确认是否含锂电池、蓝牙功能、是否成套零售包装。"
  },
  {
    code: "8518300000",
    name: "有线耳机、头戴式耳机",
    keywords: "有线耳机,wired headphone,headphone,headset,入耳式,头戴式",
    regulation: "演示数据：通常重点核验用途、连接方式、品牌型号和申报要素。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "需区分无线功能、是否含麦克风、是否带独立控制模块。"
  },
  {
    code: "8518220000",
    name: "多喇叭音箱、Soundbar",
    keywords: "soundbar,音箱,speaker,loudspeaker,家庭影院,低音炮,bar speaker",
    regulation: "演示数据：关注音视频设备认证、额定功率、无线功能和电源适配器。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "需确认箱体、喇叭数量、是否带功放、是否含电池或无线模块。"
  },
  {
    code: "8519813100",
    name: "激光唱机 / CD Player",
    keywords: "cd player,激光唱机,播放机,audio player,disc player",
    regulation: "演示数据：关注播放功能、介质类型、是否带录音/无线/网络功能。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "需确认是否为独立播放设备或整机配件。"
  },
  {
    code: "8543709990",
    name: "其他具有独立功能的电气设备",
    keywords: "遥控器,remote controller,module,adapter,控制器,独立功能,accessory",
    regulation: "演示数据：根据用途、无线功能、电气参数和是否专用零件进一步核验。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "维修件或附件需判断是否应作为专用零件归类。"
  },
  {
    code: "8507600090",
    name: "锂离子蓄电池及电池组",
    keywords: "锂电池,电池组,battery,li-ion,power bank,充电盒,charging case",
    regulation: "演示数据：可能涉及 3C、UN38.3、MSDS、危险品运输限制。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "需确认容量 Wh、包装方式、是否单独销售、运输方式。"
  }
];

const users = [
  { name: "关务管理员", role: "维护 HS 样例、异常记录和复核结论；正式申报前需要人工确认。" },
  { name: "采购/业务查询", role: "查询候选税号、DG 风险、港口风险和公开政策入口；高风险事项提交关务复核。" },
  { name: "物流/计划", role: "关注船期、舱单、里程碑、港口风险和文件准备状态。" },
  { name: "只读访客", role: "仅查看脱敏演示流程，不上传公司敏感资料。" }
];

const moduleItems = [
  ["总览", "一眼看到待复核事项、电池风险、异常记录、政策和港口风险。", "已上线"],
  ["税号/申报要素", "输入产品名称、用途、材质和关键参数，给出候选税号、风险提醒和申报资料清单。", "已上线"],
  ["政策变化", "集中放海关、认证、归类、目的国政策入口，并抓取公开新闻和政策解读。", "已上线"],
  ["全球趋势", "搜索过去一周经济、政治、金融、贸易、物流新闻，并给中文摘要。", "已上线"],
  ["船期和船舶位置", "输入船名和目的港，查询船舶大致位置、下一港、ETA，并保存预警规则。", "已上线"],
  ["通关状态入口", "给同事提单、箱号、上海港放行、单一窗口等查询入口和字段提醒。", "测试版"],
  ["出货节点", "后续可做订舱、开船、到港、报关、放行节点看板。", "后续"],
  ["电池/危险品", "判断锂电池、MSDS、UN38.3、包装方式和运输方式的风险。", "已上线"],
  ["港口风险", "输入港口，查看公开新闻风险、官方入口和人工确认清单。", "已上线"],
  ["异常记录", "记录税号不确定、缺文件、政策待确认、船期异常等问题。", "已上线"],
  ["进口国要求查询", "输入产品大致信息和进口国，提示认证、标签、电池、无线和清关资料。", "测试版"],
  ["未来接口", "后续再接公司内部系统、报关行、船司、权限登录和数据库。", "后续"]
];

const portSuggestions = [
  { name: "Shanghai Port", aliases: ["shanghai", "上海", "cnsgh", "cnshg", "洋山", "外高桥"], region: "China" },
  { name: "Ningbo Zhoushan Port", aliases: ["ningbo", "舟山", "宁波", "cnngb"], region: "China" },
  { name: "Yantian Port", aliases: ["yantian", "盐田", "shenzhen", "蛇口", "cnytn"], region: "China" },
  { name: "Qingdao Port", aliases: ["qingdao", "青岛", "cnqdg"], region: "China" },
  { name: "Xiamen Port", aliases: ["xiamen", "厦门", "cnxmn"], region: "China" },
  { name: "Hong Kong Port", aliases: ["hong kong", "香港", "hkhkg"], region: "Hong Kong" },
  { name: "Singapore Port", aliases: ["singapore", "新加坡", "sgsin"], region: "Singapore" },
  { name: "Port Klang", aliases: ["port klang", "巴生", "mypkg"], region: "Malaysia" },
  { name: "Rotterdam Port", aliases: ["rotterdam", "鹿特丹", "nlrtm"], region: "Netherlands" },
  { name: "Hamburg Port", aliases: ["hamburg", "汉堡", "deham"], region: "Germany" },
  { name: "Los Angeles / Long Beach", aliases: ["los angeles", "long beach", "洛杉矶", "uslax", "uslgb"], region: "United States" },
  { name: "Felixstowe Port", aliases: ["felixstowe", "费利克斯托", "gbfxs"], region: "United Kingdom" }
];

const officialSources = [
  ["中国国际贸易单一窗口", "https://www.singlewindow.cn/", "通关业务、监管证件、申报相关服务入口。"],
  ["海关总署门户", "http://www.customs.gov.cn/", "海关公告、政策法规、归类决定和行政裁定。"],
  ["海关总署归类决定和行政裁定", "https://app.gjzwfw.gov.cn/jmopen/webapp/html5/gljdcdPC/index.html", "按商品名称、决定税号、规格型号查询归类参考。"],
  ["互联网+海关", "http://online.customs.gov.cn/", "税率查询、商品编码相关政务服务入口。"],
  ["商品归类管理规定", "https://www.gov.cn/zhengce/2021-09/06/content_5723370.htm", "归类依据、行政裁定和申报责任边界。"],
  ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/", "3C 目录、认证实施规则和公告核验。"]
];

const customsLinks = [
  ["中国国际贸易单一窗口", "https://www.singlewindow.cn/", "正式通关业务、舱单、监管证件等入口，实际查询通常需要账号和权限。"],
  ["互联网+海关 | 我要查", "http://online.customs.gov.cn/", "海关政务查询入口，可用于税率、商品编码、办事指南等核验。"],
  ["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index", "上海港箱号/提单号公开查询，可核对海关放行、码头放行、理货、换单、授权、放箱和查验指令。"],
  ["海关总署门户", "http://www.customs.gov.cn/", "政策法规、公告、归类决定和行政裁定的权威来源。"],
  ["船舶 AIS / 船期 API 预留", "#integration", "船讯网等 API 不应把 Key 放在网页前端，正式接入需要后端代理。"]
];

const policyItems = [
  ["每日", "海关公告与归类决定", "关注 Consumer Audio 相关税则税率、监管条件、归类口径变化，先看官方入口和公开新闻命中。"],
  ["每周", "3C / 无线 / 电池认证边界", "耳机、音箱、电源适配器、无线产品和锂电池资料需要按产品逐票复核。"],
  ["每票", "目的国要求", "出口场景同步检查目的国标签、认证、电池运输、进口准入和客户特殊文件要求。"]
];

const declarationSets = [
  ["耳机 / Headphone", ["品名及用途", "佩戴方式", "是否无线/蓝牙", "是否含电池", "品牌/型号", "是否带麦克风"]],
  ["音箱 / Soundbar", ["喇叭数量", "是否有箱体", "额定功率", "连接方式", "是否带电源适配器", "是否含电池"]],
  ["CD Player", ["播放介质", "是否录音", "是否网络/无线", "电源方式", "品牌/型号", "随附配件"]],
  ["维修件 / Spare Part", ["对应整机", "是否专用零件", "材质", "功能", "是否独立销售", "维修用途说明"]],
  ["电池 / Battery", ["电池类型", "额定容量/Wh", "包装方式", "UN38.3", "MSDS", "运输方式限制"]],
  ["无线设备", ["无线制式", "频段", "是否独立通信", "型号核准", "3C 边界", "说明书/规格书"]]
];

const docItems = [
  ["商业发票", "Commercial Invoice", "品名、HS、数量、价格、币种、原产地、贸易方式"],
  ["装箱单", "Packing List", "箱数、毛净重、尺寸、SKU/型号、包装方式"],
  ["提单/运单", "B/L or AWB", "船名航次、提单号、POL/POD、收发货人"],
  ["产品规格书", "Specification", "用途、材质、功能、参数、图片、品牌型号"],
  ["申报要素表", "Declaration Elements", "按候选 HS 准备要素，关务复核后定稿"],
  ["DG 文件", "MSDS / UN38.3", "含锂电池产品优先核验，空运尤其敏感"],
  ["认证资料", "3C / SRRC / Others", "根据产品和目的国判断是否需要"],
  ["归类说明", "Classification Memo", "记录候选税号、依据、风险和复核人"]
];

const opsItems = [
  ["Vessel & Schedule", "船名、目的港、POL/POD、ETD/ETA、Carrier，可先手工输入；船讯网 API 已走后端代理。", ["船名查询", "API 预留"]],
  ["Customs / Manifest", "提运单号、箱号、关区代码、舱单状态，当前先给官方入口和字段提醒。", ["入口导航", "权限待定"]],
  ["Shipment Milestone", "订舱、截关、开船、到港、申报、放行、送仓，后续可做每票看板。", ["样例看板", "可导出"]],
  ["Port & Logistics Risk", "港口拥堵、查验、天气、DG 限制、目的港规则，先手工维护重点提醒。", ["手工维护", "未来订阅"]]
];

const countryRows = [
  ["China", "3C、无线电型号核准、监管条件、申报要素", "需逐票核验"],
  ["EU", "CE、RoHS、WEEE、电池法规、标签语言", "待接规则库"],
  ["US", "FCC、TSCA、锂电池运输、原产地标识", "待接规则库"],
  ["UK", "UKCA、包装和电池要求、进口商信息", "待接规则库"],
  ["GCC", "G-Mark、无线产品许可、标签和目的港清关要求", "待接规则库"]
];

const requirementProfiles = [
  {
    market: "中国",
    aliases: ["china", "中国", "大陆", "cn", "进口中国"],
    base: ["确认商品编码、监管条件、检验检疫、关税和增值税率。", "准备品牌、型号、用途、材质、功能原理、图片和规格书。", "正式申报前由关务或报关行复核归类依据。"],
    rules: [
      ["wireless", "带蓝牙/无线功能：核验无线电型号核准、频段、发射功率和说明书。"],
      ["battery", "含锂电池：准备 MSDS、UN38.3、额定能量 Wh、包装方式和运输限制说明。"],
      ["power", "带电源适配器/插头：核验 3C、低压电器和电源规格。"],
      ["audio", "音频整机：核对是否涉及 3C 目录边界和整机/零件归类。"]
    ]
  },
  {
    market: "欧盟 EU",
    aliases: ["eu", "europe", "欧盟", "欧洲", "德国", "法国", "荷兰", "意大利", "西班牙"],
    base: ["关注 CE、RoHS、REACH、WEEE、电池法规、包装法规和当地语言标签。", "进口商信息、符合性声明 DoC、技术文件和说明书需要提前确认。"],
    rules: [
      ["wireless", "无线产品通常需关注 RED 指令、频段、测试报告和 CE DoC。"],
      ["battery", "含电池产品关注欧盟电池法规、回收标识、容量信息和运输文件。"],
      ["power", "电源适配器关注 LVD/EMC/RoHS/能效标签要求。"]
    ]
  },
  {
    market: "美国 US",
    aliases: ["us", "usa", "united states", "美国"],
    base: ["关注 FCC、原产地标识、TSCA、海关估价、反倾销/301 关税等。", "进口商通常需要产品说明、HTS、用途、材质、品牌型号和合规声明。"],
    rules: [
      ["wireless", "无线产品重点核验 FCC ID、测试报告和标签。"],
      ["battery", "含锂电池关注 DOT/IATA/IMDG 文件、UN38.3 和包装限制。"],
      ["power", "电源适配器关注 UL/ETL 客户要求和能效要求。"]
    ]
  },
  {
    market: "英国 UK",
    aliases: ["uk", "united kingdom", "英国", "英國"],
    base: ["关注 UKCA、进口商信息、包装/电池责任和英文标签。", "与欧盟类似但认证标志和责任主体需单独确认。"],
    rules: [
      ["wireless", "无线产品关注 UK Radio Equipment Regulations、测试报告和标签。"],
      ["battery", "电池产品关注回收责任、运输文件和标签。"]
    ]
  },
  {
    market: "中东 GCC",
    aliases: ["gcc", "中东", "沙特", "阿联酋", "uae", "saudi", "dubai"],
    base: ["关注 G-Mark、无线产品许可、阿语/英语标签、目的港清关资料和客户特殊要求。", "不同国家差异较大，出货前建议让当地进口商确认准入文件。"],
    rules: [
      ["wireless", "无线产品需核验当地电信许可和频段限制。"],
      ["battery", "含电池产品提前确认承运人和目的港 DG 接受规则。"]
    ]
  },
  {
    market: "日本 Japan",
    aliases: ["japan", "日本", "jp"],
    base: ["关注 PSE、TELEC、RoHS/J-Moss、日文标签和进口商责任。", "客户常会要求测试报告、说明书和标签样稿。"],
    rules: [
      ["wireless", "无线产品重点核验 TELEC/MIC 认证。"],
      ["power", "电源类产品关注 PSE 标识和测试文件。"],
      ["battery", "含锂电池仍需准备运输文件和标签。"]
    ]
  }
];

const state = {
  cases: loadCases(),
  lastResult: null,
  issues: loadIssues(),
  vesselAlerts: loadVesselAlerts()
};

const $ = (id) => document.getElementById(id);
const ACCESS_CODE = "CA2026";

function initAccessGate() {
  const gate = $("accessGate");
  const input = $("accessCodeInput");
  const error = $("accessError");
  const unlock = () => {
    if (input.value.trim() === ACCESS_CODE) {
      sessionStorage.setItem("caAccessGranted", "1");
      gate.classList.add("hidden");
      return;
    }
    error.textContent = "访问码不正确，请确认后重试。";
  };

  if (sessionStorage.getItem("caAccessGranted") === "1") {
    gate.classList.add("hidden");
  }
  $("unlockAccess").addEventListener("click", unlock);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlock();
  });
}

function loadCases() {
  const desktopCases = Array.isArray(window.COMPANY_HS_CASES) ? window.COMPANY_HS_CASES : [];
  const stored = localStorage.getItem("hsCases");
  if (!stored) return mergeCases(desktopCases, defaultCases);
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? mergeCases(parsed, desktopCases, defaultCases) : mergeCases(desktopCases, defaultCases);
  } catch {
    return mergeCases(desktopCases, defaultCases);
  }
}

function saveCases() {
  localStorage.setItem("hsCases", JSON.stringify(state.cases));
}

function loadIssues() {
  try {
    const parsed = JSON.parse(localStorage.getItem("issueLog") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveIssues() {
  localStorage.setItem("issueLog", JSON.stringify(state.issues));
}

function loadVesselAlerts() {
  try {
    const parsed = JSON.parse(localStorage.getItem("vesselAlertRules") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveVesselAlerts() {
  localStorage.setItem("vesselAlertRules", JSON.stringify(state.vesselAlerts));
}

function mergeCases(...lists) {
  const byKey = new Map();
  lists.flat().forEach((item) => {
    const key = `${item.code || ""}|${item.name || ""}`;
    if (!item.code || !item.name || byKey.has(key)) return;
    byKey.set(key, item);
  });
  return Array.from(byKey.values());
}

function normalize(text) {
  return String(text || "").trim().toLowerCase();
}

function splitKeywords(text) {
  return normalize(text)
    .split(/[,，、\s/|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFormText() {
  return normalize(
    [
      $("productName").value,
      $("englishName").value,
      $("productCategory").value,
      $("material").value,
      $("usage").value,
      $("spec").value,
      $("destination").value,
      $("modelInfo").value
    ].join(" ")
  );
}

function scoreCase(item, formText) {
  const keywords = splitKeywords(item.keywords);
  const matches = keywords.filter((keyword) => formText.includes(keyword));
  const searchableText = normalize([item.name, item.notes, item.regulation, item.code].join(" "));
  const nameHit = searchableText
    .split(/[、，,\s]+/)
    .some((part) => part.length > 1 && formText.includes(part));
  const codeHit = item.code && formText.includes(item.code);
  const score = matches.length * 18 + (nameHit ? 12 : 0) + (codeHit ? 35 : 0);
  return { ...item, score: Math.min(score, 94), matches };
}

function inferRisks(formText, best) {
  const risks = [];
  const direction = $("tradeDirection").value;

  if (/(锂|电池|battery|li-ion|charging case|power bank|充电盒|移动电源)/i.test(formText)) {
    risks.push("Battery / DG：命中电池关键词，请确认 Wh、包装方式、MSDS、UN38.3、运输方式和承运人限制。");
  }
  if (/(wifi|wi-fi|蓝牙|bluetooth|wireless|无线|通信|anc|tws)/i.test(formText)) {
    risks.push("无线功能：可能需要核验无线电型号核准、入网许可、FCC/CE 或 3C 边界。");
  }
  if (/(adapter|适配器|电源|插头|插座|低压|switch)/i.test(formText)) {
    risks.push("电源/低压：随附电源适配器、插头或低压电器时，需单独核验认证和监管条件。");
  }
  if (/(repair|spare|维修|配件|零件)/i.test(formText)) {
    risks.push("维修件：需确认是否专用于某整机、是否单独销售、是否应按零件或主机相关税号判断。");
  }
  risks.push(direction === "出口" ? "出口：同步核验目的国认证、标签、电池运输和两用物项等特殊管制。" : "进口：同步核验监管条件、检验检疫、关税/增值税率、3C 和原产地政策。");
  if (!best || best.score < 45) risks.push("匹配度偏低：建议补充规格书、图片、用途、材质、功能原理后交由关务复核。");
  return risks;
}

function recommend(event) {
  event.preventDefault();
  const formText = getFormText();
  const ranked = state.cases
    .map((item) => scoreCase(item, formText))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const best = ranked[0];
  const confidence = best ? Math.max(28, best.score) : 0;

  state.lastResult = { best, ranked, confidence, formText };
  $("emptyState").classList.add("hidden");
  $("resultState").classList.remove("hidden");
  $("reviewState").textContent = confidence >= 70 ? "优先候选" : "需要复核";
  $("confidenceValue").textContent = `${confidence}%`;
  $("bestCode").textContent = best?.code || "暂无候选";
  $("bestName").textContent = best?.name || "请导入更多脱敏测试案例。";
  $("reasonText").textContent = best?.matches?.length
    ? `命中关键词：${best.matches.join("、")}。正式申报前仍需官方/关务确认。`
    : "未命中明确关键词，当前结果仅按样例库兜底排序。";

  renderCandidates(ranked);
  renderRisks(inferRisks(formText, best));
  renderDeclarationElements(formText);
}

function renderCandidates(items) {
  $("candidateList").innerHTML = items
    .map(
      (item) => `
        <article class="candidate-card">
          <header>
            <div>
              <strong>${escapeHtml(item.code)}</strong>
              <span>${escapeHtml(item.name)}</span>
            </div>
            <span>${item.score}%</span>
          </header>
          <p>${escapeHtml(item.notes || "请结合产品资料和官方税则核验。")}</p>
        </article>
      `
    )
    .join("");
}

function renderRisks(risks = []) {
  $("riskList").innerHTML = risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join("");
}

function renderUsers() {
  $("userSelect").innerHTML = users.map((user) => `<option>${escapeHtml(user.name)}</option>`).join("");
  updateRole();
}

function updateRole() {
  const user = users.find((item) => item.name === $("userSelect").value) || users[0];
  $("roleText").textContent = user.role;
}

function renderModules() {
  $("moduleGrid").innerHTML = moduleItems
    .map(([title, text, status]) => {
      const statusClass = status === "已上线" ? "" : status === "测试版" ? "pending" : "future";
      return `
        <article class="module-card">
          <header>
            <h3>${escapeHtml(title)}</h3>
            <span class="status-dot ${statusClass}">${escapeHtml(status)}</span>
          </header>
          <p>${escapeHtml(text)}</p>
        </article>
      `;
    })
    .join("");
}

function renderSources() {
  $("sourceCount").textContent = officialSources.length;
  $("sourceList").innerHTML = officialSources
    .map(
      ([title, url, note]) => `
        <article class="source-card">
          <a href="${url}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>
          <p>${escapeHtml(note)}</p>
        </article>
      `
    )
    .join("");
}

function renderTimeline() {
  $("policyTimeline").innerHTML = policyItems
    .map(
      ([date, title, text]) => `
        <article class="timeline-item">
          <time>${escapeHtml(date)}</time>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(text)}</p>
        </article>
      `
    )
    .join("");
}

function getPolicyFilters() {
  return {
    exportCountry: $("policyExportCountry")?.value || "",
    importCountry: $("policyImportCountry")?.value || "",
    product: $("policyProduct")?.value || "",
    direction: $("policyDirection")?.value || ""
  };
}

async function loadPolicyUpdates() {
  const filters = getPolicyFilters();
  const label = [filters.exportCountry && `出口:${filters.exportCountry}`, filters.importCountry && `进口:${filters.importCountry}`, filters.product && `产品:${filters.product}`, filters.direction]
    .filter(Boolean)
    .join(" / ");
  $("policyStatus").textContent = label ? `正在查询公开政策相关新闻：${label}` : "正在查询公开政策相关新闻...";
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (String(value || "").trim()) params.set(key, value);
    });
    const url = `/.netlify/functions/policy-monitor${params.toString() ? `?${params.toString()}` : ""}`;
    const data = await fetchJsonOrFallback(url, fallbackPolicyUpdates("", filters));
    renderPolicyUpdates(data);
  } catch (error) {
    renderPolicyUpdates(fallbackPolicyUpdates(error.message, filters));
  }
}

function fallbackPolicyUpdates(message = "", filters = {}) {
  return {
    ok: false,
    fallback: true,
    source: "公开政策入口",
    updatedAt: new Date().toISOString(),
    filters,
    message,
    summary: filters.product || filters.importCountry || filters.exportCountry
      ? "当前先按你填写的国家/产品给出权威入口和人工核验清单；如果公开新闻接口暂时不可用，仍可按这些入口核验。"
      : "当前先提供权威入口和固定核验清单；如果公开新闻接口暂时不可用，仍可按下方入口人工核验。",
    items: [
      {
        title: "海关公告、归类决定和监管条件",
        category: "海关/税号",
        url: "http://www.customs.gov.cn/",
        domain: "customs.gov.cn",
        sourceType: "官方入口",
        credibility: { score: 96, label: "高：官方来源", reason: "海关官方门户，适合做最终政策核验。" },
        takeaway: "用于核对税号、监管条件、归类口径、海关公告和行政裁定。"
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
        title: "目的国认证和标签要求",
        category: "目的国要求",
        url: "https://www.wto.org/",
        domain: "wto.org",
        sourceType: "国际组织/政策背景",
        credibility: { score: 88, label: "中高：国际组织", reason: "适合作为贸易政策背景，具体产品要求仍需当地法规或进口商确认。" },
        takeaway: "出口前需要核对 CE、FCC、UKCA、RoHS、电池、标签语言等要求。"
      }
    ]
  };
}

function renderPolicyUpdates(data = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  $("policyStatus").textContent = `${data.source || "政策关注"} · ${formatEta(data.updatedAt)}${data.fallback ? " · 使用固定清单" : ""}`;
  $("policyLiveGrid").innerHTML = `
    <article class="policy-summary-card">
      <strong>怎么理解</strong>
      <p>${escapeHtml(data.summary || "关注海关、认证、归类、目的国和电池运输相关变化。")}</p>
    </article>
    ${items
      .slice(0, 6)
      .map(
        (item) => `
          <article class="policy-news-card">
            <span>${escapeHtml(item.category || item.domain || "政策")}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.takeaway || "需要时点击原始来源核验。")}</p>
            <div class="credibility-row">
              <strong>${escapeHtml(item.credibility?.label || credibilityLabel(item.domain))}</strong>
              <small>${escapeHtml(item.credibility?.reason || "公开来源，建议打开原文并与官方入口交叉核验。")}</small>
            </div>
            <a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(item.domain || "查看来源")}</a>
          </article>
        `
      )
      .join("")}
  `;
}

function credibilityLabel(domain = "") {
  const official = /gov|customs|cnca|singlewindow|europa|wto/i.test(domain);
  if (official) return "高：官方/国际组织";
  const industry = /reuters|bloomberg|spglobal|joc|loadstar|maritime|ft|wsj/i.test(domain);
  if (industry) return "中高：媒体/行业解读";
  return "中：需复核来源";
}

function renderDeclarationElements(formText = "") {
  const keyword = formText || "battery wireless audio";
  const rows = declarationSets.map(([title, items]) => {
    const active =
      (/(battery|电池|锂|charging case|充电盒)/.test(keyword) && title.includes("电池")) ||
      (/(wireless|bluetooth|蓝牙|无线)/.test(keyword) && title.includes("无线")) ||
      (/(soundbar|speaker|音箱|喇叭)/.test(keyword) && title.includes("音箱")) ||
      (/(headphone|headset|earbuds|耳机)/.test(keyword) && title.includes("耳机")) ||
      (/(repair|spare|维修|配件|零件)/.test(keyword) && title.includes("维修件"));
    return `
      <article class="check-card">
        <h3>${active ? "优先 - " : ""}${escapeHtml(title)}</h3>
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    `;
  });
  $("elementGrid").innerHTML = rows.join("");
}

function renderOps() {
  $("opsGrid").innerHTML = opsItems
    .map(
      ([title, text, tags]) => `
        <article class="ops-card">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(text)}</p>
          <div class="ops-meta">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </article>
      `
    )
    .join("");
}

function renderCustomsLinks() {
  $("customsLinkGrid").innerHTML = customsLinks
    .map(
      ([title, url, note]) => `
        <article class="customs-link-card">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(note)}</p>
          <a href="${url}" target="_blank" rel="noreferrer">打开入口</a>
        </article>
      `
    )
    .join("");
}

function loadVesselExample() {
  $("vesselName").value = "EVER GIVEN";
  $("voyageNo").value = "001W";
  $("originPort").value = "Port Klang";
  $("destinationPort").value = "Shanghai";
  $("imoMmsi").value = "353136000";
  renderShipmentResult({
    vessel: "EVER GIVEN",
    voyage: "001W",
    origin: "Port Klang",
    destination: "Shanghai",
    imo: "353136000"
  });
}

function extractMmsi(value = "") {
  const numbers = String(value).match(/\d{9}/);
  return numbers ? numbers[0] : "";
}

function extractPortCode(value = "") {
  const code = String(value).toUpperCase().match(/\b[A-Z]{5}\b/);
  return code ? code[0] : "";
}

function formatEta(value = "") {
  if (!value) return "ETA 未返回";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatPosition(position = {}) {
  const lon = position.lon;
  const lat = position.lat;
  const area = position.city || position.seaArea || "";
  if (lon !== "" && lat !== "") return `${area ? `${area} · ` : ""}${lat}, ${lon}`;
  return area || "AIS 位置未返回";
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatCoordinate(value, type) {
  const number = toNumber(value);
  if (number === null) return "";
  const direction = type === "lat" ? (number >= 0 ? "北纬" : "南纬") : number >= 0 ? "东经" : "西经";
  return `${direction}${Math.abs(number).toFixed(3)}°`;
}

function describeSeaArea(lat, lon) {
  const latNum = toNumber(lat);
  const lonNum = toNumber(lon);
  if (latNum === null || lonNum === null) return "当前位置未返回坐标";
  if (latNum >= 18 && latNum <= 42 && lonNum >= 105 && lonNum <= 126) return "中国沿海或近海区域";
  if (latNum >= 1 && latNum <= 24 && lonNum >= 100 && lonNum <= 122) return "南海或东南亚航线附近";
  if (latNum >= -10 && latNum <= 10 && lonNum >= 95 && lonNum <= 110) return "马六甲海峡或新加坡附近";
  if (latNum >= 20 && latNum <= 32 && lonNum >= 120 && lonNum <= 132) return "东海或日本西南海域附近";
  if (latNum >= 30 && latNum <= 45 && lonNum >= -130 && lonNum <= -115) return "美国西海岸附近";
  if (latNum >= 45 && latNum <= 60 && lonNum >= -10 && lonNum <= 15) return "欧洲北海/英吉利海峡附近";
  return "公开 AIS 坐标附近海域";
}

function clamp(number, min, max) {
  return Math.min(max, Math.max(min, number));
}

function setVesselMap(position = {}, destination = "") {
  const map = $("vesselCoordinateMap");
  const marker = $("vesselMarker");
  const lat = toNumber(position.lat);
  const lon = toNumber(position.lon);
  if (lat === null || lon === null) {
    map.classList.add("hidden");
    marker.classList.remove("live-position");
    marker.removeAttribute("style");
    marker.textContent = "船舶位置";
    $("shipLocationNarrative").textContent = `暂时没有拿到船舶坐标；系统会继续显示文字结果，目的港：${destination || "未填写" }。`;
    return;
  }

  const left = clamp(((lon + 180) / 360) * 100, 7, 93);
  const top = clamp(((90 - lat) / 180) * 100, 8, 92);
  map.classList.remove("hidden");
  marker.classList.add("live-position");
  marker.style.left = `${left}%`;
  marker.style.top = `${top}%`;
  marker.textContent = "船舶位置";
  $("shipLocationNarrative").textContent = `这艘船大致在${describeSeaArea(lat, lon)}，坐标约 ${formatCoordinate(position.lat, "lat")}、${formatCoordinate(position.lon, "lon")}，目前显示的下一港/目的港是 ${destination || "未返回" }。`;
}

async function fetchShipxyEta(payload) {
  if (!location.protocol.startsWith("http")) {
    return { ok: false, code: "LOCAL_FILE", message: "本地文件预览不调用后端接口。" };
  }

  const mmsi = extractMmsi(payload.imo);
  const params = new URLSearchParams();
  if (mmsi) params.set("mmsi", mmsi);
  if (payload.vessel) params.set("shipname", payload.vessel);
  if (payload.destination) params.set("destination", payload.destination);

  if (!mmsi && !payload.vessel) {
    return { ok: false, code: "VESSEL_REQUIRED", message: "请输入船名；MMSI 可选。" };
  }

  const portcode = extractPortCode(payload.destination);
  if (portcode) params.set("portcode", portcode);

  const response = await fetch(`/.netlify/functions/shipxy-eta?${params.toString()}`);
  return response.json();
}

async function queryShipment(event) {
  event.preventDefault();
  const payload = {
    vessel: $("vesselName").value || "UNKNOWN VESSEL",
    voyage: $("voyageNo").value || "TBD",
    origin: $("originPort").value || "Origin Port",
    destination: $("destinationPort").value || "Destination Port",
    imo: $("imoMmsi").value || ""
  };

  $("shipmentApiState").textContent = "查询中";
  $("shipmentSourceLabel").textContent = "Live Query";
  $("shipmentApiNote").textContent = "正在通过船讯网按船名/MMSI 查询；只填船名和目的港也可以，航次作为备注字段。";

  try {
    const apiData = await fetchShipxyEta(payload);
    if (apiData.ok) {
      renderShipxyResult(payload, apiData.result, apiData.updatedAt, apiData.source);
      return;
    }
    renderShipmentResult(payload, apiData);
  } catch (error) {
    renderShipmentResult(payload, {
      code: "REQUEST_ERROR",
      message: error.message || "接口请求失败。"
    });
  }
}

function renderShipxyResult(payload = {}, result = {}, updatedAt = "", source = "ShipXY") {
  const vessel = result.shipName || payload.vessel || "UNKNOWN VESSEL";
  const voyage = payload.voyage || "TBD";
  const origin = payload.origin || result.previousPort?.name || "Origin Port";
  const destination = payload.destination || result.nextPort?.name || "Destination Port";
  const speed = result.position?.speed !== "" ? ` · ${result.position.speed} kn` : "";
  const nextPort = result.nextPort?.name ? `下一港 ${result.nextPort.name}` : "下一港未返回";
  const remaining =
    result.remainingDistanceNm !== "" ? ` · 剩余约 ${result.remainingDistanceNm} NM` : "";

  $("shipmentTitle").textContent = `${vessel} / ${voyage}`;
  $("shipmentPosition").textContent = `${formatPosition(result.position)}${speed}`;
  $("shipmentEta").textContent = formatEta(result.eta);
  $("shipmentStatus").textContent = nextPort;
  $("shipmentReminder").textContent = `船讯网 ETA 仅供跟踪参考${remaining}；最终船期以船司/货代/订舱确认为准。`;
  $("mapOrigin").textContent = origin;
  $("mapDestination").textContent = destination;
  $("shipmentApiState").textContent = "ShipXY Live";
  $("shipmentSourceLabel").textContent = source.includes("GetManyShip") ? "ShipXY Vessel Result" : "ShipXY ETA Result";
  $("shipmentApiNote").textContent = `数据源：${source}；更新时间：${formatEta(updatedAt)}。可用船名模糊查询；精准 ETA 未授权时会自动回退到基础船舶 AIS 信息。`;
  setVesselMap(result.position, result.nextPort?.name || destination);
}

function renderShipmentResult(payload = {}, fallback = {}) {
  const vessel = payload.vessel || "EVER GIVEN";
  const voyage = payload.voyage || "001W";
  const origin = payload.origin || "Port Klang";
  const destination = payload.destination || "Shanghai";
  const seed = normalize(`${vessel}${voyage}${destination}`);
  const etaDays = Math.max(2, Math.min(9, (seed.length % 8) + 2));
  const status = /shanghai|ningbo|yantian|hong kong|china/i.test(destination)
    ? "China inbound watch"
    : "On schedule";

  $("shipmentTitle").textContent = `${vessel} / ${voyage}`;
  $("shipmentPosition").textContent = payload.imo ? `AIS pending, IMO/MMSI ${payload.imo}` : "AIS/API pending";
  $("shipmentEta").textContent = `约 ${etaDays} days`;
  $("shipmentStatus").textContent = status;
  $("shipmentReminder").textContent = /battery|dg|air/i.test(seed)
    ? "含电池/DG 时需提前确认承运人限制"
    : "确认截关、舱单、提单和目的港清关资料";
  $("mapOrigin").textContent = origin;
  $("mapDestination").textContent = destination;
  setVesselMap({}, destination);
  $("shipLocationNarrative").textContent = `当前显示模拟结果：${vessel} 计划从 ${origin} 前往 ${destination}。真实位置需要船舶 AIS 接口返回坐标。`;
  $("shipmentApiState").textContent = location.protocol.startsWith("http") ? "模拟 fallback" : "本地模拟";
  $("shipmentSourceLabel").textContent = "Simulated Result";
  $("shipmentApiNote").textContent = fallback.message
    ? `未使用真实船讯网结果：${fallback.message} 当前显示模拟结果，正式船期仍需船司/货代确认。`
    : "当前显示模拟结果。真实查询需要 Netlify 环境变量 SHIPXY_API_KEY；MMSI 可提升准确度。";
}

function queryCustoms(event) {
  event.preventDefault();
  const bl = $("blNo").value || "未填写提单号";
  const container = $("containerNo").value || "未填写箱号";
  const direction = $("customsDirection").value;
  const customsCode = $("customsCode").value || "未填写关区/口岸";
  renderCustomsAdvice(bl, container, direction, customsCode);
}

function renderCustomsAdvice(bl = "未填写提单号", container = "未填写箱号", direction = "进口 Import", customsCode = "未填写关区/口岸") {
  const directionNote = direction.includes("出口")
    ? "出口场景建议同时确认订舱、截关、舱单发送、放行和装船节点。"
    : "进口场景建议同时确认到港、舱单、换单、申报、查验和放行节点。";
  const sipgKeyword = container !== "未填写箱号" ? container : bl;
  const sipgMode = container !== "未填写箱号" ? "按箱号查询" : "按单号查询";
  $("customsAdvice").innerHTML = `
    <strong>建议查询路径</strong>
    <p>${escapeHtml(directionNote)}</p>
    <ul>
      <li>B/L No.: ${escapeHtml(bl)}</li>
      <li>Container No.: ${escapeHtml(container)}</li>
      <li>Customs / Port: ${escapeHtml(customsCode)}</li>
      <li>上海港放行：打开上港集团箱货查询，输入 ${escapeHtml(sipgKeyword)}，选择“${escapeHtml(sipgMode)}”。如出现滑动验证，由人工完成。</li>
      <li>重点字段：海关放行、码头放行、理货、换单、授权、放箱、是否交单、查验指令、出场时间。</li>
      <li>当前页面不保存到服务器；正式版如接入单一窗口或报关行系统，需要账号权限和后端接口。</li>
    </ul>
  `;
}

async function loadTrends(keyword = "") {
  const cleanedKeyword = String(keyword || "").trim();
  $("trendStatus").textContent = cleanedKeyword ? `正在搜索：${cleanedKeyword}` : "正在加载过去一周公开新闻...";
  try {
    const params = new URLSearchParams();
    if (cleanedKeyword) params.set("keyword", cleanedKeyword);
    const url = `/.netlify/functions/global-trends${params.toString() ? `?${params.toString()}` : ""}`;
    const data = await fetchJsonOrFallback(url, fallbackTrends("", cleanedKeyword));
    renderTrends(data);
  } catch (error) {
    renderTrends(fallbackTrends(error.message, cleanedKeyword));
  }
}

function fallbackTrends(message = "", keyword = "") {
  const keywordText = keyword ? `“${keyword}”` : "全球宏观";
  return {
    ok: false,
    fallback: true,
    source: "Manual trend watch",
    updatedAt: new Date().toISOString(),
    message,
    keyword,
    summary: keyword
      ? `暂时没有拿到${keywordText}的实时搜索结果。建议先看固定来源，并用更宽泛的关键词再试。`
      : "重点关注利率、汇率、能源、贸易政策、地缘风险和供应链变化；这些会影响成本、交期和清关不确定性。",
    items: [
      {
        title: keyword ? `${keywordText}趋势观察` : "全球趋势观察",
        domain: "Manual checklist",
        sourceCountry: "Global",
        url: "https://www.reuters.com/markets/",
        seendate: "",
        takeaway: keyword
          ? `先围绕${keywordText}检查是否会影响价格、船期、清关文件、目的国准入或客户交付承诺。`
          : "关注利率、汇率、能源、贸易政策、地缘风险和供应链新闻；具体业务仍以官方/货代/关务确认为准。"
      }
    ]
  };
}

function renderTrends(data = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  $("trendStatus").textContent = `${data.source || "Trend source"} · ${formatEta(data.updatedAt)}${data.fallback ? " · fallback" : ""}`;
  $("trendSummary").innerHTML = `
    <strong>中文摘要</strong>
    <p>${escapeHtml(data.summary || summarizeTrendItems(items, data.keyword))}</p>
  `;
  $("trendGrid").innerHTML = items.length
    ? items
        .map(
          (item) => `
            <article class="trend-card">
              <span>${escapeHtml(item.sourceCountry || item.domain || "Global")}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.takeawayZh || item.takeaway || "建议作为宏观背景观察。")}</p>
              <a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(item.domain || "查看来源")}</a>
            </article>
          `
        )
        .join("")
    : `<article class="trend-card"><h3>暂无趋势结果</h3><p>${escapeHtml(data.message || "稍后重试。")}</p></article>`;
}

function summarizeTrendItems(items = [], keyword = "") {
  if (!items.length) return keyword ? `没有找到“${keyword}”相关结果，可以换更宽泛的关键词。` : "暂无公开新闻结果。";
  const domains = Array.from(new Set(items.map((item) => item.sourceCountry || item.domain).filter(Boolean))).slice(0, 4);
  const riskWords = items
    .flatMap((item) => [item.category, item.takeawayZh, item.takeaway, item.title])
    .join(" ")
    .toLowerCase();
  const points = [];
  if (/tariff|customs|sanction|export|trade|关税|海关|制裁|出口/.test(riskWords)) points.push("贸易政策或海关监管可能影响税率、资料和目的国准入");
  if (/shipping|port|supply|logistics|船|港口|物流|供应链/.test(riskWords)) points.push("物流和供应链变化可能影响船期、港口作业和交期");
  if (/rate|currency|inflation|market|finance|汇率|利率|通胀|金融/.test(riskWords)) points.push("汇率、利率和金融市场变化可能影响报价和成本");
  if (!points.length) points.push("建议作为宏观背景观察，具体业务仍需结合官方通知、货代和关务复核");
  return `${keyword ? `围绕“${keyword}”，` : ""}本次找到 ${items.length} 条公开消息${domains.length ? `，来源涉及 ${domains.join("、")}` : ""}。主要提醒：${points.join("；")}。`;
}

async function queryPortRisk(event) {
  if (event) event.preventDefault();
  const port = $("portName").value || "Shanghai Port";
  const region = $("portRegion").value || "China";
  const cargo = $("portCargo").value || "Consumer Audio";
  const params = new URLSearchParams({ port, region, cargo });
  $("portRiskStatus").textContent = "正在查询公开港口风险...";

  try {
    const data = await fetchJsonOrFallback(`/.netlify/functions/port-risk?${params.toString()}`, fallbackPortRisk(port, cargo));
    renderPortRisk(data);
  } catch (error) {
    renderPortRisk(fallbackPortRisk(port, cargo, error.message));
  }
}

function fallbackPortRisk(port = "Shanghai Port", cargo = "Consumer Audio", message = "") {
  const batteryCargo = /battery|电池|危险|dg|hazard/i.test(cargo);
  return {
    ok: false,
    fallback: true,
    source: "Manual risk checklist",
    updatedAt: new Date().toISOString(),
    port,
    cargo,
    level: batteryCargo ? "Medium" : "Watch",
    summary: message || `${port} 暂未获取到实时公开新闻结果，先按手工清单处理。`,
    checklist: [
      "查询上港集团箱货状态：海关放行、码头放行、理货、换单、授权、放箱、查验指令。",
      "确认船司/货代最新 ETA、靠泊计划、截关和提箱预约。",
      "如含电池或 DG，提前确认码头/船司危险品作业限制、MSDS、UN38.3 和包装标签。"
    ],
    links: [["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index"]],
    articles: []
  };
}

function renderPortRisk(data = {}) {
  const articles = Array.isArray(data.articles) ? data.articles : [];
  const links = Array.isArray(data.links) ? data.links : [];
  $("portRiskStatus").textContent = `${data.source || "Port risk"} · ${formatEta(data.updatedAt)}${data.fallback ? " · fallback" : ""}`;
  $("portRiskGrid").innerHTML = `
    <article class="risk-card level-${escapeHtml(String(data.level || "watch").toLowerCase())}">
      <span>Risk Level</span>
      <strong>${escapeHtml(data.level || "Watch")}</strong>
      <p>${escapeHtml(data.summary || "请结合官方入口和货代信息确认。")}</p>
    </article>
    <article class="risk-card">
      <span>Checklist</span>
      <ul>${(data.checklist || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="risk-card">
      <span>Official / useful links</span>
      <div class="mini-link-list">
        ${links.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
      </div>
    </article>
    <article class="risk-card articles-card">
      <span>Public news hits</span>
      ${
        articles.length
          ? articles
              .slice(0, 5)
              .map((item) => `<a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`)
              .join("")
          : "<p>暂无公开新闻命中，按手工风险清单处理。</p>"
      }
    </article>
  `;
}

function renderPortSuggestions(filter = "") {
  const needle = normalize(filter);
  const matches = portSuggestions
    .filter((port) => {
      const haystack = normalize([port.name, port.region, ...port.aliases].join(" "));
      return !needle || haystack.includes(needle);
    })
    .slice(0, 6);

  $("portSuggestionsList").innerHTML = portSuggestions
    .map((port) => `<option value="${escapeHtml(port.name)}">${escapeHtml(port.region)}</option>`)
    .join("");
  $("portSuggestionStrip").innerHTML = matches
    .map((port) => `<button type="button" data-port-name="${escapeHtml(port.name)}" data-port-region="${escapeHtml(port.region)}">${escapeHtml(port.name)}</button>`)
    .join("");
}

function applyPortSuggestion(button) {
  $("portName").value = button.dataset.portName || "Shanghai Port";
  $("portRegion").value = button.dataset.portRegion || "China";
  renderPortSuggestions($("portName").value);
  queryPortRisk();
}

async function fetchJsonOrFallback(url, fallback) {
  if (!location.protocol.startsWith("http")) return fallback;
  const response = await fetch(url);
  return response.json();
}

function evaluateBattery(event) {
  event.preventDefault();
  const included = $("batteryIncluded").value;
  const type = $("batteryType").value;
  const wh = Number($("batteryWh").value || 0);
  const packing = $("batteryPacking").value;
  const mode = $("transportMode").value;
  const docs = $("batteryDocs").value;
  const points = [];
  let score = 0;

  if (included === "unknown") {
    score += 3;
    points.push("电池状态不确定：需先向产品/供应商确认。");
  }
  if (included === "yes") {
    score += 2;
    points.push("含电池：进入 Battery / DG 复核流程。");
  }
  if (/锂/.test(type)) {
    score += 2;
    points.push("锂电池：需关注 UN38.3、MSDS、包装标签和承运人限制。");
  }
  if (wh > 100) {
    score += 4;
    points.push("Wh 大于 100：高风险，空运/快递限制更严格。");
  } else if (wh > 20) {
    score += 2;
    points.push("Wh 大于 20：建议 DG 专员复核。");
  }
  if (packing === "Battery only") {
    score += 3;
    points.push("电池单独运输：通常比装在设备中风险更高。");
  }
  if (mode === "Air" || mode === "Courier") {
    score += 2;
    points.push("空运/快递：需提前确认航司或快递渠道是否接受。");
  }
  if (docs === "未确认" || docs === "只有 MSDS" || docs === "只有 UN38.3") {
    score += 2;
    points.push("文件不完整：MSDS 和 UN38.3 建议同时准备。");
  }
  if (!points.length) points.push("当前未见明显 DG 触发点，但仍需按产品资料和承运人要求确认。");

  const level = score >= 8 ? "High" : score >= 4 ? "Medium" : "Low";
  $("batteryRiskLevel").textContent = `${level} Risk`;
  const box = $("batteryResult");
  box.className = `decision-box ${level.toLowerCase()}-risk`;
  box.innerHTML = `
    <strong>${level === "High" ? "高风险，建议暂停出运前确认" : level === "Medium" ? "中风险，需要补资料/复核" : "低风险，保留判断记录"}</strong>
    <ul>${points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function loadExample() {
  $("productName").value = "蓝牙降噪耳机";
  $("englishName").value = "Bluetooth ANC earbuds";
  $("productCategory").value = "Headphone / Earbuds";
  $("tradeDirection").value = "进口";
  $("material").value = "塑料外壳、锂离子电池、电路板、喇叭单元";
  $("usage").value = "无线连接手机播放声音，带充电盒";
  $("spec").value = "Bluetooth，内置锂电池，充电盒，USB-C";
  $("destination").value = "China";
  $("modelInfo").value = "零售包装，随附充电线。需要确认 MSDS、UN38.3、无线认证和 3C 边界。";
}

function clearForm() {
  $("productForm").reset();
  $("emptyState").classList.remove("hidden");
  $("resultState").classList.add("hidden");
  $("candidateList").innerHTML = "";
  renderRisks(["填写产品信息后，这里会显示 HS、3C、Battery/DG、监管条件和人工复核提醒。"]);
  $("reviewState").textContent = "待输入";
}

function loadBatteryExample() {
  $("batteryIncluded").value = "yes";
  $("batteryType").value = "锂离子 / Li-ion";
  $("batteryWh").value = "1.1";
  $("batteryPacking").value = "Contained in equipment";
  $("transportMode").value = "Air";
  $("batteryDocs").value = "未确认";
}

function resetBattery() {
  $("batteryForm").reset();
  $("batteryRiskLevel").textContent = "待判断";
  $("batteryResult").className = "decision-box";
  $("batteryResult").innerHTML = "<strong>填写电池信息后生成提醒</strong><p>测试版不替代货代、航司、船司或 DG 专员判断。</p>";
}

function renderIssues() {
  const openCount = state.issues.filter((issue) => issue.status !== "Closed").length;
  $("openIssueCount").textContent = openCount;
  $("issueTable").innerHTML = state.issues.length
    ? state.issues
        .map(
          (issue, index) => `
            <tr>
              <td>${escapeHtml(issue.status)}</td>
              <td>${escapeHtml(issue.type)}</td>
              <td>${escapeHtml(issue.priority)}</td>
              <td>${escapeHtml(issue.title)}</td>
              <td>${escapeHtml(issue.owner || "-")}</td>
              <td>${escapeHtml(issue.date)}</td>
              <td><button class="status-button" data-issue="${index}" type="button">${issue.status === "Closed" ? "重开" : "关闭"}</button></td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="7">暂无异常。你可以先记录 HS 不确定、缺 DG 文件、政策待确认、舱单异常等事项。</td></tr>`;
}

function addIssue(event) {
  event.preventDefault();
  state.issues.unshift({
    title: $("issueTitle").value,
    type: $("issueType").value,
    priority: $("issuePriority").value,
    owner: $("issueOwner").value,
    status: "Open",
    date: new Date().toISOString().slice(0, 10)
  });
  saveIssues();
  renderIssues();
  $("issueForm").reset();
}

function toggleIssue(index) {
  const issue = state.issues[index];
  if (!issue) return;
  issue.status = issue.status === "Closed" ? "Open" : "Closed";
  saveIssues();
  renderIssues();
}

function renderCountryMatrix() {
  $("countryTable").innerHTML = countryRows
    .map(([market, focus, status]) => `<tr><td>${escapeHtml(market)}</td><td>${escapeHtml(focus)}</td><td>${escapeHtml(status)}</td></tr>`)
    .join("");
}

function detectRequirementSignals(productText = "") {
  const text = normalize(productText);
  const signals = [];
  if (/(蓝牙|无线|wifi|wi-fi|bluetooth|wireless|radio|tws)/.test(text)) signals.push("wireless");
  if (/(电池|锂|battery|li-ion|charging case|充电盒|power bank)/.test(text)) signals.push("battery");
  if (/(适配器|电源|插头|adapter|charger|power supply|usb-c|type-c)/.test(text)) signals.push("power");
  if (/(耳机|音箱|soundbar|speaker|headphone|earbuds|audio|cd player|播放)/.test(text)) signals.push("audio");
  if (/(维修|配件|零件|spare|repair|part)/.test(text)) signals.push("spare");
  return Array.from(new Set(signals));
}

function findRequirementProfile(country = "") {
  const needle = normalize(country);
  if (!needle) return requirementProfiles[0];
  return (
    requirementProfiles.find((profile) =>
      normalize([profile.market, ...profile.aliases].join(" ")).includes(needle) ||
      profile.aliases.some((alias) => needle.includes(normalize(alias)))
    ) || {
      market: country || "未指定市场",
      aliases: [],
      base: ["当前测试版没有该市场的固定规则库。建议先确认当地进口商要求、认证、标签、电池运输、海关编码和清关资料。"],
      rules: []
    }
  );
}

function queryRequirements(event) {
  event.preventDefault();
  const product = $("requirementProduct").value || "消费类音频产品";
  const country = $("requirementCountry").value || "中国";
  const profile = findRequirementProfile(country);
  const signals = detectRequirementSignals(product);
  const matchedRules = profile.rules
    .filter(([signal]) => signals.includes(signal))
    .map(([, text]) => text);
  const genericSignals = [];
  if (signals.includes("spare")) genericSignals.push("维修件/配件：确认是否专用于整机、是否单独销售、是否需要按零件归类。");
  if (!matchedRules.length && !genericSignals.length) genericSignals.push("没有命中电池/无线/电源等明显高风险词，但仍建议准备规格书、图片、用途、材质和标签样稿。");
  const level = signals.includes("battery") || signals.includes("wireless") ? "中高关注" : signals.includes("power") ? "中等关注" : "常规关注";

  $("requirementResult").innerHTML = `
    <article class="requirement-card">
      <div>
        <span>进口国/地区</span>
        <strong>${escapeHtml(profile.market)}</strong>
      </div>
      <div>
        <span>风险关注</span>
        <strong>${escapeHtml(level)}</strong>
      </div>
      <p>产品描述：${escapeHtml(product)}</p>
      <h3>建议先核对</h3>
      <ul>
        ${profile.base.concat(matchedRules, genericSignals).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <small>说明：这是测试版规则提示，目的是告诉非专业同事“先查什么、问谁、准备什么”，最终结论仍需关务、认证机构、当地进口商或报关行确认。</small>
    </article>
  `;
}

function loadRequirementExample() {
  $("requirementProduct").value = "蓝牙耳机，内置锂电池，带充电盒，USB-C 充电，零售包装";
  $("requirementCountry").value = "欧盟";
  queryRequirements(new Event("submit"));
}

function formatDateTimeForUser(value = "") {
  if (!value) return "未填写 ETA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function saveVesselAlert(event) {
  event.preventDefault();
  const rule = {
    id: Date.now().toString(36),
    vessel: $("alertVesselName").value || $("vesselName").value || "未填写船名",
    destination: $("alertDestination").value || $("destinationPort").value || "未填写目的港",
    expectedEta: $("alertExpectedEta").value,
    email: $("alertEmail").value || "未填写邮箱",
    rule: $("alertRule").value,
    createdAt: new Date().toISOString()
  };
  state.vesselAlerts.unshift(rule);
  saveVesselAlerts();
  renderVesselAlerts();
  $("vesselAlertResult").innerHTML = `
    <article class="alert-card success">
      <strong>已保存预警规则</strong>
      <p>${escapeHtml(rule.vessel)} 前往 ${escapeHtml(rule.destination)}，${escapeHtml(rule.rule === "late_eta" ? "实际 ETA 晚于预想 ETA 时提醒" : "ETA 前一个工作日提醒")}。当前测试版先保存在本机浏览器；自动邮件需要后端定时任务。</p>
    </article>
  `;
  $("vesselAlertForm").reset();
}

function removeVesselAlert(id) {
  state.vesselAlerts = state.vesselAlerts.filter((item) => item.id !== id);
  saveVesselAlerts();
  renderVesselAlerts();
}

function renderVesselAlerts() {
  const list = $("vesselAlertList");
  if (!list) return;
  list.innerHTML = state.vesselAlerts.length
    ? state.vesselAlerts
        .map(
          (item) => `
            <article class="alert-card">
              <div>
                <span>${escapeHtml(item.rule === "late_eta" ? "ETA 延误预警" : "到港前提醒")}</span>
                <strong>${escapeHtml(item.vessel)} -> ${escapeHtml(item.destination)}</strong>
                <p>预想 ETA：${escapeHtml(formatDateTimeForUser(item.expectedEta))}；提醒邮箱：${escapeHtml(item.email)}</p>
                <small>自动发邮件上线条件：后端定时查询船讯网/船司数据 + 邮件 API + 邮箱白名单。</small>
              </div>
              <button type="button" class="secondary-button" data-alert-delete="${escapeHtml(item.id)}">删除</button>
            </article>
          `
        )
        .join("")
    : `<article class="alert-card muted"><strong>暂无关注船舶</strong><p>保存规则后，这里会显示需要跟踪的船和 ETA 风险。</p></article>`;
}

function toCsv(rows, headers) {
  return [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n");
}

function csvCell(value) {
  const text = String(value || "");
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function download(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  initAccessGate();
  $("productForm").addEventListener("submit", recommend);
  $("loadExample").addEventListener("click", loadExample);
  $("clearForm").addEventListener("click", clearForm);
  $("userSelect").addEventListener("change", updateRole);
  $("shipmentForm").addEventListener("submit", queryShipment);
  $("loadVesselExample").addEventListener("click", loadVesselExample);
  $("vesselAlertForm").addEventListener("submit", saveVesselAlert);
  $("vesselAlertList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-alert-delete]");
    if (button) removeVesselAlert(button.dataset.alertDelete);
  });
  $("customsForm").addEventListener("submit", queryCustoms);
  $("refreshPolicy").addEventListener("click", loadPolicyUpdates);
  $("policyFilterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loadPolicyUpdates();
  });
  $("refreshTrends").addEventListener("click", () => loadTrends($("trendKeyword").value));
  $("trendSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loadTrends($("trendKeyword").value);
  });
  $("clearTrendSearch").addEventListener("click", () => {
    $("trendKeyword").value = "";
    loadTrends();
  });
  $("portName").addEventListener("input", () => renderPortSuggestions($("portName").value));
  $("portSuggestionStrip").addEventListener("click", (event) => {
    const button = event.target.closest("[data-port-name]");
    if (button) applyPortSuggestion(button);
  });
  $("portRiskForm").addEventListener("submit", queryPortRisk);
  $("batteryForm").addEventListener("submit", evaluateBattery);
  $("loadBatteryExample").addEventListener("click", loadBatteryExample);
  $("resetBattery").addEventListener("click", resetBattery);
  $("issueForm").addEventListener("submit", addIssue);
  $("issueTable").addEventListener("click", (event) => {
    const button = event.target.closest("[data-issue]");
    if (button) toggleIssue(Number(button.dataset.issue));
  });
  $("exportIssues").addEventListener("click", () =>
    download("consumer-audio-exception-log.csv", toCsv(state.issues, ["status", "type", "priority", "title", "owner", "date"]))
  );
  $("requirementForm").addEventListener("submit", queryRequirements);
  $("loadRequirementExample").addEventListener("click", loadRequirementExample);
}

renderUsers();
renderModules();
renderSources();
renderTimeline();
loadPolicyUpdates();
renderDeclarationElements();
renderOps();
renderCustomsLinks();
renderShipmentResult();
renderVesselAlerts();
renderCustomsAdvice();
loadTrends();
renderPortSuggestions();
queryPortRisk();
renderIssues();
renderCountryMatrix();
queryRequirements({ preventDefault() {} });
renderRisks(["填写产品信息后，这里会显示 HS、3C、Battery/DG、监管条件和人工复核提醒。"]);
bindEvents();
