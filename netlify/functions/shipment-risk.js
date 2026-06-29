const https = require("https");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const portCoordinates = [
  { name: "Shanghai Port", aliases: ["shanghai", "上海", "cnshg", "cnsgh", "洋山", "外高桥"], lat: 30.626, lon: 122.064 },
  { name: "Ningbo Zhoushan Port", aliases: ["ningbo", "宁波", "舟山", "cnngb"], lat: 29.868, lon: 122.175 },
  { name: "Yantian Port", aliases: ["yantian", "盐田", "shenzhen", "深圳", "cnytn"], lat: 22.58, lon: 114.27 },
  { name: "Laem Chabang Port", aliases: ["laem chabang", "林查班", "莱姆查邦", "thlch"], lat: 13.084, lon: 100.883 },
  { name: "Singapore Port", aliases: ["singapore", "新加坡", "sgsin"], lat: 1.264, lon: 103.82 },
  { name: "Port Klang", aliases: ["port klang", "巴生", "mypkg"], lat: 2.999, lon: 101.392 },
  { name: "Ho Chi Minh / Cat Lai", aliases: ["ho chi minh", "cat lai", "胡志明", "吉莱"], lat: 10.75, lon: 106.79 },
  { name: "Rotterdam Port", aliases: ["rotterdam", "鹿特丹", "nlrtm"], lat: 51.948, lon: 4.142 },
  { name: "Los Angeles / Long Beach", aliases: ["los angeles", "long beach", "洛杉矶", "长滩"], lat: 33.74, lon: -118.25 }
];

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

function findPortCoordinate(value = "") {
  const needle = normalize(value);
  if (!needle) return null;
  return portCoordinates.find((port) => {
    const haystack = normalize([port.name, ...port.aliases].join(" "));
    return haystack.includes(needle) || needle.includes(normalize(port.name)) || port.aliases.some((alias) => needle.includes(normalize(alias)));
  }) || null;
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
  return { level, summary, points };
}

function gdeltQueryForRegion(region = "", destination = "") {
  const base = [region, destination].join(" ");
  if (/南海|华南|上海|东海|长江|中国/.test(base)) return '"South China Sea" OR "East China Sea" OR "Taiwan Strait" OR Shanghai';
  if (/马六甲|新加坡/.test(base)) return '"Malacca Strait" OR Singapore';
  if (/泰国湾|越南|林查班/.test(base)) return '"Gulf of Thailand" OR "South China Sea" OR Vietnam OR Thailand';
  return '"military exercise" OR naval OR blockade OR "shipping lane"';
}

function classifyMilitary(items = []) {
  const text = items.map((item) => `${item.title || ""} ${item.domain || ""}`).join(" ").toLowerCase();
  const hit = /military exercise|naval drill|live fire|blockade|missile|军演|演习|封锁|禁航/.test(text);
  return {
    level: hit ? "观察" : "未见明显信号",
    summary: hit ? "过去一周公开新闻中出现海域军事/安全相关信号，建议物流同事关注航行警告和船司绕航通知。" : "过去一周公开新闻未抓到明显军演/禁航信号；仍以航行警告、船司通知和港口公告为准。"
  };
}

function buildEtaImpact(weatherRisk, seasonal, military) {
  if (weatherRisk.level === "高") return "ETA 影响判断：天气海况可能直接影响航速、靠泊或港口作业，建议把 ETA 风险提高一级。";
  if (military.level === "观察") return "ETA 影响判断：军事/安全新闻需要关注，但是否影响航线要看船司是否发布绕航或禁航通知。";
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
  const newsItems = gdeltResult.status === "fulfilled" && gdeltResult.value.ok && Array.isArray(gdeltResult.value.data.articles)
    ? gdeltResult.value.data.articles.slice(0, 5).map((item) => ({
        title: item.title || "",
        url: item.url || "",
        domain: item.domain || "",
        seendate: item.seendate || ""
      }))
    : [];
  const weatherRisk = summarizeWeather(marine, weather);
  const seasonal = seasonalRisk(region, new Date());
  const military = classifyMilitary(newsItems);
  const conclusion = buildEtaImpact(weatherRisk, seasonal, military);

  return json(200, {
    ok: true,
    source: "Open-Meteo Marine/Weather + GDELT DOC",
    updatedAt: new Date().toISOString(),
    coordinateSource: point.source,
    region,
    destination,
    conclusion,
    weather: weatherRisk,
    seasonal,
    military: { ...military, items: newsItems },
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
