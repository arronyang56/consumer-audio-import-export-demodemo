const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
    },
    body: JSON.stringify(body)
  };
}

function clean(value = "") {
  return String(value || "").trim().replace(/\s+/g, "").slice(0, 80);
}

const carriers = {
  dhl: {
    name: "DHL Express",
    pattern: /^(?:\d{10}|\d{11}|JD\d+)/i,
    links: (no) => [
      ["DHL 官方追踪", "https://www.dhl.com/global-en/home/tracking.html"],
      ["DHL Tracking 号码入口", `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${encodeURIComponent(no)}`]
    ]
  },
  ups: {
    name: "UPS",
    pattern: /^1Z[0-9A-Z]{16}$/i,
    links: (no) => [
      ["UPS 官方追踪", "https://www.ups.com/track"],
      ["UPS Tracking 号码入口", `https://www.ups.com/track?tracknum=${encodeURIComponent(no)}`]
    ]
  },
  fedex: {
    name: "FedEx",
    pattern: /^\d{12,15}$/i,
    links: (no) => [
      ["FedEx 官方追踪", "https://www.fedex.com/fedextrack/"],
      ["FedEx Tracking 号码入口", `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(no)}`]
    ]
  },
  sf: {
    name: "顺丰 SF",
    pattern: /^(?:SF)?\d{10,15}$/i,
    links: () => [
      ["顺丰官网/APP", "https://www.sf-express.com/"],
      ["顺丰国际", "https://intl.sf-express.com/"]
    ]
  },
  other: {
    name: "其他/不确定",
    pattern: /.*/,
    links: (no) => [
      ["承运商官网优先", "https://www.17track.net/"],
      ["17TRACK 辅助初筛", `https://www.17track.net/en/track?nums=${encodeURIComponent(no)}`]
    ]
  }
};

function detectCarrier(number = "", selected = "auto") {
  const no = clean(number).toUpperCase();
  if (selected && selected !== "auto" && carriers[selected]) return { id: selected, no, ...carriers[selected] };
  const hit = Object.entries(carriers).find(([id, profile]) => id !== "other" && profile.pattern.test(no));
  const [id, profile] = hit || ["other", carriers.other];
  return { id, no, ...profile };
}

function htmlToText(html = "") {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseStatus(text = "") {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  const patterns = [
    /(Delivered|Out for delivery|In transit|On the way|Arrived at|Departed from|Clearance delay|Clearance event|Exception|Held|Pending|Shipment information received|Label created)[^。；;|]{0,120}/i,
    /(已签收|派送中|运输中|转运中|已到达|已离开|清关延误|清关中|海关放行|异常|待处理|已揽收|已收件|电子信息已收到)[^。；;|]{0,80}/i
  ];
  for (const pattern of patterns) {
    const match = compact.match(pattern);
    if (match?.[0]) return match[0].trim();
  }
  return "";
}

function detectAirSignals(product = "", destination = "") {
  const text = `${product || ""} ${destination || ""}`.toLowerCase();
  const signals = [];
  if (/电池|锂|battery|li-ion|power bank|充电宝|移动电源/.test(text)) signals.push("电池/DG");
  if (/磁|magnet|speaker|音箱|喇叭|扬声器/.test(text)) signals.push("磁性/音频");
  if (/蓝牙|无线|bluetooth|wireless|radio|wifi/.test(text)) signals.push("无线认证");
  if (/样品|sample/.test(text)) signals.push("样品");
  if (/维修|退运|返修|repair|return/.test(text)) signals.push("维修/退运");
  if (/巴西|brazil|欧盟|eu|美国|usa|united states|印度|india|泰国|thailand/.test(text)) signals.push("目的国清关关注");
  return signals;
}

function buildAirTrackingJudgement({ carrier, attempt = {}, params = {} }) {
  const product = params.product || "";
  const destination = params.destination || "";
  const signals = detectAirSignals(product, destination);
  let score = attempt.ok ? 72 : 42;
  if (/Delivered|已签收|海关放行/i.test(attempt.status || "")) score += 12;
  if (/delay|Exception|Held|异常|延误|待处理|Clearance/i.test(attempt.status || "")) score -= 18;
  if (signals.includes("电池/DG")) score -= 10;
  if (signals.includes("维修/退运")) score -= 8;
  if (!product) score -= 6;
  if (!destination) score -= 5;
  if (/VERIFY_REQUIRED|STATUS_NOT_EXPOSED|OFFICIAL_WEB_NEEDS_MANUAL/.test(attempt.code || "")) score -= 10;
  score = Math.max(18, Math.min(94, score));
  const label = attempt.ok
    ? (/delay|Exception|Held|异常|延误|待处理|Clearance/i.test(attempt.status || "") ? "需人工跟进" : "可作为官网线索")
    : "不能自动判定轨迹";
  const opinion = attempt.ok
    ? `我的判断：已读到 ${carrier.name} 的状态片段，但还不能只凭平台截图下结论。若状态涉及清关、异常或延误，应以官网完整页面、更新时间和客服回复为准。`
    : `我的判断：这不是货物一定异常，而是 ${carrier.name} 官网没有把实时状态稳定暴露给免费后端。下一步应打开官方链接人工核验，并把官网状态截图归档。`;
  const evidence = [
    ["承运商", carrier.name],
    ["运单号格式", carrier.id === "other" ? "未能稳定识别" : "已识别"],
    ["官网读取", attempt.ok ? "取得状态片段" : (attempt.code || "未取得")],
    ["产品信号", signals.join("、") || "未填写/一般货"]
  ];
  const actions = [];
  if (!attempt.ok) actions.push("打开承运商官网链接核对完整轨迹、更新时间和目的地站点提示。");
  if (/Clearance|清关|Held|Exception|异常|延误/i.test(attempt.status || "")) actions.push("把官网截图发给收件人/快递客服，确认是否缺发票、税号、进口商或认证资料。");
  if (signals.includes("电池/DG")) actions.push("含电池/移动电源先核对 UN38.3、MSDS/SDS、Wh、包装和渠道可接收性。");
  if (signals.includes("无线认证")) actions.push("无线/蓝牙货物到达清关前确认目的国认证或进口商文件。");
  if (signals.includes("维修/退运")) actions.push("维修/退运件准备维修说明、旧件价值、序列号和退运/返修原因。");
  if (!actions.length) actions.push("保留官网查询时间；若 24 小时无更新，再联系承运商或货代追踪。");
  return { score, label, opinion, evidence, actions, signals };
}

async function tryOfficialPage(carrier, links) {
  if (carrier.id === "sf" || carrier.id === "other") {
    return { ok: false, code: "OFFICIAL_WEB_NEEDS_MANUAL", message: `${carrier.name} 官网通常需要页面交互、手机号/验证码或 APP，免费后端无法稳定读取实时状态。` };
  }
  const url = links[1]?.[1] || links[0]?.[1];
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 HS-Platform-AirTracking/1.0",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
      },
      redirect: "follow",
      signal: AbortSignal.timeout(16000)
    });
    const html = await response.text();
    const text = htmlToText(html).slice(0, 6000);
    if (/captcha|robot|verify|access denied|forbidden|验证码|人机|安全验证/i.test(text)) {
      return { ok: false, code: "VERIFY_REQUIRED", message: `${carrier.name} 官方页面要求验证码/安全验证，脚本不绕过验证。`, url };
    }
    const status = parseStatus(text);
    if (!status) {
      return { ok: false, code: "STATUS_NOT_EXPOSED", message: `${carrier.name} 官方页面没有向免费后端暴露可解析的实时状态，可能由浏览器脚本动态加载。`, url };
    }
    return {
      ok: true,
      source: `${carrier.name} official tracking page`,
      status,
      statusLevel: /Delivered|已签收|海关放行/i.test(status) ? "正常/已完成" : /delay|Exception|Held|异常|延误|待处理/i.test(status) ? "异常/需处理" : "在途/观察",
      url,
      rawText: text.slice(0, 1200)
    };
  } catch (error) {
    return { ok: false, code: "OFFICIAL_FETCH_FAILED", message: error.message || `${carrier.name} 官方页面请求失败。`, url };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const params = event.queryStringParameters || {};
  const carrier = detectCarrier(params.number || params.trackingNo || "", params.carrier || "auto");
  const links = carrier.links(carrier.no);
  if (!carrier.no) {
    return json(200, {
      ok: false,
      code: "TRACKING_NUMBER_REQUIRED",
      message: "请输入空运/快件运单号。",
      carrier: { id: carrier.id, name: carrier.name },
      links
    });
  }

  const attempt = await tryOfficialPage(carrier, links);
  const judgement = buildAirTrackingJudgement({ carrier, attempt, params });
  return json(200, {
    ok: Boolean(attempt.ok),
    code: attempt.ok ? "AIR_TRACKING_OK" : attempt.code,
    message: attempt.ok ? "已从公开追踪页面读取到状态片段；正式仍以官网页面显示为准。" : attempt.message,
    carrier: { id: carrier.id, name: carrier.name },
    trackingNo: carrier.no,
    status: attempt.status || "",
    statusLevel: attempt.statusLevel || "未取得实时状态",
    source: attempt.source || "官方追踪入口",
    url: attempt.url || links[0]?.[1],
    links,
    judgement,
    rawText: attempt.rawText || "",
    queriedAt: new Date().toISOString()
  });
};
