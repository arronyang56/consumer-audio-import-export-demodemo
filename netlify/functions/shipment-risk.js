const https = require("https");
const { portCoordinates, findPortCoordinate } = require("./lib/port-coordinates");

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
  return String(value || "").trim().slice(0, 160);
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalize(value = "") {
  return clean(value).toLowerCase().replace(/\s+/g, "");
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "consumer-audio-import-export-demo/1.0"
        },
        timeout: 12000
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          try {
            resolve({ ok: response.statusCode >= 200 && response.statusCode < 300, status: response.statusCode, data: JSON.parse(body) });
          } catch (error) {
            reject(new Error(`Non-JSON response (${response.statusCode || "unknown"})`));
          }
        });
      }
    );
    request.on("timeout", () => request.destroy(new Error("request timed out")));
    request.on("error", reject);
  });
}

function seaRegion(lat, lon, destination = "") {
  if (lat >= 18 && lat <= 26 && lon >= 112 && lon <= 122) return "南海北部/华南沿海";
  if (lat >= 24 && lat <= 32 && lon >= 119 && lon <= 130) return "东海/日本西南航线";
  if (lat >= 1 && lat <= 8 && lon >= 98 && lon <= 106) return "马六甲海峡/新加坡附近";
  if (lat >= 8 && lat <= 18 && lon >= 100 && lon <= 112) return "泰国湾/越南南部附近";
  if (lat >= 5 && lat <= 22 && lon >= 110 && lon <= 123) return "南海中部航线";
  if (lat >= 25 && lat <= 42 && lon >= 120 && lon <= 145) return "日本/韩国近海";
  const text = normalize(destination);
  if (text.includes("上海") || text.includes("shanghai")) return "当前位置不在亚洲近海；目的港为上海，进港段需另看东海/长江口风险";
  return "公开 AIS 坐标附近海域";
}

function seasonalRisk(region = "", date = new Date()) {
  const month = date.getUTCMonth() + 1;
  if (/南海|东海|日本|华南|长江口/.test(region)) {
    if (month >= 7 && month <= 10) return { level: "中高", summary: "当前处于西北太平洋/南海台风高发季，需重点关注台风、强对流、港口临时管制和绕航。" };
    if (month >= 5 && month <= 6) return { level: "中", summary: "当前接近华南前汛期/台风季前段，暴雨、强对流和季风增强可能影响靠泊窗口。" };
    return { level: "常规", summary: "当前不是主要台风高峰期，但仍需看实时海况、港口风控和浓雾/大风预警。" };
  }
  if (/马六甲|新加坡|泰国湾|越南/.test(region)) {
    if (month >= 5 && month <= 10) return { level: "中", summary: "东南亚雨季期间，雷暴、强降雨和短时大风会影响港口作业效率，但通常更偏短时波动。" };
    return { level: "常规", summary: "当前东南亚航线季节性天气风险相对常规，仍需关注雷暴和局地强降雨。" };
  }
  return { level: "观察", summary: "该海域暂无内置季节模型，只按实时海况和新闻风险做判断。" };
}

function maxValue(values = []) {
  const nums = values.map(Number).filter(Number.isFinite);
  return nums.length ? Math.max(...nums) : null;
}

function summarizeWeather(marine = {}, weather = {}) {
  const available = Boolean(
    Object.keys(marine.current || {}).length
    || Object.keys(marine.hourly || {}).length
    || Object.keys(weather.current || {}).length
    || Object.keys(weather.hourly || {}).length
  );
  if (!available) {
    return {
      level: "未取得实时数据",
      available: false,
      summary: "天气和海况接口本次没有返回有效数值，因此不能据此判断航速、靠泊或 ETA 影响。",
      points: []
    };
  }
  const currentMarine = marine.current || {};
  const currentWeather = weather.current || {};
  const waveNow = toNumber(currentMarine.wave_height);
  const waveMax = maxValue(marine.hourly?.wave_height || []);
  const gustNow = toNumber(currentWeather.wind_gusts_10m);
  const gustMax = maxValue(weather.hourly?.wind_gusts_10m || []);
  const precipMax = maxValue(weather.hourly?.precipitation || []);
  const wave = waveMax ?? waveNow;
  const gust = gustMax ?? gustNow;

  let level = "常规";
  const points = [];
  if (wave !== null) points.push(`未来约72小时最大浪高约 ${wave.toFixed(1)} m`);
  if (gust !== null) points.push(`最大阵风约 ${gust.toFixed(0)} km/h`);
  if (precipMax !== null) points.push(`小时降雨峰值约 ${precipMax.toFixed(1)} mm`);
  if ((wave ?? 0) >= 4 || (gust ?? 0) >= 62) level = "高";
  else if ((wave ?? 0) >= 2.5 || (gust ?? 0) >= 40 || (precipMax ?? 0) >= 10) level = "中";
  const summary = level === "高"
    ? "海况/风力已经达到较高关注，ETA 有延误或港口作业窗口变化风险。"
    : level === "中"
      ? "海况或降雨存在中等波动，可能影响靠泊、引航、码头作业或船速。"
      : "当前公开海况预报未显示明显恶劣天气信号，对 ETA 的直接影响偏低。";
  return { level, available: true, summary, points };
}

function gdeltQueryForRegion(region = "", destination = "") {
  const base = [region, destination].join(" ");
  if (/南海|华南|上海|东海|长江|中国/.test(base)) return '"South China Sea" OR "East China Sea" OR "Taiwan Strait" OR Shanghai';
  if (/马六甲|新加坡/.test(base)) return '"Malacca Strait" OR Singapore';
  if (/泰国湾|越南|林查班/.test(base)) return '"Gulf of Thailand" OR "South China Sea" OR Vietnam OR Thailand';
  return '"military exercise" OR naval OR blockade OR "shipping lane"';
}

function routeNewsTerms(region = "", destination = "", destinationPort = null) {
  const base = `${region} ${destination}`;
  const terms = [destination, destinationPort?.name, destinationPort?.code, ...(destinationPort?.aliases || [])];
  if (/南海|华南|台湾海峡|中国/.test(base)) terms.push("South China Sea", "Taiwan Strait", "East China Sea", "China", "南海", "台湾海峡", "东海");
  if (/东海|日本|韩国/.test(base)) terms.push("East China Sea", "Yellow Sea", "Japan", "Korea", "东海", "黄海", "日本", "韩国");
  if (/马六甲|新加坡/.test(base)) terms.push("Malacca Strait", "Singapore", "马六甲", "新加坡");
  if (/泰国湾|越南|林查班/.test(base)) terms.push("Gulf of Thailand", "Vietnam", "Thailand", "South China Sea", "泰国湾", "越南", "泰国");
  if (/红海|苏伊士|亚丁湾/.test(base)) terms.push("Red Sea", "Suez", "Gulf of Aden", "红海", "苏伊士", "亚丁湾");
  return [...new Set(terms.map(normalize).filter((term) => term.length >= 3))];
}

function filterRouteRelevantNews(items = [], region = "", destination = "", destinationPort = null) {
  const terms = routeNewsTerms(region, destination, destinationPort);
  if (!terms.length) return [];
  return items.filter((item) => {
    const text = normalize(`${item.title || ""} ${item.description || ""} ${item.domain || ""}`);
    const areaHit = terms.some((term) => text.includes(term));
    const controlHit = /militaryexercise|navaldrill|livefire|livefiring|blockade|missile|navigationwarning|restrictedarea|shippinglane|军演|军事演习|实弹|封锁|禁航|航行警告|限制区/.test(text);
    return areaHit && controlHit;
  });
}

function classifyMilitary(items = []) {
  const text = items.map((item) => `${item.title || ""} ${item.domain || ""}`).join(" ").toLowerCase();
  const hit = /military exercise|naval drill|live fire|blockade|missile|军演|演习|封锁|禁航/.test(text);
  return {
    level: hit ? "待官方核实" : "未见航线相关信号",
    confirmed: false,
    summary: hit
      ? "过去一周公开新闻中出现同时命中航线区域和管制关键词的线索，但未取得航行警告或船司绕航通知前，不把它作为 ETA 延误事实。"
      : "过去一周公开新闻未抓到同时命中航线区域和管制关键词的信号；未命中的全球新闻不参与判断。"
  };
}

function buildEtaImpact(weatherRisk, seasonal, military) {
  if (!weatherRisk.available) {
    return military.level === "待官方核实"
      ? "ETA 影响判断：未取得实时天气海况；虽有航线相关安全新闻线索，但尚无官方航警或船司通知，本次不增加延误天数。"
      : "ETA 影响判断：未取得实时天气海况或已确认的管制证据，本次不判断 ETA 是否受影响。";
  }
  if (weatherRisk.level === "高") return "ETA 影响判断：天气海况可能直接影响航速、靠泊或港口作业，建议把 ETA 风险提高一级。";
  if (military.level === "待官方核实") return "ETA 影响判断：发现航线相关安全新闻线索，但未获官方航警或船司通知确认，当前不据此增加延误天数。";
  if (weatherRisk.level === "中" || seasonal.level === "中高") return "ETA 影响判断：存在中等波动，建议关注未来24-72小时船位更新和目的港靠泊窗口。";
  return "ETA 影响判断：当前公开天气和新闻信号未显示明显延误压力，仍按实时船位和船司 ETA 跟踪。";
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const params = event.queryStringParameters || {};
  const lat = toNumber(params.lat);
  const lon = toNumber(params.lon);
  const destination = clean(params.destination);
  const destPort = findPortCoordinate(destination);
  const fallbackPoint = destPort || null;
  const point = lat !== null && lon !== null ? { lat, lon, source: "船舶当前位置" } : fallbackPoint ? { lat: fallbackPoint.lat, lon: fallbackPoint.lon, source: "目的港附近" } : null;
  if (!point) return json(200, { ok: false, message: "没有船舶坐标，也没有识别到目的港坐标，暂不能判断航线天气和海域风险。" });

  const region = seaRegion(point.lat, point.lon, destination);
  const marineUrl = new URL("https://marine-api.open-meteo.com/v1/marine");
  marineUrl.searchParams.set("latitude", String(point.lat));
  marineUrl.searchParams.set("longitude", String(point.lon));
  marineUrl.searchParams.set("current", "wave_height,wave_direction,wave_period,wind_wave_height,swell_wave_height,ocean_current_velocity,ocean_current_direction,sea_surface_temperature");
  marineUrl.searchParams.set("hourly", "wave_height,wind_wave_height,swell_wave_height,wave_period");
  marineUrl.searchParams.set("forecast_days", "3");
  marineUrl.searchParams.set("timezone", "auto");

  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", String(point.lat));
  weatherUrl.searchParams.set("longitude", String(point.lon));
  weatherUrl.searchParams.set("current", "wind_speed_10m,wind_gusts_10m,precipitation,rain,weather_code");
  weatherUrl.searchParams.set("hourly", "wind_speed_10m,wind_gusts_10m,precipitation,precipitation_probability");
  weatherUrl.searchParams.set("forecast_days", "3");
  weatherUrl.searchParams.set("timezone", "auto");

  const gdeltUrl = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  gdeltUrl.searchParams.set("query", `(${gdeltQueryForRegion(region, destination)}) (military OR naval OR exercise OR drill OR live-fire OR blockade OR shipping)`);
  gdeltUrl.searchParams.set("mode", "ArtList");
  gdeltUrl.searchParams.set("maxrecords", "8");
  gdeltUrl.searchParams.set("format", "json");
  gdeltUrl.searchParams.set("timespan", "7d");
  gdeltUrl.searchParams.set("sort", "DateDesc");

  const [marineResult, weatherResult, gdeltResult] = await Promise.allSettled([getJson(marineUrl), getJson(weatherUrl), getJson(gdeltUrl)]);
  const marine = marineResult.status === "fulfilled" && marineResult.value.ok ? marineResult.value.data : {};
  const weather = weatherResult.status === "fulfilled" && weatherResult.value.ok ? weatherResult.value.data : {};
  const rawNewsItems = gdeltResult.status === "fulfilled" && gdeltResult.value.ok && Array.isArray(gdeltResult.value.data.articles)
    ? gdeltResult.value.data.articles.slice(0, 5).map((item) => ({
        title: item.title || "",
        url: item.url || "",
        domain: item.domain || "",
        seendate: item.seendate || "",
        description: item.description || ""
      }))
    : [];
  const newsItems = filterRouteRelevantNews(rawNewsItems, region, destination, destPort);
  const weatherRisk = summarizeWeather(marine, weather);
  const seasonal = seasonalRisk(region, new Date());
  const military = classifyMilitary(newsItems);
  const conclusion = buildEtaImpact(weatherRisk, seasonal, military);

  return json(200, {
    ok: true,
    source: "Open-Meteo Marine/Weather + GDELT DOC",
    updatedAt: new Date().toISOString(),
    coordinateSource: point.source,
    coordinateNote: point.source === "目的港附近" ? "使用港口附近海域采样点，只用于区域天气/海况，不代表泊位或船舶实时位置。" : "使用船舶当前位置采样。",
    coverage: {
      portCoordinateCount: portCoordinates.length,
      destinationRecognized: Boolean(destPort),
      destinationCode: destPort?.code || "",
      destinationName: destPort?.name || ""
    },
    region,
    destination,
    conclusion,
    weather: weatherRisk,
    seasonal,
    military: { ...military, items: newsItems, rawCount: rawNewsItems.length, routeMatchedCount: newsItems.length },
    sourceAvailability: {
      marineWeather: marineResult.status === "fulfilled" && Boolean(marineResult.value.ok),
      surfaceWeather: weatherResult.status === "fulfilled" && Boolean(weatherResult.value.ok),
      newsDiscovery: gdeltResult.status === "fulfilled" && Boolean(gdeltResult.value.ok)
    },
    nextInputs: [
      "MMSI/IMO 可提升船位准确度。",
      "箱号或提单号可进一步查码头/船司最新节点。",
      "若 ETA 用于客户承诺，建议补船司、航次和订舱号。"
    ],
    sources: [
      ["Open-Meteo Marine Weather API", "https://open-meteo.com/en/docs/marine-weather-api"],
      ["Open-Meteo Weather Forecast API", "https://open-meteo.com/"],
      ["GDELT DOC 2.0 API", "https://api.gdeltproject.org/api/v2/doc/doc"]
    ]
  });
};
