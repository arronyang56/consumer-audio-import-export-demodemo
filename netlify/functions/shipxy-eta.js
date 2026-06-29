const SHIPXY_API_BASE = "https://api.shipxy.com/apicall";

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
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    },
    body: JSON.stringify(body)
  };
}

function clean(value) {
  return String(value || "").trim();
}

function cleanShipName(value) {
  return clean(value).replace(/[^\p{L}\p{N}\s.'-]/gu, "").replace(/\s+/g, " ").slice(0, 80);
}

function decodeHtml(value = "") {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function htmlToText(value = "") {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePortText(value) {
  const raw = clean(value);
  const terms = new Set([raw.toUpperCase().replace(/[^A-Z0-9]/g, "")]);
  if (/上海|shanghai|cnsgh|cnshg/i.test(raw)) ["SHANGHAI", "CNSHG", "CNSHA"].forEach((term) => terms.add(term));
  if (/宁波|舟山|ningbo|zhoushan|cnngb/i.test(raw)) ["NINGBO", "ZHOUSHAN", "CNNGB"].forEach((term) => terms.add(term));
  if (/盐田|深圳|蛇口|yantian|shenzhen|shekou|cnytn/i.test(raw)) ["YANTIAN", "SHENZHEN", "SHEKOU", "CNYTN"].forEach((term) => terms.add(term));
  if (/鹿特丹|rotterdam|nlrtm/i.test(raw)) ["ROTTERDAM", "NLRTM"].forEach((term) => terms.add(term));
  if (/洛杉矶|long beach|los angeles|uslax|uslgb/i.test(raw)) ["LOSANGELES", "LONGBEACH", "USLAX", "USLGB"].forEach((term) => terms.add(term));
  return Array.from(terms).filter(Boolean).join(" ");
}

function hasAnyTerm(haystack = "", needleText = "") {
  return needleText
    .split(/\s+/)
    .filter((term) => term.length > 1)
    .some((term) => haystack.includes(term));
}

function asUnixDate(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return "";
  return new Date(num * 1000).toISOString();
}

function asFlexibleDate(value) {
  if (!value) return "";
  const num = Number(value);
  if (Number.isFinite(num) && num > 0) {
    return new Date(num > 1e12 ? num : num * 1000).toISOString();
  }
  const cleanValue = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?$/.test(cleanValue)) {
    return new Date(`${cleanValue.replace(" ", "T")}Z`).toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function buildFreshness(result = {}, updatedAt = "") {
  const reportedAt = result.lastReportAt || result.position?.updatedAt || updatedAt || "";
  const date = new Date(reportedAt);
  const ageHours = Number.isNaN(date.getTime()) ? null : Math.max(0, (Date.now() - date.getTime()) / 36e5);
  const level = ageHours === null ? "unknown" : ageHours <= 6 ? "live" : ageHours <= 24 ? "recent" : "stale";
  return {
    reportedAt,
    ageHours: ageHours === null ? null : Number(ageHours.toFixed(2)),
    level,
    isFresh: ageHours !== null && ageHours <= 24,
    policy: "船位时间 <=6 小时视为实时/近实时，6-24 小时可参考，>24 小时标记过期；ETA 以船司/码头最新返回为准。"
  };
}

function withFreshness(payload = {}) {
  const result = payload.result || {};
  const updatedAt = payload.updatedAt || new Date().toISOString();
  return {
    ...payload,
    updatedAt,
    freshness: buildFreshness(result, updatedAt)
  };
}

function normalizeShipxyEta(data) {
  const eta = data?.data || {};
  const ship = eta.ship || {};
  const location = eta.location || {};
  const preport = eta.preport || {};
  const nextport = eta.nextport || {};

  return {
    shipName: ship.shipname || "",
    mmsi: ship.mmsi || "",
    imo: ship.imo || "",
    callSign: ship.callsign || "",
    shipType: ship.shiptype_en || ship.shiptype_cn || "",
    position: {
      lon: location.lon ?? "",
      lat: location.lat ?? "",
      speed: location.speed ?? "",
      seaArea: location.seaarea || "",
      city: location.city || "",
      updatedAt: asFlexibleDate(location.lasttime || location.updatetime || "")
    },
    previousPort: {
      code: preport.code || "",
      name: preport.name_en || preport.name_cn || "",
      country: preport.country_en || preport.country_cn || "",
      atd: asUnixDate(preport.atd)
    },
    nextPort: {
      code: nextport.code || "",
      name: nextport.name_en || nextport.name_cn || "",
      country: nextport.country_en || nextport.country_cn || ""
    },
    eta: asUnixDate(eta.eta),
    lastReportAt: asFlexibleDate(location.lasttime || location.updatetime || ""),
    remainingDistanceNm: eta.remainingdistance ?? "",
    sailedDistanceNm: eta.saileddistance ?? "",
    avgSpeedKn: eta.avgspeed ?? eta.avgaisspeed ?? "",
    etaSpeedKn: eta.etaspeed ?? ""
  };
}

function normalizeManyShip(dataOrShip) {
  const ship = Array.isArray(dataOrShip?.data) ? dataOrShip.data[0] || {} : dataOrShip || {};
  const lon = Number(ship.lon);
  const lat = Number(ship.lat);
  const sog = Number(ship.sog);

  return {
    shipName: ship.name || "",
    mmsi: ship.mmsi || ship.ShipID || "",
    imo: ship.imo || "",
    callSign: ship.callsign || "",
    shipType: ship.shiptype || "",
    position: {
      lon: Number.isFinite(lon) ? lon / 1000000 : "",
      lat: Number.isFinite(lat) ? lat / 1000000 : "",
      speed: Number.isFinite(sog) ? sog / 100 : "",
      seaArea: "",
      city: "",
      updatedAt: asFlexibleDate(ship.lasttime || ship.lasttime_std || "")
    },
    previousPort: {
      code: "",
      name: "",
      country: "",
      atd: ""
    },
    nextPort: {
      code: ship.destcode || "",
      name: ship.dest_std || ship.dest || "",
      country: ""
    },
    eta: ship.eta_std || ship.eta || "",
    lastReportAt: asFlexibleDate(ship.lasttime || ship.lasttime_std || ""),
    remainingDistanceNm: "",
    sailedDistanceNm: "",
    avgSpeedKn: "",
    etaSpeedKn: ""
  };
}

function normalizeShipxyWebShip(ship = {}) {
  return {
    shipName: ship.n || "",
    mmsi: clean(ship.m).replace(/\D/g, ""),
    imo: clean(ship.i).replace(/\D/g, ""),
    callSign: ship.c || "",
    shipType: ship.t || "",
    position: {
      lon: "",
      lat: "",
      speed: "",
      seaArea: "",
      city: ""
    },
    previousPort: {
      code: "",
      name: "",
      country: "",
      atd: ""
    },
    nextPort: {
      code: "",
      name: "",
      country: ""
    },
    eta: "",
    remainingDistanceNm: "",
    sailedDistanceNm: "",
    avgSpeedKn: "",
    etaSpeedKn: ""
  };
}

async function callShipxy(path, query) {
  const url = new URL(`${SHIPXY_API_BASE}/${path}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== "") url.searchParams.set(key, value);
  });

  url.searchParams.set("_", String(Date.now()));
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  });
  const text = await response.text();
  return {
    response,
    data: JSON.parse(text)
  };
}

function scoreShipxyWebCandidate(ship, requestedName = "", requestedMmsi = "") {
  const nameNeedle = normalizePortText(requestedName);
  const shipName = normalizePortText(ship.n || "");
  const mmsi = clean(ship.m).replace(/\D/g, "");
  const imo = clean(ship.i).replace(/\D/g, "");
  let score = 0;
  if (requestedMmsi && mmsi === requestedMmsi) score += 100;
  if (requestedMmsi && imo === requestedMmsi) score += 70;
  if (nameNeedle && shipName === nameNeedle) score += 80;
  else if (nameNeedle && (shipName.includes(nameNeedle) || nameNeedle.includes(shipName))) score += 35;
  if (ship.QTY === "srf") score += 8;
  if (imo.length === 7) score += 6;
  return score;
}

async function findShipByShipxyWeb(shipname = "", mmsi = "") {
  const query = cleanShipName(shipname) || clean(mmsi).replace(/\D/g, "");
  if (!query) return { ok: false, code: "SHIPXY_WEB_QUERY_EMPTY", message: "No vessel keyword for ShipXY web search." };

  const url = new URL("https://searchv4.shipxy.com/index.ashx");
  url.searchParams.set("f", "auto");
  url.searchParams.set("kw", query);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Referer: "https://www.shipxy.com/",
      "User-Agent": "Mozilla/5.0 consumer-audio-import-export-demo/1.0"
    }
  });
  const text = await response.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, code: `SHIPXY_WEB_${response.status}`, message: "ShipXY web search returned a non-JSON response." };
  }

  if (!response.ok || data.status !== 0 || !Array.isArray(data.ship) || !data.ship.length) {
    return { ok: false, code: `SHIPXY_WEB_${data.status ?? response.status}`, message: data.msg || "ShipXY web search returned no matching vessels." };
  }

  const ranked = data.ship
    .map((ship) => ({ ship, score: scoreShipxyWebCandidate(ship, shipname, mmsi) }))
    .sort((a, b) => b.score - a.score);

  return {
    ok: true,
    ship: ranked[0].ship,
    candidates: ranked.slice(0, 5).map(({ ship, score }) => ({
      mmsi: clean(ship.m).replace(/\D/g, ""),
      name: ship.n || "",
      imo: clean(ship.i).replace(/\D/g, ""),
      callSign: ship.c || "",
      score: Math.round(score)
    }))
  };
}

function vesselSlug(name = "") {
  return cleanShipName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "vessel";
}

function parseMyShipTracking(html = "") {
  const positionParagraph = html.match(/<p>The current position[\s\S]*?<\/p>/i)?.[0] || "";
  const text = htmlToText(positionParagraph);
  const coords = text.match(/coordinates\s+(-?\d+(?:\.\d+)?)°\s*\/\s*(-?\d+(?:\.\d+)?)°\s+as reported on\s+([0-9:\-\s]+)/i);
  const area = positionParagraph.match(/is in\s+<strong>([^<]+)<\/strong>\s+with coordinates/i)?.[1] || text.match(/current position of\s+.+?\s+is in\s+(.+?)\s+with coordinates/i)?.[1] || "";
  const speed = text.match(/current speed is\s+([\d.]+)\s+Knots/i)?.[1] || "";
  const destination = positionParagraph.match(/heading at the port of\s+<strong>([^<]+)<\/strong>/i)?.[1]?.trim() || text.match(/heading at the port of\s+(.+?)(?:\.|,|$)/i)?.[1]?.trim() || "";
  const etaVisible = positionParagraph.match(/>\s*(\d{4}-\d{2}-\d{2})\s*<b>(\d{2}:\d{2})<\/b><\/span>\s*LT/i);
  const eta = etaVisible ? `${etaVisible[1]} ${etaVisible[2]} LT` : text.match(/estimated time of arrival[\s\S]*?\bis\s+(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})\s+LT/i)?.[1] || "";
  const draught = htmlToText(html.match(/<p>The current draught[\s\S]*?<\/p>/i)?.[0] || "").match(/is\s+([\d.]+)\s+meters/i)?.[1] || "";

  return {
    foundPosition: Boolean(coords),
    lat: coords?.[1] || "",
    lon: coords?.[2] || "",
    reportedAt: coords?.[3]?.trim() || "",
    seaArea: area,
    speed,
    destination,
    eta,
    draught
  };
}

async function scrapeMyShipTracking(ship = {}) {
  const result = normalizeShipxyWebShip(ship);
  const mmsi = result.mmsi;
  const imo = result.imo;
  if (!mmsi || !imo || !result.shipName) {
    return { ok: false, code: "MYSHIPTRACKING_ID_MISSING", message: "MyShipTracking fallback needs vessel name, MMSI and IMO." };
  }

  const url = `https://www.myshiptracking.com/vessels/${vesselSlug(result.shipName)}-mmsi-${mmsi}-imo-${imo}`;
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "Mozilla/5.0 consumer-audio-import-export-demo/1.0"
    }
  });
  const html = await response.text();
  if (!response.ok || /cloudflare|enable cookies|forbidden|blocked/i.test(html.slice(0, 2000))) {
    return { ok: false, code: `MYSHIPTRACKING_${response.status}`, message: "MyShipTracking public page is blocked or unavailable.", url };
  }

  const parsed = parseMyShipTracking(html);
  if (!parsed.foundPosition) {
    return { ok: false, code: "MYSHIPTRACKING_POSITION_EMPTY", message: "MyShipTracking did not expose a current position in the public page.", url };
  }

  result.position = {
    lon: parsed.lon,
    lat: parsed.lat,
    speed: parsed.speed,
    seaArea: parsed.seaArea,
    city: ""
  };
  result.nextPort = {
    code: "",
    name: parsed.destination,
    country: ""
  };
  result.eta = parsed.eta;
  result.draught = parsed.draught;
  result.lastReportAt = asFlexibleDate(parsed.reportedAt);
  result.position.updatedAt = result.lastReportAt;

  return { ok: true, result, url };
}

async function webFallback(shipname = "", mmsi = "", reason = "") {
  let search;
  try {
    search = await findShipByShipxyWeb(shipname, mmsi);
  } catch (error) {
    return {
      ok: false,
      fallback: true,
      code: "SHIPXY_WEB_REQUEST_FAILED",
      message: `${reason ? `${reason}；` : ""}${error.message || "ShipXY web search failed."}`
    };
  }
  if (!search.ok) {
    return {
      ok: false,
      fallback: true,
      code: search.code,
      message: `${reason ? `${reason}；` : ""}${search.message}`
    };
  }

  let scraped;
  try {
    scraped = await scrapeMyShipTracking(search.ship);
  } catch (error) {
    scraped = { ok: false, message: error.message || "MyShipTracking public page failed." };
  }
  if (scraped.ok) {
    return withFreshness({
      ok: true,
      source: "ShipXY Web Search + MyShipTracking public page",
      fallbackFrom: reason || "ShipXY API unavailable",
      updatedAt: new Date().toISOString(),
      result: scraped.result,
      candidates: search.candidates || [],
      sourceLinks: [
        { name: "ShipXY web search", url: "https://www.shipxy.com/" },
        { name: "MyShipTracking public AIS page", url: scraped.url }
      ]
    });
  }

  return withFreshness({
    ok: true,
    source: "ShipXY Web Search",
    fallbackFrom: reason || "ShipXY API unavailable",
    updatedAt: new Date().toISOString(),
    result: normalizeShipxyWebShip(search.ship),
    candidates: search.candidates || [],
    sourceLinks: [{ name: "ShipXY web search", url: "https://www.shipxy.com/" }],
    warning: scraped.message || "Only vessel identity was available from public web search."
  });
}

function scoreShipCandidate(ship, requestedName = "", destination = "", portcode = "") {
  const nameNeedle = normalizePortText(requestedName);
  const destNeedle = normalizePortText(destination);
  const portNeedle = normalizePortText(portcode);
  const shipName = normalizePortText(ship.name);
  const shipDest = normalizePortText(`${ship.dest_std || ""} ${ship.dest || ""} ${ship.destcode || ""}`);
  let score = 0;

  if (shipName === nameNeedle) score += 85;
  else if (shipName.startsWith(nameNeedle) || nameNeedle.startsWith(shipName)) score += 45;
  else if (shipName.includes(nameNeedle) || nameNeedle.includes(shipName)) score += 30;
  if (portNeedle && hasAnyTerm(shipDest, portNeedle)) score += 20;
  if (destNeedle && hasAnyTerm(shipDest, destNeedle)) score += 18;
  score += Math.min(10, Math.max(0, Number(ship.lasttime) || 0) / 200000000);
  return score;
}

async function findShipByName(apiKey, shipname, destination, portcode) {
  const search = await callShipxy("SearchShip", {
    k: apiKey,
    kw: shipname,
    enc: "1"
  });

  if (!search.response.ok || search.data.status !== 0 || !Array.isArray(search.data.data) || !search.data.data.length) {
    return {
      ok: false,
      code: `SHIPXY_SEARCH_${search.data.status ?? search.response.status}`,
      message: search.data.msg || search.data.message || "ShipXY did not return matching ships."
    };
  }

  const ids = search.data.data
    .map((item) => clean(item.mmsi || item.ShipID).replace(/\D/g, ""))
    .filter((item) => /^\d{9}$/.test(item))
    .slice(0, 8);

  if (!ids.length) {
    return { ok: false, code: "SHIPXY_SEARCH_EMPTY", message: "ShipXY search did not return a valid MMSI." };
  }

  const many = await callShipxy("GetManyShip", {
    v: "2",
    k: apiKey,
    enc: "1",
    id: ids.join(",")
  });

  if (!many.response.ok || many.data.status !== 0 || !Array.isArray(many.data.data) || !many.data.data.length) {
    return {
      ok: false,
      code: `SHIPXY_STATUS_${many.data.status ?? many.response.status}`,
      message: many.data.msg || many.data.message || "ShipXY did not return vessel details."
    };
  }

  const ranked = many.data.data
    .map((ship) => ({
      ship,
      score: scoreShipCandidate(ship, shipname, destination, portcode)
    }))
    .sort((a, b) => b.score - a.score);

  return {
    ok: true,
    ship: ranked[0].ship,
    candidates: ranked.slice(0, 5).map(({ ship, score }) => ({
      mmsi: ship.mmsi || ship.ShipID || "",
      name: ship.name || "",
      dest: ship.dest_std || ship.dest || "",
      eta: ship.eta_std || ship.eta || "",
      score: Math.round(score)
    }))
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const apiKey = process.env.SHIPXY_API_KEY || process.env.SHIPXY_KEY;
  if (!apiKey) {
    const params = event.queryStringParameters || {};
    const fallback = await webFallback(params.shipname || params.vessel || params.name || "", clean(params.mmsi).replace(/\D/g, ""), "ShipXY API key is not configured.");
    return json(200, fallback);
  }

  const params = event.queryStringParameters || {};
  const mmsi = clean(params.mmsi).replace(/\D/g, "");
  const shipname = cleanShipName(params.shipname || params.vessel || params.name);
  const destination = clean(params.destination || params.dest || "");
  const portcode = clean(params.portcode).toUpperCase().replace(/[^A-Z]/g, "");
  const speed = clean(params.speed).replace(/[^\d.]/g, "");

  if (!/^\d{9}$/.test(mmsi) && !shipname) {
    return json(200, {
      ok: false,
      fallback: true,
      code: "VESSEL_REQUIRED",
      message: "A vessel name or a valid 9-digit MMSI is required for ShipXY query."
    });
  }

  try {
    let targetMmsi = mmsi;
    let shipnameResult = null;

    if (!/^\d{9}$/.test(targetMmsi)) {
      shipnameResult = await findShipByName(apiKey, shipname, destination, portcode);
      if (!shipnameResult.ok) {
        return json(200, await webFallback(shipname, mmsi, shipnameResult.message));
      }
      targetMmsi = clean(shipnameResult.ship.mmsi || shipnameResult.ship.ShipID).replace(/\D/g, "");
    }

    const precise = await callShipxy("GetSingleETAPrecise", {
      k: apiKey,
      mmsi: targetMmsi,
      portcode: /^[A-Z]{5}$/.test(portcode) ? portcode : "",
      speed: /^\d+(\.\d+)?$/.test(speed) ? speed : ""
    });

    if (precise.response.ok && precise.data.status === 0) {
      return json(200, withFreshness({
        ok: true,
        source: "ShipXY GetSingleETAPrecise",
        updatedAt: new Date().toISOString(),
        result: normalizeShipxyEta(precise.data)
      }));
    }

    const basic = await callShipxy("GetManyShip", {
      v: "2",
      k: apiKey,
      enc: "1",
      id: targetMmsi
    });

    if (shipnameResult?.ship) {
      return json(200, withFreshness({
        ok: true,
        source: "ShipXY SearchShip + GetManyShip",
        fallbackFrom: "GetSingleETAPrecise",
        preciseStatus: precise.data.status ?? precise.response.status,
        updatedAt: new Date().toISOString(),
        result: normalizeManyShip(shipnameResult.ship),
        candidates: shipnameResult.candidates || []
      }));
    }

    if (!basic.response.ok || basic.data.status !== 0 || !Array.isArray(basic.data.data) || !basic.data.data.length) {
      const reason =
        basic.data.msg ||
        basic.data.message ||
        precise.data.msg ||
        precise.data.message ||
        "ShipXY did not return a successful vessel result.";
      return json(200, await webFallback(shipname, targetMmsi, reason));
    }

    return json(200, withFreshness({
      ok: true,
      source: "ShipXY GetManyShip",
      fallbackFrom: "GetSingleETAPrecise",
      preciseStatus: precise.data.status ?? precise.response.status,
      updatedAt: new Date().toISOString(),
      result: normalizeManyShip(basic.data)
    }));
  } catch (error) {
    return json(200, await webFallback(shipname, mmsi, error.message || "ShipXY request failed."));
  }
};
