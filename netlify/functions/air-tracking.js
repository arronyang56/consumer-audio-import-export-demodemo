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
    rawText: attempt.rawText || "",
    queriedAt: new Date().toISOString()
  });
};
