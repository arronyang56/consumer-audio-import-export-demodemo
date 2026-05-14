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
  { name: "采购/业务查询", role: "查询候选税号、文件清单和 DG 风险；高风险事项提交关务复核。" },
  { name: "物流/计划", role: "关注船期、舱单、里程碑、港口风险和文件准备状态。" },
  { name: "只读访客", role: "仅查看脱敏演示流程，不上传公司敏感资料。" }
];

const moduleItems = [
  ["Dashboard 总览", "汇总待复核、DG 风险、异常、政策关注和文件缺口。", "Live"],
  ["HS Code Assistant", "按产品描述、用途、材质和关键词推荐候选税号。", "Live"],
  ["Declaration Elements", "按品类提示申报要素和资料缺口。", "Live"],
  ["Policy Monitor", "聚合海关、CNCA、归类决定和政策关注点。", "Live"],
  ["Vessel & Schedule Tracking", "船名、航次、POL/POD、ETD/ETA 字段预留。", "MVP"],
  ["Customs / Manifest Status", "提单、箱号、舱单、关区查询入口预留。", "MVP"],
  ["Shipment Milestone", "订舱、开船、到港、报关、放行节点看板。", "MVP"],
  ["Battery & DG Check", "锂电池、UN38.3、MSDS、包装和运输方式判断。", "Live"],
  ["Document Checklist", "发票、箱单、提单、规格书、DG 文件清单。", "Live"],
  ["Port & Logistics Risk", "港口拥堵、查验、天气和目的港风险预留。", "MVP"],
  ["Exception Log", "记录 HS、DG、文件、政策、船期异常并导出。", "Live"],
  ["Cost & Lead Time Benchmark", "成本和时效基准先以样例展示。", "Future"],
  ["Country Requirement Matrix", "US/EU/UK/GCC/China 市场要求矩阵。", "MVP"],
  ["File Upload / Data Import", "CSV 导入、Excel 解析和本地存储路线。", "MVP"],
  ["Future Integration", "SharePoint、ERP/WMS/TMS、AIS、报关行、SSO。", "Future"]
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
  ["海关总署门户", "http://www.customs.gov.cn/", "政策法规、公告、归类决定和行政裁定的权威来源。"],
  ["船舶 AIS / 船期 API 预留", "#integration", "船讯网等 API 不应把 Key 放在网页前端，正式接入需要后端代理。"]
];

const policyItems = [
  ["每日", "海关公告与归类决定", "关注 Consumer Audio 相关税则税率、监管条件、归类口径变化。"],
  ["每周", "3C 与电池认证边界", "耳机、音箱、电源适配器、低压电器和无线产品需重点复核。"],
  ["每票", "目的国要求", "出口场景同步检查目的国标签、认证、电池运输和进口准入要求。"]
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
  ["Vessel & Schedule", "船名、航次、POL/POD、ETD/ETA、Carrier，可先手工输入或导入表格。", ["模拟查询", "API 预留"]],
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

const benchmarks = [
  ["海运整柜/拼箱", "适合普通音箱、Soundbar；关注截关、舱单和目的港拥堵。"],
  ["空运/快递", "适合样品和急单；锂电池文件、PI965/966/967 边界是高风险点。"],
  ["查验/补资料", "历史异常可沉淀原因、耗时和责任人，后续形成时效基准。"]
];

const state = {
  cases: loadCases(),
  lastResult: null,
  issues: loadIssues()
};

const $ = (id) => document.getElementById(id);

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
  updateDocumentDraft();
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
      const statusClass = status === "Live" ? "" : status === "MVP" ? "pending" : "future";
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

function renderDeclarationElements(formText = "") {
  const keyword = formText || "battery wireless audio";
  const rows = declarationSets.map(([title, items]) => {
    const active =
      keyword.includes("battery") && title.includes("电池") ||
      keyword.includes("wireless") && title.includes("无线") ||
      keyword.includes("bluetooth") && title.includes("无线") ||
      keyword.includes("soundbar") && title.includes("音箱") ||
      keyword.includes("speaker") && title.includes("音箱") ||
      keyword.includes("head") && title.includes("耳机");
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

async function fetchShipxyEta(payload) {
  if (!location.protocol.startsWith("http")) {
    return { ok: false, code: "LOCAL_FILE", message: "本地文件预览不调用后端接口。" };
  }

  const mmsi = extractMmsi(payload.imo);
  if (!mmsi) {
    return { ok: false, code: "MMSI_REQUIRED", message: "真实 ETA 查询需要 9 位 MMSI。" };
  }

  const params = new URLSearchParams({ mmsi });
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
  $("shipmentApiNote").textContent = "正在尝试通过船讯网 API 查询 ETA；如果接口不可用，会自动切换到模拟结果。";

  try {
    const apiData = await fetchShipxyEta(payload);
    if (apiData.ok) {
      renderShipxyResult(payload, apiData.result, apiData.updatedAt);
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

function renderShipxyResult(payload = {}, result = {}, updatedAt = "") {
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
  $("shipmentSourceLabel").textContent = "ShipXY ETA Result";
  $("shipmentApiNote").textContent = `数据源：船讯网 GetSingleETAPrecise；更新时间：${formatEta(updatedAt)}。`;
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
  $("shipmentApiState").textContent = location.protocol.startsWith("http") ? "模拟 fallback" : "本地模拟";
  $("shipmentSourceLabel").textContent = "Simulated Result";
  $("shipmentApiNote").textContent = fallback.message
    ? `未使用真实船讯网结果：${fallback.message} 当前显示模拟结果，正式船期仍需船司/货代确认。`
    : "当前显示模拟结果。真实查询需要 Netlify 环境变量 SHIPXY_API_KEY 和 9 位 MMSI。";
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
  $("customsAdvice").innerHTML = `
    <strong>建议查询路径</strong>
    <p>${escapeHtml(directionNote)}</p>
    <ul>
      <li>B/L No.: ${escapeHtml(bl)}</li>
      <li>Container No.: ${escapeHtml(container)}</li>
      <li>Customs / Port: ${escapeHtml(customsCode)}</li>
      <li>当前页面不保存到服务器；正式版如接入单一窗口或报关行系统，需要账号权限和后端接口。</li>
    </ul>
  `;
}

function renderDocuments() {
  $("documentChecklist").innerHTML = docItems
    .map(
      ([cn, en, note]) => `
        <article class="check-card">
          <h3>${escapeHtml(cn)}</h3>
          <ul>
            <li>${escapeHtml(en)}</li>
            <li>${escapeHtml(note)}</li>
          </ul>
        </article>
      `
    )
    .join("");
  updateDocumentDraft();
}

function updateDocumentDraft() {
  const best = state.lastResult?.best;
  const product = $("productName")?.value || "[产品名称]";
  const destination = $("destination")?.value || "[目的国/地区]";
  $("docDraft").value = [
    "Subject: Consumer Audio import/export document request",
    "",
    `Product: ${product}`,
    `Suggested HS candidate: ${best ? `${best.code} - ${best.name}` : "[待 HS 初筛]"}`,
    `Destination / Market: ${destination}`,
    "",
    "Please prepare / confirm:",
    "1. Product specification with photo, usage, material, brand and model.",
    "2. Commercial invoice and packing list.",
    "3. Declaration elements for customs review.",
    "4. Battery statement. If battery is included, provide MSDS and UN38.3.",
    "5. Wireless / certification documents if Bluetooth, Wi-Fi or radio module exists.",
    "6. Any broker confirmation or previous import/export reference.",
    "",
    "Note: this is generated from a desensitized demo and must be reviewed before declaration."
  ].join("\n");
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
  $("benchmarkList").innerHTML = benchmarks
    .map(([title, text]) => `<article class="benchmark-item"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></article>`)
    .join("");
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
  $("productForm").addEventListener("submit", recommend);
  $("loadExample").addEventListener("click", loadExample);
  $("clearForm").addEventListener("click", clearForm);
  $("userSelect").addEventListener("change", updateRole);
  $("shipmentForm").addEventListener("submit", queryShipment);
  $("loadVesselExample").addEventListener("click", loadVesselExample);
  $("customsForm").addEventListener("submit", queryCustoms);
  $("batteryForm").addEventListener("submit", evaluateBattery);
  $("loadBatteryExample").addEventListener("click", loadBatteryExample);
  $("resetBattery").addEventListener("click", resetBattery);
  $("copyDocDraft").addEventListener("click", updateDocumentDraft);
  $("issueForm").addEventListener("submit", addIssue);
  $("issueTable").addEventListener("click", (event) => {
    const button = event.target.closest("[data-issue]");
    if (button) toggleIssue(Number(button.dataset.issue));
  });
  $("exportIssues").addEventListener("click", () =>
    download("consumer-audio-exception-log.csv", toCsv(state.issues, ["status", "type", "priority", "title", "owner", "date"]))
  );
}

renderUsers();
renderModules();
renderSources();
renderTimeline();
renderDeclarationElements();
renderOps();
renderCustomsLinks();
renderShipmentResult();
renderCustomsAdvice();
renderDocuments();
renderIssues();
renderCountryMatrix();
renderRisks(["填写产品信息后，这里会显示 HS、3C、Battery/DG、监管条件和人工复核提醒。"]);
bindEvents();
