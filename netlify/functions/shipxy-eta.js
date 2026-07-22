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

function hasVesselPosition(result = {}) {
  return Number.isFinite(Number(result.position?.lat)) && Number.isFinite(Number(result.position?.lon));
}

function providerScore(payload = {}) {
  if (!payload?.ok) return -1000;
  const freshness = payload.freshness || buildFreshness(payload.result || {}, payload.updatedAt || "");
  let score = hasVesselPosition(payload.result) ? 60 : 0;
  if (freshness.level === "live") score += 40;
  else if (freshness.level === "recent") score += 25;
  else if (freshness.level === "stale") score -= 30;
  if (payload.result?.eta) score += 8;
  if (payload.result?.mmsi || payload.result?.imo) score += 5;
  return score - Math.min(20, Number(freshness.ageHours || 0) / 6);
}

function normalizeVesselFinder(data = {}) {
  const ais = data.AIS || {};
  const voyage = data.VOYAGE || {};
  return {
    shipName: ais.NAME || "",
    mmsi: ais.MMSI || "",
    imo: ais.IMO || "",
    callSign: ais.CALLSIGN || "",
    shipType: ais.TYPE || "",
    position: {
      lon: ais.LONGITUDE ?? "",
      lat: ais.LATITUDE ?? "",
      speed: ais.SPEED ?? "",
      seaArea: ais.ZONE || "",
      city: "",
      updatedAt: asFlexibleDate(ais.TIMESTAMP || "")
    },
    previousPort: {
      code: voyage.LOCODE || "",
      name: voyage.LASTPORT || "",
      country: voyage.LASTCOUNTRY || "",
      atd: asFlexibleDate(voyage.DEPARTURE || "")
    },
    nextPort: { code: ais.LOCODE || "", name: ais.DESTINATION || "", country: "" },
    eta: asFlexibleDate(ais.ETA || ""),
    lastReportAt: asFlexibleDate(ais.TIMESTAMP || ""),
    remainingDistanceNm: "",
    sailedDistanceNm: "",
    avgSpeedKn: "",
    etaSpeedKn: ""
  };
}

async function queryVesselFinder(params = {}, identity = {}) {
  const apiKey = process.env.VESSELFINDER_API_KEY || "";
  const mmsi = clean(identity.mmsi || params.mmsi).replace(/\D/g, "");
  const imo = clean(identity.imo || params.imo).replace(/\D/g, "");
  if (!apiKey || (!/^\d{9}$/.test(mmsi) && !/^\d{7}$/.test(imo))) return null;
  const url = new URL("https://api.vesselfinder.com/vessels");
  url.searchParams.set("userkey", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("interval", "1440");
  url.searchParams.set("extradata", "voyage");
  if (process.env.VESSELFINDER_SATELLITE === "true") url.searchParams.set("sat", "1");
  if (/^\d{9}$/.test(mmsi)) url.searchParams.set("mmsi", mmsi);
  else url.searchParams.set("imo", imo);
  const response = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  const data = await response.json();
  if (!response.ok || !Array.isArray(data) || !data[0]?.AIS) throw new Error(data?.error || "VesselFinder returned no position within 24 hours.");
  return withFreshness({
    ok: true,
    source: "VesselFinder Vessels API",
    updatedAt: new Date().toISOString(),
    result: normalizeVesselFinder(data[0]),
    sourceLinks: [{ name: "VesselFinder API", url: "https://api.vesselfinder.com/docs/vessels.html" }]
  });
}

function normalizeMarineTraffic(row = {}) {
  return {
    shipName: row.SHIPNAME || "",
    mmsi: row.MMSI || "",
    imo: row.IMO || "",
    callSign: row.CALLSIGN || "",
    shipType: row.TYPE_NAME || row.SHIPTYPE || "",
    position: {
      lon: row.LON ?? "",
      lat: row.LAT ?? "",
      speed: Number.isFinite(Number(row.SPEED)) ? Number(row.SPEED) / 10 : "",
      seaArea: row.MARKET || "",
      city: row.CURRENT_PORT || "",
      updatedAt: asFlexibleDate(row.TIMESTAMP || "")
    },
    previousPort: {
      code: row.LAST_PORT_UNLOCODE || "",
      name: row.LAST_PORT || "",
      country: row.LAST_PORT_COUNTRY || "",
      atd: asFlexibleDate(row.LAST_PORT_TIME || "")
    },
    nextPort: {
      code: row.NEXT_PORT_UNLOCODE || "",
      name: row.NEXT_PORT_NAME || row.DESTINATION || "",
      country: row.NEXT_PORT_COUNTRY || ""
    },
    eta: asFlexibleDate(row.ETA_CALC || row.ETA || ""),
    lastReportAt: asFlexibleDate(row.TIMESTAMP || ""),
    remainingDistanceNm: row.DISTANCE_TO_GO || "",
    sailedDistanceNm: row.DISTANCE_TRAVELLED || "",
    avgSpeedKn: row.AVG_SPEED || "",
    etaSpeedKn: ""
  };
}

async function queryMarineTraffic(params = {}, identity = {}) {
  const apiKey = process.env.MARINETRAFFIC_API_KEY || "";
  const mmsi = clean(identity.mmsi || params.mmsi).replace(/\D/g, "");
  const imo = clean(identity.imo || params.imo).replace(/\D/g, "");
  if (!apiKey || (!/^\d{9}$/.test(mmsi) && !/^\d{7}$/.test(imo))) return null;
  const url = new URL(`https://services.marinetraffic.com/api/exportvessel/${encodeURIComponent(apiKey)}`);
  url.searchParams.set("v", "6");
  url.searchParams.set("timespan", "1440");
  url.searchParams.set("protocol", "jsono");
  if (/^\d{9}$/.test(mmsi)) url.searchParams.set("mmsi", mmsi);
  else url.searchParams.set("imo", imo);
  const response = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  const data = await response.json();
  const row = Array.isArray(data) ? data[0] : data?.DATA?.[0];
  if (!response.ok || !row) throw new Error("MarineTraffic returned no position within 24 hours.");
  return withFreshness({
    ok: true,
    source: "MarineTraffic Single Vessel Positions API",
    updatedAt: new Date().toISOString(),
    result: normalizeMarineTraffic(row),
    sourceLinks: [{ name: "MarineTraffic AIS API", url: "https://servicedocs.marinetraffic.com/" }]
  });
}

function normalizeShipFinder(data = {}) {
  return {
    shipName: data.ship_name || data.ship_cnname || "",
    mmsi: data.mmsi || "",
    imo: data.imo || "",
    callSign: data.call_sign || "",
    shipType: data.ship_type || "",
    position: {
      lon: data.lng ?? "",
      lat: data.lat ?? "",
      speed: data.sog ?? "",
      seaArea: "",
      city: "",
      updatedAt: asUnixDate(data.last_time)
    },
    previousPort: { code: "", name: "", country: "", atd: "" },
    nextPort: { code: data.destcode || "", name: data.dest || "", country: "" },
    eta: asUnixDate(data.eta),
    lastReportAt: asUnixDate(data.last_time),
    remainingDistanceNm: "",
    sailedDistanceNm: "",
    avgSpeedKn: "",
    etaSpeedKn: ""
  };
}

async function queryShipFinder(params = {}, identity = {}) {
  const apiKey = process.env.SHIPFINDER_API_KEY || "";
  const mmsi = clean(identity.mmsi || params.mmsi).replace(/\D/g, "");
  if (!apiKey || !/^\d{9}$/.test(mmsi)) return null;
  const url = new URL("https://api.elaneglobal.com/v1/AIS/VesselPositionSingle");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("mmsi", mmsi);
  const response = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  const body = await response.json();
  if (!response.ok || Number(body.status) !== 0 || !body.data) throw new Error(body.msg || "ShipFinder returned no vessel position.");
  return withFreshness({
    ok: true,
    source: "ShipFinder Single Vessel Position API",
    updatedAt: new Date().toISOString(),
    result: normalizeShipFinder(body.data),
    sourceLinks: [{ name: "ShipFinder API", url: "https://docs.shipfinder.com/428990613e0" }]
  });
}

async function queryAisstream(params = {}, identity = {}) {
  const apiKey = process.env.AISSTREAM_API_KEY || "";
  const mmsi = clean(identity.mmsi || params.mmsi).replace(/\D/g, "");
  if (!apiKey || !/^\d{9}$/.test(mmsi) || typeof WebSocket !== "function") return null;
  return new Promise((resolve, reject) => {
    const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
    const timer = setTimeout(() => {
      socket.close();
      reject(new Error("AISstream did not receive a new position during the live query window."));
    }, 8000);
    socket.onopen = () => socket.send(JSON.stringify({
      APIKey: apiKey,
      BoundingBoxes: [[[-90, -180], [90, 180]]],
      FiltersShipMMSI: [mmsi],
      FilterMessageTypes: ["PositionReport", "ExtendedClassBPositionReport", "StandardClassBPositionReport"]
    }));
    socket.onerror = () => {
      clearTimeout(timer);
      reject(new Error("AISstream connection failed."));
    };
    socket.onmessage = (event) => {
      let message;
      try {
        message = JSON.parse(String(event.data || "{}"));
      } catch {
        return;
      }
      const body = message.Message?.[message.MessageType] || {};
      const metadata = message.MetaData || message.Metadata || {};
      const lat = body.Latitude ?? metadata.latitude ?? metadata.Latitude;
      const lon = body.Longitude ?? metadata.longitude ?? metadata.Longitude;
      if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return;
      clearTimeout(timer);
      socket.close();
      const reportedAt = asFlexibleDate(metadata.time_utc || metadata.TimeUtc || new Date().toISOString());
      resolve(withFreshness({
        ok: true,
        source: "AISstream live WebSocket",
        updatedAt: new Date().toISOString(),
        result: {
          shipName: metadata.ShipName || identity.shipName || params.shipname || "",
          mmsi,
          imo: identity.imo || "",
          callSign: "",
          shipType: "",
          position: { lon, lat, speed: body.Sog ?? "", seaArea: "", city: "", updatedAt: reportedAt },
          previousPort: { code: "", name: "", country: "", atd: "" },
          nextPort: { code: "", name: "", country: "" },
          eta: "",
          lastReportAt: reportedAt,
          remainingDistanceNm: "",
          sailedDistanceNm: "",
          avgSpeedKn: "",
          etaSpeedKn: ""
        },
        sourceLinks: [{ name: "AISstream", url: "https://aisstream.io/documentation.html" }]
      }));
    };
  });
}

async function queryPublicAisPage(params = {}, identity = {}) {
  let ship = {
    n: identity.shipName || params.shipname || params.vessel || params.name || "",
    m: identity.mmsi || params.mmsi || "",
    i: identity.imo || params.imo || ""
  };
  if (!ship.n || !/^\d{9}$/.test(clean(ship.m).replace(/\D/g, "")) || !/^\d{7}$/.test(clean(ship.i).replace(/\D/g, ""))) {
    const search = await findShipByShipxyWeb(ship.n, clean(ship.m).replace(/\D/g, ""));
    if (!search.ok) throw new Error(search.message || "Public AIS identity search failed.");
    ship = search.ship;
  }
  const scraped = await scrapeMyShipTracking(ship);
  if (!scraped.ok) throw new Error(scraped.message || "Public AIS page returned no position.");
  return withFreshness({
    ok: true,
    source: "MyShipTracking public AIS page",
    updatedAt: new Date().toISOString(),
    result: scraped.result,
    sourceLinks: [{ name: "MyShipTracking", url: scraped.url }]
  });
}

async function queryShipxyPrimary(params = {}) {
  const apiKey = process.env.SHIPXY_API_KEY || process.env.SHIPXY_KEY;
  const mmsi = clean(params.mmsi).replace(/\D/g, "");
  const shipname = cleanShipName(params.shipname || params.vessel || params.name);
  const destination = clean(params.destination || params.dest || "");
  const portcode = clean(params.portcode).toUpperCase().replace(/[^A-Z]/g, "");
  const speed = clean(params.speed).replace(/[^\d.]/g, "");

  if (!/^\d{9}$/.test(mmsi) && !shipname) {
    return {
      ok: false,
      fallback: true,
      code: "VESSEL_REQUIRED",
      message: "A vessel name or a valid 9-digit MMSI is required for vessel query."
    };
  }
  if (!apiKey) {
    return webFallback(shipname, mmsi, "ShipXY API key is not configured.");
  }

  try {
    let targetMmsi = mmsi;
    let shipnameResult = null;

    if (!/^\d{9}$/.test(targetMmsi)) {
      shipnameResult = await findShipByName(apiKey, shipname, destination, portcode);
      if (!shipnameResult.ok) {
        return webFallback(shipname, mmsi, shipnameResult.message);
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
      return withFreshness({
        ok: true,
        source: "ShipXY GetSingleETAPrecise",
        updatedAt: new Date().toISOString(),
        result: normalizeShipxyEta(precise.data)
      });
    }

    const basic = await callShipxy("GetManyShip", {
      v: "2",
      k: apiKey,
      enc: "1",
      id: targetMmsi
    });

    if (shipnameResult?.ship) {
      return withFreshness({
        ok: true,
        source: "ShipXY SearchShip + GetManyShip",
        fallbackFrom: "GetSingleETAPrecise",
        preciseStatus: precise.data.status ?? precise.response.status,
        updatedAt: new Date().toISOString(),
        result: normalizeManyShip(shipnameResult.ship),
        candidates: shipnameResult.candidates || []
      });
    }

    if (!basic.response.ok || basic.data.status !== 0 || !Array.isArray(basic.data.data) || !basic.data.data.length) {
      const reason =
        basic.data.msg ||
        basic.data.message ||
        precise.data.msg ||
        precise.data.message ||
        "ShipXY did not return a successful vessel result.";
      return webFallback(shipname, targetMmsi, reason);
    }

    return withFreshness({
      ok: true,
      source: "ShipXY GetManyShip",
      fallbackFrom: "GetSingleETAPrecise",
      preciseStatus: precise.data.status ?? precise.response.status,
      updatedAt: new Date().toISOString(),
      result: normalizeManyShip(basic.data)
    });
  } catch (error) {
    return webFallback(shipname, mmsi, error.message || "ShipXY request failed.");
  }
}

async function queryVesselMultiSource(params = {}) {
  const primary = await queryShipxyPrimary(params);
  const primaryFresh = primary?.ok && primary.freshness?.isFresh && hasVesselPosition(primary.result);
  if (primaryFresh) {
    return { ...primary, automaticSourceSelection: true, sourceChain: [{ source: primary.source, status: primary.freshness.level, selected: true }] };
  }

  const identity = {
    mmsi: primary?.result?.mmsi || params.mmsi || "",
    imo: primary?.result?.imo || params.imo || "",
    shipName: primary?.result?.shipName || params.shipname || params.vessel || params.name || ""
  };
  const providers = [
    ["ShipFinder API", queryShipFinder],
    ["VesselFinder API", queryVesselFinder],
    ["MarineTraffic API", queryMarineTraffic],
    ["AISstream", queryAisstream],
    ["Public AIS page", queryPublicAisPage]
  ];
  const settled = await Promise.allSettled(providers.map(([, provider]) => provider(params, identity)));
  const alternatives = settled
    .map((outcome) => outcome.status === "fulfilled" ? outcome.value : null)
    .filter(Boolean);
  const candidates = [primary, ...alternatives].filter(Boolean).sort((a, b) => providerScore(b) - providerScore(a));
  const selected = candidates[0] || primary || { ok: false, message: "No vessel data source returned a usable result." };
  const sourceChain = [
    primary ? { source: primary.source || "ShipXY", status: primary.freshness?.level || (primary.ok ? "identity-only" : "failed"), selected: selected === primary } : null,
    ...providers.map(([source], index) => {
      const outcome = settled[index];
      if (outcome.status === "rejected") return { source, status: "failed", selected: false };
      if (!outcome.value) return { source, status: "not-configured", selected: false };
      return { source: outcome.value.source || source, status: outcome.value.freshness?.level || "returned", selected: selected === outcome.value };
    })
  ].filter(Boolean);
  return {
    ...selected,
    automaticSourceSelection: true,
    automaticFallbackUsed: selected !== primary,
    sourceChain,
    fallbackFrom: selected !== primary ? `${primary?.source || "primary source"} did not return a fresh position` : selected.fallbackFrom
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });
  return json(200, await queryVesselMultiSource(event.queryStringParameters || {}));
};

exports._test = {
  buildFreshness,
  providerScore,
  normalizeVesselFinder,
  normalizeMarineTraffic,
  normalizeShipFinder,
  queryVesselMultiSource
};
