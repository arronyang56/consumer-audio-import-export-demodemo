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
  const portcode = clean(params.portcode).toUpperCase().replace(/[^A-Z]/g, "");
  const speed = clean(params.speed).replace(/[^\d.]/g, "");

  if (!/^\d{9}$/.test(mmsi)) {
    return json(200, {
      ok: false,
      fallback: true,
      code: "MMSI_REQUIRED",
      message: "A valid 9-digit MMSI is required for ShipXY precise ETA query."
    });
  }

  const url = new URL(`${SHIPXY_API_BASE}/GetSingleETAPrecise`);
  url.searchParams.set("k", apiKey);
  url.searchParams.set("mmsi", mmsi);
  if (/^[A-Z]{5}$/.test(portcode)) url.searchParams.set("portcode", portcode);
  if (/^\d+(\.\d+)?$/.test(speed)) url.searchParams.set("speed", speed);

  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    const text = await response.text();
    const data = JSON.parse(text);

    if (!response.ok || data.status !== 0) {
      return json(200, {
        ok: false,
        fallback: true,
        code: `SHIPXY_STATUS_${data.status ?? response.status}`,
        message: data.msg || data.message || "ShipXY did not return a successful ETA result.",
        status: data.status ?? response.status
      });
    }

    return json(200, {
      ok: true,
      source: "ShipXY GetSingleETAPrecise",
      updatedAt: new Date().toISOString(),
      result: normalizeShipxyEta(data)
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
