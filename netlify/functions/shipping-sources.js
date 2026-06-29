const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const sources = [
  {
    id: "shipxy",
    name: "船讯网",
    url: "https://www.shipxy.com/",
    type: "船舶位置 / AIS",
    fields: ["船名", "MMSI/IMO", "目的港"],
    note: "适合查船舶大致位置；如果页面要求登录或验证，由查询人打开原网站完成。"
  },
  {
    id: "hb56",
    name: "港航纵横",
    url: "https://www.hb56.com/Index.aspx",
    type: "港航/箱货/放行",
    fields: ["箱号", "提单号", "船名航次"],
    note: "可能需要账号登录或验证码；后台只检测入口状态，不绕过登录。"
  },
  {
    id: "sipg",
    name: "上港集团箱货查询",
    url: "https://www.sipg.com.cn/conquery/index",
    type: "上海港箱货状态",
    fields: ["箱号", "提单号"],
    note: "公开查询页常有滑动验证，查询人需要在原网站手工完成。"
  },
  {
    id: "cosco",
    name: "COSCO Cargo Tracking",
    url: "https://elines.coscoshipping.com/ebusiness/cargoTracking",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "船司官方入口，适合复核 ETA、箱动态、放箱/提箱节点。"
  },
  {
    id: "oocl",
    name: "OOCL Cargo Tracking",
    url: "https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "船司官方入口，适合用箱号或提单号核验最新事件。"
  },
  {
    id: "maersk",
    name: "Maersk Tracking",
    url: "https://www.maersk.com/tracking/",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "船司官方入口，优先看 ETA/ETD、转运港和箱动态。"
  },
  {
    id: "msc",
    name: "MSC Track a Shipment",
    url: "https://www.msc.com/en/track-a-shipment",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "MSC 官方入口，适合核验船名航次和到港节点。"
  },
  {
    id: "cma-cgm",
    name: "CMA CGM Tracking",
    url: "https://www.cma-cgm.com/ebusiness/tracking",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "CMA CGM 官方入口，遇到验证码由查询人完成。"
  },
  {
    id: "hapag-lloyd",
    name: "Hapag-Lloyd Tracking",
    url: "https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "船司官方入口，可复核箱状态和船期事件。"
  },
  {
    id: "one-line",
    name: "ONE Cargo Tracking",
    url: "https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "ONE 官方入口，适合查箱号/提单号动态。"
  },
  {
    id: "evergreen",
    name: "Evergreen ShipmentLink",
    url: "https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do",
    type: "船司官方箱货/船期",
    fields: ["箱号", "提单号", "订舱号"],
    note: "长荣官方入口，适合核验船名航次和箱动态。"
  },
  {
    id: "vesselfinder",
    name: "VesselFinder",
    url: "https://www.vesselfinder.com/",
    type: "免费网页船舶位置参考",
    fields: ["船名", "IMO/MMSI"],
    note: "可作为备用人工查询入口；正式 API 通常为付费。"
  },
  {
    id: "weiyun001",
    name: "微云船舶",
    url: "https://www.weiyun001.com/",
    type: "备用船舶定位参考",
    fields: ["英文船名", "MMSI/IMO"],
    note: "可作为船讯网之外的备用定位入口；若页面需要验证或脚本交互，查询人在原网站完成。"
  },
  {
    id: "shipfinder",
    name: "Shipfinder",
    url: "https://www.shipfinder.com/",
    type: "备用 AIS 船位参考",
    fields: ["英文船名", "MMSI/IMO"],
    note: "可作为人工核验入口；公开网页可用性取决于第三方网站限制。"
  }
];

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=900" },
    body: JSON.stringify(body)
  };
}

function clean(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

function titleFromHtml(html = "") {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  return title.replace(/\s+/g, " ").trim().slice(0, 120);
}

function classify(html = "", status = 0) {
  const text = html.toLowerCase();
  if (/captcha|验证码|滑动|验证|verify|robot|人机/.test(text)) return "需要人工验证";
  if (/login|password|登录|密码|__viewstate|signin/.test(text)) return "可能需要登录";
  if (status >= 200 && status < 400) return "入口可访问";
  return "入口异常";
}

async function probe(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "consumer-audio-import-export-demo/1.0"
      }
    });
    const html = await response.text();
    clearTimeout(timer);
    return {
      ...source,
      statusCode: response.status,
      status: classify(html, response.status),
      title: titleFromHtml(html),
      autoCrawl: !/需要人工验证|可能需要登录|入口异常/.test(classify(html, response.status))
    };
  } catch (error) {
    clearTimeout(timer);
    return {
      ...source,
      statusCode: "",
      status: "入口异常",
      title: "",
      autoCrawl: false,
      message: error.name === "AbortError" ? "入口响应超时" : error.message
    };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const params = event.queryStringParameters || {};
  const query = {
    vessel: clean(params.vessel || params.shipname),
    destination: clean(params.destination),
    container: clean(params.container),
    bl: clean(params.bl)
  };
  const results = await Promise.all(sources.map(probe));

  return json(200, {
    ok: true,
    source: "第三方公开入口探测",
    updatedAt: new Date().toISOString(),
    query,
    summary: "后台已尝试探测第三方入口。能公开读取的会显示入口状态；如遇登录、验证码或滑块，请查询人在原网站完成验证。",
    items: results
  });
};
