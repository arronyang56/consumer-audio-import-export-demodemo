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
      "Content-Type": "application/json; charset=utf-8"
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
      city: location.city || ""
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
      city: ""
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

  const response = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await response.text();
  return {
    response,
    data: JSON.parse(text)
  };
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
    return json(200, {
      ok: false,
      fallback: true,
      code: "SHIPXY_KEY_MISSING",
      message: "ShipXY API key is not configured in Netlify environment variables."
    });
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
        return json(200, {
          ok: false,
          fallback: true,
          code: shipnameResult.code,
          message: shipnameResult.message
        });
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
      return json(200, {
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
      return json(200, {
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
      return json(200, {
        ok: false,
        fallback: true,
        code: `SHIPXY_STATUS_${basic.data.status ?? precise.data.status ?? basic.response.status}`,
        message:
          basic.data.msg ||
          basic.data.message ||
          precise.data.msg ||
          precise.data.message ||
          "ShipXY did not return a successful vessel result.",
        status: basic.data.status ?? precise.data.status ?? basic.response.status
      });
    }

    return json(200, {
      ok: true,
      source: "ShipXY GetManyShip",
      fallbackFrom: "GetSingleETAPrecise",
      preciseStatus: precise.data.status ?? precise.response.status,
      updatedAt: new Date().toISOString(),
      result: normalizeManyShip(basic.data)
    });
  } catch (error) {
    return json(200, {
      ok: false,
      fallback: true,
      code: "SHIPXY_REQUEST_FAILED",
      message: error.message || "ShipXY request failed."
    });
  }
};
