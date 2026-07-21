window.LOGISTICS_SCHEDULE_DATABASE = {
  schemaVersion: "1.5",
  updatedAt: "2026-07-21T00:00:00+08:00",
  sources: [
    {
      id: "dcsa-commercial-schedules",
      mode: "sea",
      name: "DCSA Commercial Schedules Standard",
      url: "https://developer.dcsa.org/implementing-commercial-schedules",
      format: "openapi-standard",
      cadence: "standard-versioned",
      automation: "schema-mapping",
      note: "DCSA 是船期数据交换标准和字段口径，不是公共实时船期源；用于统一点到点航线、港口、船舶和中转字段。"
    },
    {
      id: "maersk-point-to-point",
      mode: "sea",
      name: "Maersk Point-to-Point Schedules",
      url: "https://www.maersk.com/schedules/point-to-point",
      format: "public-query",
      cadence: "carrier-live",
      automation: "manual-capture",
      note: "公开点到点船期；API 需要应用审批或商业授权。"
    },
    {
      id: "oocl-schedule-download",
      mode: "sea",
      name: "OOCL Sailing Schedule Download",
      url: "https://www.oocl.com/eng/ourservices/eservices/sailingschedule/pages/vss.aspx",
      format: "xls/pdf",
      cadence: "daily/weekly",
      automation: "browser-assisted-download",
      note: "按区域和服务下载船期，覆盖中国主要出口港；服务器直连可能触发 Cloudflare，需用正常浏览器下载后再入库。"
    },
    {
      id: "oocl-eax1-service",
      mode: "sea",
      name: "OOCL EAX1 Service Schedule",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20by%20Service/EAX1_LT.pdf",
      format: "pdf",
      cadence: "service-published",
      automation: "pdf-ingestion",
      note: "OOCL 官方 EAX1 服务表；本次于 2026-07-20 读取船名航次和港口到离港窗口。"
    },
    {
      id: "oocl-seap-service",
      mode: "sea",
      name: "OOCL SEAP Service Schedule",
      url: "https://www.oocl.com/sitecollectiondocuments/oocl/eservices/sailing%20schedule%20by%20service/seap_lt.pdf",
      format: "pdf",
      cadence: "service-published",
      automation: "pdf-ingestion",
      note: "OOCL 官方 SEAP 服务表；本次于 2026-07-20 读取上海至洛杉矶的计划港口窗口。"
    },
    {
      id: "hapag-schedule-download",
      mode: "sea",
      name: "Hapag-Lloyd Schedule Download",
      url: "https://www.hapag-lloyd.com/en/online-business/schedule/schedule-download-solution.html",
      format: "download/query",
      cadence: "carrier-live",
      automation: "semi-automatic",
      note: "可按装港和卸港区域下载；交期承诺前仍查互动船期。"
    },
    {
      id: "one-point-to-point",
      mode: "sea",
      name: "ONE Point-to-Point Schedule",
      url: "https://ecomm.one-line.com/one-ecom/schedule/point-to-point-schedule",
      format: "excel/pdf",
      cadence: "carrier-live",
      automation: "semi-automatic",
      note: "查询结果可下载 Excel/PDF，包含船名航次、ETD/ETA、转运和 cut-off。"
    },
    {
      id: "cosco-service-schedule",
      mode: "sea",
      name: "COSCO Service Schedule",
      url: "https://lines.coscoshipping.com/home/HelpCenter/business/ServiceSchedule",
      format: "excel/pdf",
      cadence: "service-dependent",
      automation: "download-ingestion",
      note: "按航线服务下载，适合补中国始发和国内沿海运输班期。"
    },
    {
      id: "cma-cgm-schedules",
      mode: "sea",
      name: "CMA CGM Schedules",
      url: "https://www.cma-cgm.com/ebusiness/schedules",
      format: "public-query/pdf",
      cadence: "carrier-live",
      automation: "semi-automatic",
      note: "按路线、船舶或港口查询并下载 PDF。"
    },
    {
      id: "lufthansa-cargo-download",
      mode: "air",
      name: "Lufthansa Cargo Schedule Downloads",
      url: "https://www.lufthansa-cargo.com/en/network/schedule-routings",
      format: "csv/xlsx/xml",
      cadence: "daily",
      automation: "browser-assisted-download",
      note: "未来 21 天货运路线，结构化文件每日更新；服务器直连可能触发 Cloudflare，下载成功并通过字段校验后才入库。"
    },
    {
      id: "cathay-cargo-download",
      mode: "air",
      name: "Cathay Cargo Flight Schedule",
      url: "https://www.cathaycargo.com/en-us/flight-schedule.html",
      format: "query/xlsx",
      cadence: "1st/16th monthly",
      automation: "browser-assisted-download",
      note: "月度 Excel 每月 1 日发布、16 日更新；文件下载后可入库，实时查询仍优先。"
    },
    {
      id: "cargolux-schedule",
      mode: "air",
      name: "Cargolux Flight Schedule",
      url: "https://www.cargolux.com/network/",
      format: "query/pdf",
      cadence: "monthly",
      automation: "pdf-ingestion",
      note: "货机网络月度 PDF，可补全纯货机航线。"
    },
    {
      id: "aisstream",
      mode: "sea-position",
      name: "AISstream",
      url: "https://aisstream.io/documentation",
      format: "websocket/json",
      cadence: "live",
      automation: "api-key-required",
      note: "免费注册 key 的全球 AIS 流；用于船位，不提供订舱船期。"
    },
    {
      id: "opensky",
      mode: "air-position",
      name: "OpenSky Network",
      url: "https://openskynetwork.github.io/opensky-api/rest.html",
      format: "rest/json",
      cadence: "live/historical",
      automation: "oauth-account-required",
      note: "仅用于 ADS-B 航班位置和到离港事实。官方不提供商业航班计划、延误或货运订舱数据；研究用途有账号限制，商用需另行确认许可。"
    },
    {
      id: "aviationweather",
      mode: "air-weather",
      name: "AviationWeather Data API",
      url: "https://aviationweather.gov/data/api/",
      format: "rest/json/geojson/xml",
      cadence: "near-real-time",
      automation: "public-api",
      note: "METAR、TAF、SIGMET 等官方航空天气；用于解释航班风险，不提供班期。"
    }
  ],
  updatePolicy: {
    rejectResponses: ["登录页", "验证码页", "Cloudflare/反自动化页", "空文件", "缺少 ETD/ETA 或起降字段的文件"],
    keepLastGoodSnapshot: true,
    seaFreshnessDays: 14,
    airFreshnessDays: 2,
    conclusionRule: "只有承运人文件中同时命中起点、终点和有效日期时才输出计划时长；旧快照、区域航线图和预测模型不能冒充当前班期。",
    actualPerformanceRule: "计划班期不能计算平均延误；平均延误只使用已记录的实际离港/到港时间。"
  },
  automaticRefresh: {
    githubWorkflow: ".github/workflows/refresh-official-schedules.yml",
    cron: "17 2 * * *",
    timezone: "UTC",
    currentScope: "OOCL 官方服务 PDF 自动下载、解析、字段校验、生成 last-good 快照；失败时保留上一版有效数据库。",
    nextScope: [
      "把可稳定下载的 COSCO、Hapag-Lloyd、ONE、CMA CGM 船期文件加入 manifest，但每个来源必须先通过字段校验和失败回退。",
      "Maersk、CMA CGM、Hapag-Lloyd 等 API 进入授权候选；未拿到账号/密钥前只保留官网查询入口，不把网页抓取结果冒充 API。",
      "实单数据继续作为实际平均时效和平均延误的唯一来源，承运人计划只用于 ETD/ETA 计划窗口。"
    ],
    qualityGate: {
      minimumValidatedServices: 8,
      minimumGeneratedRecords: 100,
      rejectIfAllSourcesFail: true,
      deployOnlyWhenSnapshotChanged: true
    }
  },
  retrievalPolicy: {
    unattended: "仅在固定官方地址返回成功状态、预期文件类型且字段校验通过时自动入库。",
    browserAssisted: "遇 Cloudflare、验证码或登录页时不绕过验证；用正常浏览器下载官方文件，再进入同一校验流程。",
    apiAccess: "DCSA 是数据标准而不是公共船期数据源；船司或商业航班 API 获批后可作为实时增量，不作为基础可用性的前提。",
    lastGoodSnapshot: "新文件失败、为空或字段异常时继续使用最近一次未过期的有效快照，并明确显示抓取日期。"
  },
  baselineTransit: [
    { id: "base-cnsha-sgsin", originCode: "CNSHA", destinationCode: "SGSIN", rangeDays: [4, 7], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到新加坡为华东-东南亚主干通道；直航通常较短，中转或甩柜会拉长。" },
    { id: "base-cnsha-thlch", originCode: "CNSHA", destinationCode: "THLCH", rangeDays: [6, 10], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到林查班按东南亚近洋通道给基准区间，订舱前核直航/中转和截关。" },
    { id: "base-cnsha-vnsgn", originCode: "CNSHA", destinationCode: "VNSGN", rangeDays: [5, 9], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "one-point-to-point", "dcsa-commercial-schedules"], note: "上海到胡志明/吉莱常见近洋服务，目的港清关和驳船窗口会影响交付。" },
    { id: "base-cnsha-vnhph", originCode: "CNSHA", destinationCode: "VNHPH", rangeDays: [4, 8], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "上海到海防属于华东-越北近洋通道，船期密度较高但需确认船司挂靠。" },
    { id: "base-cnsha-mypkg", originCode: "CNSHA", destinationCode: "MYPKG", rangeDays: [8, 14], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point"], note: "上海到巴生常见直航或新加坡中转，基准区间不含目的港提柜。" },
    { id: "base-cnsha-idjkt", originCode: "CNSHA", destinationCode: "IDJKT", rangeDays: [9, 15], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "one-point-to-point"], note: "上海到雅加达通常需看东南亚转运或直靠安排，印尼目的港清关另计。" },
    { id: "base-cnsha-jptyo", originCode: "CNSHA", destinationCode: "JPTYO", rangeDays: [3, 6], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "上海到东京为东北亚近洋短程，天气和码头窗口仍会影响实际到港。" },
    { id: "base-cnsha-krpus", originCode: "CNSHA", destinationCode: "KRPUS", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "上海到釜山为高频近洋/中转港通道，订舱前确认是否目的港或转运港。" },
    { id: "base-cnsha-uslax", originCode: "CNSHA", destinationCode: "USLAX", rangeDays: [13, 19], confidence: "baseline-lane", sourceIds: ["oocl-seap-service", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到洛杉矶基准区间参考美西主干服务；不含美西码头/铁路/提柜延误。" },
    { id: "base-cnsha-usnyc", originCode: "CNSHA", destinationCode: "USNYC", rangeDays: [28, 38], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "hapag-schedule-download", "dcsa-commercial-schedules"], note: "上海到纽约/新泽西通常经巴拿马或其他服务组合，计划航程与服务差异大。" },
    { id: "base-cnsha-nlrot", originCode: "CNSHA", destinationCode: "NLRTM", rangeDays: [28, 40], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "hapag-schedule-download", "dcsa-commercial-schedules"], note: "上海到鹿特丹按远东-北欧干线基准区间；绕航、红海风险和中转会显著影响。" },
    { id: "base-cnsha-gbfxs", originCode: "CNSHA", destinationCode: "GBFXT", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["hapag-schedule-download", "one-point-to-point", "dcsa-commercial-schedules"], note: "上海到英国港口按北欧/英国服务基准；需核具体卸港和内陆段。" },

    { id: "base-cnnGB-sgsin", originCode: "CNNGB", destinationCode: "SGSIN", rangeDays: [4, 7], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "one-point-to-point"], note: "宁波到新加坡为华东近洋主通道，基准区间需结合直航/转运。" },
    { id: "base-cnnGB-thlch", originCode: "CNNGB", destinationCode: "THLCH", rangeDays: [6, 10], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point"], note: "宁波到林查班常见直航或中转，具体 ETA 以承运人计划为准。" },
    { id: "base-cnnGB-vnsgn", originCode: "CNNGB", destinationCode: "VNSGN", rangeDays: [5, 9], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "宁波到胡志明/吉莱按近洋基准区间，目的港提柜和清关不含在内。" },
    { id: "base-cnnGB-vnhph", originCode: "CNNGB", destinationCode: "VNHPH", rangeDays: [4, 8], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "宁波到海防为华东-越北常见通道，需核船司挂靠。" },
    { id: "base-cnnGB-mypkg", originCode: "CNNGB", destinationCode: "MYPKG", rangeDays: [8, 14], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point"], note: "宁波到巴生可直航或中转，基准区间不代表单一船司。" },
    { id: "base-cnnGB-uslax", originCode: "CNNGB", destinationCode: "USLAX", rangeDays: [13, 20], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "one-point-to-point", "dcsa-commercial-schedules"], note: "宁波到洛杉矶按美西主干基准；旺季、铁路和码头预约另看风险层。" },
    { id: "base-cnnGB-nlrot", originCode: "CNNGB", destinationCode: "NLRTM", rangeDays: [28, 40], confidence: "baseline-lane", sourceIds: ["hapag-schedule-download", "one-point-to-point"], note: "宁波到鹿特丹按远东-北欧干线基准；绕航风险需实时复核。" },

    { id: "base-cnxmn-sgsin", originCode: "CNXMN", destinationCode: "SGSIN", rangeDays: [3, 6], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point"], note: "厦门到新加坡属于东南亚近洋/中转通道，直航和中转差异约 1-3 天。" },
    { id: "base-cnxmn-thlch", originCode: "CNXMN", destinationCode: "THLCH", rangeDays: [5, 8], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "oocl-schedule-download"], note: "厦门到林查班为重点补齐路线；已有马士基计划样本时优先显示承运人班期，否则显示此基准区间。" },
    { id: "base-cnxmn-vnsgn", originCode: "CNXMN", destinationCode: "VNSGN", rangeDays: [4, 8], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "厦门到越南南部基准区间，需核直航/新加坡或蛇口中转。" },
    { id: "base-cnxmn-vnhph", originCode: "CNXMN", destinationCode: "VNHPH", rangeDays: [3, 7], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "cosco-service-schedule"], note: "厦门到海防为华南/福建近洋通道，船司挂靠决定实际 ETA。" },
    { id: "base-cnxmn-mypkg", originCode: "CNXMN", destinationCode: "MYPKG", rangeDays: [6, 12], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "maersk-point-to-point"], note: "厦门到巴生基准区间，需确认是否经新加坡转运。" },
    { id: "base-cnxmn-idjkt", originCode: "CNXMN", destinationCode: "IDJKT", rangeDays: [8, 14], confidence: "baseline-lane", sourceIds: ["oocl-schedule-download", "one-point-to-point"], note: "厦门到雅加达通常看东南亚服务组合，印尼目的港清关另计。" },
    { id: "base-cnxmn-uslax", originCode: "CNXMN", destinationCode: "USLAX", rangeDays: [16, 24], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "one-point-to-point"], note: "厦门到美西可能经华南/华东干线衔接，具体以船司点到点结果为准。" },

    { id: "base-cnszx-sgsin", originCode: "CNSZX", destinationCode: "SGSIN", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["oocl-hksc-southeast-asia", "maersk-point-to-point"], note: "深圳/蛇口到新加坡为华南近洋高频通道，基准区间不含截关前准备。" },
    { id: "base-cnszx-thlch", originCode: "CNSZX", destinationCode: "THLCH", rangeDays: [4, 7], confidence: "baseline-lane", sourceIds: ["oocl-hksc-thailand", "maersk-point-to-point"], note: "深圳/蛇口到林查班常见直航/近洋服务，需核是否经新加坡或巴生转运。" },
    { id: "base-cnszx-vnsgn", originCode: "CNSZX", destinationCode: "VNSGN", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["oocl-hksc-vietnam", "cosco-service-schedule"], note: "深圳/蛇口到胡志明/吉莱为华南-越南短程，天气和驳船窗口会影响。" },
    { id: "base-cnszx-vnhph", originCode: "CNSZX", destinationCode: "VNHPH", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["oocl-hksc-vietnam", "cosco-service-schedule"], note: "深圳/蛇口到海防基准区间较短，实际看船司挂靠和截关。" },
    { id: "base-cnszx-mypkg", originCode: "CNSZX", destinationCode: "MYPKG", rangeDays: [5, 10], confidence: "baseline-lane", sourceIds: ["oocl-hksc-southeast-asia", "maersk-point-to-point"], note: "深圳/蛇口到巴生可直航或中转，基准区间需订舱复核。" },
    { id: "base-cnszx-uslax", originCode: "CNSZX", destinationCode: "USLAX", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "one-point-to-point"], note: "深圳/蛇口到洛杉矶按华南-美西主干服务基准，旺季甩柜另看风险层。" },

    { id: "base-cnytn-sgsin", originCode: "CNYTN", destinationCode: "SGSIN", rangeDays: [3, 6], confidence: "baseline-lane", sourceIds: ["oocl-hksc-southeast-asia", "maersk-point-to-point"], note: "盐田到新加坡为华南近洋/中转通道，班轮密度较高。" },
    { id: "base-cnytn-thlch", originCode: "CNYTN", destinationCode: "THLCH", rangeDays: [4, 7], confidence: "baseline-lane", sourceIds: ["oocl-hksc-thailand", "maersk-point-to-point"], note: "盐田到林查班基准区间，需核是否直航和目的港码头。" },
    { id: "base-cnytn-mypkg", originCode: "CNYTN", destinationCode: "MYPKG", rangeDays: [5, 10], confidence: "baseline-lane", sourceIds: ["oocl-hksc-southeast-asia", "maersk-point-to-point"], note: "盐田到巴生为华南-东南亚主通道，需核直航/中转。" },
    { id: "base-cnytn-uslax", originCode: "CNYTN", destinationCode: "USLAX", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "one-point-to-point"], note: "盐田到洛杉矶基准区间，受美西码头、铁路和旺季舱位影响较大。" },
    { id: "base-cnytn-nlrot", originCode: "CNYTN", destinationCode: "NLRTM", rangeDays: [27, 39], confidence: "baseline-lane", sourceIds: ["hapag-schedule-download", "one-point-to-point"], note: "盐田到鹿特丹按远东-北欧干线基准，红海/绕航需实时复核。" },

    { id: "base-cnqgd-krpus", originCode: "CNQDG", destinationCode: "KRPUS", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["cosco-service-schedule", "oocl-schedule-download"], note: "青岛到釜山为东北亚短程高频通道，实际需核船司开航日。" },
    { id: "base-cnqgd-jptyo", originCode: "CNQDG", destinationCode: "JPTYO", rangeDays: [3, 7], confidence: "baseline-lane", sourceIds: ["cosco-service-schedule", "oocl-schedule-download"], note: "青岛到东京基准区间，东北亚天气会影响实际挂靠。" },
    { id: "base-cnqgd-uslax", originCode: "CNQDG", destinationCode: "USLAX", rangeDays: [15, 23], confidence: "baseline-lane", sourceIds: ["maersk-point-to-point", "one-point-to-point"], note: "青岛到洛杉矶按华北/山东-美西服务基准，可能经釜山或华东中转。" },
    { id: "base-cntxg-krpus", originCode: "CNTXG", destinationCode: "KRPUS", rangeDays: [3, 6], confidence: "baseline-lane", sourceIds: ["cosco-service-schedule", "oocl-schedule-download"], note: "天津到釜山为华北-东北亚短程，需确认是否直靠。" },
    { id: "base-cndlc-krpus", originCode: "CNDLC", destinationCode: "KRPUS", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["cosco-service-schedule", "oocl-schedule-download"], note: "大连到釜山基准区间较短，冬季天气和港口窗口需复核。" },

    { id: "base-cnsha-deham", originCode: "CNSHA", destinationCode: "DEHAM", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download", "dcsa-commercial-schedules"], note: "上海到汉堡按远东-北欧服务基准；红海绕航、转运和内陆铁路会明显改变 ETA。" },
    { id: "base-cnsha-beanr", originCode: "CNSHA", destinationCode: "BEANR", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download", "dcsa-commercial-schedules"], note: "上海到安特卫普/布鲁日按北欧干线基准；目的港拥堵和内陆派送需单独核验。" },
    { id: "base-cnsha-aejea", originCode: "CNSHA", destinationCode: "AEJEA", rangeDays: [16, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到杰贝阿里通常经中东主干或转运服务；需核自由区/本地进口口径。" },
    { id: "base-cnsha-sajed", originCode: "CNSHA", destinationCode: "SAJED", rangeDays: [22, 34], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到吉达受红海服务调整影响较大，承诺交期前必须复核船司当前挂靠。" },
    { id: "base-cnsha-ausyd", originCode: "CNSHA", destinationCode: "AUSYD", rangeDays: [17, 26], confidence: "baseline-lane", sourceIds: ["oocl-hksc-oceania", "one-point-to-point"], note: "上海到悉尼按澳洲主干服务基准；AQIS/木包装和目的港窗口不含在航程内。" },
    { id: "base-cnsha-aumel", originCode: "CNSHA", destinationCode: "AUMEL", rangeDays: [18, 27], confidence: "baseline-lane", sourceIds: ["oocl-hksc-oceania", "one-point-to-point"], note: "上海到墨尔本按澳洲主干服务基准；需核是否直航及目的港提柜预约。" },
    { id: "base-cnsha-innsa", originCode: "CNSHA", destinationCode: "INNSA", rangeDays: [12, 20], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "上海到那瓦舍瓦/JNPT 按印度西岸服务基准；印度清关和内陆段需另核。" },
    { id: "base-cnsha-inmun", originCode: "CNSHA", destinationCode: "INMUN", rangeDays: [13, 21], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "上海到蒙德拉按印度西岸服务基准；中转和铁路衔接会影响实际交付。" },
    { id: "base-cnsha-phmnl", originCode: "CNSHA", destinationCode: "PHMNL", rangeDays: [5, 10], confidence: "baseline-lane", sourceIds: ["oocl-hksc-philippines", "one-point-to-point"], note: "上海到马尼拉为近洋航线，菲律宾目的港清关资料和进口商能力影响较大。" },
    { id: "base-cnsha-twkhh", originCode: "CNSHA", destinationCode: "TWKHH", rangeDays: [2, 5], confidence: "baseline-lane", sourceIds: ["oocl-hksc-taiwan", "cosco-service-schedule"], note: "上海到高雄为近洋短程，台风季和港口窗口需复核。" },

    { id: "base-cnnGB-deham", originCode: "CNNGB", destinationCode: "DEHAM", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "宁波到汉堡按远东-北欧基准，红海绕航和转运安排需实时复核。" },
    { id: "base-cnnGB-aejea", originCode: "CNNGB", destinationCode: "AEJEA", rangeDays: [16, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point"], note: "宁波到杰贝阿里为中东主通道，需核船司挂靠和中转。" },
    { id: "base-cnnGB-ausyd", originCode: "CNNGB", destinationCode: "AUSYD", rangeDays: [17, 26], confidence: "baseline-lane", sourceIds: ["oocl-hksc-oceania", "one-point-to-point"], note: "宁波到悉尼按澳洲线基准；检疫和目的港提柜另计。" },
    { id: "base-cnnGB-innsa", originCode: "CNNGB", destinationCode: "INNSA", rangeDays: [12, 20], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "宁波到那瓦舍瓦/JNPT 按印度西岸基准，需核是否经新加坡/巴生中转。" },
    { id: "base-cnnGB-phmnl", originCode: "CNNGB", destinationCode: "PHMNL", rangeDays: [5, 10], confidence: "baseline-lane", sourceIds: ["oocl-hksc-philippines", "one-point-to-point"], note: "宁波到马尼拉为东南亚近洋服务，实际以承运人计划为准。" },

    { id: "base-cnytn-deham", originCode: "CNYTN", destinationCode: "DEHAM", rangeDays: [28, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "盐田到汉堡按华南-北欧干线基准，红海/绕航和中转需实时复核。" },
    { id: "base-cnytn-aejea", originCode: "CNYTN", destinationCode: "AEJEA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point"], note: "盐田到杰贝阿里为华南-中东主通道，需核船司直航/转运。" },
    { id: "base-cnytn-sajed", originCode: "CNYTN", destinationCode: "SAJED", rangeDays: [20, 32], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point"], note: "盐田到吉达受红海航线调整影响明显，正式 ETA 必须查当前船期。" },
    { id: "base-cnytn-ausyd", originCode: "CNYTN", destinationCode: "AUSYD", rangeDays: [15, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-oceania", "one-point-to-point"], note: "盐田到悉尼按华南-澳洲线基准；目的港检疫和预约不含在航程内。" },
    { id: "base-cnytn-innsa", originCode: "CNYTN", destinationCode: "INNSA", rangeDays: [10, 18], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "盐田到那瓦舍瓦/JNPT 按印度西岸服务基准，需核中转港和目的港铁路。" },
    { id: "base-cnytn-phmnl", originCode: "CNYTN", destinationCode: "PHMNL", rangeDays: [3, 7], confidence: "baseline-lane", sourceIds: ["oocl-hksc-philippines", "one-point-to-point"], note: "盐田到马尼拉为华南近洋短程，清关资料和进口商能力常比海上航程更影响交付。" },

    { id: "base-cnszx-aejea", originCode: "CNSZX", destinationCode: "AEJEA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point"], note: "深圳/蛇口到杰贝阿里按华南-中东基准，需核是否经新加坡或巴生转运。" },
    { id: "base-cnszx-ausyd", originCode: "CNSZX", destinationCode: "AUSYD", rangeDays: [15, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-oceania", "one-point-to-point"], note: "深圳/蛇口到悉尼按华南-澳洲线基准；澳洲检疫和派送窗口另计。" },
    { id: "base-cnszx-phmnl", originCode: "CNSZX", destinationCode: "PHMNL", rangeDays: [3, 7], confidence: "baseline-lane", sourceIds: ["oocl-hksc-philippines", "one-point-to-point"], note: "深圳/蛇口到马尼拉为近洋短程，实际以承运人直航/转运为准。" },
    { id: "base-cnxmn-aejea", originCode: "CNXMN", destinationCode: "AEJEA", rangeDays: [15, 23], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point"], note: "厦门到杰贝阿里多需看华南或东南亚衔接，正式 ETA 以当前承运人计划为准。" },
    { id: "base-cnxmn-phmnl", originCode: "CNXMN", destinationCode: "PHMNL", rangeDays: [4, 8], confidence: "baseline-lane", sourceIds: ["oocl-hksc-philippines", "one-point-to-point"], note: "厦门到马尼拉为近洋航线，需核挂靠和目的港清关窗口。" },
    { id: "base-cnqgd-aejea", originCode: "CNQDG", destinationCode: "AEJEA", rangeDays: [18, 28], confidence: "baseline-lane", sourceIds: ["oocl-hksc-middle-east", "maersk-point-to-point"], note: "青岛到杰贝阿里可能经华东/釜山/新加坡衔接，船司服务差异较大。" },

    { id: "base-cnsha-ussea", originCode: "CNSHA", destinationCode: "USSEA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到西雅图按美西北服务基准；铁路/内陆派送和码头窗口需另核。" },
    { id: "base-cnsha-ussav", originCode: "CNSHA", destinationCode: "USSAV", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point", "dcsa-commercial-schedules"], note: "上海到萨凡纳按美东服务基准；常受巴拿马/苏伊士服务组合和美东内陆段影响。" },
    { id: "base-cnsha-cavan", originCode: "CNSHA", destinationCode: "CAVAN", rangeDays: [16, 25], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "one-point-to-point"], note: "上海到温哥华按加拿大西岸基准；港口、铁路和天气会影响内陆交付。" },
    { id: "base-cnsha-esvlc", originCode: "CNSHA", destinationCode: "ESVLC", rangeDays: [27, 39], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "上海到瓦伦西亚按远东-地中海基准；红海/绕航和中转需实时复核。" },
    { id: "base-cnsha-brssz", originCode: "CNSHA", destinationCode: "BRSSZ", rangeDays: [32, 46], confidence: "baseline-lane", sourceIds: ["oocl-hksc-latin-america", "maersk-point-to-point"], note: "上海到桑托斯按远东-南美东服务基准；巴西清关、木包装和目的港费用是关键变量。" },
    { id: "base-cnsha-zadur", originCode: "CNSHA", destinationCode: "ZADUR", rangeDays: [28, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-africa", "maersk-point-to-point"], note: "上海到德班按远东-南非基准；港口拥堵和内陆衔接风险通常偏高。" },
    { id: "base-cnsha-kemba", originCode: "CNSHA", destinationCode: "KEMBA", rangeDays: [26, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-africa", "maersk-point-to-point"], note: "上海到蒙巴萨按远东-东非基准；中转和当地清关/内陆转运需核验。" },
    { id: "base-cnsha-lkcmb", originCode: "CNSHA", destinationCode: "LKCMB", rangeDays: [10, 18], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "上海到科伦坡按印度洋中转枢纽基准；转运衔接会影响实际 ETA。" },

    { id: "base-cnnGB-usnyc", originCode: "CNNGB", destinationCode: "USNYC", rangeDays: [29, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "宁波到纽约/新泽西按美东服务基准，需核具体服务是否经巴拿马或其他转运。" },
    { id: "base-cnnGB-ussea", originCode: "CNNGB", destinationCode: "USSEA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "one-point-to-point"], note: "宁波到西雅图按美西北基准；码头与铁路窗口需另核。" },
    { id: "base-cnnGB-ussav", originCode: "CNNGB", destinationCode: "USSAV", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "宁波到萨凡纳按美东基准；内陆铁路和目的港预约影响交付。" },
    { id: "base-cnnGB-cavan", originCode: "CNNGB", destinationCode: "CAVAN", rangeDays: [16, 25], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "one-point-to-point"], note: "宁波到温哥华按加拿大西岸基准；劳工、天气和铁路衔接需实时复核。" },
    { id: "base-cnnGB-beanr", originCode: "CNNGB", destinationCode: "BEANR", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "宁波到安特卫普/布鲁日按北欧基准；目的港内陆段和 EORI/VAT 资料要同步核。" },
    { id: "base-cnnGB-esvlc", originCode: "CNNGB", destinationCode: "ESVLC", rangeDays: [27, 39], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "宁波到瓦伦西亚按地中海基准；红海绕航和中转港会显著改变计划。" },
    { id: "base-cnnGB-brssz", originCode: "CNNGB", destinationCode: "BRSSZ", rangeDays: [33, 47], confidence: "baseline-lane", sourceIds: ["oocl-hksc-latin-america", "maersk-point-to-point"], note: "宁波到桑托斯按南美东基准；巴西目的港清关和费用需逐票核。" },
    { id: "base-cnnGB-zadur", originCode: "CNNGB", destinationCode: "ZADUR", rangeDays: [29, 43], confidence: "baseline-lane", sourceIds: ["oocl-hksc-africa", "maersk-point-to-point"], note: "宁波到德班按南非基准；拥堵、铁路和港区安全风险需另看实时层。" },
    { id: "base-cnnGB-lkcmb", originCode: "CNNGB", destinationCode: "LKCMB", rangeDays: [10, 18], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "宁波到科伦坡按印度洋中转枢纽基准；转运衔接决定实际 ETA。" },

    { id: "base-cnytn-usnyc", originCode: "CNYTN", destinationCode: "USNYC", rangeDays: [29, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "盐田到纽约/新泽西按华南-美东基准；美东港口和内陆段需另核。" },
    { id: "base-cnytn-ussea", originCode: "CNYTN", destinationCode: "USSEA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "one-point-to-point"], note: "盐田到西雅图按美西北基准；旺季和铁路窗口影响内陆交付。" },
    { id: "base-cnytn-ussav", originCode: "CNYTN", destinationCode: "USSAV", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "盐田到萨凡纳按美东基准；交期承诺前核船司服务和目的港预约。" },
    { id: "base-cnytn-cavan", originCode: "CNYTN", destinationCode: "CAVAN", rangeDays: [15, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "one-point-to-point"], note: "盐田到温哥华按加拿大西岸基准；港口/铁路异常需实时复核。" },
    { id: "base-cnytn-beanr", originCode: "CNYTN", destinationCode: "BEANR", rangeDays: [28, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "盐田到安特卫普/布鲁日按北欧干线基准；红海和转运安排影响 ETA。" },
    { id: "base-cnytn-esvlc", originCode: "CNYTN", destinationCode: "ESVLC", rangeDays: [25, 37], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "盐田到瓦伦西亚按地中海基准；需核红海/绕航和目的港内陆段。" },
    { id: "base-cnytn-brssz", originCode: "CNYTN", destinationCode: "BRSSZ", rangeDays: [32, 46], confidence: "baseline-lane", sourceIds: ["oocl-hksc-latin-america", "maersk-point-to-point"], note: "盐田到桑托斯按南美东基准；巴西清关和目的港费用对交付影响大。" },
    { id: "base-cnytn-zadur", originCode: "CNYTN", destinationCode: "ZADUR", rangeDays: [27, 41], confidence: "baseline-lane", sourceIds: ["oocl-hksc-africa", "maersk-point-to-point"], note: "盐田到德班按南非基准；港口拥堵和内陆铁路需另核。" },
    { id: "base-cnytn-lkcmb", originCode: "CNYTN", destinationCode: "LKCMB", rangeDays: [8, 15], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "盐田到科伦坡按印度洋中转基准；常作为南亚/中东/非洲转运节点。" },

    { id: "base-cnszx-usnyc", originCode: "CNSZX", destinationCode: "USNYC", rangeDays: [29, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "深圳/蛇口到纽约/新泽西按美东基准；需核是否经华南主港直装或转运。" },
    { id: "base-cnszx-ussea", originCode: "CNSZX", destinationCode: "USSEA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "one-point-to-point"], note: "深圳/蛇口到西雅图按美西北基准；码头和铁路窗口需复核。" },
    { id: "base-cnszx-ussav", originCode: "CNSZX", destinationCode: "USSAV", rangeDays: [30, 42], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "深圳/蛇口到萨凡纳按美东基准；旺季舱位和目的港预约影响交付。" },
    { id: "base-cnszx-deham", originCode: "CNSZX", destinationCode: "DEHAM", rangeDays: [28, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "深圳/蛇口到汉堡按华南-北欧基准；红海/绕航风险需实时复核。" },
    { id: "base-cnszx-beanr", originCode: "CNSZX", destinationCode: "BEANR", rangeDays: [28, 40], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "深圳/蛇口到安特卫普/布鲁日按北欧基准；目的港内陆派送需另核。" },
    { id: "base-cnszx-esvlc", originCode: "CNSZX", destinationCode: "ESVLC", rangeDays: [25, 37], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "深圳/蛇口到瓦伦西亚按地中海基准；中转和绕航会改变计划。" },
    { id: "base-cnszx-innsa", originCode: "CNSZX", destinationCode: "INNSA", rangeDays: [10, 18], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "深圳/蛇口到那瓦舍瓦/JNPT 按印度西岸基准；清关和内陆铁路另核。" },
    { id: "base-cnszx-lkcmb", originCode: "CNSZX", destinationCode: "LKCMB", rangeDays: [8, 15], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "深圳/蛇口到科伦坡按印度洋中转基准；转运衔接决定实际 ETA。" },

    { id: "base-cnxmn-usnyc", originCode: "CNXMN", destinationCode: "USNYC", rangeDays: [31, 43], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "厦门到纽约/新泽西常需衔接主干服务，需核华南/华东中转和当前 ETD/ETA。" },
    { id: "base-cnxmn-deham", originCode: "CNXMN", destinationCode: "DEHAM", rangeDays: [29, 41], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "厦门到汉堡按福建-北欧基准；可能经华南/新加坡衔接，正式船期需核。" },
    { id: "base-cnxmn-ausyd", originCode: "CNXMN", destinationCode: "AUSYD", rangeDays: [16, 25], confidence: "baseline-lane", sourceIds: ["oocl-hksc-oceania", "one-point-to-point"], note: "厦门到悉尼按澳洲线基准；需核是否直航或经华南中转。" },
    { id: "base-cnxmn-innsa", originCode: "CNXMN", destinationCode: "INNSA", rangeDays: [11, 19], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "厦门到那瓦舍瓦/JNPT 按印度西岸基准；中转和目的港内陆另核。" },
    { id: "base-cnxmn-lkcmb", originCode: "CNXMN", destinationCode: "LKCMB", rangeDays: [9, 16], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "厦门到科伦坡按印度洋中转基准；转运窗口需核承运人计划。" },

    { id: "base-cnqgd-usnyc", originCode: "CNQDG", destinationCode: "USNYC", rangeDays: [31, 43], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "青岛到纽约/新泽西按华北/山东-美东基准；可能经釜山或华东衔接。" },
    { id: "base-cnqgd-deham", originCode: "CNQDG", destinationCode: "DEHAM", rangeDays: [31, 43], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "青岛到汉堡按华北/山东-北欧基准；服务组合和中转港差异较大。" },
    { id: "base-cnqgd-innsa", originCode: "CNQDG", destinationCode: "INNSA", rangeDays: [14, 22], confidence: "baseline-lane", sourceIds: ["oocl-hksc-india-subcontinent", "maersk-point-to-point"], note: "青岛到那瓦舍瓦/JNPT 可能经东南亚或华东衔接，需核当前船司计划。" },
    { id: "base-cntxg-uslax", originCode: "CNTXG", destinationCode: "USLAX", rangeDays: [16, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "天津到洛杉矶按华北-美西基准；可能经釜山或华东中转。" },
    { id: "base-cntxg-usnyc", originCode: "CNTXG", destinationCode: "USNYC", rangeDays: [32, 44], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "天津到纽约/新泽西按华北-美东基准；服务组合和中转需逐票核。" },
    { id: "base-cntxg-deham", originCode: "CNTXG", destinationCode: "DEHAM", rangeDays: [32, 44], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "天津到汉堡按华北-北欧基准；冬季天气、转运和绕航需实时复核。" },
    { id: "base-cndlc-uslax", originCode: "CNDLC", destinationCode: "USLAX", rangeDays: [16, 24], confidence: "baseline-lane", sourceIds: ["oocl-hksc-north-america", "maersk-point-to-point"], note: "大连到洛杉矶按东北-美西基准；可能经釜山或华北/华东衔接。" },
    { id: "base-cndlc-deham", originCode: "CNDLC", destinationCode: "DEHAM", rangeDays: [32, 44], confidence: "baseline-lane", sourceIds: ["oocl-hksc-europe", "hapag-schedule-download"], note: "大连到汉堡按东北-北欧基准；具体服务和中转港需核承运人计划。" },

    { id: "base-cnsha-cnytn", originCode: "CNSHA", destinationCode: "CNYTN", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "上海到盐田按国内沿海华东-华南通道，内贸箱需核承运人开航和截关。" },
    { id: "base-cnsha-cnszx", originCode: "CNSHA", destinationCode: "CNSZX", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "上海到深圳/蛇口按国内沿海主通道，支线/内贸服务会影响到港窗口。" },
    { id: "base-cnsha-cnxmn", originCode: "CNSHA", destinationCode: "CNXMN", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "上海到厦门为华东-福建沿海短程，需核具体船司和码头。" },
    { id: "base-cnnGB-cnxmn", originCode: "CNNGB", destinationCode: "CNXMN", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "宁波到厦门按国内沿海短程，可能经支线或中转。" },
    { id: "base-cnnGB-cnytn", originCode: "CNNGB", destinationCode: "CNYTN", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "宁波到盐田为华东-华南内贸主通道，截关和天气需复核。" },
    { id: "base-cnqdg-cnsha", originCode: "CNQDG", destinationCode: "CNSHA", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "青岛到上海按国内沿海短程，港区和中转安排影响 ETA。" },
    { id: "base-cntxg-cnsha", originCode: "CNTXG", destinationCode: "CNSHA", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "天津到上海按环渤海-华东内贸通道，冬季天气和港口窗口需复核。" },
    { id: "base-cndlc-cnsha", originCode: "CNDLC", destinationCode: "CNSHA", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "大连到上海按东北-华东内贸通道，具体看船司开航。" },
    { id: "base-cnsha-cntxg", originCode: "CNSHA", destinationCode: "CNTXG", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "上海到天津为华东-环渤海内贸通道，冬季天气和港区窗口需复核。" },
    { id: "base-cnsha-cnqdg", originCode: "CNSHA", destinationCode: "CNQDG", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "上海到青岛为国内沿海短程，实际以开航日和码头挂靠为准。" },
    { id: "base-cnxmn-cnsha", originCode: "CNXMN", destinationCode: "CNSHA", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "厦门到上海为福建-华东沿海短程，需核具体船司和码头。" },
    { id: "base-cnytn-cnsha", originCode: "CNYTN", destinationCode: "CNSHA", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "盐田到上海为华南-华东内贸主通道，天气和截关影响实际 ETA。" },
    { id: "base-cnszx-cnsha", originCode: "CNSZX", destinationCode: "CNSHA", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "深圳/蛇口到上海为华南-华东内贸通道，需核驳船/支线和主线衔接。" },
    { id: "base-cnxmn-cnytn", originCode: "CNXMN", destinationCode: "CNYTN", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "厦门到盐田为福建-华南短程，需核是否直航或经蛇口/南沙中转。" },
    { id: "base-cnqzh-cnytn", originCode: "CNQZH", destinationCode: "CNYTN", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "钦州到盐田为北部湾-珠三角沿海通道，需核北部湾港区和华南中转。" },
    { id: "base-cnytn-cnqzh", originCode: "CNYTN", destinationCode: "CNQZH", rangeDays: [2, 4], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "盐田到钦州按华南-北部湾内贸/支线通道，需核北部湾港区。" },
    { id: "base-cnxmn-cnqzh", originCode: "CNXMN", destinationCode: "CNQZH", rangeDays: [3, 5], confidence: "domestic-lane", sourceIds: ["cosco-service-schedule"], note: "厦门到钦州按福建-北部湾沿海通道，需核是否中转华南。" }
  ],
  downloads: [
    {
      id: "oocl-hksc-japan",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "日本",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_JPN.xls"
    },
    {
      id: "oocl-hksc-korea",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "韩国",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_KOR.xls"
    },
    {
      id: "oocl-hksc-middle-east",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "中东及红海",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_MID.xls"
    },
    {
      id: "oocl-hksc-india-subcontinent",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "印度、斯里兰卡及南亚次大陆",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_INA_SUBCON_SRI.xls"
    },
    {
      id: "oocl-hksc-north-china",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "华北",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_NPRC.xls"
    },
    {
      id: "oocl-hksc-southeast-asia",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "新加坡、马来西亚、印度尼西亚、柬埔寨及缅甸",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_SIN_MAL_INDO.xls"
    },
    {
      id: "oocl-hksc-taiwan",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "台湾",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_TWN.xls"
    },
    {
      id: "oocl-hksc-philippines",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "菲律宾",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_PHI.xls"
    },
    {
      id: "oocl-hksc-thailand",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "泰国",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_THI.xls"
    },
    {
      id: "oocl-hksc-vietnam",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "越南",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Asia%20-%20Middle%20East/OUT_ASI_HKG_VND.xls"
    },
    {
      id: "oocl-hksc-africa",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "非洲",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Africa/OUT_ASI_HKG_AFR.xls"
    },
    {
      id: "oocl-hksc-oceania",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "澳大利亚及新西兰",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Australia%20-%20New%20Zealand/OUT_AUS_HKG_AUS.xls"
    },
    {
      id: "oocl-hksc-europe",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "欧洲及地中海",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Europe/OUT_EUR_HKG_EUR.xls"
    },
    {
      id: "oocl-hksc-north-america",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "美国及加拿大",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20North%20America/OUT_NAM_HKG_NAMR.xls"
    },
    {
      id: "oocl-hksc-latin-america",
      sourceId: "oocl-schedule-download",
      mode: "sea",
      originScope: "香港及华南出口",
      destinationScope: "墨西哥及拉丁美洲",
      format: "xls",
      cadence: "weekly",
      url: "https://www.oocl.com/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20Download/HK%20and%20South%20China/Export%20to%20Latin%20America/OUT_LAM_HKG_SAMR.xls"
    },
    {
      id: "lufthansa-cargo-all-flights-csv",
      sourceId: "lufthansa-cargo-download",
      mode: "air",
      originScope: "汉莎货运全球网络",
      destinationScope: "未来21天全部公开班期",
      format: "csv",
      cadence: "daily",
      url: "https://www.lufthansa-cargo.com/documents/20184/1559830/LHcargo_FlightSchedule.csv"
    },
    {
      id: "lufthansa-cargo-all-flights-xlsx",
      sourceId: "lufthansa-cargo-download",
      mode: "air",
      originScope: "汉莎货运全球网络",
      destinationScope: "未来21天全部公开班期",
      format: "xlsx",
      cadence: "daily",
      url: "https://www.lufthansa-cargo.com/documents/20184/1559830/LHcargo_FlightSchedule.xlsx"
    },
    {
      id: "lufthansa-cargo-all-flights-xml",
      sourceId: "lufthansa-cargo-download",
      mode: "air",
      originScope: "汉莎货运全球网络",
      destinationScope: "未来21天全部公开班期",
      format: "xml",
      cadence: "daily",
      url: "https://www.lufthansa-cargo.com/documents/20184/1559830/LHcargo_FlightSchedule.xml"
    }
  ],
  records: [
    {
      id: "maersk-cnxmn-thlch-20260716-629s",
      mode: "sea",
      originCode: "CNXMN",
      destinationCode: "THLCH",
      carrier: "Maersk",
      vessel: "G. Dragon",
      voyage: "629S",
      departureDate: "2026-07-16",
      arrivalDate: "2026-07-24",
      transitHours: 183,
      directness: "按船司查询结果",
      sourceId: "maersk-point-to-point",
      evidenceType: "carrier-query-capture",
      capturedAt: "2026-07-15",
      confidence: "carrier-published",
      note: "用户提供的马士基点到点船期查询结果；计划船期可能因运营调整而变化。"
    },
    {
      id: "maersk-cnxmn-thlch-20260722-630s",
      mode: "sea",
      originCode: "CNXMN",
      destinationCode: "THLCH",
      carrier: "Maersk",
      vessel: "Erasmus Queen",
      voyage: "630S",
      departureDate: "2026-07-22",
      arrivalDate: "2026-07-31",
      transitHours: 214,
      directness: "按船司查询结果",
      sourceId: "maersk-point-to-point",
      evidenceType: "carrier-query-capture",
      capturedAt: "2026-07-15",
      confidence: "carrier-published",
      note: "用户提供的马士基点到点船期查询结果；计划船期可能因运营调整而变化。"
    },
    {
      id: "oocl-seap-cnsha-uslax-20260801-clo357",
      mode: "sea",
      originCode: "CNSHA",
      destinationCode: "USLAX",
      carrier: "OOCL / CMA CGM",
      vessel: "CMA CGM CALLISTO",
      voyage: "CLO/357",
      departureDate: "2026-08-01",
      arrivalDate: "2026-08-18",
      transitHours: 408,
      directness: "OOCL SEAP 官方服务表港口窗口",
      sourceId: "oocl-seap-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "上海港窗口 7月31日-8月1日，洛杉矶港窗口 8月18日-22日；时长按离沪末日到抵洛首日计算，计划可能调整。"
    },
    {
      id: "oocl-eax1-sgsin-cnsha-20260717-lay029",
      mode: "sea",
      originCode: "SGSIN",
      destinationCode: "CNSHA",
      carrier: "OOCL",
      vessel: "SPIL CAYA",
      voyage: "LAY/029",
      departureDate: "2026-07-17",
      arrivalDate: "2026-07-26",
      transitHours: 216,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "新加坡港窗口 7月16-17日，上海港窗口 7月26-27日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-sgsin-cnsha-20260724-cpl119",
      mode: "sea",
      originCode: "SGSIN",
      destinationCode: "CNSHA",
      carrier: "OOCL",
      vessel: "COSCO SAO PAULO",
      voyage: "CPL/119",
      departureDate: "2026-07-24",
      arrivalDate: "2026-08-02",
      transitHours: 216,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "新加坡港窗口 7月23-24日，上海港窗口 8月2-3日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-sgsin-cnsha-20260731-vig001",
      mode: "sea",
      originCode: "SGSIN",
      destinationCode: "CNSHA",
      carrier: "OOCL",
      vessel: "VIRGO",
      voyage: "VIG/001",
      departureDate: "2026-07-31",
      arrivalDate: "2026-08-09",
      transitHours: 216,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "新加坡港窗口 7月30-31日，上海港窗口 8月9-10日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-sgsin-cnsha-20260807-sxy217",
      mode: "sea",
      originCode: "SGSIN",
      destinationCode: "CNSHA",
      carrier: "OOCL",
      vessel: "XIN YANG SHAN",
      voyage: "SXY/217",
      departureDate: "2026-08-07",
      arrivalDate: "2026-08-16",
      transitHours: 216,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "新加坡港窗口 8月6-7日，上海港窗口 8月16-17日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-kemba-sgsin-20260719-vig001",
      mode: "sea",
      originCode: "KEMBA",
      destinationCode: "SGSIN",
      carrier: "OOCL",
      vessel: "VIRGO",
      voyage: "VIG/001",
      departureDate: "2026-07-19",
      arrivalDate: "2026-07-30",
      transitHours: 264,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "蒙巴萨港窗口 7月17-19日，新加坡港窗口 7月30-31日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-kemba-sgsin-20260712-cpl119",
      mode: "sea",
      originCode: "KEMBA",
      destinationCode: "SGSIN",
      carrier: "OOCL",
      vessel: "COSCO SAO PAULO",
      voyage: "CPL/119",
      departureDate: "2026-07-12",
      arrivalDate: "2026-07-23",
      transitHours: 264,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "蒙巴萨港窗口 7月10-12日，新加坡港窗口 7月23-24日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-kemba-sgsin-20260726-sxy217",
      mode: "sea",
      originCode: "KEMBA",
      destinationCode: "SGSIN",
      carrier: "OOCL",
      vessel: "XIN YANG SHAN",
      voyage: "SXY/217",
      departureDate: "2026-07-26",
      arrivalDate: "2026-08-06",
      transitHours: 264,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "蒙巴萨港窗口 7月24-26日，新加坡港窗口 8月6-7日；按离港末日到抵港首日计算。"
    },
    {
      id: "oocl-eax1-cnsha-kemba-20260703-sxy217",
      mode: "sea",
      originCode: "CNSHA",
      destinationCode: "KEMBA",
      carrier: "OOCL",
      vessel: "XIN YANG SHAN",
      voyage: "SXY/217",
      departureDate: "2026-07-03",
      arrivalDate: "2026-07-24",
      transitHours: 504,
      directness: "OOCL EAX1 官方服务表港口窗口",
      sourceId: "oocl-eax1-service",
      evidenceType: "carrier-pdf-capture",
      capturedAt: "2026-07-20",
      confidence: "carrier-published",
      note: "上海港 7月3日，蒙巴萨港窗口 7月24-26日；按离港日到抵港首日计算。"
    }
  ]
};

(() => {
  const generated = window.LOGISTICS_GENERATED_SCHEDULE_DATA;
  const database = window.LOGISTICS_SCHEDULE_DATABASE;
  if (!generated || !database || !generated.services) return;

  const services = Object.values(generated.services).filter((service) => service?.snapshot?.status === "validated");
  const generatedSources = services.map((service) => service.source).filter(Boolean);
  const generatedDownloads = services.map((service) => service.download).filter(Boolean);
  const generatedRecords = services.flatMap((service) => Array.isArray(service.records) ? service.records : []);
  const generatedSourceIds = new Set(generatedSources.map((source) => source.id));

  database.sources = [
    ...(database.sources || []).filter((source) => !generatedSourceIds.has(source.id)),
    ...generatedSources
  ];
  database.downloads = [
    ...(database.downloads || []).filter((download) => !generatedDownloads.some((item) => item.id === download.id)),
    ...generatedDownloads
  ];
  database.records = [
    ...(database.records || []).filter((record) => !generatedSourceIds.has(record.sourceId)),
    ...generatedRecords
  ];
  database.updatedAt = generated.updatedAt || database.updatedAt;
  database.generatedSnapshot = {
    publisher: generated.publisher || "",
    sourcePage: generated.sourcePage || "",
    serviceCount: Number(generated.serviceCount || services.length),
    recordCount: Number(generated.recordCount || generatedRecords.length),
    routeCount: Number(generated.routeCount || 0),
    updatedAt: generated.updatedAt || "",
    failures: generated.lastRefresh?.failures || []
  };
})();
