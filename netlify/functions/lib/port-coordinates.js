const portCoordinates = [
  // China: coordinates are port-vicinity sampling points, not berth positions.
  { code: "CNSHA", name: "Shanghai Port", country: "China", aliases: ["上海", "上海港", "shanghai", "洋山", "外高桥", "cnsha", "cnshg"], lat: 30.626, lon: 122.064, official: ["上海港官网", "https://www.portshanghai.com.cn/"] },
  { code: "CNNGB", name: "Ningbo-Zhoushan Port", country: "China", aliases: ["宁波", "舟山", "宁波舟山港", "ningbo", "zhoushan", "cnngb"], lat: 29.868, lon: 122.175, official: ["宁波舟山港", "https://www.nbport.com.cn/"] },
  { code: "CNYTN", name: "Yantian Port", country: "China", aliases: ["盐田", "盐田港", "yantian", "cnytn"], lat: 22.58, lon: 114.27, official: ["盐田国际", "https://www.yict.com.cn/"] },
  { code: "CNSZX", name: "Shenzhen / Shekou Port", country: "China", aliases: ["深圳", "深圳港", "蛇口", "赤湾", "妈湾", "shenzhen", "shekou", "chiwan", "cnszx"], lat: 22.48, lon: 113.89, official: ["蛇口集装箱码头", "https://www.sctcn.com/"] },
  { code: "CNTAO", name: "Qingdao Port", country: "China", aliases: ["青岛", "青岛港", "qingdao", "cntao"], lat: 36.01, lon: 120.3, official: ["山东港口青岛港", "https://www.qingdao-port.com/"] },
  { code: "CNTSN", name: "Tianjin Port", country: "China", aliases: ["天津", "天津港", "新港", "tianjin", "xingang", "cntsn"], lat: 38.98, lon: 117.75, official: ["天津港集团", "https://www.ptacn.com/"] },
  { code: "CNXMN", name: "Xiamen Port", country: "China", aliases: ["厦门", "厦门港", "海沧", "xiamen", "cnxmn"], lat: 24.44, lon: 118.03, official: ["厦门港务控股", "https://www.xpgco.com.cn/"] },
  { code: "CNGZG", name: "Guangzhou / Nansha Port", country: "China", aliases: ["广州", "广州港", "南沙", "南沙港", "guangzhou", "nansha", "cngzg"], lat: 22.65, lon: 113.67, official: ["广州港集团", "https://www.gzport.com/"] },
  { code: "CNDLC", name: "Dalian Port", country: "China", aliases: ["大连", "大连港", "dalian", "cndlc"], lat: 38.94, lon: 121.65, official: ["辽港集团", "https://www.liaoganggf.cn/"] },
  { code: "CNLYG", name: "Lianyungang Port", country: "China", aliases: ["连云港", "lianyungang", "cnlyg"], lat: 34.72, lon: 119.46, official: ["连云港港口集团", "https://www.lygport.com.cn/"] },
  { code: "CNFOC", name: "Fuzhou Port", country: "China", aliases: ["福州", "福州港", "江阴港", "马尾", "fuzhou", "cnfoc"], lat: 25.45, lon: 119.32, official: ["福州港口发展中心", "https://jtyst.fj.gov.cn/fzgkj/"] },
  { code: "CNTXG", name: "Taicang Port", country: "China", aliases: ["太仓", "太仓港", "苏州港", "taicang", "cntxg"], lat: 31.62, lon: 121.17, official: ["太仓港口管理委员会", "https://www.tcport.gov.cn/"] },
  { code: "CNYIK", name: "Yingkou / Bayuquan Port", country: "China", aliases: ["营口", "营口港", "鲅鱼圈", "yingkou", "bayuquan", "cnyik"], lat: 40.3, lon: 122.1 },
  { code: "CNTGS", name: "Tangshan / Caofeidian Port", country: "China", aliases: ["唐山", "京唐港", "曹妃甸", "tangshan", "jingtang", "caofeidian", "cntgs"], lat: 39.0, lon: 118.48 },
  { code: "CNHUA", name: "Huanghua Port", country: "China", aliases: ["黄骅", "黄骅港", "huanghua", "cnhua"], lat: 38.33, lon: 117.88 },
  { code: "CNQHD", name: "Qinhuangdao Port", country: "China", aliases: ["秦皇岛", "秦皇岛港", "qinhuangdao", "cnqhd"], lat: 39.9, lon: 119.6 },
  { code: "CNYTG", name: "Yantai Port", country: "China", aliases: ["烟台", "烟台港", "yantai", "cnytg"], lat: 37.57, lon: 121.39 },
  { code: "CNRZH", name: "Rizhao Port", country: "China", aliases: ["日照", "日照港", "rizhao", "cnrzh"], lat: 35.35, lon: 119.55 },
  { code: "CNWEI", name: "Weihai Port", country: "China", aliases: ["威海", "威海港", "weihai", "cnwei"], lat: 37.5, lon: 122.12 },
  { code: "CNWNZ", name: "Wenzhou Port", country: "China", aliases: ["温州", "温州港", "wenzhou", "cnwnz"], lat: 27.93, lon: 120.85 },
  { code: "CNTZO", name: "Taizhou Port", country: "China", aliases: ["台州", "台州港", "taizhou", "cntzo"], lat: 28.68, lon: 121.45 },
  { code: "CNZAP", name: "Jiaxing / Zhapu Port", country: "China", aliases: ["嘉兴", "乍浦", "嘉兴港", "jiaxing", "zhapu", "cnzap"], lat: 30.62, lon: 121.1 },
  { code: "CNQZJ", name: "Quanzhou Port", country: "China", aliases: ["泉州", "泉州港", "quanzhou", "cnqzj"], lat: 24.85, lon: 118.67 },
  { code: "CNSWA", name: "Shantou Port", country: "China", aliases: ["汕头", "汕头港", "shantou", "cnswa"], lat: 23.35, lon: 116.73 },
  { code: "CNZUH", name: "Zhuhai / Gaolan Port", country: "China", aliases: ["珠海", "珠海港", "高栏港", "zhuhai", "gaolan", "cnzuh"], lat: 21.95, lon: 113.2 },
  { code: "CNZHA", name: "Zhanjiang Port", country: "China", aliases: ["湛江", "湛江港", "zhanjiang", "cnzha"], lat: 21.15, lon: 110.4 },
  { code: "CNQZH", name: "Qinzhou Port", country: "China", aliases: ["钦州", "钦州港", "qinzhou", "cnqzh"], lat: 21.7, lon: 108.6 },
  { code: "CNFAN", name: "Fangchenggang Port", country: "China", aliases: ["防城港", "fangchenggang", "cnfan"], lat: 21.6, lon: 108.35 },
  { code: "CNBIH", name: "Beihai Port", country: "China", aliases: ["北海", "北海港", "beihai", "cnbih"], lat: 21.45, lon: 109.1 },
  { code: "CNHAK", name: "Haikou Port", country: "China", aliases: ["海口", "海口港", "haikou", "cnhak"], lat: 20.03, lon: 110.28 },
  { code: "CNYPG", name: "Yangpu Port", country: "China", aliases: ["洋浦", "洋浦港", "yangpu", "cnypg"], lat: 19.72, lon: 109.2 },

  // Major international gateways and transshipment hubs.
  { code: "HKHKG", name: "Hong Kong Port", country: "Hong Kong, China", aliases: ["香港", "香港港", "hong kong", "hkhkg"], lat: 22.3, lon: 114.15 },
  { code: "SGSIN", name: "Singapore Port", country: "Singapore", aliases: ["新加坡", "新加坡港", "singapore", "sgsin"], lat: 1.264, lon: 103.82 },
  { code: "MYPKG", name: "Port Klang", country: "Malaysia", aliases: ["巴生", "巴生港", "port klang", "klang", "mypkg"], lat: 2.999, lon: 101.392 },
  { code: "MYTPP", name: "Tanjung Pelepas Port", country: "Malaysia", aliases: ["丹戎帕拉帕斯", "tanjung pelepas", "ptp", "mytpp"], lat: 1.367, lon: 103.55 },
  { code: "THLCH", name: "Laem Chabang Port", country: "Thailand", aliases: ["林查班", "莱姆查邦", "laem chabang", "thlch"], lat: 13.084, lon: 100.883 },
  { code: "THBKK", name: "Bangkok Port", country: "Thailand", aliases: ["曼谷港", "คลองเตย", "bangkok port", "klong toei", "thbkk"], lat: 13.71, lon: 100.57 },
  { code: "VNSGN", name: "Ho Chi Minh / Cat Lai Port", country: "Vietnam", aliases: ["胡志明", "吉莱", "cat lai", "ho chi minh", "vnsgn", "vnhcm"], lat: 10.75, lon: 106.79 },
  { code: "VNVUT", name: "Cai Mep Port", country: "Vietnam", aliases: ["盖梅", "cai mep", "vung tau", "vnvut"], lat: 10.5, lon: 107.0 },
  { code: "VNHPH", name: "Hai Phong Port", country: "Vietnam", aliases: ["海防", "海防港", "hai phong", "haphong", "vnhph"], lat: 20.87, lon: 106.68 },
  { code: "KRPUS", name: "Busan Port", country: "South Korea", aliases: ["釜山", "釜山港", "busan", "krpus"], lat: 35.1, lon: 129.04 },
  { code: "JPTYO", name: "Tokyo Port", country: "Japan", aliases: ["东京港", "tokyo port", "jptyo"], lat: 35.62, lon: 139.79 },
  { code: "JPYOK", name: "Yokohama Port", country: "Japan", aliases: ["横滨", "横滨港", "yokohama", "jpyok"], lat: 35.45, lon: 139.65 },
  { code: "JPUKB", name: "Kobe Port", country: "Japan", aliases: ["神户", "神户港", "kobe", "jpukb"], lat: 34.68, lon: 135.2 },
  { code: "JPNGO", name: "Nagoya Port", country: "Japan", aliases: ["名古屋", "名古屋港", "nagoya", "jpngo"], lat: 35.02, lon: 136.85 },
  { code: "TWKHH", name: "Kaohsiung Port", country: "Taiwan, China", aliases: ["高雄", "高雄港", "kaohsiung", "twkhh"], lat: 22.61, lon: 120.28 },
  { code: "TWKEL", name: "Keelung Port", country: "Taiwan, China", aliases: ["基隆", "基隆港", "keelung", "twkel"], lat: 25.14, lon: 121.75 },
  { code: "IDJKT", name: "Jakarta / Tanjung Priok Port", country: "Indonesia", aliases: ["雅加达", "丹戎不碌", "jakarta", "tanjung priok", "idjkt"], lat: -6.1, lon: 106.88 },
  { code: "PHMNL", name: "Manila Port", country: "Philippines", aliases: ["马尼拉", "马尼拉港", "manila", "phmnl"], lat: 14.59, lon: 120.95 },
  { code: "LKCMB", name: "Colombo Port", country: "Sri Lanka", aliases: ["科伦坡", "科伦坡港", "colombo", "lkcmb"], lat: 6.95, lon: 79.84 },
  { code: "INNSA", name: "Nhava Sheva / JNPT", country: "India", aliases: ["那瓦舍瓦", "nhava sheva", "jnpt", "innsa"], lat: 18.95, lon: 72.95 },
  { code: "INMUN", name: "Mundra Port", country: "India", aliases: ["蒙德拉", "蒙德拉港", "mundra", "inmun"], lat: 22.74, lon: 69.7 },
  { code: "INMAA", name: "Chennai Port", country: "India", aliases: ["金奈", "金奈港", "chennai", "inmaa"], lat: 13.1, lon: 80.3 },
  { code: "AEJEA", name: "Jebel Ali Port", country: "United Arab Emirates", aliases: ["杰贝阿里", "迪拜港", "jebel ali", "aejea"], lat: 25.011, lon: 55.061 },
  { code: "SAJED", name: "Jeddah Islamic Port", country: "Saudi Arabia", aliases: ["吉达", "吉达港", "jeddah", "sajed"], lat: 21.47, lon: 39.15 },
  { code: "SADMM", name: "Dammam / King Abdulaziz Port", country: "Saudi Arabia", aliases: ["达曼", "达曼港", "dammam", "sadmm"], lat: 26.5, lon: 50.2 },
  { code: "EGPSD", name: "Port Said", country: "Egypt", aliases: ["塞得港", "port said", "egpsd"], lat: 31.26, lon: 32.3 },
  { code: "NLRTM", name: "Rotterdam Port", country: "Netherlands", aliases: ["鹿特丹", "鹿特丹港", "rotterdam", "nlrtm"], lat: 51.948, lon: 4.142 },
  { code: "DEHAM", name: "Hamburg Port", country: "Germany", aliases: ["汉堡", "汉堡港", "hamburg", "deham"], lat: 53.546, lon: 9.966 },
  { code: "BEANR", name: "Antwerp-Bruges Port", country: "Belgium", aliases: ["安特卫普", "安特卫普港", "antwerp", "beanr"], lat: 51.27, lon: 4.4 },
  { code: "GBFXT", name: "Felixstowe Port", country: "United Kingdom", aliases: ["费利克斯托", "felixstowe", "gbfxt", "gbfxs"], lat: 51.95, lon: 1.31 },
  { code: "ESVLC", name: "Valencia Port", country: "Spain", aliases: ["瓦伦西亚", "瓦伦西亚港", "valencia", "esvlc"], lat: 39.44, lon: -0.31 },
  { code: "ESALG", name: "Algeciras Port", country: "Spain", aliases: ["阿尔赫西拉斯", "algeciras", "esalg"], lat: 36.13, lon: -5.44 },
  { code: "ITGOA", name: "Genoa Port", country: "Italy", aliases: ["热那亚", "热那亚港", "genoa", "itgoa"], lat: 44.4, lon: 8.92 },
  { code: "GRPIR", name: "Piraeus Port", country: "Greece", aliases: ["比雷埃夫斯", "piraeus", "grpir"], lat: 37.94, lon: 23.64 },
  { code: "TRAMB", name: "Ambarli Port", country: "Turkey", aliases: ["阿姆巴利", "伊斯坦布尔港", "ambarli", "tramb"], lat: 40.97, lon: 28.67 },
  { code: "USLAX", name: "Los Angeles Port", country: "United States", aliases: ["洛杉矶港", "port of los angeles", "los angeles port", "uslax"], lat: 33.74, lon: -118.27 },
  { code: "USLGB", name: "Long Beach Port", country: "United States", aliases: ["长滩", "长滩港", "long beach", "uslgb"], lat: 33.75, lon: -118.22 },
  { code: "USOAK", name: "Oakland Port", country: "United States", aliases: ["奥克兰港", "oakland port", "usoak"], lat: 37.8, lon: -122.31 },
  { code: "USSEA", name: "Seattle / Tacoma Ports", country: "United States", aliases: ["西雅图港", "塔科马港", "seattle port", "tacoma port", "ussea", "ustiw"], lat: 47.36, lon: -122.43 },
  { code: "USNYC", name: "New York / Newark Port", country: "United States", aliases: ["纽约港", "纽瓦克港", "new york port", "newark port", "usnyc", "usewr"], lat: 40.68, lon: -74.15 },
  { code: "USSAV", name: "Savannah Port", country: "United States", aliases: ["萨凡纳", "萨凡纳港", "savannah", "ussav"], lat: 32.13, lon: -81.15 },
  { code: "USHOU", name: "Houston Port", country: "United States", aliases: ["休斯敦港", "休斯顿港", "houston port", "ushou"], lat: 29.73, lon: -95.27 },
  { code: "CAVAN", name: "Vancouver Port", country: "Canada", aliases: ["温哥华港", "vancouver port", "cavan"], lat: 49.289, lon: -123.105 },
  { code: "CAMTR", name: "Montreal Port", country: "Canada", aliases: ["蒙特利尔港", "montreal port", "camtr"], lat: 45.55, lon: -73.53 },
  { code: "MXZLO", name: "Manzanillo Port", country: "Mexico", aliases: ["曼萨尼约", "墨西哥曼萨尼约", "manzanillo mexico", "mxzlo", "mxzan"], lat: 19.067, lon: -104.323 },
  { code: "PAMIT", name: "Colon / Manzanillo International Terminal", country: "Panama", aliases: ["科隆港", "巴拿马曼萨尼约", "colon port", "manzanillo panama", "pamit"], lat: 9.36, lon: -79.88 },
  { code: "BRSSZ", name: "Santos Port", country: "Brazil", aliases: ["桑托斯", "桑托斯港", "santos", "brssz"], lat: -23.933, lon: -46.333 },
  { code: "ARBUE", name: "Buenos Aires Port", country: "Argentina", aliases: ["布宜诺斯艾利斯港", "buenos aires port", "arbue"], lat: -34.58, lon: -58.37 },
  { code: "ZACPT", name: "Cape Town Port", country: "South Africa", aliases: ["开普敦", "开普敦港", "cape town", "zacpt"], lat: -33.903, lon: 18.435 },
  { code: "ZADUR", name: "Durban Port", country: "South Africa", aliases: ["德班", "德班港", "durban", "zadur"], lat: -29.871, lon: 31.051 },
  { code: "KEMBA", name: "Mombasa Port", country: "Kenya", aliases: ["蒙巴萨", "蒙巴萨港", "mombasa", "kemba"], lat: -4.04, lon: 39.67 },
  { code: "AUSYD", name: "Sydney / Port Botany", country: "Australia", aliases: ["悉尼港", "博塔尼港", "sydney port", "port botany", "ausyd"], lat: -33.97, lon: 151.22 },
  { code: "AUMEL", name: "Melbourne Port", country: "Australia", aliases: ["墨尔本港", "melbourne port", "aumel"], lat: -37.82, lon: 144.91 },
  { code: "NZAKL", name: "Auckland Port", country: "New Zealand", aliases: ["奥克兰港", "auckland port", "nzakl"], lat: -36.84, lon: 174.79 }
];

function normalizePort(value = "") {
  return String(value || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

function findPortCoordinate(value = "") {
  const needle = normalizePort(value);
  if (!needle) return null;
  const exact = portCoordinates.find((port) => [port.code, port.name, ...(port.aliases || [])].some((item) => normalizePort(item) === needle));
  if (exact) return exact;
  if (needle.length < 3) return null;
  return portCoordinates.find((port) => [port.code, port.name, ...(port.aliases || [])].some((item) => {
    const candidate = normalizePort(item);
    return candidate.length >= 3 && (candidate.includes(needle) || needle.includes(candidate));
  })) || null;
}

module.exports = { portCoordinates, findPortCoordinate, normalizePort };
