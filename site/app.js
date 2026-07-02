const defaultCases = [
  {
    code: "8517629400",
    name: "无线耳机 / 蓝牙耳机",
    keywords: "无线耳机,蓝牙耳机,earbuds,headset,bluetooth,wireless,anc,tws",
    regulation: "演示数据：关注无线电型号核准、3C 边界、锂电池运输文件。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    role: "headphone",
    notes: "需确认是否含锂电池、蓝牙功能、是否成套零售包装。"
  },
  {
    code: "8518300000",
    name: "有线耳机、头戴式耳机",
    keywords: "有线耳机,wired headphone,headphone,headset,入耳式,头戴式",
    regulation: "演示数据：通常重点核验用途、连接方式、品牌型号和申报要素。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    role: "headphone",
    notes: "需区分无线功能、是否含麦克风、是否带独立控制模块。"
  },
  {
    code: "8518220000",
    name: "多喇叭音箱、Soundbar",
    keywords: "soundbar,音箱,多喇叭音箱,组合音箱,有箱体音箱,家庭影院,低音炮,bar speaker,speaker with enclosure",
    regulation: "演示数据：关注音视频设备认证、额定功率、无线功能和电源适配器。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    role: "finished-speaker",
    notes: "需确认箱体、喇叭数量、是否带功放、是否含电池或无线模块。"
  },
  {
    code: "8518290000",
    name: "扬声器 / Loudspeaker without enclosure",
    keywords: "扬声器,喇叭,裸扬声器,无箱体扬声器,嵌入式扬声器,汽车扬声器,loudspeaker without enclosure,speaker driver without enclosure",
    regulation: "演示数据：只写扬声器/喇叭且未说明箱体时，不能自动按多喇叭音箱；优先按无箱体扬声器方向核验。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 脱敏规则补充",
    role: "speaker-without-enclosure",
    notes: "需确认是否无箱体、喇叭数量、额定功率/尺寸、用途和是否只是音箱内部零件。"
  },
  {
    code: "8518400000",
    name: "音频扩大器 / 功放成品",
    keywords: "功放,功放机,音频扩大器,功率放大器,amplifier,audio amplifier,power amplifier,成品功放,整机功放",
    regulation: "演示数据：适用于具有音频信号放大功能的功放/扩大器成品；如果只是功放用功能板、遥控器、连接件或维修件，应转入零件/附件逻辑。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 归类逻辑补充",
    role: "finished-amplifier",
    notes: "需确认是否为完整可独立使用的功放，输入/输出、额定功率、声道数、电源方式和是否含无线/电池。"
  },
  {
    code: "8519813100",
    name: "激光唱机 / CD Player",
    keywords: "cd player,激光唱机,播放机,audio player,disc player",
    regulation: "演示数据：关注播放功能、介质类型、是否带录音/无线/网络功能。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    notes: "需确认是否为独立播放设备或整机配件。"
  },
  {
    code: "8543709990",
    name: "其他具有独立功能的电气设备",
    keywords: "遥控器,remote controller,module,adapter,控制器,独立功能,accessory",
    regulation: "演示数据：根据用途、无线功能、电气参数和是否专用零件进一步核验。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    role: "remote-accessory",
    notes: "维修件或附件需判断是否应作为专用零件归类。"
  },
  {
    code: "8544422900",
    name: "带接插件的电导体 / 音频或数据连接线",
    keywords: "连接线,线缆,电缆,带接头,带接插件,音频线,usb线,cable,connector cable,insulated conductor",
    regulation: "演示数据：线缆、连接线应按自身结构、电压、是否带接插件和用途判断，不按所连接的整机归类。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 归类逻辑补充",
    role: "cable",
    notes: "需确认电压、是否带接插件、线材用途、长度、接口类型和是否随整机进口。"
  },
  {
    code: "8531200000",
    name: "液晶显示板 / 指示面板组件",
    keywords: "LCD显示板组件,液晶显示板,显示屏组件,显示面板,指示面板,indicator panel,lcd display,lcd module,display module,多喇叭音箱用LCD显示板组件",
    regulation: "演示数据：显示板/指示面板组件按显示或指示功能自身判断，不因用于音箱就自动归入 8518 音频设备或其零件。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 归类逻辑补充",
    role: "display-panel",
    notes: "需确认是否为已装配显示模块、是否带驱动/控制功能、是否只是裸 LCD、接口和用途。"
  },
  {
    code: "4819100000",
    name: "瓦楞纸或纸板制的箱、盒、匣",
    keywords: "纸箱,外箱,瓦楞纸箱,包装箱,carton,corrugated box,paper box",
    regulation: "演示数据：包装材料通常按材质和包装形态判断，不能按被包装产品税号归类。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 归类逻辑补充",
    role: "packaging",
    notes: "需确认是否瓦楞纸、是否折叠纸盒、是否零售包装、尺寸层数和是否单独进口。"
  },
  {
    code: "8504401400",
    name: "电源适配器 / 稳压电源方向",
    keywords: "电源适配器,充电器,电源供应器,adapter,charger,power adapter,power supply,ac dc adapter",
    regulation: "演示数据：电源适配器按电源转换功能、电气参数和 3C 目录边界核验，不按随附整机税号归类。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 归类逻辑补充",
    role: "power-adapter",
    notes: "需确认输入/输出电压电流、功率、插头形式、是否随整机进口和是否中国内销。"
  },
  {
    code: "8518900000",
    name: "税目 8518 所列货品的零件 / 音频设备专用零件",
    keywords: "功放用功能板,功放功能板,功放板,功放用电路板,功放用控制板,音频功放板,放大器功能板,音箱用高音单元,音箱用低音单元,音箱用中音单元,高音单元,低音单元,中音单元,喇叭单元,扬声器单元,发声单元,驱动单元,speaker driver,tweeter,woofer,midrange driver,amplifier board,amplifier pcb,amp pcb,pcba,pcb assembly,功能板,电路板,线路板,控制板,主板,板卡,模块,专用模块,零件,配件,部件,维修件,spare part,parts,audio parts",
    regulation: "演示数据：如果是专用于 8518 项下音频设备的功能板、扬声器单元、结构件或其他零件，优先按音频设备零件方向初筛；正式仍需确认是否为空 PCB、独立功能模块或其他章注排除项目。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 脱敏规则补充",
    role: "audio-dedicated-part",
    notes: "重点核验：是否专用于 8518 项下音频设备；是否只是成品音箱/功放内的零件；是否属于裸 PCB、独立功能电气设备或其他更具体品目。"
  },
  {
    code: "8507600090",
    name: "锂离子蓄电池及电池组",
    keywords: "锂电池,电池组,battery,li-ion,power bank,充电盒,charging case",
    regulation: "演示数据：可能涉及 3C、UN38.3、MSDS、危险品运输限制。",
    lastUsed: "演示数据",
    source: "脱敏通用样例",
    role: "battery",
    notes: "需确认容量 Wh、包装方式、是否单独销售、运输方式。"
  },
  {
    code: "8534009000",
    name: "其他印刷电路",
    keywords: "裸板,裸印刷电路板,未装配电路板,空白电路板,bare pcb,printed circuit,printed circuit board,pcb blank,无元器件,未焊接,未贴片",
    regulation: "演示数据：裸印刷电路板优先按 8534 印刷电路方向初筛；如果已装配元器件，则需要重新判断是否为专用零件或独立功能模块。",
    lastUsed: "演示数据",
    source: "中国2026税则 + 归类逻辑补充",
    role: "bare-pcb",
    notes: "重点核验：是否已经装配电子元件；是否仅为裸 PCB；层数、材质和用途需补充。"
  }
];

const SERVER_API_BASE = window.location.origin || "https://156-238-241-168.sslip.io";

const hsValidationCases = [
  {
    id: "wireless-earbuds",
    title: "蓝牙降噪耳机成品",
    expected: "8517629400",
    allowed: [/^851762/],
    boundary: "蓝牙/无线耳机成品不能因为含喇叭、电池、电路板就转成 851890 零件。",
    values: {
      productName: "蓝牙降噪耳机",
      englishName: "Bluetooth ANC earbuds",
      productCategory: "Headphone / Earbuds",
      tradeDirection: "进口",
      material: "塑料外壳、锂电池、电路板、喇叭单元",
      usage: "无线连接手机播放声音，带麦克风和充电盒",
      destination: "美国",
      originCountry: "中国",
      modelInfo: "零售包装，完整成品，Bluetooth，无线耳机，含充电盒。"
    }
  },
  {
    id: "wired-headphone",
    title: "有线耳机成品",
    expected: "8518300000",
    allowed: [/^851830/],
    boundary: "有线耳机成品优先看耳机税号；不要按喇叭单元或音频设备零件处理。",
    values: {
      productName: "有线头戴式耳机",
      englishName: "Wired headphone",
      productCategory: "Headphone / Earbuds",
      tradeDirection: "进口",
      material: "塑料、金属、线缆、扬声器单元",
      usage: "有线连接设备播放声音，不含电池",
      destination: "中国",
      originCountry: "越南",
      modelInfo: "完整成品，零售包装，带线控麦克风。"
    }
  },
  {
    id: "speaker-no-enclosure",
    title: "无箱体扬声器",
    expected: "8518290000",
    allowed: [/^851829/],
    boundary: "无箱体/裸扬声器不是多喇叭音箱；必须先确认有无箱体。",
    values: {
      productName: "扬声器",
      englishName: "Loudspeaker without enclosure",
      productCategory: "Loudspeaker Driver / Speaker Unit",
      tradeDirection: "进口",
      material: "金属、磁体、纸盆",
      usage: "播放声音，未装入箱体",
      destination: "中国",
      originCountry: "中国",
      modelInfo: "无箱体，圆形，6.5寸，额定功率 50W，作为扬声器成品单独进口。"
    }
  },
  {
    id: "tweeter-part",
    title: "多喇叭音箱用高音单元",
    expected: "8518900000",
    allowed: [/^851890/],
    boundary: "专用于音箱内部的高音/低音单元是零件方向，不是完整音箱成品。",
    values: {
      productName: "多喇叭音箱用高音单元",
      englishName: "Tweeter driver unit for loudspeaker system",
      productCategory: "Loudspeaker Driver / Speaker Unit",
      tradeDirection: "进口",
      material: "金属、磁体、振膜",
      usage: "专用于多喇叭音箱内部发声，维修备件",
      destination: "中国",
      originCountry: "美国",
      modelInfo: "高音单元，适用于指定音箱型号，非完整音箱，无箱体。"
    }
  },
  {
    id: "amplifier-board",
    title: "功放用功能板",
    expected: "8518900000",
    allowed: [/^851890/, /^853400/],
    boundary: "功放用功能板不能因为“功放”二字按 851840 功放成品；还要确认是否裸 PCB。",
    values: {
      productName: "功放用功能板",
      englishName: "Amplifier audio processing PCBA",
      productCategory: "Audio PCBA / Dedicated Part",
      tradeDirection: "进口",
      material: "已装配电路板、电子元器件",
      usage: "用于功放机内部音频信号处理和放大控制",
      destination: "中国",
      originCountry: "美国",
      modelInfo: "已装配 PCBA，专用于 AVR 功放维修，不是完整功放成品。"
    }
  },
  {
    id: "amplifier-remote",
    title: "功放用遥控器",
    expected: "8543709990",
    allowed: [/^854370/, /^852692/],
    boundary: "遥控器按自身控制功能判断，不按功放整机或功放零件简单处理。",
    values: {
      productName: "功放用遥控器",
      englishName: "Remote controller for amplifier",
      productCategory: "Remote / Accessory",
      tradeDirection: "进口",
      material: "塑料外壳、电路板、按键",
      usage: "遥控功放音量、输入源、待机等功能",
      destination: "中国",
      originCountry: "越南",
      modelInfo: "可独立遥控主机，不含锂电池，适用于 AVR 功放。"
    }
  },
  {
    id: "audio-processor",
    title: "音频处理器，无功放无扬声",
    expected: "8543709990",
    allowed: [/^854370/],
    boundary: "无功率放大、无扬声、无收音机功能的音视频/音频处理器优先看 8543709990 方向。",
    values: {
      productName: "音频处理器",
      englishName: "Audio processor",
      productCategory: "Independent Audio Processor / Electrical Function",
      tradeDirection: "进口",
      material: "金属外壳、电路板、接口模块",
      usage: "处理音频信号，解码和转换信号",
      destination: "中国",
      originCountry: "美国",
      modelInfo: "独立工作，无功率放大，无扬声功能，无收音机功能。"
    }
  },
  {
    id: "audio-processor-radio",
    title: "带收音机功能的音视频处理器",
    expected: "8527910000",
    allowed: [/^852791/],
    boundary: "如果音视频处理器明确带收音/广播接收功能，要转看 852791 方向复核。",
    values: {
      productName: "带收音机功能的音视频处理器",
      englishName: "AV processor with radio receiver",
      productCategory: "Independent Audio Processor / Electrical Function",
      tradeDirection: "进口",
      material: "电路板、金属外壳、显示屏",
      usage: "音视频信号处理并内置 FM/AM 收音机功能",
      destination: "中国",
      originCountry: "中国",
      modelInfo: "独立设备，有收音机功能，无内置扬声器。"
    }
  },
  {
    id: "speaker-lcd-display-panel",
    title: "多喇叭音箱用 LCD 显示板组件",
    expected: "8531200000",
    allowed: [/^853120/],
    boundary: "LCD 显示板/指示面板组件按显示或指示功能自身判断，不能因为用于多喇叭音箱就落到 851822 或 851890。",
    values: {
      productName: "多喇叭音箱用 LCD 显示板组件",
      englishName: "LCD display panel module for speaker system",
      productCategory: "Display / Indicator Panel",
      tradeDirection: "进口",
      material: "LCD 显示板、已装配电子元器件、排线接口",
      usage: "用于音箱面板显示状态和菜单信息",
      destination: "中国",
      originCountry: "美国",
      modelInfo: "显示板组件，带 LCD 显示功能，非完整音箱，非扬声器单元。"
    }
  },
  {
    id: "corrugated-carton",
    title: "瓦楞纸箱/包装箱",
    expected: "4819100000",
    allowed: [/^481910/],
    boundary: "包装材料按纸制包装品和材质结构判断，不按被包装的音频产品归类。",
    values: {
      productName: "瓦楞纸箱",
      englishName: "Corrugated carton",
      productCategory: "Packaging / Carton",
      tradeDirection: "进口",
      material: "瓦楞纸板",
      usage: "用于音箱外包装，可折叠",
      destination: "中国",
      originCountry: "越南",
      modelInfo: "纸箱，瓦楞纸制，尺寸 54*40*22CM，单独进口。"
    }
  }
];

const users = [
  { name: "关务管理员", role: "维护 HS 样例、待人工核验事项和复核结论；正式申报前需要人工确认。" },
  { name: "采购/业务查询", role: "查询候选税号、DG 风险、港口风险和公开政策入口；高风险事项提交关务复核。" },
  { name: "物流/计划", role: "关注船期、舱单、里程碑、港口风险和文件准备状态。" },
  { name: "只读访客", role: "仅查看脱敏演示流程，不上传公司敏感资料。" }
];

const moduleItems = [
  ["总览", "一眼看到常用查询入口、电池风险、待人工核验、政策和港口风险。", "已上线"],
  ["税号/申报要素", "输入产品名称、用途、材质和关键参数，给出候选税号、风险提醒和申报资料清单。", "已上线"],
  ["政策变化", "集中放海关、认证、归类、目的国政策入口，并抓取公开新闻和政策解读。", "已上线"],
  ["全球趋势", "搜索过去一周经济、政治、金融、贸易、物流新闻，并给中文摘要。", "已上线"],
  ["船期和船舶位置", "输入船名和目的港，查询船舶大致位置、下一港、ETA，并保存预警规则。", "已上线"],
  ["通关状态入口", "给同事提单、箱号、上海港放行、单一窗口等查询入口和字段提醒。", "已接入"],
  ["空运/快件查询", "输入 UPS、DHL、FedEx、SF 等运单号，识别承运商、打开官网核验，并提示空运 DG/清关注意事项。", "已接入"],
  ["空运出运/到达注意", "单独说明空运发出前、安检、到达清关、待核验节点和不同产品风险。", "已上线"],
  ["出货节点", "后续可做订舱、开船、到港、报关、放行节点看板。", "后续"],
  ["电池/危险品", "判断锂电池、MSDS、UN38.3、包装方式和运输方式的风险。", "已上线"],
  ["港口风险", "输入港口，查看公开新闻风险、官方入口和人工确认清单。", "已上线"],
  ["查询失败/待人工核验", "记录税号不确定、缺文件、政策待确认、官网查询失败和低可信结果。", "已上线"],
  ["进口国要求查询", "输入产品大致信息和进口国，提示认证、标签、电池、无线和清关资料。", "已接入"],
  ["未来接口", "后续再接公司内部系统、报关行、船司、权限登录和数据库。", "后续"]
];

const workspaceModules = {
  dashboard: {
    title: "首页搜索",
    selectors: ["dashboard", "globalQueryPanel", "dashboardKpis", "dashboardGuide", "dashboardLauncher", ".dashboard-only"]
  },
  decision: { title: "综合决策助手", selectors: ["decision"] },
  hs: { title: "税号/申报要素", selectors: ["hs"] },
  matrix: { title: "进口国要求", selectors: ["matrix"] },
  battery: { title: "电池/危险品", selectors: ["battery"] },
  policy: { title: "政策变化雷达", selectors: ["policy"] },
  trends: { title: "全球趋势观察", selectors: ["trends"] },
  hotspots: { title: "热点快报", selectors: ["hotspots"] },
  codes: { title: "港口/机场代码查询", selectors: ["codes"] },
  "ops-fees": { title: "海运码头费用参考", selectors: ["sea-fees"] },
  "sea-fees": { title: "海运码头费用参考", selectors: ["sea-fees"] },
  shipment: { title: "船期和船舶位置", selectors: ["shipment"] },
  "sea-load": { title: "海运装载计算", selectors: ["sea-load"] },
  "sea-special": { title: "特种箱/非标货预备", selectors: ["sea-special"] },
  customs: { title: "通关/箱货放行", selectors: ["customs"] },
  "docs-invoice": { title: "箱单发票生成", selectors: ["docs-invoice"] },
  "docs-declaration": { title: "报关单生成", selectors: ["docs-declaration"] },
  air: { title: "空运/快件查询", selectors: ["air"] },
  "air-calc": { title: "非快件空运计算", selectors: ["air-calc"] },
  "air-fees": { title: "空运机场费用参考", selectors: ["air-fees"] },
  "air-guide": { title: "空运出运/到达注意", selectors: ["air-guide"] },
  "port-risk": { title: "港口/物流风险", selectors: ["port-risk"] },
  exception: { title: "查询失败/待人工核验", selectors: ["exception"] },
  feedback: { title: "用户反馈", selectors: ["feedback"] },
  learn: { title: "流程与术语库", selectors: ["learn"] }
};

const learningSteps = [
  {
    id: "product",
    no: "01",
    title: "产品和归类准备",
    phase: "出货前",
    visual: "boxes",
    summary: "先把货物说清楚：是什么、做什么、由什么组成、是不是无线/电池/配件。",
    owners: ["业务/产品：提供规格书、图片、用途", "关务：判断 HS、申报要素、监管条件", "认证/质量：判断认证和标签边界"],
    actions: ["确认产品名称、用途、材质、工作原理、型号和品牌", "区分成品、配件、零件、裸板、套装或维修件", "初筛 HS、基础税率、额外关税、3C/无线/电池/DG 风险"],
    documents: ["规格书", "产品图片", "BOM/材质说明", "标签样稿", "认证证书或测试报告"],
    risks: ["只写商品俗称会导致税号偏差", "成品和零件混淆会影响税号和税率", "含电池/无线但未说明会漏掉高风险要求"],
    mistakes: ["把“功放用功能板”按功放成品报", "把“扬声器单元”按完整音箱报", "没有说明无线/电池导致认证和 DG 漏判"],
    done: ["产品描述足够让关务判断货物形态", "候选 HS、税费和监管要求已有初筛", "缺失资料已列入异常或待补清单"],
    inputs: ["产品用途", "是否整机/配件", "材质和功能", "是否含电池/无线"],
    roleTips: {
      业务: "不要只给商品英文名，最好同时给图片、用途、卖点和客户使用场景。",
      关务: "重点看货物形态、归类依据、反证税号和额外关税命中。",
      物流: "先确认是否含电池、磁性、液体或 DG，避免订舱后被拒。"
    }
  },
  {
    id: "terms",
    no: "02",
    title: "报价和贸易条款",
    phase: "接单/报价",
    visual: "contract",
    summary: "确定 FOB、CIF、DAP、DDP 等条款，先讲清谁承担费用和风险。",
    owners: ["业务：和客户确认条款和交付边界", "财务/供应链：评估税费和运费影响", "物流：判断是否能按承诺时效交付"],
    actions: ["确认贸易条款、付款方式、交货地点和责任边界", "估算关税、增值税、清关费、港杂、运费和保险", "明确客户是否要求特殊文件、认证或标签"],
    documents: ["报价单", "销售合同/订单", "Incoterms 条款说明", "目的国要求清单"],
    risks: ["DDP 容易低估进口税费和当地责任", "没有把额外关税计入报价会影响利润", "交期承诺没有考虑港口、船期和查验风险"],
    mistakes: ["CIF 报价却默认自己不用管保险/目的港费用", "DDP 没算进口 VAT/GST 和清关杂费", "忽略美国/中国/欧盟额外贸易措施"],
    done: ["合同条款、费用边界、风险转移点已经写清", "税费和物流成本有保守估算", "客户特殊文件要求已确认"],
    inputs: ["目的国", "原产国", "HS", "货值", "贸易条款"],
    roleTips: {
      业务: "报价前先看税费、认证和船期风险，不要只看出厂价。",
      关务: "确认目的国税号和原产地逻辑，额外关税要单独列。",
      物流: "确认条款下谁订舱、谁买保险、谁承担目的港异常费用。"
    }
  },
  {
    id: "packing",
    no: "03",
    title: "生产、包装和装箱",
    phase: "装箱前",
    visual: "carton",
    summary: "货物装进箱子前，要把包装、标签、电池文件和装箱数据准备好。",
    owners: ["仓库/工厂：按订单备货、贴标、装箱", "质量：确认标签和认证标识", "物流/DG：确认电池和危险品文件"],
    actions: ["确认外箱唛头、数量、毛净重、体积和托盘方式", "检查标签语言、认证标识、型号和原产地标识", "含锂电池时准备 MSDS、UN38.3、运输鉴定/声明"],
    documents: ["装箱单", "外箱唛头", "MSDS", "UN38.3", "出货照片", "电池 Wh 信息"],
    risks: ["箱单数据错会影响报关、舱单和目的港清关", "标签缺失可能导致目的国查验或整改", "电池资料不全可能被船司/航司拒收"],
    mistakes: ["装箱数据临时改但没有同步报关/舱单", "锂电池 Wh、包装方式、MSDS 不完整", "目的国标签语言、认证标识没有提前核对"],
    done: ["件重尺、箱数、唛头和照片一致", "电池/DG 文件齐全并给到货代", "标签和包装满足目的国要求"],
    inputs: ["箱数", "重量体积", "包装方式", "电池资料", "标签样稿"],
    roleTips: {
      仓库: "箱单数据要和实际装柜一致，变更必须同步物流和报关。",
      物流: "含电池货物要在订舱前确认承运限制。",
      业务: "客户标签或包装要求要在生产包装前确认，不能等装柜后再改。"
    }
  },
  {
    id: "booking",
    no: "04",
    title: "订舱、拖车和截关",
    phase: "出运安排",
    visual: "truck",
    summary: "确认船司、船名航次、截关时间、拖车计划和是否赶得上装船。",
    owners: ["货代：订舱、放舱、安排拖车/报关", "物流：确认船期和出货节点", "仓库：按截关要求备货装柜"],
    actions: ["确认 ETD、ETA、截港、截单、截 VGM、截关时间", "安排提柜、装柜、还重和进港", "检查船司是否接受电池/DG 或特殊货物"],
    documents: ["订舱确认", "SO/放舱单", "VGM", "拖车计划", "货代操作单"],
    risks: ["截关时间错过会甩柜或改船", "DG/电池未提前申报会被拒载", "旺季、台风、港口拥堵会影响还柜和装船"],
    mistakes: ["只看 ETD 不看截港/截单/截关", "没有确认 VGM 截止时间", "船司变更后没有同步客户 ETA"],
    done: ["船名航次、截关、拖车、箱号、VGM 都已确认", "特殊货物已被船司接受", "异常备选船期已准备"],
    inputs: ["船司", "船名航次", "ETD/ETA", "截关时间", "箱号"],
    roleTips: {
      物流: "截关表要看全：截港、截单、截 VGM、截关不是同一个时间。",
      仓库: "装柜完成时间要倒推拖车和还重时间。",
      业务: "ETD 改变时及时同步客户，避免客户按旧船期安排收货。"
    }
  },
  {
    id: "exportCustoms",
    no: "05",
    title: "出口报关和舱单",
    phase: "离港前",
    visual: "customs",
    summary: "出口申报要和发票、箱单、舱单一致，查验/改单会直接影响装船。",
    owners: ["报关行：制作并发送出口申报", "关务：复核 HS、申报要素和监管证件", "货代：同步舱单和放行状态"],
    actions: ["核对发票、箱单、合同、HS、申报要素和监管证件", "发送出口报关资料和舱单数据", "跟踪海关放行、查验、改单和码头放行"],
    documents: ["商业发票", "装箱单", "合同", "报关单草稿", "舱单", "监管证件"],
    risks: ["申报要素不完整会退单", "舱单和报关数据不一致会影响放行", "查验或删改单会影响装船窗口"],
    mistakes: ["发票箱单品名和报关品名差异过大", "品牌型号、用途、材质、监管条件漏填", "舱单件重尺和报关资料不一致"],
    done: ["报关草单已复核", "申报要素和监管证件完整", "海关/码头放行状态已确认"],
    inputs: ["申报 HS", "申报要素", "发票箱单", "监管条件", "舱单状态"],
    roleTips: {
      关务: "高风险税号要保留归类依据和反证说明。",
      物流: "盯放行节点，查验/改单会直接影响装船。",
      业务: "报关品名不等于销售品名，客户文件口径要提前协调。"
    }
  },
  {
    id: "loading",
    no: "06",
    title: "港口装船和提单",
    phase: "开船前后",
    visual: "crane",
    summary: "货柜进港后要看码头放行、装船、开船和提单确认。",
    owners: ["码头：接收、堆存、装船", "船司/货代：确认装船和提单", "物流：核对装船状态和开船时间"],
    actions: ["确认重柜进港、码头放行、海关放行和装船状态", "核对提单草稿，包括收发货人、品名、件重尺和条款", "开船后拿到正式提单或电放/Sea Waybill 信息"],
    documents: ["提单草稿", "正式提单", "装船确认", "码头状态"],
    risks: ["提单信息错误会影响目的港换单和清关", "未装船但误以为已开船会误导 ETA", "电放/正本安排不清会影响放货"],
    mistakes: ["只看到进港就以为已装船", "提单收货人/通知人/件重尺未复核", "电放和正本提单安排没有和客户确认"],
    done: ["箱子已装船或已确认实际开船", "提单草稿已复核并确认放单方式", "提单号和箱号可用于后续跟踪"],
    inputs: ["提单号", "箱号", "装船状态", "开船时间", "电放/正本"],
    roleTips: {
      物流: "区分进港、海关放行、码头放行、装船、开船几个状态。",
      业务: "提单草稿务必让客户确认关键抬头和目的港资料。",
      进口商: "提单信息决定后续换单和清关，错误会造成目的港延误。"
    }
  },
  {
    id: "ocean",
    no: "07",
    title: "海运在途和 ETA 风险",
    phase: "在途",
    visual: "ship",
    summary: "在途不只是看 ETA，还要看数据时间、当前位置、天气、军演、转运和港口拥堵。",
    owners: ["物流：跟踪船位和节点", "货代/船司：提供最新船期和异常通知", "业务：同步客户交期预期"],
    actions: ["按船名/MMSI/箱号跟踪船位、下一港、ETA 和数据时间", "判断天气海况、台风季、港口拥堵、军演/禁航和绕航", "ETA 延误时提前预警客户、仓库、清关代理和进口商"],
    documents: ["船期查询结果", "船司通知", "异常记录", "ETA 预警规则"],
    risks: ["船位数据过期会误判交期", "转运港延误和绕航会改变 ETA", "目的港拥堵会影响靠泊和提柜"],
    mistakes: ["没有看船位数据时间，拿几天前位置判断 ETA", "只看船名不看 MMSI，选错同名船", "忽略台风、军演、拥堵和转运港延误"],
    done: ["船位和 ETA 有最新数据时间", "天气/军演/港口风险已有判断", "延误时已触发预警或通知相关人"],
    inputs: ["船名", "MMSI/IMO", "目的港", "箱号/提单号", "预想 ETA"],
    roleTips: {
      物流: "优先看数据时间和下一港，旧数据不能作为交期承诺。",
      业务: "客户交期要留余量，ETA 变动要有预警话术。",
      进口商: "提前准备换单、清关资料和仓库预约，别等到港才开始。"
    }
  },
  {
    id: "arrival",
    no: "08",
    title: "到港、换单和进口资料",
    phase: "到港前后",
    visual: "documents",
    summary: "船到港前，进口商和报关行要准备清关资料、换单和缴费安排。",
    owners: ["进口商：提供进口资质和当地文件", "目的港货代：换单、缴费、安排清关", "报关行：准备进口申报"],
    actions: ["确认到港通知、换单方式、到港费用和免堆期", "准备进口发票、箱单、提单、原产地文件、认证/许可证", "和当地进口商确认税号、税率、监管证件和标签要求"],
    documents: ["到港通知", "提单/电放", "发票箱单", "原产地证", "认证/许可证", "进口商资料"],
    risks: ["正本提单/电放不清会卡换单", "目的国认证或标签缺失会卡清关", "免堆期不足会产生仓储滞箱费"],
    mistakes: ["到港后才发现认证/许可证不完整", "电放未完成导致无法换单", "没有提前确认免堆期和目的港费用"],
    done: ["换单路径清楚，进口资料齐全", "当地进口商/报关行已确认税号和监管要求", "免堆免箱和提柜预约计划明确"],
    inputs: ["到港日期", "换单状态", "进口商资料", "目的国认证", "免堆期"],
    roleTips: {
      进口商: "提前核对进口资质、认证、标签和清关文件。",
      物流: "到港前就要看免堆期、换单和提柜预约。",
      业务: "客户特殊文件要求要在开船前确认，不要到港后补。"
    }
  },
  {
    id: "importCustoms",
    no: "09",
    title: "进口申报、缴税和查验",
    phase: "清关",
    visual: "stamp",
    summary: "进口清关要看税号、税费、额外关税、监管证件、查验和补资料。",
    owners: ["进口报关行：申报、缴税、跟进查验", "进口商：确认税费和资料", "关务/合规：复核高风险税号和监管要求"],
    actions: ["按目的国 HS、货值、原产地和贸易措施计算税费", "提交进口申报和监管证件，跟踪查验/估价/补料", "确认放行、缴税、查验结论和是否需要整改"],
    documents: ["进口报关单", "税单", "查验通知", "许可证/认证", "补料说明"],
    risks: ["额外关税漏算会影响成本", "认证/许可证缺失会导致扣货", "估价或归类争议会延长清关时间"],
    mistakes: ["只看基础关税，漏掉额外关税/反倾销/贸易救济", "进口国 HS 和中国出口 HS 直接照抄", "查验补资料响应慢导致仓储费增加"],
    done: ["税费、监管证件和清关资料已被当地报关行确认", "查验/补料有负责人和时限", "放行前异常和费用已同步业务"],
    inputs: ["目的国 HS", "原产国", "货值", "监管证件", "查验状态"],
    roleTips: {
      关务: "目的国税号、原产地和额外措施要分层展示。",
      进口商: "当地报关行口径最关键，需确认许可证、标签和估价资料。",
      业务: "清关异常要及时告知客户，不要等费用产生后再解释。"
    }
  },
  {
    id: "delivery",
    no: "10",
    title: "放行、提柜和复盘",
    phase: "交付后",
    visual: "delivery",
    summary: "海关和码头放行后，还要安排提柜、配送、费用核对和异常复盘。",
    owners: ["货代/拖车：预约提柜和送货", "仓库/客户：收货验收", "业务/财务：核对费用和客户交付"],
    actions: ["确认海关放行、码头放行、可提状态和预约窗口", "安排拖车送货、签收、还空箱和费用结算", "复盘延误、查验、额外费用和资料缺口，沉淀到异常记录"],
    documents: ["放行通知", "提货单", "签收单", "费用账单", "异常复盘记录"],
    risks: ["未看免堆/免箱期会产生额外费用", "码头放行和海关放行不是一回事", "异常不复盘会在下一票重复发生"],
    mistakes: ["海关放行后忘记看码头放行/船司放货", "超过免堆免箱才发现费用", "异常没有沉淀，下一票重复踩坑"],
    done: ["货物已提柜/送达/签收", "费用账单已核对", "延误和异常原因已复盘并形成改进项"],
    inputs: ["放行状态", "提柜预约", "免堆免箱", "送货地址", "异常原因"],
    roleTips: {
      物流: "放行不等于可提，需确认码头、船司、拖车预约三个状态。",
      财务: "核对港杂、仓储、滞箱和清关费是否合理。",
      业务: "把异常原因反馈给客户和内部，避免下一票重复。"
    }
  }
];

const airLearningSteps = [
  {
    id: "air-booking",
    no: "A1",
    title: "空运需求和承运限制确认",
    phase: "发出前",
    visual: "booking",
    summary: "先判断货物能不能走空运/快件，再决定用 DHL、UPS、FedEx、顺丰或普通空运。",
    owners: ["业务：确认客户交期、目的国、产品用途和货值", "物流：确认承运商是否接受电池、磁性、样品或维修件", "供应商/工厂：提供规格书、MSDS、UN38.3 和包装照片"],
    actions: ["确认是否含锂电池、磁性、液体、粉末、喷雾或高价值敏感货", "确认启运机场、目的国、收件人税号/进口资质", "让承运商先看产品资料，不要只问价格和时效"],
    documents: ["产品规格书", "商业发票", "装箱单", "MSDS/SDS", "UN38.3", "电池声明", "磁检/航空运输鉴定"],
    risks: ["电池单独运输、SOC 超标、资料不全容易被拒收", "品名太笼统会卡安检和目的国清关", "快件到港后也可能要求认证或进口商资料"],
    mistakes: ["把空运当成更快的海运，不提前看承运限制", "没有把电池、磁性、用途写清楚", "只看预计时效，不看目的国清关要求"],
    done: ["承运商确认可收", "关键文件齐全", "收件人可配合清关", "费用和时效已按风险留缓冲"],
    inputs: ["产品名称", "是否含电池", "Wh/SOC", "目的国", "收件人税号", "运输类型"],
    roleTips: {
      业务: "先别承诺客户一定几天到，确认能飞和清关资料后再给交期。",
      物流: "先拿文件给承运商预审，特别是电池、磁性、维修件。",
      关务: "发票品名、HS、用途和原产地要能支撑目的国清关。"
    }
  },
  {
    id: "air-docs",
    no: "A2",
    title: "空运单证和安检资料",
    phase: "制单/安检",
    visual: "docs",
    summary: "空运最怕文件缺口，商业发票、箱单、AWB 和电池/磁检资料要互相一致。",
    owners: ["物流/货代：制作 AWB、订舱和安检资料", "工厂：确认包装、外箱标签和电池数量", "关务/业务：复核发票、HS、货值和用途"],
    actions: ["核对发票、箱单、AWB 的品名、件重尺、收发货人一致", "含锂电池时确认 UN3480/3481、PI965/966/967 或 PI968/969/970", "磁性货物确认磁检或航空运输鉴定是否需要"],
    documents: ["AWB/快递运单", "Invoice", "Packing List", "MSDS", "UN38.3 Test Summary", "航空运输鉴定", "锂电池标签/声明"],
    risks: ["UN 编号或包装方式错会导致退运", "箱单件重尺与实际不符会影响安检和计费", "低申报或品名模糊会触发目的国补料"],
    mistakes: ["UN3480 和 UN3481 混用", "只给 MSDS 不给 UN38.3", "发票写 accessories 但不写具体产品"],
    done: ["AWB 已出", "安检资料通过预审", "承运商接收", "客户/收件人已收到清关文件"],
    inputs: ["AWB", "件数重量尺寸", "UN 编号", "包装方式", "承运商", "发票品名"],
    roleTips: {
      物流: "把承运商要求和截止时间写清，避免临近起飞才补文件。",
      关务: "看发票品名和 HS 是否支撑清关，尤其样品/维修件。",
      业务: "客户需要提前准备税号、授权书和付款凭证。"
    }
  },
  {
    id: "air-departure",
    no: "A3",
    title: "交货、安检和起飞",
    phase: "起飞前后",
    visual: "loading",
    summary: "交给承运商不等于已经起飞，要看揽收、安检、出港和实际起飞节点。",
    owners: ["仓库/工厂：按要求包装贴标并交货", "承运商/货代：安检、装机、更新轨迹", "物流：追踪异常状态并通知业务"],
    actions: ["确认揽收/入仓时间", "跟进安检是否通过", "看 ATD 或官网实际离港状态", "保存官网轨迹截图和数据时间"],
    documents: ["交货单", "入仓回单", "运单", "官网轨迹截图", "安检通过记录"],
    risks: ["安检失败会退件或改渠道", "航班调整会影响客户承诺", "周末/节假日可能影响下一段转运"],
    mistakes: ["看到 Picked up 就认为已起飞", "不保存异常截图", "未及时告诉客户航班滚动"],
    done: ["官网显示离港/Departed", "下一站或目的地状态可追踪", "异常已记录"],
    inputs: ["运单号", "承运商", "起飞机场", "官网更新时间", "异常词"],
    roleTips: {
      物流: "状态词很重要，Picked up、Processed、Departed 含义不同。",
      业务: "客户问交期时，用官网最新时间说明，不要只说预计。",
      关务: "出口申报/清单资料如需补正，要在起飞前处理。"
    }
  },
  {
    id: "air-customs",
    no: "A4",
    title: "到达和目的国清关",
    phase: "到达清关",
    visual: "customs",
    summary: "Arrived 不等于可派送，快件和空运到目的国后常卡在税号、收件人资料、认证和付款凭证。",
    owners: ["收件人/进口商：提供税号、授权和进口资质", "承运商/目的港代理：发起清关和补料", "业务/物流：协调客户及时回复"],
    actions: ["看官网是否出现 Clearance delay、Held、Exception", "确认是否缺进口商税号、付款凭证、用途说明或认证", "含无线/电池/电源时让收件人确认当地准入要求"],
    documents: ["进口商税号", "PO/付款凭证", "产品说明", "认证资料", "授权书", "补充发票/箱单"],
    risks: ["巴西、印度、中东等市场可能要求进口资质和本地认证", "客户不回复会产生仓储或退运", "快件也可能被正式查验"],
    mistakes: ["只看 Delivered 前的 Arrived，不跟清关", "目的国缺认证时才临时补", "没保存承运商补料要求"],
    done: ["清关完成", "税费已支付或确认责任", "派送安排明确", "异常关闭"],
    inputs: ["目的国", "清关状态词", "收件人税号", "认证资料", "税费责任"],
    roleTips: {
      业务: "客户要提前准备当地进口资料，尤其巴西/泰国/中东。",
      物流: "出现 Clearance delay 就截图，问承运商缺什么文件。",
      关务: "确认 HS、货值、原产地和认证是否与文件一致。"
    }
  },
  {
    id: "air-delivery",
    no: "A5",
    title: "派送、签收和异常复盘",
    phase: "派送/复盘",
    visual: "delivery",
    summary: "派送完成后要保留 POD、费用和异常记录，形成下一票的判断依据。",
    owners: ["承运商：派送和 POD", "业务：通知客户并确认签收", "物流/财务：核对运费、税费和附加费"],
    actions: ["保存 Delivered/POD 截图", "核对燃油、偏远、仓储、关税垫付等附加费", "把清关延误和补料要求沉淀到异常记录"],
    documents: ["POD", "费用账单", "税费账单", "异常复盘记录", "客户签收确认"],
    risks: ["偏远附加费、关税垫付费和仓储费容易漏算", "客户签收争议需要 POD 支撑", "异常不复盘会重复发生"],
    mistakes: ["签收后不核对附加费", "不记录目的国补料要求", "未把客户清关配合问题反馈给销售"],
    done: ["POD 已保存", "费用已核对", "异常原因已记录", "下一票预防动作明确"],
    inputs: ["POD", "费用账单", "异常原因", "客户反馈", "改进项"],
    roleTips: {
      物流: "把每次清关延误原因记录下来，后面可以做规则库。",
      财务: "核对燃油、偏远和关税垫付费是否已进报价或账单。",
      业务: "客户签收后仍要确认是否有税费或资料争议。"
    }
  }
];

const learningState = {
  filter: "all",
  role: "all",
  processMode: "sea"
};

const hsAssistProfiles = [
  {
    match: /扬声器单元|喇叭单元|高音单元|低音单元|中音单元|发声单元|speaker driver|tweeter|woofer|midrange/i,
    category: "Loudspeaker Driver / Speaker Unit",
    material: ["金属磁路", "纸盆/振膜", "音圈", "塑料/金属支架"],
    usage: ["作为音箱内部发声单元", "专用于音频设备维修或生产"],
    spec: ["是否无箱体", "尺寸/阻抗/功率", "是否单独发声单元", "对应整机型号"],
    questions: ["是否没有箱体？", "是否只是音箱内部零件？", "对应整机是什么？", "尺寸、阻抗、额定功率是多少？"]
  },
  {
    match: /功放.*(功能板|电路板|线路板|控制板|pcba|pcb|板|模块|零件|配件|部件|维修)|功放用|放大器.*(功能板|电路板|pcba|pcb|零件|配件)|amplifier\s*(board|pcb|pcba|module|part)/i,
    category: "Audio PCBA / Dedicated Part",
    material: ["已装配电子元器件的 PCBA", "裸 PCB", "连接器", "芯片/电容/电阻"],
    usage: ["作为功放/音箱内部功能板", "维修备件", "音频信号放大或控制"],
    spec: ["是否已装配元器件", "是否专用于 8518 音频设备", "是否裸 PCB", "对应整机型号"],
    questions: ["是裸 PCB 还是已装配 PCBA？", "是否专用于功放/音箱？", "是否能独立完成电气功能？", "对应整机和维修用途是什么？"]
  },
  {
    match: /(^|\s)(功放|功放机|音频扩大器|功率放大器)(\s|$)|\bamplifier\b|audio amplifier|power amplifier/i,
    category: "Amplifier / Audio Equipment",
    material: ["金属/塑料外壳", "功放电路", "电源模块", "接口端子", "散热结构"],
    usage: ["音频信号放大", "连接音箱输出声音", "家庭影音或专业音响使用"],
    spec: ["是否完整功放成品", "额定功率/声道数", "输入输出接口", "是否含无线/电池/适配器"],
    questions: ["是完整功放整机还是功放用零件？", "额定功率和声道数是多少？", "是否能独立工作？", "是否含蓝牙/电池/外接适配器？"]
  },
  {
    match: /音视频处理器|音频处理器|音频协调器|前级处理器|解码处理器|av\s*processor|audio\s*processor|sound\s*processor|digital\s*signal\s*processor|\bdsp\b|\bdac\b/i,
    category: "Independent Audio Processor / Electrical Function",
    material: ["金属/塑料外壳", "音频/视频处理电路", "DAC/处理芯片", "输入输出接口", "控制显示组件"],
    usage: ["音视频信号处理/解码/转换", "改善或调谐音质输出", "无功率放大及扬声功能", "独立电气功能设备"],
    spec: ["是否无功率放大及扬声功能", "是否带收音机功能", "是否能独立工作", "输入输出接口", "是否含无线/电池"],
    questions: ["是否无功率放大及扬声功能？", "是否带收音机/广播接收功能？", "是否只是处理/转换音视频信号？", "是否为整机还是某设备内部板件？"]
  },
  {
    match: /lcd|液晶|显示板|显示屏|显示面板|指示板|指示面板|indicator\s*panel|display\s*(panel|module|screen)|lcd\s*(display|module|panel)/i,
    category: "Display / Indicator Panel",
    material: ["LCD/LED 显示装置", "已装配电子元器件", "排线/接口", "塑料或金属面板"],
    usage: ["显示状态/菜单信息", "作为设备面板组件", "指示或视觉信号输出"],
    spec: ["是否 LCD/LED", "是否已装配驱动/控制元件", "接口类型", "是否只是裸 LCD", "对应主机型号"],
    questions: ["是显示/指示面板还是音频功能板？", "是否已装配驱动或控制元件？", "接口类型是什么？", "是否只是裸 LCD？"]
  },
  {
    match: /遥控器|remote|controller/i,
    category: "Remote / Accessory",
    material: ["塑料外壳", "电子线路板", "按键", "电池"],
    usage: ["控制音频设备", "红外/蓝牙/射频遥控"],
    spec: ["红外/蓝牙/射频", "是否含电池", "是否专用于某整机", "对应整机型号"],
    questions: ["遥控方式是什么？", "是否含电池？", "是否专用于某个音频设备？", "是否单独销售还是维修件？"]
  },
  {
    match: /电源适配器|适配器|充电器|电源供应器|power adapter|charger|power supply|ac\s*dc/i,
    category: "Battery / Power Supply",
    material: ["塑料外壳", "电源转换电路", "插头/线缆", "电子元器件"],
    usage: ["给整机供电/充电", "AC/DC 转换", "随产品配套或单独销售"],
    spec: ["输入/输出电压电流", "额定功率", "插头形式", "是否随整机进口", "是否中国内销"],
    questions: ["输入/输出参数是多少？", "是否随整机进口？", "是否单独销售？", "插头和铭牌是否完整？"]
  },
  {
    match: /锂电池|电池组|电芯|battery|li-ion|lithium|power bank|充电宝/i,
    category: "Battery / Power Supply",
    material: ["锂离子电芯", "保护板/BMS", "外壳", "连接片"],
    usage: ["给设备供电", "单独电池/电池组", "随设备内置或配套"],
    spec: ["Wh/mAh", "UN 编号", "包装方式", "是否单独运输", "SOC"],
    questions: ["是电池单独运输还是装在设备中？", "Wh/mAh 是多少？", "UN3480/UN3481 哪一种？", "是否有 MSDS 和 UN38.3？"]
  },
  {
    match: /连接线|线缆|电缆|数据线|音频线|usb|cable|connector|接插件|端子/i,
    category: "Cable / Connector",
    material: ["铜导体", "塑料绝缘层", "接插件", "屏蔽层"],
    usage: ["音频/数据/电源连接", "随整机配套", "单独连接线"],
    spec: ["是否带接插件", "额定电压", "接口类型", "线长", "是否同轴/屏蔽"],
    questions: ["是否带接插件？", "额定电压多少？", "接口类型和线长？", "是单独进口还是随整机？"]
  },
  {
    match: /耳机|headphone|headset|earbud|tws|anc/i,
    category: "Headphone / Earbuds",
    material: ["塑料外壳", "电子线路", "锂电池", "喇叭单元", "充电盒"],
    usage: ["佩戴收听音频", "蓝牙无线连接", "带麦克风通话", "主动降噪"],
    spec: ["是否无线/蓝牙", "是否含锂电池", "电池 Wh", "是否带充电盒", "是否带麦克风"],
    questions: ["是否无线/蓝牙？", "是否含锂电池和充电盒？", "是否带麦克风？", "是否单独耳机还是成套零售包装？"]
  },
  {
    match: /音箱|soundbar|speaker|低音炮|多喇叭/i,
    category: "Speaker / Soundbar",
    material: ["塑料/木质/金属箱体", "喇叭单元", "功放板", "电源适配器", "锂电池"],
    usage: ["播放声音", "家庭影音", "蓝牙/有线音频播放", "低音增强"],
    spec: ["是否有箱体", "喇叭数量", "额定功率", "是否无线/蓝牙", "是否含电池/适配器"],
    questions: ["是否有箱体？", "是完整音箱还是单个喇叭单元？", "是否带功放？", "额定功率和连接方式是什么？"]
  },
  {
    match: /纸箱|carton|包装|外箱|彩盒|box/i,
    category: "Packaging / Carton",
    material: ["瓦楞纸", "纸板", "印刷纸盒", "塑料内托"],
    usage: ["产品包装", "运输保护", "零售包装"],
    spec: ["是否瓦楞纸箱", "尺寸/层数", "是否印刷", "是否随产品进口"],
    questions: ["是单独包装材料还是随产品一起？", "材质和层数是什么？", "是否用于零售包装？", "是否有印刷品牌？"]
  }
];

const dynamicHsParamProfiles = [
  {
    match: /扬声器单元|喇叭单元|高音单元|低音单元|中音单元|发声单元|speaker driver|tweeter|woofer|midrange/i,
    fields: [
      ["是否有箱体", ["否，无箱体", "是，有箱体", "不确定"]],
      ["单元类型", ["高音单元", "低音单元", "中音单元", "全频单元", "不确定"]],
      ["用途", ["音箱内部零件", "维修备件", "单独销售扬声器", "不确定"]],
      ["关键规格", ["尺寸", "阻抗", "额定功率", "磁路材料"]]
    ]
  },
  {
    match: /功放.*(功能板|电路板|线路板|控制板|pcba|pcb|板|模块|零件|配件|部件|维修)|功放用|放大器.*(功能板|电路板|pcba|pcb|零件|配件)|amplifier\s*(board|pcb|pcba|module|part)/i,
    fields: [
      ["板件状态", ["裸 PCB", "已装配 PCBA", "独立功能模块", "不确定"]],
      ["用途", ["功放用", "音箱用", "耳机用", "通用件", "不确定"]],
      ["是否专用零件", ["是", "否", "不确定"]],
      ["是否能独立工作", ["是", "否", "不确定"]],
      ["对应整机", ["功放", "音箱", "耳机", "其他"]]
    ]
  },
  {
    match: /(^|\s)(功放|功放机|音频扩大器|功率放大器)(\s|$)|\bamplifier\b|audio amplifier|power amplifier/i,
    fields: [
      ["货物形态", ["完整功放成品", "功放用零件", "维修备件", "不确定"]],
      ["额定功率", ["10W以下", "10-100W", "100W以上", "不确定"]],
      ["声道数", ["单声道", "双声道", "多声道", "不确定"]],
      ["供电方式", ["内置电源", "外接适配器", "电池供电", "不确定"]],
      ["是否含无线", ["是", "否", "不确定"]]
    ]
  },
  {
    match: /音视频处理器|音频处理器|音频协调器|前级处理器|解码处理器|av\s*processor|audio\s*processor|sound\s*processor|digital\s*signal\s*processor|\bdsp\b|\bdac\b/i,
    fields: [
      ["功能类型", ["音视频处理/解码", "音频协调/调谐", "DAC/信号转换", "其他"]],
      ["是否有功率放大", ["否", "是", "不确定"]],
      ["是否带扬声器/箱体", ["否", "是", "不确定"]],
      ["是否带收音机功能", ["否", "是", "不确定"]],
      ["是否能独立工作", ["是", "否，只是内部板件", "不确定"]],
      ["接口/信号", ["HDMI", "光纤/同轴", "RCA/XLR", "蓝牙/Wi-Fi", "其他"]]
    ]
  },
  {
    match: /lcd|液晶|显示板|显示屏|显示面板|指示板|指示面板|indicator\s*panel|display\s*(panel|module|screen)|lcd\s*(display|module|panel)/i,
    fields: [
      ["显示类型", ["LCD", "LED", "OLED", "不确定"]],
      ["货物形态", ["显示板/指示面板组件", "裸 LCD", "已装配模块", "整机显示设备"]],
      ["是否带驱动/控制", ["是", "否", "不确定"]],
      ["对应主机", ["音箱", "功放", "控制设备", "其他"]],
      ["接口", ["排线", "插针", "焊接", "不确定"]]
    ]
  },
  {
    match: /遥控器|remote|controller/i,
    fields: [
      ["遥控方式", ["红外", "蓝牙", "射频", "不确定"]],
      ["是否含电池", ["是", "否", "不确定"]],
      ["是否专用", ["专用于某整机", "通用遥控器", "不确定"]],
      ["对应整机", ["音箱", "功放", "播放器", "其他"]]
    ]
  },
  {
    match: /电源适配器|适配器|充电器|电源供应器|power adapter|charger|power supply|ac\s*dc/i,
    fields: [
      ["货物形态", ["单独适配器", "随整机进口", "维修备件", "不确定"]],
      ["输入电压", ["100-240V", "220V", "其他", "不确定"]],
      ["输出参数", ["5V", "9V/12V", "多档快充", "不确定"]],
      ["额定功率", ["36W以下", "36-100W", "100W以上", "不确定"]],
      ["是否内销", ["中国内销", "出口", "样品/测试", "不确定"]]
    ]
  },
  {
    match: /锂电池|电池组|电芯|battery|li-ion|lithium|power bank|充电宝/i,
    fields: [
      ["包装方式", ["电池单独运输", "与设备包装在一起", "装在设备中", "不确定"]],
      ["UN 编号", ["UN3480", "UN3481", "UN3090", "UN3091", "不确定"]],
      ["容量", ["100Wh以下", "100Wh以上", "不确定"]],
      ["运输方式", ["海运", "空运", "快递", "不确定"]],
      ["资料状态", ["MSDS+UN38.3齐全", "只有MSDS", "未确认"]]
    ]
  },
  {
    match: /连接线|线缆|电缆|数据线|音频线|usb|cable|connector|接插件|端子/i,
    fields: [
      ["是否带接插件", ["是", "否", "不确定"]],
      ["用途", ["音频连接", "数据连接", "电源连接", "其他"]],
      ["额定电压", ["80V以下", "80-1000V", "不确定"]],
      ["接口类型", ["USB", "DC plug", "Audio jack", "其他"]],
      ["是否随整机", ["单独进口", "随整机", "不确定"]]
    ]
  },
  {
    match: /耳机|headphone|headset|earbud|tws|anc/i,
    fields: [
      ["是否带充电盒", ["是", "否", "不确定"]],
      ["是否带麦克风", ["是", "否", "不确定"]],
      ["连接方式", ["蓝牙", "有线", "蓝牙+有线", "不确定"]],
      ["是否含锂电池", ["是", "否", "不确定"]],
      ["是否主动降噪", ["是", "否", "不确定"]]
    ]
  },
  {
    match: /音箱|soundbar|speaker|低音炮|多喇叭/i,
    fields: [
      ["是否有箱体", ["是", "否", "不确定"]],
      ["喇叭数量", ["单喇叭", "多喇叭", "不确定"]],
      ["是否带功放", ["是", "否", "不确定"]],
      ["连接方式", ["蓝牙", "有线", "蓝牙+有线", "不确定"]],
      ["是否含电池/适配器", ["含电池", "含电源适配器", "都不含", "不确定"]]
    ]
  },
  {
    match: /纸箱|carton|包装|外箱|彩盒|box/i,
    fields: [
      ["包装类型", ["瓦楞纸箱", "彩盒", "内托", "其他"]],
      ["是否单独进口", ["是", "否，随产品", "不确定"]],
      ["是否印刷", ["是", "否", "不确定"]],
      ["用途", ["运输保护", "零售包装", "备件包装", "其他"]]
    ]
  }
];

const cccProfiles = [
  {
    id: "power-adapter",
    level: "likely",
    title: "电源适配器/电源供应器可能涉及 3C",
    hsPrefixes: ["85044013", "85044014", "85044019", "850440"],
    keywords: /电源适配器|适配器|充电器|电源供应器|power adapter|charger|power supply/i,
    materials: ["CCC 证书或认证委托书", "产品规格书/铭牌/电气参数", "测试报告或认证机构受理资料", "中文标签、说明书、型号差异说明", "工厂信息和一致性资料"],
    note: "音视频/信息技术设备配套电源常见 3C 边界高，需按 CNCA 目录和实施规则核验。"
  },
  {
    id: "audio-video",
    level: "possible",
    title: "音视频设备可能涉及 3C 目录边界",
    hsPrefixes: ["8518", "8521", "8527", "8528"],
    keywords: /音箱|功放|播放器|音视频|电视|显示器|speaker|soundbar|amplifier|player|audio|video/i,
    materials: ["产品规格书和用途说明", "产品图片、铭牌、型号和系列差异", "电源方式和适配器规格", "是否内销/销售场景说明", "CNCA 目录边界核验记录"],
    note: "并非所有音频产品都必然要 3C；需要看是否属于目录内音视频设备、供电方式、用途和销售场景。"
  },
  {
    id: "wireless-consumer",
    level: "possible",
    title: "无线/蓝牙消费电子需同步核验 3C 与 SRRC",
    hsPrefixes: ["851762", "851830", "852692"],
    keywords: /蓝牙|无线|wifi|wi-fi|射频|遥控|bluetooth|wireless|remote|rf/i,
    materials: ["无线型号核准/SRRC 资料", "产品规格书、频段和发射功率", "中文说明书/标签", "电池和电源适配器资料", "3C 目录边界确认"],
    note: "蓝牙/无线不等于一定 3C，但通常还要看 SRRC、标签、电池和电源适配器。"
  }
];

const glossaryState = {
  category: "all",
  search: ""
};

const glossaryTerms = [
  { id: "incoterms", category: "条款", term: "Incoterms", cn: "国际贸易术语", short: "约定谁付钱、谁担风险、货交到哪里。", plain: "它不是付款方式，也不是所有费用清单，而是买卖双方交货责任的通用语言。", when: "报价、合同、客户询价、异常费用争议时先看。", risk: "只写 FOB/CIF/DDP 但不写具体地点，后面很容易争议。", example: "DDP Brazil 意味着卖方可能要承担巴西进口税费和当地清关责任，风险很高。" },
  { id: "exw", category: "条款", term: "EXW", cn: "工厂交货", short: "卖方在工厂备好货，买方几乎包办后面所有事。", plain: "看起来卖方责任少，但出口报关常常仍需要卖方配合。", when: "买方指定货代上门提货、卖方不想承担运输责任时。", risk: "如果买方无法办出口手续，货可能卡在起点。", example: "新手报价不建议轻易用 EXW，集装箱货常用 FCA 更清楚。" },
  { id: "fca", category: "条款", term: "FCA", cn: "货交承运人", short: "卖方负责出口清关，把货交给指定承运人。", plain: "比 FOB 更适合集装箱，责任边界通常更干净。", when: "买方指定货代，卖方仍负责出口申报时。", risk: "必须写清交货地点，是工厂、仓库还是码头。", example: "FCA Shanghai terminal 表示交到上海指定码头/场站。" },
  { id: "fob", category: "条款", term: "FOB", cn: "装运港船上交货", short: "卖方把货装上船，买方负责海运和目的港后续。", plain: "传统海运常用，但集装箱业务里风险边界有时不如 FCA 清楚。", when: "客户或买方货代订舱，卖方负责出口报关。", risk: "别只看开船日，要看截关、放行和是否实际装船。", example: "FOB Shanghai 不等于卖方承担目的港费用。" },
  { id: "cfr", category: "条款", term: "CFR", cn: "成本加运费", short: "卖方付到目的港的海运费，但风险通常在装船后转移。", plain: "费用到港，风险不一定到港，这是很多争议的源头。", when: "卖方负责订舱和付海运费，但不买保险。", risk: "买方如果没买保险，货损争议会很麻烦。", example: "CFR Rotterdam 仍要提醒客户自行安排保险。" },
  { id: "cif", category: "条款", term: "CIF", cn: "成本、保险费加运费", short: "卖方付海运费和最低保险，到目的港。", plain: "不是卖方承担到港前所有风险，风险点仍要看 Incoterms 规则。", when: "客户希望卖方安排船和保险。", risk: "最低保险未必覆盖客户真正损失。", example: "高货值电子产品要确认保险金额、受益人和免赔。" },
  { id: "dap", category: "条款", term: "DAP", cn: "目的地交货", short: "卖方运输到约定地点，通常买方办进口清关和缴税。", plain: "卖方管运输，买方管进口。地点越具体越好。", when: "卖方负责送到客户仓库或指定地点，但不做进口税务。", risk: "买方清关慢，滞港费谁承担要提前写清。", example: "DAP Bangkok warehouse 要确认进口商资料和卸货责任。" },
  { id: "ddp", category: "条款", term: "DDP", cn: "完税后交货", short: "卖方责任最大：运输、进口清关、税费都可能归卖方。", plain: "听起来客户最省心，但卖方税务和当地合规压力最大。", when: "公司有当地进口商、代理和税费预算时才适合。", risk: "没有当地税号/IOR 时，不要轻易承诺。", example: "巴西 DDP 对税费和进口资质要求很高，报价前必须让当地代理核价。" },
  { id: "risk-transfer", category: "条款", term: "Risk Transfer", cn: "风险转移点", short: "货损、灭失风险从谁转到谁的那个点。", plain: "费用归谁和风险归谁不是一回事。", when: "货损、延误、保险理赔、客户争议时。", risk: "把 CIF 理解成到港前卖方承担所有风险，会误判责任。", example: "FOB/CFR/CIF 下通常装上船后风险转给买方。" },

  { id: "lc", category: "付款财务", term: "L/C", cn: "信用证", short: "银行按单据付款的结算方式，核心是单证严格一致。", plain: "信用证看起来安全，但不等于客户一定收货；银行主要看单据是否符合条款。", when: "大额订单、新客户、目的国风险高或客户要求银行付款时。", risk: "提单、发票、装箱单、日期、品名或金额不一致，可能被拒付或扣费。", example: "L/C 下改船期、改品名、改单据前要先看信用证条款是否允许。" },
  { id: "tt", category: "付款财务", term: "T/T", cn: "电汇", short: "买方通过银行汇款，常见预付款加尾款。", plain: "操作简单，但信用风险取决于付款节点和客户信用。", when: "常规贸易、老客户、小中额订单或样品订单。", risk: "只收少量定金就出货，尾款回收风险较高。", example: "30% T/T deposit, 70% before shipment 要在放货前确认尾款到账。" },
  { id: "dp", category: "付款财务", term: "D/P", cn: "付款交单", short: "买方付款后才能拿到单据提货。", plain: "银行控制单据，但如果买方拒付，货可能滞留目的港。", when: "客户信用尚可、卖方希望用单据控制货权时。", risk: "买方不付款不提货，会产生滞港、退运或转卖风险。", example: "D/P 远期风险比即期更高，要评估目的港处置能力。" },
  { id: "da", category: "付款财务", term: "D/A", cn: "承兑交单", short: "买方承诺到期付款即可先拿单提货。", plain: "对买方很友好，对卖方信用风险高。", when: "信用好的长期客户或公司批准的账期业务。", risk: "买方拿到货后到期不付款，追款难度更高。", example: "D/A 60 days 本质上是给客户账期，要走信用审批。" },
  { id: "open-account", category: "付款财务", term: "Open Account", cn: "赊销/账期", short: "先发货后付款，通常给客户一定账期。", plain: "最依赖客户信用和授信额度。", when: "长期稳定客户、集团客户或有信用保险/担保时。", risk: "客户经营恶化或市场变化时，应收账款风险上升。", example: "给新客户开放账期前，需要信用调查、额度审批和逾期预案。" },
  { id: "credit-insurance", category: "付款财务", term: "Credit Insurance", cn: "出口信用保险", short: "用保险覆盖部分买方不付款或政治风险。", plain: "不是所有损失都赔，必须看限额、免赔和理赔条件。", when: "账期订单、新市场、大客户集中度高时。", risk: "超过保险限额、未按要求催收或资料不全，可能影响理赔。", example: "做 OA 前看客户是否有批复限额。" },
  { id: "bank-charge", category: "付款财务", term: "Bank Charges", cn: "银行费用", short: "电汇、信用证、托收等产生的银行手续费。", plain: "费用由谁承担要写清 OUR/SHA/BEN 或信用证费用条款。", when: "报价、收款、信用证开立和议付时。", risk: "没写清费用承担，实际到账金额可能少。", example: "T/T 选择 SHA 时，中转行费用可能从货款中扣除。" },

  { id: "hs-code", category: "申报", term: "HS Code", cn: "商品编码/税号", short: "决定税率、监管条件、申报要素和很多准入要求。", plain: "同一个俗称可能有多个税号，必须看用途、结构、材质和功能。", when: "报价、申报、税费估算、认证判断、进口国要求查询时。", risk: "把配件当成成品，会导致税率和监管要求都错。", example: "功放用功能板不能直接按功放成品判断，要先看是否 8518 专用零件。" },
  { id: "declaration-elements", category: "申报", term: "Declaration Elements", cn: "申报要素", short: "海关要求填的规格、用途、材质、品牌、型号等关键字段。", plain: "它是海关理解货物的结构化描述，不是随便写一句品名。", when: "制作报关单、核对税号、准备报关资料时。", risk: "要素缺漏会退单、查验或影响归类。", example: "音箱常要看是否有箱体、喇叭数量、额定功率、连接方式。" },
  { id: "commercial-invoice", category: "申报", term: "Commercial Invoice", cn: "商业发票", short: "清关和结算核心单据，写明品名、数量、价格、币种、贸易条款。", plain: "不是普通收据，是报关、缴税、客户清关的重要依据。", when: "出口报关、进口清关、收汇、客户文件审核时。", risk: "金额、币种、品名和箱单/合同不一致会触发补料。", example: "发票品名过于笼统，如 accessories，可能导致目的港要求补规格说明。" },
  { id: "packing-list", category: "申报", term: "Packing List", cn: "装箱单", short: "说明每票货的箱数、重量、体积、包装和型号。", plain: "它回答货怎么装、装了多少、每箱是什么。", when: "报关、订舱、收货、查验、目的港清关时。", risk: "件重尺错，会影响舱单、报关、提货和费用。", example: "临时改箱数后，箱单、舱单、报关资料都要同步改。" },
  { id: "coo", category: "申报", term: "Certificate of Origin", cn: "原产地证", short: "证明货物原产国，可能影响关税、贸易措施和客户清关。", plain: "原产国不是发货国，也不一定等于卖方所在国。", when: "客户要求 FTA 优惠、目的国要求原产地文件、额外关税判断时。", risk: "原产地错会影响税费甚至触发合规风险。", example: "美国原产进口中国，可能涉及对美加征关税判断。" },
  { id: "bl", category: "申报", term: "B/L", cn: "提单", short: "海运货权和运输证明，写明船名航次、收发货人、港口和货物信息。", plain: "它既是运输单据，也可能影响谁能提货。", when: "开船后、换单、目的港清关、客户收货时。", risk: "收货人、通知人、件重尺错误会卡目的港。", example: "正本提单、电放、Sea Waybill 放货方式要提前确认。" },
  { id: "mbl-hbl", category: "申报", term: "MBL / HBL", cn: "船东单/货代单", short: "MBL 是船司提单，HBL 是货代提单。", plain: "两个提单可能同时存在，换单路径不同。", when: "客户问提单、目的港换单、货权控制时。", risk: "只看一个提单号，可能查不到另一层状态。", example: "船司官网可能认 MBL，货代系统可能认 HBL。" },
  { id: "manifest", category: "申报", term: "Manifest", cn: "舱单", short: "承运人向海关申报的装载货物数据。", plain: "它像船上的货物名单，影响报关、放行和码头状态。", when: "出口报关、进口预申报、箱货放行、码头查询时。", risk: "舱单和报关资料不一致，会导致改单或放行异常。", example: "件数、毛重、品名、提单号要和报关资料对得上。" },
  { id: "vgm", category: "申报", term: "VGM", cn: "集装箱核实总重", short: "装船前必须提交的集装箱总重量。", plain: "船司要知道箱子真实重量，才能安全配载。", when: "订舱后、截 VGM 前。", risk: "错过 VGM 截止时间可能无法装船。", example: "截 VGM、截单、截关不是同一个时间。" },
  { id: "ciq", category: "申报", term: "Inspection / Quarantine", cn: "检验检疫", short: "部分货物需要检验、检疫或监管证件。", plain: "不是所有货都有，但命中监管条件时不能忽略。", when: "查监管条件、进口准入、目的国要求时。", risk: "漏监管证件会导致退单、查验或扣货。", example: "木质包装、食品接触材料、电池等要特别关注。" },

  { id: "etd", category: "船司物流", term: "ETD", cn: "预计开船/离港时间", short: "船预计离开起运港的时间。", plain: "计划时间，不等于实际开船。", when: "排产、装柜、订舱、客户交期沟通时。", risk: "船期可能滚动，必须看数据更新时间。", example: "ETD 变晚，目的港 ETA 通常也会变。" },
  { id: "eta", category: "船司物流", term: "ETA", cn: "预计到港时间", short: "船预计到达目的港或下一港的时间。", plain: "它会被天气、拥堵、转运、绕航影响。", when: "安排清关、换单、仓库预约和客户交付时。", risk: "几天前的 ETA 不能当最新承诺。", example: "系统里要显示 ETA 的数据时间，避免拿旧船位判断。" },
  { id: "atd-ata", category: "船司物流", term: "ATD / ATA", cn: "实际离港/实际到港", short: "Actual Time of Departure / Arrival，实际发生时间。", plain: "比 ETD/ETA 更可靠，因为它已经发生。", when: "复盘延误、确认开船、确认到港时。", risk: "只看预计时间，可能误以为货已走或已到。", example: "ATD 出来后，才更适合更新客户实际在途节点。" },
  { id: "si", category: "船司物流", term: "SI", cn: "补料/提单指示", short: "给船司或货代制作提单所需的信息。", plain: "包含收发货人、通知人、品名、件重尺、条款等。", when: "截单前。", risk: "SI 错会导致提单错，目的港换单或清关受影响。", example: "截 SI 前让客户确认收货人和通知人。" },
  { id: "so", category: "船司物流", term: "SO", cn: "订舱确认/放舱单", short: "船司或货代确认舱位后的操作单。", plain: "上面通常有船名航次、截关、提柜、还柜信息。", when: "订舱成功后、安排拖车装柜前。", risk: "不看截港截关，容易错过装船窗口。", example: "SO 上的 closing time 要和工厂装柜计划对齐。" },
  { id: "cutoff", category: "船司物流", term: "Cut-off", cn: "截单/截港/截关", short: "不同资料或货柜必须完成的截止时间。", plain: "截单、截 VGM、截港、截关不是一个东西。", when: "订舱、拖车、报关、提单补料时。", risk: "错过一个截止点，可能甩柜或改船。", example: "货进港了，但报关没放行，仍可能装不上船。" },
  { id: "cy-cfs", category: "船司物流", term: "CY / CFS", cn: "堆场/集装箱货运站", short: "CY 管整柜，CFS 常见于拼箱拆装。", plain: "决定货在哪里交接、谁负责装拆箱。", when: "订舱、提货、拼箱、目的港换单时。", risk: "整柜和拼箱流程不同，费用和责任也不同。", example: "LCL 拼箱通常会涉及 CFS 费用和拆箱时间。" },
  { id: "lcl-fcl", category: "船司物流", term: "FCL / LCL", cn: "整柜/拼箱", short: "FCL 是整柜，LCL 是和别人拼一个柜。", plain: "整柜可控性强，拼箱成本低但节点更多。", when: "选择运输方式、估算费用和时效时。", risk: "拼箱目的港拆箱慢，会影响交付。", example: "样品或小批量常用 LCL，大批量常用 FCL。" },
  { id: "teu-feu", category: "船司物流", term: "TEU / FEU", cn: "20尺/40尺标准箱单位", short: "TEU 是 20 尺箱单位，FEU 通常指 40 尺箱单位。", plain: "用来衡量箱量和港口吞吐。", when: "运价、舱位、港口拥堵新闻里常见。", risk: "不要把 TEU 当成实际箱数，40 尺通常折算 2 TEU。", example: "100 TEU 可能是 50 个 40 尺柜。" },
  { id: "transshipment", category: "船司物流", term: "Transshipment", cn: "中转", short: "货不是直达，需要在中转港换船。", plain: "中转港延误会传导到最终 ETA。", when: "看船期、判断交期、分析延误时。", risk: "只盯起运港和目的港，会漏掉中转港风险。", example: "新加坡、巴生、釜山常作为中转节点。" },
  { id: "blank-sailing", category: "船司物流", term: "Blank Sailing", cn: "停航/取消航次", short: "船司取消某个航次或跳港。", plain: "舱位和 ETA 会受影响，常见于淡季或航线调整。", when: "船司公告、旺淡季、节假日前后。", risk: "订舱后仍可能被改船或推迟。", example: "客户急货要准备备选船期。" },
  { id: "rollover", category: "船司物流", term: "Roll-over", cn: "甩柜/滚装下航次", short: "箱子没上原计划船，被滚到下一班。", plain: "通常由舱位、放行、截关或港口拥堵引起。", when: "箱已进港但未装船、客户催交期时。", risk: "只看到进港不等于已装船。", example: "确认装船状态要看实际 loaded on board。" },
  { id: "container-seal", category: "船司物流", term: "Container No. / Seal No.", cn: "箱号/封号", short: "箱号识别集装箱，封号识别铅封。", plain: "箱号用于查码头、船司、舱单和放行状态。", when: "装柜后、查箱货状态、目的港提柜时。", risk: "箱号错一个字符就可能查不到。", example: "箱号通常是 4 个字母 + 7 位数字。" },

  { id: "20gp", category: "集装箱", term: "20GP", cn: "20 尺普通干货箱", short: "常见小柜，适合重货或体积不大的整柜。", plain: "内部尺寸大约长 5.9m、宽 2.35m、高 2.39m，可装体积常按约 28 CBM 粗估。", when: "重货、数量不大但想整柜控制节点时。", risk: "不是能塞满 28 CBM 就一定能走，还要看总重、道路限重、码头和装柜方式。", example: "纸箱小但很重的配件，可能 20GP 更合适。" },
  { id: "40gp", category: "集装箱", term: "40GP", cn: "40 尺普通干货箱", short: "常见大柜，适合体积较大但不需要高箱的货。", plain: "内部尺寸大约长 12.0m、宽 2.35m、高 2.39m，可装体积常按约 58 CBM 粗估。", when: "大批量普通货、托盘货或长件但不超高时。", risk: "轻泡货看体积，重货看限重；不要只按 CBM 决定箱型。", example: "音箱成品大批量出口常比较 40GP 和 40HQ。" },
  { id: "40hq", category: "集装箱", term: "40HQ / 40HC", cn: "40 尺高箱", short: "比 40GP 更高，常用于轻泡货和大体积包装。", plain: "内部高度约 2.69m，可装体积常按约 68 CBM 粗估。", when: "纸箱体积大、重量不太高的消费电子成品。", risk: "如果货很重，40HQ 未必比 40GP 合适；拖车和道路限重仍要复核。", example: "大包装音箱通常会优先询 40HQ。" },
  { id: "45hq", category: "集装箱", term: "45HQ", cn: "45 尺高箱", short: "更长的高箱，部分航线/港口可用。", plain: "可装体积比 40HQ 更大，但不是所有船司、港口和内陆段都接受。", when: "货量接近或超过 40HQ，且航线支持 45HQ 时。", risk: "订舱、拖车、堆场和目的港可能有限制，必须让货代确认。", example: "欧洲/美线某些航线可询 45HQ，但不能默认可用。" },
  { id: "reefer-container", category: "集装箱", term: "Reefer Container", cn: "冷藏箱/冷箱", short: "带制冷设备的集装箱，用于温控货。", plain: "订舱时要写清设定温度、通风、湿度和是否需要预冷。", when: "需要温控的货物、样品或客户特殊要求。", risk: "插电费、温度记录、PTI、提柜时限和目的港冷箱堆场都会影响费用和时效。", example: "一般消费电子不常用，但带温控要求的材料或样品可能涉及。" },
  { id: "open-top", category: "集装箱", term: "Open Top Container", cn: "开顶箱", short: "顶部可开，适合超高或需要吊装的货。", plain: "货物从顶部吊入，通常需要篷布、防水和绑扎方案。", when: "高度或装卸方式不适合普通干货箱。", risk: "超高尺寸、篷布、防水、吊装和港区操作费要提前确认。", example: "大型设备或无法从门端装入的货可能用开顶箱。" },
  { id: "flat-rack", category: "集装箱", term: "Flat Rack", cn: "框架箱", short: "没有箱顶和侧壁，适合超宽、超高或重件。", plain: "重点看货物外廓、重心、吊点、绑扎点和船司 OOG 接受规则。", when: "OOG 超限货、机械设备或无法装普通箱的货。", risk: "OOG surcharge、绑扎、吊装、堆存和保险费用可能很高。", example: "超宽机器或大件样品通常需要 FR 方案。" },
  { id: "oog", category: "集装箱", term: "OOG", cn: "超限货", short: "Out of Gauge，超出普通箱尺寸边界的货。", plain: "不等于不能海运，而是要特殊订舱、配载、加固和费用确认。", when: "货物超长、超宽、超高或超重时。", risk: "资料不完整会导致船司拒接或临近开船取消。", example: "OOG 询价至少给尺寸、重量、照片、图纸、吊点和重心。" },
  { id: "bbk", category: "集装箱", term: "BBK / Break Bulk", cn: "件杂货/散杂货", short: "不装集装箱，以件杂方式装船。", plain: "常用于超大、超重或无法装箱的货，操作更像项目物流。", when: "普通箱、特种箱都不适合，或单件特别大。", risk: "装卸、绑扎、保险、港杂和船期都要单独方案，不能按标准集装箱理解。", example: "大型设备、工程件或特殊展品可能用 BBK。" },

  { id: "customs-release", category: "清关监管", term: "Customs Release", cn: "海关放行", short: "海关允许货物进出境或进入下一环节。", plain: "海关放行不一定等于码头可提、船司放货。", when: "报关后、提柜前、客户问货能不能提时。", risk: "只看海关放行，忽略码头或船司状态，会误判可提。", example: "上海港进口要区分海关放行、码头放行、船司放货。" },
  { id: "terminal-release", category: "清关监管", term: "Terminal Release", cn: "码头放行", short: "码头系统允许提柜或继续操作。", plain: "它和海关放行是不同状态。", when: "上海港放行、进口提柜、码头查询时。", risk: "海关放了但码头未放，车去了也可能提不到。", example: "查箱号时要看海关、码头、船司三方状态。" },
  { id: "inspection", category: "清关监管", term: "Inspection", cn: "查验", short: "海关或监管机构要求开箱、看货或补资料。", plain: "查验不是一定有问题，但会增加时间和费用。", when: "申报后未放行、目的港清关异常时。", risk: "资料响应慢会产生仓储、滞箱和交期延误。", example: "查验前准备图片、规格书、BOM、用途说明会更快。" },
  { id: "ior", category: "清关监管", term: "IOR", cn: "进口商记录方", short: "Importer of Record，承担进口申报、税费和合规责任的主体。", plain: "DDP 或海外进口时特别关键。", when: "DDP、海外仓、客户要求卖方清关时。", risk: "没有合格 IOR，货可能无法进口。", example: "巴西、美国、欧盟进口都要确认谁作为进口商。" },
  { id: "supervision-condition", category: "清关监管", term: "Supervision Condition", cn: "监管条件", short: "税号对应的许可证、检验检疫、认证等监管要求。", plain: "同一个 HS 可能对应不同监管证件。", when: "归类后、报关前、进口国要求判断时。", risk: "只看税率不看监管条件会漏证。", example: "部分电器、无线、食品接触材料可能有额外监管。" },
  { id: "single-window", category: "清关监管", term: "Single Window", cn: "单一窗口", short: "集中办理通关申报和相关政务服务的平台。", plain: "很多国家都有自己的贸易单一窗口。", when: "报关、许可证、通关状态查询时。", risk: "不同国家系统字段和权限不同，不能简单照搬。", example: "中国国际贸易单一窗口用于很多通关业务入口。" },
  { id: "bonded", category: "清关监管", term: "Bonded", cn: "保税", short: "货物在海关监管下暂不缴税或按规定处理。", plain: "常见于保税仓、加工贸易、转口等场景。", when: "保税仓、维修返修、暂进口、转口时。", risk: "保税货物用途和流向受监管，不能随意处理。", example: "保税区出区内销通常会涉及补税和申报。" },

  { id: "mfn", category: "税费成本", term: "MFN Duty", cn: "最惠国税率", short: "正常贸易关系下常用的基础关税税率。", plain: "它只是税费的一层，不代表最终总税负。", when: "进口税费估算、报价、目的国关税查询时。", risk: "漏掉增值税、额外关税、贸易救济税会低估成本。", example: "中国进口可能有最惠国关税 + 进口增值税 + 对美额外关税。" },
  { id: "vat-gst", category: "税费成本", term: "VAT / GST", cn: "增值税/商品服务税", short: "进口环节常见流转税，不同国家税率不同。", plain: "即使关税为 0，VAT/GST 也可能很高。", when: "报价、DDP、进口成本测算时。", risk: "DDP 不算 VAT/GST，报价会严重偏低。", example: "欧盟常见 VAT 约 19%-23%，国家不同。" },
  { id: "additional-tariff", category: "税费成本", term: "Additional Tariff", cn: "额外关税/加征关税", short: "基础税率之外，因贸易措施叠加的关税。", plain: "通常和原产国、目的国、实施日期、清单税号有关。", when: "中美贸易战、贸易救济、制裁和报复性关税判断时。", risk: "只看基础关税会低估成本。", example: "美国原产货进口中国，命中清单时可能出现基础关税 + 额外关税。" },
  { id: "ad-cvd", category: "税费成本", term: "AD / CVD", cn: "反倾销/反补贴税", short: "针对特定国家、企业或产品的贸易救济税。", plain: "税率可能很高，且不一定只看 HS，还看生产商和范围描述。", when: "钢铝、电池、光伏、化工、敏感产品进口时。", risk: "命中后成本可能远超基础税率。", example: "美国进口要让当地报关行查 AD/CVD case scope。" },
  { id: "demurrage", category: "税费成本", term: "Demurrage", cn: "滞箱/滞港相关费用", short: "超过免费期产生的费用，具体口径按船司/码头。", plain: "常和未及时提柜、清关延误、港口拥堵有关。", when: "到港后、查验、客户提货慢时。", risk: "费用每天累加，异常要早升级。", example: "清关慢导致超过免箱期，会产生额外费用。" },
  { id: "detention", category: "税费成本", term: "Detention", cn: "滞箱费", short: "柜子提走后，超过免费用箱期未还空产生的费用。", plain: "和堆存费不同，它关注箱子占用时间。", when: "进口提柜、送货、还空箱时。", risk: "客户卸货慢会让费用快速增加。", example: "送仓前确认仓库预约和卸货能力。" },
  { id: "storage", category: "税费成本", term: "Storage", cn: "堆存费/仓储费", short: "货柜或货物在码头/仓库超过免费期产生的费用。", plain: "它关注货在场地占用空间。", when: "清关慢、查验、客户迟提时。", risk: "堆存费和滞箱费可能同时发生。", example: "到港前确认免堆期和清关资料。" },
  { id: "local-charges", category: "税费成本", term: "Local Charges", cn: "本地费用/港杂费", short: "目的港或起运港发生的换单、THC、文件、操作等费用。", plain: "不是所有费用都包含在海运费里。", when: "FOB/CIF/CFR/DAP/DDP 报价时。", risk: "报价只算海运费，不算目的港本地费，会和客户争议。", example: "DDP 报价要把清关、港杂、配送、税费都列清。" },

  { id: "dg", category: "危险品认证", term: "DG", cn: "危险品", short: "运输中可能有安全风险的货物。", plain: "不是只有易燃液体才是危险品，锂电池也可能属于 Class 9。", when: "含电池、液体、磁性、化学品、喷雾、粉末时。", risk: "未按 DG 申报可能被拒载、罚款或扣货。", example: "蓝牙耳机带锂电池通常要准备 MSDS、UN38.3 和运输声明。" },
  { id: "class9", category: "危险品认证", term: "Class 9", cn: "第 9 类危险品", short: "杂项危险品，锂电池运输常见分类。", plain: "Class 9 不代表风险低，只是类别不同。", when: "锂电池单独运输或随设备运输时。", risk: "包装、标签、文件不合规会被船司/航司拒收。", example: "UN3480、UN3481 常与 Class 9 相关。" },
  { id: "un-number", category: "危险品认证", term: "UN Number", cn: "联合国危险品编号", short: "识别危险品运输类别的编号。", plain: "DG 文件里最重要的身份号码之一。", when: "订舱、MSDS、危险品申报、标签包装时。", risk: "UN 号错会导致承运规则完全不同。", example: "UN3480 是锂离子电池，UN3481 是装在设备中或与设备包装在一起的锂离子电池。" },
  { id: "msds", category: "危险品认证", term: "MSDS / SDS", cn: "安全数据表", short: "说明化学品或电池安全、运输、储存和应急信息。", plain: "承运人用它判断货物是否可收、怎么收。", when: "含电池、化学品、液体、胶水、粉末时。", risk: "旧版或信息不全的 MSDS 可能被退回。", example: "锂电池产品要看电池型号、Wh、UN 测试信息。" },
  { id: "un38-3", category: "危险品认证", term: "UN38.3", cn: "锂电池运输测试", short: "锂电池空海陆运输前常见的安全测试要求。", plain: "它证明电池通过运输安全测试，不等于所有文件都齐。", when: "含锂电池产品订舱、空运、海运 DG 审核时。", risk: "缺 UN38.3 可能无法出运。", example: "蓝牙耳机、充电盒、锂电池组都要关注。" },
  { id: "pi965-967", category: "危险品认证", term: "PI965 / PI966 / PI967", cn: "锂电池空运包装指令", short: "IATA 对不同锂电池包装场景的规则。", plain: "单独电池、与设备同包装、装在设备中，规则不同。", when: "锂电池空运或快递时。", risk: "选错包装指令会导致航司拒收。", example: "UN3480 常看 PI965，UN3481 常看 PI966/PI967。" },
  { id: "awb", category: "空运快件", term: "AWB", cn: "空运单", short: "空运运输凭证和追踪核心号码。", plain: "它像空运里的提单/运单，但通常不是海运提单那种货权单据。", when: "订舱、追踪、到达清关和费用核对时。", risk: "收发货人、件重尺或品名错，会影响安检、清关和派送。", example: "快件常看 tracking no.，普通空运常看 MAWB/HAWB。" },
  { id: "mawb-hawb", category: "空运快件", term: "MAWB / HAWB", cn: "主单 / 分单", short: "航空公司主单和货代分单。", plain: "主单看航空公司运输，分单看货代/客户层面的货物信息。", when: "普通空运、代理查询、目的港换单或清关时。", risk: "只拿一个号码可能查不到另一层状态。", example: "货代给客户的可能是 HAWB，航空公司官网认 MAWB。" },
  { id: "clearance-delay-air", category: "空运快件", term: "Clearance Delay", cn: "清关延误", short: "目的国海关或承运商清关环节需要补资料。", plain: "不一定是货有问题，常见是缺税号、授权书、付款凭证、认证或用途说明。", when: "DHL/UPS/FedEx/SF 官网状态出现延误、Held、Exception 时。", risk: "收件人不回复会产生仓储、退运或派送失败。", example: "巴西快件可能要求 CNPJ/CPF、ANATEL 或进口商资料。" },
  { id: "dim-weight", category: "空运快件", term: "DIM Weight", cn: "体积重", short: "按体积折算的计费重量。", plain: "空运/快件不只看实际重量，箱子大也会贵。", when: "报价、核对运费、包装设计时。", risk: "没算体积重会低估运费。", example: "轻但体积大的音箱包装，费用可能按体积重计。" },
  { id: "remote-area", category: "空运快件", term: "Remote Area Surcharge", cn: "偏远地区附加费", short: "派送到偏远地址产生的额外费用。", plain: "不是运费报价一定包含，常在账单里单独出现。", when: "快件到客户仓库、门到门报价、费用复核时。", risk: "DDP/DAP 报价漏算会和客户争议。", example: "UPS/DHL/FedEx 都可能按邮编收偏远附加费。" },
  { id: "pod-air", category: "空运快件", term: "POD", cn: "签收证明", short: "Proof of Delivery，证明货物已派送/签收。", plain: "客户说没收到或少件时，它是关键证据。", when: "Delivered 后、客户对账、异常复盘时。", risk: "不保存 POD，后续争议很难说清。", example: "官网 Delivered 后下载或截图 POD。" },
  { id: "magnetic-inspection", category: "空运快件", term: "Magnetic Inspection", cn: "磁检/航空运输鉴定", short: "判断货物磁场或危险特性是否符合航空运输。", plain: "喇叭、扬声器、磁铁等可能需要，尤其走空运时。", when: "空运含磁性部件、喇叭单元、音箱样品时。", risk: "未做磁检可能安检退货或改渠道。", example: "带强磁路的扬声器样品，发出前先问承运商是否要鉴定。" },
  { id: "ccc", category: "危险品认证", term: "3C / CCC", cn: "中国强制性产品认证", short: "中国部分产品进口或销售前必须取得的认证。", plain: "不是所有电子产品都要 3C，要看目录和产品边界。", when: "中国进口、内销、客户要求认证时。", risk: "命中目录但无证，可能无法进口或销售。", example: "电源适配器、音视频设备边界要逐项核验。" },
  { id: "srrc", category: "危险品认证", term: "SRRC", cn: "无线电型号核准", short: "中国无线发射设备的型号核准要求。", plain: "蓝牙、Wi-Fi、无线遥控等都要关注。", when: "产品有无线发射功能并进口中国时。", risk: "无线功能未说明，会漏判型号核准。", example: "蓝牙耳机、无线音箱、遥控器要看频段和发射功率。" },
  { id: "ce-red", category: "危险品认证", term: "CE / RED", cn: "欧盟 CE / 无线设备指令", short: "欧盟市场准入和无线设备合规要求。", plain: "CE 不是一个单一证书，可能涉及多个指令。", when: "出口欧盟、客户要求 DoC、技术文件时。", risk: "无线产品漏 RED，标签和 DoC 会不完整。", example: "蓝牙耳机通常要看 RED、RoHS、REACH、电池法规。" },
  { id: "fcc", category: "危险品认证", term: "FCC", cn: "美国无线/电磁兼容认证", short: "美国无线或电子设备常见准入要求。", plain: "有无线功能通常要查 FCC ID 或授权路径。", when: "出口美国、客户要求合规资料时。", risk: "无 FCC 授权可能影响清关和销售。", example: "蓝牙产品要核对 FCC ID、型号和标签一致。" },
  { id: "anatel", category: "危险品认证", term: "ANATEL", cn: "巴西通信设备认证", short: "巴西无线/通信产品常见认证。", plain: "通常需要当地证书持有人和葡语标签。", when: "出口巴西，产品有蓝牙、Wi-Fi、无线功能时。", risk: "没有 ANATEL 可能无法进口或销售。", example: "巴西蓝牙耳机要优先确认 ANATEL 和标签。" },
  { id: "inmetro", category: "危险品认证", term: "INMETRO", cn: "巴西产品合格评定", short: "巴西部分产品强制认证或合格评定。", plain: "电源、插头、适配器等尤其要看。", when: "出口巴西消费电子、电源相关产品时。", risk: "认证边界不清会导致进口商无法清关。", example: "带电源适配器的套装要确认适配器是否单独受管。" },
  { id: "nbtc", category: "危险品认证", term: "NBTC", cn: "泰国无线认证", short: "泰国无线和通信设备监管要求。", plain: "蓝牙、Wi-Fi、射频遥控都可能涉及。", when: "出口泰国无线产品时。", risk: "漏 NBTC 会影响进口和销售。", example: "泰国蓝牙音箱要确认 NBTC 认证路径。" },
  { id: "saber", category: "危险品认证", term: "SABER", cn: "沙特产品合格评定平台", short: "沙特进口产品常用合规平台。", plain: "很多产品需要 PCoC/SCoC，按 HS 和产品类别判断。", when: "出口沙特、中东项目报价时。", risk: "证书没办好会卡清关。", example: "消费电子出口沙特要先问进口商 SABER 类别。" },
  { id: "rohs-reach", category: "危险品认证", term: "RoHS / REACH", cn: "欧盟有害物质/化学法规", short: "限制有害物质和化学物质合规。", plain: "客户常要求报告或声明，尤其消费电子。", when: "出口欧盟、客户审厂、环保合规资料时。", risk: "材料和供应链资料不完整，声明站不住。", example: "线材、塑料、焊料、电路板都可能涉及。" }
];

const portSuggestions = [
  { name: "Shanghai Port", aliases: ["shanghai", "上海", "cnsgh", "cnshg", "洋山", "外高桥"], region: "China" },
  { name: "Ningbo Zhoushan Port", aliases: ["ningbo", "舟山", "宁波", "cnngb"], region: "China" },
  { name: "Yantian Port", aliases: ["yantian", "盐田", "shenzhen", "蛇口", "cnytn"], region: "China" },
  { name: "Qingdao Port", aliases: ["qingdao", "青岛", "cnqdg"], region: "China" },
  { name: "Xiamen Port", aliases: ["xiamen", "厦门", "cnxmn"], region: "China" },
  { name: "Hong Kong Port", aliases: ["hong kong", "香港", "hkhkg"], region: "Hong Kong" },
  { name: "Singapore Port", aliases: ["singapore", "新加坡", "sgsin"], region: "Singapore" },
  { name: "Port Klang", aliases: ["port klang", "巴生", "mypkg"], region: "Malaysia" },
  { name: "Laem Chabang Port", aliases: ["laem chabang", "林查班", "莱姆查邦", "泰国", "thlch"], region: "Thailand" },
  { name: "Bangkok Port", aliases: ["bangkok", "曼谷", "คลองเตย", "klong toei", "thbkk"], region: "Thailand" },
  { name: "Tanjung Pelepas", aliases: ["tanjung pelepas", "丹戎帕拉帕斯", "mytpp"], region: "Malaysia" },
  { name: "Jakarta / Tanjung Priok", aliases: ["jakarta", "tanjung priok", "雅加达", "idjkt"], region: "Indonesia" },
  { name: "Ho Chi Minh / Cat Lai", aliases: ["ho chi minh", "cat lai", "胡志明", "吉莱", "vnhcm"], region: "Vietnam" },
  { name: "Rotterdam Port", aliases: ["rotterdam", "鹿特丹", "nlrtm"], region: "Netherlands" },
  { name: "Hamburg Port", aliases: ["hamburg", "汉堡", "deham"], region: "Germany" },
  { name: "Los Angeles / Long Beach", aliases: ["los angeles", "long beach", "洛杉矶", "uslax", "uslgb"], region: "United States" },
  { name: "Felixstowe Port", aliases: ["felixstowe", "费利克斯托", "gbfxs"], region: "United Kingdom" },
  { name: "Port of Santos", aliases: ["santos", "桑托斯", "巴西", "brssz"], region: "Brazil" },
  { name: "Vancouver Port", aliases: ["vancouver", "温哥华", "加拿大", "cavan"], region: "Canada" },
  { name: "Manzanillo Port", aliases: ["manzanillo", "曼萨尼约", "墨西哥", "mxzan"], region: "Mexico" },
  { name: "Jebel Ali Port", aliases: ["jebel ali", "杰贝阿里", "迪拜", "阿联酋", "aejea"], region: "UAE" },
  { name: "Jeddah Islamic Port", aliases: ["jeddah", "吉达", "沙特", "sajed"], region: "Saudi Arabia" }
];

const portCoordinates = [
  { name: "Shanghai Port", aliases: ["shanghai", "上海", "cnshg", "洋山", "外高桥"], lat: 30.626, lon: 122.064 },
  { name: "Ningbo Zhoushan Port", aliases: ["ningbo", "宁波", "舟山", "cnngb"], lat: 29.868, lon: 122.175 },
  { name: "Yantian Port", aliases: ["yantian", "盐田", "shenzhen", "深圳"], lat: 22.58, lon: 114.27 },
  { name: "Singapore Port", aliases: ["singapore", "新加坡", "sgsin"], lat: 1.264, lon: 103.82 },
  { name: "Port Klang", aliases: ["port klang", "巴生", "mypkg"], lat: 2.999, lon: 101.392 },
  { name: "Laem Chabang Port", aliases: ["laem chabang", "林查班", "莱姆查邦", "thlch"], lat: 13.084, lon: 100.883 },
  { name: "Ho Chi Minh / Cat Lai", aliases: ["ho chi minh", "cat lai", "胡志明", "吉莱"], lat: 10.75, lon: 106.79 },
  { name: "Rotterdam Port", aliases: ["rotterdam", "鹿特丹", "nlrtm"], lat: 51.948, lon: 4.142 },
  { name: "Hamburg Port", aliases: ["hamburg", "汉堡", "deham"], lat: 53.546, lon: 9.966 },
  { name: "Los Angeles / Long Beach", aliases: ["los angeles", "long beach", "洛杉矶", "长滩"], lat: 33.74, lon: -118.25 },
  { name: "Durban Port", aliases: ["durban", "德班", "zadurb"], lat: -29.871, lon: 31.051 },
  { name: "Cape Town Port", aliases: ["cape town", "开普敦", "zacpt"], lat: -33.903, lon: 18.435 },
  { name: "Port of Santos", aliases: ["santos", "桑托斯", "巴西", "brssz"], lat: -23.933, lon: -46.333 },
  { name: "Vancouver Port", aliases: ["vancouver", "温哥华", "加拿大", "cavan"], lat: 49.289, lon: -123.105 },
  { name: "Manzanillo Port", aliases: ["manzanillo", "曼萨尼约", "墨西哥", "mxzan"], lat: 19.067, lon: -104.323 },
  { name: "Jebel Ali Port", aliases: ["jebel ali", "杰贝阿里", "迪拜", "阿联酋", "aejea"], lat: 25.011, lon: 55.061 },
  { name: "Jeddah Islamic Port", aliases: ["jeddah", "吉达", "沙特", "sajed"], lat: 21.47, lon: 39.15 }
];

const seaPortCodeData = [
  { code: "CNSHA", name: "Shanghai", cn: "上海港", country: "中国", aliases: ["上海", "shanghai", "cnsha", "cnshg", "洋山", "外高桥"], note: "上海港常见 UN/LOCODE 为 CNSHA；业务中也会看到 CNSHG/CNSHA 等系统口径，订舱以船司/货代要求为准。" },
  { code: "CNNGB", name: "Ningbo-Zhoushan", cn: "宁波舟山港", country: "中国", aliases: ["宁波", "舟山", "ningbo", "zhoushan", "cnngb"], note: "华东常用海运出口港，订舱、报关和拖车要区分宁波/舟山具体港区。" },
  { code: "CNYTN", name: "Yantian", cn: "盐田港", country: "中国", aliases: ["盐田", "yantian", "深圳", "shenzhen", "cnytn"], note: "深圳东部主要港区之一；蛇口/赤湾可能使用不同地点口径。" },
  { code: "CNSZX", name: "Shenzhen", cn: "深圳港", country: "中国", aliases: ["深圳", "shenzhen", "cnszx", "蛇口", "shekou", "赤湾"], note: "深圳为城市级口径，实际订舱请确认盐田、蛇口、赤湾等码头。" },
  { code: "CNTAO", name: "Qingdao", cn: "青岛港", country: "中国", aliases: ["青岛", "qingdao", "cntao", "cnqdg"], note: "华北/山东常用口岸，危险品和特殊箱需提前确认港区接收窗口。" },
  { code: "CNTSN", name: "Tianjin", cn: "天津港", country: "中国", aliases: ["天津", "tianjin", "cntsn", "新港", "xingang"], note: "北方常用口岸；船司系统可能显示 Tianjin/Xingang。" },
  { code: "CNXMN", name: "Xiamen", cn: "厦门港", country: "中国", aliases: ["厦门", "xiamen", "cnxmn"], note: "华南/福建常用口岸，注意截关截港和特殊箱操作要求。" },
  { code: "HKHKG", name: "Hong Kong", cn: "香港", country: "中国香港", aliases: ["香港", "hong kong", "hkhkg"], note: "转运、空海联运和快件场景常见，正式口径看承运人。" },
  { code: "SGSIN", name: "Singapore", cn: "新加坡港", country: "新加坡", aliases: ["新加坡", "singapore", "sgsin"], note: "全球重要中转港，船期判断要看是否在此中转。" },
  { code: "MYPKG", name: "Port Klang", cn: "巴生港", country: "马来西亚", aliases: ["巴生", "port klang", "klang", "mypkg"], note: "东南亚常见中转和目的港。" },
  { code: "THLCH", name: "Laem Chabang", cn: "林查班港", country: "泰国", aliases: ["林查班", "莱姆查邦", "laem chabang", "thlch"], note: "泰国主要集装箱港，DG/电池和清关资料需让当地进口商确认。" },
  { code: "NLRTM", name: "Rotterdam", cn: "鹿特丹港", country: "荷兰", aliases: ["鹿特丹", "rotterdam", "nlrtm"], note: "欧盟重要入境港，注意 EORI、VAT、CE/RED/RoHS 等目的国资料。" },
  { code: "DEHAM", name: "Hamburg", cn: "汉堡港", country: "德国", aliases: ["汉堡", "hamburg", "deham"], note: "欧洲常用目的港/中转港。" },
  { code: "USLAX", name: "Los Angeles", cn: "洛杉矶港", country: "美国", aliases: ["洛杉矶", "los angeles", "uslax"], note: "美西主要港口，关注 ILWU、拥堵、CBP、301/301 排除等贸易措施。" },
  { code: "USLGB", name: "Long Beach", cn: "长滩港", country: "美国", aliases: ["长滩", "long beach", "uslgb"], note: "常和洛杉矶港一起看作美西港口群。" },
  { code: "USNYC", name: "New York/Newark", cn: "纽约/纽瓦克港", country: "美国", aliases: ["纽约", "纽瓦克", "new york", "newark", "usnyc"], note: "美东主要港口，查箱货需看船司/码头具体入口。" },
  { code: "BRSSZ", name: "Santos", cn: "桑托斯港", country: "巴西", aliases: ["桑托斯", "santos", "brssz"], note: "巴西主要港口，清关和认证资料强依赖当地进口商。" },
  { code: "AEJEA", name: "Jebel Ali", cn: "杰贝阿里港", country: "阿联酋", aliases: ["杰贝阿里", "jebel ali", "dubai", "迪拜", "aejea"], note: "中东重要枢纽港，自由区/本地进口口径要分清。" }
];

const airportCodeData = [
  { iata: "PVG", icao: "ZSPD", name: "Shanghai Pudong International Airport", cn: "上海浦东国际机场", city: "上海", country: "中国", aliases: ["浦东", "上海浦东", "pvg", "shanghai pudong"], note: "华东主要国际货运机场，快件、普货、包板和电池/磁性货物常用。" },
  { iata: "SHA", icao: "ZSSS", name: "Shanghai Hongqiao International Airport", cn: "上海虹桥国际机场", city: "上海", country: "中国", aliases: ["虹桥", "sha", "shanghai hongqiao"], note: "以客运/国内为主，国际货运通常优先看 PVG。" },
  { iata: "CAN", icao: "ZGGG", name: "Guangzhou Baiyun International Airport", cn: "广州白云国际机场", city: "广州", country: "中国", aliases: ["广州", "白云", "can", "guangzhou"], note: "华南重要国际货运机场。" },
  { iata: "SZX", icao: "ZGSZ", name: "Shenzhen Bao'an International Airport", cn: "深圳宝安国际机场", city: "深圳", country: "中国", aliases: ["深圳", "宝安", "szx", "shenzhen"], note: "华南消费电子空运/快件常用机场。" },
  { iata: "HKG", icao: "VHHH", name: "Hong Kong International Airport", cn: "香港国际机场", city: "香港", country: "中国香港", aliases: ["香港机场", "hkg", "hong kong"], note: "全球重要空运枢纽，适合高频快件和空运中转。" },
  { iata: "NRT", icao: "RJAA", name: "Narita International Airport", cn: "东京成田机场", city: "东京", country: "日本", aliases: ["成田", "东京成田", "nrt", "narita"], note: "日本国际货运常用机场。" },
  { iata: "ICN", icao: "RKSI", name: "Incheon International Airport", cn: "仁川机场", city: "首尔", country: "韩国", aliases: ["仁川", "首尔", "icn", "incheon"], note: "东北亚空运中转常用机场。" },
  { iata: "SIN", icao: "WSSS", name: "Singapore Changi Airport", cn: "新加坡樟宜机场", city: "新加坡", country: "新加坡", aliases: ["新加坡机场", "樟宜", "sin", "changi"], note: "东南亚空运枢纽。" },
  { iata: "BKK", icao: "VTBS", name: "Bangkok Suvarnabhumi Airport", cn: "曼谷素万那普机场", city: "曼谷", country: "泰国", aliases: ["曼谷", "素万那普", "bkk", "bangkok"], note: "泰国主要国际空运机场，NBTC/进口商资料要提前确认。" },
  { iata: "LAX", icao: "KLAX", name: "Los Angeles International Airport", cn: "洛杉矶国际机场", city: "洛杉矶", country: "美国", aliases: ["洛杉矶机场", "lax", "los angeles"], note: "美国西岸空运常用入口，关注 CBP、FCC、电池/危险品规则。" },
  { iata: "JFK", icao: "KJFK", name: "John F. Kennedy International Airport", cn: "纽约 JFK 机场", city: "纽约", country: "美国", aliases: ["纽约", "jfk", "new york"], note: "美国东岸快件/空运常用入口。" },
  { iata: "ORD", icao: "KORD", name: "Chicago O'Hare International Airport", cn: "芝加哥奥黑尔机场", city: "芝加哥", country: "美国", aliases: ["芝加哥", "ord", "chicago"], note: "美国中部空运枢纽。" },
  { iata: "LHR", icao: "EGLL", name: "London Heathrow Airport", cn: "伦敦希思罗机场", city: "伦敦", country: "英国", aliases: ["伦敦", "希思罗", "lhr", "heathrow"], note: "英国主要国际机场，注意 UKCA、进口商和 VAT/EORI 资料。" },
  { iata: "FRA", icao: "EDDF", name: "Frankfurt Airport", cn: "法兰克福机场", city: "法兰克福", country: "德国", aliases: ["法兰克福", "fra", "frankfurt"], note: "欧洲空运枢纽，欧盟进口资料和认证文件要提前确认。" },
  { iata: "AMS", icao: "EHAM", name: "Amsterdam Schiphol Airport", cn: "阿姆斯特丹史基浦机场", city: "阿姆斯特丹", country: "荷兰", aliases: ["阿姆斯特丹", "史基浦", "ams", "schiphol"], note: "欧洲重要空运枢纽。" },
  { iata: "GRU", icao: "SBGR", name: "Sao Paulo Guarulhos International Airport", cn: "圣保罗瓜鲁柳斯机场", city: "圣保罗", country: "巴西", aliases: ["圣保罗", "瓜鲁柳斯", "gru", "sao paulo"], note: "巴西主要国际空运入口，CNPJ/CPF、ANATEL/INMETRO 和当地清关资料非常关键。" }
];

const seaOpsFeeProfiles = [
  {
    id: "shanghai-yangshan",
    name: "上海港 · 洋山港区",
    coverage: "上海深水港区，常见整柜、冷箱、危险品和特种箱操作口岸。",
    publicLevel: "官方入口可核验",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 420-650/箱；40GP/HQ 约 RMB 650-950/箱", note: "参考区间；不同船司、码头公司、内外贸、查验和单证项目会变化。" },
      { types: ["reefer"], item: "冷箱插电/监控/堆存", amount: "常见按箱/天或按班计，约 RMB 80-350/箱/天", note: "需确认 PTI、设定温度、插电起止时间、超期堆存。" },
      { types: ["dg"], item: "危险品箱特殊操作", amount: "普通箱费用 + DG 申报/审核/堆场/监护等逐票核价", note: "按 UN 号、类别、包装等级、港区接收窗口和船司规则确认。" },
      { types: ["oog", "bbk"], item: "OOG/BBK/吊装/绑扎", amount: "通常逐票报价；低风险参考从数百到数千元/票起", note: "看尺寸、重量、吊点、是否需要特殊机械和码头窗口。" }
    ],
    cautions: ["先确认具体码头公司，不要只写上海港。", "危险品、冷箱、OOG 进港前必须拿到船司/码头确认。", "查验、移箱、翻箱、滞港、改配不是基础费用，需单独核价。"],
    sources: [
      ["上港集团操作指南", "https://www.sipg.com.cn/Home/OperatingGuide"],
      ["上港集团收费服务目录清单", "https://www.portshanghai.com.cn/u/cms/www/202006/181626267096.pdf"]
    ]
  },
  {
    id: "shanghai-waigaoqiao",
    name: "上海港 · 外高桥港区",
    coverage: "外高桥多个码头公司，适合普通箱、部分危险品、冷箱和特殊箱逐票确认。",
    publicLevel: "官方入口可核验",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 420-650/箱；40GP/HQ 约 RMB 650-950/箱", note: "参考区间；以外高桥具体码头和船司账单为准。" },
      { types: ["dg"], item: "危险品箱进港/特殊堆存", amount: "逐票核价；可能叠加危申、堆场、监护、限时进港", note: "部分类别可能需线下确认或不能接收。" },
      { types: ["reefer"], item: "冷箱插电和堆存", amount: "约 RMB 80-350/箱/天，超期另计", note: "需核对插电时间、温度、是否查验。" },
      { types: ["oog", "bbk"], item: "超限/件杂", amount: "逐票报价；吊装、移箱、绑扎、加固另计", note: "标准集装箱码头不等于默认接受 BBK。" }
    ],
    cautions: ["先区分外一期、外二期、外四期等具体码头。", "特殊箱先审核再安排拖车，避免到闸退回。", "上海港费用要结合上港服务平台、船司和货代报价核验。"],
    sources: [
      ["上港集团操作指南", "https://www.sipg.com.cn/Home/OperatingGuide"],
      ["上港集团服务平台", "https://www.sipg.com.cn/"]
    ]
  },
  {
    id: "ningbo-zhoushan",
    name: "宁波舟山港 · 北仑/梅山/舟山",
    coverage: "华东主要出口口岸，实际费用要按北仑、梅山、穿山等港区拆分。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 380-620/箱；40GP/HQ 约 RMB 600-900/箱", note: "参考区间；以宁波具体港区和船司/货代账单为准。" },
      { types: ["reefer"], item: "冷箱插电/监控", amount: "约 RMB 80-320/箱/天", note: "梅山/北仑具体冷箱规则需核验。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价；DG booking、危申、特殊堆存可能叠加", note: "危险品进港窗口和类别限制要提前确认。" },
      { types: ["oog", "bbk"], item: "OOG/项目货", amount: "逐票报价；吊装和绑扎通常另计", note: "需确认港区设备、船司接受和道路限高限重。" }
    ],
    cautions: ["宁波和舟山港区多，订舱口径要和拖车、报关、进港码头一致。", "DG/OOG/冷箱先要货代拿书面确认。", "查验、移箱、堆存、落箱不是固定成本。"],
    sources: [
      ["宁波舟山港集团", "https://www.nbport.com.cn/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "shenzhen-yantian",
    name: "深圳港 · 盐田国际",
    coverage: "华南消费电子出口常用深水港，盐田与蛇口/赤湾费用和操作窗口不同。",
    publicLevel: "码头官网可核验",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 380-650/箱；40GP/HQ 约 RMB 600-950/箱", note: "参考区间；以盐田码头、船司和货代账单为准。" },
      { types: ["dg"], item: "危险品箱/电池类", amount: "逐票核价；可能叠加危申、堆场和限制进港", note: "消费电子含锂电池需同时看船司 DG 接受规则。" },
      { types: ["reefer"], item: "冷箱插电", amount: "约 RMB 80-350/箱/天", note: "需确认冷箱预约、插电、查验和提还箱时限。" },
      { types: ["oog", "bbk"], item: "OOG/超限箱", amount: "逐票报价；吊装、绑扎、超限运输另计", note: "进港前确认尺寸、重量和码头设备。" }
    ],
    cautions: ["盐田和蛇口/赤湾不是同一个操作口径。", "旺季拥堵时，落箱、改配、超期堆存更容易产生额外费用。", "DG/OOG 建议让货代提供费用项拆分。"],
    sources: [
      ["盐田国际集装箱码头", "https://www.yict.com.cn/"],
      ["深圳港集团", "https://www.szport.com.cn/"]
    ]
  },
  {
    id: "shenzhen-shekou",
    name: "深圳港 · 蛇口/赤湾",
    coverage: "深圳西部港区，适合华南出口、驳船和珠三角内支线场景。",
    publicLevel: "码头官网可核验",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 380-650/箱；40GP/HQ 约 RMB 600-950/箱", note: "参考区间；蛇口、赤湾、妈湾等实际口径不同。" },
      { types: ["dg"], item: "危险品/特殊货", amount: "逐票核价；DG 类别、UN 号、船司和港区规则决定", note: "部分 DG 需要提前做港区申请和船司预审。" },
      { types: ["reefer"], item: "冷箱插电/堆存", amount: "约 RMB 80-350/箱/天", note: "确认具体码头冷箱堆场和插电费。" },
      { types: ["oog", "bbk"], item: "OOG/BBK", amount: "逐票报价", note: "大件/散杂货不能默认按普通集装箱费用处理。" }
    ],
    cautions: ["订舱口岸、进港码头、报关口岸要一致。", "珠三角驳船/转关会引入额外驳船和码头费用。", "特殊货建议拿码头确认邮件。"],
    sources: [
      ["蛇口集装箱码头", "https://www.sctcn.com/"],
      ["深圳港集团", "https://www.szport.com.cn/"]
    ]
  },
  {
    id: "guangzhou-nansha",
    name: "广州港 · 南沙港区",
    coverage: "珠三角主要集装箱港区，适合华南出口、内贸外贸和部分特殊货。",
    publicLevel: "政府/港口入口可核验",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 360-620/箱；40GP/HQ 约 RMB 580-900/箱", note: "参考区间；以南沙具体码头和船司账单为准。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价；危申、堆存、监护、限制进港可能叠加", note: "DG 接收规则按类别和港区窗口确认。" },
      { types: ["reefer"], item: "冷箱插电", amount: "约 RMB 80-320/箱/天", note: "需要确认冷箱堆场和温控要求。" },
      { types: ["oog", "bbk"], item: "超限/大件", amount: "逐票报价", note: "需确认吊装能力和进港路线。" }
    ],
    cautions: ["广州港费用可先看港口/政府公示，再让货代按船司账单拆项。", "南沙与黄埔/新沙/内河口岸费用不同。", "查验、消杀、改单、落箱另计。"],
    sources: [
      ["广州港务局收费信息", "https://www.gzport.gov.cn/gzsgkml/gzsdbqhgq/zjgl/content/post_8761248.html"],
      ["广州港集团", "https://www.gzport.com/"]
    ]
  },
  {
    id: "qingdao-qianwan",
    name: "青岛港 · 前湾/董家口",
    coverage: "山东和华北主要港口，集装箱、冷箱、危险品和项目货需按港区确认。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 350-600/箱；40GP/HQ 约 RMB 560-880/箱", note: "参考区间；以青岛具体码头、船司和货代报价为准。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价；DG 类别、堆场和海事/港区要求影响大", note: "第 1、2、3、4、5 类通常更敏感。" },
      { types: ["reefer"], item: "冷箱插电", amount: "约 RMB 70-300/箱/天", note: "确认冷箱插电和超期堆存。" },
      { types: ["oog", "bbk"], item: "OOG/项目货", amount: "逐票报价", note: "设备、吊装、绑扎和道路方案影响费用。" }
    ],
    cautions: ["先确认前湾、董家口或其他港区。", "低温、危品、超限货要提前确认码头和船司。", "北方港冬季天气可能影响作业窗口。"],
    sources: [
      ["青岛港集团", "https://www.qingdao-port.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "tianjin-xingang",
    name: "天津港 · 新港",
    coverage: "华北主要海运口岸，普通箱、冷箱和危险品需结合港区监管要求。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 350-620/箱；40GP/HQ 约 RMB 560-900/箱", note: "参考区间；不同码头、外贸/内贸和查验情况差异较大。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价；DG 接收、堆场和监管要求影响显著", note: "危险品不得按普通货成本预估。" },
      { types: ["reefer"], item: "冷箱插电/堆存", amount: "约 RMB 70-320/箱/天", note: "确认插电、超期和查验安排。" },
      { types: ["oog", "bbk"], item: "OOG/大件", amount: "逐票报价", note: "需确认设备、通道、码头和运输许可。" }
    ],
    cautions: ["天津/Xingang 船司口径要统一。", "危险品和大型设备建议提前让货代出操作方案。", "北方港季节性天气和环保/交通管制会影响费用和时效。"],
    sources: [
      ["天津港集团", "https://www.tianjin-port.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "xiamen-haicang",
    name: "厦门港 · 海沧/嵩屿/远海",
    coverage: "福建主要集装箱口岸，海沧不同码头费用和特种箱规则要拆分。",
    publicLevel: "码头官网可核验",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 350-600/箱；40GP/HQ 约 RMB 560-880/箱", note: "参考区间；嵩屿、国际货柜、海天、远海口径不同。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价", note: "按 UN 号、类别、海事/码头/船司要求确认。" },
      { types: ["reefer"], item: "冷箱插电/堆存", amount: "约 RMB 70-300/箱/天", note: "确认具体码头插电和堆场规则。" },
      { types: ["oog", "bbk"], item: "OOG/BBK", amount: "逐票报价", note: "远海自动化码头等对非标货尤其要先确认。" }
    ],
    cautions: ["不要只写厦门港，先确认嵩屿、国际货柜、海天或远海。", "特殊箱先拿码头/货代书面确认。", "费用以厦门码头集团/码头网厅或报价单为准。"],
    sources: [
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["厦门港口管理局", "https://port.xm.gov.cn/"]
    ]
  },
  {
    id: "dalian-port",
    name: "大连港",
    coverage: "东北主要口岸，冷链、普通箱、部分项目货和危险品需按港区确认。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 340-600/箱；40GP/HQ 约 RMB 540-860/箱", note: "参考区间；以大连具体码头和船司账单为准。" },
      { types: ["reefer"], item: "冷箱/冷链", amount: "约 RMB 70-320/箱/天", note: "冷链货需核验插电、温度记录、查验和提货窗口。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价", note: "东北港危险品监管和堆场要求需逐票确认。" },
      { types: ["oog", "bbk"], item: "项目货/OOG", amount: "逐票报价", note: "港口吊装和道路许可影响大。" }
    ],
    cautions: ["冬季天气和冷链查验可能影响时效。", "DG 和项目货先拿船司/码头确认。", "费用以港口公示和货代报价为准。"],
    sources: [
      ["辽宁港口集团", "https://www.liaoningport.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "lianyungang-port",
    name: "连云港港",
    coverage: "华东/陆桥通道港口，普通箱、件杂、项目货和危险品需按货种确认。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 330-580/箱；40GP/HQ 约 RMB 530-850/箱", note: "参考区间；以具体码头和货代账单为准。" },
      { types: ["oog", "bbk"], item: "件杂/项目货", amount: "逐票报价", note: "连云港项目货场景较多，吊装、堆存、绑扎需单独核价。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价", note: "按类别、UN 号和港区规则确认。" },
      { types: ["reefer"], item: "冷箱", amount: "约 RMB 70-300/箱/天", note: "确认插电和堆场资源。" }
    ],
    cautions: ["项目货和普通箱费用结构不同。", "如涉及铁路/陆桥联运，要另看换装、站场和短驳费用。", "特殊货先拿港口/货代方案。"],
    sources: [
      ["连云港港口集团", "https://www.lygport.com.cn/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "fuzhou-jiangyin",
    name: "福州港 · 江阴/马尾",
    coverage: "福建出口口岸之一，普通箱、冷箱和特殊货需确认具体港区。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 330-580/箱；40GP/HQ 约 RMB 530-850/箱", note: "参考区间；福州不同港区和船司口径会变。" },
      { types: ["dg"], item: "危险品箱", amount: "逐票核价", note: "按港区接收规则和船司 DG booking 确认。" },
      { types: ["reefer"], item: "冷箱插电", amount: "约 RMB 70-300/箱/天", note: "确认插电资源和超期规则。" },
      { types: ["oog", "bbk"], item: "OOG/件杂", amount: "逐票报价", note: "需确认码头设备和进港路线。" }
    ],
    cautions: ["先确认江阴、马尾或其他具体港区。", "航线密度和中转安排会影响整体成本。", "特殊货不要按普通箱成本报价。"],
    sources: [
      ["福建港口集团", "https://www.fjpg.cn/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "hongkong-port",
    name: "香港港",
    coverage: "华南转运、空海联运和国际中转口岸，费用通常按码头/船司/仓库拆项。",
    publicLevel: "主要港口参考",
    feeLines: [
      { types: ["general"], item: "普通箱码头/本地操作", amount: "参考区间波动较大，需按船司/码头/仓库报价", note: "香港本地拖车、码头处理和仓库费用结构不同于内地港口。" },
      { types: ["dg"], item: "危险品/电池", amount: "逐票核价", note: "转运、空海联运和 DG 接受规则要看承运人。" },
      { types: ["reefer"], item: "冷箱/温控", amount: "逐票核价", note: "确认插电、冷链仓和转运时间。" },
      { types: ["oog", "bbk"], item: "特殊货", amount: "逐票报价", note: "香港人工、仓储和本地运输费用通常更高。" }
    ],
    cautions: ["香港适合做中转，但成本拆项多。", "不要用内地港区费用直接套香港。", "高价值和电池货要提前确认承运限制。"],
    sources: [
      ["香港海事处", "https://www.mardep.gov.hk/"],
      ["Hong Kong Port Development Council", "https://www.pdc.gov.hk/"]
    ]
  }
];

const airOpsFeeProfiles = [
  {
    id: "shanghai-pvg",
    name: "上海 · 浦东/虹桥机场货站",
    coverage: "华东国际空运、快件和普货常用机场。",
    publicLevel: "公开收费表命中",
    feeLines: [
      { types: ["general"], item: "货物进/出港费", amount: "RMB 0.20/kg，最低 RMB 100/票", note: "上海机场公开收费标准；适合作为进出港基础费用参考。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性预审", amount: "通常在基础费用外按承运商/货站要求另计", note: "可能需要 MSDS、UN38.3、运输危险性鉴定报告、磁检或承运人预审。" },
      { types: ["reefer"], item: "冷藏/温控货", amount: "逐票核价", note: "看温控仓、冷链交接、查验和航班衔接。" }
    ],
    cautions: ["上海公开表只解决基础货站费用，航空公司运费、燃油、安检、报关、提货派送另计。", "含电池、磁性、液体或粉末要先问承运商是否接收。", "到达清关费用要看目的国进口商和快递/航空公司。"],
    sources: [
      ["上海机场货物运输费用", "https://www.shanghaiairport.com/cn/jcpshc/page_48933.html"],
      ["上海机场 2026 收费标准 PDF", "https://www.shanghaiairport.com/uploadfiles/2026/01/20260105165102635.pdf"]
    ]
  },
  {
    id: "shenzhen-szx",
    name: "深圳宝安机场 · 国际货站",
    coverage: "华南消费电子空运、快件和跨境电商常用机场。",
    publicLevel: "公开收费表命中",
    feeLines: [
      { types: ["general"], item: "普货出港货站服务", amount: "RMB 0.58/kg，最低 RMB 50/运单", note: "深圳机场国际货站公开收费示例。" },
      { types: ["special", "battery"], item: "特货出港货站服务", amount: "RMB 0.98/kg，最低 RMB 100/运单", note: "电池、磁性、超限、高价值等可能按特货口径处理。" },
      { types: ["general"], item: "普通货物仓储", amount: "RMB 0.30/kg/天，最低 RMB 50/票", note: "超免费期后可能产生。" },
      { types: ["special", "battery", "reefer"], item: "特殊货物仓储", amount: "RMB 0.50/kg/天，最低 RMB 100/票", note: "以货站实际分类为准。" }
    ],
    cautions: ["深圳消费电子出货多，电池/磁性/品牌授权要提前预审。", "空运费用不等于货站费用，还包括航空运费、燃油、安检、报关和派送。", "特货分类由货站/承运人决定。"],
    sources: [
      ["深圳机场国际货站收费标准 PDF", "https://www.iccs.com.cn/upload/20220301/1707lrnbhr.pdf"],
      ["深圳机场国际货站", "https://www.iccs.com.cn/"]
    ]
  },
  {
    id: "ezhou-ehu",
    name: "鄂州花湖机场",
    coverage: "中部航空货运枢纽，适合快件、普货、冷链和中转场景。",
    publicLevel: "公开收费表命中",
    feeLines: [
      { types: ["general"], item: "普通货物安检", amount: "RMB 0.50/kg，最低 RMB 5/票", note: "公开收费通知示例。" },
      { types: ["special", "battery"], item: "特殊货物安检", amount: "RMB 1.00/kg，最低 RMB 100/票", note: "特殊货、电池、磁性或疑似 DG 可能适用。" },
      { types: ["general"], item: "地面服务费", amount: "RMB 0.20/kg", note: "公开收费通知示例。" },
      { types: ["general"], item: "协助海关查验", amount: "RMB 0.20/kg，最低 RMB 200/票", note: "发生查验时可能产生。" },
      { types: ["general"], item: "普通仓储", amount: "RMB 0.15/kg/天", note: "超免费期后产生。" },
      { types: ["battery"], item: "危险品仓储", amount: "RMB 0.90/kg/天", note: "按危险品分类和货站要求确认。" },
      { types: ["reefer"], item: "冷藏/冷冻仓储", amount: "RMB 0.45/kg/天，最低 RMB 200/票", note: "温控货需确认仓位和交接时间。" }
    ],
    cautions: ["鄂州适合航空货运枢纽场景，但具体航线/承运人会影响总成本。", "查验、冷藏和危险品费用要单独列入报价。", "快件和普通空运的计费体系不同。"],
    sources: [
      ["鄂州花湖机场航空货站收费公示", "https://www.ezhouhuahu.com/hhdt/19608.jhtml"],
      ["鄂州花湖机场", "https://www.ezhouhuahu.com/"]
    ]
  },
  {
    id: "guangzhou-can",
    name: "广州白云机场",
    coverage: "华南国际空运枢纽，普货、快件、跨境电商和特货较多。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.80/kg；最低 RMB 50-150/票", note: "参考区间；以白云机场货站/航空公司/货代报价为准。" },
      { types: ["special", "battery"], item: "特货/电池/磁性预审", amount: "常按普货上浮或逐票收取", note: "需要 MSDS、UN38.3、运输危险性鉴定报告、磁检等。" },
      { types: ["reefer"], item: "温控/冷藏", amount: "逐票核价", note: "看温控仓、航班和查验安排。" }
    ],
    cautions: ["广州和深圳机场都适合消费电子，选择时同时看航线、截单、DG 接受和目的国清关。", "旺季舱位和燃油附加费对总价影响更大。", "特货建议提前做货站预审。"],
    sources: [
      ["广州白云机场", "https://www.gbiac.net/"],
      ["广州白云机场航空物流", "https://www.gbiac.net/"]
    ]
  },
  {
    id: "beijing-pek-pkx",
    name: "北京 · 首都/大兴机场",
    coverage: "华北空运枢纽，首都机场和大兴机场货站口径需分开。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.80/kg；最低 RMB 50-150/票", note: "参考区间；以具体机场货站和承运人报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价或按特货口径上浮", note: "需确认航空运输条件鉴定、磁检、DG 文件和承运限制。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "看冷库、查验和航班安排。" }
    ],
    cautions: ["PEK/PKX 不要混用，运单、交货仓和航班口径要一致。", "高价值、样品、维修件要准备用途说明和商业文件。", "目的国清关资料由收件人提前确认。"],
    sources: [
      ["北京首都国际机场", "https://www.bcia.com.cn/"],
      ["北京大兴国际机场", "https://www.bdia.com.cn/"]
    ]
  },
  {
    id: "zhengzhou-cgo",
    name: "郑州新郑机场",
    coverage: "中部国际货运和电子产品空运枢纽。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以货站/航空公司报价为准。" },
      { types: ["special", "battery"], item: "电子产品/电池/磁性", amount: "逐票核价", note: "需确认承运人是否接受、文件是否齐全。" },
      { types: ["reefer"], item: "温控/冷链", amount: "逐票核价", note: "确认仓储和转运时间。" }
    ],
    cautions: ["郑州适合中部集货和国际货运，但航线和舱位决定实际成本。", "电池/磁性货不要先承诺时效。", "如是包板/BSA，需要另看板型、装板和拉货规则。"],
    sources: [
      ["郑州机场", "https://www.zzairport.com/"],
      ["河南机场集团", "https://www.zzairport.com/"]
    ]
  },
  {
    id: "chengdu-tfu",
    name: "成都 · 天府/双流机场",
    coverage: "西南空运枢纽，天府和双流操作口径要分开。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以具体机场货站和承运人报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价", note: "确认货站分类、航司接受和鉴定文件。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "需确认冷库和航班衔接。" }
    ],
    cautions: ["TFU/CTU 口径要和订舱、送货仓一致。", "西南出货要同时看国内段卡车/仓库费用。", "特殊货建议做发运前预审。"],
    sources: [
      ["成都天府国际机场", "https://www.cdtfairport.com/"],
      ["四川省机场集团", "https://www.cwag.com/"]
    ]
  },
  {
    id: "hangzhou-hgh",
    name: "杭州萧山机场",
    coverage: "长三角空运、跨境电商、快件和普货常用机场。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以机场货站/承运人报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价", note: "消费电子和样品常被要求补鉴定资料。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "看货站和航班资源。" }
    ],
    cautions: ["杭州、上海、宁波空运可比较截单、航线和拖车成本。", "跨境电商和普通贸易清关资料不同。", "电池/磁性先确认承运限制。"],
    sources: [
      ["杭州萧山国际机场", "https://www.hzairport.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "xiamen-xmn",
    name: "厦门高崎机场",
    coverage: "福建空运和快件常用机场。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以厦门机场货站/航空公司报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价", note: "含锂电池设备、喇叭磁性部件和维修件需预审。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "看货站设施和航线。" }
    ],
    cautions: ["厦门可和福州、泉州、深圳、香港空运口岸比较总成本。", "样品和维修件要写清用途和价值。", "含电池/磁性先准备鉴定资料。"],
    sources: [
      ["厦门机场", "https://www.xiamenairport.com.cn/"],
      ["元翔空港", "https://www.iport.com.cn/"]
    ]
  },
  {
    id: "qingdao-tao",
    name: "青岛胶东机场",
    coverage: "山东空运和日韩/欧美线货运口岸。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以青岛机场货站和承运人报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价", note: "确认鉴定文件和航司接受规则。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "看货站能力和航班。" }
    ],
    cautions: ["胶东机场与青岛港海运可做时效/成本对比。", "特殊货先预审，避免交仓后退运。", "目的国清关文件要提前让进口商确认。"],
    sources: [
      ["青岛机场集团", "https://www.qdairport.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "xian-xiy",
    name: "西安咸阳机场",
    coverage: "西北空运和中欧/中亚方向货运节点。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以机场货站和承运人报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价", note: "确认鉴定、包装和航空公司限制。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "看货站和航线资源。" }
    ],
    cautions: ["西安可对比空运、中欧班列和海铁联运。", "高货值电子产品要注意保险和清关资料。", "特殊货不要按普货时效承诺。"],
    sources: [
      ["西安咸阳国际机场", "https://www.xxia.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "wuhan-wuh",
    name: "武汉天河机场",
    coverage: "华中空运和国内/国际转运节点。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "普通货站/进出港/安检参考", amount: "约 RMB 0.20-0.75/kg；最低 RMB 50-150/票", note: "参考区间；以武汉机场货站和承运人报价为准。" },
      { types: ["special", "battery"], item: "特殊货/电池/磁性", amount: "逐票核价", note: "确认承运限制和文件。" },
      { types: ["reefer"], item: "冷链/温控", amount: "逐票核价", note: "看温控仓和航班安排。" }
    ],
    cautions: ["武汉与鄂州可按航线和货站费用对比。", "查验、仓储和派送另计。", "电池/磁性货提前做预审。"],
    sources: [
      ["武汉天河机场", "https://www.whairport.com/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ]
  },
  {
    id: "hongkong-hkg",
    name: "香港国际机场",
    coverage: "全球空运枢纽，适合高频快件、空运中转和高价值货。",
    publicLevel: "主要机场参考",
    feeLines: [
      { types: ["general"], item: "货站/仓储/处理参考", amount: "按货站、航空公司和代理报价；通常高于内地普通货站费用", note: "香港费用结构含本地运输、仓库、货站和航空公司项目。" },
      { types: ["special", "battery"], item: "电池/危险品/高价值货", amount: "逐票核价", note: "承运人规则和安检要求严格，文件不齐会延误。" },
      { types: ["reefer"], item: "温控/冷链", amount: "逐票核价", note: "看冷库、ULD、航线和中转时间。" }
    ],
    cautions: ["香港适合速度和航线，但成本拆项多。", "电池/DG 和品牌货要提前核验承运限制。", "内地到香港的跨境卡车/仓库费用要另外算。"],
    sources: [
      ["香港国际机场货运", "https://www.hongkongairport.com/en/business/cargo/"],
      ["香港空运货站 HACTL", "https://www.hactl.com/"]
    ]
  }
];

const baseOfficialSources = [
  ["中国国际贸易单一窗口", "https://www.singlewindow.cn/", "通关业务、监管证件、申报相关服务入口。"],
  ["海关总署门户", "http://www.customs.gov.cn/", "海关公告、政策法规、归类决定和行政裁定。"],
  ["海关总署归类决定和行政裁定", "https://app.gjzwfw.gov.cn/jmopen/webapp/html5/gljdcdPC/index.html", "按商品名称、决定税号、规格型号查询归类参考。"],
  ["互联网+海关", "http://online.customs.gov.cn/", "税率查询、商品编码相关政务服务入口。"],
  ["商品归类管理规定", "https://www.gov.cn/zhengce/2021-09/06/content_5723370.htm", "归类依据、行政裁定和申报责任边界。"],
  ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/", "3C 目录、认证实施规则和公告核验。"],
  ["市场监管总局", "https://www.samr.gov.cn/", "产品质量、认证监管、标准和市场监管公告。"],
  ["工业和信息化部", "https://www.miit.gov.cn/", "无线电、型号核准、通信设备相关政策入口。"],
  ["商务部", "http://www.mofcom.gov.cn/", "贸易政策、贸易救济、国别贸易环境和政策解读。"],
  ["WCO Harmonized System", "https://www.wcoomd.org/en/topics/nomenclature/overview/what-is-the-harmonized-system.aspx", "HS 全球协调制度背景和归类体系来源。"],
  ["WTO", "https://www.wto.org/", "成员国贸易政策、关税、通报和争端背景。"],
  ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home", "欧盟关税、原产地、产品要求、进口程序和统计。"],
  ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp", "欧盟 TARIC 税则、措施、监管条件查询。"],
  ["EUR-Lex", "https://eur-lex.europa.eu/", "欧盟法规原文检索。"],
  ["EU Safety Gate", "https://ec.europa.eu/safety-gate-alerts/", "欧盟消费品安全召回和风险通报。"],
  ["USITC HTS", "https://hts.usitc.gov/", "美国 HTS 税号和税率查询。"],
  ["USITC Tariff Information", "https://www.usitc.gov/harmonized_tariff_information", "美国 HTS 修订、公告、归档和 DataWeb。"],
  ["CBP CROSS Rulings", "https://rulings.cbp.gov/", "美国海关归类、原产地、估价等裁定检索。"],
  ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies", "301、232、反倾销反补贴等贸易救济执行信息。"],
  ["USTR Section 301", "https://ustr.gov/issue-areas/enforcement/section-301-investigations", "美国 301 调查、公告、听证和措施入口。"],
  ["USTR 2026 Special 301", "https://ustr.gov/about/policy-offices/press-office/press-releases/2026/april/ustr-releases-2026-special-301-report-intellectual-property-protection-and-enforcement", "2026 Special 301 知识产权保护和执法报告官方发布入口。"],
  ["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm", "美国无线/射频设备 FCC ID 和授权信息核验。"],
  ["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/", "英国商品编码、税率、进口措施和文件代码。"],
  ["GOV.UK Import Goods", "https://www.gov.uk/import-goods-into-uk", "英国进口流程、商品编码、税费和许可说明。"],
  ["Japan Customs Tariff", "https://www.customs.go.jp/english/tariff/", "日本进口税则和统计编码。"],
  ["Japan Customs Tariff System", "https://www.customs.go.jp/english/summary/tariff.htm", "日本关税制度和预裁定说明。"],
  ["Thailand Customs", "https://www.customs.go.th/", "泰国海关税则、进口清关和公告入口。"],
  ["Thailand National Single Window", "https://www.thainsw.net/", "泰国单一窗口和跨境贸易单证入口。"],
  ["Thailand TISI", "https://www.tisi.go.th/", "泰国产品标准和强制标准入口。"],
  ["Thailand NBTC", "https://www.nbtc.go.th/", "泰国无线通信设备许可和监管入口。"],
  ["Laem Chabang Port", "https://lcp.port.co.th/cs/internet/lcp/Information.html", "林查班港官方信息，适合核对港口基础状态。"],
  ["Port Authority of Thailand", "https://www.port.co.th/", "泰国港务局公告和港口政策。"],
  ["GSO Conformity", "https://www.gso.org.sa/en/conformity/conformity-tracking-system/", "GCC G-Mark、低压电器和合格评定入口。"],
  ["IATA Dangerous Goods", "https://www.iata.org/en/programs/cargo/dgr/", "空运危险品和锂电池规则更新。"],
  ["IATA Lithium Battery Guidance", "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/", "锂电池空运指导文件和更新。"],
  ["IATA Air Cargo", "https://www.iata.org/en/programs/cargo/", "全球空运货运规则、市场、危险品和操作手册入口。"],
  ["IATA Cargo News", "https://www.iata.org/en/pressroom/", "空运需求、危险品数字化、货运规则更新和行业新闻。"],
  ["ICAO Cargo Safety", "https://www.icao.int/operational-safety/cargo-Safety", "航空货物安全、锂电池设备和危险品安全参考。"],
  ["FAA Lithium Battery Resources", "https://www.faa.gov/hazmat/resources/lithium_batteries", "锂电池运输安全资源和事件数据。"],
  ["DHL Tracking", "https://www.dhl.com/global-en/home/tracking.html", "DHL Express 官方快件追踪入口。"],
  ["UPS Tracking", "https://www.ups.com/track", "UPS 官方包裹追踪入口。"],
  ["FedEx Tracking", "https://www.fedex.com/fedextrack/", "FedEx 官方追踪入口。"],
  ["SF Express Tracking", "https://www.sf-express.com/", "顺丰官方寄件、查件和服务入口。"],
  ["Air Cargo News", "https://www.aircargonews.net/", "全球空运、航空货运和机场货站行业新闻。"],
  ["UNECE Dangerous Goods", "https://unece.org/transport/dangerous-goods", "UN 危险品规则、UN38.3 相关资料入口。"],
  ["WTO Latest News RSS", "https://www.wto.org/library/rss/latest_news_e.xml", "WTO 最新贸易政策、争端、通报和会议新闻。"],
  ["WTO Trade Monitoring", "https://www.wto.org/english/tratop_e/tpr_e/trade_monitoring_e.htm", "全球贸易措施监测，用于政策变化背景判断。"],
  ["WTO Tariff Tracker", "https://ttd.wto.org/en/reports/tariff-actions", "WTO/IMF 关税行动跟踪，适合观察突发关税变化。"],
  ["WTO I-TIP", "https://www.wto.org/english/res_e/statis_e/itip_e.htm", "WTO 综合贸易政策与统计入口。"],
  ["ITC Market Access Map", "https://www.macmap.org/", "关税、贸易措施和市场准入参考。"],
  ["World Bank WITS", "https://wits.worldbank.org/", "关税、非关税措施和贸易统计背景。"],
  ["UN Comtrade", "https://comtradeplus.un.org/", "全球贸易统计，用于市场和品类趋势。"],
  ["Global Trade Alert", "https://www.globaltradealert.org/", "全球贸易政策措施观察。"],
  ["IMF Trade", "https://www.imf.org/en/Topics/Trade", "宏观贸易、关税和全球经济背景。"],
  ["UNCTAD", "https://unctad.org/topic/trade-analysis", "国际贸易、供应链和发展经济分析。"],
  ["OECD Trade", "https://www.oecd.org/trade/", "贸易政策、供应链和经济指标背景。"],
  ["Brazil Receita Federal Classificação", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias", "巴西 NCM/商品归类官方入口。"],
  ["Brazil Sistema Classif", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias/classif", "巴西 Classif 系统，包含 NCM 和税务/行政处理信息。"],
  ["Brazil Portal Siscomex", "https://www.gov.br/siscomex/pt-br", "巴西外贸单一门户、进口出口系统和公告。"],
  ["Brazil ANATEL", "https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos", "巴西无线/通信产品认证和 homologation。"],
  ["Brazil INMETRO", "https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/produtos-e-servicos-regulados", "巴西受监管产品和合格评定入口。"],
  ["Mexico SNICE TIGIE", "https://www.snice.gob.mx/cs/avi/snice/tfinicio.html", "墨西哥 TIGIE 税则、修改和关税指标。"],
  ["Mexico SAT", "https://www.sat.gob.mx/", "墨西哥海关、税务和进口商登记相关入口。"],
  ["Mexico IFETEL", "https://www.ift.org.mx/", "墨西哥无线/通信设备监管。"],
  ["Mexico NOM Catalog", "https://www.snice.gob.mx/cs/avi/snice/comercio.aprende.importar.html", "墨西哥进口流程和 NOM 标准入口。"],
  ["Canada CBSA Customs Tariff", "https://www.cbsa.gc.ca/trade-commerce/tariff-tarif/menu-eng.html", "加拿大海关税则、归类指南和裁定入口。"],
  ["Canada Import Guide", "https://www.cbsa.gc.ca/import/guide-eng.html", "加拿大商业进口步骤和税费说明。"],
  ["ISED Canada", "https://ised-isde.canada.ca/", "加拿大无线、电信和产品合规入口。"],
  ["Health Canada Product Safety", "https://www.canada.ca/en/health-canada/services/consumer-product-safety.html", "加拿大消费品安全要求。"],
  ["Australian Border Force Tariff", "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff", "澳大利亚税则和归类。"],
  ["ACMA Australia", "https://www.acma.gov.au/", "澳大利亚无线/通信设备监管。"],
  ["Product Safety Australia", "https://www.productsafety.gov.au/", "澳大利亚消费品安全入口。"],
  ["Korea Customs Service", "https://www.customs.go.kr/english/main.do", "韩国海关和进口政策入口。"],
  ["KATS Korea", "https://www.kats.go.kr/en/main.do", "韩国标准和 KC 认证参考。"],
  ["RRA Korea", "https://www.rra.go.kr/en/index.do", "韩国无线/电磁兼容监管入口。"],
  ["Vietnam Customs", "https://www.customs.gov.vn/", "越南海关公告和手续入口。"],
  ["Vietnam National Single Window", "https://vnsw.gov.vn/", "越南单一窗口。"],
  ["MIC Vietnam", "https://mic.gov.vn/", "越南无线/通信设备监管参考。"],
  ["Singapore Customs", "https://www.customs.gov.sg/", "新加坡海关和进出口手续。"],
  ["IMDA Singapore", "https://www.imda.gov.sg/", "新加坡通信/无线设备监管。"],
  ["Enterprise Singapore", "https://www.enterprisesg.gov.sg/", "新加坡产品安全、标准和企业合规入口。"],
  ["Royal Malaysian Customs", "https://www.customs.gov.my/", "马来西亚海关入口。"],
  ["SIRIM QAS", "https://www.sirim-qas.com.my/", "马来西亚产品认证参考。"],
  ["MCMC Malaysia", "https://www.mcmc.gov.my/", "马来西亚通信/无线设备监管。"],
  ["Indonesia Customs DGCE", "https://www.beacukai.go.id/", "印度尼西亚海关入口。"],
  ["Indonesia National Single Window", "https://www.insw.go.id/", "印尼国家单一窗口。"],
  ["SDPPI Indonesia", "https://sertifikasi.postel.go.id/", "印尼无线/通信设备认证。"],
  ["CBIC India", "https://www.cbic.gov.in/", "印度海关税则和通关政策。"],
  ["BIS India", "https://www.bis.gov.in/", "印度标准和产品认证参考。"],
  ["WPC India", "https://dot.gov.in/spectrum-management/2457", "印度无线设备许可参考。"],
  ["Philippines Tariff Commission", "https://tariffcommission.gov.ph/", "菲律宾税则和归类资料。"],
  ["Philippines Bureau of Customs", "https://customs.gov.ph/", "菲律宾海关入口。"],
  ["NTC Philippines", "https://ntc.gov.ph/", "菲律宾无线通信监管。"],
  ["Turkey Trade Ministry", "https://ticaret.gov.tr/", "土耳其贸易和进口监管入口。"],
  ["Turkey Tariff Search", "https://uygulama.gtb.gov.tr/Tara/", "土耳其税则查询。"],
  ["BTK Turkey", "https://www.btk.gov.tr/", "土耳其通信和无线设备监管。"],
  ["Dubai Customs", "https://www.dubaicustoms.gov.ae/", "迪拜海关入口。"],
  ["Dubai Trade", "https://www.dubaitrade.ae/", "迪拜贸易和清关服务入口。"],
  ["TDRA UAE", "https://tdra.gov.ae/", "阿联酋通信/无线设备监管。"],
  ["ZATCA Saudi Customs", "https://zatca.gov.sa/", "沙特海关和税务入口。"],
  ["SABER Saudi", "https://saber.sa/", "沙特产品合格评定平台。"],
  ["SASO Saudi", "https://www.saso.gov.sa/", "沙特标准和产品安全入口。"],
  ["gCaptain", "https://gcaptain.com/", "海运、航线、港口和船公司新闻。"],
  ["The Loadstar", "https://theloadstar.com/", "国际物流、空海运、港口和供应链新闻。"],
  ["The Maritime Executive", "https://maritime-executive.com/", "海事、港口、法规和航运风险新闻。"],
  ["FreightWaves Maritime", "https://www.freightwaves.com/news/category/maritime", "美国和全球物流、卡车、海运市场新闻。"],
  ["Splash247", "https://splash247.com/", "航运、船公司、港口和市场消息。"],
  ["Journal of Commerce Maritime", "https://www.joc.com/maritime", "集装箱航运、港口和供应链行业分析。"],
  ["Port Technology", "https://www.porttechnology.org/", "港口技术、拥堵、码头和数字化新闻。"],
  ["Hellenic Shipping News", "https://www.hellenicshippingnews.com/", "航运、港口、市场和能源相关资讯。"],
  ["Safety4Sea", "https://safety4sea.com/", "海事安全、法规、船舶和风险资讯。"],
  ["Port of Los Angeles", "https://www.portoflosangeles.org/", "洛杉矶港官方公告、吞吐和运营信息。"],
  ["Port of Long Beach", "https://polb.com/", "长滩港官方公告、港口运行和项目。"],
  ["Port of Rotterdam", "https://www.portofrotterdam.com/", "鹿特丹港官方新闻和运营信息。"],
  ["Maritime and Port Authority Singapore", "https://www.mpa.gov.sg/", "新加坡海事港务局公告和政策。"],
  ["Port of Hamburg", "https://www.hafen-hamburg.de/en/", "汉堡港官方信息。"],
  ["Transnet National Ports Authority", "https://www.transnetnationalportsauthority.net/", "南非港口官方入口。"],
  ["Port of Santos", "https://www.portodesantos.com.br/en/", "巴西桑托斯港官方信息。"],
  ["Reuters Markets", "https://www.reuters.com/markets/", "宏观经济、市场、贸易和政策新闻。"],
  ["BBC Business", "https://www.bbc.com/news/business", "全球商业、贸易和经济新闻。"],
  ["AP Business", "https://apnews.com/hub/business", "全球商业和政策新闻。"],
  ["贸企通 301 分析", "https://www.eccpit.com/news/Y21zcG86MjEwMTA", "行业/贸促体系政策解读，可作为趋势和应对建议参考，正式口径仍回到 USTR/CBP/海关公告核验。"],
  ["走出去导航网 301 预警", "https://www.investgo.cn/article/gb/fxyj/202606/849023.html", "转载贸企通等外贸风险预警，适合做中文政策变化提醒。"],
  ["中银律师 2026 301 分析", "https://www.zhongyinlawyer.com/Home/LibraryDetail?Title=%E7%BE%8E%E5%9B%BD%2C2026%2C301", "法律专业解读，适合补充 301 调查背景、影响和企业应对。"],
  ["金杜 301/UFLPA 分析", "https://www.kingandwood.com/cn/zh/insights/latest-thinking/the-coordinated-mechanism-of-us-section-301-investigations-over-forced-labor-import-and-uflpa-enforcement-in-2026.html", "法律专业解读，适合关注强迫劳动、UFLPA 和 301 调查联动。"],
  ["White & Case Section 301", "https://www.whitecase.com/insight-alert/ustr-initiates-section-301-investigations-16-us-trade-partners-targeting-industrial", "国际律所贸易政策解读，适合观察美国 301 调查和产业影响。"],
  ["Global Trade Alert Section 301", "https://globaltradealert.org/reports/s301-trump-tariff-tool", "全球贸易措施观察和背景分析。"]
];

const officialSources = dedupeSourceRows([
  ...baseOfficialSources,
  ...(Array.isArray(window.EXTRA_SOURCE_CATALOG) ? window.EXTRA_SOURCE_CATALOG : [])
]);

const declarationSets = [
  ["耳机 / Headphone", ["品名及用途", "佩戴方式", "是否无线/蓝牙", "是否含电池", "品牌/型号", "是否带麦克风"]],
  ["音箱 / Soundbar", ["喇叭数量", "是否有箱体", "额定功率", "连接方式", "是否带电源适配器", "是否含电池"]],
  ["CD Player", ["播放介质", "是否录音", "是否网络/无线", "电源方式", "品牌/型号", "随附配件"]],
  ["维修件 / Spare Part", ["对应整机", "是否专用零件", "材质", "功能", "是否独立销售", "维修用途说明"]],
  ["电池 / Battery", ["电池类型", "额定容量/Wh", "包装方式", "UN38.3", "MSDS", "运输方式限制"]],
  ["无线设备", ["无线制式", "频段", "是否独立通信", "型号核准", "3C 边界", "说明书/规格书"]]
];

const docItems = [
  ["商业发票", "Commercial Invoice", "品名、HS、数量、价格、币种、原产地、贸易方式"],
  ["装箱单", "Packing List", "箱数、毛净重、尺寸、SKU/型号、包装方式"],
  ["提单/运单", "B/L or AWB", "船名航次、提单号、POL/POD、收发货人"],
  ["产品规格书", "Specification", "用途、材质、功能、参数、图片、品牌型号"],
  ["申报要素表", "Declaration Elements", "按候选 HS 准备要素，关务复核后定稿"],
  ["DG 文件", "MSDS / UN38.3", "含锂电池产品优先核验，空运尤其敏感"],
  ["认证资料", "3C / SRRC / Others", "根据产品和目的国判断是否需要"],
  ["归类说明", "Classification Memo", "记录候选税号、依据、风险和复核人"]
];

const opsItems = [
  ["Vessel & Schedule", "船名、目的港、POL/POD、ETD/ETA、Carrier，可先手工输入；船讯网 API 已走后端代理。", ["船名查询", "后端接入中"]],
  ["Customs / Manifest", "提运单号、箱号、关区代码、舱单状态，当前先给官方入口和字段提醒。", ["入口导航", "权限待定"]],
  ["Shipment Milestone", "订舱、截关、开船、到港、申报、放行、送仓，后续可做每票看板。", ["样例看板", "可导出"]],
  ["Port & Logistics Risk", "港口拥堵、查验、天气、DG 限制、目的港规则，先手工维护重点提醒。", ["手工维护", "未来订阅"]]
];

const freeApiOptions = [
  ["GDELT DOC 2.0", "政策/新闻趋势", "免费、无需 key", "已接入", "抓取过去一周政策、贸易、港口、金融新闻；作为趋势提醒，不替代官方公告。", "https://api.gdeltproject.org/api/v2/doc/doc"],
  ["Federal Register API", "美国官方政策公告", "免费、无需 key", "已接入", "美国法规、关税、贸易救济、海关相关公告，可作为美国政策变化的官方信号。", "https://www.federalregister.gov/developers/documentation/api/v1"],
  ["GOV.UK Search API", "英国政策/海关指南", "免费、无需 key", "已接入", "英国政府公开搜索，可补充 UK Trade Tariff、CDS 申报指南和进口流程更新。", "https://www.gov.uk/api/search.json"],
  ["USTR / CBP 官方入口", "美国贸易措施", "公开网页/RSS/公告", "已加入来源", "301、232、贸易救济、CBP 执行信息；正式税费判断必须回到官方公告和 HTS/CBP。", "https://ustr.gov/issue-areas/enforcement/section-301-investigations"],
  ["贸促/律所/协会解读", "政策解读和应对建议", "公开网页", "已加入来源", "补充贸企通、走出去导航网、律所和行业分析，用于看趋势和准备问题清单，不替代政府公告。", "https://www.eccpit.com/"],
  ["World Bank API", "宏观经济指标", "免费、无需 key", "已接入", "补充全球 GDP、通胀等趋势指标，帮助判断需求、成本和市场环境。", "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information"],
  ["Frankfurter FX API", "汇率", "免费、无需 key", "已接入", "补充 USD/CNY/EUR/GBP/JPY 汇率观察，用于报价、成本和付款风险背景。", "https://www.frankfurter.app/docs/"],
  ["Open-Meteo Marine", "港口天气/海况", "免费、无需 key", "可直接接入", "按港口坐标查浪高、海温、洋流等，适合补充港口风险。非商业免费有调用限制。", "https://open-meteo.com/en/docs/marine-weather-api"],
  ["IATA / ICAO 官方入口", "空运规则/危险品", "公开网页", "已加入来源", "用于空运锂电池、危险品、航空货运市场和操作规则的人工核验；真正自动状态查询仍需承运商 API。", "https://www.iata.org/en/programs/cargo/"],
  ["DHL/UPS/FedEx/SF 官方追踪", "快件状态", "免费网页/可能验证码", "已加入入口", "适合快件单号核验。若需要在平台内直接返回状态，需要承运商账号 API 或授权接口。", "#air"],
  ["AISstream", "AIS 船舶位置流", "免费注册 key", "可接入", "WebSocket 实时 AIS，适合关注某个 MMSI 或港口区域；必须放后端，且 beta 无 SLA。", "https://aisstream.io/documentation.html"],
  ["USITC HTS REST", "美国 HTS 税号/税率", "免费、无需 key", "可直接接入", "官方 HTS 数据可 JSON/CSV/XLSX 查询，美国进口税号核验优先级高。", "https://hts.usitc.gov/reststop"],
  ["UK Trade Tariff API", "英国税号/措施", "官方 API", "可直接接入", "英国商品编码、税率、VAT、配额和措施，适合目的国要求查询。", "https://api.trade-tariff.service.gov.uk"],
	  ["Trade.gov CSL API", "受限方/出口管制筛查", "开放 API/下载", "可接入", "美国 Consolidated Screening List，用于客户/供应商/收货人名称初筛；命中后仍需人工尽调。", "https://www.trade.gov/consolidated-screening-list"],
	  ["UN/LOCODE", "港口代码/港口库", "官方下载", "可离线接入", "全球港口/地点编码基础库，适合补全港口联想、港口坐标和标准名称。", "https://unlocode.unece.org/publications"],
	  ["微信公众号文章", "社媒/政策解读", "无稳定公开搜索 API", "人工关注/链接导入优先", "可接入自己公众号或人工保存的文章链接；公开爬取容易遇到登录、反爬和版权问题，不作为稳定自动源。", "https://mp.weixin.qq.com/"],
	  ["X / Twitter API", "社媒/官方动态", "通常需要开发者账号/付费档", "后续评估", "适合跟踪海关、港口、承运商和媒体账号的突发消息；低成本阶段先用官方 RSS/API 和人工核验链接。", "https://developer.x.com/"],
	  ["公开网页轻量抓取", "船期/箱货入口探测", "免费但不稳定", "已接入探测", "可探测船讯网、港航纵横、上港集团等入口；遇到登录/验证码/滑块时交给查询人手工验证。", "#shipment"],
  ["SeaRates / IQAX / Linescape", "正式船期", "多为试用/付费", "先不接", "真正全量船期通常不免费；后续如公司需要，再评估套餐和稳定性。", "https://docs.searates.com/reference/schedules/search-vessels"]
];

const incotermProfiles = {
  EXW: {
    seller: "卖方只在自己场所备货；通常不负责装车、出口清关、主运输和保险。",
    buyer: "买方负责几乎全部运输、出口/进口手续、风险和费用。",
    risk: "出口清关责任容易卡住：很多国家出口申报需要卖方配合。新手慎用。",
    action: "如果是集装箱或卖方更熟悉出口流程，优先改成 FCA。"
  },
  FCA: {
    seller: "卖方负责出口清关，并把货交给买方指定承运人或指定地点。",
    buyer: "买方负责主运输、保险、进口清关、税费和目的港/目的地后续费用。",
    risk: "比 FOB 更适合集装箱；风险通常在交给承运人时转移。",
    action: "合同里写清交货地点，例如 FCA Shanghai terminal Incoterms 2020。"
  },
  FOB: {
    seller: "卖方负责出口清关，并把货装上指定船。",
    buyer: "买方负责海运、保险、进口清关、目的港费用和进口税费。",
    risk: "风险在装上船时转移；集装箱货无法肉眼确认装船状态，争议时不如 FCA 清楚。",
    action: "集装箱业务建议评估改 FCA；若坚持 FOB，确认订舱方、截关和码头费用边界。"
  },
  CFR: {
    seller: "卖方负责出口清关并支付到目的港的海运费。",
    buyer: "买方负责保险、进口清关、目的港费用和进口税费。",
    risk: "费用到目的港，但风险仍在装上船时转移；货损争议容易被误解。",
    action: "提醒买方自行买保险，合同里写清目的港和不含目的港费用。"
  },
  CIF: {
    seller: "卖方负责出口清关、海运费，并购买最低限度运输保险到目的港。",
    buyer: "买方负责进口清关、目的港费用、进口税费和更高保险需求。",
    risk: "风险在装上船时已转移，不是到港才转移；最低保险可能不足。",
    action: "高货值或易损货物，确认保险条款、免赔额和受益人。"
  },
  DAP: {
    seller: "卖方负责运输到指定目的地，通常不负责卸货、进口清关和进口税费。",
    buyer: "买方负责进口清关、税费、许可证和目的地卸货。",
    risk: "卖方承担到指定地点前的运输风险；若买方清关慢，会产生滞港/仓储争议。",
    action: "写清具体地址、谁办进口许可、清关延误费用谁承担。"
  },
  DDP: {
    seller: "卖方负责运输、进口清关、关税、VAT/GST 和交到约定地点。",
    buyer: "买方通常只负责收货，但仍需配合提供进口资料。",
    risk: "卖方责任最大；没有当地进口商、税号或代理时很容易失败，税务风险高。",
    action: "只有确认当地 IOR、税务登记、清关代理和税费预算后再接受 DDP。"
  }
};

const certificationProfiles = [
  { market: "中国", aliases: ["china", "中国", "大陆"], items: [["无线/蓝牙", "SRRC/无线电型号核准"], ["电源/适配器", "3C 目录边界"], ["消费电子", "3C、标签、说明书和监管条件"]] },
  { market: "美国", aliases: ["us", "usa", "美国", "united states"], items: [["无线/蓝牙", "FCC Equipment Authorization"], ["消费电子", "CPSC/客户安全要求、原产地标识"], ["化学/材料", "TSCA 边界复核"]] },
  { market: "欧盟", aliases: ["eu", "欧盟", "欧洲", "germany", "france", "netherlands"], items: [["无线/蓝牙", "CE RED"], ["消费电子", "CE EMC/LVD、RoHS、REACH、WEEE"], ["电池", "EU Battery Regulation、回收标识"]] },
  { market: "英国", aliases: ["uk", "英国", "united kingdom"], items: [["无线/蓝牙", "UK Radio Equipment Regulations"], ["消费电子", "UKCA、RoHS、进口商信息"], ["电池", "电池回收责任和标签"]] },
  { market: "巴西", aliases: ["brazil", "brasil", "巴西"], items: [["无线/蓝牙", "ANATEL homologation"], ["电源/适配器", "INMETRO 强制认证边界"], ["标签", "葡语标签和当地证书持有人"]] },
  { market: "泰国", aliases: ["thailand", "thai", "泰国"], items: [["无线/蓝牙", "NBTC"], ["电源/适配器", "TISI 边界"], ["电池", "MSDS/UN38.3 和船司 DG 接受"]] },
  { market: "沙特", aliases: ["saudi", "ksa", "沙特"], items: [["消费电子", "SABER/SASO"], ["无线/蓝牙", "CST/通信设备要求"], ["标签", "阿语标签、进口商责任"]] },
  { market: "阿联酋", aliases: ["uae", "dubai", "阿联酋", "迪拜"], items: [["无线/蓝牙", "TDRA"], ["消费电子", "ECAS/客户准入要求"], ["标签", "英文/阿语标签边界"]] },
  { market: "日本", aliases: ["japan", "日本"], items: [["无线/蓝牙", "TELEC/MIC"], ["电源/适配器", "PSE"], ["标签", "日文标签和进口商责任"]] },
  { market: "印度", aliases: ["india", "印度"], items: [["无线/蓝牙", "WPC/ETA"], ["消费电子/电源", "BIS/CRS"], ["标签", "当地标签和进口商 IEC"]] },
  { market: "加拿大", aliases: ["canada", "加拿大"], items: [["无线/蓝牙", "ISED"], ["消费电子", "Health Canada 产品安全"], ["标签", "英语/法语标签可能涉及"]] },
  { market: "墨西哥", aliases: ["mexico", "墨西哥"], items: [["无线/蓝牙", "IFETEL"], ["消费电子/电源", "NOM"], ["标签", "西语商业标签"]] },
  { market: "澳大利亚", aliases: ["australia", "澳大利亚"], items: [["无线/蓝牙", "ACMA/RCM"], ["电源/适配器", "电气安全、插头和 RCM"], ["消费电子", "产品安全和标签"]] },
  { market: "南非", aliases: ["south africa", "南非"], items: [["无线/蓝牙", "ICASA"], ["电源/消费电子", "NRCS 边界"], ["进口", "SARS/ITAC 复核"]] }
];

const taxProfiles = [
  { market: "美国", aliases: ["us", "usa", "美国"], duty: 0.05, vat: 0, vatName: "无联邦 VAT", note: "重点另查 301、232、AD/CVD 和州税/客户条款。" },
  { market: "欧盟", aliases: ["eu", "欧盟", "欧洲"], duty: 0.04, vat: 0.2, vatName: "VAT", note: "不同成员国 VAT 不同；以 TARIC/Access2Markets 为准。" },
  { market: "英国", aliases: ["uk", "英国"], duty: 0.04, vat: 0.2, vatName: "VAT", note: "以 UK Trade Tariff 和 CDS 申报代码为准。" },
  { market: "巴西", aliases: ["brazil", "brasil", "巴西"], duty: 0.16, vat: 0.35, vatName: "IPI/PIS/COFINS/ICMS 粗略包", note: "巴西税费结构复杂，必须让当地进口商/报关行报价。" },
  { market: "泰国", aliases: ["thailand", "泰国"], duty: 0.1, vat: 0.07, vatName: "VAT", note: "需按泰国 HS 和是否有 FTA 优惠复核。" },
  { market: "中国", aliases: ["china", "中国", "大陆"], duty: 0, vat: 0.13, vatName: "进口增值税", note: "中国税率需按具体 HS 查询；如命中中国税则基础库，则优先用基础库税率。" },
  { market: "沙特", aliases: ["saudi", "沙特", "ksa"], duty: 0.05, vat: 0.15, vatName: "VAT", note: "另查 SABER/SASO、标签和清关代理费用。" },
  { market: "阿联酋", aliases: ["uae", "阿联酋", "迪拜"], duty: 0.05, vat: 0.05, vatName: "VAT", note: "转口、自由区和本地进口处理不同。" },
  { market: "日本", aliases: ["japan", "日本"], duty: 0.03, vat: 0.1, vatName: "消费税", note: "以日本税则和进口商申报为准。" }
];

const destinationDutyProfiles = [
  {
    market: "美国 US",
    aliases: ["us", "usa", "美国", "united states"],
    authority: "USITC HTS",
    lookup: "待 USITC HTS 10 位税号确认",
    instruction: "先用候选 HS 前 6-8 位进入 USITC，再确认 10 位 HTS、General 税率、Special 税率和 Chapter 99。",
    links: [
      ["USITC HTS", "https://hts.usitc.gov/"],
      ["USTR Section 301", "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions"],
      ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"]
    ]
  },
  {
    market: "欧盟 EU",
    aliases: ["eu", "欧盟", "欧洲", "germany", "france", "netherlands", "italy", "spain"],
    authority: "EU TARIC / Access2Markets",
    lookup: "待 TARIC / Access2Markets 确认",
    instruction: "按 CN/TARIC 10 位编码确认第三国关税、additional duties、反倾销反补贴和监管措施。",
    links: [
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"],
      ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp"]
    ]
  },
  {
    market: "英国 UK",
    aliases: ["uk", "英国", "united kingdom"],
    authority: "UK Trade Tariff",
    lookup: "待 UK Trade Tariff 确认",
    instruction: "确认 commodity code、third country duty、VAT、measure conditions 和 CDS 文件代码。",
    links: [["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/"]]
  },
  {
    market: "中国",
    aliases: ["china", "中国", "大陆", "cn"],
    authority: "中国 2026 进出口税则 / 海关税目税号查询",
    lookup: "按中国税则确认",
    instruction: "按中国 10 位商品编码确认最惠国税率、协定税率、暂定税率、监管条件和进口环节税。",
    links: [
      ["中国税则/税目税号查询", "https://online.customs.gov.cn/ocportal/mySearch/"],
      ["中国 2026 进出口税则", "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm"]
    ]
  },
  {
    market: "巴西 Brazil",
    aliases: ["brazil", "brasil", "巴西", "br"],
    authority: "Receita Federal / Siscomex / NCM",
    lookup: "待巴西 NCM / TEC 确认",
    instruction: "巴西通常需用 NCM 确认 II、IPI、PIS/COFINS、ICMS 和行政许可；让当地进口商或 despachante 报价。",
    links: [
      ["Receita Federal Classificação", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias"],
      ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br"]
    ]
  },
  {
    market: "泰国 Thailand",
    aliases: ["thailand", "thai", "泰国"],
    authority: "Thai Customs",
    lookup: "待泰国海关税则确认",
    instruction: "按泰国 HS、是否享受 FTA、进口许可证、TISI/NBTC 边界和 VAT 复核。",
    links: [["Thai Customs", "https://www.customs.go.th/"], ["Thailand NSW", "https://www.thainsw.net/"]]
  },
  {
    market: "日本 Japan",
    aliases: ["japan", "日本", "jp"],
    authority: "Japan Customs Tariff",
    lookup: "待日本税则确认",
    instruction: "按日本税则、进口消费税、PSE/TELEC 等准入要求和进口商申报资料确认。",
    links: [["Japan Customs Tariff", "https://www.customs.go.jp/english/tariff/"]]
  },
  {
    market: "加拿大 Canada",
    aliases: ["canada", "加拿大", "ca"],
    authority: "CBSA Customs Tariff",
    lookup: "待加拿大 CBSA 税则确认",
    instruction: "确认 HS、MFN/GPT/CUSMA 等税率、GST/HST、ISED 和消费品安全要求。",
    links: [["CBSA Customs Tariff", "https://www.cbsa.gc.ca/trade-commerce/tariff-tarif/menu-eng.html"]]
  },
  {
    market: "墨西哥 Mexico",
    aliases: ["mexico", "méxico", "墨西哥", "mx"],
    authority: "SNICE TIGIE / SAT",
    lookup: "待墨西哥 TIGIE 确认",
    instruction: "确认 TIGIE 税号、IGI/IVA、NOM、IFETEL 和进口商登记。",
    links: [["SNICE TIGIE", "https://www.snice.gob.mx/cs/avi/snice/tfinicio.html"], ["SAT Mexico", "https://www.sat.gob.mx/"]]
  },
  {
    market: "澳大利亚 Australia",
    aliases: ["australia", "澳大利亚", "au"],
    authority: "Australian Border Force Tariff",
    lookup: "待澳大利亚 ABF 税则确认",
    instruction: "确认 ABF 商品编码、关税/GST、进口许可、ACMA/RCM 和产品安全要求。",
    links: [["ABF Tariff", "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff"]]
  },
  {
    market: "印度 India",
    aliases: ["india", "印度", "in"],
    authority: "CBIC India",
    lookup: "待印度 CBIC 税则确认",
    instruction: "确认 BCD、SWS、IGST、BIS/WPC、进口商 IEC 和当地清关代理意见。",
    links: [["CBIC India", "https://www.cbic.gov.in/"]]
  },
  {
    market: "中东 GCC",
    aliases: ["gcc", "中东", "沙特", "阿联酋", "uae", "saudi", "ksa", "dubai"],
    authority: "ZATCA / Dubai Customs / GCC Customs",
    lookup: "待目的国海关确认",
    instruction: "按目的国确认 GCC HS、关税/VAT、SABER/TDRA/标签和进口商资料。",
    links: [["ZATCA Saudi Customs", "https://zatca.gov.sa/"], ["Dubai Customs", "https://www.dubaicustoms.gov.ae/"]]
  }
];

const extraTariffProfiles = [
  {
    market: "美国",
    aliases: ["us", "usa", "美国", "united states"],
    triggers: [/china|中国|大陆|cn/i],
    title: "美国 Section 301 对中国原产货",
    rateText: "7.5% 或 25% 额外关税",
    note: "按美国 10 位 HTS 和 Chapter 99 判断；常见消费电子可能落在 7.5% 或 25% 档，具体以 USITC HTS / USTR / CBP 为准。",
    sources: [
      ["USTR Section 301 Tariff Actions", "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions"],
      ["USITC HTS / Chapter 99", "https://hts.usitc.gov/"],
      ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"]
    ]
  },
  {
    market: "美国",
    aliases: ["us", "usa", "美国", "united states"],
    triggers: [/steel|aluminum|battery|solar|ev|origin|china|中国|钢|铝|电池|太阳能|原产/i],
    title: "美国 232 / AD-CVD / Chapter 99",
    rateText: "可能另有 10%-200%+ 不等的贸易救济税或反倾销反补贴税",
    note: "如果产品、材料或原产地敏感，需要进口商/美国报关行确认 AD/CVD、232、Section 301、Chapter 99 是否叠加。",
    sources: [
      ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"],
      ["USITC HTS", "https://hts.usitc.gov/"]
    ]
  },
  {
    market: "中国",
    aliases: ["china", "中国", "大陆"],
    triggers: [/us|usa|united states|美国|origin/i],
    title: "中国对美国原产货加征关税",
    rateText: "10% 额外关税",
    note: "国务院关税税则委员会 2025 年 11 月公告：在一年内继续暂停 24% 的对美加征关税，保留 10% 的对美加征关税税率。",
    sources: [
      ["国务院关税税则委员会 2025-11-05 公告解读", "https://gss.mof.gov.cn/gzdt/zhengcejiedu/202511/t20251105_3975759.htm"],
      ["中国 2026 进出口税则", "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm"],
      ["2026 年关税调整方案", "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251229_3980625.htm"]
    ]
  },
  {
    market: "欧盟",
    aliases: ["eu", "欧盟", "欧洲"],
    triggers: [/china|中国|battery|ev|steel|aluminum|太阳能|电池|钢|铝/i],
    title: "欧盟贸易救济/反补贴风险",
    rateText: "可能另有反倾销、反补贴或保障措施，按 TARIC additional measures 确认",
    note: "欧盟进口需用 TARIC/Access2Markets 检查 additional duties、anti-dumping、countervailing、safeguard measures。",
    sources: [
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"],
      ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp"]
    ]
  },
  {
    market: "通用",
    aliases: ["", "global", "通用"],
    triggers: [/sanction|制裁|anti.?dumping|反倾销|反补贴|safeguard|保障|301|232|额外关税|加征/i],
    title: "额外关税/贸易措施",
    rateText: "不是固定税率，需按税号、原产国、目的国和实施日期逐项确认",
    note: "普通关税只是基础；额外措施可能来自反倾销反补贴、保障措施、报复性关税、制裁或临时关税调整。",
    sources: [
      ["WTO Tariff Tracker", "https://ttd.wto.org/en/reports/tariff-actions"],
      ["Global Trade Alert", "https://www.globaltradealert.org/"]
    ]
  }
];

const usChina301PrefixRates = [
  {
    prefixes: ["851840", "854442", "481910", "481920", "392690", "732690"],
    rateText: "25% 额外关税初判",
    basis: "常见 List 3 / Chapter 99 301 档位；需按美国 10 位 HTS 确认是否仍适用或是否有排除。"
  },
  {
    prefixes: ["851762", "851830", "851821", "851822", "851829", "851810", "851890", "852791", "852719", "850760", "850440"],
    rateText: "7.5% 额外关税初判",
    basis: "常见 List 4A / Chapter 99 301 档位；需按美国 10 位 HTS 确认是否适用 7.5%、25% 或排除。"
  }
];

const chinaUsRetaliatoryPrefixRates = [
  {
    prefixes: ["851890"],
    rateText: "25% 额外关税",
    basis: "HS 85189000 命中中国对原产于美国的部分进口商品加征 25% 关税清单；需再核验是否存在排除、暂停或临时调整。",
    sources: [
      ["中国政府网：对美实施加征25%关税商品清单 PDF", "https://www.gov.cn/guowuyuan/2019-05/13/5391208/files/6d352f9e9ae6449ca6ba2c73947b6e35.pdf"],
      ["财政部关税司政策发布", "https://gss.mof.gov.cn/gzdt/zhengcefabu/"]
    ]
  }
];

function getTradeMeasureData() {
  if (typeof window !== "undefined" && window.TRADE_MEASURE_DATA) return window.TRADE_MEASURE_DATA;
  if (typeof globalThis !== "undefined" && globalThis.TRADE_MEASURE_DATA) return globalThis.TRADE_MEASURE_DATA;
  return null;
}

function formatGeneratedAt(value = "") {
  if (!value) return "未生成";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function rateNumberFromText(value = "") {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)\s*%/);
  return match ? Number(match[1]) : null;
}

function uniqueTradeMeasures(rows = []) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = `${row.rate || ""}|${row.sourceUrl || ""}|${row.measureId || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSpecificChinaUsMeasure(hs = "") {
  const data = getTradeMeasureData();
  const hs8 = compactHs(hs).slice(0, 8);
  const rows = uniqueTradeMeasures(data?.specificCodeMap?.[hs8] || []);
  if (!rows.length) {
    const fallback = matchChinaUsRetaliatoryRate(hs);
    if (!fallback) return null;
    return {
      market: "中国",
      title: "中国对美国原产货加征关税（清单命中）",
      rateText: fallback.rateText,
      note: fallback.basis,
      sources: fallback.sources,
      confidence: "中：使用本地兜底规则命中，建议以官方清单再核验",
      scope: `目的国中国 + 美国原产 + HS ${hs8 || "未填写"}`,
      evidenceCount: 1
    };
  }
  const rateTexts = Array.from(new Set(rows.map((row) => row.rate).filter(Boolean))).sort((a, b) => (rateNumberFromText(b) || 0) - (rateNumberFromText(a) || 0));
  const links = rows.map((row) => [row.sourceTitle || row.measureId || "官方对美加征清单", row.sourceUrl]).filter(([, url]) => url);
  const effective = Array.from(new Set(rows.map((row) => row.effectiveFrom).filter(Boolean))).join("、");
  return {
    market: "中国",
    title: "中国对美国原产货加征关税（具体清单命中）",
    rateText: rateTexts.join(" / ") || "清单税率待确认",
    rateForCalculation: rateTexts[0] || "",
    note: `HS ${hs8} 命中官方对美加征清单${effective ? `，清单实施日期：${effective}` : ""}。同一税号可能出现在多个公告附件中，报价前需核验排除、暂停和通关当日口径。`,
    sources: links,
    confidence: `高：命中 ${rows.length} 条官方 PDF 清单记录`,
    scope: `目的国中国 + 美国原产 + HS ${hs8}`,
    evidenceCount: rows.length,
    rawMeasures: rows
  };
}

function buildGovernmentNoticeHits(hs = "", destination = "", origin = "") {
  const data = getTradeMeasureData();
  const hs8 = compactHs(hs).slice(0, 8);
  const rows = uniqueTradeMeasures(data?.specificCodeMap?.[hs8] || []);
  if (!rows.length) return [];
  const chinaDestination = !destination || hasAlias(destination, ["china", "中国", "大陆", "cn"]);
  const usOrigin = hasAlias(origin, ["us", "usa", "united states", "美国"]);
  const originFilled = String(origin || "").trim();
  if (!chinaDestination || (originFilled && !usOrigin)) return [];
  const rateTexts = Array.from(new Set(rows.map((row) => row.rate).filter(Boolean))).sort((a, b) => (rateNumberFromText(b) || 0) - (rateNumberFromText(a) || 0));
  const effective = Array.from(new Set(rows.map((row) => row.effectiveFrom).filter(Boolean))).join("、");
  const sourceLinks = rows.map((row) => [row.sourceTitle || row.measureId || "政府公告清单", row.sourceUrl]).filter(([, url]) => url);
  const applicability = chinaDestination && usOrigin
    ? "当前条件：目的国中国 + 美国原产，清单税率应进入额外关税核算。"
    : chinaDestination && !originFilled
      ? "当前缺原产国：税号已命中政府公告；如原产美国，需要按该清单税率核算。"
      : chinaDestination
        ? "当前原产国不是美国：该对美清单通常不直接适用，但仍保留公告命中证据。"
        : "当前目的国不是中国：该中国对美清单不直接适用，但税号公告命中仍作为风险证据。";
  return [
    {
      title: "政府公告命中：中国对美国原产货加征关税清单",
      rateText: rateTexts.join(" / ") || "清单税率待确认",
      note: `HS ${hs8} 出现在已接入政府公告清单中${effective ? `，实施日期：${effective}` : ""}。${applicability}`,
      sources: sourceLinks,
      confidence: `高：命中 ${rows.length} 条政府公告/PDF 清单记录`,
      scope: `HS ${hs8}`,
      rows
    }
  ];
}

function buildGeneralChinaUsMeasure() {
  const data = getTradeMeasureData();
  const general = data?.generalUsOriginMeasure;
  if (!general) {
    return {
      ...extraTariffProfiles[2],
      confidence: "中：使用内置规则，建议核验税委会最新公告",
      scope: "目的国中国 + 美国原产"
    };
  }
  return {
    market: "中国",
    aliases: ["china", "中国", "大陆"],
    triggers: [/us|usa|united states|美国|origin/i],
    title: "中国对美国原产货加征关税（当前通用层）",
    rateText: general.rate || "10%",
    rateForCalculation: general.rate || "10%",
    note: `${general.sourceTitle || "税委会公告"}：${general.note || "保留当前对美加征关税税率。"}${general.suspendedRate ? ` 暂停税率：${general.suspendedRate}，暂停至 ${general.suspendedUntil || "公告期限"}。` : ""}`,
    sources: [[general.sourceTitle || "税委会公告", general.sourceUrl]].filter(([, url]) => url),
    confidence: "高：来自税委会当前公告；仍需按通关日期确认是否有后续公告",
    scope: general.scope || "原产于美国的进口商品",
    rawMeasure: general
  };
}

function getTradeMeasureAuditSummary(hs = "") {
  const data = getTradeMeasureData();
  const hs8 = compactHs(hs).slice(0, 8);
  const rows = uniqueTradeMeasures(data?.specificCodeMap?.[hs8] || []);
  return {
    generatedAt: data?.generatedAt || "",
    specificCodeCount: data?.audit?.specificCodeCount || 0,
    companySpecificHitCount: data?.audit?.companySpecificHitCount || 0,
    hs8,
    hsHitCount: rows.length,
    hsRates: Array.from(new Set(rows.map((row) => row.rate).filter(Boolean))).join(" / ") || "未命中具体清单",
    sourcePage: data?.sourcePage || null,
    general: data?.generalUsOriginMeasure || null
  };
}

const hsInterpretationOverrides = {
  "85189000": {
    legalName: "税目 8518 所列货品的零件",
    scope: "适用于品目 8518 项下音频设备的零件，例如传声器、扬声器、耳机/耳塞、音频扩大器、电气扩音机组等设备的专用零件。",
    boundary: "先确认货物本身是不是完整音箱、功放、耳机等成品；如果只是专用于这些设备的高音单元、低音单元、功能板、网罩、支架等，不能直接按成品税号归类。",
    caution: "裸印刷电路板、具有独立功能的电气模块、通用连接件或按材质归类的结构件可能需要另行复核。"
  },
  "85182200": {
    legalName: "多喇叭音箱",
    scope: "适用于一个箱体或组合形态内含多个扬声器、作为音箱成品进口的货品。",
    boundary: "如果申报品是音箱内部的高音单元、低音单元、分频器、功能板、网罩或支架，不应仅因出现“音箱”二字就按多喇叭音箱成品判断。",
    caution: "需确认是否带箱体、是否为完整可使用音箱、是否包含多个扬声器并作为成品销售。"
  },
  "85182100": {
    legalName: "单喇叭音箱",
    scope: "适用于装入箱体、通常可作为完整音箱使用，且只有一个扬声器单元的成品。",
    boundary: "如果只是裸扬声器、汽车扬声器、嵌入式扬声器或音箱内部单元，不能因能发声就按单喇叭音箱。",
    caution: "需确认是否带箱体、是否完整可使用、喇叭数量、额定功率、用途和是否含功放/电池/无线模块。"
  },
  "85182900": {
    legalName: "其他扬声器，通常用于未装入箱体的扬声器方向",
    scope: "适用于未装入箱体的扬声器、嵌入式扬声器、车载扬声器等方向；中国 2026 税则 8518.2900 税目名称为“其他”。",
    boundary: "如果带箱体并作为完整音箱销售，应转看 851821/851822；如果只是高音/低音单元等专用于音箱的零件，需要再判断是否落入 851890 零件方向。",
    caution: "必须确认是否有箱体、是否为完整可独立使用扬声器、尺寸/功率、用途和是否专用于某成品音箱。"
  },
  "85184000": {
    legalName: "音频扩大器",
    scope: "适用于具备音频信号放大功能、作为功放/扩大器成品或相当于成品功能的货品。",
    boundary: "功放用功能板、连接器、集成块、支架等备件不能简单按功放成品归类。",
    caution: "已装配 PCBA 需复核是否仅为专用零件，还是已经构成具有独立功能的电气设备。"
  },
  "85279100": {
    legalName: "其他收录（放）音组合机",
    scope: "公司历史样例中，音视频处理器如果具有收音机/广播接收功能，曾按 8527910000 方向预归类；需确认是否真的带收音/广播接收功能。",
    boundary: "如果只是音视频信号处理、解码或转换，无收音机功能、无功率放大和无扬声功能，通常应回到 8543709990 方向复核。",
    caution: "需要规格书、功能说明和菜单/接口资料证明是否具备收音机功能。"
  },
  "85437099": {
    legalName: "其他具有独立功能的电气设备及装置",
    tariffOriginal: "8543.7099 其他（税目 8543：本章其他税目未列名的具有独立功能的电气设备及装置）",
    scope: "公司历史样例将无功率放大及扬声功能的音视频处理器、音频协调器等归入 8543709990 方向；税则原文仍需结合 8543 税目层级核验。",
    boundary: "若具备功率放大功能，应看 851840 音频扩大器；若为完整音箱，应看 851821/851822/851829；若只是 8518 项下设备专用零件，应看 851890；若带收音机功能，应复核 852791。",
    caution: "必须用产品规格书确认主要功能、是否独立工作、是否带收音/无线/电池，以及是否已经被更具体品目列名。"
  },
  "85340090": {
    legalName: "其他印刷电路",
    scope: "适用于未装配元器件的印刷电路板等印刷电路货品。",
    boundary: "如果电路板已经贴装/焊接电子元器件，通常不能仅按裸印刷电路板判断，需要继续看是否为专用零件、独立功能模块或其他更具体品目。",
    caution: "需确认层数、是否已装配、是否含电子元器件、是否具有独立功能。"
  },
  "85312000": {
    legalName: "装有液晶装置或发光二极管的指示板",
    scope: "适用于装有 LCD、LED 等显示/指示装置的指示板、显示板或类似面板组件方向。",
    boundary: "如果货物本体是显示板/指示面板组件，应先按显示或指示功能判断；不因用于音箱、功放或其他主机就直接按主机成品或主机零件归类。",
    caution: "需确认是否为已装配显示模块、是否只是裸 LCD、是否带控制驱动功能、接口和用途。"
  }
};

const hsTariffFullTextOverrides = {
  "85182100": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.18：传声器（麦克风）及其座架；扬声器，不论是否装成音箱；耳机、耳塞机，不论是否装有传声器，由传声器及一个或多个扬声器组成的组合机；音频扩大器；电气扩音机组。",
    "子目 8518.21：单喇叭音箱。",
    "中国 8 位税号 85182100：单喇叭音箱。"
  ],
  "85182200": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.18：传声器（麦克风）及其座架；扬声器，不论是否装成音箱；耳机、耳塞机，不论是否装有传声器，由传声器及一个或多个扬声器组成的组合机；音频扩大器；电气扩音机组。",
    "子目 8518.22：多喇叭音箱。",
    "中国 8 位税号 85182200：多喇叭音箱。"
  ],
  "85182900": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.18：传声器（麦克风）及其座架；扬声器，不论是否装成音箱；耳机、耳塞机，不论是否装有传声器，由传声器及一个或多个扬声器组成的组合机；音频扩大器；电气扩音机组。",
    "子目 8518.29：其他扬声器。",
    "中国 8 位税号 85182900：其他。"
  ],
  "85183000": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.18：传声器（麦克风）及其座架；扬声器，不论是否装成音箱；耳机、耳塞机，不论是否装有传声器，由传声器及一个或多个扬声器组成的组合机；音频扩大器；电气扩音机组。",
    "子目 8518.30：耳机、耳塞机，不论是否装有传声器，以及由传声器及一个或多个扬声器组成的组合机。",
    "中国 8 位税号 85183000：耳机、耳塞机。"
  ],
  "85184000": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.18：传声器（麦克风）及其座架；扬声器，不论是否装成音箱；耳机、耳塞机，不论是否装有传声器，由传声器及一个或多个扬声器组成的组合机；音频扩大器；电气扩音机组。",
    "子目 8518.40：音频扩大器。",
    "中国 8 位税号 85184000：音频扩大器。"
  ],
  "85189000": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.18：传声器（麦克风）及其座架；扬声器，不论是否装成音箱；耳机、耳塞机，不论是否装有传声器，由传声器及一个或多个扬声器组成的组合机；音频扩大器；电气扩音机组。",
    "子目 8518.90：零件。",
    "中国 8 位税号 85189000：零件。"
  ],
  "85269200": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.26：雷达设备、无线电导航设备及无线电遥控设备。",
    "子目 8526.92：无线电遥控设备。",
    "中国 8 位税号 85269200：无线电遥控设备。"
  ],
  "85340090": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.34：印刷电路。",
    "子目 8534.00：印刷电路。",
    "中国 8 位税号 85340090：其他印刷电路。"
  ],
  "85312000": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.31：电气音响或视觉信号装置用指示板及类似装置。",
    "子目 8531.20：装有液晶装置或发光二极管的指示板。",
    "中国 8 位税号 85312000：装有液晶装置或发光二极管的指示板。"
  ],
  "85437099": [
    "第 85 章：电机、电气设备及其零件；录音机及放声机、电视图像和声音的录制及重放设备及其零件、附件。",
    "品目 85.43：本章其他税目未列名的具有独立功能的电气设备及装置。",
    "子目 8543.70：其他机器及装置。",
    "中国 8 位税号 85437099：其他。"
  ],
  "48191000": [
    "第 48 章：纸及纸板；纸浆、纸或纸板制品。",
    "品目 48.19：纸、纸板、纤维素絮纸或纤维素纤维网纸制的箱、盒、匣、袋及其他包装容器；办公室、商店或类似场所使用的纸、纸板制的卷宗盒、信件盘及类似品。",
    "子目 4819.10：瓦楞纸或纸板制的箱、盒、匣。",
    "中国 8 位税号 48191000：瓦楞纸或纸板制的箱、盒、匣。"
  ]
};

const sanctionCountryWords = [
  "iran", "伊朗", "russia", "俄罗斯", "belarus", "白俄罗斯", "north korea", "朝鲜",
  "syria", "叙利亚", "cuba", "古巴", "crimea", "克里米亚", "donetsk", "luhansk"
];

const sanctionSensitiveWords = [
  "military", "defense", "army", "navy", "air force", "police", "government tender", "dual-use",
  "军用", "军方", "国防", "警用", "政府招标", "两用", "无人机", "加密", "制裁", "实体清单", "sdn", "ofac"
];

const countryRows = [
  ["China", "3C、无线电型号核准、监管条件、申报要素", "需逐票核验"],
  ["EU", "CE、RoHS、WEEE、电池法规、标签语言", "待接规则库"],
  ["US", "FCC、TSCA、锂电池运输、原产地标识", "待接规则库"],
  ["UK", "UKCA、包装和电池要求、进口商信息", "待接规则库"],
  ["GCC", "G-Mark、无线产品许可、标签和目的港清关要求", "待接规则库"]
];

const requirementProfiles = [
  {
    market: "中国",
    aliases: ["china", "中国", "大陆", "cn", "进口中国"],
    base: ["确认商品编码、监管条件、检验检疫、关税和增值税率。", "准备品牌、型号、用途、材质、功能原理、图片和规格书。", "正式申报前由关务或报关行复核归类依据。"],
    rules: [
      ["wireless", "带蓝牙/无线功能：核验无线电型号核准、频段、发射功率和说明书。"],
      ["battery", "含锂电池：准备 MSDS、UN38.3、额定能量 Wh、包装方式和运输限制说明。"],
      ["power", "带电源适配器/插头：核验 3C、低压电器和电源规格。"],
      ["audio", "音频整机：核对是否涉及 3C 目录边界和整机/零件归类。"]
    ],
    sources: [
      ["海关总署", "http://www.customs.gov.cn/"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"],
      ["互联网+海关", "http://online.customs.gov.cn/"],
      ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/"],
      ["工业和信息化部", "https://www.miit.gov.cn/"]
    ]
  },
  {
    market: "欧盟 EU",
    aliases: ["eu", "europe", "欧盟", "欧洲", "德国", "法国", "荷兰", "意大利", "西班牙"],
    base: ["关注 CE、RoHS、REACH、WEEE、电池法规、包装法规和当地语言标签。", "进口商信息、符合性声明 DoC、技术文件和说明书需要提前确认。"],
    rules: [
      ["wireless", "无线产品通常需关注 RED 指令、频段、测试报告和 CE DoC。"],
      ["battery", "含电池产品关注欧盟电池法规、回收标识、容量信息和运输文件。"],
      ["power", "电源适配器关注 LVD/EMC/RoHS/能效标签要求。"]
    ],
    sources: [
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"],
      ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp"],
      ["EUR-Lex", "https://eur-lex.europa.eu/"],
      ["EU Safety Gate", "https://ec.europa.eu/safety-gate-alerts/"]
    ]
  },
  {
    market: "美国 US",
    aliases: ["us", "usa", "united states", "美国"],
    base: ["关注 FCC、原产地标识、TSCA、海关估价、反倾销/301 关税等。", "进口商通常需要产品说明、HTS、用途、材质、品牌型号和合规声明。"],
    rules: [
      ["wireless", "无线产品重点核验 FCC ID、测试报告和标签。"],
      ["battery", "含锂电池关注 DOT/IATA/IMDG 文件、UN38.3 和包装限制。"],
      ["power", "电源适配器关注 UL/ETL 客户要求和能效要求。"]
    ],
    sources: [
      ["USITC HTS", "https://hts.usitc.gov/"],
      ["CBP CROSS", "https://rulings.cbp.gov/"],
      ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"],
      ["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm"]
    ]
  },
  {
    market: "英国 UK",
    aliases: ["uk", "united kingdom", "英国", "英國"],
    base: ["关注 UKCA、进口商信息、包装/电池责任和英文标签。", "与欧盟类似但认证标志和责任主体需单独确认。"],
    rules: [
      ["wireless", "无线产品关注 UK Radio Equipment Regulations、测试报告和标签。"],
      ["battery", "电池产品关注回收责任、运输文件和标签。"]
    ],
    sources: [
      ["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/"],
      ["GOV.UK Import Goods", "https://www.gov.uk/import-goods-into-uk"],
      ["UK Product Safety", "https://www.gov.uk/guidance/product-safety-advice-for-businesses"]
    ]
  },
  {
    market: "中东 GCC",
    aliases: ["gcc", "中东", "沙特", "阿联酋", "uae", "saudi", "dubai"],
    base: ["关注 G-Mark、无线产品许可、阿语/英语标签、目的港清关资料和客户特殊要求。", "不同国家差异较大，出货前建议让当地进口商确认准入文件。"],
    rules: [
      ["wireless", "无线产品需核验当地电信许可和频段限制。"],
      ["battery", "含电池产品提前确认承运人和目的港 DG 接受规则。"]
    ],
    sources: [
      ["GSO Conformity", "https://www.gso.org.sa/en/conformity/conformity-tracking-system/"],
      ["SABER Saudi", "https://saber.sa/"],
      ["Dubai Trade", "https://www.dubaitrade.ae/"]
    ]
  },
  {
    market: "日本 Japan",
    aliases: ["japan", "日本", "jp"],
    base: ["关注 PSE、TELEC、RoHS/J-Moss、日文标签和进口商责任。", "客户常会要求测试报告、说明书和标签样稿。"],
    rules: [
      ["wireless", "无线产品重点核验 TELEC/MIC 认证。"],
      ["power", "电源类产品关注 PSE 标识和测试文件。"],
      ["battery", "含锂电池仍需准备运输文件和标签。"]
    ],
    sources: [
      ["Japan Customs Tariff", "https://www.customs.go.jp/english/tariff/"],
      ["METI Product Safety", "https://www.meti.go.jp/english/policy/economy/consumer/product_safety/"],
      ["MIC Radio Use", "https://www.tele.soumu.go.jp/e/index.htm"]
    ]
  },
  {
    market: "泰国 Thailand",
    aliases: ["thailand", "thai", "泰国", "林查班", "laem chabang"],
    base: ["关注泰国海关税则、进口许可证、产品标准、标签和当地进口商责任。", "消费电子和音频产品通常需要先确认 HS/税率、是否受 TISI 标准、是否涉及 NBTC 无线许可。"],
    rules: [
      ["wireless", "蓝牙/无线产品：优先核验泰国 NBTC 要求，确认型号、频段、无线模块和进口商是否已有许可。"],
      ["battery", "含锂电池：准备 MSDS、UN38.3、Wh、包装方式，海运还需确认船司/码头 DG 接受规则。"],
      ["power", "电源适配器/充电器：确认 TISI/电气安全标准、插头规格、标签和进口商要求。"],
      ["audio", "整机音频产品：准备规格书、图片、品牌型号、用途和泰文/英文标签样稿给当地进口商确认。"]
    ],
    sources: [
      ["Thai Customs", "https://www.customs.go.th/"],
      ["Thailand National Single Window", "https://www.thainsw.net/"],
      ["NBTC", "https://www.nbtc.go.th/"],
      ["TISI", "https://www.tisi.go.th/"]
    ]
  },
  {
    market: "巴西 Brazil",
    aliases: ["brazil", "brasil", "巴西", "br", "santos"],
    base: ["关注 NCM 商品编码、进口税/工业产品税/州税、当地进口商资料、Siscomex 流程和是否需要行政许可。", "蓝牙/无线产品优先确认 ANATEL；电源或受监管消费品确认 INMETRO。"],
    rules: [
      ["wireless", "无线/蓝牙：优先核验 ANATEL homologation、标签和当地证书持有人。"],
      ["battery", "含锂电池：准备 MSDS、UN38.3、Wh、包装方式，并确认海运/空运 DG 接受规则。"],
      ["power", "电源/适配器：确认 INMETRO 强制认证目录、插头和葡语标签要求。"],
      ["audio", "音频整机：准备葡语标签、规格书、图片和品牌型号给当地进口商确认。"]
    ],
    sources: [
      ["Receita Federal Classificação Fiscal", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias"],
      ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br"],
      ["ANATEL Certificação", "https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos"],
      ["INMETRO Produtos Regulados", "https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/produtos-e-servicos-regulados"]
    ]
  },
  {
    market: "南非 South Africa",
    aliases: ["south africa", "南非", "za", "durban", "cape town"],
    base: ["关注 SARS 海关税则、关税/VAT、进口商资料、估价和原产地。", "部分产品可能涉及 ITAC、NRCS 强制规范或 ICASA 无线设备许可。"],
    rules: [
      ["wireless", "无线/蓝牙：确认 ICASA 型号/设备许可和当地进口商责任。"],
      ["battery", "含锂电池：准备 MSDS、UN38.3、Wh、包装方式和 DG 接受确认。"],
      ["power", "电源/消费电子：确认 NRCS 强制规范、标签和安全文件边界。"]
    ],
    sources: [["SARS Customs", "https://www.sars.gov.za/customs-and-excise/"], ["ITAC", "https://www.itac.org.za/"], ["NRCS", "https://www.nrcs.org.za/"], ["ICASA", "https://www.icasa.org.za/"]]
  },
  {
    market: "澳大利亚 Australia",
    aliases: ["australia", "澳大利亚", "au"],
    base: ["关注 ABF 商品归类、关税/GST、进口商资料、估价和禁限管制。", "无线、适配器、电池类产品还要看 ACMA、RCM、产品安全和电气安全要求。"],
    rules: [["wireless", "无线/蓝牙：确认 ACMA/RCM、频段和标签。"], ["battery", "含电池：准备 MSDS、UN38.3 和承运人要求。"], ["power", "电源/适配器：确认电气安全、RCM、插头和当地标签。"]],
    sources: [["ABF Tariff", "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff"], ["ACMA", "https://www.acma.gov.au/"], ["Product Safety Australia", "https://www.productsafety.gov.au/"]]
  },
  {
    market: "韩国 Korea",
    aliases: ["korea", "south korea", "韩国", "kr"],
    base: ["关注韩国海关编码、关税/VAT、进口商资料和清关文件。", "消费电子常见复核点是 KC、无线/EMC、标签和电池运输文件。"],
    rules: [["wireless", "无线/蓝牙：确认 RRA/KC 无线或 EMC 要求。"], ["battery", "含锂电池：准备 MSDS、UN38.3、Wh 和承运人要求。"], ["power", "电源/适配器：确认 KC 安全和标签。"]],
    sources: [["Korea Customs", "https://www.customs.go.kr/english/main.do"], ["KATS", "https://www.kats.go.kr/en/main.do"], ["RRA Korea", "https://www.rra.go.kr/en/index.do"]]
  },
  {
    market: "越南 Vietnam",
    aliases: ["vietnam", "越南", "vn", "胡志明"],
    base: ["关注越南海关编码、进口税/VAT、进口商资料、当地清关代理意见和是否需许可证。", "无线、标签和电池文件要提前和进口商确认。"],
    rules: [["wireless", "无线/蓝牙：确认越南 MIC/当地型式认可要求。"], ["battery", "含电池：准备 MSDS、UN38.3、Wh 和承运人/DG 要求。"], ["audio", "消费电子：确认越南标签、说明书和进口商责任。"]],
    sources: [["Vietnam Customs", "https://www.customs.gov.vn/"], ["Vietnam National Single Window", "https://vnsw.gov.vn/"], ["MIC Vietnam", "https://mic.gov.vn/"]]
  },
  {
    market: "新加坡 Singapore",
    aliases: ["singapore", "新加坡", "sg"],
    base: ["关注 Singapore Customs 商品编码、GST、进口许可证边界和进口商资料。", "无线通信产品可能涉及 IMDA，消费品还需看产品安全责任。"],
    rules: [["wireless", "无线/蓝牙：确认 IMDA 设备注册或标签要求。"], ["battery", "含电池：准备 MSDS、UN38.3，并确认转运或进口 DG 限制。"], ["power", "电源/适配器：确认安全标志、插头和当地销售要求。"]],
    sources: [["Singapore Customs", "https://www.customs.gov.sg/"], ["IMDA", "https://www.imda.gov.sg/"], ["Enterprise Singapore", "https://www.enterprisesg.gov.sg/"]]
  },
  {
    market: "马来西亚 Malaysia",
    aliases: ["malaysia", "马来西亚", "my", "port klang", "巴生"],
    base: ["关注 Royal Malaysian Customs 税则、SST/进口税、进口商资料和清关代理意见。", "无线、认证和标签常见复核点是 MCMC/SIRIM。"],
    rules: [["wireless", "无线/蓝牙：确认 MCMC/SIRIM 要求和进口商责任。"], ["battery", "含电池：准备 MSDS、UN38.3，并确认码头/船司 DG 接受规则。"], ["power", "电源/适配器：确认 SIRIM、电气安全和插头标签。"]],
    sources: [["Royal Malaysian Customs", "https://www.customs.gov.my/"], ["SIRIM QAS", "https://www.sirim-qas.com.my/"], ["MCMC", "https://www.mcmc.gov.my/"]]
  },
  {
    market: "印度 India",
    aliases: ["india", "印度", "in"],
    base: ["关注 CBIC 税则、BCD/IGST、进口商 IEC、估价、原产地和当地清关代理意见。", "消费电子可能涉及 BIS、WPC/无线和标签要求。"],
    rules: [["wireless", "无线/蓝牙：确认 WPC/ETA 或当地无线许可。"], ["battery", "含电池：准备 MSDS、UN38.3、Wh 和当地 DG 要求。"], ["power", "电源/消费电子：确认 BIS/CRS、电气安全和标签。"]],
    sources: [["CBIC India", "https://www.cbic.gov.in/"], ["BIS", "https://www.bis.gov.in/"], ["WPC India", "https://dot.gov.in/spectrum-management/2457"]]
  },
  {
    market: "加拿大 Canada",
    aliases: ["canada", "加拿大", "ca", "vancouver"],
    base: ["关注 CBSA Customs Tariff、GST/HST、估价、原产地、进口商资料和是否涉及管制品。", "无线设备通常需要 ISED 合规，消费品还要看安全、标签和客户要求。"],
    rules: [["wireless", "无线/蓝牙：确认 ISED 认证、IC ID、说明书和标签。"], ["battery", "含电池：准备 MSDS、UN38.3、Wh 和承运人限制说明。"]],
    sources: [["CBSA Customs Tariff", "https://www.cbsa.gc.ca/trade-commerce/tariff-tarif/menu-eng.html"], ["ISED Canada", "https://ised-isde.canada.ca/"], ["Health Canada Product Safety", "https://www.canada.ca/en/health-canada/services/consumer-product-safety.html"]]
  },
  {
    market: "墨西哥 Mexico",
    aliases: ["mexico", "méxico", "墨西哥", "mx"],
    base: ["关注 TIGIE/HS 编码、关税/IVA、进口商登记、海关代理和是否涉及 NOM 标准。", "电子和无线产品要提前确认 NOM、IFETEL 和标签要求。"],
    rules: [["wireless", "无线/蓝牙：确认 IFETEL 认证、频段和标签。"], ["battery", "含电池：准备 MSDS、UN38.3 和运输限制说明。"], ["power", "电源/消费电子：确认 NOM 安全、能效或商业标签要求。"]],
    sources: [["SNICE TIGIE", "https://www.snice.gob.mx/cs/avi/snice/tfinicio.html"], ["SAT Mexico", "https://www.sat.gob.mx/"], ["IFETEL", "https://www.ift.org.mx/"]]
  },
  {
    market: "印度尼西亚 Indonesia",
    aliases: ["indonesia", "印尼", "印度尼西亚", "id", "jakarta"],
    base: ["关注 BTKI/HS 编码、进口许可证/API、税费、当地进口商资质和清关代理意见。", "无线、电源和消费电子可能涉及 SDPPI、SNI 或当地标签要求。"],
    rules: [["wireless", "无线/蓝牙：确认 SDPPI 认证和当地证书持有人。"], ["battery", "含电池：准备 MSDS、UN38.3，并确认船司/码头 DG 接受规则。"], ["power", "电源/消费电子：确认 SNI 或当地安全标准边界。"]],
    sources: [["Indonesia Customs DGCE", "https://www.beacukai.go.id/"], ["Indonesia National Single Window", "https://www.insw.go.id/"], ["SDPPI", "https://sertifikasi.postel.go.id/"]]
  },
  {
    market: "菲律宾 Philippines",
    aliases: ["philippines", "菲律宾", "ph", "manila"],
    base: ["关注 Tariff Commission/BOC 编码、关税/VAT、进口商资料和是否需要许可。", "无线设备通常需要 NTC，消费电子还应确认当地产品标准和标签。"],
    rules: [["wireless", "无线/蓝牙：确认 NTC 型式认可或相关许可。"], ["battery", "含电池：准备 MSDS、UN38.3 和承运人限制说明。"]],
    sources: [["Philippines Tariff Commission", "https://tariffcommission.gov.ph/"], ["Bureau of Customs", "https://customs.gov.ph/"], ["NTC Philippines", "https://ntc.gov.ph/"]]
  },
  {
    market: "土耳其 Turkey",
    aliases: ["turkey", "turkiye", "türkiye", "土耳其", "tr"],
    base: ["关注土耳其税则、关税/VAT、进口商资料、CE/产品安全边界和市场监管。", "无线产品要关注 BTK，电池和电子产品要确认标签、回收和清关资料。"],
    rules: [["wireless", "无线/蓝牙：确认 BTK/无线设备要求。"], ["battery", "含电池：准备 MSDS、UN38.3、Wh 和运输限制说明。"], ["audio", "消费电子：关注 CE、RoHS、当地语言标签和进口商责任。"]],
    sources: [["Turkey Trade Ministry", "https://ticaret.gov.tr/"], ["Turkey Tariff Search", "https://uygulama.gtb.gov.tr/Tara/"], ["BTK Turkey", "https://www.btk.gov.tr/"]]
  },
  {
    market: "阿联酋 UAE",
    aliases: ["uae", "united arab emirates", "阿联酋", "迪拜", "dubai", "jebel ali"],
    base: ["关注 GCC HS/关税、进口商资料、Dubai Trade/海关流程、阿语/英语标签和是否涉及 TDRA/产品合规。", "Jebel Ali 转运场景还要确认二程和危险品要求。"],
    rules: [["wireless", "无线/蓝牙：确认 TDRA 型式认可和当地进口商责任。"], ["battery", "含电池：准备 MSDS、UN38.3，并确认转运港/船司 DG 接受规则。"]],
    sources: [["Dubai Customs", "https://www.dubaicustoms.gov.ae/"], ["Dubai Trade", "https://www.dubaitrade.ae/"], ["TDRA UAE", "https://tdra.gov.ae/"]]
  },
  {
    market: "沙特 Saudi Arabia",
    aliases: ["saudi", "saudi arabia", "沙特", "ksa", "jeddah", "dammam"],
    base: ["关注 HS/关税、SABER/SASO 合格评定、进口商资料、阿语标签和产品证书。", "消费电子、无线和电源类产品建议出货前让当地进口商确认证书边界。"],
    rules: [["wireless", "无线/蓝牙：确认 CST/通信设备要求。"], ["battery", "含电池：准备 MSDS、UN38.3 和 DG 接受确认。"], ["power", "电源/消费电子：确认 SABER、SASO、能效或插头要求。"]],
    sources: [["SABER Saudi", "https://saber.sa/"], ["ZATCA Saudi Customs", "https://zatca.gov.sa/"], ["SASO", "https://www.saso.gov.sa/"]]
  }
];

const localPolicyKnowledgeRules = [
  {
    id: "china-speaker-power-output",
    title: "中国：带对外充电功能的音箱要增加移动电源功能边界判断",
    category: "中国/CCC/移动电源",
    sourceType: "本地规则库",
    domain: "samr.gov.cn / cnca.gov.cn",
    url: "https://www.cnca.gov.cn/",
    aliases: ["音箱", "speaker", "bluetooth speaker", "蓝牙音箱", "soundbar", "移动电源", "充电宝", "对外充电", "给手机充电", "usb输出", "usb output", "power bank"],
    conclusion: "如果音箱内置电池且 USB-A/USB-C 等接口可以给手机、耳机或其他外部设备供电，政策判断不能只写“普通蓝牙音箱”。应增加“移动电源/便携式储能输出功能”边界判断；没有对外供电能力的蓝牙音箱，则重点仍是音视频设备、无线、锂电池运输和标签资料。",
    changes: [
      "移动电源、便携式储能输出类产品已纳入中国 CCC 强制认证管理；中国境内生产、销售、进口时要确认 CCC 证书/标志和适用标准。",
      "2024-08-01 起，移动电源等产品进入强制认证实施节点；缺 CCC 的移动电源功能产品在中国销售/进口存在放行和市场监管风险。",
      "GB 31241-2022 是锂离子电池和电池组安全常用依据；移动电源安全新国标 GB 47372-2026 已发布，实施节点按新标准和认证机构安排跟进。",
      "是否命中移动电源边界，关键看“是否储能并对外输出给其他电子设备供电”，不是只看产品名称叫音箱还是充电宝。"
    ],
    materials: [
      "产品规格书：写明是否有 USB/Type-C 对外输出、输出电压/电流/功率、快充协议。",
      "电池资料：电芯/电池组型号、容量 mAh、Wh、生产商、BMS/保护板说明。",
      "认证资料：CCC 证书/标志使用信息；若主张不适用，准备不适用理由和产品功能说明。",
      "运输资料：MSDS/SDS、UN38.3 Test Summary、运输条件鉴定书、包装照片、外箱锂电池标签。",
      "报关资料：真实品名、功能说明、图片、用途、品牌型号、接口照片、是否可对外供电的说明。"
    ],
    action: "音箱产品先问两个问题：1. 是否内置锂电池；2. 是否可以给外部设备充电。只要第二个答案是“是”，报价和出货资料里必须加入移动电源/CCC/电池安全资料清单。",
    links: [
      ["国家认监委 CNCA", "https://www.cnca.gov.cn/"],
      ["市场监管总局 SAMR", "https://www.samr.gov.cn/"],
      ["中国海关总署", "http://www.customs.gov.cn/"]
    ]
  },
  {
    id: "audio-wireless-battery-core",
    title: "音频类产品：无线、锂电池、标签和申报要素固定检查",
    category: "消费电子/音频",
    sourceType: "本地规则库",
    domain: "logismaster.local",
    url: "https://www.cnca.gov.cn/",
    aliases: ["音箱", "speaker", "耳机", "headphone", "earbuds", "soundbar", "蓝牙", "bluetooth", "无线"],
    conclusion: "音箱/耳机类产品的政策结论应先判断四件事：HS 归类是否为整机或零件；是否有蓝牙/Wi-Fi 等无线发射；是否含锂电池；标签/说明书是否满足目的国要求。",
    changes: [
      "无线功能会触发目的国无线认证或型号核准，例如中国 SRRC、美国 FCC、欧盟 RED、巴西 ANATEL、泰国 NBTC。",
      "含锂电池会影响运输资料和承运限制，空运/快件尤其关注 UN38.3、MSDS、PI965/966/967 和 SOC。",
      "整机音箱、喇叭单元、音频功放、零件板卡的 HS 边界不同，不能只按中文品名粗分。"
    ],
    materials: [
      "规格书、图片、品牌型号、用途、工作原理、喇叭数量/功率、是否带功放。",
      "无线资料：蓝牙/Wi-Fi 模块、频段、功率、FCC/CE/SRRC/ANATEL/NBTC 等证书。",
      "电池资料：Wh、MSDS、UN38.3、运输鉴定、包装方式。",
      "标签资料：产品标签、警示语、进口商信息、说明书语言、回收/环保标识。"
    ],
    action: "先把产品拆成“音频整机/零件 + 无线 + 电池 + 电源/充电功能”四个维度，再输出材料清单。",
    links: [
      ["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm"],
      ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"],
      ["IATA Lithium Batteries", "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/"]
    ]
  }
];

function matchLocalPolicyKnowledge(filters = {}) {
  const haystack = normalize([filters.exportCountry, filters.importCountry, filters.product, filters.direction].join(" "));
  if (!haystack) return [];
  return localPolicyKnowledgeRules.filter((rule) => rule.aliases.some((word) => haystack.includes(normalize(word))));
}

const state = {
  cases: loadCases(),
  lastResult: null,
  issues: loadIssues(),
  failures: loadFailureEvents(),
  feedbacks: loadFeedbacks(),
  vesselAlerts: loadVesselAlerts(),
  history: loadHistory()
};

const vesselMapState = {
  map: null,
  marker: null,
  tileLayer: null
};

const $ = (id) => document.getElementById(id);
const ACCESS_AUTH_ENDPOINT = "/.netlify/functions/access-auth";
let accessGateInitialized = false;

function markAccessReady() {
  document.body.classList.remove("auth-pending");
  document.body.classList.add("auth-ready");
}

function showQueryOverlay(title = "正在查询", text = "正在读取公开来源并整理成中文结论。", label = "Live Query") {
  const overlay = $("queryOverlay");
  if (!overlay) return;
  $("queryOverlayLabel").textContent = label;
  $("queryOverlayTitle").textContent = title;
  $("queryOverlayText").textContent = text;
  overlay.hidden = false;
}

function hideQueryOverlay() {
  const overlay = $("queryOverlay");
  if (overlay) overlay.hidden = true;
}

function dedupeSourceRows(rows = []) {
  const seen = new Set();
  return rows.filter((row) => {
    const url = String(row?.[1] || "").trim().toLowerCase().replace(/\/$/, "");
    const title = String(row?.[0] || "").trim().toLowerCase();
    const key = url || title;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function initAccessGate() {
  if (accessGateInitialized) return;
  accessGateInitialized = true;
  const gate = $("accessGate");
  const input = $("accessCodeInput");
  const error = $("accessError");
  const loginButton = $("openLoginDialog");
  const logoutButton = $("logoutAccess");
  const unlockButton = $("unlockAccess");
  const setAuthState = (granted = false) => {
    document.body.classList.toggle("is-authenticated", granted);
    document.body.classList.toggle("is-public-home", !granted);
    if (loginButton) loginButton.textContent = "登录";
    if (logoutButton) logoutButton.hidden = !granted;
    if (granted) sessionStorage.setItem("caAccessGranted", "1");
    else sessionStorage.removeItem("caAccessGranted");
  };
  const openLogin = (message = "") => {
    if (error) error.textContent = message || "";
    if (input) input.value = "";
    gate?.classList.remove("hidden");
    window.setTimeout(() => input?.focus(), 30);
  };
  const closeLogin = () => {
    gate?.classList.add("hidden");
    if (input) input.value = "";
    if (error) error.textContent = "";
  };
  const syncServerSession = async () => {
    try {
      const response = await fetch(ACCESS_AUTH_ENDPOINT, { credentials: "same-origin" });
      const data = await response.json();
      if (data.authenticated) {
        setAuthState(true);
        return true;
      }
      setAuthState(false);
      return false;
    } catch {
      if (!sessionStorage.getItem("caAccessGranted")) setAuthState(false);
      return false;
    }
  };
  const unlock = async () => {
    const code = input?.value.trim() || "";
    if (!code) {
      if (error) error.textContent = "请输入访问码。";
      return;
    }
    if (unlockButton) unlockButton.disabled = true;
    if (error) error.textContent = "正在校验访问码...";
    try {
      const response = await fetch(ACCESS_AUTH_ENDPOINT, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      if (response.ok && data.authenticated) {
        setAuthState(true);
        closeLogin();
        return;
      }
      if (error) error.textContent = data.message || "访问码不正确，请确认后重试。";
    } catch {
      if (error) error.textContent = "暂时无法连接访问校验服务，请稍后重试。";
    } finally {
      if (unlockButton) unlockButton.disabled = false;
    }
  };

  if (sessionStorage.getItem("caAccessGranted") === "1") {
    setAuthState(true);
  } else {
    setAuthState(false);
    gate?.classList.add("hidden");
    if (location.hash && location.hash !== "#dashboard") {
      history.replaceState(null, "", "#dashboard");
    }
  }
  syncServerSession();
  loginButton?.addEventListener("click", () => openLogin());
  logoutButton?.addEventListener("click", async () => {
    try {
      await fetch(ACCESS_AUTH_ENDPOINT, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" })
      });
    } catch {
      // Local browser state is still cleared even if the server logout request fails.
    }
    setAuthState(false);
    closeLogin();
    history.replaceState(null, "", "#dashboard");
    if (typeof activateWorkspaceModule === "function") activateWorkspaceModule("dashboard", false);
  });
  document.querySelectorAll("[data-close-login]").forEach((button) => {
    button.addEventListener("click", closeLogin);
  });
  unlockButton?.addEventListener("click", unlock);
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlock();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLogin();
  });
  window.showLoginRequired = () => openLogin("请先登录后使用查询功能；如没有访问码，请联系平台管理员。");
}

function isAccessGranted() {
  return sessionStorage.getItem("caAccessGranted") === "1";
}

function requireAccess(message = "请先登录后使用查询功能；如没有访问码，请联系平台管理员。") {
  if (isAccessGranted()) return true;
  if (typeof window.showLoginRequired === "function") window.showLoginRequired(message);
  return false;
}

function loadCases() {
  const desktopCases = Array.isArray(window.COMPANY_HS_CASES) ? window.COMPANY_HS_CASES : [];
  const tariffCases = buildChinaTariffCases();
  const stored = localStorage.getItem("hsCases");
  if (!stored) return mergeCases(desktopCases, tariffCases, defaultCases);
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? mergeCases(parsed, desktopCases, tariffCases, defaultCases) : mergeCases(desktopCases, tariffCases, defaultCases);
  } catch {
    return mergeCases(desktopCases, tariffCases, defaultCases);
  }
}

function buildChinaTariffCases() {
  if (!Array.isArray(window.CHINA_TARIFF_2026)) return [];
  return window.CHINA_TARIFF_2026.map((row) => ({
    code: row.hs,
    name: row.name,
    regulation: "中国2026进出口税则基础库：正式申报仍需结合海关税目税号查询、监管条件和关务复核。",
    lastUsed: "中国2026税则",
    source: row.sourceTitle || "财政部：中华人民共和国进出口税则（2026）",
    notes: `最惠国税率：${row.mfnRate || "待确认"}；暂定税率：${row.provisionalRate || "-"}；普通税率：${row.ordinaryRate || "待确认"}。${row.effectiveNote || ""}`,
    keywords: row.keywords || `${row.hs},${row.codeDisplay || ""},${row.name || ""}`,
    customsTax: getAppliedChinaRate(row).rate,
    ordinaryTax: row.ordinaryRate,
    sourceUrl: row.sourceUrl,
    verifyUrl: row.verifyUrl
  }));
}

function saveCases() {
  localStorage.setItem("hsCases", JSON.stringify(state.cases));
}

function loadIssues() {
  try {
    const parsed = JSON.parse(localStorage.getItem("issueLog") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveIssues() {
  localStorage.setItem("issueLog", JSON.stringify(state.issues));
}

function loadFailureEvents() {
  try {
    const parsed = JSON.parse(localStorage.getItem("queryFailureLog") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveFailureEvents() {
  localStorage.setItem("queryFailureLog", JSON.stringify(state.failures.slice(0, 80)));
}

function loadFeedbacks() {
  try {
    const parsed = JSON.parse(localStorage.getItem("userFeedbackLog") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveFeedbacks() {
  localStorage.setItem("userFeedbackLog", JSON.stringify(state.feedbacks.slice(0, 100)));
}

function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem("queryHistory") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveHistory() {
  localStorage.setItem("queryHistory", JSON.stringify(state.history.slice(0, 100)));
}

function addHistory(type, query, result) {
  return;
}

function ownerForFailure(module = "", reason = "") {
  const text = normalize(`${module} ${reason}`);
  if (/hs|税号|归类|tariff|关税|3c/.test(text)) return "关务";
  if (/customs|manifest|箱货|放行|清关|舱单/.test(text)) return "物流 / 关务";
  if (/air|空运|快件|dhl|ups|fedex|sf/.test(text)) return "物流 / 货代";
  if (/shipment|vessel|船期|船位|eta/.test(text)) return "物流 / 计划";
  if (/policy|政策|趋势/.test(text)) return "关务 / 合规";
  return "业务负责人";
}

function priorityForFailure(reason = "") {
  const text = normalize(reason);
  if (/customs|clearance|放行|查验|扣留|held|exception|delay|验证码|登录|失败|不可提|not released/.test(text)) return "High";
  if (/未取得|未返回|not exposed|status_not|stale|过期|pending/.test(text)) return "Medium";
  return "Low";
}

function actionForFailure(module = "", reason = "") {
  const text = normalize(`${module} ${reason}`);
  if (/air|空运|快件|dhl|ups|fedex|sf/.test(text)) return "打开承运商官网核验状态；如有清关延误，找快递客服/货代/收件人确认缺少文件。";
  if (/customs|manifest|箱货|放行/.test(text)) return "打开上港/港航/船司官网核验；如显示查验、未放行或不可提，找关务/货代确认。";
  if (/shipment|vessel|船期|船位/.test(text)) return "打开 Shipfinder/船司官网核验船位和 ETA；补 MMSI/IMO、船司、提单号或箱号。";
  if (/policy|趋势|政策/.test(text)) return "回到官方入口核验原文；必要时让关务/合规确认实施日期和产品范围。";
  return "补充资料后人工复核。";
}

function recordQueryFailure({ module = "", query = "", reason = "", level = "", owner = "", next = "", links = [] } = {}) {
  const cleanReason = String(reason || "自动查询未取得可用结果。").slice(0, 240);
  const event = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    module: module || "查询失败",
    query: String(query || "").slice(0, 160),
    reason: cleanReason,
    level: level || priorityForFailure(cleanReason),
    owner: owner || ownerForFailure(module, cleanReason),
    next: next || actionForFailure(module, cleanReason),
    links: (links || []).slice(0, 4),
    status: "Open",
    date: new Date().toISOString()
  };
  const duplicate = state.failures.find((item) => item.module === event.module && item.query === event.query && item.reason === event.reason);
  if (duplicate) {
    duplicate.date = event.date;
    duplicate.status = "Open";
  } else {
    state.failures.unshift(event);
  }
  saveFailureEvents();
  renderFailureBoard();
  return event;
}

function loadVesselAlerts() {
  try {
    const parsed = JSON.parse(localStorage.getItem("vesselAlertRules") || "[]");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return [];
  }
  return [];
}

function saveVesselAlerts() {
  localStorage.setItem("vesselAlertRules", JSON.stringify(state.vesselAlerts));
}

function mergeCases(...lists) {
  const byKey = new Map();
  lists.flat().forEach((item) => {
    const key = `${item.code || ""}|${item.name || ""}`;
    if (!item.code || !item.name) return;
    if (byKey.has(key)) {
      const existing = byKey.get(key);
      byKey.set(key, {
        ...existing,
        keywords: [existing.keywords, item.keywords].filter(Boolean).join(","),
        notes: [existing.notes, item.notes].filter(Boolean).join("；"),
        regulation: existing.regulation || item.regulation,
        source: [existing.source, item.source].filter(Boolean).join(" / "),
        exampleCount: Math.max(Number(existing.exampleCount || 0), Number(item.exampleCount || 0)),
        sourceSheets: Array.from(new Set([...(existing.sourceSheets || []), ...(item.sourceSheets || [])])).slice(0, 10),
        classificationHint: existing.classificationHint || item.classificationHint,
        role: existing.role || item.role
      });
      return;
    }
    byKey.set(key, item);
  });
  return Array.from(byKey.values());
}

function normalize(text) {
  return String(text || "").trim().toLowerCase();
}

function splitKeywords(text) {
  return normalize(text)
    .split(/[,，、\s/|]+/)
    .map((item) => item.trim())
    .filter((item) => {
      if (!item) return false;
      const compact = item.replace(/[^\p{L}\p{N}]/gu, "");
      if (!compact) return false;
      if (/^\d+(?:\.\d+)?$/.test(compact) && compact.length < 6) return false;
      if (compact.length < 2) return false;
      if (/^(no|na|n|a|the|and|or|of|for|with|无|有|个|只|项|类)$/i.test(compact)) return false;
      return true;
    });
}

function hasSpeakerWord(text = "") {
  return /扬声器|喇叭|speaker|loudspeaker/i.test(text) && !/耳机|headphone|earphone|headset/i.test(text);
}

function hasSpeakerEnclosureSignal(text = "") {
  return /音箱|箱体|有箱体|带箱体|装入箱体|完整音箱|组合音箱|多喇叭音箱|单喇叭音箱|soundbar|speaker\s*(box|cabinet|system|with\s+enclosure)|with\s+enclosure|enclosure|cabinet/i.test(text);
}

function hasSpeakerNoEnclosureSignal(text = "") {
  return /无箱体|不带箱体|未装入箱体|裸扬声器|裸喇叭|嵌入式扬声器|汽车扬声器|车载扬声器|without\s+enclosure|no\s+enclosure|speaker\s*only|loudspeaker\s*without\s*enclosure/i.test(text);
}

function hasSpeakerUnitSignal(text = "") {
  return /(高音|低音|中音|全频|喇叭|扬声器|发声|驱动)\s*(单元|组件|模组)|speaker\s*driver|tweeter|woofer|midrange|driver\s*unit/i.test(text);
}

function hasAudioProcessorIntent(text = "") {
  const value = normalize(text);
  const processorSignal = /音视频处理器|音频处理器|音频协调器|前级处理器|解码处理器|av\s*processor|audio\s*processor|sound\s*processor|digital\s*signal\s*processor|\bdsp\b|\bdac\b/i.test(value);
  if (/遥控器|遥控|remote|控制器|controller/i.test(value)) return false;
  if (!processorSignal && /功能板|电路板|线路板|pcba|pcb|零件|配件|维修|备件|part|spare|board/i.test(value)) return false;
  return processorSignal;
}

function hasDisplayPanelIntent(text = "") {
  return /lcd|液晶|显示板|显示屏|显示面板|指示板|指示面板|indicator\s*panel|display\s*(panel|module|screen)|lcd\s*(display|module|panel)/i.test(normalize(text));
}

function hasPositiveRadioSignal(text = "") {
  const value = normalize(text);
  if (/是否.{0,8}(收音|广播|radio|fm|am).{0,6}(否|无|不|no|none)|(?:无|不带|没有|未带|不支持).{0,8}(收音|广播接收|radio|fm|am)|(收音|广播|radio|fm|am)(?:功能)?[:：]?(否|无|不支持|no|none)/i.test(value)) {
    return false;
  }
  return /(?:带|有|具有|内置|支持|含).{0,8}(收音|广播接收|radio|fm|am)|收音机功能|广播接收功能|radio\s*receiver|fm\/am/i.test(value);
}

function hasExplicitHeadphonePartIntent(text = "") {
  const value = normalize(text);
  return /耳机(?:用|专用|维修|替换|售后)?(?:高音|低音|中音|全频|喇叭|扬声器|发声|驱动|功能板|电路板|线路板|控制板|主板|板卡|pcba|pcb|零件|配件|部件|组件|模块|单元)|(?:高音|低音|中音|全频|喇叭|扬声器|发声|驱动|功能板|电路板|线路板|控制板|主板|板卡|pcba|pcb|零件|配件|部件|组件|模块|单元).{0,8}耳机|(?:用于|适用于|专用于|配套|维修|替换|更换).{0,16}耳机|for\s+(?:bluetooth\s+)?(?:headphone|headset|earbud|earphone)|(?:headphone|headset|earbud|earphone)\s+(?:part|spare|driver|speaker|pcba|pcb|board|module|component)/i.test(value);
}

function hasHeadphoneContext(text = "") {
  return /耳机|耳塞|headphone|headset|earbud|earphone|tws/i.test(normalize(text));
}

function hasStandaloneChargingCaseIntent(text = "") {
  const value = normalize(text);
  if (!/(充电盒|charging case)/i.test(value)) return false;
  if (/(单独|独立|维修|替换|更换|配件|备件|零件).{0,10}(充电盒|charging case)|(充电盒|charging case).{0,10}(单独|独立|维修|替换|更换|配件|备件|零件|only|spare|replacement)/i.test(value)) return true;
  return !hasHeadphoneContext(value);
}

function getCargoShape(text = "") {
  const value = normalize(text);
  const usedFor = /(?:用于|适用于|专用于|配套|维修|替换|更换|for\s+|use\s+for)|(?:音箱|扬声器|喇叭|功放|扩大器|耳机|麦克风|speaker|loudspeaker|amplifier|headphone|microphone)\s*用/i.test(value);
  const audioHostSignal = /音箱|扬声器|喇叭|功放|扩大器|耳机|麦克风|speaker|loudspeaker|amplifier|headphone|microphone/i.test(value);
  const headphoneFinishedSignal = /耳机|耳塞|headphone|headset|earbud|tws/i.test(value);
	  const explicitHeadphonePartSignal = hasExplicitHeadphonePartIntent(value);
	  if (headphoneFinishedSignal && !explicitHeadphonePartSignal) {
	    return {
      type: "finished",
      label: "耳机成品/套装",
	      reason: "输入指向耳机成品；材料里出现喇叭单元、电路板或电池时通常只是内部构成，不能因此直接按零件归类。"
	    };
	  }
	  if (hasAudioProcessorIntent(value)) {
	    return {
	      type: "independent-function",
	      label: "独立音频/音视频处理设备",
	      reason: "输入指向音视频信号处理、解码、转换或音质调谐设备；若无功率放大及扬声功能，优先按 8543709990 独立电气功能方向核验。若带收音机功能，则需复核 852791 方向。"
	    };
	  }
  if (hasDisplayPanelIntent(value)) {
    return {
      type: "display-panel",
      label: "显示板/指示面板组件",
      reason: "输入指向 LCD、显示板或指示面板组件；应先按显示/指示功能自身判断，不能因为用于音箱就直接落入音箱成品或 8518 音频零件。"
    };
  }
  const explicitSpeakerPartSignal = /高音|低音|中音|全频|tweeter|woofer|midrange|专用于|适用于|维修|备件|零件|配件|spare|replacement/i.test(value);
  if (hasSpeakerNoEnclosureSignal(value) && !explicitSpeakerPartSignal) {
    return {
      type: "speaker-no-enclosure",
      label: "扬声器/无箱体方向",
      reason: "输入明确出现无箱体、嵌入式或车载扬声器信号；优先按 8518290000 方向核验，不按 851821/851822 音箱成品。"
    };
  }
	  if (hasSpeakerUnitSignal(value) && (usedFor || audioHostSignal)) {
	    return {
      type: "speaker-part",
      label: "扬声器/音箱专用零件",
      reason: "出现高音单元、低音单元、扬声器单元或 driver/tweeter/woofer 信号，且语境指向音箱/扬声器用途；先按 8518 零件逻辑判断，不能按音箱成品。"
    };
  }
  if (hasSpeakerWord(value) && !hasSpeakerEnclosureSignal(value) && !usedFor) {
    return {
      type: "speaker-no-enclosure",
      label: "扬声器/无箱体方向",
      reason: "只写扬声器/喇叭时，不等于多喇叭音箱；必须先确认是否有箱体。未说明箱体时，优先按 8518290000 无箱体扬声器方向初筛。"
    };
  }
  if (hasSpeakerNoEnclosureSignal(value)) {
    return {
      type: "speaker-no-enclosure",
      label: "扬声器/无箱体方向",
      reason: "输入明确出现无箱体、嵌入式或车载扬声器信号；优先按 8518290000 方向核验，不按 851821/851822 音箱成品。"
    };
  }
  if (/遥控器|遥控|remote\s*control|remote controller|controller|收纳盒|保护盒/.test(value) || hasStandaloneChargingCaseIntent(value)) {
    return {
      type: "accessory",
      label: "附件/独立功能件",
      reason: "出现“遥控器/控制器/充电盒”等词，先按附件、独立功能件或电池部件方向判断，不能直接按对应成品归类。"
    };
  }
  if (/电源适配器|充电器|电源供应器|power adapter|charger|power supply|ac\s*dc/.test(value)) {
    return {
      type: "power-supply",
      label: "电源/适配器",
      reason: "出现电源适配器、充电器或电源供应器信号，按电源转换设备自身功能判断，并同步核验 3C 边界。"
    };
  }
  if (/锂电池|电池组|电芯|battery|li-ion|lithium|power bank|充电宝/.test(value) && !/耳机|音箱|设备|整机|contained|装在设备|随设备/.test(value)) {
    return {
      type: "battery",
      label: "电池/电池组",
      reason: "货物本身更像电池或电池组，优先按电池税号和危险品运输逻辑判断；若只是内置电池，需要回到整机税号。"
    };
  }
  if (/裸板|裸印刷电路板|未装配(?:的)?(?:印刷)?电路板|空白(?:印刷)?电路板|bare\s*pcb|pcb\s*blank|printed circuit board\s*blank/.test(value)) {
    return {
      type: "bare-pcb",
      label: "裸 PCB",
      reason: "出现裸板/未装配 PCB 信号，优先核验印刷电路板方向，而不是整机或普通零件。"
    };
  }
  if (/功能板|电路板|线路板|控制板|主板|板卡|板件|pcba|pcb assembly|assembled pcb|board/.test(value)) {
    return {
      type: usedFor ? "pcba-part" : "board",
      label: usedFor ? "专用 PCBA/功能板" : "板件/模块",
      reason: "出现功能板/电路板/PCBA 信号，先区分已装配功能板、裸 PCB、独立功能模块，再判断税号。"
    };
  }
  if (/线缆|连接线|电缆|cable|带接头|connector|接插件|端子/.test(value)) {
    return {
      type: "cable",
      label: "线缆/连接件",
      reason: "出现线缆/连接件信号，优先按连接线、接插件或对应专用零件方向核验。"
    };
  }
  if (/包装盒|彩盒|纸箱|瓦楞|carton|paper\s*box|packaging/.test(value)) {
    return {
      type: "packaging",
      label: "包装材料",
      reason: "出现纸箱/彩盒/包装信号，通常不按里面的产品成品归类。"
    };
  }
  if (/网罩|支架|脚架|脚垫|外壳|面板|旋钮|按钮|保护套|保护壳|grille|stand|bracket|housing|cover|knob/.test(value)) {
    return {
      type: "mechanical-part",
      label: "结构件/外观件",
      reason: "出现支架、网罩、外壳、脚垫等信号，优先按零件/材质/用途复核，不能直接按整机。"
    };
  }
  if (/备件|配件|零件|部件|维修件|替换件|组件|模块|\bspare\b|\bparts?\b|accessor/.test(value) || /(?:用于|适用于|专用于|for\s+).*(机|器|音箱|功放|耳机|speaker|amplifier|headphone)/i.test(value)) {
    return {
      type: "part",
      label: "备件/零部件",
      reason: "出现“用于/适用于/备件/配件/零件”等信号，先按零部件逻辑判断，再看是否有专用税号。"
    };
  }
  return {
    type: "finished",
    label: "成品/整机",
    reason: "未发现明显备件、附件或包装信号，暂按成品/整机方向初筛。"
  };
}

function hasPartIntent(text = "") {
  const shape = getCargoShape(text).type;
  return shape !== "finished" && shape !== "speaker-no-enclosure";
}

function hasBoardIntent(text = "") {
  const value = normalize(text);
  if (hasHeadphoneContext(value) && !hasExplicitHeadphonePartIntent(value)) {
    const explicitBoardPart = /功能板|控制板|主板|板卡|裸板|未装配|空白(?:印刷)?电路板|pcba|pcb\s*assembly|bare\s*pcb|(?:单独|独立|维修|替换|更换|配件|备件|零件).{0,10}(电路板|线路板|pcb|board)|(电路板|线路板|pcb|board).{0,10}(单独|独立|维修|替换|更换|配件|备件|零件|only|spare|replacement)/i.test(value);
    if (!explicitBoardPart) return false;
  }
  return /功能板|电路板|线路板|控制板|主板|板卡|裸板|pcba|pcb|board|circuit/i.test(value);
}

function hasAccessoryIntent(text = "") {
  const value = normalize(text);
  return /遥控器|遥控|remote\s*control|remote controller|controller|连接器|适配器|附件|accessory|adapter/.test(value) || hasStandaloneChargingCaseIntent(value);
}

function hasPackagingIntent(text = "") {
  return /包装盒|彩盒|纸箱|瓦楞|carton|paper\s*box|packaging/.test(normalize(text));
}

function detectPartSubtype(text = "") {
  const value = normalize(text);
  if (hasDisplayPanelIntent(value)) return "display-panel";
  if (/高音|低音|中音|全频|喇叭单元|扬声器单元|speaker\s*driver|tweeter|woofer|midrange/.test(value)) return "speaker-unit";
  if (/功能板|电路板|线路板|控制板|主板|板卡|pcba|pcb|circuit\s*board|board/.test(value)) return "board";
  if (/网罩|grille|mesh/.test(value)) return "grille";
  if (/支架|脚架|脚垫|stand|bracket|foot|feet/.test(value)) return "stand";
  if (/连接器|接插件|端子|connector/.test(value)) return "connector";
  if (/遥控器|remote\s*control|remote controller/.test(value)) return "remote";
  if (/纸箱|彩盒|瓦楞|carton|packaging/.test(value)) return "packaging";
  if (/线缆|连接线|电缆|cable|有接头/.test(value)) return "cable";
  return "";
}

function isPartCandidate(item = {}) {
  if (item.role === "audio-dedicated-part") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^851890|^852990/.test(String(item.code || "")) || /零件|配件|部件|维修件|备件|功能板|电路板|高音单元|低音单元|中音单元|喇叭单元|扬声器单元|speaker driver|tweeter|woofer|网罩|支架|脚架|\bspare\b|\bparts?\b|accessor/.test(text);
}

function isSpeakerPartCandidate(item = {}) {
  if (item.role === "audio-dedicated-part" && /^851890/.test(String(item.code || ""))) return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^851890/.test(String(item.code || "")) || /高音单元|低音单元|中音单元|喇叭单元|扬声器单元|音箱用.*(零件|部件|单元)|扬声器.*(零件|部件|单元)|speaker driver|tweeter|woofer/.test(text);
}

function isRemoteCandidate(item = {}) {
  if (item.role === "remote-accessory") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^854370|^852692/.test(String(item.code || "")) || /遥控器|遥控操作|remote\s*control|remote controller/.test(text);
}

function isIndependentElectricalFunctionCandidate(item = {}) {
  if (item.role === "independent-electrical-function") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes, item.regulation].join(" "));
  return /^854370/.test(String(item.code || "")) && /音视频处理器|音频处理器|音频协调器|信号转换|无功率放大|无扬声功能|独立电气功能|audio\s*processor|av\s*processor|digital\s*signal|dac|dsp/i.test(text);
}

function isBatteryCandidate(item = {}) {
  if (item.role === "battery") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^850760/.test(String(item.code || "")) || /锂电池|电池组|充电盒|battery|charging case/.test(text);
}

function isPackagingCandidate(item = {}) {
  if (item.role === "packaging") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^481910|^481920/.test(String(item.code || "")) || /纸箱|彩盒|包装盒|瓦楞|carton|packaging/.test(text);
}

function isCableCandidate(item = {}) {
  if (item.role === "cable") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^854442|^854449|^853690/.test(String(item.code || "")) || /连接线|线缆|电缆|带接插件|接插件|connector|cable|insulated conductor/.test(text);
}

function isPowerAdapterCandidate(item = {}) {
  if (item.role === "power-adapter") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^850440/.test(String(item.code || "")) || /电源适配器|充电器|电源供应器|power adapter|charger|power supply|ac dc/.test(text);
}

function isBarePcbCandidate(item = {}) {
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^853400/.test(String(item.code || "")) || /裸印刷电路板|裸板|空白电路板|未装配电路板|bare pcb|printed circuit/.test(text);
}

function isDisplayPanelCandidate(item = {}) {
  if (item.role === "display-panel") return true;
  const text = normalize([item.code, item.name, item.keywords, item.notes].join(" "));
  return /^853120/.test(String(item.code || "")) || /液晶显示板|显示板|显示面板|指示面板|indicator panel|lcd display|display module/.test(text);
}

function isLikelyFinishedGoodsCandidate(item = {}) {
  if (/^finished-|^headphone$|^microphone$|speaker-without-enclosure/.test(String(item.role || ""))) return true;
  const text = normalize([item.code, item.name, item.keywords].join(" "));
  return /^851840|^851821|^851822|^851829|^851830|^851810|^852791|^851762/.test(String(item.code || "")) || /功率放大器|音频扩大器|整机|音箱|耳机|麦克风|接收机|amplifier|receiver|speaker|headphone/.test(text);
}

function getHostFamily(text = "") {
  const value = normalize(text);
  if (hasAudioProcessorIntent(value)) {
    return {
      type: "electrical-8543",
      label: "8543 独立电气功能设备",
      partCode: "8543709990",
      reason: "语境指向音视频处理、解码、信号转换或音频调谐设备；先判断是否具有独立功能，再看是否被更具体品目列名。"
    };
  }
  if (/音箱|扬声器|喇叭|功放|扩大器|耳机|麦克风|传声器|speaker|loudspeaker|amplifier|headphone|earphone|microphone/.test(value)) {
    return {
      type: "audio-8518",
      label: "8518 音频设备",
      partCode: "8518900000",
      reason: "语境指向 8518 项下音频设备；若货物是其专用零件，应优先看 8518900000 方向。"
    };
  }
  if (/收音|广播|radio|接收机/.test(value)) {
    return {
      type: "radio-8527",
      label: "8527 广播接收设备",
      partCode: "8529900000",
      reason: "语境指向 8527/8528 等设备；零件通常需要看 8529 或更具体品目。"
    };
  }
  if (/电视|显示器|投影|video|monitor|display|projector/.test(value)) {
    return {
      type: hasDisplayPanelIntent(value) ? "indicator-8531" : "video-8528",
      label: hasDisplayPanelIntent(value) ? "8531 指示/显示面板方向" : "8528 显示/视频设备",
      partCode: hasDisplayPanelIntent(value) ? "8531200000" : "8529900000",
      reason: hasDisplayPanelIntent(value)
        ? "语境指向 LCD/显示板/指示面板组件；先看 853120 指示板/显示板方向。"
        : "语境指向显示/视频设备；零件通常需要看 8529 或更具体品目。"
    };
  }
  return {
    type: "unknown",
    label: "未明确主机",
    partCode: "",
    reason: "未识别到明确对应整机，需用用途、结构、材质和功能继续补充。"
  };
}

function isExplicitFinishedGoodsText(text = "") {
  return /整机|成品|完整|套装|成套|零售包装|可独立使用|单独销售|finished|complete|set\b|retail\s*set|retail\s*pack/i.test(text);
}

function getCandidateRole(item = {}) {
  if (item.role === "display-panel") return "display-panel";
  if (item.role === "packaging") return "packaging";
  if (item.role === "battery") return "battery";
  if (item.role === "cable") return "cable";
  if (item.role === "power-adapter") return "power-supply";
  if (isIndependentElectricalFunctionCandidate(item)) return "independent-function";
  if (item.role === "remote-accessory") return "remote";
  if (item.role === "audio-dedicated-part") return /^851890/.test(String(item.code || "")) ? "speaker-part" : "part";
  if (/^finished-/.test(String(item.role || "")) || item.role === "headphone" || item.role === "microphone" || item.role === "speaker-without-enclosure") return "finished";
  if (isPackagingCandidate(item)) return "packaging";
  if (isBatteryCandidate(item)) return "battery";
  if (isPowerAdapterCandidate(item)) return "power-supply";
  if (isCableCandidate(item)) return "cable";
  if (isDisplayPanelCandidate(item)) return "display-panel";
  if (isRemoteCandidate(item)) return "remote";
  if (isBarePcbCandidate(item)) return "bare-pcb";
  if (isSpeakerPartCandidate(item)) return "speaker-part";
  if (isPartCandidate(item)) return "part";
  if (isLikelyFinishedGoodsCandidate(item)) return "finished";
  return "other";
}

function getExpectedHsProfile(formText = "") {
  const value = normalize(formText);
  if (!value) return null;
	  const shape = getCargoShape(value);
	  const headphonePart = hasExplicitHeadphonePartIntent(value);
	  const amplifierPart = /功放.*(功能板|电路板|线路板|控制板|pcba|pcb|板|模块|零件|配件|部件|维修)|功放用|放大器.*(功能板|电路板|pcba|pcb|零件|配件)|amplifier\s*(board|pcb|pcba|module|part)/i.test(value);
	  const remoteController = /遥控器|遥控|remote\s*control|remote controller/i.test(value);
	  const finishedAmplifier = /(^|\s)(功放|功放机|音频扩大器|功率放大器)(\s|$)|\baudio amplifier\b|\bpower amplifier\b/i.test(value) && !amplifierPart && !/遥控器|remote/i.test(value);
	  const audioProcessor = hasAudioProcessorIntent(value);
	  const audioProcessorWithRadio = audioProcessor && hasPositiveRadioSignal(value);
	  const rules = [
    {
      hit: /蓝牙耳机|无线耳机|tws|bluetooth\s*(earbud|headset|headphone)|wireless\s*(earbud|headset|headphone)/i.test(value) && !headphonePart,
      label: "蓝牙/无线耳机成品",
      expected: "851762 无线通信/蓝牙耳机方向",
      allowed: [/^851762/],
      conflict: "产品是蓝牙/无线耳机成品，不能因为材料里出现喇叭单元、电路板或电池就转成 851890 音频零件。"
    },
    {
      hit: /有线|wired|线控/i.test(value) && /耳机|耳塞|headphone|headset|earbud|earphone/i.test(value) && !headphonePart,
      label: "有线耳机成品",
      expected: "851830 有线耳机/耳塞方向",
      allowed: [/^851830/],
      conflict: "产品是有线耳机成品，应优先看 851830 耳机/耳塞方向，不应按无线耳机、零件或音箱处理。"
    },
    {
      hit: /耳机|耳塞|headphone|headset|earbud/i.test(value) && !headphonePart,
      label: "耳机成品/套装",
      expected: "无线耳机 851762 或有线耳机 851830 方向",
      allowed: [/^851762/, /^851830/],
      conflict: "产品是耳机成品/套装，候选税号应先落在耳机或无线通信设备方向，不应直接落到音频零件。"
    },
    {
      hit: headphonePart,
      label: "耳机专用零件",
      expected: "专用零件/板件/发声单元方向",
      allowed: [/^851890/, /^853400/, /^854370/],
      conflict: "输入指向耳机专用零件或功能件，不能直接按耳机成品方向使用。"
    },
    {
      hit: remoteController,
      label: "遥控器/控制器",
      expected: "854370 或 852692 遥控/独立控制功能方向",
      allowed: [/^854370/, /^852692/],
      conflict: "产品是遥控器或控制器，应按自身控制功能、无线属性和独立功能判断，不应直接按被控制设备或普通音频零件归类。"
    },
	    {
	      hit: audioProcessorWithRadio,
	      label: "带收音机功能的音视频处理器",
	      expected: "852791 收放音/广播接收设备方向",
	      allowed: [/^852791/],
	      conflict: "产品描述指向带收音机功能的音视频处理器，应优先复核 852791 方向，不能按普通音箱/功放成品或 8518 零件使用。"
	    },
	    {
	      hit: audioProcessor && !audioProcessorWithRadio,
	      label: "音频/音视频处理器",
	      expected: "8543709990 其他具有独立功能的电气设备方向",
	      allowed: [/^854370/],
	      conflict: "产品是音视频信号处理/解码/转换或音质调谐设备，且未说明有功率放大、扬声或收音机功能，不应按音箱、功放成品或 8518 零件使用。"
	    },
    {
      hit: shape.type === "display-panel",
      label: "LCD/显示板/指示面板组件",
      expected: "853120 指示板/显示板组件方向",
      allowed: [/^853120/],
      conflict: "产品本体是 LCD 显示板或指示面板组件，不能因为用于音箱就按多喇叭音箱、完整音箱或 8518 音频设备零件使用。"
    },
	    {
	      hit: finishedAmplifier,
	      label: "功放/音频扩大器成品",
      expected: "851840 音频扩大器方向",
      allowed: [/^851840/],
      conflict: "产品是功放或音频扩大器成品，不能直接按零件、遥控器、电池或包装材料税号使用。"
    },
    {
      hit: amplifierPart || shape.type === "pcba-part",
      label: "功放/音频设备专用功能板或零件",
      expected: "851890 音频设备零件或按裸板另证",
      allowed: [/^851890/, /^853400/],
      conflict: "输入指向功放/音频设备用功能板或零件，不能直接按功放整机方向使用。"
    },
    {
      hit: shape.type === "speaker-part",
      label: "扬声器单元/音箱零件",
      expected: "851890 音频设备零件方向",
      allowed: [/^851890/],
      conflict: "产品是高音/低音/扬声器单元或音箱专用零件，不应按完整音箱或无线耳机方向使用。"
    },
    {
      hit: shape.type === "speaker-no-enclosure",
      label: "无箱体扬声器",
      expected: "851829 无箱体扬声器方向",
      allowed: [/^851829/],
      conflict: "产品是无箱体/裸扬声器，未确认完整音箱时不应按 851821/851822 多喇叭音箱方向使用。"
    },
    {
      hit: shape.type === "accessory",
      label: "附件/独立功能件",
      expected: "附件自身功能或专用零件方向",
      allowed: [/^854370/, /^852692/, /^851890/, /^850760/],
      conflict: "产品是遥控器、控制器或独立附件，不能直接按被控制的整机税号使用。"
    },
    {
      hit: shape.type === "power-supply",
      label: "电源适配器/充电器",
      expected: "850440 静止式变流器方向",
      allowed: [/^850440/],
      conflict: "产品本体是电源适配器或充电器，应按电源转换设备自身功能判断。"
    },
    {
      hit: shape.type === "battery",
      label: "锂电池/电池组",
      expected: "850760 锂离子电池方向",
      allowed: [/^850760/],
      conflict: "产品本体是电池或电池组，应按电池税号和危险品运输逻辑判断。"
    },
    {
      hit: shape.type === "cable",
      label: "线缆/连接件",
      expected: "854442/854449/853690 线缆或连接器方向",
      allowed: [/^854442/, /^854449/, /^853690/],
      conflict: "产品本体是线缆或连接件，不应按连接的音频设备整机税号使用。"
    },
    {
      hit: shape.type === "packaging",
      label: "纸箱/包装材料",
      expected: "4819 纸制包装品方向",
      allowed: [/^4819/],
      conflict: "产品本体是包装材料，应按纸制包装品或材料属性判断，不应按包装内产品归类。"
    }
  ];
  return rules.find((rule) => rule.hit) || null;
}

function getCandidateInputConflict(best = {}, formText = "") {
  const profile = getExpectedHsProfile(formText);
  if (!profile || !best?.code) return null;
  const code = String(best.code || "").replace(/\D/g, "");
  const allowed = profile.allowed.some((pattern) => pattern.test(code));
  if (allowed) return null;
  return {
    profile: profile.label,
    expected: profile.expected,
    message: `${profile.conflict} 当前候选 ${best.code}（${best.name || "未命名"}）与该产品画像不一致。`
  };
}

function shapeFitScore(item = {}, cargoShape = {}, formText = "") {
  const code = String(item.code || "");
  const role = getCandidateRole(item);
  const host = getHostFamily(formText);
  let score = 0;
  const reasons = [];

  if (cargoShape.type !== "finished" && cargoShape.type !== "speaker-no-enclosure" && role === "finished" && !isExplicitFinishedGoodsText(formText)) {
    score -= 210;
    reasons.push("输入表现为零件/备件/功能件，整机税号强降权。");
  }
  if (cargoShape.type === "speaker-part") {
    if (role === "speaker-part" || /^851890/.test(code)) {
      score += 180;
      reasons.push("高音/低音/扬声器单元属于音频设备零件方向，优先 851890。");
    }
    if (/^851821|^851822|^851829/.test(code)) {
      score -= 260;
      reasons.push("851821/851822/851829 是音箱成品方向，不适合“音箱用单元”。");
    }
  }
	  if (cargoShape.type === "speaker-no-enclosure") {
    if (/^851829/.test(code) || item.role === "speaker-without-enclosure") {
      score += 210;
      reasons.push("裸扬声器/无箱体扬声器方向，851829 优先。");
    }
    if (/^851821|^851822/.test(code) && !hasSpeakerEnclosureSignal(formText)) {
      score -= 260;
      reasons.push("未确认箱体和完整音箱结构，851821/851822 暂不应作为首选。");
    }
    if (/^851890/.test(code) && !hasSpeakerUnitSignal(formText)) {
      score -= 55;
      reasons.push("只写扬声器时先看无箱体扬声器；若实际为高音/低音单元或专用零件，再转 851890。");
	    }
	  }
	  if (cargoShape.type === "independent-function") {
	    const radioSignal = hasPositiveRadioSignal(formText);
	    if (!radioSignal && (role === "independent-function" || /^854370/.test(code))) {
	      score += 260;
	      reasons.push("音频/音视频处理器无收音机、无功率放大和扬声功能时，854370 独立电气功能方向优先。");
	    }
	    if (radioSignal && /^852791/.test(code)) {
	      score += 230;
	      reasons.push("带收音机功能的音视频处理器需优先复核 852791 方向。");
	    }
	    if (/^851821|^851822|^851829|^851840|^851890/.test(code)) {
	      score -= 240;
	      reasons.push("音视频处理器不是音箱/功放成品，也不是普通 8518 零件，相关税号降权。");
	    }
	  }
  if (cargoShape.type === "display-panel") {
    if (/^853120/.test(code) || role === "display-panel") {
      score += 290;
      reasons.push("LCD/显示板/指示面板组件按 853120 显示/指示板方向优先。");
    }
    if (/^851821|^851822|^851829|^851890|^854370|^852990/.test(code)) {
      score -= 260;
      reasons.push("显示板组件不是完整音箱，也不是普通 8518 音频零件；相关税号降权。");
    }
  }
	  if (cargoShape.type === "pcba-part" && /^851890|^852990/.test(code)) {
    score += host.type === "audio-8518" && /^851890/.test(code) ? 150 : 95;
    reasons.push("专用功能板/PCBA 按主机零件方向优先。");
  }
  if (cargoShape.type === "pcba-part" && role === "bare-pcb") {
    score -= 210;
    reasons.push("已装配 PCBA/功能板不是裸印刷电路板，8534 裸板方向降权。");
  }
  if (cargoShape.type === "part" && host.type === "audio-8518" && /^851890/.test(code)) {
    score += 130;
    reasons.push("用于 8518 音频设备的专用零件，851890 优先。");
  }
  if (cargoShape.type === "mechanical-part" && host.type === "audio-8518" && /^851890/.test(code)) {
    score += 110;
    reasons.push("音频设备用结构件/外观件，先按 8518 零件方向核验。");
  }
  if (cargoShape.type === "bare-pcb" && /^853400/.test(code)) {
    score += 170;
    reasons.push("裸印刷电路板优先看 8534。");
  }
  if (cargoShape.type === "bare-pcb" && role !== "bare-pcb") {
    score -= 170;
    reasons.push("裸 PCB 输入下，非印刷电路方向降权。");
  }
  if (cargoShape.type === "accessory" && role === "remote") {
    score += 150;
    reasons.push("遥控器/控制器按自身功能或专用附件判断，不按被控制整机。");
  }
  if (cargoShape.type === "packaging" && role === "packaging") {
    score += 150;
    reasons.push("包装材料按纸箱/彩盒/包装品方向优先。");
  }
  if (cargoShape.type === "packaging" && role !== "packaging") {
    score -= 220;
    reasons.push("包装材料输入下，产品成品/零件税号降权。");
  }
  if (cargoShape.type === "battery" && role === "battery") {
    score += 185;
    reasons.push("货物本体为电池/电池组，优先按电池税号和 DG 逻辑核验。");
  }
  if (cargoShape.type === "battery" && role !== "battery") {
    score -= 185;
    reasons.push("电池本体输入下，非电池税号降权；如为内置电池，应在品名里写明整机。");
  }
  if (cargoShape.type === "finished" && role === "battery" && /(耳机|音箱|功放|设备|整机|headphone|earbud|speaker|amplifier|device)/i.test(formText)) {
    score -= 155;
    reasons.push("整机含电池不等于货物本体为电池，电池税号降权。");
  }
  if (cargoShape.type === "power-supply" && role === "power-supply") {
    score += 185;
    reasons.push("电源适配器/充电器按电源转换设备自身功能优先。");
  }
  if (cargoShape.type === "power-supply" && role !== "power-supply") {
    score -= 150;
    reasons.push("适配器输入下，不应按所配套整机税号优先。");
  }
  if (cargoShape.type === "cable" && /^854442|^853690/.test(code)) {
    score += 120;
    reasons.push("连接线/接插件按线缆或连接器方向优先。");
  }
  if (cargoShape.type === "cable" && role !== "cable") {
    score -= 135;
    reasons.push("线缆/接插件输入下，非线缆/连接器方向降权。");
  }
  return { score, reasons, role, host };
}

function productAliasScore(item = {}, formText = "") {
  const text = normalize([item.code, item.name, item.keywords, item.notes, item.regulation].join(" "));
  const code = String(item.code || "");
  const cargoShape = getCargoShape(formText);
  const partLike = cargoShape.type !== "finished";
  const finishedWirelessHeadset = /蓝牙耳机|无线耳机|tws|bluetooth\s*(earbud|headset|headphone)|wireless\s*(earbud|headset|headphone)/i.test(formText) && !hasExplicitHeadphonePartIntent(formText);
  const finishedWiredHeadset = /有线|wired|线控/i.test(formText) && /耳机|耳塞|headphone|headset|earbud|earphone/i.test(formText) && !hasExplicitHeadphonePartIntent(formText);
  const wirelessHeadsetCandidate = /耳机|耳塞|headphone|headset|earbud|earphone|tws/.test(text);
  const finishedAmplifier = /(^|\s)(功放|功放机|音频扩大器|功率放大器)(\s|$)|\baudio amplifier\b|\bpower amplifier\b/i.test(formText) && !/(用|零件|配件|部件|维修|功能板|电路板|线路板|pcba|pcb|遥控器|remote|spare|part|component|board|for\s+)/i.test(formText);
  const amplifierPart = /功放.*(功能板|电路板|线路板|控制板|pcba|pcb|板|模块|零件|配件|部件|维修)|功放用|放大器.*(功能板|电路板|pcba|pcb|零件|配件)|amplifier\s*(board|pcb|pcba|module|part)/i.test(formText);
  const remoteForAudio = /遥控器|remote controller|remote/i.test(formText);
  const packagingText = /纸箱|瓦楞|彩盒|包装盒|carton|corrugated|paper box|packaging/i.test(formText);
  const cableText = /连接线|线缆|电缆|数据线|音频线|usb线|带接头|带接插件|cable|connector/i.test(formText) && !(hasHeadphoneContext(formText) && !hasExplicitHeadphonePartIntent(formText));
	  const powerText = /电源适配器|充电器|电源供应器|power adapter|charger|power supply|ac\s*dc/i.test(formText);
	  const batteryText = /锂电池|电池组|电芯|battery|li-ion|lithium|power bank|充电宝/i.test(formText) && !/(耳机|音箱|设备|整机|内置|装在设备|contained|with equipment)/i.test(formText);
	  const audioProcessorText = hasAudioProcessorIntent(formText);
	  const audioProcessorRadio = audioProcessorText && hasPositiveRadioSignal(formText);
  const displayPanelText = hasDisplayPanelIntent(formText);
	  let score = 0;
  if (finishedWirelessHeadset && /^851762/.test(code) && wirelessHeadsetCandidate) score += 260;
  if (finishedWirelessHeadset && /^851762/.test(code) && !wirelessHeadsetCandidate) score -= 320;
  if (finishedWirelessHeadset && /^851890/.test(code)) score -= 340;
  if (finishedWirelessHeadset && /^85182/.test(code)) score -= 120;
  if (finishedWiredHeadset && /^851830/.test(code)) score += 280;
  if (finishedWiredHeadset && /^851762/.test(code)) score -= 340;
  if (finishedWiredHeadset && /^851890|^85182/.test(code)) score -= 220;
  if (!partLike && /耳机|耳塞|headphone|earphone|earbuds|headset/.test(formText) && /^851890/.test(code)) score -= 240;
  if (finishedAmplifier && /^851840/.test(code)) score += 230;
  if (finishedAmplifier && /^851890/.test(code)) score -= 230;
  if (amplifierPart && /^851890/.test(code)) score += 240;
  if (amplifierPart && /^851840/.test(code)) score -= 280;
	  if (remoteForAudio && /^854370/.test(code)) score += 190;
	  if (remoteForAudio && /^852692/.test(code)) score += 150;
	  if (remoteForAudio && /^851840|^851822|^851890/.test(code) && !/专用零件|spare part|part/i.test(text)) score -= 180;
	  if (audioProcessorText && !audioProcessorRadio && (isIndependentElectricalFunctionCandidate(item) || /^854370/.test(code))) score += 340;
	  if (audioProcessorText && !audioProcessorRadio && /^852791/.test(code)) score -= 90;
	  if (audioProcessorText && audioProcessorRadio && /^852791/.test(code)) score += 310;
	  if (audioProcessorText && /^854370/.test(code) && /音视频处理器|音频协调器|音频处理器|信号转换|无功率放大|无扬声功能/.test(text)) score += 160;
	  if (audioProcessorText && /^851821|^851822|^851829|^851840|^851890/.test(code)) score -= 260;
  if (displayPanelText && /^853120/.test(code)) score += 360;
  if (displayPanelText && /^851821|^851822|^851829|^851890|^854370|^852990/.test(code)) score -= 300;
	  if (packagingText && /^4819/.test(code)) score += 230;
  if (packagingText && /^8518|^850|^854/.test(code)) score -= 240;
  if (cableText && /^854442|^854449|^853690/.test(code)) score += 210;
  if (cableText && /^8518|^850760/.test(code)) score -= 190;
  if (powerText && /^850440/.test(code)) score += 230;
  if (powerText && /^8518|^850760/.test(code)) score -= 210;
  if (batteryText && /^850760/.test(code)) score += 230;
  if (batteryText && /^8518|^854370|^4819/.test(code)) score -= 220;
  if (!batteryText && /含锂电池|带电池|内置电池|充电盒|battery|charging case/i.test(formText) && /^850760/.test(code)) score -= 180;
  if (!partLike && /功放|放大器|amplifier/.test(formText) && (/^851840/.test(code) || /功率放大器|音频扩大器|功放机|汽车功放|商业功率放大器|amplifier/.test(text))) score += 48;
  if (cargoShape.type === "speaker-no-enclosure" && (/^851829/.test(code) || item.role === "speaker-without-enclosure")) score += 115;
  if (cargoShape.type === "speaker-no-enclosure" && /^851821|^851822/.test(code)) score -= 145;
  if (!partLike && /音箱|speaker\s*(box|system)|soundbar|有箱体|组合音箱|多喇叭/.test(formText) && (/^85182/.test(code) || /音箱|扬声器|喇叭|speaker|loudspeaker/.test(text))) score += 38;
  if (!partLike && /音箱|扬声器|喇叭|speaker|loudspeaker/.test(formText) && /^851762|^851830/.test(code)) score -= 78;
  if (!partLike && /耳机|耳塞|headphone|earphone|earbuds|headset/.test(formText) && (/^851830|^851762/.test(code) || /耳机|耳塞|headphone|earbuds|headset/.test(text))) score += 38;
  if (!partLike && /耳机|耳塞|headphone|earphone|earbuds|headset/.test(formText) && !wirelessHeadsetCandidate && /^8518|^8527|^8543/.test(code)) score -= 520;
  if (!partLike && /耳机|耳塞|headphone|earphone|earbuds|headset/.test(formText) && /^85182/.test(code)) score -= 72;
  if (!partLike && /无线|蓝牙|bluetooth|wireless|tws/.test(formText) && /^851762/.test(code)) score += 88;
  if (!partLike && /无线|蓝牙|bluetooth|wireless|tws/.test(formText) && /^851830/.test(code)) score -= 72;
  if (!partLike && /有线|wired|线控/.test(formText) && /^851830/.test(code)) score += 72;
  if (!partLike && /有线|wired|线控/.test(formText) && /^851762/.test(code)) score -= 60;
  if (!partLike && /麦克风|话筒|microphone/.test(formText) && (/^851810/.test(code) || /麦克风|话筒|microphone/.test(text))) score += 34;
  if (partLike && getHostFamily(formText).type === "audio-8518" && /^851890/.test(code)) score += 60;
  if (Number(item.exampleCount || 0) >= 5) score += Math.min(18, Math.round(Math.log2(Number(item.exampleCount || 1)) * 4));
  if (item.sourceFile && /HS CODE/.test(item.sourceFile)) score += 6;
  if (item.role === "audio-dedicated-part" && partLike) score += 18;
  if (/^finished-/.test(String(item.role || "")) && !partLike) score += 10;
  return score;
}

function getFormText() {
  const category = $("productCategory").value.includes("自动判断") ? "" : $("productCategory").value;
  return normalize(
    [
      $("productName").value,
      $("englishName").value,
      category,
      $("material").value,
      $("usage").value,
      $("spec").value,
      $("brandName")?.value || "",
      $("modelNumber")?.value || "",
      $("destination").value,
      $("originCountry")?.value || "",
      $("modelInfo").value
    ].join(" ")
  );
}

function scoreCase(item, formText) {
  const keywords = splitKeywords(item.keywords);
  const matches = keywords.filter((keyword) => formText.includes(keyword));
  const searchableText = normalize([item.name, item.notes, item.regulation, item.code].join(" "));
  const nameHit = searchableText
    .split(/[、，,\s]+/)
    .some((part) => part.length > 1 && formText.includes(part));
  const codeHit = item.code && formText.includes(item.code);
  const chapterHit = /^第\d{2}章$/.test(String(item.code || ""));
  const cargoShape = getCargoShape(formText);
  const partIntent = cargoShape.type !== "finished" && cargoShape.type !== "speaker-no-enclosure";
  const boardIntent = hasBoardIntent(formText);
  const accessoryIntent = hasAccessoryIntent(formText);
  const standaloneChargingCase = hasStandaloneChargingCaseIntent(formText);
  const packagingIntent = hasPackagingIntent(formText);
  const partCandidate = isPartCandidate(item);
	  const remoteCandidate = isRemoteCandidate(item);
	  const independentCandidate = isIndependentElectricalFunctionCandidate(item);
  const displayPanelCandidate = isDisplayPanelCandidate(item);
	  const batteryCandidate = isBatteryCandidate(item);
  const packagingCandidate = isPackagingCandidate(item);
  const barePcbCandidate = isBarePcbCandidate(item);
  const finishedGoodsCandidate = isLikelyFinishedGoodsCandidate(item);
  const shapeFit = shapeFitScore(item, cargoShape, formText);
  let score = matches.length * (chapterHit ? 8 : 18) + (nameHit ? 12 : 0) + (codeHit ? 35 : 0) - (chapterHit ? 12 : 0);
  score += productAliasScore(item, formText);
  score += shapeFit.score;
	  if (partIntent && partCandidate) score += 42;
	  if (cargoShape.type === "independent-function" && independentCandidate) score += 88;
  if (cargoShape.type === "display-panel" && displayPanelCandidate) score += 120;
	  if (cargoShape.type === "pcba-part" && /^851890|^852990/.test(String(item.code || ""))) score += 48;
  if (cargoShape.type === "bare-pcb" && barePcbCandidate) score += 64;
  if (boardIntent && /^851890|^852990/.test(String(item.code || ""))) score += 36;
  if (accessoryIntent && remoteCandidate) score += 120;
  if (/遥控器|遥控|remote\s*control|remote controller/.test(formText) && /遥控器|遥控操作|remote/.test(normalize([item.name, item.keywords, item.notes].join(" ")))) score += 110;
  if (/遥控器|remote\s*control|remote controller/.test(formText) && /遥控器|remote/.test(normalize(item.name))) score += 80;
  if (standaloneChargingCase && /^850760/.test(String(item.code || ""))) score += 130;
  if (standaloneChargingCase && batteryCandidate) score += 74;
  if (packagingIntent && packagingCandidate) score += 70;
  if (cargoShape.type === "cable" && /^854442|^853690/.test(String(item.code || ""))) score += 58;
  if (cargoShape.type === "mechanical-part" && partCandidate) score += 86;
	  if (partIntent && finishedGoodsCandidate && !partCandidate && !remoteCandidate && !packagingCandidate && cargoShape.type !== "independent-function") score -= 42;
  if (boardIntent && finishedGoodsCandidate && !partCandidate) score -= 36;
  if (accessoryIntent && finishedGoodsCandidate && !remoteCandidate) score -= 46;
  if (accessoryIntent && partCandidate && !remoteCandidate && !batteryCandidate) score -= 70;
	  if (!partIntent && partCandidate && !remoteCandidate && !packagingCandidate && !batteryCandidate && !independentCandidate && !isExplicitFinishedGoodsText(formText)) score -= 120;
  if (cargoShape.type === "display-panel" && !displayPanelCandidate) score -= 120;
  if (cargoShape.type === "finished" && partCandidate && /音箱|功放|耳机|麦克风|speaker|amplifier|headphone/.test(formText)) score -= 80;
  if (/遥控器|遥控|remote\s*control|remote controller/.test(formText) && !remoteCandidate) score -= 190;
  if (packagingIntent && finishedGoodsCandidate && !packagingCandidate) score -= 60;
  if (cargoShape.type === "mechanical-part" && finishedGoodsCandidate && !partCandidate) score -= 82;
  if (cargoShape.type === "cable" && finishedGoodsCandidate) score -= 70;
  if (standaloneChargingCase && finishedGoodsCandidate && !batteryCandidate) score -= 76;
  if (standaloneChargingCase && /^8506/.test(String(item.code || ""))) score -= 44;
  if (!packagingIntent && packagingCandidate) score -= 54;
  if (!partIntent && partCandidate && !finishedGoodsCandidate && !remoteCandidate && !packagingCandidate && !batteryCandidate) score -= 36;
  if (partIntent && chapterHit) score -= 8;
  const inputSubtype = detectPartSubtype(formText);
  const itemSubtype = detectPartSubtype([item.name, item.keywords, item.notes].join(" "));
  if (inputSubtype && itemSubtype && inputSubtype === itemSubtype) score += 92;
  if (inputSubtype && itemSubtype && inputSubtype !== itemSubtype && partCandidate) score -= 96;
  const rankScore = Math.max(0, score);
  return { ...item, rankScore, score: Math.min(rankScore, 94), matches, cargoShape, shapeFit };
}

function getCaseDutyText(item = {}) {
  const chinaTariff = getChinaTariffDetail(item);
  if (chinaTariff?.appliedRate) return chinaTariff.appliedRate;
  const values = [item.customsTax, item.mfnRate, item.dutyRate].filter((value) => value !== undefined && value !== null && String(value).trim() !== "");
  if (!values.length) return "";
  const value = String(values[0]).trim();
  if (/%/.test(value)) return value;
  const number = Number(value);
  if (Number.isFinite(number)) return `${number > 1 ? number : number * 100}%`;
  return value;
}

function formatRateText(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value || "待确认");
  const percent = number > 1 ? number : number * 100;
  return `${Number.isInteger(percent) ? percent : percent.toFixed(1)}%`;
}

function hasConcreteRate(value = "") {
  const text = String(value || "").trim();
  return !!text && text !== "-" && text !== "待确认" && !/见|按|确认/.test(text);
}

function normalizeRateDisplay(value = "") {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/%|从量|复合/.test(text)) return text;
  const number = Number(text);
  return Number.isFinite(number) ? formatRateText(number) : text;
}

function getAppliedChinaRate(record = {}) {
  const provisionalRate = normalizeRateDisplay(record.provisionalRate || "");
  const mfnRate = normalizeRateDisplay(record.mfnRate || record.mfn || record.dutyRate || "");
  if (hasConcreteRate(provisionalRate)) {
    return { rate: provisionalRate, type: "暂定税率" };
  }
  return { rate: mfnRate || "待确认", type: "最惠国税率" };
}

function compactHs(value = "") {
  return String(value || "").replace(/\D/g, "");
}

function findChinaTariffRecord(hs = "") {
  const code = compactHs(hs);
  if (!code || !Array.isArray(window.CHINA_TARIFF_2026)) return null;
  return (
    window.CHINA_TARIFF_2026.find((row) => compactHs(row.hs) === code) ||
    window.CHINA_TARIFF_2026.find((row) => row.hs8 && code.startsWith(compactHs(row.hs8))) ||
    null
  );
}

function getChinaTariffDetail(item = {}) {
  const record = findChinaTariffRecord(item.code);
  if (!record) return null;
  const mfn = normalizeRateDisplay(record.mfnRate || record.mfn || record.dutyRate || "");
  const provisionalRate = normalizeRateDisplay(record.provisionalRate || "-") || "-";
  const applied = getAppliedChinaRate(record);
  return {
    ...record,
    mfnRate: mfn || "待确认",
    appliedRate: applied.rate,
    appliedType: applied.type,
    ordinaryRate: record.ordinaryRate || "待官方确认",
    provisionalRate,
    importVat: record.importVat || "按现行进口环节税确认",
    sourceTitle: record.sourceTitle || "中国税则基础库",
    sourceUrl: record.sourceUrl || "https://online.customs.gov.cn/ocportal/mySearch/"
  };
}

function getHsInterpretation(hs = "") {
  const clean = compactHs(hs);
  const hs8 = clean.slice(0, 8);
  const record = findChinaTariffRecord(clean || hs8);
  const override = hsInterpretationOverrides[clean] || hsInterpretationOverrides[hs8] || null;
  const fullTextLines = hsTariffFullTextOverrides[clean] || hsTariffFullTextOverrides[hs8] || [];
  const leafText = record ? `${record.codeDisplay || record.hs8 || record.hs} ${record.name}` : "";
  const tariffFullText = fullTextLines.length
    ? fullTextLines.join("\n")
    : override?.tariffOriginal || leafText;
  return {
    code: clean || hs8 || String(hs || "").trim(),
    hs8,
    legalName: override?.legalName || record?.name || "未命中本地税则名称",
    tariffOriginal: override?.tariffOriginal || leafText,
    tariffFullText,
    tariffRateLine: record ? `最惠国 ${normalizeRateDisplay(record.mfnRate || record.mfn || "") || "待确认"}；普通税率 ${record.ordinaryRate || "待确认"}；暂定税率 ${normalizeRateDisplay(record.provisionalRate || "") || "-"}` : "",
    scope: override?.scope || (record ? `中国 2026 税则税目名称：${record.name}。` : "本地 2026 税则库未命中，需要到官方税则/海关税目税号查询核验。"),
    boundary: override?.boundary || "需结合货物形态、用途、材质、功能和章注/类注判断，不能只按商品俗称匹配。",
    caution: override?.caution || "正式归类需由关务/报关行结合规格书、图片、BOM、用途说明和海关口径复核。",
    sourceTitle: record?.sourceTitle || "中国 2026 进出口税则 / 海关税目税号查询",
    sourceUrl: record?.sourceUrl || "https://online.customs.gov.cn/ocportal/mySearch/"
  };
}

function buildDestinationDutyReference(country = "", item = {}, chinaReferenceDuty = "") {
  const rawCountry = String(country || "").trim();
  const chinaDestination = !rawCountry || hasAlias(rawCountry, ["china", "中国", "大陆", "cn"]);
  const hs = String(item.code || "").replace(/\D/g, "");
  const profile = findProfileByAliases(destinationDutyProfiles, rawCountry || "中国") || null;
  const taxDirection = findProfileByAliases(taxProfiles, rawCountry || "中国") || null;
  const chinaTariff = getChinaTariffDetail(item);
  const countryName = profile?.market || rawCountry || "目的国";
  const taxSummary = chinaDestination && chinaTariff
    ? `中国进口：当前适用 ${chinaTariff.appliedRate}（${chinaTariff.appliedType}），最惠国 ${chinaTariff.mfnRate}，普通税率 ${chinaTariff.ordinaryRate}，进口增值税 ${chinaTariff.importVat}`
    : taxDirection
    ? `${taxDirection.market} 估算方向：基础关税参数约 ${formatRateText(taxDirection.duty)}，${taxDirection.vatName} 约 ${formatRateText(taxDirection.vat)}`
    : "未内置目的国税费估算参数，需由当地进口商/报关行报价。";

  if (chinaDestination) {
    return {
      countryName: "中国",
      title: chinaTariff ? "中国进口当前适用税率" : "中国进口基础关税",
      dutyText: chinaTariff ? `${chinaTariff.appliedRate}（${chinaTariff.appliedType}）` : chinaReferenceDuty || "待中国2026税则确认",
      authority: profile?.authority || "中国税则/海关税目税号查询",
      note: chinaTariff
        ? `${chinaTariff.effectiveNote || "税率来自中国税则基础库；正式以通关时海关解释为准。"} 最惠国税率 ${chinaTariff.mfnRate}，暂定税率 ${chinaTariff.provisionalRate}，普通税率 ${chinaTariff.ordinaryRate}。`
        : chinaReferenceDuty
          ? "来自脱敏历史 HS 表或内置规则库，适合初筛；正式税率仍以中国税则和海关查询为准。"
          : "当前本地库没有读取到该候选税号的中国基础税率字段，需要到中国 2026 税则或海关税目税号查询确认。",
      instruction: profile?.instruction || "确认最惠国税率、协定税率、暂定税率、监管条件和进口环节税。",
      taxSummary,
      links: dedupeTariffLinks([...(profile?.links || []), ...(chinaTariff ? [[chinaTariff.sourceTitle, chinaTariff.sourceUrl], ["海关税目税号查询", chinaTariff.verifyUrl || "https://online.customs.gov.cn/ocportal/mySearch/"]] : [])])
    };
  }

  return {
    countryName,
    title: "目的国基础关税",
    dutyText: profile?.lookup || "待目的国官方税则确认",
    authority: profile?.authority || "目的国海关/官方税则",
    note: `${profile?.instruction || "需要用目的国官方税则确认本国 8-10 位编码和基础税率。"}${hs ? ` 当前候选中国 HS 为 ${hs}，不能直接当作目的国最终税号。` : ""}`,
    instruction: profile?.instruction || "核对 HS 6 位、目的国细分编码、原产国、贸易协定、监管措施和实施日期。",
    taxSummary,
    links: profile?.links || []
  };
}

function buildAudienceDutyTips(destinationDuty = {}, measures = []) {
  const extraText = measures.length ? `${measures[0].title} ${measures[0].rateText}` : "未命中明确额外关税";
  return [
    ["小白先看", `不要只看一个税率。先确认“目的国基础关税”，再看“${extraText}”，不确定就找关务或当地报关行。`],
    ["有经验同事", "核对 HS 位数、原产国、贸易条款、货值、认证/许可证、VAT/GST，以及是否有反倾销、301、232 或保障措施。"],
    ["老手/关务", `打开 ${destinationDuty.authority || "官方税则"} 核验 General/MFN、Special/FTA、additional measures、Chapter 99/贸易救济和实施日期。`],
    ["供应链/业务", "报价和交期要同时考虑关税、额外关税、VAT/GST、清关杂费、DG/港口限制、ETA 变化和合同责任边界。"]
  ];
}

function inferRisks(formText, best) {
  const risks = [];
  const direction = $("tradeDirection").value;
  const destination = $("destination")?.value || "";
  const cargoShape = getCargoShape(formText);

  if (cargoShape.type !== "finished") {
    risks.push(`货物形态：${cargoShape.label}。${cargoShape.reason}`);
  }

  if (/(锂|电池|battery|li-ion|charging case|power bank|充电盒|移动电源)/i.test(formText)) {
    risks.push("Battery / DG：命中电池关键词，请确认 Wh、包装方式、MSDS、UN38.3、运输方式和承运人限制。");
  }
  if (/(wifi|wi-fi|蓝牙|bluetooth|wireless|无线|通信|anc|tws)/i.test(formText)) {
    risks.push("无线功能：可能需要核验无线电型号核准、入网许可、FCC/CE 或 3C 边界。");
  }
  if (/(adapter|适配器|电源|插头|插座|低压|switch)/i.test(formText)) {
    risks.push("电源/低压：随附电源适配器、插头或低压电器时，需单独核验认证和监管条件。");
  }
  if (/(repair|spare|维修|配件|零件)/i.test(formText)) {
    risks.push("维修件：需确认是否专用于某整机、是否单独销售、是否应按零件或主机相关税号判断。");
  }
  if (hasBoardIntent(formText)) {
    risks.push("功能板/电路板：先确认是裸 PCB、已装配 PCBA，还是具有独立功能的模块；专用于功放/音频设备时通常应优先按零件方向复核。");
  }
  if (hasAccessoryIntent(formText)) {
    risks.push("附件/遥控器：先确认是否具备独立功能、是否无线电遥控、是否只是专用备件；不要按被控制的整机直接归类。");
  }
  const ccc = assessCccRequirement(best?.code || "", formText, direction);
  if (ccc.level !== "未明显命中") {
    risks.push(`3C：${ccc.level}。${ccc.conclusion} 需准备：${ccc.materials.slice(0, 3).join("、")}。`);
  }
  const origin = $("originCountry")?.value || "";
  const tradeMeasures = detectExtraTariffs(destination, origin, best?.code || "", formText);
  tradeMeasures.forEach((measure) => {
    risks.push(`额外关税/贸易措施：${measure.title}，${measure.rateText}。${measure.note}`);
  });
  risks.push(direction === "出口" ? "出口：同步核验目的国认证、标签、电池运输和两用物项等特殊管制。" : "进口：同步核验监管条件、检验检疫、关税/增值税率、3C 和原产地政策。");
  if (!best || best.score < 45) risks.push("匹配度偏低：建议补充规格书、用途、材质、功能原理、品牌和型号；当前页面不做图片上传或图片识别。");
  return risks;
}

function hasAlias(value = "", aliases = []) {
  const text = normalize(value);
  if (!text) return false;
  return aliases.some((alias) => {
    const clean = normalize(alias);
    return clean && (text.includes(clean) || clean.includes(text));
  });
}

function matchUsChina301Rate(hs = "") {
  const compact = String(hs || "").replace(/\D/g, "");
  return usChina301PrefixRates.find((row) => row.prefixes.some((prefix) => compact.startsWith(prefix))) || null;
}

function matchChinaUsRetaliatoryRate(hs = "") {
  const compact = String(hs || "").replace(/\D/g, "");
  return chinaUsRetaliatoryPrefixRates.find((row) => row.prefixes.some((prefix) => compact.startsWith(prefix))) || null;
}

function detectExtraTariffs(destination = "", origin = "", hs = "", context = "") {
  const text = `${destination} ${origin} ${hs} ${context}`.toLowerCase();
  const measures = [];
  const usDestination = hasAlias(destination, ["us", "usa", "united states", "美国"]);
  const chinaDestination = hasAlias(destination, ["china", "中国", "大陆", "cn"]);
  const euDestination = hasAlias(destination, ["eu", "欧盟", "欧洲"]);
  const chinaOrigin = hasAlias(origin || context, ["china", "中国", "大陆", "cn", "hong kong", "香港", "macau", "澳门"]);
  const usOrigin = hasAlias(origin || context, ["us", "usa", "united states", "美国"]);

  if (usDestination && chinaOrigin) {
    const rateMatch = matchUsChina301Rate(hs);
    measures.push({
      ...extraTariffProfiles[0],
      rateText: rateMatch?.rateText || "7.5% 或 25% 额外关税，按美国 10 位 HTS 确认",
      note: rateMatch?.basis || extraTariffProfiles[0].note,
      confidence: rateMatch ? "中：已命中常见 HS 前缀，仍需 US HTS 10 位复核" : "低：未命中内置前缀，需要按 US HTS 逐条查",
      scope: "目的国美国 + 中国/港澳原产"
    });
  }

  if (chinaDestination && usOrigin) {
    const specificMeasure = buildSpecificChinaUsMeasure(hs);
    if (specificMeasure) measures.push(specificMeasure);
    measures.push(buildGeneralChinaUsMeasure());
  }

  if (euDestination && /china|中国|battery|ev|steel|aluminum|太阳能|电池|钢|铝/i.test(text)) {
    measures.push({
      ...extraTariffProfiles[3],
      confidence: "中：需按 TARIC additional measures 确认具体税率",
      scope: "目的国欧盟 + 敏感品类/原产地"
    });
  }

  const profileMatches = extraTariffProfiles.filter((profile) => {
    if (measures.some((item) => item.title === profile.title)) return false;
    if (chinaDestination && usOrigin && profile === extraTariffProfiles[2]) return false;
    if (profile.market === "美国" && !usDestination) return false;
    if (profile.market === "中国" && !chinaDestination) return false;
    if (profile.market === "欧盟" && !euDestination) return false;
    const aliasHit = profile.market === "通用" || (profile.aliases || []).some((alias) => alias && text.includes(alias.toLowerCase()));
    if (!aliasHit) return false;
    return (profile.triggers || []).some((pattern) => pattern.test(text));
  });
  measures.push(...profileMatches);
  return measures.slice(0, 4);
}

function dedupeTariffLinks(rows = []) {
  const seen = new Set();
  return rows.filter(([title, url]) => {
    const key = `${title}|${url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildHsDutyAdvice(item = {}, country = "", origin = "", formText = "") {
  const chinaDestination = !String(country || "").trim() || hasAlias(country, ["china", "中国", "大陆", "cn"]);
  const chinaTariff = getChinaTariffDetail(item);
  const chinaReferenceDuty = getCaseDutyText(item);
  const destinationDuty = buildDestinationDutyReference(country, item, chinaReferenceDuty);
  const measures = detectExtraTariffs(country, origin, item.code || "", formText);
  const extraSummary = summarizeExtraMeasures(measures);
  const officialLinks = [
    ["中国税则/税目税号查询", "https://online.customs.gov.cn/ocportal/mySearch/"],
    ["海关总署税目税号查询", "https://app.gjzwfw.gov.cn/jmopen/webapp/html5/smshPC/index.html"],
    ["中国 2026 进出口税则", "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm"],
    ["2026 年关税调整方案", "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251229_3980625.htm"],
    ["USITC HTS", "https://hts.usitc.gov/"],
    ["美国 CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"],
    ["USTR 301 Tariff Actions", "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions"],
    ["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"]
  ];
  const measureLinks = measures.flatMap((item) => item.sources || []);
  return {
    baseDuty: destinationDuty.dutyText,
    baseNote: destinationDuty.note,
    extraSummary,
    chinaReferenceDuty: chinaReferenceDuty || "待官方税则确认",
    chinaReferenceLabel: chinaDestination ? "中国进口当前适用税率" : "中国 HS参考税率",
    chinaReferenceNote: chinaTariff
      ? `来自中国税则基础库：最惠国 ${chinaTariff.mfnRate}，暂定税率 ${chinaTariff.provisionalRate}，普通税率 ${chinaTariff.ordinaryRate}，进口增值税 ${chinaTariff.importVat}。如有暂定税率，当前估算优先采用暂定税率。`
      : chinaReferenceDuty
        ? chinaDestination
          ? "适用于中国进口初筛；正式仍以中国税则和海关查询为准。"
          : "这是中国 HS 历史/内置参考，不等于目的国税率。"
      : "当前候选税号没有从脱敏历史表读取到税率字段；不是没有税率，而是需要导入完整中国税则或到官方入口核验。",
    destinationDuty,
    measures,
    audienceTips: buildAudienceDutyTips(destinationDuty, measures),
    officialLinks: dedupeTariffLinks([
      ...measureLinks,
      ...(destinationDuty.links || []),
      ...(chinaTariff ? [[chinaTariff.sourceTitle, chinaTariff.sourceUrl], ["海关税目税号查询", chinaTariff.verifyUrl || "https://online.customs.gov.cn/ocportal/mySearch/"]] : []),
      ...officialLinks
    ])
  };
}

const cccCatalogFieldSets = {
  power: ["额定输入/输出电压电流", "插头形式和是否随整机销售", "型号系列差异", "证书持有人/生产厂", "中文铭牌和说明书"],
  audio: ["是否完整音视频设备", "供电方式和额定电压", "是否中国内销/销售", "型号、铭牌、说明书", "是否随附电源适配器"],
  wireless: ["无线频段和发射功率", "是否完整产品或无线模块", "SRRC/无线型号核准资料", "电池/电源适配器资料", "中文标签和说明书"],
  part: ["是否只是维修备件/生产配套件", "对应整机型号和用途", "是否单独面向消费者销售", "是否随整机一起进口", "是否有独立电气功能"],
  packaging: ["包装材质：瓦楞纸/纸板/彩盒", "包装形态：箱/盒/匣/袋", "是否单独进口包装材料", "规格尺寸如已知", "印刷/品牌/型号如有"],
  unknown: ["完整品名", "用途/成品或零件边界", "主要材质", "品牌和型号如有", "进口用途：销售、维修、样品或生产配套"]
};

const cccCatalogRules = [
  {
    id: "power-adapter",
    level: "高关注",
    tone: "rose",
    title: "电源适配器/充电器常见 3C 高关注",
    hsPrefixes: ["85044013", "85044014", "85044019", "850440"],
    keywords: /电源适配器|适配器|充电器|电源供应器|power adapter|charger|power supply/i,
    fields: cccCatalogFieldSets.power,
    conclusion: "如作为中国内销电源适配器/充电器，通常应按 3C 高关注处理；先准备证书、型号差异和铭牌资料。"
  },
  {
    id: "audio-video",
    level: "可能涉及",
    tone: "amber",
    title: "完整音视频设备可能涉及 3C 目录边界",
    hsPrefixes: ["851821", "851822", "851829", "851840", "851850", "8521", "8527", "8528"],
    keywords: /完整音箱|音箱成品|功放机|音频扩大器|播放器|soundbar|speaker|amplifier|player/i,
    fields: cccCatalogFieldSets.audio,
    conclusion: "完整音箱、功放、播放器等需要结合 CNCA 目录、供电方式、用途和内销场景判断；不要只凭 HS 下最终结论。"
  },
  {
    id: "wireless",
    level: "可能涉及",
    tone: "amber",
    title: "无线/蓝牙产品需同步核验 3C 与 SRRC",
    hsPrefixes: ["851762", "851830", "852692"],
    keywords: /蓝牙|无线|wifi|wi-fi|射频|bluetooth|wireless|rf/i,
    fields: cccCatalogFieldSets.wireless,
    conclusion: "无线/蓝牙不等于一定 3C，但 SRRC、标签、电池和电源适配器边界必须同步核验。"
  },
  {
    id: "audio-part",
    level: "边界复核",
    tone: "blue",
    title: "851890 等音频设备零件通常不是整机 3C 直接命中",
    hsPrefixes: ["851890"],
    keywords: /零件|配件|部件|维修|功能板|电路板|pcba|pcb|高音单元|低音单元|remote|遥控器/i,
    fields: cccCatalogFieldSets.part,
    conclusion: "零件/备件通常不直接按整机 3C 判断，但如果随整机进口、作为内销整机组成部分或具独立功能，需让关务/认证同事复核。"
  }
];

function cccMatchesFor(hs = "", product = "") {
  const code = compactHs(hs);
  const text = `${hs} ${product}`.toLowerCase();
  return cccCatalogRules.filter((rule) => {
    const hsHit = code && (rule.hsPrefixes || []).some((prefix) => code.startsWith(prefix));
    const wordHit = !code && rule.keywords?.test(text);
    const reinforceWordHit = code && rule.keywords?.test(text);
    return hsHit || wordHit || reinforceWordHit;
  });
}

function assessCccRequirement(hs = "", product = "", scenario = "") {
  const matches = cccMatchesFor(hs, product);
  const exportOnly = /出口|export/i.test(scenario);
  const code = compactHs(hs);
  const packagingLike = /^4819/.test(code) || hasPackagingIntent(product);
  if (!matches.length) {
    return {
      level: "未明显命中",
      tone: "green",
      title: "当前信息未明显命中 3C 高风险边界",
      catalogHit: false,
      catalogVerdict: code ? "未命中内置 3C HS 目录边界" : "未填写税号，无法按 HS 判断目录命中",
      catalogDetail: code
        ? packagingLike
          ? `HS ${code} 属于包装材料方向，当前不触发电池、无线或电源方式补充项；按包装材质、形态和是否单独进口继续补充。`
          : `HS ${code} 暂未命中系统内置的 3C 高关注 HS 前缀。注意：3C 最终仍按 CNCA 产品目录、用途和销售场景判断，不能只凭 HS 下最终结论。`
        : "请先填写或带入推荐税号；系统会先按 HS 前缀判断是否落入内置 3C 目录边界。",
      conclusion: exportOnly
        ? "出口场景通常先看目的国认证；如产品后续进口中国内销，再按 3C 目录核验。"
        : packagingLike
          ? "包装材料当前不按电池/无线/电源方向补料；重点确认材质、结构、规格、是否印刷和是否单独进口。"
          : "未明显命中 3C 目录高风险项；如实际含电源、无线或电池，再单独补充对应资料。",
      materials: packagingLike ? cccCatalogFieldSets.packaging : cccCatalogFieldSets.unknown,
      fields: packagingLike ? cccCatalogFieldSets.packaging : cccCatalogFieldSets.unknown,
      sources: [["CNCA 国家认监委", "https://www.cnca.gov.cn/"], ["市场监管总局", "https://www.samr.gov.cn/"], ["海关总署", "http://www.customs.gov.cn/"]]
    };
  }
  const likely = matches.some((item) => item.level === "高关注");
  const boundaryOnly = matches.every((item) => item.level === "边界复核");
  const materials = Array.from(new Set(matches.flatMap((item) => item.fields || [])));
  const catalogVerdict = boundaryOnly
    ? "命中内置 3C 零件/边界复核项"
    : likely
      ? "命中内置 3C 高关注 HS 目录边界"
      : "命中内置 3C 可能涉及 HS 目录边界";
  const catalogDetail = code
    ? `HS ${code} ${catalogVerdict}：${matches.map((item) => item.title).join("；")}。正式仍需用 CNCA 目录、实施规则、产品用途和进口场景确认。`
    : `${catalogVerdict}：当前主要由品名关键词触发，建议补 HS 后重新判断。`;
  return {
    level: boundaryOnly ? "边界复核" : likely ? "高关注" : "可能涉及",
    tone: boundaryOnly ? "blue" : likely ? "rose" : "amber",
    title: matches.map((item) => item.title).join("；"),
    catalogHit: !boundaryOnly,
    catalogVerdict,
    catalogDetail,
    conclusion: exportOnly
      ? "当前为出口场景，3C 不一定适用，但如果后续进口中国销售/内销，需要按目录边界核验。"
      : likely
        ? "建议按 3C 高关注处理：先准备认证资料，再让关务/认证同事确认目录边界。"
        : boundaryOnly
          ? "当前更像零件/备件边界：通常不直接按整机 3C 下结论，但要补充用途和销售场景防止误判。"
          : "建议作为 3C 可能涉及处理：先确认是否属于目录内产品或配套电源/无线边界。",
    materials,
    fields: materials,
    notes: matches.map((item) => item.conclusion),
    sources: [["CNCA 国家认监委", "https://www.cnca.gov.cn/"], ["强制性产品认证公告核验", "https://www.cnca.gov.cn/zwxx/gg/"], ["市场监管总局", "https://www.samr.gov.cn/"]]
  };
}

function renderCccDecision(advice = {}) {
  return `
    <article class="decision-card tone-${escapeHtml(advice.tone || "amber")} ccc-decision-card">
      <span>税号目录结论</span>
      <strong>${escapeHtml(advice.catalogVerdict || "待判断")}</strong>
      <p>${escapeHtml(advice.catalogDetail || advice.conclusion || "")}</p>
      <div class="ccc-verdict-row">
        <em>${escapeHtml(advice.level || "待判断")}</em>
        ${advice.title ? `<small>${escapeHtml(advice.title)}</small>` : ""}
      </div>
      <div class="ccc-material-block">
        <b>进一步判断需要补充</b>
        <ul>${(advice.materials || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div class="ccc-quick-guide">
        <b>快速判断路径</b>
        <p>先看是否进口中国内销；再看 HS/品名是否落入 3C 目录边界；然后确认是不是完整产品、是否随附电源/无线/电池；最后用 CNCA/认证机构或关务意见定稿。</p>
      </div>
      <div class="ccc-input-grid">
        ${(advice.fields || advice.materials || []).slice(0, 6).map((item) => `
          <label>
            <span>${escapeHtml(item)}</span>
            <input lang="zh-CN" placeholder="待补充" />
          </label>
        `).join("")}
      </div>
      <div class="source-chip-grid">
        ${(advice.sources || []).map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
      </div>
    </article>
  `;
}

function evaluateCccCheck(event) {
  event.preventDefault();
  const hs = $("cccHsInput")?.value || "";
  const product = $("cccProductInput")?.value || "";
  const scenario = $("cccUseScenario")?.value || "";
  const advice = assessCccRequirement(hs, product, scenario);
  $("cccCheckResult").innerHTML = renderCccDecision(advice);
  openResultDialog("3C 认证初筛", "系统已按税号和产品描述生成材料提醒。正式仍需 CNCA/认证机构确认。", renderCccDecision(advice));
}

function fillCccFromCurrentHs() {
  const code = $("bestCode")?.textContent?.trim();
  if ($("cccHsInput") && code && code !== "-") $("cccHsInput").value = code;
  if ($("cccProductInput")) {
    $("cccProductInput").value = [$("productName")?.value, $("englishName")?.value, $("spec")?.value].filter(Boolean).join("；");
  }
}

function buildClassificationProof(item = {}, formText = "") {
  const shape = item.cargoShape || getCargoShape(formText);
  const host = getHostFamily(formText);
  const interpretation = getHsInterpretation(item.code);
  const shapeReasons = item.shapeFit?.reasons || [];
  const sourceEvidence = item.sourceFile
    ? `公司样例库：来自 ${item.sourceFile}${item.sourceSheet ? ` / ${item.sourceSheet}` : ""}，聚合 ${Number(item.exampleCount || 1)} 条脱敏历史样例。`
    : "";
  const reasons = [
    `货物形态：${shape.label}。${shape.reason}`,
    host.type !== "unknown" ? `对应主机/品目：${host.label}。${host.reason}` : "",
    `税则含义：${interpretation.legalName}。${interpretation.scope}`,
    item.classificationHint || "",
    sourceEvidence,
    interpretation.boundary,
    ...shapeReasons
  ].filter(Boolean);
  return { shape, host, interpretation, reasons };
}

function buildReviewChecklist(formText = "", best = {}) {
  const shape = best?.cargoShape || getCargoShape(formText);
  const host = getHostFamily(formText);
  const items = [
    "产品图片、规格书、BOM 或结构说明",
    "用途说明：是否专用于某一类整机，还是通用件",
    "品牌、型号、材质、功能原理和是否单独销售"
  ];
  if (shape.type === "speaker-part") {
    items.push("确认是高音/低音/中音单元，还是带箱体的完整音箱");
    items.push("确认是否专用于 8518 项下音频设备，以及是否可独立作为扬声器成品使用");
  }
  if (shape.type === "speaker-no-enclosure") {
    items.push("确认是否无箱体/未装入箱体；如果带箱体，应改看单喇叭或多喇叭音箱。");
    items.push("补喇叭数量、尺寸、额定功率、用途、是否嵌入式/车载/维修用途。");
  }
  if (shape.type === "pcba-part" || shape.type === "board") {
    items.push("确认是裸 PCB、已装配 PCBA，还是已经具备独立功能的模块");
    items.push("确认板件是否只服务于音频设备，还是可通用于其他电子设备");
  }
  if (shape.type === "accessory") {
    items.push("确认附件是否具有独立功能，例如遥控器、无线控制器、充电盒");
    items.push("确认是否含电池、无线发射、型号核准或 3C/认证要求");
  }
  if (shape.type === "packaging") items.push("确认纸箱/彩盒材质、瓦楞结构、是否成套零售包装");
  if (shape.type === "cable") items.push("确认是否带接插件、电压、用途、是否为同轴/音频线/电源线");
  if (host.type === "unknown") items.push("补充对应整机或最终用途，否则只能给章级方向。");
  return items;
}

function buildCounterEvidence(formText = "", best = {}) {
  const shape = best?.cargoShape || getCargoShape(formText);
  const host = getHostFamily(formText);
  const rows = [];
  const add = (code, name, reason) => rows.push({ code, name, reason });

  if (shape.type === "speaker-no-enclosure") {
    add("851822", "多喇叭音箱", "需要带箱体并作为多喇叭音箱成品。只写“扬声器/喇叭”且未说明箱体时，不应直接按多喇叭音箱。");
    add("851821", "单喇叭音箱", "需要确认装入箱体并作为完整单喇叭音箱使用；无箱体或嵌入式扬声器通常先看 851829。");
    add("851890", "税目 8518 的零件", "如果只是高音/低音单元、维修件或专用于音箱内部的零件才转看 851890；普通无箱体扬声器不自动按零件。");
  }

  if (shape.type !== "finished" && shape.type !== "speaker-no-enclosure" && !isExplicitFinishedGoodsText(formText)) {
    if (host.type === "audio-8518") {
      add("851821/851822/851829", "单喇叭/多喇叭/其他音箱成品", "这些税号对应完整音箱或扬声器成品；若货物只是音箱内部单元、网罩、支架、功能板等，应先看零件逻辑。");
      add("851840", "音频扩大器/功放成品", "如果货物只是功放用功能板、连接器、集成块或结构件，不能因用途指向功放就按功放成品。");
    }
    add("整机税号", "按产品名称直接匹配的成品税号", "出现“用于/适用于/配件/零件/单元/功能板”等信号时，整机税号只作为反证，不作为首选。");
  }
  if (shape.type === "speaker-part") {
    add("851822", "多喇叭音箱", "高音单元/低音单元不是完整多喇叭音箱；除非它与箱体和其他组件组成可直接使用的完整音箱。");
  }
  if (shape.type === "display-panel") {
    add("851822", "多喇叭音箱", "LCD/显示板组件不是带箱体的完整多喇叭音箱，不能因为描述里有“音箱用”就按音箱成品。");
    add("851890", "税目 8518 的音频设备零件", "显示板/指示面板的核心功能是显示或指示，不是发声、音频扩大或 8518 列名货品的普通专用音频零件；应先看 853120。");
    add("854370", "其他独立功能电气设备", "如果只是显示/指示面板，853120 比 854370 更具体；只有不符合指示板/显示板描述时再看其他独立功能设备。");
  }
  if (shape.type === "pcba-part" || shape.type === "board") {
    add("8534", "印刷电路板", "只有裸 PCB 或未装配电路板才优先看 8534；已装配 PCBA 需要继续看是否专用零件或独立功能模块。");
    add("8543", "其他独立功能电气设备", "如果模块脱离主机仍具备独立功能，可能要看 8543；若只是专用于音频设备内部，通常先看零件。");
  }
  if (shape.type === "accessory") {
    add("被控制设备成品税号", "功放/音箱/播放器成品", "遥控器或控制器按自身功能、无线属性和是否专用判断，不能直接按被控制的设备成品。");
  }
  if (shape.type === "bare-pcb") {
    add("851890/852990", "整机零件税号", "裸板通常先看印刷电路板方向；只有已装配或具备专用零件属性时才进入整机零件逻辑。");
  }
  if (!rows.length) {
    add("零件税号", "零部件方向", "当前输入更像完整成品；如果实际是备件或拆分件，需要补充用途和结构后重新判断。");
  }
  return rows.slice(0, 5);
}

function buildClassificationTree(formText = "", best = {}, ranked = []) {
  const shape = best?.cargoShape || getCargoShape(formText);
  const host = getHostFamily(formText);
  const interpretation = getHsInterpretation(best?.code || "");
  const counterEvidence = buildCounterEvidence(formText, best);
  return {
    steps: [
      ["1. 货物形态", `${shape.label}：${shape.reason}`],
      ["2. 对应主机/品目", host.type === "unknown" ? host.reason : `${host.label}：${host.reason}`],
      ["3. 候选税号", best?.code ? `${best.code}：${interpretation.legalName}` : "未形成可用候选，需要补充资料。"],
      ["4. 排除/反证", counterEvidence.map((row) => `${row.code} ${row.name}`).join("；") || "暂无明确反证。"],
      ["5. 人工复核", buildReviewChecklist(formText, best).slice(0, 3).join("；")]
    ],
    host,
    shape,
    counterEvidence,
    reviewChecklist: buildReviewChecklist(formText, best),
    ranked
  };
}

function hasFieldSignal(formText = "", pattern) {
  return pattern.test(formText);
}

function getRequiredFieldGroups(formText = "", best = {}) {
  const shape = best?.cargoShape || getCargoShape(formText);
  const host = getHostFamily(formText);
  const value = normalize(formText);
  const originInput = typeof document !== "undefined" ? String($("originCountry")?.value || $("tariffCheckOrigin")?.value || "").trim() : "";
  const destinationInput = typeof document !== "undefined" ? String($("destination")?.value || $("tariffCheckCountry")?.value || "").trim() : "";
  const isHeadphone = /耳机|耳塞|headphone|headset|earbud|tws/i.test(value);
  const isHeadphoneFinished = isHeadphone && shape.type === "finished" && !hasExplicitHeadphonePartIntent(value);
  const isSpeaker = !isHeadphoneFinished && (shape.type === "speaker-no-enclosure" || shape.type === "speaker-part" || /音箱|扬声器|喇叭|speaker|loudspeaker|soundbar/i.test(value));
  const isBoard = !isHeadphoneFinished && (shape.type === "pcba-part" || shape.type === "board" || shape.type === "bare-pcb" || hasBoardIntent(value));
  const isBattery = shape.type === "battery" || (!isHeadphoneFinished && /锂电池|电池组|电芯|battery|li-ion|lithium/i.test(value));
  const isPower = shape.type === "power-supply" || /电源适配器|充电器|电源供应器|power adapter|charger|power supply/i.test(value);
  const isCable = shape.type === "cable" || /连接线|线缆|电缆|数据线|音频线|cable|connector/i.test(value);
  const isPackaging = shape.type === "packaging" || /纸箱|瓦楞|彩盒|包装盒|carton|packaging/i.test(value);
  const electronicsLike = !isPackaging && (isHeadphone || isSpeaker || isBoard || isBattery || isPower || isCable || shape.type === "display-panel" || /电子|电气|音频|蓝牙|无线|电源|电池|adapter|battery|wireless|audio|electronic/i.test(value));
  const hasDestination = Boolean(destinationInput) || hasFieldSignal(value, /目的国|进口国|出口到|销往|中国|美国|欧盟|英国|日本|泰国|巴西|加拿大|墨西哥|中东|沙特|阿联酋|china|us|usa|eu|uk|japan|thailand|brazil|canada|mexico|gcc|uae|saudi/i);
  const hasOrigin = Boolean(originInput) || hasFieldSignal(value, /原产|产地|origin|made\s+in/i);
  const groups = [
    {
      title: "归类必填",
      items: [
        ["品名/商品本体", value.length >= 2, "写清楚货物本身是什么，不要只写项目名或系列名。"],
        ["成品/零件/附件", hasFieldSignal(value, /成品|整机|完整|零件|部件|配件|附件|备件|维修|单元|裸|pcba|pcb|板|箱体|无箱体|finished|complete|part|spare|accessor/i), "必须说明是完整成品，还是某个产品用零件/附件。"],
        ["核心功能/用途", hasFieldSignal(value, /用途|用于|播放|发声|放大|控制|充电|连接|接收|传输|包装|安装|function|use|play|amplif|control|charge|connect/i), "说明它做什么、最终用在哪里。"],
        ["结构形态", hasFieldSignal(value, /箱体|无箱体|外壳|裸|板|线|单元|模块|组件|套装|带接头|内置|随附|with|without|enclosure|board|module|unit|cable/i), "说明有无箱体、是否裸件、是否成套、是否装配。"],
        ["材质/组成", hasFieldSignal(value, /塑料|金属|纸|瓦楞|电路|元器件|锂|电池|磁|喇叭|扬声器|铜|铝|steel|plastic|metal|paper|battery|pcb/i), "说明主要材料和关键组成。"],
        ["规格/型号参数", hasFieldSignal(value, /型号|品牌|功率|电压|wh|mah|尺寸|频段|蓝牙|无线|有线|w\b|v\b|model|brand|power|voltage|bluetooth|wireless/i), "补型号、功率、尺寸、无线/电池等关键参数。"]
      ]
    },
    {
      title: "分支必填",
      items: [
        isSpeaker ? ["扬声器边界", hasSpeakerEnclosureSignal(value) || hasSpeakerNoEnclosureSignal(value) || hasSpeakerUnitSignal(value), "扬声器必须确认：有无箱体、是否完整音箱、喇叭数量、是否只是高音/低音单元。"] : null,
        isSpeaker ? ["喇叭数量/尺寸/功率", hasFieldSignal(value, /单喇叭|多喇叭|一个|两个|三|四|[1-9]\s*(个|只|pcs?)|寸|mm|w\b|瓦|功率/i), "区分 851821、851822、851829 时很关键。"] : null,
        isBoard ? ["板件状态", hasFieldSignal(value, /裸板|未装配|已装配|贴片|焊接|元器件|pcba|pcb|独立功能|专用|bare|assembled|component/i), "裸 PCB、已装配 PCBA、独立功能模块、专用零件不能混在一起判断。"] : null,
        isHeadphone ? ["耳机连接方式", hasFieldSignal(value, /蓝牙|无线|有线|tws|bluetooth|wireless|wired/i), "区分无线耳机、有线耳机和可能的通信设备边界。"] : null,
        isHeadphone ? ["耳机电池/充电盒", hasFieldSignal(value, /电池|锂|充电盒|wh|mah|battery|charging case/i), "蓝牙耳机常涉及锂电池、充电盒和运输文件。"] : null,
        isBattery ? ["电池包装方式", hasFieldSignal(value, /单独|装在设备|与设备|随设备|un3480|un3481|un3090|un3091|battery only|contained|packed/i), "电池单独运输和装在设备中，税号和 DG 资料判断不同。"] : null,
        isBattery ? ["电池容量/UN 编号", hasFieldSignal(value, /wh|mah|un3480|un3481|un3090|un3091|容量|荷电|soc/i), "需要 Wh、UN 编号、SOC、MSDS/UN38.3 才能判断运输风险。"] : null,
        isPower ? ["电源输入输出", hasFieldSignal(value, /输入|输出|5v|9v|12v|v\b|a\b|w\b|功率|电压|电流|input|output/i), "适配器归类和 3C 判断必须看电气参数。"] : null,
        isPower ? ["是否随整机/内销", hasFieldSignal(value, /随整机|单独|内销|销售|样品|维修|with equipment|standalone/i), "决定是否按单独适配器、随附件或认证边界处理。"] : null,
        isCable ? ["线缆结构", hasFieldSignal(value, /带接头|接插件|接口|usb|dc|jack|电压|线长|connector|plug|voltage/i), "线缆要看是否带接插件、额定电压和接口类型。"] : null,
        isPackaging ? ["包装材质/形态", hasFieldSignal(value, /瓦楞|纸板|彩盒|折叠|印刷|层|corrugated|paperboard|printed/i), "纸箱/包装要按材质、结构和是否单独进口判断。"] : null,
        electronicsLike ? ["无线/电池/电源", hasFieldSignal(value, /蓝牙|无线|wifi|wi-fi|电池|锂|wh|mah|适配器|电源|插头|无电池|无蓝牙|无无线|bluetooth|wireless|battery|adapter/i), "电子/音频产品才需要确认；没有也可以写“无”。"] : null
      ].filter(Boolean)
    },
    {
      title: "税费/准入必填",
      items: [
        ["进口国/目的国", hasDestination, "决定基础关税、目的国认证、标签和文件要求。"],
        ["原产国", hasOrigin, "决定额外关税、贸易救济、FTA 或原产地标识。"],
        ["交易/运输场景", hasFieldSignal(value, /进口|出口|空运|海运|快递|维修|退运|样品|销售|import|export|air|sea|courier|sample|repair/i), "影响监管证件、DG、申报资料和交付风险。"]
      ]
    }
  ];
  if (shape.type !== "finished" && host.type === "unknown") {
    groups[1].items.push(["对应主机", false, "零件/附件必须说明用于哪类整机，否则只能给很粗的方向。"]);
  }
  return groups;
}

function getFieldCompleteness(formText = "", best = {}) {
  const shape = best?.cargoShape || getCargoShape(formText);
  const host = getHostFamily(formText);
  const missing = getRequiredFieldGroups(formText, best)
    .flatMap((group) => group.items)
    .filter(([, ok]) => !ok)
    .map(([label]) => label);
  if (!formText || formText.length < 6) missing.push("产品描述太少");
  if (shape.type !== "finished" && host.type === "unknown") missing.push("缺对应主机或最终用途");
  if (shape.type === "finished" && !isExplicitFinishedGoodsText(formText)) missing.push("需确认是否完整成品");
  if (shape.type === "pcba-part" || shape.type === "board") missing.push("需确认裸 PCB / 已装配 PCBA / 独立功能模块");
  if (shape.type === "speaker-part") missing.push("需确认是否仅为扬声器单元而非完整音箱");
  if (shape.type === "accessory") missing.push("需确认是否具备独立功能、无线或电池");
  if (shape.type === "speaker-no-enclosure" && !hasSpeakerNoEnclosureSignal(formText)) missing.push("需确认是否无箱体/未装入箱体");
  if (shape.type === "battery") missing.push("需确认 UN 编号、Wh、包装方式和 MSDS/UN38.3");
  if (shape.type === "power-supply") missing.push("需确认输入/输出参数、功率、插头和是否中国内销");
  if (shape.type === "cable") missing.push("需确认是否带接插件、额定电压和接口类型");
  if (shape.type === "packaging") missing.push("需确认纸箱/包装材质、结构和是否单独进口");
  return Array.from(new Set(missing));
}

function buildCredibilityAssessment(best = {}, ranked = [], formText = "") {
  if (!best?.code) {
    return {
      level: "block",
      label: "禁止直接使用",
      score: 0,
      tone: "rose",
      summary: "没有形成可用候选税号。",
      reasons: ["输入信息不足或规则库未命中。"],
      action: "补充完整品名、规格书、用途、材质、品牌/型号和目的国后重新判断；当前页面不上传或识别图片。"
    };
  }
  const missing = getFieldCompleteness(formText, best);
  const classificationMissing = missing.filter((item) => !/进口国|目的国/.test(item));
  const taxMissing = missing.filter((item) => /进口国|目的国/.test(item));
  const rankScore = best.rankScore || best.score || 0;
  const second = ranked[1];
  const margin = second ? rankScore - (second.rankScore || second.score || 0) : 99;
  const bestRole = getCandidateRole(best);
  const secondRole = second ? getCandidateRole(second) : "";
  const sameRoleClose = second && bestRole === secondRole && margin < 20;
  const roleConflict = second && bestRole !== secondRole && margin < 35;
  const inputConflict = getCandidateInputConflict(best, formText);
  const reasons = [];
  if (rankScore < 45) reasons.push("候选得分偏低。");
  if (sameRoleClose) reasons.push("同一货物形态下子目接近，需要确认子目细节。");
  else if (margin < 20) reasons.push("前两个候选差距小。");
  if (roleConflict) reasons.push("候选之间存在货物形态冲突。");
  if (inputConflict) reasons.push(`产品类别与候选税号冲突：${inputConflict.message}`);
  if (classificationMissing.length) reasons.push(`归类缺资料：${classificationMissing.slice(0, 3).join("、")}。`);
  if (taxMissing.length) reasons.push(`税费/准入缺资料：${taxMissing.join("、")}。`);
  if (best.shapeFit?.reasons?.length) reasons.push(...best.shapeFit.reasons.slice(0, 2));

  let level = "medium";
  let label = "中可信";
  let tone = "amber";
  let summary = "可作为初筛方向，但需要补资料和人工复核。";
  let action = "补齐资料后交关务/报关行复核。";
  if (rankScore < 45 || classificationMissing.length >= 4) {
    level = "block";
    label = "禁止直接使用";
    tone = "rose";
    summary = "当前信息不足，不建议用于报价或申报。";
    action = "先补产品资料，再重新生成。";
  } else if (roleConflict || classificationMissing.length >= 2 || margin < 20) {
    level = "low";
    label = "低可信";
    tone = "rose";
    summary = "存在冲突或关键信息缺口，需要人工判断。";
    action = "把反证和缺资料点发给关务确认。";
    if (sameRoleClose && classificationMissing.length < 2) {
      level = "medium";
      label = "中可信";
      tone = "amber";
      summary = "归类方向较清楚，但同类子目需要补充细节后确认。";
      action = "确认关键细分条件后再用于报价或申报。";
    }
  } else if (rankScore >= 85 && classificationMissing.length <= 1 && margin >= 25) {
    level = "high";
    label = "高可信";
    tone = "green";
    summary = "规则、货物形态和候选税号较一致，可作为优先候选。";
    action = "正式申报前仍需按官方税则和报关行复核。";
  }
  if (inputConflict) {
    level = "block";
    label = "必须人工复核";
    tone = "rose";
    summary = `产品画像是“${inputConflict.profile}”，但候选税号方向不一致；不能按该结果报价、申报或给新人直接使用。`;
    action = `先确认成品/零件边界，再按 ${inputConflict.expected} 重新核验，并交关务或报关行复核。`;
  }
  return {
    level,
    label,
    usableLabel: level === "high" ? "可用初筛" : level === "medium" ? "谨慎使用" : level === "low" ? "人工复核" : "必须复核",
    score: Math.min(94, Math.max(0, best.score || 0)),
    tone,
    summary,
    reasons: reasons.length ? Array.from(new Set(reasons)).slice(0, 5) : ["规则、货物形态和候选税号之间未发现明显冲突。"],
    missing,
    classificationMissing,
    taxMissing,
    action
  };
}

function renderCredibilityStrip(assessment = {}, tree = {}) {
  const reasons = (assessment.reasons || []).slice(0, 3);
  return `
    <div class="credibility-card tone-${escapeHtml(assessment.tone || "amber")}">
      <span>结论等级</span>
      <strong>${escapeHtml(assessment.label || "待判断")}</strong>
      <p>${escapeHtml(assessment.summary || "")}</p>
    </div>
    <div class="credibility-card">
      <span>需要补充</span>
      <strong>${escapeHtml((assessment.missing || [])[0] || "资料基本够初筛")}</strong>
      <p>${escapeHtml(reasons.join("；"))}</p>
    </div>
    <div class="credibility-card">
      <span>下一步</span>
      <strong>${escapeHtml(tree?.host?.label || "人工复核")}</strong>
      <p>${escapeHtml(assessment.action || "正式申报前复核。")}</p>
    </div>
  `;
}

function renderRequiredFieldMatrix(formText = "", best = {}) {
  const groups = getRequiredFieldGroups(formText, best);
  return `
    <div class="required-field-matrix">
      <div class="required-field-head">
        <h3>判断 HS Code 前必须确认的字段</h3>
        <p>绿色表示当前输入已有线索；红色表示会影响归类、税费或合规判断，正式使用前必须补齐。</p>
      </div>
      <div class="required-field-grid">
        ${groups
          .map(
            (group) => `
              <article>
                <strong>${escapeHtml(group.title)}</strong>
                ${(group.items || [])
                  .map(
                    ([label, ok, note]) => `
                      <div class="${ok ? "field-ok" : "field-missing"}">
                        <span>${ok ? "已覆盖" : "需补充"}</span>
                        <b>${escapeHtml(label)}</b>
                        <small>${escapeHtml(note)}</small>
                      </div>
                    `
                  )
                  .join("")}
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderClassificationTree(tree = {}) {
  return `
    <div class="classification-tree">
      ${(tree.steps || [])
        .map(
          ([title, text]) => `
            <article>
              <span>${escapeHtml(title)}</span>
              <p>${escapeHtml(text)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCounterEvidence(rows = []) {
  return `
    <div class="counter-evidence">
      <h3>为什么不是这些税号</h3>
      ${rows
        .map(
          (row) => `
            <article>
              <strong>${escapeHtml(row.code)} · ${escapeHtml(row.name)}</strong>
              <p>${escapeHtml(row.reason)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderReviewChecklist(items = []) {
  return `
    <div class="review-checklist">
      <h3>正式复核还要补什么</h3>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function renderDutyFormulaPanel(duty = {}) {
  const measures = duty.measures || [];
  const summary = duty.extraSummary || summarizeExtraMeasures(measures);
  return `
    <div class="duty-formula-panel">
      <article>
        <span>基础关税</span>
        <strong>${escapeHtml(duty.baseDuty || duty.destinationDuty?.dutyText || "待确认")}</strong>
        <p>${escapeHtml(duty.destinationDuty?.note || duty.baseNote || "正式以官方税则和通关时口径为准。")}</p>
      </article>
      <article class="alert">
        <span>额外关税</span>
        <strong>${escapeHtml(summary.label)}</strong>
        <p>${escapeHtml(measures.length ? measures.map((item) => `${item.title}：${item.rateText}`).join("；") : "未命中内置清单，不代表一定没有。")}</p>
      </article>
      <article>
        <span>核验来源</span>
        <strong>${escapeHtml(duty.destinationDuty?.authority || "官方税则/公告")}</strong>
        <p>${escapeHtml(measures[0]?.confidence || measures[0]?.scope || "先看官方税则，再看额外贸易措施。")}</p>
      </article>
    </div>
  `;
}

function buildRecommendationDialogHtml(best, ranked = [], confidence = 0, formText = "") {
  const proof = buildClassificationProof(best || {}, formText);
  const tree = buildClassificationTree(formText, best, ranked);
  const assessment = buildCredibilityAssessment(best, ranked, formText);
  const bestDuty = best ? buildHsDutyAdvice(best, $("destination")?.value || "", $("originCountry")?.value || "", formText) : null;
  const bestCcc = best ? assessCccRequirement(best.code, formText, $("tradeDirection")?.value || "") : null;
  const candidates = ranked
    .map((item, index) => {
      const itemProof = buildClassificationProof(item, formText);
      const duty = buildHsDutyAdvice(item, $("destination")?.value || "", $("originCountry")?.value || "", formText);
      return `
        <article class="modal-candidate ${index === 0 ? "primary" : ""}">
          <div>
            <span>${index === 0 ? "首选" : `备选 ${index + 1}`}</span>
            <strong>${escapeHtml(item.code)} · ${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(itemProof.interpretation.legalName)}；${escapeHtml(itemProof.shape.label)}；匹配分 ${escapeHtml(String(item.score || 0))}，不是海关确认概率</p>
          </div>
          <small>${escapeHtml(duty.extraSummary?.label || "未命中明确额外关税")}</small>
        </article>
      `;
    })
    .join("");
  return `
    <div class="modal-result-summary">
      <div>
        <span>推荐税号</span>
        <strong>${escapeHtml(best?.code || "暂无候选")}</strong>
        <p>${escapeHtml(best?.name || "请补充产品信息或导入更多规则。")}</p>
      </div>
      <div>
        <span>结论等级</span>
        <strong>${escapeHtml(assessment.label)}</strong>
        <p>${escapeHtml(assessment.summary)}</p>
      </div>
    </div>
    <div class="modal-proof credibility-proof">
      <h3>可信度依据</h3>
      <ul>${assessment.reasons.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      <p>${escapeHtml(assessment.action)}</p>
    </div>
    ${renderHsCaseStatus(best, formText)}
    <div class="modal-proof">
      <h3>为什么这样判断</h3>
      <ul>${proof.reasons.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
    </div>
    ${bestDuty ? renderDutyFormulaPanel(bestDuty) : ""}
    ${bestCcc ? `<div class="modal-proof ccc-proof">${renderCccDecision(bestCcc)}</div>` : ""}
    ${renderRequiredFieldMatrix(formText, best)}
    ${buildDialogRefillPanel(formText)}
    ${renderClassificationTree(tree)}
    ${renderCounterEvidence(tree.counterEvidence)}
    ${renderReviewChecklist(tree.reviewChecklist)}
    <div class="modal-candidate-list">
      ${candidates}
    </div>
  `;
}

function dedupeRankedCandidates(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = compactHs(item.code).slice(0, 10) || `${item.code}|${item.name}`;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function rankHsCandidates(formText = "") {
  const scored = state.cases
    .map((item) => scoreCase(item, formText))
    .sort((a, b) => (b.rankScore || b.score) - (a.rankScore || a.score));
  const profile = getExpectedHsProfile(formText);
  const profileAligned = profile ? scored.filter((item) => !getCandidateInputConflict(item, formText)) : scored;
  const pool = profile && profileAligned.some((item) => (item.rankScore || item.score) > 0) ? profileAligned : scored;
  const strongScored = pool.filter((item) => (item.rankScore || item.score) > 45);
  const positiveScored = pool.filter((item) => (item.rankScore || item.score) > 0);
  const ranked = dedupeRankedCandidates(strongScored.length ? strongScored : positiveScored.length ? positiveScored : pool)
    .slice(0, 3);
  return { scored, ranked, best: ranked[0] || null };
}

function buildHsCaseFormText(testCase = {}) {
  const values = testCase.values || {};
  return [
    values.productName,
    values.englishName,
    values.productCategory,
    values.tradeDirection,
    values.material,
    values.usage,
    values.brandName,
    values.modelNumber,
    values.destination,
    values.originCountry,
    values.modelInfo
  ].filter(Boolean).join(" ");
}

function hsCodeAllowedByCase(code = "", testCase = {}) {
  const clean = compactHs(code);
  return (testCase.allowed || []).some((pattern) => pattern.test(clean));
}

function matchHsValidationCase(formText = "") {
  const text = normalize(formText);
  if (!text) return null;
  return hsValidationCases.find((testCase) => {
    const caseText = normalize(buildHsCaseFormText(testCase));
    const name = normalize(testCase.values?.productName || testCase.title || "");
    if (name && text.includes(name)) return true;
    const expectedBoundary = normalize(testCase.boundary || "");
    return caseText && expectedBoundary && expectedBoundary.split(/[；。,.，]/).some((part) => part.length > 5 && text.includes(part.slice(0, 8)));
  }) || null;
}

function renderHsCaseStatus(best = {}, formText = "") {
  const testCase = matchHsValidationCase(formText);
  if (!testCase) return "";
  const passed = hsCodeAllowedByCase(best?.code || "", testCase);
  return `
    <div class="hs-case-status ${passed ? "passed" : "failed"}">
      <span>题库边界校验</span>
      <strong>${escapeHtml(passed ? "通过预期边界" : "未通过，必须复核")}</strong>
      <p>${escapeHtml(testCase.title)}：预期 ${testCase.expected}。${testCase.boundary}</p>
    </div>
  `;
}

function renderHsCaseSelect() {
  const select = $("hsCaseSelect");
  if (!select) return;
  select.innerHTML = `<option value="">选择一个边界案例</option>${hsValidationCases
    .map((testCase) => `<option value="${escapeHtml(testCase.id)}">${escapeHtml(testCase.title)} · ${escapeHtml(testCase.expected)}</option>`)
    .join("")}`;
}

function setHsCaseNote(text = "") {
  const target = $("hsCaseNote");
  if (target) target.textContent = text || "用于检查成品、零件、附件、包装的高风险边界。";
}

function fillHsValidationCase(id = "") {
  const testCase = hsValidationCases.find((item) => item.id === id);
  if (!testCase) {
    setHsCaseNote("");
    return;
  }
  Object.entries(testCase.values || {}).forEach(([fieldId, value]) => {
    const field = $(fieldId);
    if (field) field.value = value;
  });
  if ($("spec")) $("spec").value = "";
  hsAutoCategory = $("productCategory")?.value || "";
  hsLastProfileCategory = "";
  updateHsSmartAssist({ manualCategory: true });
  setHsCaseNote(`预期：${testCase.expected}。${testCase.boundary}`);
}

function runHsValidationSuite() {
  const rows = hsValidationCases.map((testCase) => {
    const formText = buildHsCaseFormText(testCase);
    const { ranked, best } = rankHsCandidates(formText);
    const assessment = buildCredibilityAssessment(best, ranked, formText);
    const passed = hsCodeAllowedByCase(best?.code || "", testCase);
    return {
      testCase,
      best,
      assessment,
      passed
    };
  });
  const passedCount = rows.filter((row) => row.passed).length;
  const html = `
    <div class="hs-suite-summary">
      <article>
        <span>题库通过</span>
        <strong>${passedCount}/${rows.length}</strong>
        <p>这是内置高风险边界自检，不等于正式海关归类意见；失败项会作为下一轮规则优化重点。</p>
      </article>
      <article>
        <span>覆盖边界</span>
        <strong>成品 / 零件 / 附件 / 包装</strong>
        <p>重点防止蓝牙耳机、音频处理器、功放零件、扬声器和纸箱互相误判。</p>
      </article>
    </div>
    <div class="hs-suite-list">
      ${rows.map((row) => `
        <article class="${row.passed ? "passed" : "failed"}">
          <span>${escapeHtml(row.passed ? "通过" : "需优化")}</span>
          <strong>${escapeHtml(row.testCase.title)}</strong>
          <p>预期：${escapeHtml(row.testCase.expected)}；当前：${escapeHtml(row.best?.code || "无候选")} ${escapeHtml(row.best?.name || "")}</p>
          <small>${escapeHtml(row.assessment?.usableLabel || row.assessment?.label || "待判")}：${escapeHtml(row.assessment?.summary || "")}</small>
        </article>
      `).join("")}
    </div>
  `;
  openResultDialog("HS 归类题库自检", "用于防止典型边界误判，失败项后续继续补规则。", html);
}

function hsAssistProfileFor(text = "") {
  return hsAssistProfiles.find((profile) => profile.match.test(text)) || {
    category: "自动判断 / Not sure",
    material: ["塑料", "金属", "电子元器件", "锂电池", "纸箱/包装"],
    usage: ["播放声音", "控制设备", "维修备件", "包装保护", "充电供电"],
    spec: ["是否成品/配件", "是否含电池", "是否无线", "对应整机", "主要功能"],
    questions: ["这是完整成品、配件、零件还是包装材料？", "是否含锂电池或无线功能？", "主要用途和对应整机是什么？", "材质/规格/型号是否齐全？"]
  };
}

function dynamicParamFieldsFor(text = "") {
  const hit = dynamicHsParamProfiles.find((profile) => profile.match.test(text));
  return hit?.fields || [
    ["货物形态", ["成品", "零件/备件", "附件", "包装", "不确定"]],
    ["是否含电池", ["是", "否", "不确定"]],
    ["是否无线/蓝牙", ["是", "否", "不确定"]],
    ["对应整机", ["音箱", "功放", "耳机", "其他"]],
    ["用途", ["销售", "维修", "样品", "生产配套"]]
  ];
}

let hsAutoCategory = "";
let hsLastProfileCategory = "";

function renderDynamicParamFields(text = "") {
  const fields = dynamicParamFieldsFor(text);
  return `
    <div class="smart-param-grid">
      ${fields
        .map(
          ([label, options]) => `
            <label>
              <span>${escapeHtml(label)}</span>
              <select data-smart-param="${escapeHtml(label)}">
                <option value="">未填写</option>
                ${(options || []).map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}
              </select>
            </label>
          `
        )
        .join("")}
      <label class="smart-param-extra">
        <span>其他关键参数</span>
        <input id="smartParamExtra" lang="zh-CN" placeholder="例如 功率 10W、阻抗 4Ω、电池 1.2Wh" />
      </label>
    </div>
  `;
}

function syncSmartParamsToSpec() {
  const target = $("spec");
  if (!target) return;
  const selected = Array.from(document.querySelectorAll("[data-smart-param]"))
    .map((node) => {
      const label = node.dataset.smartParam || "";
      const value = node.value || "";
      return label && value ? `${label}：${value}` : "";
    })
    .filter(Boolean);
  const extra = $("smartParamExtra")?.value?.trim();
  if (extra) selected.push(`其他：${extra}`);
  target.value = selected.join("；");
}

function fillDatalist(id = "", values = []) {
  const node = $(id);
  if (!node) return;
  node.innerHTML = values.map((value) => `<option value="${escapeHtml(value)}"></option>`).join("");
}

function appendFieldValue(fieldId = "", value = "") {
  const field = $(fieldId);
  if (!field || !value) return;
  const current = field.value.trim();
  if (!current) {
    field.value = value;
  } else if (!current.includes(value)) {
    field.value = `${current}；${value}`;
  }
  updateHsSmartAssist();
}

function hsProfileSourceText() {
  const nameText = [$("productName")?.value, $("englishName")?.value].filter(Boolean).join(" ");
  if (nameText.trim()) return nameText;
  return $("productCategory")?.value || "";
}

function updateHsSmartAssist(options = {}) {
  const currentCategory = $("productCategory")?.value || "";
  const sourceText = options.manualCategory && currentCategory ? currentCategory : hsProfileSourceText();
  const profile = hsAssistProfileFor(sourceText || currentCategory);
  const productTextExists = Boolean(sourceText.trim());
  fillDatalist("materialOptions", profile.material);
  fillDatalist("usageOptions", profile.usage);
  fillDatalist("specOptions", profile.spec);
  if ($("productCategory") && productTextExists && (!options.manualCategory || !currentCategory || currentCategory === hsAutoCategory)) {
    $("productCategory").value = profile.category;
    hsAutoCategory = profile.category;
  } else if ($("productCategory") && !productTextExists && !currentCategory) {
    $("productCategory").value = "";
    hsAutoCategory = "";
  }
  if (hsLastProfileCategory && hsLastProfileCategory !== profile.category && $("spec")) {
    $("spec").value = "";
  }
  hsLastProfileCategory = profile.category;
  const target = $("hsSmartAssist");
  if (!target) return;
  target.innerHTML = `
    <article class="smart-assist-card">
      <div>
        <span>关键参数按品名自动变化</span>
        <strong>${escapeHtml(profile.category)}</strong>
        <p>先写中文品名，再选择成品/零件边界。下面字段不是必填，但填了会明显提高归类准确性。</p>
      </div>
      <div class="smart-chip-row">
        ${profile.questions.map((item) => `<button type="button" data-fill-field="modelInfo" data-fill-value="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}
      </div>
	      <div class="smart-param-panel">
	        <b>关键参数</b>
	        <p>下拉项会跟随中文/英文品名变化；如果产品类别选错，可以手动改类别后再生成。</p>
	        ${renderDynamicParamFields(sourceText || $("productCategory")?.value || "")}
	        <button type="button" class="primary-button smart-judge-button" id="preciseHsJudge">精确判断</button>
	      </div>
      <div class="smart-fill-grid">
        <div><b>材质常见项</b>${profile.material.map((item) => `<button type="button" data-fill-field="material" data-fill-value="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}</div>
        <div><b>用途常见项</b>${profile.usage.map((item) => `<button type="button" data-fill-field="usage" data-fill-value="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}</div>
        <div><b>常见补充</b>${profile.spec.map((item) => `<button type="button" data-fill-field="modelInfo" data-fill-value="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}</div>
      </div>
    </article>
  `;
}

function buildDeclarationElementSummary(formText = "") {
  const profile = hsAssistProfileFor(formText);
  const base = ["品名", "品牌", "型号", "用途", "材质", "功能原理"];
  const items = Array.from(new Set([...base, ...profile.spec, ...profile.questions.map((item) => item.replace(/[？?]$/, ""))])).slice(0, 12);
  return `<div class="element-pill-grid">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
}

function buildDialogRefillPanel(formText = "") {
  const profile = hsAssistProfileFor(formText);
  return `
    <div class="modal-refill-panel">
      <h3>还缺信息？在这里补充后重新生成</h3>
      <p>这些字段会同步回左侧表单。补完后点“重新生成税号”。</p>
      <div class="modal-refill-grid">
        <label>类别<input id="modalCategory" value="${escapeHtml($("productCategory")?.value || profile.category)}" /></label>
        <label>材质<input id="modalMaterial" value="${escapeHtml($("material")?.value || "")}" placeholder="${escapeHtml(profile.material.slice(0, 3).join("、"))}" /></label>
        <label>用途<input id="modalUsage" value="${escapeHtml($("usage")?.value || "")}" placeholder="${escapeHtml(profile.usage.slice(0, 2).join("、"))}" /></label>
        <label>关键参数<input id="modalSpec" value="${escapeHtml($("spec")?.value || "")}" placeholder="${escapeHtml(profile.spec.slice(0, 3).join("、"))}" /></label>
        <label>品牌<input id="modalBrandName" value="${escapeHtml($("brandName")?.value || "")}" placeholder="无品牌可写 N/A" /></label>
        <label>型号<input id="modalModelNumber" value="${escapeHtml($("modelNumber")?.value || "")}" placeholder="无型号可写 N/A" /></label>
        <label class="full-span">补充说明<textarea id="modalModelInfo" rows="3">${escapeHtml($("modelInfo")?.value || "")}</textarea></label>
      </div>
      <button type="button" class="primary-button" id="rerunHsFromDialog">重新生成税号</button>
    </div>
  `;
}

function applyDialogRefillAndRecommend() {
  if ($("modalCategory") && $("productCategory")) $("productCategory").value = $("modalCategory").value;
  if ($("modalMaterial") && $("material")) $("material").value = $("modalMaterial").value;
  if ($("modalUsage") && $("usage")) $("usage").value = $("modalUsage").value;
  if ($("modalSpec") && $("spec")) $("spec").value = $("modalSpec").value;
  if ($("modalBrandName") && $("brandName")) $("brandName").value = $("modalBrandName").value;
  if ($("modalModelNumber") && $("modelNumber")) $("modelNumber").value = $("modalModelNumber").value;
  if ($("modalModelInfo") && $("modelInfo")) $("modelInfo").value = $("modalModelInfo").value;
  closeResultDialog();
  updateHsSmartAssist();
  recommend(new Event("submit"));
}

function recommend(event) {
  event.preventDefault();
  const formText = getFormText();
  const { ranked, best } = rankHsCandidates(formText);
  const confidence = best ? Math.max(28, best.score) : 0;
  const tree = buildClassificationTree(formText, best, ranked);
  const assessment = buildCredibilityAssessment(best, ranked, formText);

  state.lastResult = { best, ranked, confidence, formText, assessment };
  $("emptyState").classList.add("hidden");
  $("resultState").classList.remove("hidden");
  $("reviewState").textContent = assessment.label;
  $("confidenceValue").textContent = assessment.usableLabel || assessment.label || "待判";
  $("confidenceValue").closest(".score-ring")?.setAttribute("data-level", assessment.level || "medium");
  $("bestCode").textContent = best?.code || "暂无候选";
  $("bestName").textContent = best?.name || "请补充更多内部样例。";
  const cargoShape = getCargoShape(formText);
  const proof = best ? buildClassificationProof(best, formText) : null;
  $("reasonText").textContent = best?.matches?.length
    ? `货物形态：${cargoShape.label}。税则含义：${proof?.interpretation.legalName || "待确认"}。命中关键词：${best.matches.join("、")}。正式申报前仍需官方/关务确认。`
    : `货物形态：${cargoShape.label}。税则含义：${proof?.interpretation.legalName || "待确认"}。当前未命中明确历史关键词，结果仅按规则库兜底排序。`;

  renderCandidates(ranked);
  renderRisks(inferRisks(formText, best));
  renderDeclarationElements(formText);
  if ($("credibilityStrip")) {
    $("credibilityStrip").classList.remove("hidden");
    $("credibilityStrip").innerHTML = renderCredibilityStrip(assessment, tree);
  }
  if (best?.code && $("tariffCheckHs") && !$("tariffCheckHs").value) {
    $("tariffCheckHs").value = best.code;
    $("tariffCheckCountry").value = $("destination")?.value || "中国";
    $("tariffCheckOrigin").value = $("originCountry")?.value || "";
    $("tariffCheckProduct").value = $("productName")?.value || best.name || "";
  }
  openResultDialog("税号归类初筛结果", "先看结论，再看为什么这样判断。正式申报前仍需人工复核。", buildRecommendationDialogHtml(best, ranked, confidence, formText));
}

function renderCandidates(items) {
  $("candidateList").innerHTML = items
    .map(
      (item, index) => {
        const duty = buildHsDutyAdvice(item, $("destination")?.value || "", $("originCountry")?.value || "", getFormText());
        const proof = buildClassificationProof(item, getFormText());
        const ccc = assessCccRequirement(item.code, getFormText(), $("tradeDirection")?.value || "");
        const tariffContent = `
          <div class="tariff-headline">
            <span>税费拆分</span>
            <strong>${escapeHtml(duty.destinationDuty.countryName || "目的国")} · ${escapeHtml(duty.destinationDuty.authority || "官方税则")}</strong>
          </div>
          <div class="tariff-component-grid">
            <div class="tariff-component">
              <span>${escapeHtml(duty.chinaReferenceLabel)}</span>
              <strong>${escapeHtml(duty.chinaReferenceDuty)}</strong>
              <small>${escapeHtml(duty.chinaReferenceNote)}</small>
            </div>
            <div class="tariff-component focus">
              <span>${escapeHtml(duty.destinationDuty.title)}</span>
              <strong>${escapeHtml(duty.destinationDuty.dutyText)}</strong>
              <small>${escapeHtml(duty.destinationDuty.note)}</small>
            </div>
            <div class="tariff-component alert">
              <span>额外关税/贸易措施</span>
              <strong>${escapeHtml(duty.extraSummary?.label || "暂未命中明确额外关税")}</strong>
              <small>${escapeHtml(duty.measures.length ? duty.measures.map((item) => item.title).join("；") : "仍需核验反倾销、反补贴、保障措施、制裁和原产国政策。")}</small>
            </div>
            <div class="tariff-component">
              <span>进口环节税/报价成本</span>
              <strong>${escapeHtml(duty.destinationDuty.taxSummary || "待当地确认")}</strong>
              <small>报价时还要看清关费、港杂、仓储、DG 费用、客户付款条款和汇率。</small>
            </div>
          </div>
          ${
            duty.measures.length
              ? `<div class="tariff-line-list">${duty.measures
                  .map(
                    (measure) => `
                      <em>
                        ${escapeHtml(measure.title)}：${escapeHtml(measure.rateText)}
                        <small>${escapeHtml(measure.confidence || measure.scope || measure.note || "")}</small>
                      </em>
                    `
                  )
                  .join("")}</div>`
              : `<em class="neutral">未命中明确额外关税，但仍需核验贸易救济和原产国。</em>`
          }
        `;
        return `
        <article class="candidate-card">
          <header>
            <div>
              <strong>${escapeHtml(item.code)}</strong>
            <span>${escapeHtml(item.name)}</span>
            </div>
            <span>匹配分 ${item.score} · 非置信度</span>
          </header>
          <p>${escapeHtml(item.notes || "请结合产品资料和官方税则核验。")}</p>
          <div class="classification-proof">
            <b>${escapeHtml(proof.shape.label)} · ${escapeHtml(proof.interpretation.legalName)}</b>
            <span>${escapeHtml(proof.interpretation.boundary)}</span>
          </div>
          <div class="classification-proof ccc-inline-proof">
            <b>3C：${escapeHtml(ccc.level)}</b>
            <span>${escapeHtml(ccc.conclusion)}</span>
          </div>
          ${index === 0 ? renderClassificationTree(buildClassificationTree(getFormText(), item, items)) : ""}
          ${
            index === 0
              ? `<div class="tariff-mini">${tariffContent}</div>`
              : `<details class="tariff-mini tariff-collapsed"><summary>税费/额外关税核验</summary>${tariffContent}</details>`
          }
          <details class="evidence-drawer">
            <summary>官方核验入口</summary>
            <div class="source-chip-grid">
              ${duty.officialLinks.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
            </div>
          </details>
        </article>
      `;
      }
    )
    .join("");
}

function renderRisks(risks = []) {
  $("riskList").innerHTML = risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join("");
}

function renderUsers() {
  if (!$("userSelect") || !$("roleText")) return;
  $("userSelect").innerHTML = users.map((user) => `<option>${escapeHtml(user.name)}</option>`).join("");
  updateRole();
}

function updateRole() {
  if (!$("userSelect") || !$("roleText")) return;
  const user = users.find((item) => item.name === $("userSelect").value) || users[0];
  $("roleText").textContent = user.role;
}

function renderModules() {
  if (!$("moduleGrid")) return;
  $("moduleGrid").innerHTML = moduleItems
    .map(([title, text, status]) => {
      const statusClass = status === "已上线" ? "" : status === "内测" ? "pending" : "future";
      return `
        <article class="module-card">
          <header>
            <h3>${escapeHtml(title)}</h3>
            <span class="status-dot ${statusClass}">${escapeHtml(status)}</span>
          </header>
          <p>${escapeHtml(text)}</p>
        </article>
      `;
    })
    .join("");
}

function sourceCategory(row = []) {
  const title = String(row[0] || "");
  const url = String(row[1] || "");
  const note = String(row[2] || "");
  const explicit = row[3];
  if (explicit) return explicit;
  const text = `${title} ${url} ${note}`.toLowerCase();
  if (/port|terminal|港|码头|shipping|carrier|maersk|msc|cma|hapag|oocl|cosco|evergreen|yang ming|zim/.test(text)) return "港口/物流";
  if (/iata|battery|dangerous|rohs|reach|weee|fcc|anatel|inmetro|ised|sirim|kc|bis|认证|安全|标准|无线|电池/.test(text)) return "认证/产品安全";
  if (/reuters|bbc|apnews|news|insight|blog|media|gac|freight|lloyd|loadstar|journal|媒体|趋势/.test(text)) return "媒体/趋势";
  if (/sanction|ofac|bis\.doc|export control|制裁|出口管制/.test(text)) return "制裁/风险";
  if (/incoterm|icc|contract|贸易条款|合同|信用证/.test(text)) return "贸易条款/合同";
  if (/wto|wco|worldbank|imf|unctad|oecd|国际组织/.test(text)) return "国际组织";
  return "政策/海关";
}

function renderSources(filter = "") {
  const query = normalize(filter);
  const rows = officialSources.filter(([title, url, note, category]) => {
    if (!query) return true;
    return normalize(`${title} ${url} ${note} ${category || ""} ${sourceCategory([title, url, note, category])}`).includes(query);
  });
  const categoryCounts = officialSources.reduce((acc, row) => {
    const category = sourceCategory(row);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const companyCaseCount = Number(window.COMPANY_HS_META?.caseCount || 0);
  if (companyCaseCount) categoryCounts["公司HS样例"] = companyCaseCount;
  $("sourceCount").textContent = officialSources.length + companyCaseCount;
  const summaryHtml = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, count]) => `<span><strong>${count}</strong>${escapeHtml(category)}</span>`)
    .join("");
  if ($("sourceSummary")) {
    $("sourceSummary").innerHTML = summaryHtml;
  }
  if ($("dashboardSourceSummary")) {
    $("dashboardSourceSummary").innerHTML = summaryHtml;
  }
  $("sourceList").innerHTML = rows
    .slice(0, 36)
    .map(
      ([title, url, note, category]) => `
        <article class="source-card">
          <span>${escapeHtml(sourceCategory([title, url, note, category]))}</span>
          <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>
          <p>${escapeHtml(note.length > 42 ? `${note.slice(0, 42)}...` : note)}</p>
        </article>
      `
    )
    .join("") || `<article class="source-card"><a href="#policy">没有匹配的数据源</a><p>换一个国家、港口、认证或英文关键词再搜。</p></article>`;
}

function renderApiOptions() {
  const grid = $("apiOptionGrid");
  if (!grid) return;
  grid.innerHTML = freeApiOptions
    .map(
      ([name, scope, cost, status, note, url]) => `
        <article class="api-option-card">
          <div>
            <span>${escapeHtml(scope)}</span>
            <h3>${escapeHtml(name)}</h3>
          </div>
          <div class="api-tags">
            <strong>${escapeHtml(cost)}</strong>
            <em>${escapeHtml(status)}</em>
          </div>
          <p>${escapeHtml(note)}</p>
          <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">查看数据源</a>
        </article>
      `
    )
    .join("");
}

function findProfileByAliases(rows = [], country = "") {
  const needle = normalize(country);
  if (!needle) return rows[0] || null;
  return rows.find((row) => normalize([row.market, ...(row.aliases || [])].join(" ")).includes(needle) || (row.aliases || []).some((alias) => needle.includes(normalize(alias)))) || null;
}

function formatUsd(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return "未填写";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(number);
}

function formatUsdAmount(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "待确认";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(number);
}

function parsePercentRate(value = "") {
  const text = String(value || "");
  if (/或|不等|可能|待|确认|按/.test(text)) return null;
  const match = text.match(/([0-9]+(?:\.[0-9]+)?)\s*%/);
  if (!match) return null;
  return Number(match[1]) / 100;
}

function parsePercentRates(value = "") {
  const text = String(value || "");
  if (/不等|可能|待|确认|按/.test(text)) return [];
  return Array.from(text.matchAll(/([0-9]+(?:\.[0-9]+)?)\s*%/g)).map((match) => Number(match[1]) / 100).filter((rate) => Number.isFinite(rate));
}

function calculationRatesForMeasure(item = {}) {
  if (item.rateForCalculation) {
    const rate = parsePercentRate(item.rateForCalculation);
    return Number.isFinite(rate) ? [rate] : [];
  }
  const rates = parsePercentRates(item.rateText);
  if (!rates.length) return [];
  return [Math.max(...rates)];
}

function summarizeExtraMeasures(measures = []) {
  const rows = (measures || [])
    .flatMap((item) => calculationRatesForMeasure(item).map((rate) => ({ item, rate })))
    .filter((row) => Number.isFinite(row.rate));
  const total = rows.reduce((sum, row) => sum + row.rate, 0);
  const formula = rows.length ? `${rows.map((row) => formatPercentValue(row.rate)).join(" + ")} = ${formatPercentValue(total)}` : "";
  const label = formula || (measures.length ? measures.map((item) => item.rateText).join(" + ") : "暂未命中明确额外关税");
  return { rows, total, formula, label };
}

function formatPercentValue(rate) {
  if (!Number.isFinite(rate)) return "待确认";
  const value = rate * 100;
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}

function buildDocGap(product = "", country = "", mode = "Sea") {
  const signals = detectRequirementSignals(product);
  const docs = [
    "商业发票：品名、HS、数量、单价、币种、贸易条款、原产国",
    "装箱单：箱数、毛净重、尺寸、包装方式、型号",
    mode === "Air" ? "空运单 AWB" : mode === "Courier" ? "快递运单和渠道申报资料" : "海运提单 B/L 或订舱确认",
    "产品规格书、图片、用途说明、材质/功能原理"
  ];
  if (signals.includes("battery")) docs.push("MSDS、UN38.3、Wh、包装方式、锂电池标签/声明");
  if (signals.includes("wireless")) docs.push("无线认证资料：型号、频段、测试报告、FCC/CE/NBTC/ANATEL 等");
  if (signals.includes("power")) docs.push("电源/适配器资料：输入输出参数、插头规格、安全认证");
  if (/brazil|brasil|巴西/i.test(country)) docs.push("葡语标签、ANATEL/INMETRO 边界、当地进口商资料");
  if (/eu|欧盟|欧洲/i.test(country)) docs.push("CE DoC、RoHS/REACH、WEEE/电池责任和当地语言标签");
  if (/saudi|沙特/i.test(country)) docs.push("SABER/SASO 证书、阿语标签、进口商 CR/VAT 信息");
  const missing = docs.slice(0, 7);
  return {
    conclusion: signals.includes("battery") || signals.includes("wireless") ? "先补认证和电池文件，再安排出运。" : "基础单证齐全后，再核验目的国特殊文件。",
    items: missing
  };
}

function buildCertificationAdvice(product = "", country = "") {
  const profile = findProfileByAliases(certificationProfiles, country) || {
    market: country || "未指定国家",
    items: [["当地准入", "先问进口商/报关行是否需要强制认证、许可证、标签和进口商资质"]]
  };
  const signals = detectRequirementSignals(product);
  const matched = profile.items.filter(([trigger]) => {
    const key = normalize(trigger);
    return (
      (signals.includes("wireless") && /无线|蓝牙|radio/.test(key)) ||
      (signals.includes("battery") && /电池|battery/.test(key)) ||
      (signals.includes("power") && /电源|适配器|power/.test(key)) ||
      (signals.includes("audio") && /消费|电子|音频|标签/.test(key))
    );
  });
  const rows = matched.length ? matched : profile.items.slice(0, 3);
  return {
    market: profile.market,
    conclusion: rows.length ? `${profile.market} 可能涉及：${rows.map(([, value]) => value).join("、")}。` : "未命中强制认证词，但仍需进口商确认。",
    items: rows.map(([trigger, value]) => `${trigger}：${value}`)
  };
}

function buildSanctionAdvice(country = "", party = "") {
  const text = normalize(`${country} ${party}`);
  const countryHits = sanctionCountryWords.filter((word) => text.includes(normalize(word)));
  const sensitiveHits = sanctionSensitiveWords.filter((word) => text.includes(normalize(word)));
  const level = countryHits.length ? "High" : sensitiveHits.length ? "Medium" : "Watch";
  const conclusion =
    level === "High"
      ? "命中高风险国家/地区关键词，先暂停报价或出货，做正式受限方筛查。"
      : level === "Medium"
        ? "命中敏感用途或客户关键词，需要合规/法务复核。"
        : "未命中明显制裁关键词，但正式交易仍需名单筛查。";
  return {
    level,
    conclusion,
    items: [
      countryHits.length ? `高风险关键词：${countryHits.join("、")}` : "国家未命中高风险关键词。",
      sensitiveHits.length ? `敏感用途关键词：${sensitiveHits.join("、")}` : "未命中军用/两用/受限方关键词。",
      "正式筛查入口：Trade.gov CSL、OFAC、EU Sanctions Map、UK OFSI、UN Sanctions。"
    ]
  };
}

function buildTaxEstimate(country = "", hs = "", value = "", origin = "") {
  const profile = findProfileByAliases(taxProfiles, country) || { market: country || "未指定国家", duty: 0.05, vat: 0.15, vatName: "VAT/GST", note: "仅按常见进口税费方向估算；正式税费以目的国海关和报关行确认为准。" };
  const chinaDestination = hasAlias(country, ["china", "中国", "大陆", "cn"]);
  const chinaTariff = chinaDestination ? getChinaTariffDetail({ code: hs }) : null;
  const amount = Number(value || 0);
  const extraMeasures = detectExtraTariffs(country, origin, hs, `${country} ${origin} ${hs}`);
  const extraLines = extraMeasures.map((item) => `${item.title}：${item.rateText}。${item.note}`);
  const parsedChinaDuty = chinaTariff ? parsePercentRate(chinaTariff.appliedRate) : null;
  const parsedChinaVat = chinaTariff ? parsePercentRate(chinaTariff.importVat) : null;
  const dutyRate = parsedChinaDuty ?? profile.duty;
  const vatRate = parsedChinaVat ?? profile.vat;
  const profileNote = chinaTariff
    ? `中国税则基础库：当前适用 ${chinaTariff.appliedRate}（${chinaTariff.appliedType}），最惠国 ${chinaTariff.mfnRate}，普通税率 ${chinaTariff.ordinaryRate}，暂定税率 ${chinaTariff.provisionalRate}；${chinaTariff.effectiveNote}`
    : profile.note;
  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      conclusion: `${profile.market} 税费需要用 HS、货值、原产国和贸易协定一起算。`,
      items: [`当前未填写货值；先用 ${profile.market} 官方税则查 HS ${hs || "未填写"}。`, profileNote, ...extraLines]
    };
  }
  const duty = amount * dutyRate;
  const vatBase = amount + duty;
  const vat = vatBase * vatRate;
  return {
    conclusion: `按粗略参数估算：关税约 ${formatUsd(duty)}，${profile.vatName} 约 ${formatUsd(vat)}。`,
    items: [
      `货值：${formatUsd(amount)}；HS：${hs || "未填写"}`,
      `估算综合税费：约 ${formatUsd(duty + vat)}，不含清关、港杂、仓储和罚金。`,
      profileNote,
      ...extraLines
    ]
  };
}

function buildTariffCheck(country = "", hs = "", origin = "", value = "", product = "") {
  const cleanHs = compactHs(hs);
  const profile = findProfileByAliases(taxProfiles, country || "中国") || { market: country || "未指定国家", duty: 0.05, vat: 0, vatName: "VAT/GST", note: "未内置该市场税费参数，先按官方税则和报关行报价确认。" };
  const chinaDestination = !country || hasAlias(country, ["china", "中国", "大陆", "cn"]);
  const chinaTariff = chinaDestination ? getChinaTariffDetail({ code: cleanHs }) : null;
  const hsInterpretation = getHsInterpretation(cleanHs);
  const destinationDuty = buildDestinationDutyReference(country || "中国", { code: cleanHs }, chinaTariff?.appliedRate || "");
  const tradeAudit = getTradeMeasureAuditSummary(cleanHs);
  const governmentNoticeHits = buildGovernmentNoticeHits(cleanHs, country || "中国", origin);
  const extraMeasures = detectExtraTariffs(country || "中国", origin, cleanHs, `${product} ${country} ${origin}`);
  const usOriginForCheck = hasAlias(origin, ["us", "usa", "united states", "美国"]);
  const amount = Number(value || 0);
  const baseRate = chinaTariff ? parsePercentRate(chinaTariff.appliedRate) : profile.duty;
  const vatRate = chinaTariff ? (parsePercentRate(chinaTariff.importVat) ?? profile.vat) : profile.vat;
  const numericExtraRates = extraMeasures
    .flatMap((item) => calculationRatesForMeasure(item).map((rate) => ({ item, rate })))
    .filter((row) => Number.isFinite(row.rate));
  const extraRate = numericExtraRates.reduce((sum, row) => sum + row.rate, 0);
  const extraFormulaText = numericExtraRates.length
    ? `${numericExtraRates.map((row) => formatPercentValue(row.rate)).join(" + ")} = ${formatPercentValue(extraRate)}`
    : "";
  const baseDuty = Number.isFinite(amount) && amount > 0 && Number.isFinite(baseRate) ? amount * baseRate : null;
  const extraDuty = Number.isFinite(amount) && amount > 0 && extraRate > 0 ? amount * extraRate : null;
  const vatBase = Number.isFinite(baseDuty) ? amount + baseDuty + (extraDuty || 0) : null;
  const vat = Number.isFinite(vatBase) && Number.isFinite(vatRate) ? vatBase * vatRate : null;
  const sources = dedupeTariffLinks([
    ...(hsInterpretation?.sourceUrl ? [[hsInterpretation.sourceTitle || "税则来源", hsInterpretation.sourceUrl]] : []),
    ...(destinationDuty.links || []),
    ...(chinaTariff ? [[chinaTariff.sourceTitle, chinaTariff.sourceUrl], ["海关税目税号查询", chinaTariff.verifyUrl || "https://online.customs.gov.cn/ocportal/mySearch/"]] : []),
    ...(usOriginForCheck && tradeAudit?.sourcePage ? [[tradeAudit.sourcePage.title || "对美加征清单公告", tradeAudit.sourcePage.url]] : []),
    ...(usOriginForCheck && tradeAudit?.general ? [[tradeAudit.general.sourceTitle || "对美加征关税当前公告", tradeAudit.general.sourceUrl]] : []),
    ...governmentNoticeHits.flatMap((item) => item.sources || []),
    ...extraMeasures.flatMap((item) => item.sources || []),
    ...(usOriginForCheck || hasAlias(country || "", ["us", "usa", "united states", "美国"])
      ? [
          ["美国 USTR Section 301", "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions"],
          ["美国 CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"]
        ]
      : [])
  ]);

  const baseConclusion = chinaTariff
    ? `中国进口 HS ${cleanHs || hs}：当前适用 ${chinaTariff.appliedRate}（${chinaTariff.appliedType}），最惠国 ${chinaTariff.mfnRate}，普通 ${chinaTariff.ordinaryRate}。`
    : `${profile.market}：基础关税需要按目的国官方税则确认；当前仅显示方向性估算。`;
  const extraConclusion = extraMeasures.length
    ? `${extraFormulaText ? `适用额外关税：${extraFormulaText}。` : ""}${extraMeasures.map((item) => `${item.title}：${item.rateText}`).join("；")}`
    : governmentNoticeHits.length
      ? `${governmentNoticeHits.map((item) => `${item.title}：${item.rateText}`).join("；")}。需补充目的国、原产国和通关日期判断是否适用。`
      : "未命中内置额外关税规则，但仍需核验反倾销、反补贴、保障措施、制裁和临时加征关税。";
  const estimateLines = [];
  if (Number.isFinite(baseDuty)) estimateLines.push(`按货值 ${formatUsdAmount(amount)} 粗估：基础关税约 ${formatUsdAmount(baseDuty)}（${formatPercentValue(baseRate)}）。`);
  if (Number.isFinite(extraDuty)) estimateLines.push(`可量化额外关税约 ${formatUsdAmount(extraDuty)}（${formatPercentValue(extraRate)}）。`);
  if (Number.isFinite(vat)) estimateLines.push(`${profile.vatName || "VAT/GST"} 约 ${formatUsdAmount(vat)}，计税基础通常还要看运保费、完税价格和当地规则。`);
  if (!estimateLines.length) estimateLines.push("未填写有效货值，先给出税率/风险判断，不做金额估算。");

  return {
    cleanHs,
    country: country || "中国",
    origin,
    product,
    baseConclusion,
    extraConclusion,
    destinationDuty,
    chinaTariff,
    hsInterpretation,
    tradeAudit,
    usOriginForCheck,
    governmentNoticeHits,
    extraMeasures,
    extraFormulaText,
    estimateLines,
    sources
  };
}

function buildTariffApplicability(data = {}) {
  const chinaDestination = !data.country || hasAlias(data.country, ["china", "中国", "大陆", "cn"]);
  const usOrigin = hasAlias(data.origin, ["us", "usa", "united states", "美国"]);
  const originFilled = String(data.origin || "").trim();
  if (chinaDestination && usOrigin && data.extraMeasures?.length) {
    return {
      level: "适用",
      text: `当前填写为“中国进口 + 美国原产 + HS ${data.cleanHs || "未填"}”，已进入加征税核算。${data.extraFormulaText ? `额外关税组合：${data.extraFormulaText}。` : ""}`,
      action: "报价和清关前请按政府公告、排除清单、通关日期和报关行意见复核。"
    };
  }
  if (chinaDestination && !originFilled && data.governmentNoticeHits?.length) {
    return {
      level: "缺原产国",
      text: `HS ${data.cleanHs || "未填"} 命中中国对美加征公告清单，但你还没填原产国。若原产美国，应把清单额外关税计入成本。`,
      action: "先补原产国，再重新核验。"
    };
  }
  if (chinaDestination && originFilled && !usOrigin && data.governmentNoticeHits?.length) {
    return {
      level: "公告命中但当前不适用",
      text: `HS ${data.cleanHs || "未填"} 在对美清单中有记录，但当前原产国不是美国，通常不直接适用该对美加征层。`,
      action: "仍需核验是否有其他贸易救济、反倾销、反补贴、制裁或临时措施。"
    };
  }
  return {
    level: "常规核验",
    text: data.extraMeasures?.length ? data.extraConclusion : "当前未形成明确适用的额外关税结论。",
    action: "继续按目的国官方税则、贸易措施和报关行意见复核。"
  };
}

function buildCustomsReviewSlip(data = {}) {
  const hasExtra = Boolean(data.extraMeasures?.length);
  const formula = data.extraFormulaText || (hasExtra ? data.extraMeasures.map((item) => item.rateText).filter(Boolean).join(" + ") : "");
  const hsText = data.hsInterpretation?.legalName || data.hsInterpretation?.tariffOriginal || "待官方税则确认";
  const baseText = data.baseConclusion || data.destinationDuty?.dutyText || "基础税率待确认";
  const originText = data.origin ? `原产国/地区：${data.origin}` : "原产国未填写，不能判断原产地相关额外措施。";
  return `
    <div class="customs-review-slip">
      <article class="primary">
        <span>关务复核结论</span>
        <strong>${escapeHtml(data.cleanHs || data.hs || "未填写 HS")} · ${escapeHtml(hsText)}</strong>
        <p>${escapeHtml(`${baseText}${formula ? `；额外措施：${formula}` : "；未命中已接入额外措施"}`)}</p>
      </article>
      <article>
        <span>原产地口径</span>
        <strong>${escapeHtml(originText)}</strong>
        <p>${escapeHtml(hasExtra ? "只展示与你填写的原产国相关的额外关税/贸易措施。" : "如果原产国不在已接入贸易措施中，页面不会套用其他国家的额外税。")}</p>
      </article>
      <article>
        <span>正式复核路径</span>
        <strong>关务 / 报关行 / 进口商</strong>
        <p>复核通关日期、税号位数、公告清单、排除清单、原产地证明、贸易救济和当地增值税口径。</p>
      </article>
    </div>
  `;
}

function buildTariffCheckHtml(data = {}) {
  const sourceLinks = (data.sources || [])
    .map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`)
    .join("");
  const applicability = buildTariffApplicability(data);
  return `
    ${buildCustomsReviewSlip(data)}
    <div class="tariff-check-grid">
      <article class="decision-card tone-rose tariff-total-card">
        <span>是否适用额外关税</span>
        <strong>${escapeHtml(applicability.level)}</strong>
        <p>${escapeHtml(applicability.text)}</p>
        <p>${escapeHtml(applicability.action)}</p>
      </article>
      <article class="decision-card tone-green">
        <span>税则原文</span>
        <strong>${escapeHtml(data.hsInterpretation?.legalName || data.hsInterpretation?.tariffOriginal || "待官方税则确认")}</strong>
        ${data.hsInterpretation?.tariffFullText ? `<pre class="tariff-original-text">${escapeHtml(data.hsInterpretation.tariffFullText)}</pre>` : ""}
        ${data.hsInterpretation?.tariffRateLine ? `<p>${escapeHtml(data.hsInterpretation.tariffRateLine)}</p>` : ""}
        <p>${escapeHtml(data.hsInterpretation?.scope || "")}</p>
	        <p>${escapeHtml(data.hsInterpretation?.boundary || "")}</p>
	        <p>${escapeHtml(data.hsInterpretation?.caution || "")}</p>
      </article>
      <article class="decision-card tone-blue">
        <span>基础关税</span>
        <strong>${escapeHtml(data.baseConclusion)}</strong>
        <p>${escapeHtml(data.destinationDuty?.note || "正式税率仍以目的国海关和通关时口径为准。")}</p>
      </article>
	      <article class="decision-card tone-rose">
	        <span>额外关税/贸易措施</span>
	        <strong>${escapeHtml(data.extraFormulaText ? `额外关税公式：${data.extraFormulaText}` : data.extraConclusion)}</strong>
	        ${data.extraFormulaText ? `<p>${escapeHtml(data.extraConclusion)}</p>` : ""}
	        <ul>
          ${
            data.extraMeasures?.length
              ? data.extraMeasures.map((item) => `<li>${escapeHtml(item.scope || item.confidence || "已命中规则")}：${escapeHtml(item.note || "")}</li>`).join("")
              : "<li>未命中内置规则，不代表一定没有额外关税。</li>"
          }
        </ul>
      </article>
      <article class="decision-card tone-blue">
        <span>政府公告命中</span>
        <strong>${escapeHtml(data.governmentNoticeHits?.length ? data.governmentNoticeHits.map((item) => `${item.rateText}`).join("；") : "未命中已接入公告清单")}</strong>
        <ul>
          ${
            data.governmentNoticeHits?.length
              ? data.governmentNoticeHits.map((item) => `<li>${escapeHtml(item.scope)}：${escapeHtml(item.note)}</li>`).join("")
              : "<li>当前税号没有命中已接入的政府公告清单。</li>"
          }
        </ul>
      </article>
	      <article class="decision-card tone-indigo">
	        <span>原产国口径</span>
	        <strong>${escapeHtml(data.origin ? `原产国/地区：${data.origin}` : "请填写原产国以判断额外措施")}</strong>
	        <p>${escapeHtml(data.usOriginForCheck ? `HS ${data.tradeAudit?.hs8 || data.cleanHs || "未填"} 已按美国原产场景核验，对美清单命中：${data.tradeAudit?.hsRates || "待确认"}。` : "当前只显示与你填写的原产国相关的贸易措施；例如原产越南时，不会把美国原产的加征税作为适用结论。")}</p>
	        <p>正式报价前仍需按通关日期、排除清单和报关行意见复核。</p>
	      </article>
      <article class="decision-card tone-amber">
        <span>金额估算</span>
        <strong>只做报价前初算</strong>
        <ul>${(data.estimateLines || []).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </article>
      <article class="decision-card tone-slate">
        <span>证据入口</span>
        <strong>最终以官方和报关行复核</strong>
        <div class="source-chip-grid">${sourceLinks}</div>
      </article>
    </div>
  `;
}

function renderTariffCheckResult(data = {}) {
  const target = $("tariffCheckResult");
  if (!target) return;
  target.innerHTML = buildTariffCheckHtml(data);
}

function evaluateTariffCheck(event) {
  event?.preventDefault();
  const hs = $("tariffCheckHs")?.value || "";
  const country = $("tariffCheckCountry")?.value || "中国";
  const origin = $("tariffCheckOrigin")?.value || "";
  const value = $("tariffCheckValue")?.value || "";
  const product = $("tariffCheckProduct")?.value || "";
  const result = buildTariffCheck(country, hs, origin, value, product);
  renderTariffCheckResult(result);
  if (event?.type === "submit") {
    openResultDialog("税费与税则核验结果", "输入 HS 后先看税则含义，再看基础关税和额外关税。", buildTariffCheckHtml(result));
  }
}

function buildEscalationBoard(parts = {}) {
  const owners = [];
  if (/高风险|暂停|DDP|EXW/.test(`${parts.incoterm?.risk || ""} ${parts.sanction?.conclusion || ""}`)) owners.push(["合规/法务", "受限方、敏感国家、DDP 税务或合同责任异常"]);
  if (/认证|FCC|CE|ANATEL|NBTC|SABER|3C|无线|电源/.test(`${parts.cert?.conclusion || ""} ${parts.docs?.items?.join(" ") || ""}`)) owners.push(["认证/质量", "确认强制认证、测试报告、标签和客户准入文件"]);
  if (/电池|DG|UN38.3|MSDS|锂/.test(`${parts.docs?.items?.join(" ") || ""}`)) owners.push(["物流/DG 专员", "确认承运人、船司、航司、码头是否接受以及 DG 文件"]);
  if (/HS|关税|VAT|税费|监管/.test(`${parts.tax?.conclusion || ""}`)) owners.push(["关务/报关行", "复核 HS、税率、监管证件、估价和申报要素"]);
  if (!owners.length) owners.push(["业务 Owner", "当前无明显高风险；保留查询记录，出货前按常规流程复核"]);
  return owners.slice(0, 4);
}

function evaluateDecisionSupport(event) {
  if (event) event.preventDefault();
  const product = $("decisionProduct")?.value || "蓝牙音频产品，内置锂电池";
  const country = $("decisionCountry")?.value || "美国";
  const origin = $("decisionOrigin")?.value || "";
  const mode = $("decisionMode")?.value || "Sea";
  const incoterm = $("decisionIncoterm")?.value || "FOB";
  const hs = $("decisionHs")?.value || "";
  const value = $("decisionValue")?.value || "";
  const party = $("decisionParty")?.value || "";
  const incotermAdvice = incotermProfiles[incoterm] || incotermProfiles.FOB;
  const docs = buildDocGap(product, country, mode);
  const cert = buildCertificationAdvice(product, country);
  const sanction = buildSanctionAdvice(country, party);
  const tax = buildTaxEstimate(country, hs, value, origin || party);
  const escalation = buildEscalationBoard({ incoterm: incotermAdvice, docs, cert, sanction, tax });
  renderDecisionSupport({ product, country, origin, mode, incoterm, incotermAdvice, docs, cert, sanction, tax, escalation });
  if (event?.type === "submit") addHistory("综合决策", `${country} / ${product}`, `${incoterm}：${docs.conclusion}`);
}

function renderDecisionSupport(data = {}) {
  const target = $("decisionResult");
  if (!target) return;
  const incoterm = data.incoterm || "FOB";
  const incotermAdvice = data.incotermAdvice || incotermProfiles.FOB;
  const docs = data.docs || buildDocGap(data.product || "", data.country || "", data.mode || "Sea");
  const cert = data.cert || buildCertificationAdvice(data.product || "", data.country || "");
  const sanction = data.sanction || buildSanctionAdvice(data.country || "", "");
  const tax = data.tax || buildTaxEstimate(data.country || "", data.hs || "", data.value || "");
  const escalation = data.escalation || buildEscalationBoard({ incoterm: incotermAdvice, docs, cert, sanction, tax });
  target.innerHTML = `
    <article class="decision-card tone-blue">
      <span>Incoterms</span>
      <strong>${escapeHtml(incoterm)} 责任边界</strong>
      <p>${escapeHtml(incotermAdvice.risk)}</p>
      <ul>
        <li>卖方：${escapeHtml(incotermAdvice.seller)}</li>
        <li>买方：${escapeHtml(incotermAdvice.buyer)}</li>
        <li>${escapeHtml(incotermAdvice.action)}</li>
      </ul>
    </article>
    <article class="decision-card tone-green">
      <span>单证缺口</span>
      <strong>${escapeHtml(docs.conclusion)}</strong>
      <ul>${docs.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="decision-card tone-indigo">
      <span>认证/许可证</span>
      <strong>${escapeHtml(cert.conclusion)}</strong>
      <ul>${cert.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="decision-card tone-rose">
      <span>制裁/受限方</span>
      <strong>${escapeHtml(sanction.level)} Risk</strong>
      <p>${escapeHtml(sanction.conclusion)}</p>
      <ul>${sanction.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="decision-card tone-amber">
      <span>税费估算</span>
      <strong>${escapeHtml(tax.conclusion)}</strong>
      <ul>${tax.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="decision-card tone-slate">
      <span>异常升级看板</span>
      <strong>先找这些人确认</strong>
      <div class="owner-list">
        ${escalation.map(([owner, reason]) => `<div><b>${escapeHtml(owner)}</b><small>${escapeHtml(reason)}</small></div>`).join("")}
      </div>
    </article>
  `;
}

function loadDecisionExample() {
  $("decisionProduct").value = "蓝牙耳机，内置锂电池，带充电盒，USB-C 充电，零售包装";
  $("decisionCountry").value = "美国";
  $("decisionOrigin").value = "中国";
  $("decisionMode").value = "Sea";
  $("decisionIncoterm").value = "CIF";
  $("decisionHs").value = "8517629400";
  $("decisionValue").value = "12000";
  $("decisionParty").value = "普通零售客户";
  evaluateDecisionSupport(new Event("submit"));
}

function clearDecisionSupport() {
  $("decisionForm").reset();
  evaluateDecisionSupport();
}

function renderTimeline() {
  if (!$("policyTimeline")) return;
  $("policyTimeline").innerHTML = "";
}

function renderPolicyWatchChips() {
  const target = $("policyWatchChips");
  if (!target) return;
  const chips = [
    "巴西 蓝牙耳机 ANATEL",
    "欧盟 电池 RoHS CE",
    "美国 中国原产 Section 301",
    "泰国 NBTC 电池",
    "沙特 SABER 音频",
    "上海港 锂电池 DG",
    "空运 锂电池 IATA DGR",
    "DHL UPS 快件 清关 延误"
  ];
  target.innerHTML = chips.map((chip) => `<button type="button" data-policy-watch="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`).join("");
  target.querySelectorAll("[data-policy-watch]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.policyWatch || "";
      $("policyProduct").value = value;
      activateWorkspaceModule("policy", true);
      loadPolicyUpdates();
    });
  });
}

function getPolicyFilters() {
  return {
    exportCountry: $("policyExportCountry")?.value || "",
    importCountry: $("policyImportCountry")?.value || "",
    product: $("policyProduct")?.value || "",
    direction: $("policyDirection")?.value || ""
  };
}

async function loadPolicyUpdates(showOverlay = false) {
  const filters = getPolicyFilters();
  const label = [filters.exportCountry && `出口:${filters.exportCountry}`, filters.importCountry && `进口:${filters.importCountry}`, filters.product && `产品:${filters.product}`, filters.direction]
    .filter(Boolean)
    .join(" / ");
  $("policyStatus").textContent = label ? `正在查询公开政策相关新闻：${label}` : "正在查询公开政策相关新闻...";
  if (showOverlay) {
    showQueryOverlay("正在查询政策变化", label || "正在抓取官方、国际组织、媒体和行业来源，并生成中文结论。", "Policy Monitor");
  }
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (String(value || "").trim()) params.set(key, value);
    });
    params.set("_t", String(Date.now()));
    const url = `/.netlify/functions/policy-monitor${params.toString() ? `?${params.toString()}` : ""}`;
    const data = await fetchJsonOrFallback(url, fallbackPolicyUpdates("", filters));
    renderPolicyUpdates(data);
    if (label) addHistory("政策查询", label, data.summary || "已生成政策结论");
  } catch (error) {
    renderPolicyUpdates(fallbackPolicyUpdates(error.message, filters));
  } finally {
    if (showOverlay) hideQueryOverlay();
  }
}

function fallbackPolicyUpdates(message = "", filters = {}) {
  const knowledgeMatches = matchLocalPolicyKnowledge(filters);
  const items = [
    ...knowledgeMatches.map((rule) => ({
      title: rule.title,
      category: rule.category,
      url: rule.url,
      domain: rule.domain,
      sourceType: rule.sourceType,
      credibility: { score: 92, label: "高：本地规则库", reason: "已沉淀为平台固定业务规则，附官方核验入口。" },
      takeaway: `${rule.conclusion} 变化点：${rule.changes.join(" ")}`,
      action: rule.action,
      materials: rule.materials,
      localRule: rule
    })),
    {
      title: "海关公告、归类决定和监管条件",
      category: "海关/税号",
      url: "http://www.customs.gov.cn/",
      domain: "customs.gov.cn",
      sourceType: "官方入口",
      credibility: { score: 96, label: "高：官方来源", reason: "海关官方门户，适合做最终政策核验。" },
      takeaway: "用于核对税号、监管条件、归类口径、海关公告和行政裁定。",
      action: "正式申报前把候选税号、产品资料和公告信息交给关务/报关行复核。"
    },
    {
      title: "3C 目录和认证公告",
      category: "认证/3C",
      url: "https://www.cnca.gov.cn/",
      domain: "cnca.gov.cn",
      sourceType: "官方入口",
      credibility: { score: 95, label: "高：官方来源", reason: "认证认可监管官方入口，适合核验 3C 目录和公告。" },
      takeaway: "用于核对音频设备、电源适配器、低压电器等是否涉及强制认证。",
      action: "如果产品带电源、插头、无线或整机认证风险，先让认证/质量同事确认。"
    },
    {
      title: "目的国认证和标签要求",
      category: "目的国要求",
      url: "https://www.wto.org/",
      domain: "wto.org",
      sourceType: "国际组织/政策背景",
      credibility: { score: 88, label: "中高：国际组织", reason: "适合作为贸易政策背景，具体产品要求仍需当地法规或进口商确认。" },
      takeaway: "出口前需要核对 CE、FCC、UKCA、RoHS、电池、标签语言等要求。",
      action: "把进口国、产品类别和客户资料发给当地进口商确认准入文件。"
    },
    {
      title: "空运危险品、锂电池和快件清关",
      category: "空运/快件",
      url: "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/",
      domain: "iata.org",
      sourceType: "国际组织/行业规则",
      credibility: { score: 90, label: "高：行业规则来源", reason: "IATA 是航空运输危险品规则的重要行业来源，适合核验空运锂电池和 DG 边界。" },
      takeaway: "含锂电池、磁性、液体、样品和维修件走空运/快件时，要优先确认 UN38.3、MSDS、PI965/966/967、SOC 和承运商限制。",
      action: "发货前让物流/货代确认承运商是否接收；到达后关注清关延误、收件人税号、进口商授权和目的国认证资料。"
    }
  ];
  const analysis = buildPolicyAnalysis({ items, filters });
  return {
    ok: false,
    fallback: true,
    source: "公开政策入口",
    updatedAt: new Date().toISOString(),
    filters,
    message,
    summary: knowledgeMatches.length
      ? knowledgeMatches.map((rule) => rule.conclusion).join(" ")
      : (filters.product || filters.importCountry || filters.exportCountry
        ? "当前本地规则库没有命中特定新增规则；页面输出固定政策检查项和材料清单。"
        : "输入产品和国家后，页面会按本地规则库输出变化点、适用范围、实施节点和材料清单。"),
    analysis,
    knowledgeMatches,
    sourceBreakdown: [{ source: "后台接口", status: "暂不可用，显示本地规则库结论" }],
    items
  };
}

function inferPolicyRiskDimensions(items = [], filters = {}) {
  const text = normalize([filters.exportCountry, filters.importCountry, filters.product, ...items.map((item) => `${item.title} ${item.takeaway} ${item.category} ${item.domain}`)].join(" "));
  const dimensions = [];
  const add = (title, level, conclusion, owner) => dimensions.push({ title, level, conclusion, owner });
  if (/关税|tariff|duty|301|232|反倾销|反补贴|trade remed|cbp|ustr|税率/.test(text)) {
    add("关税/贸易措施", "高关注", "可能影响报价、成本和原产地判断；先核对官方税则、额外关税和实施日期。", "关务/当地报关行");
  }
  if (/蓝牙|无线|wifi|wi-fi|fcc|red|anatel|nbtc|rra|sirim|mcmc|tdra|型号核准|认证/.test(text)) {
    add("无线/认证", "高关注", "涉及无线产品准入，重点核对型号、频段、标签、证书有效期和当地进口商责任。", "认证负责人/当地进口商");
  }
  if (/电池|锂|battery|iata|imdg|un38|dg|dangerous/.test(text)) {
    add("电池/DG", "高关注", "可能影响订舱、空运/快递接受、标签、危申和港区限制；先补 MSDS、UN38.3、Wh 和包装方式。", "物流/DG 专员");
  }
  if (/移动电源|充电宝|对外充电|usb输出|usb output|power bank/.test(text)) {
    add("移动电源/CCC", "高关注", "产品具备对外供电功能时，按移动电源功能边界判断 CCC、锂电安全标准、标签和进口/内销资料。", "认证/质量/关务");
  }
  if (/港口|船期|物流|拥堵|罢工|红海|suez|panama|port|shipping|freight|strike|congestion/.test(text)) {
    add("物流/交付", "中高关注", "可能影响 ETA、截关、转运和费用；同步核对船司、码头、货代和港口公告。", "物流/计划");
  }
  if (/制裁|restricted|sanction|ofac|entity list|出口管制|dual-use|两用/.test(text)) {
    add("制裁/受限方", "高关注", "涉及客户、收货人、国家或用途限制时，先做受限方和最终用途初筛。", "合规/业务负责人");
  }
  if (!dimensions.length) {
    add("常规政策监测", items.length ? "中关注" : "低关注", items.length ? "已看到公开信号；按标题、摘要和本页材料清单判断税费、认证、标签或物流影响。" : "未命中新增规则；输出固定税号、认证、标签和文件检查项。", "关务/认证/物流按事项分工");
  }
  return dimensions.slice(0, 5);
}

function buildCountryPolicyHint(filters = {}) {
  const country = normalize(filters.importCountry || filters.exportCountry || "");
  const product = normalize(filters.product || "");
  const wireless = /蓝牙|无线|wifi|wi-fi|radio|wireless|bluetooth/.test(product);
  const battery = /电池|锂|battery/.test(product);
  if (/巴西|brazil|brasil/.test(country)) {
    return `巴西场景：${wireless ? "无线产品优先核验 ANATEL homologation；" : ""}${battery ? "含电池同步看运输文件和 INMETRO/标签边界；" : ""}进口资料以 Siscomex/Receita Federal 和当地进口商意见为准。`;
  }
  if (/欧盟|eu|europe/.test(country)) {
    return `欧盟场景：${wireless ? "无线产品优先看 RED/CE；" : ""}${battery ? "含电池关注欧盟电池法规、WEEE/RoHS 和回收标识；" : ""}税费用 TARIC/Access2Markets 复核。`;
  }
  if (/美国|us|usa|united states/.test(country)) {
    return `美国场景：${wireless ? "无线产品优先核验 FCC；" : ""}关税/额外关税看 USITC HTS、CBP Trade Remedies 和 USTR 301；原产地标识要同步确认。`;
  }
  if (/泰国|thailand/.test(country)) {
    return `泰国场景：无线产品优先核验 NBTC，标准/强制认证看 TISI，清关和税则以 Thailand Customs/NSW 为准。`;
  }
  return "";
}

function buildPolicyTrendDirection(items = [], filters = {}) {
  const hint = buildCountryPolicyHint(filters);
  if (!items.length) return hint || "当前没有实时命中；本页只展示固定检查项，不生成新增政策结论。";
  const recentOfficial = items.filter((item) => (item.credibility?.score || 0) >= 90 || /gov|customs|europa|wto|cbp|federalregister|trade-tariff|ustr/i.test(item.domain)).length;
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean))).slice(0, 3);
  return `${hint ? `${hint} ` : ""}本次来源主题集中在 ${categories.join("、") || "政策/贸易/物流"}；${recentOfficial ? `${recentOfficial} 条高可信来源。` : "当前来源未标记为官方，按页面提取的要点做内部预警。"}`;
}

function buildPolicyOwnerActions(dimensions = []) {
  const owners = Array.from(new Set(dimensions.map((item) => item.owner).filter(Boolean)));
  return owners.length
    ? owners.map((owner) => `${owner}：确认是否影响在途订单、报价、认证资料、清关文件或 ETA。`)
    : ["关务：复核税号、税率和监管条件。", "认证：复核证书、标签和技术文件。", "物流：复核船期、港口和 DG 限制。"];
}

function buildPolicyAnalysis(data = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  const filters = data.filters || {};
  const knowledgeMatches = data.knowledgeMatches || matchLocalPolicyKnowledge(filters);
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean))).slice(0, 5);
  const officialCount = items.filter((item) => (item.credibility?.score || 0) >= 90 || /gov|customs|cnca|singlewindow|europa|wto|cbp|trade-tariff/i.test(item.domain)).length;
  const market = [filters.exportCountry && `出口国 ${filters.exportCountry}`, filters.importCountry && `进口国 ${filters.importCountry}`]
    .filter(Boolean)
    .join("、");
  const product = filters.product || "当前产品";
  const dimensions = inferPolicyRiskDimensions(items, filters);
  const trendDirection = buildPolicyTrendDirection(items, filters);
  const ownerActions = buildPolicyOwnerActions(dimensions);
  return {
    headline: data.analysis?.headline || (knowledgeMatches.length
      ? knowledgeMatches.map((rule) => rule.conclusion).join(" ")
      : (items.length ? `${product} 政策信号已命中，按税费、认证、电池/DG、标签和物流逐项判断。` : `${product} 未命中新增政策，显示固定检查清单。`)),
    keyPoints: data.analysis?.keyPoints || [
      knowledgeMatches.length ? `本地规则库命中：${knowledgeMatches.map((rule) => rule.title).join("；")}。` : (items.length ? `本次命中 ${items.length} 条公开来源，主题集中在：${categories.join("、") || "政策/合规"}。` : "没有实时新闻结果，显示固定检查项。"),
      trendDirection,
      market ? `筛选范围包含 ${market}；本页按 ${product} 的型号、用途、原产地和实施日期输出材料清单。` : "输入出口国、进口国和产品关键词后，结论会落到具体材料和实施节点。"
    ],
    actions: data.analysis?.actions || ownerActions.concat([
      ...(knowledgeMatches.length ? knowledgeMatches.flatMap((rule) => rule.materials.slice(0, 2)) : []),
      "确认发布主体、发布日期、实施日期和适用产品范围。",
      "判断是否影响税号、认证/标签、电池/DG、船期/交付四类事项。",
      "把材料缺口记录到订单备注，指定关务、认证、物流或业务负责人处理。"
    ]).slice(0, 5),
    dimensions,
    trendDirection,
    sourceTrust: knowledgeMatches.length ? `本地规则库 ${knowledgeMatches.length} 条；附官方入口用于追溯。` : (officialCount ? `官方/国际组织来源 ${officialCount} 条。` : "当前结果为固定规则和公开来源摘要。"),
    sourceGroups: data.analysis?.sourceGroups || [
      {
        title: "常用权威入口",
        items: officialSources.slice(0, 8).map(([title, url, note]) => [title, url, note])
      }
    ]
  };
}

function compactPolicyConclusion(data = {}, analysis = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean))).slice(0, 4);
  const raw = data.summary || analysis.headline || "未命中新增政策信号；输出税号、税率、认证、标签、电池/DG 和清关资料固定清单。";
  const dimensions = Array.isArray(analysis.dimensions) ? analysis.dimensions : [];
  return {
    conclusion: cleanConclusionText(raw),
    impact: dimensions.length
      ? `重点看：${dimensions.map((item) => `${item.title}（${item.level}）`).join("、")}。`
      : categories.length ? `本次重点涉及：${categories.join("、")}。` : "当前没有明显新增风险，按常规核验流程处理。",
    actions: [...(analysis.actions || []), "复核实施日期、适用产品范围、是否影响在途或待出货订单。"].slice(0, 4)
  };
}

function buildPolicyBriefChecklist(data = {}, analysis = {}) {
  const filters = data.filters || {};
  const items = Array.isArray(data.items) ? data.items : [];
  const product = filters.product || "相关产品";
  const exportCountry = filters.exportCountry || "未限定";
  const importCountry = filters.importCountry || "未限定";
  const titles = items.map((item) => item.title).filter(Boolean).slice(0, 3).join("；");
  const categoryText = Array.from(new Set(items.map((item) => item.category).filter(Boolean))).slice(0, 4).join("、");
  const countryText = [exportCountry !== "未限定" && `出口国 ${exportCountry}`, importCountry !== "未限定" && `进口国 ${importCountry}`].filter(Boolean).join("，") || "未限定国家";
  const chinaTouched = /中国|china|cn|hong kong|中国香港/i.test(`${exportCountry} ${importCountry} ${titles} ${analysis.trendDirection || ""}`);
  const dimensions = (analysis.dimensions || []).map((item) => item.title).join("、") || categoryText || "税号、认证、物流或贸易措施";
  const recentChange = items.length
    ? `近期来源出现 ${items.length} 条相关信号，主题集中在 ${categoryText || "政策/贸易/物流"}；看发布日期、实施日期、适用产品范围和材料要求。`
    : "当前实时接口没有明确新闻命中，展示固定政策检查项。";
  const materialText = items
    .flatMap((item) => item.materials || item.localRule?.materials || [])
    .slice(0, 6)
    .join("；");
  return [
    ["这是什么", `${countryText} 下围绕 ${product} 的政策/情报归纳。${titles ? `本次代表性来源：${titles}。` : ""}`],
    ["核心要点", `重点判断是否影响 ${dimensions}；结果必须落到税费、认证、标签、电池/DG、清关资料或 ETA 其中一类。`],
    ["近期变化", recentChange],
    ["影响国家", countryText],
    ["对中国影响", chinaTouched ? "已出现中国/中国香港或中国出口场景信号，需确认是否影响中国出货、原产地、客户报价或目的国准入。" : "当前筛选未直接指向中国；如产品从中国出口，仍要确认目的国是否对中国原产或中国供应链有额外要求。"],
    ["进出口影响", "可能影响报价税费、额外关税、目的国认证/标签、清关资料、承运限制、ETA 和客户交付承诺。"],
    ["材料清单", materialText || "规格书、图片、品牌型号、用途、HS 候选、认证证书、标签、运输文件。"],
    ["需要留意", "看原文发布主体、发布日期、实施日期、适用产品、HS 范围、原产国、排除/豁免、过渡期和是否已有执行细则。"]
  ];
}

function cleanConclusionText(text = "") {
  return String(text || "")
    .replace(/^围绕[^，。；;]*[，。；;]\s*/u, "")
    .replace(/^(结论|当前结论)[:：]\s*/u, "")
    .replace(/结论[:：]\s*/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sourceDomainLabel(item = {}) {
  const raw = item.domain || item.sourceDomain || item.source || item.sourceType || "";
  if (raw) return String(raw).replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  try {
    return item.url ? new URL(item.url).hostname.replace(/^www\./, "") : "来源";
  } catch (error) {
    return "来源";
  }
}

function cleanSourceLanguage(text = "") {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/建议作为宏观背景观察[，,]?\s*/g, "")
    .replace(/具体业务仍需结合[^。；;]*[。；;]?/g, "")
    .replace(/仍需按官方入口[^。；;]*[。；;]?/g, "")
    .replace(/需要时点击原始来源核验[。；;]?/g, "")
    .replace(/打开原文核验[^。；;]*[。；;]?/g, "")
    .replace(/建议打开原文核验[^。；;]*[。；;]?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compactSourceStatement(text = "", maxLength = 220) {
  const clean = cleanSourceLanguage(text);
  if (clean.length <= maxLength) return clean;
  const sliced = clean.slice(0, maxLength);
  const sentenceEnd = Math.max(sliced.lastIndexOf("。"), sliced.lastIndexOf("."), sliced.lastIndexOf(";"), sliced.lastIndexOf("；"));
  return `${sliced.slice(0, sentenceEnd > 80 ? sentenceEnd + 1 : maxLength).trim()}…`;
}

function removePublisherSuffix(text = "") {
  return cleanSourceLanguage(text)
    .replace(/\s+-\s+[^-]{2,32}$/u, "")
    .replace(/\s+[A-Z][A-Za-z .&-]{2,32}$/u, "")
    .replace(/\s+(新浪财经|东方财富|联合早报|财联社|证券时报|路透社|彭博社|华尔街见闻|第一财经|经济观察网|每日经济新闻|央视新闻|新华社|Sina finance)$/iu, "")
    .trim();
}

function removeDuplicatedTitle(description = "", title = "") {
  const cleanTitle = removePublisherSuffix(title);
  let cleanDescription = removePublisherSuffix(description);
  if (cleanTitle && cleanDescription.startsWith(cleanTitle)) {
    cleanDescription = cleanDescription.slice(cleanTitle.length).replace(/^[-—:：\s]+/u, "").trim();
  }
  if (cleanTitle && normalize(cleanDescription) === normalize(cleanTitle)) return "";
  return cleanDescription;
}

function sourceNumbers(text = "") {
  return Array.from(
    new Set(
      String(text || "")
        .match(/(?:20\d{2}(?:H[12]|Q[1-4])?|[0-9]+(?:\.[0-9]+)?\s*(?:%|亿美元|亿元|万美元|万亿|倍|个|家|条|票|天|周|月|年|kg|CBM|TEU|FEU))/gi) || []
    )
  ).slice(0, 4);
}

function subjectFromTitle(title = "") {
  const cleanTitle = removePublisherSuffix(title);
  const beforePunctuation = cleanTitle.split(/[，,：:；;。.!?？]/u).find(Boolean) || cleanTitle;
  return beforePunctuation.replace(/^(关于|有关|一图读懂|快讯|独家|重磅|突发)[:：\s]*/u, "").slice(0, 42);
}

function deriveEventSummary(item = {}) {
  const title = removePublisherSuffix(item.title || item.localRule?.title || "");
  const description = removeDuplicatedTitle(item.summaryZh || item.summary || item.description || item.snippet || item.excerpt || "", title);
  const combined = cleanSourceLanguage([title, description].filter(Boolean).join("。"));
  const lower = normalize(combined);
  const nums = sourceNumbers(combined);
  const domain = sourceDomainLabel(item);
  const sourceVerb = /gov|customs|wto|federalregister|cbp|ustr|europa|iata|imo|worldbank|imf/i.test(domain)
    ? "该来源发布/说明"
    : "该网页报道";
  const mainEvent = title
    ? `${sourceVerb}：${compactSourceStatement(title, 135)}。`
    : `${sourceVerb}：${compactSourceStatement(description || combined, 135)}。`;
  const numberSentence = nums.length ? `关键数字/时间：${nums.join("、")}。` : "";
  const detailSentence = description && description.length >= 16 ? `摘要信息：${compactSourceStatement(description, 170)}。` : "";
  const joinSummary = (sentences = []) => compactSourceStatement(sentences.filter(Boolean).join(" "), 380);

  if (!combined) return "";
  if (/关税|税率|反倾销|反补贴|countervailing|antidumping|tariff|duty|301|232|海关|customs/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源指向关税、海关或贸易救济变化，重点看税率、监管条件、申报资料、实施日期和目的国清关成本。"]);
  }
  if (/认证|合规|标准|证书|许可|licen[cs]e|certificate|standard|compliance|fcc|ce|ukca|anatel|nbtc|saber|rohs|reach|标签|label/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源指向准入、认证、标准或标签要求，重点看证书、说明书、测试报告、型号覆盖、进口商资质和标签是否要改。"]);
  }
  if (/电池|锂|battery|dangerous|hazmat|dg|un38|msds|危险品/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源指向电池或危险品风险，重点看 UN38.3、MSDS、包装方式、标签、SOC、SP188/例外条款和承运人接收规则。"]);
  }
  if (/shipping|freight|port|vessel|container|air cargo|logistics|供应链|航运|船期|港口|舱位|空运|运费|货运|物流|仓储|交付|delivery/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源指向物流或供应链变化，重点看运费、舱位、ETA、港口作业、仓储、拖车和客户交付承诺。"]);
  }
  if (/合作|联手|达成|扩容|升级|伙伴|供应商|客户|partner|supplier|customer|ecosystem/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源主要影响市场需求、供应稳定性和客户预期；通常不直接改变税号、认证或清关资料。"]);
  }
  if (/债券|融资|认购|投资级|股价|股票|盈利|营收|利润|finance|bond|market|stock|earnings|revenue|汇率|利率|通胀/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源是金融、融资、股价或成本信号，主要影响报价有效期、采购预算、付款风险和客户信用；通常不直接改变报关资料。"]);
  }
  if (/出口管制|制裁|限制|禁令|管制|sanction|export control|restriction|ban|restricted/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源指向管制、限制或制裁信号，重点看适用国家、产品范围、实施日期、客户/收货人是否受限，以及订单能否交付。"]);
  }
  if (/预计|量产|推出|发布|上市|施行|生效|开始|launch|release|effective|from/.test(lower)) {
    return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：这条来源有新事项或时间节点，重点摘出日期、适用对象，以及对报价、备货、交付或合规节点的影响。"]);
  }
  return joinSummary([mainEvent, detailSentence, numberSentence, "业务含义：当前来源未直接指向物流或关务规则变化，先作为市场/政策线索归档。"]);
}

function sourceStatementForItem(item = {}) {
  const localRule = item.localRule || null;
  if (localRule) {
    const changes = (localRule.changes || []).slice(0, 3).join("；");
    return compactSourceStatement(`${localRule.conclusion}${changes ? ` 变化点：${changes}` : ""}`, 260);
  }
  const candidates = [
    item.summaryZh,
    item.summary,
    item.description,
    item.snippet,
    item.excerpt,
    item.content,
    item.takeawayZh,
    item.takeaway
  ].map(cleanSourceLanguage).filter(Boolean);
  const first = candidates.find((text) => text.length >= 12) || candidates[0];
  const derived = deriveEventSummary(item);
  if (derived) {
    const title = removePublisherSuffix(item.title || "");
    const firstWithoutTitle = removeDuplicatedTitle(first || "", title);
    const firstRepeatsTitle = title && (!firstWithoutTitle || normalize(firstWithoutTitle) === normalize(title) || normalize(first || "").startsWith(normalize(title)));
    if (firstRepeatsTitle || /news\.google\.com|Google News|Manual checklist/i.test(sourceDomainLabel(item))) return derived;
    if (first && normalize(first).includes("该来源标题指向")) return derived;
  }
  if (first && derived) return derived;
  if (first) return compactSourceStatement(first, 260);
  if (derived) return derived;
  return item.title ? `标题显示：${item.title}` : "该来源未返回可读摘要。";
}

function sourceBusinessMeaning(item = {}, statement = "") {
  const text = normalize([item.title, item.category, statement, item.domain].join(" "));
  const points = [];
  if (/关税|tariff|duty|税率|301|232|cbp|海关|customs|清关/.test(text)) points.push("税费/清关资料");
  if (/认证|ccc|fcc|\bce\b|\bred\b|anatel|nbtc|saber|rohs|reach|标签|label/.test(text)) points.push("认证/标签");
  if (/电池|锂|battery|dg|dangerous|un38|msds|移动电源|充电宝/.test(text)) points.push("电池/DG/安全资料");
  if (/shipping|freight|port|vessel|container|air cargo|航运|船期|港口|舱位|空运|运费|物流/.test(text)) points.push("物流成本/时效");
  if (/汇率|利率|inflation|currency|rate|gdp|market|金融|成本/.test(text)) points.push("报价/采购成本");
  if (/制裁|export control|sanction|restricted|管制|地缘|政治/.test(text)) points.push("合规/交付风险");
  return points.length ? `影响：${Array.from(new Set(points)).join("、")}。` : "影响：当前来源只形成背景信息，未指向具体订单动作。";
}

function sourceOpinionForItem(item = {}, statement = "", context = "") {
  const title = removePublisherSuffix(item.title || item.localRule?.title || "");
  const subject = subjectFromTitle(title || statement || "这条信息");
  const text = normalize([title, statement, item.category, item.domain, context].join(" "));
  const titleContext = normalize([title, item.category].join(" "));
  const numbers = sourceNumbers(`${title} ${statement}`);
  const reason = numbers.length ? `因为它出现了 ${numbers.join("、")} 这样的时间/数字信号` : `因为来源主题是“${subject || sourceDomainLabel(item)}”`;
  if (/strike|congestion|port|terminal|shipping|vessel|container|freight|suez|panama|港口|码头|船期|航运|空运|快件|拥堵|罢工|绕航|运费|劳资/.test(titleContext) && !/关税|tariff|duty|301|232|反倾销|反补贴|trade remedy/.test(titleContext)) {
    return `我的判断：它的业务含义在交期和费用，不在单证本身。${reason}，要重查 ETA、截关、提柜预约、附加费和客户交付承诺。`;
  }
  if (/关税|tariff|duty|301|232|反倾销|反补贴|trade remedy|海关|customs|清关/.test(text)) {
    return `我的判断：这不是普通新闻，先按关务事件处理。${reason}，要确认税号、原产国、实施日期和是否影响在途订单。`;
  }
  if (/sanction|export control|restricted|denied|entity list|trade compliance|受限方|实体清单|制裁|出口管制|受限|战争|冲突|军演|地缘|选举/.test(text)) {
    return `我的判断：它可能改变能不能交易，而不只是影响交期。${reason}，要筛查客户、国家、收货人、最终用途和路线。`;
  }
  if (/认证|standard|certification|fcc|\bce\b|\bred\b|anatel|nbtc|saber|ccc|cnca|rohs|reach|label|标签|型号核准/.test(text)) {
    return `我的判断：它更像产品准入/认证信号，不应只转发给业务。${reason}，要让认证同事看证书覆盖型号、标签、说明书和过渡期。`;
  }
  if (/battery|lithium|dangerous goods|un38|msds|iata|imdg|电池|锂|危险品|磁性|移动电源/.test(text)) {
    return `我的判断：这条会先影响能不能出运，而不是只影响清关。${reason}，要先做电池/DG 文件和承运人预审。`;
  }
  if (/port|terminal|shipping|vessel|container|freight|strike|congestion|suez|panama|air cargo|express|courier|港口|码头|船期|航运|空运|快件|拥堵|罢工|绕航|运费/.test(text)) {
    return `我的判断：它的业务含义在交期和费用，不在单证本身。${reason}，要重查 ETA、截关、提柜预约、附加费和客户交付承诺。`;
  }
  if (/rate|inflation|currency|oil|fuel|central bank|market|stock|bond|汇率|利率|通胀|油价|金融|债券|股票|融资/.test(text)) {
    return `我的判断：它是报价和付款风险信号。${reason}，要缩短报价有效期或重算汇率、燃油、资金和客户信用风险。`;
  }
  if (/ai|chip|semiconductor|bluetooth|usb-c|software|cyber|人工智能|芯片|半导体|蓝牙|网络安全|科技/.test(text)) {
    return `我的判断：它是产品和供应链方向信号。${reason}，短期看客户需求和BOM变化，中期看认证资料、说明书和替代料风险。`;
  }
  return `我的判断：这条目前只能作为背景线索。${reason}，除非它关联当前国家、客户、产品或路线，否则不应直接改变订单动作。`;
}

function buildSourceDigests(items = [], options = {}) {
  const seen = new Set();
  return (Array.isArray(items) ? items : [])
    .filter((item) => item && (item.title || item.takeaway || item.takeawayZh || item.url || item.localRule))
    .filter((item) => {
      const key = `${item.url || ""}|${item.title || item.localRule?.title || ""}`.toLowerCase();
      if (!key.trim() || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, options.limit || 8)
    .map((item, index) => {
      const statement = sourceStatementForItem(item);
      return {
        index: index + 1,
        domain: sourceDomainLabel(item),
        title: item.title || item.localRule?.title || sourceDomainLabel(item),
        category: item.category || item.sourceType || item.sourceCountry || "来源",
        date: item.seendate || item.date || item.publishedAt || item.updatedAt || "",
        statement,
        meaning: sourceBusinessMeaning(item, statement),
        opinion: sourceOpinionForItem(item, statement, options.context || options.keyword || ""),
        url: item.url || item.localRule?.url || ""
      };
    });
}

function summarizeSourceDigests(digests = [], keyword = "") {
  if (!digests.length) return keyword ? `没有提取到“${keyword}”的来源内容。` : "当前没有可提炼的来源内容。";
  const head = keyword ? `关键词“${keyword}”：` : "";
  const categories = Array.from(new Set(digests.map((item) => item.category).filter(Boolean))).slice(0, 3);
  const first = digests[0];
  const second = digests.find((item) => item.domain !== first.domain) || digests[1];
  const lead = first ? `${first.domain}：${compactSourceStatement(first.statement, 120)}` : "";
  const supplement = second ? `另一个信号是 ${second.domain}：${compactSourceStatement(second.statement, 90)}` : "";
  return compactSourceStatement(
    `${head}本次提炼到 ${digests.length} 个来源网页${categories.length ? `，主题集中在 ${categories.join("、")}` : ""}。${lead}${supplement ? `；${supplement}` : ""}`,
    280
  );
}

function renderSourceDigestBoard(digests = [], heading = "来源逐条解读") {
  if (!digests.length) return "";
  return `
    <section class="source-digest-board" aria-label="${escapeHtml(heading)}">
      <div class="source-digest-heading">
        <span>${escapeHtml(heading)}</span>
        <strong>每个网页单独提炼，不合并套话</strong>
      </div>
      <div class="source-digest-grid">
        ${digests.map((item) => `
          <article class="source-digest-card">
            <span>${String(item.index).padStart(2, "0")} · ${escapeHtml(item.domain)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p><b>提炼要点：</b>${escapeHtml(item.statement)}</p>
            <p><b>独立判断：</b>${escapeHtml(item.opinion || item.meaning)}</p>
            <small>${escapeHtml(item.meaning)}${item.date ? ` · ${escapeHtml(formatEta(item.date))}` : ""}</small>
            ${item.url ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">打开来源</a>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPolicyUpdates(data = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  const analysis = buildPolicyAnalysis(data);
  const display = compactPolicyConclusion(data, analysis);
  const sourceGroups = Array.isArray(analysis.sourceGroups) ? analysis.sourceGroups.slice(0, 3) : [];
  const sourceDigests = buildSourceDigests(items, { limit: 8, context: [data.filters?.exportCountry, data.filters?.importCountry, data.filters?.product].filter(Boolean).join(" ") });
  const sourceConclusion = sourceDigests.length ? summarizeSourceDigests(sourceDigests, data.filters?.product || "") : display.conclusion;
  $("policyStatus").textContent = `已更新 · ${formatEta(data.updatedAt)}`;
  $("policyLiveGrid").innerHTML = `
    ${renderResultBrief({
      className: "policy-result-brief",
      kicker: "Policy Impact Brief",
      title: "政策/趋势影响结论",
      updatedAt: data.updatedAt,
      conclusion: sourceConclusion,
      risk: display.impact,
      cost: "重点复核关税/额外关税、认证费用、标签/文件整改、物流延误和清关成本是否变化。",
      action: display.actions[0] || "提取发布主体、实施日期、适用产品、材料要求和过渡期，写入订单备注。",
      source: sourceDigests.length ? `已逐条提炼 ${sourceDigests.length} 个来源网页。` : (analysis.sourceTrust || "来源：本地规则库和公开来源摘要。"),
      links: sourceGroups.flatMap((group) => group.items || [])
    })}
    ${renderSourceDigestBoard(sourceDigests, "政策来源逐条解读")}
    <article class="policy-summary-card policy-summary-wide conclusion-card">
      <span>当前判断</span>
      <strong>${escapeHtml(sourceConclusion)}</strong>
      <p>${escapeHtml(display.impact)}</p>
    </article>
    <div class="policy-structured-grid">
      ${buildPolicyBriefChecklist(data, analysis)
        .map(([title, text]) => `
          <article class="policy-structured-card">
            <span>${escapeHtml(title)}</span>
            <p>${escapeHtml(text)}</p>
          </article>
        `)
        .join("")}
    </div>
    <div class="policy-brief-grid">
      ${(analysis.dimensions || [])
        .map(
          (item) => `
            <article class="policy-brief-card">
              <span>${escapeHtml(item.level || "关注")}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.conclusion)}</p>
              <small>确认人：${escapeHtml(item.owner || "按事项分工")}</small>
            </article>
          `
        )
        .join("")}
      <article class="policy-brief-card trust">
        <span>可信度</span>
        <strong>${escapeHtml(analysis.sourceTrust || "来源需复核")}</strong>
        <p>${escapeHtml(analysis.trendDirection || "当前仅显示固定检查项。")}</p>
      </article>
    </div>
    <article class="policy-analysis-card">
      <span>下一步动作</span>
      <ul>${display.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    ${sourceGroups
      .map(
        (group) => `
          <article class="policy-analysis-card source-group-card">
            <span>${escapeHtml(group.title)}</span>
            <div class="source-chip-grid">
              ${(group.items || [])
                .slice(0, 5)
                .map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`)
                .join("")}
            </div>
          </article>
        `
      )
      .join("")}
    ${items
      .slice(0, 6)
      .map((item) => {
        const statement = sourceStatementForItem(item);
        const opinion = sourceOpinionForItem(item, statement, [data.filters?.exportCountry, data.filters?.importCountry, data.filters?.product].filter(Boolean).join(" "));
        return `
          <article class="policy-news-card">
            <span>${escapeHtml(item.category || item.domain || "政策")}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p><b>提炼要点：</b>${escapeHtml(statement)}</p>
            <p class="opinion-line"><b>判断：</b>${escapeHtml(opinion)}</p>
            ${item.action ? `<p class="action-line">${escapeHtml(item.action)}</p>` : ""}
            <a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">查看原文</a>
          </article>
        `;
      })
      .join("")}
  `;
}

function credibilityLabel(domain = "") {
  const official = /gov|customs|cnca|singlewindow|europa|wto/i.test(domain);
  if (official) return "高：官方/国际组织";
  const industry = /reuters|bloomberg|spglobal|joc|loadstar|maritime|ft|wsj/i.test(domain);
  if (industry) return "中高：媒体/行业解读";
  return "中：需复核来源";
}

function renderDeclarationElements(formText = "") {
  if (!$("elementGrid")) return;
  const keyword = formText || "";
  const shape = getCargoShape(keyword);
  const best = state.lastResult?.best || {};
  const inputFacts = [
    ["中文品名", $("productName")?.value],
    ["英文名称", $("englishName")?.value],
    ["品牌", $("brandName")?.value],
    ["型号", $("modelNumber")?.value],
    ["材质", $("material")?.value],
    ["用途", $("usage")?.value],
    ["目的国/地区", $("destination")?.value],
    ["原产国/地区", $("originCountry")?.value],
    ["补充说明", $("modelInfo")?.value],
    ["候选税号", best?.code ? `${best.code} ${best.name || ""}` : ""]
  ].filter(([, value]) => String(value || "").trim());
  const sizeSignal = keyword.match(/(\d+(?:\.\d+)?\s*(?:cm|mm|厘米|毫米)?\s*[x*×]\s*\d+(?:\.\d+)?\s*(?:cm|mm|厘米|毫米)?(?:\s*[x*×]\s*\d+(?:\.\d+)?\s*(?:cm|mm|厘米|毫米)?)?)/i);
  if (sizeSignal) inputFacts.push(["规格尺寸", sizeSignal[1]]);
  const suggestionMap = {
    packaging: ["包装材质：瓦楞纸/纸板/彩盒", "包装形态：箱/盒/匣/袋", "是否单独进口", "规格尺寸如实际已知再填写", "是否印刷、品牌或型号"],
    "display-panel": ["是否 LCD/LED 显示或指示板", "是否已装配驱动/控制元件", "接口类型", "用途和对应主机", "是否只是裸 LCD"],
    "speaker-part": ["对应整机", "高音/低音/中音/全频", "尺寸/功率/阻抗", "是否专用零件", "是否单独销售"],
    "speaker-no-enclosure": ["是否无箱体", "喇叭数量", "尺寸/功率/阻抗", "用途", "是否车载/嵌入式"],
    "pcba-part": ["裸 PCB 或已装配 PCBA", "对应整机", "主要功能", "是否具有独立功能", "接口/元器件状态"],
    "power-supply": ["输入/输出电压电流", "功率", "插头形式", "是否随整机", "内销/销售场景"],
    battery: ["电池类型", "Wh/mAh", "UN 编号", "包装方式", "MSDS/UN38.3"],
    cable: ["是否带接插件", "接口类型", "额定电压", "线长", "用途"]
  };
  const suggested = suggestionMap[shape.type] || (/耳机|headphone|earbud|headset/i.test(keyword)
    ? ["连接方式：蓝牙/无线/有线", "是否带麦克风", "是否含电池/充电盒", "佩戴方式", "品牌/型号"]
    : /音箱|soundbar|speaker/i.test(keyword)
      ? ["是否有箱体", "喇叭数量", "额定功率", "连接方式", "是否带电源适配器或电池"]
      : ["品名", "品牌", "型号", "用途", "材质", "功能原理"]);
  const staticRows = declarationSets.map(([title, items]) => {
    const active =
      (/(battery|电池|锂|charging case|充电盒)/.test(keyword) && title.includes("电池")) ||
      (/(wireless|bluetooth|蓝牙|无线)/.test(keyword) && title.includes("无线")) ||
      (/(soundbar|speaker|音箱|喇叭)/.test(keyword) && title.includes("音箱")) ||
      (/(headphone|headset|earbuds|耳机)/.test(keyword) && title.includes("耳机")) ||
      (/(repair|spare|维修|配件|零件)/.test(keyword) && title.includes("维修件"));
    if (!active) return "";
    return `
      <article class="check-card muted">
        <h3>参考 - ${escapeHtml(title)}</h3>
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    `;
  }).join("");
  $("elementGrid").innerHTML = `
    <article class="check-card declaration-input-card">
      <h3>已按输入读取</h3>
      ${inputFacts.length
        ? `<ul>${inputFacts.map(([label, value]) => `<li><b>${escapeHtml(label)}</b>：${escapeHtml(String(value).trim())}</li>`).join("")}</ul>`
        : "<p>还没有足够输入，系统不会替你联想品牌、型号、尺寸、用途或原产地。</p>"}
    </article>
    <article class="check-card declaration-needed-card">
      <h3>${escapeHtml(shape.label)}还要核对</h3>
      <ul>${suggested.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    ${staticRows}
  `;
}

function renderOps() {
  if (!$("opsGrid")) return;
  $("opsGrid").innerHTML = opsItems
    .map(
      ([title, text, tags]) => `
        <article class="ops-card">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(text)}</p>
          <div class="ops-meta">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </article>
      `
    )
    .join("");
}

function loadVesselExample() {
  $("vesselName").value = "EVER GIVEN";
  $("voyageNo").value = "001W";
  $("originPort").value = "Port Klang";
  $("destinationPort").value = "Shanghai";
  $("imoMmsi").value = "353136000";
  $("carrierName").value = "COSCO / OOCL 等按实际船司填写";
  renderShipmentResult({
    vessel: "EVER GIVEN",
    voyage: "001W",
    origin: "Port Klang",
    destination: "Shanghai",
    imo: "353136000",
    carrier: "COSCO / OOCL 等按实际船司填写",
    container: $("containerNo")?.value || "",
    bl: $("blNo")?.value || ""
  });
}

function extractMmsi(value = "") {
  const numbers = String(value).match(/\d{9}/);
  return numbers ? numbers[0] : "";
}

function extractPortCode(value = "") {
  const code = String(value).toUpperCase().match(/\b[A-Z]{5}\b/);
  return code ? code[0] : "";
}

const publicVesselDirectory = {
  "xin zhanjiang": { mmsi: "413150000", imo: "9378814", shipfinder: "https://www.shipfinder.com/ship/detail/mmsi/413150000", myshiptracking: "https://www.myshiptracking.com/vessels/xin-zhanjiang-mmsi-413150000-imo-9378814" },
  "ever given": { mmsi: "353136000", imo: "9811000", shipfinder: "https://www.shipfinder.com/ship/detail/mmsi/353136000", myshiptracking: "https://www.myshiptracking.com/vessels/ever-given-mmsi-353136000-imo-9811000" }
};

function normalizeVesselKey(value = "") {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function isStaleDataTime(value = "", maxHours = 24) {
  const date = new Date(value || "");
  if (Number.isNaN(date.getTime())) return true;
  return Date.now() - date.getTime() > maxHours * 60 * 60 * 1000;
}

function buildPublicVesselLinks(payload = {}, result = {}) {
  const vesselKey = normalizeVesselKey(result.shipName || result.vessel || payload.vessel || "");
  const known = publicVesselDirectory[vesselKey] || {};
  const mmsi = extractMmsi(payload.imo || payload.mmsi || result.mmsi || known.mmsi || "");
  const shipfinder = known.shipfinder || (mmsi ? `https://www.shipfinder.com/ship/detail/mmsi/${mmsi}` : "https://www.shipfinder.com/");
  const query = encodeURIComponent(result.shipName || result.vessel || payload.vessel || "");
  const myshiptracking = known.myshiptracking || `https://www.myshiptracking.com/search?query=${query}`;
  return { shipfinder, myshiptracking, mmsi, known: Boolean(known.mmsi) };
}

function showVesselPublicPanel(payload = {}, result = {}, reason = "") {
  const panel = $("vesselPublicPanel");
  const frame = $("vesselPublicFrame");
  const link = $("vesselPublicLink");
  const note = $("vesselPublicNote");
  const links = buildPublicVesselLinks(payload, result);
  renderInlineVesselFallback(payload, result, reason, links);
  if (!panel || !frame || !link || !note) return links;
  frame.src = links.shipfinder;
  link.href = links.shipfinder;
  note.textContent = `${reason || "免费接口没有返回可确认的新鲜坐标。"} 系统已打开 Shipfinder 公开船位页；如小窗口被第三方网站拦截，请点击“打开原网页”。${links.mmsi ? ` MMSI：${links.mmsi}。` : " 未识别 MMSI，建议补 9 位 MMSI 提高准确度。"}`;
  panel.classList.add("hidden");
  return links;
}

function hideVesselPublicPanel() {
  const panel = $("vesselPublicPanel");
  const frame = $("vesselPublicFrame");
  const inline = $("vesselInlineFallback");
  if (inline) {
    inline.classList.add("hidden");
    inline.innerHTML = "";
  }
  if (!panel || !frame) return;
  panel.classList.add("hidden");
  frame.removeAttribute("src");
}

function renderInlineVesselFallback(payload = {}, result = {}, reason = "", links = null) {
  const target = $("vesselInlineFallback");
  if (!target) return;
  const builtLinks = links || buildPublicVesselLinks(payload, result);
  const vessel = result.shipName || result.vessel || payload.vessel || "未填写船名";
  target.classList.remove("hidden");
  target.innerHTML = `
    <div class="vessel-public-mini">
      <div class="vessel-mini-head">
        <span>ShipFinder 备用查询</span>
        <strong>${escapeHtml(vessel)}</strong>
        <small>${escapeHtml(reason || "自动接口未取得新鲜船位。")}</small>
      </div>
      <div class="vessel-mini-screen" aria-hidden="true">
        <div class="vessel-mini-search">${escapeHtml(vessel)}<i></i></div>
        <div class="vessel-mini-map">
          <span class="mini-coast"></span>
          <span class="mini-radar"></span>
          <b>${escapeHtml(builtLinks.mmsi || "MMSI ?")}</b>
        </div>
      </div>
      <div class="manual-field-grid">
        <div><span>建议字段</span><b>英文船名 / MMSI / IMO</b></div>
        <div><span>数据判断</span><b>以 Shipfinder 页面时间为准</b></div>
      </div>
      <div class="source-chip-grid">
        <a href="${escapeHtml(builtLinks.shipfinder)}" target="_blank" rel="noreferrer">打开 Shipfinder</a>
        <a href="${escapeHtml(builtLinks.myshiptracking)}" target="_blank" rel="noreferrer">备用船位页</a>
      </div>
    </div>
  `;
}

function buildFailureDialogHtml({ reason = "", intro = "", links = [], fields = [], next = [] } = {}) {
  return `
    <div class="failure-dialog-body">
      <div class="sad-animation" aria-hidden="true">
        <span></span>
        <i></i>
      </div>
      <div class="failure-copy">
        <h3>很遗憾，这次没有拿到实时结果</h3>
        <p>${escapeHtml(intro || "自动查询没有返回可用实时内容，平台仅显示可核验来源与人工处理建议。")}</p>
        <strong>${escapeHtml(reason || "原因可能是官网验证码、登录限制、接口未返回或字段不足。")}</strong>
      </div>
      ${
        fields.length
          ? `<div class="manual-field-grid">${fields.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join("")}</div>`
          : ""
      }
      ${
        links.length
          ? `<div class="source-chip-grid">${links.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}</div>`
          : ""
      }
      ${next.length ? `<ul>${next.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
    </div>
  `;
}

function showShipfinderFallbackDialog(payload = {}, result = {}, reason = "") {
  const links = buildPublicVesselLinks(payload, result);
  const vessel = result.shipName || result.vessel || payload.vessel || "这条船";
  recordQueryFailure({
    module: "船期/船位",
    query: `${vessel}${payload.destination ? ` -> ${payload.destination}` : ""}`,
    reason: reason || "自动接口没有取得可确认的新鲜船位。",
    links: [["Shipfinder", links.shipfinder], ["MyShipTracking", links.myshiptracking]]
  });
  openResultDialog(
    "船期/船位暂未查到",
    "Shipfinder",
    buildFailureDialogHtml({
      intro: "自动接口没有取得可确认的新鲜船位，系统不会编造船期或 ETA。",
      reason,
      fields: [["船名", vessel], ["MMSI", links.mmsi || "未识别，建议补充 9 位 MMSI"]],
      links: [["打开 Shipfinder 查询", links.shipfinder], ["备用：MyShipTracking", links.myshiptracking]],
      next: ["如果 Shipfinder 打不开或没有该船，请补充 MMSI/IMO、船司、提单号或箱号后再查。", "如果查到位置，请以页面显示的数据时间为准，超过 24 小时不要当作最新船位。"]
    })
  );
}

function formatEta(value = "") {
  if (!value) return "ETA 未返回";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatDataAge(value = "") {
  if (!value) return "未返回";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const diffMs = Date.now() - date.getTime();
  if (diffMs < 0) return `${formatEta(value)} · 未来时间`;
  const minutes = Math.round(diffMs / 60000);
  const age = minutes < 60 ? `${minutes} 分钟前` : minutes < 1440 ? `${Math.round(minutes / 60)} 小时前` : `${Math.round(minutes / 1440)} 天前`;
  return `${formatEta(value)} · ${age}`;
}

function getVesselDataTime(result = {}, updatedAt = "") {
  return result.lastReportAt || result.position?.updatedAt || result.position?.lasttime || updatedAt || "";
}

function shipmentFreshnessText(freshness = {}, dataTime = "") {
  if (freshness?.level === "live") return "实时/近实时";
  if (freshness?.level === "recent") return "24小时内";
  if (freshness?.level === "stale") return "数据过期";
  if (dataTime) return "时间待判断";
  return "未返回时间";
}

function formatPosition(position = {}) {
  const lon = position.lon;
  const lat = position.lat;
  const area = position.city || position.seaArea || "";
  if (lon !== "" && lat !== "") return `${area ? `${area} · ` : ""}${lat}, ${lon}`;
  return area || "AIS 位置未返回";
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatCoordinate(value, type) {
  const number = toNumber(value);
  if (number === null) return "";
  const direction = type === "lat" ? (number >= 0 ? "北纬" : "南纬") : number >= 0 ? "东经" : "西经";
  return `${direction}${Math.abs(number).toFixed(3)}°`;
}

function findPortCoordinate(value = "") {
  const needle = normalize(value);
  if (!needle) return null;
  return (
    portCoordinates.find((port) => {
      const haystack = normalize([port.name, ...port.aliases].join(" "));
      return haystack.includes(needle) || needle.includes(normalize(port.name)) || port.aliases.some((alias) => needle.includes(normalize(alias)));
    }) || null
  );
}

function distanceNm(from = {}, to = {}) {
  const lat1 = toNumber(from.lat);
  const lon1 = toNumber(from.lon);
  const lat2 = toNumber(to.lat);
  const lon2 = toNumber(to.lon);
  if ([lat1, lon1, lat2, lon2].some((value) => value === null)) return null;
  const radiusKm = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const km = radiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return km / 1.852;
}

function estimateDestinationArrival(position = {}, destination = "", speedValue = "") {
  const port = findPortCoordinate(destination);
  if (!port) return "";
  const nm = distanceNm(position, port);
  if (nm === null) return "";
  const speed = Math.max(8, Math.min(24, Number(speedValue) || 16));
  const days = nm / speed / 24;
  if (days < 0.2) return `已接近${port.name}`;
  if (days < 1) return `到${port.name}约 ${Math.max(2, Math.round(days * 24))} 小时`;
  return `到${port.name}约 ${days.toFixed(days >= 4 ? 0 : 1)} 天`;
}

function osmEmbedUrl(lat, lon, zoomSpan = 4) {
  const latNum = toNumber(lat);
  const lonNum = toNumber(lon);
  if (latNum === null || lonNum === null) return "";
  const south = clamp(latNum - zoomSpan * 0.55, -85, 85);
  const north = clamp(latNum + zoomSpan * 0.55, -85, 85);
  const west = clamp(lonNum - zoomSpan, -180, 180);
  const east = clamp(lonNum + zoomSpan, -180, 180);
  const url = new URL("https://www.openstreetmap.org/export/embed.html");
  url.searchParams.set("bbox", `${west},${south},${east},${north}`);
  url.searchParams.set("layer", "mapnik");
  url.searchParams.set("marker", `${latNum},${lonNum}`);
  return url.toString();
}

function osmLinkUrl(lat, lon) {
  const latNum = toNumber(lat);
  const lonNum = toNumber(lon);
  if (latNum === null || lonNum === null) return "https://www.openstreetmap.org/";
  return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(latNum)}&mlon=${encodeURIComponent(lonNum)}#map=6/${encodeURIComponent(latNum)}/${encodeURIComponent(lonNum)}`;
}

function hideLeafletMap() {
  $("vesselLeafletMap")?.classList.add("hidden");
}

function ensureLeafletMap(lat = 20, lon = 110) {
  const element = $("vesselLeafletMap");
  if (!element || typeof window.L === "undefined") return null;
  element.classList.remove("hidden");
  if (!vesselMapState.map) {
    vesselMapState.map = window.L.map(element, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true
    }).setView([lat, lon], 4);
    vesselMapState.tileLayer = window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "&copy; OpenStreetMap"
    }).addTo(vesselMapState.map);
  }
  window.setTimeout(() => vesselMapState.map.invalidateSize(), 50);
  return vesselMapState.map;
}

function setLeafletMarker(lat, lon, label = "船舶位置", zoom = 5) {
  const map = ensureLeafletMap(lat, lon);
  if (!map) return false;
  const point = [lat, lon];
  const icon = window.L.divIcon({
    className: "ship-map-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
  map.setView(point, zoom);
  if (!vesselMapState.marker) {
    vesselMapState.marker = window.L.marker(point, { icon }).addTo(map);
  } else {
    vesselMapState.marker.setLatLng(point);
    vesselMapState.marker.setIcon(icon);
  }
  vesselMapState.marker.unbindTooltip();
  vesselMapState.marker.bindTooltip(label, {
    permanent: true,
    direction: "top",
    offset: [0, -12],
    className: "ship-map-tooltip"
  }).openTooltip();
  return true;
}

function describeSeaArea(lat, lon) {
  const latNum = toNumber(lat);
  const lonNum = toNumber(lon);
  if (latNum === null || lonNum === null) return "当前位置未返回坐标";
  if (latNum >= 18 && latNum <= 42 && lonNum >= 105 && lonNum <= 126) return "中国沿海或近海区域";
  if (latNum >= 1 && latNum <= 24 && lonNum >= 100 && lonNum <= 122) return "南海或东南亚航线附近";
  if (latNum >= -10 && latNum <= 10 && lonNum >= 95 && lonNum <= 110) return "马六甲海峡或新加坡附近";
  if (latNum >= 20 && latNum <= 32 && lonNum >= 120 && lonNum <= 132) return "东海或日本西南海域附近";
  if (latNum >= 30 && latNum <= 45 && lonNum >= -130 && lonNum <= -115) return "美国西海岸附近";
  if (latNum >= 45 && latNum <= 60 && lonNum >= -10 && lonNum <= 15) return "欧洲北海/英吉利海峡附近";
  return "公开 AIS 坐标附近海域";
}

function clamp(number, min, max) {
  return Math.min(max, Math.max(min, number));
}

function setVesselMap(position = {}, destination = "") {
  const frame = $("vesselRealMap");
  const placeholder = $("vesselMapPlaceholder");
  const mapLink = $("vesselMapLink");
  const marker = $("vesselMarker");
  const lat = toNumber(position.lat);
  const lon = toNumber(position.lon);
  marker?.classList.add("hidden");
  if (lat === null || lon === null) {
    const port = findPortCoordinate(destination);
    if (port) {
      const leafletOk = setLeafletMarker(port.lat, port.lon, "目的港", 7);
      if (!leafletOk) {
        hideLeafletMap();
        frame.src = osmEmbedUrl(port.lat, port.lon, 2.5);
        frame.classList.remove("hidden");
      } else {
        frame.classList.add("hidden");
        frame.removeAttribute("src");
      }
      placeholder.classList.add("hidden");
      mapLink.href = osmLinkUrl(port.lat, port.lon);
      mapLink.classList.remove("hidden");
      $("shipLocationNarrative").textContent = `暂时没有拿到船舶坐标；地图先显示 ${port.name} 周边，便于理解目的港位置。`;
      return;
    }
    hideLeafletMap();
    frame.classList.add("hidden");
    frame.removeAttribute("src");
    placeholder.classList.remove("hidden");
    mapLink.classList.add("hidden");
    $("shipLocationNarrative").textContent = `暂时没有拿到船舶坐标；系统会继续显示文字结果，目的港：${destination || "未填写" }。`;
    return;
  }

  const leafletOk = setLeafletMarker(lat, lon, "船舶位置", 5);
  if (!leafletOk) {
    hideLeafletMap();
    frame.src = osmEmbedUrl(lat, lon);
    frame.classList.remove("hidden");
  } else {
    frame.classList.add("hidden");
    frame.removeAttribute("src");
  }
  placeholder.classList.add("hidden");
  mapLink.href = osmLinkUrl(lat, lon);
  mapLink.classList.remove("hidden");
  $("shipLocationNarrative").textContent = `这艘船大致在${describeSeaArea(lat, lon)}，坐标约 ${formatCoordinate(position.lat, "lat")}、${formatCoordinate(position.lon, "lon")}，目前显示的下一港/目的港是 ${destination || "未返回" }。`;
}

async function fetchShipxyEta(payload) {
  if (!location.protocol.startsWith("http")) {
    return { ok: false, code: "LOCAL_FILE", message: "本地文件预览不调用后端接口。" };
  }

  const mmsi = extractMmsi(payload.imo);
  const params = new URLSearchParams();
  if (mmsi) params.set("mmsi", mmsi);
  if (payload.vessel) params.set("shipname", payload.vessel);
  if (payload.destination) params.set("destination", payload.destination);
  params.set("_ts", String(Date.now()));

  if (!mmsi && !payload.vessel) {
    return { ok: false, code: "VESSEL_REQUIRED", message: "请输入船名；MMSI 可选。" };
  }

  const portcode = extractPortCode(payload.destination);
  if (portcode) params.set("portcode", portcode);

  const path = `/.netlify/functions/shipxy-eta?${params.toString()}`;
  const urls = location.hostname === new URL(SERVER_API_BASE).hostname ? [path] : [`${SERVER_API_BASE}${path}`, path];
  let lastError = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        }
      });
      const data = await response.json();
      if (data.ok) return data;
      lastError = data;
    } catch (error) {
      lastError = { ok: false, message: error.message || "船期接口请求失败。" };
    }
  }

  return lastError || { ok: false, message: "船期接口请求失败。" };
}

function applyKeywordToShippingPayload(payload = {}, source = "", keyword = "") {
  const value = String(keyword || "").trim();
  if (!value) return payload;
  const compact = value.replace(/\s+/g, "");
  if (/^\d{9}$/.test(compact)) {
    payload.mmsi = compact;
  } else if (/^[A-Z]{4}\d{7}$/i.test(compact)) {
    payload.container = compact.toUpperCase();
  } else if (/^(shipxy|shipfinder|vessel)$/i.test(source)) {
    payload.vessel = value;
  } else if (/^[A-Z0-9-]{6,}$/i.test(compact)) {
    payload.bl = compact.toUpperCase();
  } else {
    payload.vessel = payload.vessel || value;
    payload.bl = payload.bl || value;
  }
  return payload;
}

function buildShippingScriptPayload(source = "shipxy", keyword = "") {
  const payload = {
    source,
    vessel: $("vesselName")?.value || "",
    voyage: $("voyageNo")?.value || "",
    origin: $("originPort")?.value || "",
    destination: $("destinationPort")?.value || $("customsCode")?.value || "",
    mmsi: extractMmsi($("imoMmsi")?.value || ""),
    carrier: $("carrierName")?.value || "",
    container: $("shipmentContainerNo")?.value || $("containerNo")?.value || "",
    bl: $("shipmentBlNo")?.value || $("blNo")?.value || ""
  };
  return applyKeywordToShippingPayload(payload, source, keyword);
}

async function fetchShippingBrowserQuery(source = "shipxy", payload = {}) {
  if (!location.protocol.startsWith("http")) {
    return { ok: false, code: "LOCAL_FILE", message: "本地文件预览不调用后端网页脚本。" };
  }

  const params = new URLSearchParams({
    source,
    vessel: payload.vessel || "",
    destination: payload.destination || "",
    mmsi: payload.mmsi || "",
    container: payload.container || "",
    bl: payload.bl || "",
    _ts: String(Date.now())
  });
  const path = `/.netlify/functions/shipping-browser-query?${params.toString()}`;
  const urls = location.hostname === new URL(SERVER_API_BASE).hostname ? [path] : [`${SERVER_API_BASE}${path}`, path];
  let lastError = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      lastError = { ok: false, code: "SCRIPT_REQUEST_ERROR", message: error.message || "网页脚本请求失败。" };
    }
  }

  return lastError || { ok: false, code: "SCRIPT_REQUEST_ERROR", message: "网页脚本请求失败。" };
}

function browserQueryActionText(data = {}) {
  const code = String(data.code || "");
  const text = normalize([data.message, data.note, data.stderr, data.stdout].join(" "));
  if (/PLAYWRIGHT|BROWSER_QUERY_DISABLED/i.test(code)) return "需要在服务器启用浏览器脚本环境；当前可先用 ShipXY API、船司或码头官网复核。";
  if (/captcha|验证码|滑动|verify|robot|人机|登录|login|password/.test(text)) return "第三方网站要求登录、滑块或验证码，请由查询人完成验证后再读取结果。";
  if (/QUERY_EMPTY/i.test(code)) return "请至少填写船名、MMSI、箱号或提单号。";
  return "建议补充 MMSI、箱号或提单号；仍失败时，换用船司/码头官网复核。";
}

function renderBrowserScriptResult(targetId = "", data = {}, payload = {}) {
  const target = $(targetId);
  if (!target) return;
  const result = data.result || {};
  const ok = Boolean(data.ok);
  const queriedAt = formatEta(data.queriedAt || result.queriedAt || new Date().toISOString());
  const fields = [
    ["来源", data.source || payload.source || "网页脚本"],
    ["船名/航次", [result.vessel || result.shipName || payload.vessel, result.voyage || payload.voyage].filter(Boolean).join(" / ") || "未抽取"],
    ["ETA/到港", result.eta || "未抽取"],
    ["箱号", result.container || payload.container || "未填写"],
    ["状态", result.status || (ok ? "已返回网页文字" : "未取得结果")],
    ["查询时间", queriedAt]
  ];
  target.innerHTML = `
    <article class="script-result-card ${ok ? "success" : "warning"}">
      <div class="script-result-head">
        <div>
          <span>${ok ? "脚本查询完成" : "脚本暂未完成"}</span>
          <strong>${escapeHtml(ok ? "已整理网页查询摘要" : data.message || "网页脚本没有返回可用结果")}</strong>
        </div>
        <b>${escapeHtml(ok ? "Result" : data.code || "Need Action")}</b>
      </div>
      <div class="manual-field-grid script-result-grid">
        ${fields.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join("")}
      </div>
      <p>${escapeHtml(ok ? (data.note || "脚本结果来自网页文字抽取，正式决策仍以原网站和船司/码头确认为准。") : browserQueryActionText(data))}</p>
      ${
        data.fallbackTried
          ? `<p class="script-fallback-note">备用源 ${escapeHtml(data.fallbackTried.source || "HB56")}：${escapeHtml(data.fallbackTried.message || data.fallbackTried.code || "未取得结果")}</p>`
          : ""
      }
      ${result.rawText ? `<details class="script-raw-drawer"><summary>查看抽取文字</summary><p>${escapeHtml(result.rawText.slice(0, 1200))}</p></details>` : ""}
    </article>
  `;
}

function applyBrowserResultToShipment(data = {}, payload = {}) {
  if (!data.ok) return;
  const result = data.result || {};
  const positionTime = result.position?.updatedAt || result.position?.lasttime || result.updatedAt || data.queriedAt || "";
  const stalePosition = result.position?.lat && result.position?.lon ? isStaleDataTime(positionTime) : true;
  $("shipmentSourceLabel").textContent = "Browser Script Result";
  $("shipmentApiState").textContent = "网页脚本结果";
  $("shipmentTitle").textContent = [result.vessel || payload.vessel || "未抽取船名", result.voyage || payload.voyage || ""].filter(Boolean).join(" / ");
  $("shipmentEta").textContent = result.eta || "网页未抽取到 ETA";
  $("shipmentStatus").textContent = result.status || "已返回网页文字，需看原网站状态";
  $("shipmentDataTime").textContent = formatDataAge(positionTime || data.queriedAt || new Date().toISOString());
  $("shipmentReminder").textContent = "网页脚本只整理原网站结果；如第三方网站有验证码，以人工验证后的原网站结果为准。";
  $("shipmentApiNote").textContent = `网页脚本来源：${data.source || payload.source || "第三方网站"}；船位数据时间 ${formatDataAge(positionTime || data.queriedAt || new Date().toISOString())}${stalePosition ? "；注意：该船位不是 24 小时内新鲜数据。" : ""}。`;
  renderShipmentJudgement(buildShipmentJudgement({
    payload,
    result,
    updatedAt: positionTime || data.queriedAt || "",
    source: data.source || payload.source || "网页脚本",
    freshness: { level: stalePosition ? "stale" : "fresh" }
  }));
  if (result.position?.lat && result.position?.lon) {
    $("shipmentPosition").textContent = `${formatPosition(result.position)}${result.position.speed ? ` · ${result.position.speed}` : ""}`;
    setVesselMap(result.position, payload.destination || result.destination || "");
    loadShipmentRouteRisk({ ...payload, destination: payload.destination || result.destination || "" }, { position: result.position, shipName: result.vessel || payload.vessel });
    if (stalePosition) {
      showVesselPublicPanel(payload, result, "网页脚本返回了坐标，但船位时间超过 24 小时或无法确认新鲜度。");
      showShipfinderFallbackDialog(payload, result, "网页脚本返回了坐标，但船位时间超过 24 小时或无法确认新鲜度。");
    } else hideVesselPublicPanel();
  } else {
    showVesselPublicPanel(payload, result, "网页脚本没有抽取到坐标。");
    showShipfinderFallbackDialog(payload, result, "网页脚本没有抽取到坐标。");
  }
}

async function runShippingBrowserScript() {
  const source = $("shippingScriptSource")?.value || "shipxy";
  const payload = buildShippingScriptPayload(source, $("shippingScriptKeyword")?.value || "");
  renderBrowserScriptResult("shippingScriptResult", { ok: false, code: "RUNNING", message: "网页脚本正在运行，请等待服务器返回。" }, payload);
  $("shippingSourceStatus").textContent = "网页脚本运行中";
  showQueryOverlay("正在运行网页脚本", "服务器正在打开第三方网站查询；遇到验证码时会返回人工验证提示。", "Browser Script");
  try {
    const data = await fetchShippingBrowserQuery(source, payload);
    renderBrowserScriptResult("shippingScriptResult", data, payload);
    applyBrowserResultToShipment(data, payload);
    $("shippingSourceStatus").textContent = `${data.ok ? "脚本完成" : "需要处理"} · ${formatEta(data.queriedAt || new Date().toISOString())}`;
  } catch (error) {
    renderBrowserScriptResult("shippingScriptResult", { ok: false, code: "SCRIPT_ERROR", message: error.message || "网页脚本运行失败。" }, payload);
    $("shippingSourceStatus").textContent = "脚本失败";
  } finally {
    hideQueryOverlay();
  }
}

async function runCustomsBrowserScript() {
  const source = $("customsScriptSource")?.value || "sipg";
  const keyword = $("customsScriptKeyword")?.value || "";
  const payload = buildShippingScriptPayload(source, keyword);
  payload.container = payload.container || $("containerNo")?.value || "";
  payload.bl = payload.bl || $("blNo")?.value || "";
  payload.destination = $("customsCode")?.value || payload.destination || "上海港";
  $("customsStatus").textContent = "通关网页脚本运行中";
  renderBrowserScriptResult("customsScriptResult", { ok: false, code: "RUNNING", message: "正在查询码头/港航网页。" }, payload);
  showQueryOverlay("正在查询通关/箱货状态", "服务器正在打开码头或港航网页；遇到验证码时会提示人工验证。", "Customs Script");
  try {
    const data = await fetchShippingBrowserQuery(source, payload);
    renderBrowserScriptResult("customsScriptResult", data, payload);
    $("customsStatus").textContent = data.ok ? "脚本已返回结果 · 请复核原网站" : "脚本未完成 · 需要人工验证或补充字段";
    if (data.ok && data.result?.rawText && $("customsManualPaste")) {
      $("customsManualPaste").value = data.result.rawText;
      summarizeCustomsManualResult();
    }
  } catch (error) {
    renderBrowserScriptResult("customsScriptResult", { ok: false, code: "SCRIPT_ERROR", message: error.message || "通关脚本运行失败。" }, payload);
    $("customsStatus").textContent = "脚本失败";
  } finally {
    hideQueryOverlay();
  }
}

async function queryShipment(event) {
  event.preventDefault();
  const payload = {
    vessel: $("vesselName").value || "UNKNOWN VESSEL",
    voyage: $("voyageNo").value || "TBD",
    origin: $("originPort").value || "Origin Port",
    destination: $("destinationPort").value || "Destination Port",
    imo: $("imoMmsi").value || "",
    carrier: $("carrierName")?.value || "",
    container: $("containerNo")?.value || "",
    bl: $("blNo")?.value || ""
  };

  $("shipmentApiState").textContent = "查询中";
  $("shipmentSourceLabel").textContent = "Live Query";
  $("shipmentApiNote").textContent = "正在通过船讯网按船名/MMSI 查询；只填船名和目的港也可以，航次作为备注字段。";
  loadShippingSources(payload);
  addHistory("船期查询", `${payload.vessel} -> ${payload.destination}`, "已查询船舶位置和第三方入口");
  showQueryOverlay("正在查询船期和船位", `${payload.vessel} -> ${payload.destination}。正在读取船位、数据时间和 ETA 相关信息。`, "Shipment Desk");

  try {
    const apiData = await fetchShipxyEta(payload);
    if (apiData.ok) {
      renderShipxyResult(payload, apiData.result, apiData.updatedAt, apiData.source, apiData.freshness);
      return;
    }
    const scriptData = await fetchShippingBrowserQuery("shipfinder", payload);
    renderBrowserScriptResult("shippingScriptResult", scriptData, { ...payload, source: "shipfinder" });
    if (scriptData.ok) {
      applyBrowserResultToShipment(scriptData, payload);
      return;
    }
    renderShipmentResult(payload, { ...apiData, showDialog: true });
  } catch (error) {
    renderShipmentResult(payload, {
      code: "REQUEST_ERROR",
      message: error.message || "接口请求失败。",
      showDialog: true
    });
  } finally {
    hideQueryOverlay();
  }
}

async function loadShippingSources(payload = {}) {
  const grid = $("shippingSourceGrid");
  if (!grid) return;
  $("shippingSourceStatus").textContent = "正在探测入口";
  grid.innerHTML = `<article class="source-probe-card"><strong>正在检查免费网页源...</strong><p>如果第三方网站要求登录或验证，系统会显示人工验证入口。</p></article>`;

  try {
    const params = new URLSearchParams({
      vessel: payload.vessel || $("vesselName")?.value || "",
      destination: payload.destination || $("destinationPort")?.value || "",
      carrier: payload.carrier || $("carrierName")?.value || "",
      container: payload.container || $("shipmentContainerNo")?.value || $("containerNo")?.value || "",
      bl: payload.bl || $("shipmentBlNo")?.value || $("blNo")?.value || ""
    });
    const data = await fetchJsonOrFallback(`/.netlify/functions/shipping-sources?${params.toString()}`, fallbackShippingSources());
    renderShippingSources(data);
  } catch (error) {
    renderShippingSources(fallbackShippingSources(error.message));
  }
}

async function loadShipmentRouteRisk(payload = {}, result = {}) {
  const summary = $("shipmentRiskSummary");
  const grid = $("shipmentRiskGrid");
  const status = $("shipmentRiskStatus");
  if (!summary || !grid || !status) return;
  const lat = result.position?.lat;
  const lon = result.position?.lon;
  const params = new URLSearchParams({
    destination: payload.destination || result.nextPort?.name || "",
    vessel: result.shipName || payload.vessel || ""
  });
  if (lat !== "" && lat !== undefined) params.set("lat", lat);
  if (lon !== "" && lon !== undefined) params.set("lon", lon);
  status.textContent = "正在判断航线风险";
  summary.innerHTML = `<strong>正在判断</strong><p>正在结合船位、目的港、天气海况和公开海域新闻判断是否影响 ETA。</p>`;
  grid.innerHTML = "";
  try {
    const data = await fetchJsonOrFallback(`/.netlify/functions/shipment-risk?${params.toString()}`, null);
    renderShipmentRouteRisk(data);
  } catch (error) {
    renderShipmentRouteRisk({ ok: false, message: error.message || "航线风险查询失败。" });
  }
}

function renderShipmentRouteRisk(data = {}) {
  const summary = $("shipmentRiskSummary");
  const grid = $("shipmentRiskGrid");
  const status = $("shipmentRiskStatus");
  if (!summary || !grid || !status) return;
  if (!data?.ok) {
    status.textContent = "未形成判断";
    summary.innerHTML = `<strong>暂时不能判断</strong><p>${escapeHtml(data?.message || "需要先拿到船舶坐标或可识别的目的港。")}</p>`;
    grid.innerHTML = "";
    return;
  }
  status.textContent = `已更新 · ${formatEta(data.updatedAt)}`;
  summary.innerHTML = `
    <strong>${escapeHtml(data.conclusion || "已生成航线风险判断")}</strong>
    <p>判断区域：${escapeHtml(data.region || "未识别")}；坐标来源：${escapeHtml(data.coordinateSource || "自动判断")}。</p>
  `;
  const militaryItems = data.military?.items || [];
  grid.innerHTML = `
    <article class="risk-card route-risk-card">
      <span>天气海况</span>
      <h3>${escapeHtml(data.weather?.level || "待判断")}</h3>
      <p>${escapeHtml(data.weather?.summary || "暂无天气海况结果。")}</p>
      <ul>${(data.weather?.points || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="risk-card route-risk-card">
      <span>季节性风险</span>
      <h3>${escapeHtml(data.seasonal?.level || "观察")}</h3>
      <p>${escapeHtml(data.seasonal?.summary || "暂无季节性风险判断。")}</p>
    </article>
    <article class="risk-card route-risk-card">
      <span>军演/海域新闻</span>
      <h3>${escapeHtml(data.military?.level || "未见明显信号")}</h3>
      <p>${escapeHtml(data.military?.summary || "暂无公开新闻信号。")}</p>
      ${
        militaryItems.length
          ? `<div class="mini-link-list">${militaryItems
              .slice(0, 3)
              .map((item) => `<a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(item.title || item.domain || "来源")}</a>`)
              .join("")}</div>`
          : ""
      }
    </article>
    <article class="risk-card route-risk-card">
      <span>需要补充的信息</span>
      <h3>让判断更准</h3>
      <ul>${(data.nextInputs || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function fallbackShippingSources(message = "") {
  return {
    ok: false,
    fallback: true,
    source: "第三方入口清单",
    updatedAt: new Date().toISOString(),
    summary: message || "当前先显示可人工查询的免费网页入口。",
    items: [
      { name: "船讯网", url: "https://www.shipxy.com/", type: "船舶位置 / AIS", status: "需要人工验证", fields: ["船名", "MMSI/IMO", "目的港"], note: "可查船舶大致位置，遇到登录或验证码由查询人完成。" },
      { name: "港航纵横", url: "https://www.hb56.com/Index.aspx", type: "港航/箱货/放行", status: "可能需要登录", fields: ["箱号", "提单号", "船名航次"], note: "适合手工查箱货/港航信息，可能需要账号或验证码。" },
      { name: "上港集团箱货查询", url: "https://www.sipg.com.cn/conquery/index", type: "上海港箱货状态", status: "需要人工验证", fields: ["箱号", "提单号"], note: "常见滑动验证，不绕过，由查询人完成。" },
      { name: "COSCO Cargo Tracking", url: "https://elines.coscoshipping.com/ebusiness/cargoTracking", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "中远海运官方入口，适合复核 ETA、箱动态、放箱/提箱节点。" },
      { name: "OOCL Cargo Tracking", url: "https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "东方海外官方入口，适合用箱号或提单号核验最新事件。" },
      { name: "Maersk Tracking", url: "https://www.maersk.com/tracking/", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "马士基官方入口，优先看 ETA/ETD、转运港和箱动态。" },
      { name: "MSC Track a Shipment", url: "https://www.msc.com/en/track-a-shipment", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "MSC 官方入口，适合核验船名航次和到港节点。" },
      { name: "CMA CGM Tracking", url: "https://www.cma-cgm.com/ebusiness/tracking", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "CMA CGM 官方入口，遇到验证码由查询人完成。" },
      { name: "Hapag-Lloyd Tracking", url: "https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "赫伯罗特官方入口，可复核箱状态和船期事件。" },
      { name: "ONE Cargo Tracking", url: "https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "ONE 官方入口，适合查箱号/提单号动态。" },
      { name: "Evergreen ShipmentLink", url: "https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do", type: "船司官方箱货/船期", status: "人工查询入口", fields: ["箱号", "提单号", "订舱号"], note: "长荣官方入口，适合核验船名航次和箱动态。" },
      { name: "微云船舶", url: "https://www.weiyun001.com/", type: "备用船舶定位参考", status: "人工查询入口", fields: ["英文船名", "MMSI/IMO"], note: "作为船讯网之外的备用入口。" },
      { name: "Shipfinder", url: "https://www.shipfinder.com/", type: "备用 AIS 船位参考", status: "人工查询入口", fields: ["英文船名", "MMSI/IMO"], note: "作为人工核验入口，是否可用取决于第三方网站限制。" }
    ]
  };
}

function renderShippingSources(data = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  $("shippingSourceStatus").textContent = `${data.source || "第三方入口"} · ${formatEta(data.updatedAt)}${data.fallback ? " · 手工入口" : ""}`;
  $("shippingSourceGrid").innerHTML = items
    .map(
      (item) => `
        <article class="source-probe-card">
          <div>
            <span>${escapeHtml(item.type || "查询入口")}</span>
            <h3>${escapeHtml(item.name || "第三方网站")}</h3>
          </div>
          <strong class="${/验证|登录|异常/.test(item.status || "") ? "manual-needed" : "source-ok"}">${escapeHtml(item.status || "待确认")}</strong>
          <p>${escapeHtml(item.note || "打开原网站核验。")}</p>
          <small>建议字段：${escapeHtml((item.fields || []).join("、") || "按原网站要求填写")}</small>
          ${item.title ? `<small>页面标题：${escapeHtml(item.title)}</small>` : ""}
          <a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">打开网站人工查询</a>
        </article>
      `
    )
    .join("");
}

function pickManualMatch(text = "", patterns = []) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim().slice(0, 80);
  }
  return "";
}

function summarizeManualShipmentResult() {
  const text = $("shipmentManualPaste")?.value || "";
  const target = $("shipmentManualSummary");
  if (!target) return;
  if (!text.trim()) {
    target.innerHTML = `<article class="alert-card muted"><strong>暂无内容</strong><p>请先粘贴船司、码头或港航网站的查询结果。</p></article>`;
    return;
  }
  const cleanText = text.replace(/\s+/g, " ").trim();
  const fields = [
    ["船名/航次", pickManualMatch(cleanText, [/船名(?:\/航次)?[:：]\s*([^；;，,]+)/i, /Vessel(?:\/Voyage)?[:：]\s*([^；;，,]+)/i, /V\/V[:：]\s*([^；;，,]+)/i]) || `${$("vesselName")?.value || "未识别"} / ${$("voyageNo")?.value || "未识别"}`],
    ["ETA/预计到港", pickManualMatch(cleanText, [/ETA[:：]?\s*([0-9]{4}[-/][0-9]{1,2}[-/][0-9]{1,2}[^；;，,]*)/i, /预计到港[:：]?\s*([^；;，,]+)/i, /靠泊时间[:：]?\s*([^；;，,]+)/i]) || "未识别"],
    ["箱号/提单", pickManualMatch(cleanText, [/(?:箱号|Container)[:：]?\s*([A-Z]{4}\d{7})/i, /(?:提单号|B\/L|BL)[:：]?\s*([A-Z0-9-]{6,})/i]) || "未识别"],
    ["海关/码头状态", pickManualMatch(cleanText, [/(海关放行|码头放行|已放行|未放行|查验|查验中|待申报|已申报|可提|不可提)[^；;，,]*/i]) || "未识别"]
  ];
  const releaseRisk = /未放行|查验|扣留|异常|不可提|未靠泊|延误|hold|inspection|delay|not released/i.test(cleanText);
  const etaRisk = /ETA|预计到港|靠泊|到港/i.test(cleanText) ? "" : "未识别 ETA，需回原网站确认预计到港/靠泊时间。";
  const actions = [
    releaseRisk ? "出现放行/查验/延误风险词，建议物流同事先找货代或码头确认是否影响提货。" : "未看到明显放行异常词，但仍需以原网站状态为准。",
    etaRisk,
    "把原始截图或链接保存到异常记录，便于关务/物流复核。"
  ].filter(Boolean);
  target.innerHTML = `
    <article class="manual-summary-card">
      <strong>${releaseRisk ? "人工查询结论：存在需要复核的节点" : "人工查询结论：可作为节点参考"}</strong>
      <div class="manual-field-grid">
        ${fields.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join("")}
      </div>
      <ul>${actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function hasShipmentPosition(result = {}) {
  return result.position?.lat !== "" && result.position?.lon !== "" && result.position?.lat != null && result.position?.lon != null;
}

function shipmentIdentityQuality(payload = {}, result = {}) {
  const identity = normalize([payload.imo, result.imo, result.mmsi, payload.vessel, result.shipName || result.vessel].join(" "));
  if (/\b\d{9}\b/.test(identity)) return "MMSI 已给出";
  if (/\b\d{7}\b/.test(identity)) return "IMO 已给出";
  if ((payload.vessel || result.shipName || result.vessel) && (payload.carrier || payload.voyage)) return "船名 + 船司/航次";
  if (payload.vessel || result.shipName || result.vessel) return "只有船名";
  return "身份不足";
}

function buildShipmentJudgement({ payload = {}, result = {}, updatedAt = "", source = "", freshness = {}, message = "", waiting = false } = {}) {
  if (waiting) {
    return {
      score: 0,
      label: "等待输入",
      tone: "neutral",
      viewpoint: "输入船名后可以先查船位；如果要形成可承诺的 ETA，最好同时准备 MMSI/IMO、船司、箱号或提单号。",
      evidence: [["证据状态", "等待查询"], ["判断口径", "只用可核验证据，不补写 ETA"]],
      actions: ["先填船名；有 MMSI/IMO 时一起填。", "如客户要交期承诺，同步准备箱号或提单号给船司/码头核验。"]
    };
  }

  const sourceName = /web|browser|myshiptracking|public/i.test(source) ? "网页抓取" : source ? source : "自动接口";
  const dataTime = getVesselDataTime(result, updatedAt || result.updatedAt || "");
  const dataAge = formatDataAge(dataTime);
  const hasPosition = hasShipmentPosition(result);
  const stale = hasPosition && (freshness?.level === "stale" || isStaleDataTime(dataTime));
  const unknownFreshness = hasPosition && (freshness?.level === "unknown" || !dataTime || dataAge === "时间未知");
  const hasEta = Boolean(result.eta);
  const identity = shipmentIdentityQuality(payload, result);
  const hasStrongIdentity = /MMSI|IMO/.test(identity);
  const hasCarrier = Boolean(payload.carrier);
  const hasVoyage = Boolean(payload.voyage && !/^tbd$/i.test(payload.voyage));
  const hasContainerOrBl = Boolean(payload.container || payload.bl);
  const hasDestination = Boolean(payload.destination || result.nextPort?.name || result.destination);

  let score = 26;
  if (hasPosition) score += 24;
  if (hasEta) score += 16;
  if (hasStrongIdentity) score += 12;
  else if (identity === "船名 + 船司/航次") score += 6;
  if (hasCarrier) score += 5;
  if (hasVoyage) score += 4;
  if (hasContainerOrBl) score += 8;
  if (hasDestination) score += 4;
  if (hasPosition && !stale && !unknownFreshness) score += 12;
  if (stale) score -= 24;
  if (unknownFreshness) score -= 12;
  if (!hasPosition && !hasEta) score -= 18;
  if (message) score -= 8;
  score = Math.max(8, Math.min(96, Math.round(score)));

  const label = !hasPosition && !hasEta
    ? "不能判断 ETA"
    : stale || unknownFreshness
      ? "只能弱参考"
      : hasEta
        ? "可作为参考"
        : "只能判断船位";
  const tone = !hasPosition && !hasEta ? "danger" : stale || unknownFreshness ? "warn" : "ok";
  const missing = [];
  if (!hasStrongIdentity) missing.push("MMSI/IMO");
  if (!hasCarrier) missing.push("船司");
  if (!hasContainerOrBl) missing.push("箱号/提单号");
  if (!hasEta) missing.push("船司 ETA");

  let viewpoint;
  if (!hasPosition && !hasEta) {
    viewpoint = `我的判断：这次不能形成可靠船期结论。${sourceName}没有给出可核验坐标或 ETA，继续刷新同一个 API 的价值不高；应先补 ${missing.slice(0, 3).join("、") || "可核验字段"}，再用船司、码头或箱号事件确认。`;
  } else if (stale || unknownFreshness) {
    viewpoint = `我的判断：有船位线索，但不能直接承诺到港。关键问题不是“有没有坐标”，而是数据时间${stale ? "已经过期" : "无法确认"}；应把它当作定位线索，再用船司 ETA 和码头事件复核。`;
  } else if (hasPosition && !hasEta) {
    viewpoint = "我的判断：当前只能说明船大概在哪里，不能说明何时到港。没有船司 ETA 时，页面不应替业务生成 ETA；下一步应查船司 schedule、箱号事件和目的港靠泊计划。";
  } else {
    viewpoint = "我的判断：这条结果可以作为船位/ETA 参考，但还不是客户承诺。若订单在途或要改交期，应再用船司官网、箱号/提单号和目的港码头事件做一次交叉验证。";
  }

  const evidence = [
    ["实时坐标", hasPosition ? "已取得" : "未取得"],
    ["数据时间", hasPosition ? dataAge : "无实时数据"],
    ["ETA", hasEta ? formatEta(result.eta) : "未返回"],
    ["船舶身份", identity],
    ["箱号/提单", hasContainerOrBl ? "已提供，可用于事件核验" : "未提供"]
  ];
  const actions = [];
  if (!hasStrongIdentity) actions.push("补 9 位 MMSI 或 7 位 IMO，避免同名船误匹配。");
  if (!hasContainerOrBl) actions.push("要判断客户交期时，补箱号/提单号，用船司或码头事件核验装船、卸船、放行节点。");
  if (!hasEta) actions.push("接口不返回 ETA 时，不手工猜 ETA；改查船司 schedule、目的港 ETA 和靠泊计划。");
  if (stale || unknownFreshness) actions.push("坐标过期或时间未知时，把结果标成弱参考，不能用于对客户承诺到港日。");
  if (!actions.length) actions.push("保留查询截图/时间，并在截关、靠泊前再查一次船司和码头。");

  return { score, label, tone, viewpoint, evidence, actions, sourceName, dataAge };
}

function renderShipmentJudgement(brief = {}) {
  const target = $("shipmentJudgement");
  if (!target) return;
  const evidence = Array.isArray(brief.evidence) ? brief.evidence : [];
  const actions = Array.isArray(brief.actions) ? brief.actions : [];
  target.innerHTML = `
    <article class="shipment-judgement-card ${escapeHtml(brief.tone || "neutral")}">
      <div class="shipment-judgement-head">
        <span>${escapeHtml(brief.label || "待判断")}</span>
        <strong>${escapeHtml(String(brief.score || 0))}</strong>
      </div>
      <p>${escapeHtml(brief.viewpoint || "等待船期证据。")}</p>
      <div class="shipment-evidence-grid">
        ${evidence.map(([label, value]) => `<div><b>${escapeHtml(label)}</b><small>${escapeHtml(value)}</small></div>`).join("")}
      </div>
      <ul>${actions.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function renderShipxyResult(payload = {}, result = {}, updatedAt = "", source = "ShipXY", freshness = {}) {
  const vessel = result.shipName || payload.vessel || "UNKNOWN VESSEL";
  const voyage = payload.voyage || "TBD";
  const origin = payload.origin || result.previousPort?.name || "Origin Port";
  const destination = payload.destination || result.nextPort?.name || "Destination Port";
  const speed = result.position?.speed !== "" ? ` · ${result.position.speed} kn` : "";
  const nextPort = result.nextPort?.name ? `下一港 ${result.nextPort.name}` : "下一港未返回";
  const remaining =
    result.remainingDistanceNm !== "" ? ` · 剩余约 ${result.remainingDistanceNm} NM` : "";
  const destinationEta = estimateDestinationArrival(result.position, destination, result.position?.speed);
  const isWebFallback = /web|myshiptracking|public/i.test(source);
  const sourceName = isWebFallback ? "网页抓取兜底" : "船讯网 API";
  const dataTime = getVesselDataTime(result, updatedAt);
  const dataAge = formatDataAge(dataTime);
  const freshnessLabel = shipmentFreshnessText(freshness, dataTime);
  const hasLivePosition = result.position?.lat !== "" && result.position?.lon !== "";
  const stalePosition = hasLivePosition && (freshness?.level === "stale" || isStaleDataTime(dataTime));
  const hasEta = Boolean(result.eta);
  const staleWarning = (() => {
    if (freshness?.level === "stale") return "；注意：船位数据已超过 24 小时，不能当作最新船期使用";
    if (freshness?.level === "unknown") return "；注意：接口没有返回船位时间，不能确认是否最新";
    const date = new Date(dataTime);
    if (Number.isNaN(date.getTime())) return "";
    const hours = (Date.now() - date.getTime()) / 36e5;
    return hours > 24 ? "；注意：船位数据已超过 24 小时，不能当作最新船期使用" : "";
  })();

  $("shipmentTitle").textContent = `${vessel} / ${voyage}`;
  $("shipmentPosition").textContent = `${formatPosition(result.position)}${speed}`;
  $("shipmentEta").textContent = hasEta ? [formatEta(result.eta), destinationEta].filter(Boolean).join("；") : (destinationEta || "实时 ETA 未返回");
  $("shipmentStatus").textContent = hasLivePosition ? nextPort : "未取得实时坐标";
  $("shipmentDataTime").textContent = dataAge;
  $("shipmentReminder").textContent = hasLivePosition
    ? `${sourceName}已返回船位${remaining}；${freshnessLabel}。`
    : `${sourceName}没有返回可用实时坐标；需要用箱号/提单号走船司或码头自动/人工核验。`;
  $("mapOrigin").textContent = origin;
  $("mapDestination").textContent = destination;
  $("shipmentApiState").textContent = freshness?.level === "stale" ? "数据过期" : hasLivePosition ? "实时结果" : "未取得实时结果";
  $("shipmentSourceLabel").textContent = isWebFallback ? "Public Web AIS" : source.includes("GetManyShip") ? "ShipXY Vessel Result" : "ShipXY ETA Result";
  $("shipmentApiNote").textContent = `自动查询结果：数据源 ${source}；船位/接口时间 ${dataAge}；新鲜度 ${freshnessLabel}。${hasEta ? "ETA 为接口返回值。" : "当前接口未返回 ETA，平台不会补写 ETA。"}${staleWarning}。`;
  renderShipmentJudgement(buildShipmentJudgement({ payload, result, updatedAt, source, freshness }));
  setVesselMap(result.position, result.nextPort?.name || destination);
  if (stalePosition) {
    showVesselPublicPanel(payload, result, "自动接口返回了船位，但数据时间超过 24 小时，不能当作最新船期。");
    showShipfinderFallbackDialog(payload, result, "自动接口返回了船位，但数据时间超过 24 小时，不能当作最新船期。");
  } else {
    hideVesselPublicPanel();
  }
  if (result.position?.lat !== "" && result.position?.lon !== "") {
    $("shipLocationNarrative").textContent += ` 数据时间：${dataAge}。`;
  }
  loadShipmentRouteRisk({ ...payload, destination }, result);
}

function renderShipmentResult(payload = {}, fallback = {}) {
  const initial = !payload.vessel && !payload.imo && !payload.container && !payload.bl && !fallback.message;
  const vessel = payload.vessel || "EVER GIVEN";
  const voyage = payload.voyage || "001W";
  const origin = payload.origin || "Port Klang";
  const destination = payload.destination || "Shanghai";
  $("shipmentTitle").textContent = `${vessel} / ${voyage}`;
  $("shipmentPosition").textContent = payload.imo ? `未取得实时 AIS；输入的 IMO/MMSI：${payload.imo}` : "未取得实时 AIS";
  $("shipmentEta").textContent = "实时 ETA 未取得";
  $("shipmentStatus").textContent = "自动查询失败";
  $("shipmentDataTime").textContent = "无实时数据";
  $("shipmentReminder").textContent = "未取得可核验船期；请补充 MMSI、箱号或提单号，并优先运行网页脚本查询。";
  $("mapOrigin").textContent = origin;
  $("mapDestination").textContent = destination;
  setVesselMap({}, destination);
  $("shipLocationNarrative").textContent = `未取得 ${vessel} 的实时坐标；地图只显示目的港 ${destination} 附近，不代表船舶当前位置。`;
  $("shipmentApiState").textContent = "未取得实时结果";
  $("shipmentSourceLabel").textContent = "No Live Result";
  $("shipmentApiNote").textContent = fallback.message
    ? `自动查询失败：${fallback.message} 页面只显示可核验 ETA。`
    : "未取得实时船期。真实查询需要 ShipXY API、船司/码头接口，或登录网站脚本返回结果；MMSI、箱号、提单号可提升准确度。";
  renderShipmentJudgement(initial
    ? buildShipmentJudgement({ waiting: true })
    : buildShipmentJudgement({ payload, result: {}, source: fallback.source || "自动接口", message: fallback.message || "未取得实时船期" }));
  showVesselPublicPanel(payload, {}, "自动接口和脚本没有取得可用实时坐标。");
  if (fallback.showDialog) showShipfinderFallbackDialog(payload, {}, fallback.message || "自动接口和脚本没有取得可用实时坐标。");
  renderShipmentRouteRisk({ ok: false, message: "未取得船舶实时坐标；系统只用可核验位置判断天气和 ETA 风险。" });
}

function numericField(id) {
  const value = Number(String($(id)?.value || "").replace(/,/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function normalizeBriefLinks(links = []) {
  return links
    .map((item) => {
      if (Array.isArray(item)) return { title: item[0], url: item[1] };
      return { title: item.name || item.title, url: item.url };
    })
    .filter((item) => item.title && item.url);
}

function renderResultBrief(options = {}) {
  const links = normalizeBriefLinks(options.links || []).slice(0, 5);
  const updatedAt = options.updatedAt ? formatEta(options.updatedAt) : (options.updatedLabel || "按当前页面结果");
  const rows = [
    ["结论", options.conclusion || "待查询结果返回后判断。"],
    ["风险", options.risk || "按当前输入未发现额外风险信号。"],
    ["费用口径", options.cost || "本页结果会列出当前可判断的费用、资料或规则口径。"],
    ["建议动作", options.action || "按本页资料清单补齐字段，并保留查询时间和来源。"],
    ["来源/更新时间", options.source || `更新时间：${updatedAt}`]
  ];
  return `
    <article class="result-brief-card ${escapeHtml(options.className || "")}">
      <div class="result-brief-head">
        <span>${escapeHtml(options.kicker || "标准结果格式")}</span>
        <strong>${escapeHtml(options.title || "查询结果简报")}</strong>
        <small>${escapeHtml(updatedAt)}</small>
      </div>
      <div class="result-brief-grid">
        ${rows.map(([label, text]) => `
          <section>
            <b>${escapeHtml(label)}</b>
            <p>${escapeHtml(text)}</p>
          </section>
        `).join("")}
      </div>
      ${links.length ? `<div class="result-brief-links">${links.map((item) => `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`).join("")}</div>` : ""}
    </article>
  `;
}

function smartTextFromItems(items = []) {
  return normalize((items || []).map((item) => [
    item.title,
    item.category,
    item.summary,
    item.description,
    item.takeawayZh,
    item.takeaway,
    item.domain,
    item.sourceCountry
  ].filter(Boolean).join(" ")).join(" "));
}

function buildSmartBusinessBrief(items = [], options = {}) {
  const context = normalize([options.context, options.keyword, options.product, options.country].filter(Boolean).join(" "));
  const text = `${smartTextFromItems(items)} ${context}`;
  const dimensions = [
    {
      id: "customs",
      title: "清关/关税",
      pattern: /tariff|customs|duty|hs code|trade remedy|301|232|cbp|税率|关税|海关|清关|税号|监管条件|贸易救济/,
      owner: "关务/报关行",
      action: "复核 HS、税率、原产国、监管条件、额外关税和实施日期。"
    },
    {
      id: "compliance",
      title: "认证/标签",
      pattern: /certification|standard|fcc|\bce\b|\bred\b|rohs|reach|weee|anatel|nbtc|saber|saso|ccc|cnca|label|认证|标准|标签|3c|型号核准|无线电/,
      owner: "认证/质量",
      action: "确认强制认证、证书覆盖型号、标签语言、说明书和测试报告是否需要更新。"
    },
    {
      id: "battery",
      title: "电池/DG",
      pattern: /battery|lithium|dangerous goods|un38|msds|iata|imdg|电池|锂|危险品|移动电源|充电宝|磁性/,
      owner: "物流/DG",
      action: "先做 UN38.3、MSDS/SDS、Wh、包装、SOC、磁检或运输条件预审。"
    },
    {
      id: "logistics",
      title: "物流/时效",
      pattern: /shipping|vessel|port|terminal|container|freight|congestion|strike|suez|panama|air cargo|express|courier|船期|航运|港口|码头|集装箱|拥堵|罢工|绕航|空运|快件|快递/,
      owner: "物流/计划",
      action: "确认 ETA、截关、舱位、提还箱、派送、仓储和客户交付承诺。"
    },
    {
      id: "cost",
      title: "成本/报价",
      pattern: /rate|inflation|currency|oil|fuel|surcharge|market|finance|central bank|汇率|利率|通胀|油价|燃油|附加费|金融|成本|报价/,
      owner: "业务/财务",
      action: "更新报价中的运费、燃油、汇率、税费、仓储和付款风险假设。"
    },
    {
      id: "geopolitics",
      title: "合规/地缘",
      pattern: /sanction|export control|restricted|war|conflict|military|geopolitic|election|制裁|出口管制|受限|战争|冲突|军演|地缘|选举/,
      owner: "合规/业务",
      action: "筛查客户、收货人、国家、最终用途和交付路径，必要时升级合规。"
    }
  ];
  const hits = dimensions.filter((item) => item.pattern.test(text));
  const officialCount = (items || []).filter((item) => /gov|customs|cnca|singlewindow|wto|worldbank|imf|europa|cbp|ustr|iata|imo/i.test(`${item.domain || ""} ${item.url || ""}`)).length;
  const recentCount = (items || []).filter((item) => Date.parse(item.seendate || item.date || item.updatedAt || item.publishedAt || "")).length;
  let score = 45 + Math.min(25, hits.length * 5) + Math.min(16, officialCount * 4) + Math.min(10, recentCount * 2);
  if (!items.length) score -= 16;
  if (options.fallback) score -= 8;
  score = Math.max(30, Math.min(96, score));
  const label = score >= 84 ? "高可信：可直接进入执行清单" : score >= 70 ? "中高可信：适合业务预警" : score >= 56 ? "中可信：需补来源复核" : "低可信：只做观察";
  const top = hits.slice(0, 3);
  const conclusion = top.length
    ? `${options.title || "本次信息"}主要影响 ${top.map((item) => item.title).join("、")}。${top[0].owner}应先处理：${top[0].action}`
    : `${options.title || "本次信息"}暂未形成明确订单影响，先作为背景观察。`;
  const actions = top.length
    ? top.map((item) => `${item.owner}：${item.action}`)
    : ["业务：先确认是否关联当前国家、产品、客户或出运路线。"];
  const gaps = [];
  if (!context) gaps.push("未输入具体国家、产品或路线，判断只能按来源内容做泛化提醒。");
  if (!officialCount) gaps.push("官方来源不足，不能替代正式公告或报关行/认证机构意见。");
  if (!items.length) gaps.push("暂无实时来源，当前使用固定观察清单。");
  return { score, label, conclusion, actions, gaps, dimensions: top.length ? top : dimensions.slice(0, 3), officialCount, itemCount: items.length };
}

function renderSmartIntelBoard(brief = {}, heading = "智能判断") {
  if (!brief) return "";
  return `
    <section class="smart-intel-board" aria-label="${escapeHtml(heading)}">
      <div class="smart-intel-head">
        <span>${escapeHtml(heading)}</span>
        <strong>${escapeHtml(brief.label || "待判断")}</strong>
        <small>${escapeHtml(String(brief.score || "0"))}/100 · ${escapeHtml(String(brief.itemCount || 0))} 条来源</small>
      </div>
      <p>${escapeHtml(brief.conclusion || "暂无明确业务判断。")}</p>
      <div class="smart-intel-grid">
        ${(brief.dimensions || []).map((item) => `
          <article>
            <span>${escapeHtml(item.title || "影响")}</span>
            <strong>${escapeHtml(item.owner || "待分工")}</strong>
            <small>${escapeHtml(item.action || "先补资料再判断。")}</small>
          </article>
        `).join("")}
      </div>
      <div class="smart-action-row">
        ${(brief.actions || []).slice(0, 4).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
      ${(brief.gaps || []).length ? `<div class="smart-gap-row">${brief.gaps.slice(0, 3).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
    </section>
  `;
}

function matchCodeRows(rows = [], query = "", keys = []) {
  const text = normalize(query);
  if (!text) return rows.slice(0, 6);
  return rows
    .map((row) => {
      const haystack = normalize(keys.map((key) => Array.isArray(row[key]) ? row[key].join(" ") : row[key]).join(" "));
      let score = 0;
      if (haystack.includes(text)) score += 60;
      if (keys.some((key) => String(row[key] || "").toLowerCase() === text)) score += 40;
      if ((row.aliases || []).some((alias) => normalize(alias).includes(text) || text.includes(normalize(alias)))) score += 50;
      return { ...row, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function renderSeaPortLookup(query = "") {
  const target = $("seaPortLookupResult");
  if (!target) return;
  const rows = matchCodeRows(seaPortCodeData, query, ["code", "name", "cn", "country", "aliases"]);
  target.innerHTML = rows.length
    ? rows.map((row) => `
        <article class="code-result-card">
          <span>${escapeHtml(row.country)}</span>
          <strong>${escapeHtml(row.code)} · ${escapeHtml(row.cn)}</strong>
          <p>${escapeHtml(row.name)}</p>
          <small>${escapeHtml(row.note)}</small>
        </article>
      `).join("")
    : `<article class="code-result-card warning"><strong>未命中港口代码</strong><p>换中文港口名、英文名或常见代码再试；正式订舱以船司/货代系统为准。</p></article>`;
}

function renderAirportLookup(query = "") {
  const target = $("airportLookupResult");
  if (!target) return;
  const rows = matchCodeRows(airportCodeData, query, ["iata", "icao", "name", "cn", "city", "country", "aliases"]);
  target.innerHTML = rows.length
    ? rows.map((row) => `
        <article class="code-result-card">
          <span>${escapeHtml(row.country)} · ${escapeHtml(row.city)}</span>
          <strong>${escapeHtml(row.iata)} / ${escapeHtml(row.icao)} · ${escapeHtml(row.cn)}</strong>
          <p>${escapeHtml(row.name)}</p>
          <small>${escapeHtml(row.note)}</small>
        </article>
      `).join("")
    : `<article class="code-result-card warning"><strong>未命中机场代码</strong><p>换城市名、机场名、IATA 三字码或 ICAO 四字码再试；正式订舱以航空公司/货代系统为准。</p></article>`;
}

function hasCodeMatch(rows = [], query = "", keys = []) {
  return matchCodeRows(rows, query, keys).length > 0;
}

function stripSearchIntentWords(query = "") {
  return String(query || "")
    .replace(/船名查询|船舶位置|船位查询|位置查询|船期查询|箱号查询|港口风险|空运计费|机场费用|政策影响|查询/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractVesselQuery(query = "") {
  const cleaned = stripSearchIntentWords(query)
    .replace(/\b(vessel|ship|eta|voyage|position|location|mmsi|imo)\b/gi, " ")
    .replace(/船名|船期|船位|航次|位置|定位|在哪|在哪里/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const imo = String(query || "").match(/\bIMO\s*\d{7}\b/i)?.[0]?.replace(/\s+/g, " ");
  const mmsi = String(query || "").match(/\bMMSI\s*\d{9}\b/i)?.[0]?.replace(/\s+/g, " ");
  if (imo || mmsi) return imo || mmsi;
  return cleaned || String(query || "").trim();
}

function findOpsFeeProfile(profiles = [], query = "") {
  const text = normalize(query);
  return profiles.find((profile) => normalize([profile.name, profile.coverage, profile.id].join(" ")).includes(text) || text.includes(normalize(profile.name))) || null;
}

function classifyGlobalSearch(raw = "") {
  const query = String(raw || "").trim();
  const intentCleanQuery = stripSearchIntentWords(query);
  const text = normalize(query);
  const cleanText = normalize(intentCleanQuery);
  if (!query) {
    return [{
      module: "dashboard",
      title: "请输入查询内容",
      reason: "可以输入船名、箱号、港口、机场、快递单号、国家、费用关键词或政策关键词。"
    }];
  }

  const containerLike = /\b[A-Z]{4}\d{7}\b/i.test(query.replace(/\s+/g, ""));
  const trackingLike = /\b1Z[0-9A-Z]{8,}\b/i.test(query) || /\b\d{10,15}\b/.test(query) || /dhl|ups|fedex|sf|顺丰|快递|运单|awb|空运单/i.test(query);
  const hsLike = /\b\d{8,10}\b/.test(query);
  const vesselIntent = /船名|船期|船位|船舶|航次|位置|定位|eta|vessel|voyage|mmsi|imo/.test(text);
  const vesselNameLike = /^[A-Z][A-Z0-9.' -]{2,40}$/i.test(intentCleanQuery) && /[A-Z]/i.test(intentCleanQuery) && !/\d{8,10}/.test(intentCleanQuery);
  const feeLike = /费用|收费|价格|报价|成本|港杂|堆存|仓储|安检|货站|thc|charge|fee|cost|tariff/.test(text);
  const airLike = /空运|机场|航空|快件|快递|dhl|ups|fedex|sf|顺丰|awb|iata|货站/.test(text) || hasCodeMatch(airportCodeData, query, ["iata", "icao", "name", "cn", "city", "country", "aliases"]);
  const seaLike = /海运|港口|码头|船|船期|箱号|提单|港杂|堆存|冷箱|危险品|oog|bbk|reefer|dg|vessel|port|container/.test(text) || hasCodeMatch(seaPortCodeData, query, ["code", "name", "cn", "country", "aliases"]);
  const countryLike = /中国|美国|欧盟|英国|日本|泰国|巴西|中东|沙特|阿联酋|印度|越南|印尼|菲律宾|加拿大|墨西哥|澳大利亚|韩国|南非|土耳其|新加坡|马来西亚|country|import|export/.test(text);
  const politicalHotspotLike = /特朗普|川普|trump|拜登|biden|习近平|普京|putin|泽连斯基|zelensky|总统|首相|国会|白宫|共和党|民主党|大选|选举|election|president|congress|white house|geopolitic|地缘|贸易战|trade war/.test(text);
  const policyHardLike = /政策|关税|301|232|cbp|ustr|海关|公告|认证|anatel|inmetro|nbtc|saber|fcc|ce|rohs|reach|制裁|出口管制/.test(text);
  const trendLike = /趋势|新闻|热点|热搜|市场|金融|汇率|利率|突发|实时|最新|影响/.test(text) || politicalHotspotLike;
  const policyLike = policyHardLike || trendLike;
  const documentLike = /单证|箱单|发票|invoice|packing|装箱单|报关单|报关草稿|declaration|申报单/.test(text);
  const airportCodeOnly = /^[A-Z]{3,4}$/i.test(query) && hasCodeMatch(airportCodeData, query, ["iata", "icao", "name", "cn", "city", "country", "aliases"]);
  const portCodeOnly = /^[A-Z]{5}$/i.test(query) && hasCodeMatch(seaPortCodeData, query, ["code", "name", "cn", "country", "aliases"]);

  const candidates = [];
  const add = (module, title, reason, score, fill = {}) => candidates.push({ module, title, reason, score, fill });

  if (politicalHotspotLike && !containerLike && !trackingLike && !feeLike && !documentLike) {
    add("trends", "政策/热点趋势影响", "识别为政治人物、选举、地缘或贸易热点，直接搜索公开趋势并生成物流/关务影响判断。", policyHardLike ? 124 : 136, { trend: query });
    add("policy", "政策变化雷达", "如果它关联关税、制裁、出口管制或海关公告，可继续看政策来源和实施日期。", policyHardLike ? 138 : 98, { policy: query });
  }
  if ((vesselIntent || vesselNameLike) && !containerLike && !trackingLike && !feeLike && !policyLike && !documentLike) {
    add("shipment", "船期和船舶位置", "识别为船名、航次、IMO/MMSI 或船舶位置查询，直接进入船舶位置界面。", 132, { vessel: extractVesselQuery(query) });
  }
  if (documentLike && /报关单|declaration|申报单/.test(text)) {
    add("docs-declaration", "报关单生成", "看起来是在准备报关单草稿、申报字段或 Excel 报关单。", 124, { document: query });
  }
  if (documentLike && !/报关单|declaration|申报单/.test(text)) {
    add("docs-invoice", "箱单发票生成", "看起来是在准备商业发票、装箱单或单证摘要。", 122, { document: query });
  }
  if (containerLike || /箱号|提单|放行|舱单|manifest|customs|release/.test(text)) {
    add("customs", "通关/箱货放行", "看起来是箱号、提单号、舱单或放行状态查询。", 120, { container: containerLike ? query.replace(/\s+/g, "").toUpperCase() : "", customs: query });
  }
  if (trackingLike && !containerLike) {
    add("air", "空运/快件查询", "看起来是快递单号、空运单号或承运商状态查询。", 108, { tracking: query });
  }
  if (feeLike && airLike) {
    add("air-fees", "空运机场/货站费用表", "包含机场、货站、快件或空运费用关键词。", 105, { fee: query });
  }
  if (feeLike && (seaLike || !airLike)) {
    add("sea-fees", "海运码头费用表", "包含港口、码头、DG、冷箱、堆存或海运费用关键词。", 104, { fee: query });
  }
  if (/船名|船期|船位|eta|vessel|voyage|mmsi|imo/.test(text) || (seaLike && /[a-z]/i.test(query) && /\s/.test(query) && !feeLike)) {
    add("shipment", "船期和船舶位置", "看起来是船名、航次、MMSI/IMO 或 ETA 查询。", 96, { vessel: extractVesselQuery(query) });
  }
  if ((airportCodeOnly || /机场代码|iata|icao/.test(text)) && !feeLike) {
    add("codes", "港口/机场代码查询", "看起来是机场代码、机场名或城市代码查询。", 92, { airport: query });
  }
  if ((portCodeOnly || /港口代码|un\/locode|locode/.test(text)) && !feeLike) {
    add("codes", "港口/机场代码查询", "看起来是海运港口代码或港口名查询。", 90, { port: query });
  }
  if (/港口|塞港|拥堵|码头|危险品|dg|reefer|冷箱|林查班|盐田|宁波|上海港|port risk/.test(text) && !feeLike) {
    add("port-risk", "港口/物流风险", "看起来是港口拥堵、港区操作或危险品限制查询。", 88, { portRisk: query });
  }
  if (hsLike || /税号|hs|hscode|归类|申报|关税核验/.test(text)) {
    add("hs", "税号/申报要素", "看起来是 HS、税费、归类或申报要素查询。", 86, { hs: query });
  }
  if (countryLike && !policyLike) {
    add("matrix", "进口国要求", "看起来是在查某个国家/地区的进口准入、认证、标签或清关要求。", 82, { country: query });
  }
  if (policyLike) {
    const explicitTrendRoute = /趋势|新闻|热点|热搜|市场|金融|汇率|利率|突发|实时|影响/.test(text);
    const policyRoute = policyHardLike && !explicitTrendRoute;
    add(policyRoute ? "policy" : "trends", policyRoute ? "政策变化雷达" : "市场动态对物流的影响", "看起来是政策、趋势、监管、认证或市场影响查询；进入后会直接生成结果。", policyRoute ? 116 : 112, { policy: query, trend: query });
  }
  if (!candidates.length) {
    if (/[A-Z]{3,}/i.test(cleanText) && !/产品|货物|音箱|耳机|电池|政策|费用|报关|发票|箱单/.test(text)) {
      add("shipment", "船期和船舶位置", "像船名或航次关键词，优先进入船舶位置界面；如果不是船名，再切换到其他模块。", 68, { vessel: extractVesselQuery(query) });
    }
    add("decision", "综合决策助手", "无法明确识别为船名、箱号、机场/港口、税号、费用、政策或单证时，再进入综合决策助手。", 40, { decision: query });
    add("codes", "港口/机场代码查询", "也可以先查港口/机场代码，再进入费用或物流模块。", 35, { port: query, airport: query });
  }
  return Array.from(
    candidates
      .sort((a, b) => b.score - a.score)
      .reduce((map, item) => (map.has(item.module) ? map : map.set(item.module, item)), new Map())
      .values()
  ).slice(0, 4);
}

function renderGlobalSearchResult(query = "") {
  const target = $("globalSearchResult");
  if (!target) return;
  const candidates = classifyGlobalSearch(query);
  target.innerHTML = candidates
    .map((item, index) => `
      <article class="global-search-card ${index === 0 ? "primary" : ""}">
        <span>${index === 0 ? "推荐入口" : "备选入口"}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.reason)}</p>
        <button type="button" data-global-module="${escapeHtml(item.module)}" data-global-query="${escapeHtml(query)}">${index === 0 ? "进入并带入关键词" : "打开这个模块"}</button>
      </article>
    `)
    .join("");
}

function applyGlobalSearchFill(moduleId = "", query = "") {
  const candidates = classifyGlobalSearch(query);
  const item = candidates.find((candidate) => candidate.module === moduleId) || candidates[0];
  const value = String(query || "").trim();
  if (!value) return;

  if (moduleId === "customs") {
    if (/\b[A-Z]{4}\d{7}\b/i.test(value.replace(/\s+/g, ""))) $("containerNo").value = value.replace(/\s+/g, "").toUpperCase();
    else $("blNo").value = value;
    const profile = inferCustomsPortProfile(value);
    if ($("customsPortSelect")) $("customsPortSelect").value = profile.id;
    $("customsCode").value = $("customsCode").value || profile.name || "上海港";
    renderCustomsPortMatrix(profile.id);
    renderCustomsAdvice($("blNo").value, $("containerNo").value, $("customsDirection")?.value || "进口 Import", $("customsCode").value, profile);
  }
  if (moduleId === "docs-invoice") {
    if ($("docProductName")) $("docProductName").value = $("docProductName").value || value;
    renderInvoiceDoc({ preventDefault() {} });
  }
  if (moduleId === "docs-declaration") {
    if ($("declGoodsName")) $("declGoodsName").value = $("declGoodsName").value || value;
    renderDeclarationDoc({ preventDefault() {} });
  }
  if (moduleId === "air") {
    $("airTrackingNo").value = value;
    $("airProduct").value = $("airProduct").value || "";
    $("airDestination").value = $("airDestination").value || "";
  }
  if (moduleId === "shipment") {
    $("vesselName").value = item?.fill?.vessel || extractVesselQuery(value);
  }
  if (moduleId === "codes") {
    if (hasCodeMatch(airportCodeData, value, ["iata", "icao", "name", "cn", "city", "country", "aliases"])) {
      $("airportLookupInput").value = value;
      renderAirportLookup(value);
    } else {
      $("seaPortLookupInput").value = value;
      renderSeaPortLookup(value);
    }
  }
  if (moduleId === "sea-fees") {
    const profile = findOpsFeeProfile(allSeaOpsFeeProfiles(), value);
    if (profile) selectSeaOpsFeeProfile(profile);
    if (/危险品|dg|danger/.test(normalize(value))) $("seaOpsFeeType").value = "dg";
    else if (/冷箱|冷藏|reefer/.test(normalize(value))) $("seaOpsFeeType").value = "reefer";
    else if (/oog|超限/.test(normalize(value))) $("seaOpsFeeType").value = "oog";
    else if (/bbk|件杂/.test(normalize(value))) $("seaOpsFeeType").value = "bbk";
    renderSeaOpsFees();
  }
  if (moduleId === "air-fees") {
    const profile = findOpsFeeProfile(airOpsFeeProfiles, value);
    if (profile && $("airOpsFeeNode")) $("airOpsFeeNode").value = profile.id;
    if (/电池|磁性|dg|danger/.test(normalize(value))) $("airOpsFeeType").value = "battery";
    else if (/冷藏|温控|reefer/.test(normalize(value))) $("airOpsFeeType").value = "reefer";
    else if (/特殊|超限|高价值/.test(normalize(value))) $("airOpsFeeType").value = "special";
    renderAirOpsFees();
  }
  if (moduleId === "port-risk") {
    $("portName").value = value;
    renderPortSuggestions(value);
  }
  if (moduleId === "hs") {
    if (/^\d{8,10}$/.test(value)) {
      if ($("tariffCheckHs")) $("tariffCheckHs").value = value;
    } else if ($("productName")) {
      $("productName").value = value;
    }
    if (typeof updateHsSmartAssist === "function") updateHsSmartAssist({ manualCategory: false });
  }
  if (moduleId === "matrix") {
    const parts = value.split(/\s+/);
    $("requirementCountry").value = parts[0] || value;
    if (parts.length > 1) $("requirementProduct").value = parts.slice(1).join(" ");
  }
  if (moduleId === "policy") {
    $("policyProduct").value = value;
    $("policyImportCountry").value = $("policyImportCountry").value || "";
  }
  if (moduleId === "trends") {
    $("trendKeyword").value = value;
  }
  if (moduleId === "decision") {
    if ($("decisionProduct")) $("decisionProduct").value = $("decisionProduct").value || value;
  }
  renderGlobalSearchResult(value);
  Array.from($("globalSearchResult")?.querySelectorAll("[data-global-module]") || [])
    .find((button) => button.dataset.globalModule === moduleId)
    ?.closest(".global-search-card")
    ?.classList.add("selected");
  if (item) addHistory("全局搜索", value, `已跳转到 ${item.title}`);
}

async function executeGlobalSearchModule(moduleId = "", query = "") {
  const value = String(query || "").trim();
  if (!value) return;
  const submitEvent = { preventDefault() {} };
  try {
    if (moduleId === "trends") {
      await loadTrends(value, true);
      return;
    }
    if (moduleId === "policy") {
      await loadPolicyUpdates(true);
      return;
    }
    if (moduleId === "matrix") {
      await queryRequirements(submitEvent);
      return;
    }
    if (moduleId === "port-risk") {
      await queryPortRisk(submitEvent);
      return;
    }
    if (moduleId === "air") {
      await queryAirTracking(submitEvent);
      return;
    }
    if (moduleId === "shipment") {
      await queryShipment(submitEvent);
      return;
    }
    if (moduleId === "customs") {
      await queryCustoms(submitEvent);
      return;
    }
    if (moduleId === "hs") {
      if (/^\d{8,10}$/.test(value) && typeof evaluateTariffCheck === "function") {
        await evaluateTariffCheck(submitEvent);
      } else if (typeof updateHsSmartAssist === "function") {
        updateHsSmartAssist({ manualCategory: false });
      }
    }
  } catch (error) {
    recordQueryFailure({
      module: moduleId || "global-search",
      query: value,
      reason: error.message || "全局搜索自动查询失败",
      next: "已跳转到对应模块；请查看模块结果区，必要时手动刷新一次。"
    });
  }
}

async function runGlobalSearch(event) {
  event?.preventDefault();
  const query = $("globalSearchInput")?.value || "";
  const candidates = classifyGlobalSearch(query);
  const target = candidates[0];
  renderGlobalSearchResult(query);
  if (!requireAccess()) return;
  if (!target || target.module === "dashboard") return;
  applyGlobalSearchFill(target.module, query);
  activateWorkspaceModule(target.module, true);
  await executeGlobalSearchModule(target.module, query);
}

function populateOpsFeeSelects() {
  const seaSelect = $("seaOpsFeeNode");
  const seaPortSelect = $("seaOpsFeePort");
  const airSelect = $("airOpsFeeNode");
  if (seaPortSelect && !seaPortSelect.children.length) {
    populateSeaOpsFeePorts(seaPortSelect.value || "shanghai");
  }
  if (seaSelect && !seaSelect.children.length) {
    populateSeaOpsFeeTerminals(seaPortSelect?.value || "shanghai", seaSelect.value);
  }
  if (airSelect && !airSelect.children.length) {
    airSelect.innerHTML = airOpsFeeProfiles.map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`).join("");
  }
}

function opsFeeTypeLabel(type = "general", mode = "sea") {
  const sea = { general: "普通集装箱", dg: "危险品 DG", reefer: "冷藏箱 Reefer", oog: "OOG/超限箱", bbk: "BBK/件杂货" };
  const air = { general: "普通空运货物", special: "特殊货/超限/高价值", battery: "含电池/磁性/疑似 DG", reefer: "冷藏/温控货" };
  return (mode === "air" ? air : sea)[type] || "普通货物";
}

function opsFeeLinesFor(profile, type) {
  return (profile.feeLines || []).filter((line) => {
    const types = line.types || ["general"];
    return types.includes(type) || (type !== "general" && types.includes("general"));
  });
}

function renderOpsFeeSourceLinks(sources = []) {
  return sources.map((source) => `
    <a class="source-pill" href="${escapeHtml(source[1])}" target="_blank" rel="noreferrer">
      ${escapeHtml(source[0])}
    </a>
  `).join("");
}

function opsFeeValidityText(profile, line, mode) {
  if (line.validity) return line.validity;
  const amount = String(line.amount || "");
  const id = String(profile.id || "");
  if (mode === "air" && id === "shanghai-pvg") return "上海机场 2026 收费目录；以官网最新版为准";
  if (mode === "air" && id === "shenzhen-szx") return "深圳机场国际货站公开价目表；以官网 PDF 最新版为准";
  if (mode === "air" && id === "ezhou-ehu") return "鄂州花湖机场收费公示；以官网/附件最新版为准";
  if (mode === "sea" && /^shanghai-/.test(id)) return "上港集团收费服务目录；以官网最新版和实际作业账单为准";
  if (mode === "sea" && id === "guangzhou-nansha") return "广州港/政府收费公示口径；以当期公示和码头账单为准";
  if (/逐票|另计|单独|核价/.test(amount)) return "逐票报价；有效期以码头/货站/承运人确认单为准";
  if (/约|参考/.test(amount)) return "参考区间；按查询当日官网、公示或货代报价复核";
  return "以公开收费表或服务商当期报价为准";
}

function opsFeeSourceText(profile, line) {
  if (line.source) return line.source;
  const firstSource = (profile.sources || [])[0];
  return firstSource ? firstSource[0] : "公开资料/人工核验";
}

function opsFeeSupplementalRows(mode, type) {
  if (mode === "sea") {
    const rows = [
      { item: "查验/移箱/翻箱/落箱", amount: "按实际作业另计，常见数百元/次起", validity: "逐票发生；以码头/货代账单为准", note: "海关查验、改单、改配、换港、落箱或码头内搬移时容易产生。", source: "码头/货代账单核验" },
      { item: "堆存/超期/滞港", amount: "按箱型和天数阶梯计费", validity: "超免费期后适用；以码头当期规则为准", note: "进口提柜慢、出口截关变化、查验延误都可能触发。", source: "码头收费目录/船司账单" }
    ];
    if (type === "dg") rows.push({ item: "DG booking/危申/特殊堆场", amount: "逐票报价，常叠加普通箱费用", validity: "按 UN 号、危险品类别和船期逐票确认", note: "需提前确认船司接收、港区窗口、海事/码头审核和 MSDS/危包资料。", source: "船司/码头 DG 确认" });
    if (type === "reefer") rows.push({ item: "冷箱插电/温控监控", amount: "常见按箱/天或按班计费", validity: "按插电起止时间和码头当期规则确认", note: "还要确认 PTI、设定温度、温度记录、查验时是否断电。", source: "码头冷箱规则/货代报价" });
    if (type === "oog" || type === "bbk") rows.push({ item: "吊装/绑扎/加固/特殊机械", amount: "逐票报价，可能从数百到数千元以上", validity: "按尺寸、重量、吊点和码头设备逐票确认", note: "需提供图纸、照片、重心、吊点、绑扎方案和进港路线。", source: "码头/项目物流报价" });
    return rows;
  }
  const rows = [
    { item: "安检/制单/货站处理", amount: "常见 RMB 0.20-0.80/kg；最低 RMB 50-150/票", validity: "参考区间；以机场货站当期价目表为准", note: "航空运费、燃油、报关、提派送不包含在此基础项内。", source: "机场货站/航空公司报价" },
    { item: "仓储/超期", amount: "常见 RMB 0.10-0.50/kg/天；特殊货更高", validity: "超免费期后适用；以货站当期规则为准", note: "到港清关慢、资料缺失、查验或无人提货会触发。", source: "机场货站收费表" },
    { item: "协助海关查验/开箱复磅", amount: "逐票或按 kg 计费", validity: "发生查验时适用；以货站/报关行账单为准", note: "到达后清关延误时要提前让收件人确认税号、进口资质和文件。", source: "货站/报关行账单" }
  ];
  if (type === "battery") rows.push({ item: "电池/磁性/疑似 DG 预审", amount: "逐票核价或按特货口径上浮", validity: "按承运人接收规则和鉴定文件逐票确认", note: "常见文件：MSDS、UN38.3、运输危险性鉴定报告、磁检、PI965/966/967 口径。", source: "承运人/货站预审" });
  if (type === "reefer") rows.push({ item: "冷藏/温控仓储", amount: "逐票报价或按 kg/天计费", validity: "按温控仓、航班和查验时间确认", note: "需要确认温度范围、交接时限、冷库资源和是否可查验。", source: "机场货站冷链报价" });
  if (type === "special") rows.push({ item: "超限/高价值/特殊货处理", amount: "逐票报价或按特货口径上浮", validity: "按尺寸、重量、价值、安保和承运人要求确认", note: "包板/包机、超限件、贵重货和品牌货通常需要提前审批。", source: "航空公司/货站报价" });
  return rows;
}

function renderOpsFeeCard(profile, type, mode) {
  const lines = opsFeeLinesFor(profile, type);
  const typeLabel = opsFeeTypeLabel(type, mode);
  const mustQuote = /dg|reefer|oog|bbk|special|battery/.test(type);
  const title = mode === "air" ? "机场/货站费用结论" : "码头费用结论";
  const rows = (lines.length ? lines : [{ item: "费用参考", amount: "暂无明确金额", note: "该组合需要逐票向码头、货站或货代确认。" }]).concat(opsFeeSupplementalRows(mode, type));
  const amountPreview = rows.slice(0, 3).map((line) => `${line.item}：${line.amount}`).join("；");
  const rowHtml = rows.map((line) => `
    <tr>
      <td><strong>${escapeHtml(line.item)}</strong><small>${escapeHtml(opsFeeSourceText(profile, line))}</small></td>
      <td>${escapeHtml(opsFeeValidityText(profile, line, mode))}</td>
      <td><b>${escapeHtml(line.amount)}</b></td>
      <td>${escapeHtml(line.note || "以实际作业和公开收费为准。")}</td>
    </tr>
  `).join("");
  return `
    ${renderResultBrief({
      className: `ops-result-brief ${mustQuote ? "warning" : "primary"}`,
      kicker: mode === "air" ? "Air Cost Brief" : "Sea Cost Brief",
      title: `${title}：${profile.name} · ${typeLabel}`,
      conclusion: mustQuote ? "该货型容易产生附加费，不能只按普通货报价。" : "可先按基础费用项目估算，再按实际账单复核。",
      risk: mustQuote ? "特殊货、DG、冷箱、OOG/BBK 或电池货需逐票确认接收规则、资料和有效期。" : "普通货仍可能因查验、堆存、改配、仓储或超期产生额外费用。",
      cost: amountPreview || "暂无公开金额；以当期收费表和服务商报价为准。",
      action: "把收费项目、适用口径、有效期、金额和备注分项确认；正式报价不要只写总价。",
      source: `${profile.publicLevel || "公开/参考口径"}；以最新公示、码头/货站账单、承运人和货代报价为准。`,
      links: profile.sources || []
    })}
    <article class="ops-fee-verdict ${mustQuote ? "warning" : "primary"}">
      <span>${escapeHtml(profile.publicLevel || "参考口径")}</span>
      <strong>${escapeHtml(title)}：${escapeHtml(profile.name)} · ${escapeHtml(typeLabel)}</strong>
      <p>${escapeHtml(profile.coverage || "")}${mustQuote ? " 该货型容易产生附加费，不能只按普通货报价。" : " 可先按基础项目估算，再按实际账单复核。"}</p>
    </article>
    <div class="ops-fee-table-wrap" role="region" aria-label="${escapeHtml(profile.name)} 费用表">
      <table class="ops-fee-table">
        <thead>
          <tr>
            <th>收费项目</th>
            <th>有效期/适用口径</th>
            <th>金额</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>${rowHtml}</tbody>
      </table>
    </div>
    <article class="ops-fee-check-card">
      <span>核价提醒</span>
      <ul>${(profile.cautions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="ops-fee-source-card">
      <span>官方/公开核验入口</span>
      <div class="source-link-row">${renderOpsFeeSourceLinks(profile.sources)}</div>
      <p>公开页面可能调整，实际费用以最新收费公示、码头/货站账单、承运人和货代报价为准。</p>
    </article>
  `;
}

function renderSeaOpsFees(event) {
  event?.preventDefault();
  const profile = seaOpsFeeProfileByTerminal($("seaOpsFeeNode")?.value || "") || seaOpsFeeProfiles[0];
  const type = $("seaOpsFeeType")?.value || "general";
  const target = $("seaOpsFeeResult");
  if (target) target.innerHTML = renderOpsFeeCard(profile, type, "sea");
}

function renderAirOpsFees(event) {
  event?.preventDefault();
  const profile = airOpsFeeProfiles.find((item) => item.id === $("airOpsFeeNode")?.value) || airOpsFeeProfiles[0];
  const type = $("airOpsFeeType")?.value || "general";
  const target = $("airOpsFeeResult");
  if (target) target.innerHTML = renderOpsFeeCard(profile, type, "air");
}

function buildSeaLoadInquiryText() {
  const length = numericField("seaLength");
  const width = numericField("seaWidth");
  const height = numericField("seaHeight");
  const cartons = numericField("seaCartons");
  const gross = numericField("seaGrossWeight");
  const type = $("seaContainerType")?.value || "LCL";
  const rate = numericField("seaRate");
  const fees = numericField("seaLocalFees");
  const packingMode = $("seaPackingMode")?.value || "carton";
  const cbm = length && width && height && cartons ? (length * width * height * cartons) / 1000000 : 0;
  const chargeTon = Math.max(cbm, gross / 1000);
  const estimatedCost = rate ? (type === "LCL" ? chargeTon * rate : rate) + fees : 0;
  return [
    "海运询价/核价说明：",
    `货物包装：${cartons || "待补"} 箱；单箱尺寸 ${length || "待补"} x ${width || "待补"} x ${height || "待补"} cm。`,
    `总毛重：${gross || "待补"} kg；总体积：${cbm ? cbm.toFixed(2) : "待补"} CBM；计费吨 W/M：${chargeTon ? chargeTon.toFixed(2) : "待补"}。`,
    `计划箱型/方式：${type}；装柜口径：${packingMode}。`,
    estimatedCost ? `按当前输入初算费用：USD ${estimatedCost.toFixed(2)}（仅用于内部预估，正式以报价单为准）。` : "费用预估：未填写海运费率/柜价。",
    "请协助确认：海运费、码头/港杂、文件费、拖车/仓库、查验/移箱/堆存、免堆免箱期、是否有 DG/电池/木包/熏蒸要求。",
    "如涉及冷箱、危险品、OOG/BBK 或查验，请单独列明收费项目、有效期、金额和备注。"
  ].join("\n");
}

function buildAirFreightInquiryText() {
  const length = numericField("airLength");
  const width = numericField("airWidth");
  const height = numericField("airHeight");
  const pieces = numericField("airPieces");
  const gross = numericField("airGrossWeight");
  const mode = $("airFreightMode")?.value || "express";
  const rate = numericField("airRate");
  const surcharges = numericField("airSurcharges");
  const nature = $("airCargoNature")?.value || "general";
  const cbm = length && width && height && pieces ? (length * width * height * pieces) / 1000000 : 0;
  const divisor = mode === "express" ? 5000 : 6000;
  const volumeWeight = length && width && height && pieces ? (length * width * height * pieces) / divisor : 0;
  const chargeWeight = Math.max(gross, volumeWeight);
  const estimatedCost = rate && chargeWeight ? chargeWeight * rate + surcharges : 0;
  const modeText = { express: "快件 Express", general: "普通空运散货", bsa: "包板/BSA", charter: "包机/Charter" }[mode] || "空运";
  return [
    "空运询价/核价说明：",
    `货物包装：${pieces || "待补"} 件；单件尺寸 ${length || "待补"} x ${width || "待补"} x ${height || "待补"} cm。`,
    `总毛重：${gross || "待补"} kg；总体积：${cbm ? cbm.toFixed(2) : "待补"} CBM；体积重：${volumeWeight ? volumeWeight.toFixed(1) : "待补"} kg；计费重：${chargeWeight ? chargeWeight.toFixed(1) : "待补"} kg。`,
    `运输方式：${modeText}；货物属性：${nature}；体积重系数按 ${divisor} 初算。`,
    estimatedCost ? `按当前输入初算费用：USD ${estimatedCost.toFixed(2)}（仅用于内部预估，正式以报价单为准）。` : "费用预估：未填写空运单价。",
    "请协助确认：航空运费、燃油/安检/货站操作费、仓储/超期、报关、提派送、是否可接电池/磁性/液体/粉末/高价值货。",
    "如走包板/BSA/包机，请补充板型、装板限制、截仓时间、航班计划和拉货/甩货规则。"
  ].join("\n");
}

async function copyTextToClipboard(text = "", statusId = "") {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    if ($(statusId)) $(statusId).textContent = "已复制，可直接发给货代/供应商。";
  } catch (error) {
    if ($(statusId)) $(statusId).textContent = "复制失败，请手动选择说明文字。";
  }
}

function docField(id = "") {
  return String($(id)?.value || "").trim();
}

function numberDocField(id = "") {
  const value = Number(docField(id));
  return Number.isFinite(value) ? value : 0;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function lineSuffix(index = 1) {
  return index === 1 ? "" : String(index);
}

function collectInvoiceItems() {
  return Array.from(document.querySelectorAll("[data-doc-item-row]")).map((row, index) => {
    const suffix = lineSuffix(index + 1);
    const quantity = numberDocField(`docQuantity${suffix}`);
    const unitPrice = numberDocField(`docUnitPrice${suffix}`);
    return {
      index: index + 1,
      marks: docField(`docMarks${suffix}`),
      product: docField(`docProductName${suffix}`),
      hsCode: docField(`docHsCode${suffix}`),
      quantity,
      unit: docField(`docUnit${suffix}`) || "PCS",
      unitPrice,
      amount: quantity * unitPrice
    };
  });
}

function activeInvoiceDocumentMode() {
  return $("invoiceDocForm")?.dataset.documentMode || "invoice";
}

function collectInvoiceDocData() {
  const items = collectInvoiceItems();
  const filledItems = items.filter((item) => item.product || item.quantity || item.unitPrice || item.hsCode);
  const quantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const amount = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const primary = filledItems[0] || items[0] || {};
  return {
    mode: activeInvoiceDocumentMode(),
    invoiceNo: docField("docInvoiceNo") || "CI-DRAFT",
    date: docField("docInvoiceDate") || todayIsoDate(),
    seller: docField("docSeller") || "Seller / 出口方待填写",
    buyer: docField("docBuyer") || "Buyer / 买方待填写",
    incoterm: docField("docIncoterm") || "FOB",
    currency: docField("docCurrency") || "USD",
    loading: docField("docPortLoading") || "Port of Loading 待填写",
    discharge: docField("docPortDischarge") || "Port of Discharge 待填写",
    vessel: docField("docVessel") || "Vessel / Flight 待填写",
    marks: docField("docMarks") || "N/M",
    product: primary.product || "Product description 待填写",
    hsCode: primary.hsCode || "",
    quantity,
    unit: primary.unit || docField("docUnit") || "PCS",
    unitPrice: primary.unitPrice || 0,
    amount,
    items,
    filledItems,
    cartons: numberDocField("docCartons"),
    gross: numberDocField("docGrossWeight"),
    net: numberDocField("docNetWeight"),
    cbm: numberDocField("docCbm")
  };
}

function invoiceDocSummary(data = collectInvoiceDocData()) {
  const goodsLines = (data.filledItems.length ? data.filledItems : data.items.slice(0, 1))
    .map((item) => `${item.index}. ${item.product || "Goods"}${item.hsCode ? ` / HS ${item.hsCode}` : ""} / ${item.quantity || 0} ${item.unit} / ${data.currency} ${item.unitPrice ? item.unitPrice.toFixed(2) : "0.00"} / ${data.currency} ${item.amount ? item.amount.toFixed(2) : "0.00"}`)
    .join("\n");
  return [
    `${data.mode === "packing" ? "Packing List" : "Commercial Invoice"} No.: ${data.invoiceNo}`,
    `Date: ${data.date}`,
    `Seller: ${data.seller}`,
    `Buyer: ${data.buyer}`,
    `Incoterms/Currency: ${data.incoterm} / ${data.currency}`,
    `Route: ${data.loading} -> ${data.discharge}`,
    `Vessel/Flight: ${data.vessel}`,
    `Goods:\n${goodsLines}`,
    `Total Quantity: ${data.quantity || 0}`,
    data.mode === "packing" ? "" : `Total Amount: ${data.currency} ${data.amount ? data.amount.toFixed(2) : "0.00"}`,
    `Packing: ${data.cartons || 0} CTNS / G.W. ${data.gross || 0} kg / N.W. ${data.net || 0} kg / ${data.cbm || 0} CBM`,
    `Marks: ${data.marks}`
  ].filter(Boolean).join("\n");
}

let invoiceValidationActive = false;
let declarationValidationActive = false;

const invoiceRequiredFields = [
  ["docSeller", "Seller / 卖方"],
  ["docBuyer", "Buyer / 买方"],
  ["docInvoiceNo", "Invoice No. / 发票号"],
  ["docInvoiceDate", "Date / 发票日期"],
  ["docPortLoading", "Port of Loading / 起运港"],
  ["docPortDischarge", "Port of Discharge / 目的港"],
  ["docProductName", "Description of Goods / 品名"],
  ["docQuantity", "Quantity"],
  ["docUnit", "Unit"],
  ["docUnitPrice", "Unit Price"],
  ["docCartons", "Cartons / 箱数"],
  ["docGrossWeight", "Gross Weight / 毛重"],
  ["docNetWeight", "Net Weight / 净重"],
  ["docCbm", "Measurement / 体积"]
];

const declarationRequiredFields = [
  ["declDomesticConsignee", "境内收发货人"],
  ["declExportCustoms", "出境关别"],
  ["declExportDate", "出口日期"],
  ["declDeclareDate", "申报日期"],
  ["declOverseasConsignee", "境外收发货人"],
  ["declProducer", "生产销售单位"],
  ["declTransportMode", "运输方式"],
  ["declVesselVoyage", "运输工具名称及航次号"],
  ["declBlNo", "提运单号"],
  ["declTradeMode", "监管方式"],
  ["declContractNo", "合同协议号"],
  ["declTradeCountry", "贸易国（地区）"],
  ["declDestinationCountry", "运抵国（地区）"],
  ["declDestinationPort", "指运港"],
  ["declExitPort", "离境口岸"],
  ["declPackages", "件数"],
  ["declGrossWeight", "毛重"],
  ["declNetWeight", "净重"],
  ["declIncoterm", "成交方式"],
  ["declGoodsCode", "商品编号"],
  ["declGoodsName", "商品名称及规格型号"],
  ["declGoodsQuantity", "数量及单位"],
  ["declGoodsValue", "单价 / 总价 / 币制"],
  ["declOriginCountry", "原产国（地区）"],
  ["declFinalCountry", "最终目的国（地区）"],
  ["declDomesticSource", "境内货源地"],
  ["declLevyMode", "征免"],
  ["declAgent", "申报单位"],
  ["declBrokerName", "报关人员"],
  ["declBrokerPhone", "电话"]
];

const declarationBeginnerSources = {
  declDomesticConsignee: ["公司主体资料", "填境内经营单位/收发货人，通常是出口方统一社会信用代码或海关编码 + 公司名称。"],
  declOverseasConsignee: ["合同/发票", "填境外买方或收货方名称，和商业发票、合同保持一致。"],
  declProducer: ["合同/工厂资料", "生产销售单位通常填生产或销售责任主体，不确定时问关务/报关行。"],
  declAgent: ["报关委托/报关行资料", "填实际申报单位或报关企业名称。"],
  declExportCustoms: ["订舱/口岸信息", "填出口申报地海关，不是随便写城市名。"],
  declExportDate: ["物流计划", "填实际出口日期或预计出口日期，最终以报关/放行口径为准。"],
  declDeclareDate: ["申报操作", "填申报当天日期。"],
  declTransportMode: ["订舱/提单", "海运一般填水路运输，空运填航空运输，陆运填公路运输。"],
  declVesselVoyage: ["订舱/提单", "填船名航次、航班号或车牌号；没有最终信息时先写草稿，提交前必须更新。"],
  declBlNo: ["提单/运单", "填 B/L、AWB 或运单号，和舱单/订舱资料一致。"],
  declTradeMode: ["业务场景/关务判断", "一般出口销售多为一般贸易，加工贸易、退运、样品等要让关务确认。"],
  declContractNo: ["合同/PO/PI", "填合同号、订单号、PI 或 PO 号，便于和发票、箱单互相对应。"],
  declTradeCountry: ["合同/发票", "交易对象所在国家/地区，不一定等于最终运抵国。"],
  declDestinationCountry: ["提单/客户目的地", "货物最终运抵国家/地区，和目的港、客户交付地核对。"],
  declDestinationPort: ["订舱/提单", "填目的港/目的机场，如 Hamburg、LAX、Rotterdam。"],
  declExitPort: ["订舱/口岸", "填实际离境口岸，如上海港、深圳盐田、PVG。"],
  declPackages: ["装箱单", "填包装件数，必须和装箱单、箱数、唛头口径一致。"],
  declGrossWeight: ["装箱单", "填总毛重 kg，不能小于净重。"],
  declNetWeight: ["装箱单", "填总净重 kg，和商品行数量、箱单重量匹配。"],
  declIncoterm: ["合同/发票", "填 FOB/CIF/CFR/EXW 等成交方式，决定运费、保费是否需要填写。"],
  declFreight: ["合同/费用/发票", "FOB 通常运费可填无；CIF/CFR 等要按成交方式确认。"],
  declInsurance: ["合同/费用/发票", "CIF 通常涉及保费；FOB/CFR 多数不填或填无。"],
  declOtherFee: ["费用确认", "佣金、折扣、包装费等如影响完税价格，需要关务确认。"],
  declAttachedDocs: ["单证清单", "列发票、箱单、合同、许可证、原产地证等随附单证编号。"],
  declMarksRemark: ["箱单/客户唛头/价格确认", "填唛头、备注、特殊关系/价格影响/特许权使用费确认。"],
  declGoodsCode: ["HS 归类结果", "填 10 位商品编码；小白不要凭品名猜，先用 HS 初筛再让关务复核。"],
  declGoodsName: ["发票 + 申报要素", "填中文品名、规格型号、品牌、用途、材质、工作原理等，不要只写英文商品名。"],
  declGoodsQuantity: ["发票/箱单", "填法定第一数量及单位，必要时还要第二数量；草稿先写业务数量。"],
  declGoodsValue: ["商业发票", "填单价、总价、币制，必须和发票金额、成交方式一致。"],
  declOriginCountry: ["供应链/产地资料", "填原产国/地区，不等于发货港。"],
  declFinalCountry: ["客户目的地", "填最终目的国/地区，和运抵国核对。"],
  declDomesticSource: ["工厂/发货地", "填境内货源地，如广东深圳、浙江宁波。"],
  declLevyMode: ["关务判断", "常见为照章征税/全免等，不确定先让报关行确认。"],
  declBrokerName: ["报关行资料", "填实际报关人员姓名。"],
  declBrokerPhone: ["报关行资料", "填能联系到报关人员的电话。"]
};

function getMissingDocumentFields(fields) {
  return fields.filter(([id]) => {
    if (activeInvoiceDocumentMode() === "packing" && id === "docUnitPrice") return false;
    return !String($(id)?.value || "").trim();
  });
}

function updateDocumentFieldHighlights(fields, shouldHighlight) {
  const missing = getMissingDocumentFields(fields);
  const missingIds = new Set(missing.map(([id]) => id));
  fields.forEach(([id]) => {
    const element = $(id);
    if (!element) return;
    const isMissing = shouldHighlight && missingIds.has(id);
    element.classList.toggle("field-missing", isMissing);
    element.closest("td")?.classList.toggle("paper-cell-missing", isMissing);
  });
  return missing;
}

function documentMissingSummary(missing) {
  if (!missing.length) return "必填项已完整。";
  const labels = missing.map(([, label]) => label).slice(0, 8).join("、");
  const more = missing.length > 8 ? ` 等 ${missing.length} 项` : "";
  return `还缺 ${missing.length} 项：${labels}${more}`;
}

function renderDocumentCheckLine(missing, checked) {
  if (!checked) return "";
  const className = missing.length ? "document-check-warning" : "document-check-ok";
  return `<p class="${className}">${escapeHtml(documentMissingSummary(missing))}</p>`;
}

function renderDocumentJudgement(brief = {}) {
  const evidence = Array.isArray(brief.evidence) ? brief.evidence : [];
  const actions = Array.isArray(brief.actions) ? brief.actions : [];
  return `
    <article class="document-judgement-card ${escapeHtml(brief.tone || "neutral")}">
      <div>
        <span>${escapeHtml(brief.label || "单证判断")}</span>
        <strong>${escapeHtml(brief.score ? `${brief.score}%` : "待补资料")}</strong>
      </div>
      <p>${escapeHtml(brief.opinion || "补齐关键字段后再判断。")}</p>
      <div class="document-evidence-grid">
        ${evidence.map(([label, value]) => `<small><b>${escapeHtml(label)}</b>${escapeHtml(value)}</small>`).join("")}
      </div>
      <ul>${actions.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function buildInvoiceJudgement(data = {}, missing = []) {
  const warnings = [];
  const productText = normalize((data.filledItems || []).map((item) => item.product).join(" ") || data.product);
  if (data.mode !== "packing" && (!data.amount || data.amount <= 0)) warnings.push("商业发票金额为 0，不能作为正式清关发票。");
  if (!data.quantity || data.quantity <= 0) warnings.push("数量未形成有效合计。");
  if (data.net && data.gross && data.net > data.gross) warnings.push("净重大于毛重，和装箱单逻辑冲突。");
  if (!data.cartons || !data.gross || !data.net || !data.cbm) warnings.push("箱数、毛重、净重、体积没有形成完整装箱口径。");
  if (!data.hsCode) warnings.push("未写 HS Code，目的港清关和进口税费预估会变弱。");
  if (!productText || /待填写|goods|product description/.test(productText)) warnings.push("品名仍是占位或过泛，容易被客户/货代退回重做。");
  if (!data.loading || /待填写/i.test(data.loading) || !data.discharge || /待填写/i.test(data.discharge)) warnings.push("起运港/目的港不完整，不能直接给订舱或目的港清关使用。");
  if (!data.seller || /待填写/.test(data.seller) || !data.buyer || /待填写/.test(data.buyer)) warnings.push("买卖双方主体不完整，正式单证不可发送。");
  const score = Math.max(18, Math.min(96, 96 - missing.length * 4 - warnings.length * 9));
  const label = warnings.length >= 4 || missing.length >= 6 ? "不建议发送" : warnings.length ? "可作草稿" : "可进入复核";
  const tone = warnings.length >= 4 || missing.length >= 6 ? "danger" : warnings.length ? "warn" : "ok";
  const leadWarnings = warnings.slice(0, 2).map((item) => item.replace(/[。；;]+$/g, "")).join("；");
  const opinion = warnings.length
    ? `我的判断：这份${data.mode === "packing" ? "装箱单" : "商业发票"}现在更适合内部草稿，不适合直接发客户或报关行。最大问题是 ${leadWarnings}。`
    : `我的判断：这份${data.mode === "packing" ? "装箱单" : "商业发票"}的核心口径已经顺了，可以进入关务/货代复核，但仍要和合同、订舱、报关单保持一致。`;
  const actions = warnings.length
    ? warnings
    : ["和合同/PI 核对买卖双方、币制、贸易条款。", "和报关单核对 HS、品名、数量、毛净重、箱数和金额。"];
  return {
    score,
    label,
    tone,
    opinion,
    evidence: [
      ["货物行", `${data.filledItems?.length || 0} 行`],
      ["金额", data.mode === "packing" ? "箱单不显示金额" : `${data.currency || "USD"} ${data.amount ? data.amount.toFixed(2) : "0.00"}`],
      ["包装", `${data.cartons || 0} CTNS / G.W. ${data.gross || 0} / N.W. ${data.net || 0}`],
      ["HS", data.hsCode || "未填"]
    ],
    actions
  };
}

function buildDeclarationJudgement(data = {}, missing = []) {
  const grossValue = data["毛重 kg"] || data["毛重"] || "";
  const netValue = data["净重 kg"] || data["净重"] || "";
  const gross = Number(grossValue || 0);
  const net = Number(netValue || 0);
  const incoterm = normalize(data["成交方式"] || "");
  const goodsName = normalize(data["商品名称及规格型号"] || "");
  const warnings = [];
  if (gross && net && net > gross) warnings.push("净重大于毛重，和装箱单/报关逻辑冲突。");
  if (!data["商品编号"] || !/^\d{8,10}$/.test(String(data["商品编号"]).replace(/\D/g, ""))) warnings.push("商品编号不是清晰的 8-10 位编码，归类风险高。");
  if (!goodsName || /待填写|goods|product/.test(goodsName)) warnings.push("商品名称及规格型号太弱，缺少中文申报要素。");
  if (goodsName && !/(品牌|型号|用途|材质|功率|规格|brand|model|use|material|wireless|bluetooth|蓝牙|电池|成分|原理)/i.test(goodsName)) warnings.push("商品名称缺少品牌、型号、用途、材质、规格或工作原理等申报要素。");
  if (/cif/.test(incoterm) && (!data["运费"] || /无|0|none/i.test(data["运费"]) || !data["保费"] || /无|0|none/i.test(data["保费"]))) warnings.push("CIF 口径下运费/保费为空或为无，估价口径需复核。");
  if (!data["提运单号"]) warnings.push("缺提运单号，舱单/物流节点无法和报关单闭环。");
  if (!data["随附单证及编号"]) warnings.push("随附单证未列编号，后续查验或归档会断链。");
  const score = Math.max(15, Math.min(96, 96 - missing.length * 3 - warnings.length * 8));
  const label = warnings.length >= 4 || missing.length >= 10 ? "不宜申报" : warnings.length ? "需关务复核" : "可交关务复核";
  const tone = warnings.length >= 4 || missing.length >= 10 ? "danger" : warnings.length ? "warn" : "ok";
  const leadWarnings = warnings.slice(0, 2).map((item) => item.replace(/[。；;]+$/g, "")).join("；");
  const opinion = warnings.length
    ? `我的判断：这张报关单还不能只按“字段已填”看。最可能被退回或引发查验的问题是 ${leadWarnings}。`
    : "我的判断：当前报关草稿的主线比较完整，可以交给关务/报关行复核归类、估价、随附单证和监管证件。";
  return {
    score,
    label,
    tone,
    opinion,
    evidence: [
      ["商品编号", data["商品编号"] || "未填"],
      ["商品名称", data["商品名称及规格型号"] || "未填"],
      ["重量", `G.W. ${grossValue || 0} / N.W. ${netValue || 0}`],
      ["成交方式", data["成交方式"] || "未填"]
    ],
    actions: warnings.length ? warnings : ["让关务确认 HS、申报要素、监管条件和征免。", "和发票/箱单/合同核对数量、金额、币制、毛净重和件数。"]
  };
}

function renderDeclarationBeginnerTips(missing = getMissingDocumentFields(declarationRequiredFields)) {
  const target = $("declarationBeginnerTips");
  if (!target) return;
  const missingRows = missing.slice(0, 6).map(([id, label]) => {
    const [source, help] = declarationBeginnerSources[id] || ["业务/关务资料", "先确认来源资料，再填入报关单。"];
    return `<li><b>${escapeHtml(label)}</b><span>${escapeHtml(source)}</span><small>${escapeHtml(help)}</small></li>`;
  }).join("");
  const gross = Number($("declGrossWeight")?.value || 0);
  const net = Number($("declNetWeight")?.value || 0);
  const incoterm = String($("declIncoterm")?.value || "").trim().toUpperCase();
  const freight = String($("declFreight")?.value || "").trim();
  const insurance = String($("declInsurance")?.value || "").trim();
  const goodsName = String($("declGoodsName")?.value || "").trim();
  const warnings = [];
  if (gross && net && net > gross) warnings.push("净重不能大于毛重，请回到装箱单核对。");
  if (/CIF/.test(incoterm) && (!freight || /无|0|none/i.test(freight) || !insurance || /无|0|none/i.test(insurance))) warnings.push("成交方式是 CIF 时，运费/保费口径要特别确认。");
  if (/FOB/.test(incoterm) && freight && !/无|0|none/i.test(freight)) warnings.push("FOB 下如填写运费，要确认是否为报关估价口径需要。");
  if (goodsName && !/(品牌|型号|用途|材质|功率|规格|brand|model|use|material)/i.test(goodsName)) warnings.push("商品名称及规格型号不要只写品名，建议补品牌、型号、用途、材质或关键参数。");
  if (!$("declAttachedDocs")?.value && (missing.length <= 8 || declarationValidationActive)) warnings.push("随附单证建议至少列商业发票、装箱单、合同/PO，有许可证或原产地证也要列编号。");
  target.innerHTML = `
    <div class="declaration-tip-block">
      <strong>${missing.length ? "下一步先补这些" : "当前必填项基本齐了"}</strong>
      ${missing.length
        ? `<ul class="declaration-missing-guide">${missingRows}</ul>`
        : `<p>再检查商品行、件重尺、成交方式、运保杂费和三项价格确认是否和发票/箱单/合同一致。</p>`}
    </div>
    <div class="declaration-tip-block">
      <strong>小白最容易错的地方</strong>
      <ul>
        ${(warnings.length ? warnings : [
          "商品编号不是随便填，先按 HS 初筛结果再让关务复核。",
          "商品名称及规格型号要写中文申报信息，不要只复制英文品名。",
          "件数、毛重、净重必须和装箱单一致，金额必须和商业发票一致。"
        ]).slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderInvoiceDoc(event) {
  event?.preventDefault();
  const data = collectInvoiceDocData();
  const result = $("invoiceDocResult");
  const missing = updateDocumentFieldHighlights(invoiceRequiredFields, invoiceValidationActive);
  const judgement = buildInvoiceJudgement(data, missing);
  const amountLabel = data.quantity > 0 && data.unitPrice > 0
    ? `${data.currency} ${data.amount.toFixed(2)}`
    : "待填数量/单价";
  const amountNode = $("invoicePaperAmount");
  if (amountNode) amountNode.textContent = amountLabel;
  if (!result) return;
  const hasDraftContent = [
    data.invoiceNo,
    data.seller,
    data.buyer,
    data.product,
    data.quantity,
    data.cartons,
    data.gross,
    data.net,
    data.cbm
  ].some(Boolean);
  const filledCount = data.filledItems.length || (data.items[0]?.product || data.items[0]?.quantity ? 1 : 0);
  result.innerHTML = `
    <div class="invoice-inline-status">
      <strong>${hasDraftContent ? `${data.mode === "packing" ? "装箱单" : "商业发票"}草稿已更新` : "在上方单证格内直接填写"}</strong>
      <p>${hasDraftContent
        ? escapeHtml(`单证号 ${data.invoiceNo || "待填"} · ${filledCount || 0} 项货物 · ${data.quantity || 0} 件 · ${data.mode === "packing" ? "箱单不显示单价金额" : amountLabel} · ${data.cartons || 0} CTNS / ${data.gross || 0} KG / ${data.cbm || 0} CBM`)
        : "填写 Seller、Buyer、品名、数量、单价、箱数、毛重、净重和体积后，可直接复制单证摘要用于内部核对。"}
      </p>
      ${renderDocumentCheckLine(missing, invoiceValidationActive)}
      ${renderDocumentJudgement(judgement)}
    </div>
  `;
}

function setInvoiceDocumentMode(mode = "invoice") {
  const form = $("invoiceDocForm");
  if (!form) return;
  const normalizedMode = mode === "packing" ? "packing" : "invoice";
  form.dataset.documentMode = normalizedMode;
  if ($("invoicePaperTitle")) $("invoicePaperTitle").textContent = normalizedMode === "packing" ? "PACKING LIST" : "COMMERCIAL INVOICE";
  $("showInvoiceMode")?.classList.toggle("active", normalizedMode === "invoice");
  $("showPackingMode")?.classList.toggle("active", normalizedMode === "packing");
  renderInvoiceDoc({ preventDefault() {} });
}

function createInvoiceItemRow(index) {
  const row = document.createElement("tr");
  row.className = "invoice-goods-line-row";
  row.dataset.docItemRow = String(index);
  row.innerHTML = `
    <td colspan="3"><label><span>Marks</span><textarea id="docMarks${index}" rows="2" lang="zh-CN" placeholder="可空"></textarea></label></td>
    <td colspan="4"><label><span>Description</span><textarea id="docProductName${index}" rows="2" lang="zh-CN" placeholder="第 ${index} 项货物"></textarea></label></td>
    <td colspan="2"><label><span>HS Code（选填）</span><input id="docHsCode${index}" inputmode="numeric" /></label></td>
    <td colspan="1"><label><span>Qty</span><input id="docQuantity${index}" type="number" min="0" step="1" /></label></td>
    <td colspan="1"><label><span>Unit</span><input id="docUnit${index}" lang="zh-CN" placeholder="PCS" /></label></td>
    <td colspan="1" class="invoice-price-field"><label><span>Unit Price</span><input id="docUnitPrice${index}" type="number" min="0" step="0.01" /></label></td>
  `;
  return row;
}

function addInvoiceItemRow() {
  const rows = Array.from(document.querySelectorAll("[data-doc-item-row]"));
  const nextIndex = rows.length + 1;
  const totalRow = document.querySelector(".invoice-total-row");
  if (!totalRow) return;
  totalRow.parentNode.insertBefore(createInvoiceItemRow(nextIndex), totalRow);
}

function validateInvoiceDoc() {
  invoiceValidationActive = true;
  renderInvoiceDoc({ preventDefault() {} });
}

function loadInvoiceExample() {
  const values = {
    docInvoiceNo: `CI-${new Date().getFullYear()}-001`,
    docInvoiceDate: todayIsoDate(),
    docSeller: "Shenzhen Example Electronics Co., Ltd. / Shenzhen, China",
    docBuyer: "Example Import GmbH / Hamburg, Germany",
    docIncoterm: "FOB",
    docCurrency: "USD",
    docPortLoading: "Shanghai, China",
    docPortDischarge: "Hamburg, Germany",
    docVessel: "XIN ZHANJIANG V.123E",
    docMarks: "EXAMPLE / HAMBURG / C/NO. 1-50",
    docProductName: "Bluetooth Speaker",
    docHsCode: "85182100",
    docQuantity: "500",
    docUnit: "PCS",
    docUnitPrice: "12.50",
    docCartons: "50",
    docGrossWeight: "680",
    docNetWeight: "610",
    docCbm: "4.82"
  };
  Object.entries(values).forEach(([id, value]) => {
    if ($(id)) $(id).value = value;
  });
  renderInvoiceDoc({ preventDefault() {} });
}

const declarationFieldMap = [
  ["预录入编号", "declPreNo"],
  ["海关编号", "declCustomsNo"],
  ["出境关别", "declExportCustoms"],
  ["出口日期", "declExportDate"],
  ["申报日期", "declDeclareDate"],
  ["备案号", "declRecordNo"],
  ["境内收发货人", "declDomesticConsignee"],
  ["境外收发货人", "declOverseasConsignee"],
  ["生产销售单位", "declProducer"],
  ["申报单位", "declAgent"],
  ["运输方式", "declTransportMode"],
  ["运输工具名称及航次号", "declVesselVoyage"],
  ["提运单号", "declBlNo"],
  ["监管方式", "declTradeMode"],
  ["征免性质", "declLevyNature"],
  ["许可证号", "declLicenseNo"],
  ["合同协议号", "declContractNo"],
  ["贸易国（地区）", "declTradeCountry"],
  ["运抵国（地区）", "declDestinationCountry"],
  ["指运港", "declDestinationPort"],
  ["离境口岸", "declExitPort"],
  ["包装种类", "declPackageType"],
  ["件数", "declPackages"],
  ["毛重 kg", "declGrossWeight"],
  ["净重 kg", "declNetWeight"],
  ["成交方式", "declIncoterm"],
  ["运费", "declFreight"],
  ["保费", "declInsurance"],
  ["杂费", "declOtherFee"],
  ["随附单证及编号", "declAttachedDocs"],
  ["标记唛码及备注", "declMarksRemark"],
  ["商品编号", "declGoodsCode"],
  ["商品名称及规格型号", "declGoodsName"],
  ["数量及单位", "declGoodsQuantity"],
  ["单价 / 总价 / 币制", "declGoodsValue"],
  ["原产国（地区）", "declOriginCountry"],
  ["最终目的国（地区）", "declFinalCountry"],
  ["境内货源地", "declDomesticSource"],
  ["征免", "declLevyMode"],
  ["特殊关系确认", "declSpecialRelation"],
  ["价格影响确认", "declPriceImpact"],
  ["支付特许权使用费确认", "declRoyalty"],
  ["自报自缴", "declSelfPayment"],
  ["报关人员", "declBrokerName"],
  ["报关人员证号", "declBrokerCert"],
  ["电话", "declBrokerPhone"],
  ["申报单位（签章）", "declAgentSeal"],
  ["海关批注及签章", "declCustomsRemark"]
];

function collectDeclarationData() {
  const data = Object.fromEntries(declarationFieldMap.map(([label, id]) => [label, docField(id)]));
  data.商品项 = collectDeclarationGoodsItems();
  return data;
}

function declarationValue(data, label, fallback = "待填写") {
  return data[label] || fallback;
}

function collectDeclarationGoodsItems() {
  return Array.from(document.querySelectorAll("[data-decl-item-row]")).map((row, index) => {
    const suffix = lineSuffix(index + 1);
    return {
      index: index + 1,
      code: docField(`declGoodsCode${suffix}`),
      name: docField(`declGoodsName${suffix}`),
      quantity: docField(`declGoodsQuantity${suffix}`),
      value: docField(`declGoodsValue${suffix}`),
      origin: docField(`declOriginCountry${suffix}`),
      finalCountry: docField(`declFinalCountry${suffix}`),
      domesticSource: docField(`declDomesticSource${suffix}`),
      levyMode: docField(`declLevyMode${suffix}`)
    };
  });
}

function renderDeclarationDoc(event) {
  event?.preventDefault();
  const data = collectDeclarationData();
  const result = $("declarationDocResult");
  const missing = updateDocumentFieldHighlights(declarationRequiredFields, declarationValidationActive);
  const judgement = buildDeclarationJudgement(data, missing);
  renderDeclarationBeginnerTips(missing);
  if (!result) return;
  const goodsCount = (data.商品项 || []).filter((item) => item.code || item.name || item.quantity || item.value).length;
  result.innerHTML = `
    <div class="declaration-inline-status">
      <strong>${declarationValidationActive && missing.length ? "报关单草稿待补充" : "已校验当前报关单草稿"}</strong>
      <p>商品项：${goodsCount || 1} 行；首项商品编号：${escapeHtml(declarationValue(data, "商品编号"))}；商品名称：${escapeHtml(declarationValue(data, "商品名称及规格型号"))}；件数、重量、成交方式和单证口径需一致。</p>
      ${renderDocumentCheckLine(missing, declarationValidationActive)}
      ${renderDocumentJudgement(judgement)}
    </div>
  `;
}

function validateDeclarationDoc() {
  declarationValidationActive = true;
  renderDeclarationDoc({ preventDefault() {} });
}

function loadDeclarationExample() {
  const values = {
    declPreNo: "DRAFT-2026-001",
    declCustomsNo: "正式申报后生成",
    declExportCustoms: "上海海关",
    declExportDate: todayIsoDate(),
    declDeclareDate: todayIsoDate(),
    declRecordNo: "无",
    declDomesticConsignee: "91440300MAEXAMPLE 深圳示例电子有限公司",
    declOverseasConsignee: "Example Import GmbH",
    declProducer: "深圳示例电子有限公司",
    declAgent: "示例报关有限公司",
    declTransportMode: "水路运输",
    declVesselVoyage: "XIN ZHANJIANG V.123E",
    declBlNo: "COSU123456789",
    declTradeMode: "一般贸易",
    declLevyNature: "一般征税",
    declLicenseNo: "无",
    declContractNo: "PO-2026-001",
    declTradeCountry: "德国",
    declDestinationCountry: "德国",
    declDestinationPort: "Hamburg",
    declExitPort: "上海港",
    declPackageType: "纸箱",
    declPackages: "50",
    declGrossWeight: "680",
    declNetWeight: "610",
    declIncoterm: "FOB",
    declFreight: "无",
    declInsurance: "无",
    declOtherFee: "无",
    declAttachedDocs: "商业发票 CI-2026-001；装箱单 PL-2026-001；合同 PO-2026-001",
    declMarksRemark: "EXAMPLE / HAMBURG / C/NO. 1-50；特殊关系确认：否；价格影响确认：否；支付特许权使用费确认：否。",
    declGoodsCode: "8518210000",
    declGoodsName: "蓝牙音箱；家用音频播放；Bluetooth Speaker；品牌 EXAMPLE；型号 BS-100",
    declGoodsQuantity: "500 台",
    declGoodsValue: "USD 12.50 / USD 6250.00",
    declOriginCountry: "中国",
    declFinalCountry: "德国",
    declDomesticSource: "广东深圳",
    declLevyMode: "照章征税",
    declSpecialRelation: "否",
    declPriceImpact: "否",
    declRoyalty: "否",
    declSelfPayment: "否",
    declBrokerName: "张三",
    declBrokerCert: "440300EXAMPLE",
    declBrokerPhone: "13800000000",
    declAgentSeal: "示例报关有限公司 / 2026-06-13",
    declCustomsRemark: ""
  };
  Object.entries(values).forEach(([id, value]) => {
    if ($(id)) $(id).value = value;
  });
  renderDeclarationBeginnerTips([]);
  renderDeclarationDoc({ preventDefault() {} });
}

function createDeclarationGoodsRow(index) {
  const row = document.createElement("tr");
  row.className = "declaration-goods-line-row";
  row.dataset.declItemRow = String(index);
  row.innerHTML = `
    <td>${index}</td>
    <td><input id="declGoodsCode${index}" inputmode="numeric" placeholder="商品编码" /></td>
    <td><textarea id="declGoodsName${index}" rows="2" lang="zh-CN" placeholder="第 ${index} 项商品名称及规格型号"></textarea></td>
    <td><input id="declGoodsQuantity${index}" lang="zh-CN" placeholder="数量及单位" /></td>
    <td><input id="declGoodsValue${index}" lang="zh-CN" placeholder="单价/总价/币制" /></td>
    <td><input id="declOriginCountry${index}" lang="zh-CN" placeholder="原产国" /></td>
    <td><input id="declFinalCountry${index}" lang="zh-CN" placeholder="最终目的国" /></td>
    <td><input id="declDomesticSource${index}" lang="zh-CN" placeholder="境内货源地" /></td>
    <td><input id="declLevyMode${index}" lang="zh-CN" placeholder="征免" /></td>
  `;
  return row;
}

function addDeclarationGoodsRow() {
  const body = document.querySelector(".customs-declaration-goods tbody");
  if (!body) return;
  const rows = Array.from(document.querySelectorAll("[data-decl-item-row]"));
  body.appendChild(createDeclarationGoodsRow(rows.length + 1));
}

function declarationExcelHtml(data = collectDeclarationData()) {
  const row = (label, value) => `<tr><td style="font-weight:bold;background:#eef6ff;">${escapeHtml(label)}</td><td>${escapeHtml(value || "")}</td></tr>`;
  const goodsLabels = new Set(["商品编号", "商品名称及规格型号", "数量及单位", "单价 / 总价 / 币制", "原产国（地区）", "最终目的国（地区）", "境内货源地", "征免"]);
  const footerLabels = new Set(["特殊关系确认", "价格影响确认", "支付特许权使用费确认", "自报自缴", "报关人员", "报关人员证号", "电话", "申报单位（签章）", "海关批注及签章"]);
  const headerRows = declarationFieldMap.filter(([label]) => !goodsLabels.has(label) && !footerLabels.has(label)).map(([label]) => row(label, data[label])).join("");
  const goodsRows = (data.商品项 || [])
    .filter((item, index) => index === 0 || item.code || item.name || item.quantity || item.value)
    .map((item) => `
      <tr><td colspan="2" style="font-weight:bold;background:#dbeafe;">商品项 ${item.index}</td></tr>
      ${row("商品编号", item.code)}
      ${row("商品名称及规格型号", item.name)}
      ${row("数量及单位", item.quantity)}
      ${row("单价 / 总价 / 币制", item.value)}
      ${row("原产国（地区）", item.origin)}
      ${row("最终目的国（地区）", item.finalCountry)}
      ${row("境内货源地", item.domesticSource)}
      ${row("征免", item.levyMode)}
    `)
    .join("");
  const footerRows = declarationFieldMap.filter(([label]) => footerLabels.has(label)).map(([label]) => row(label, data[label])).join("");
  return `
    <html><head><meta charset="utf-8" /></head><body>
      <table border="1">
        <tr><th colspan="2" style="font-size:18px;">中华人民共和国海关出口货物报关单（草稿）</th></tr>
        ${headerRows}
        <tr><th colspan="2" style="background:#dbeafe;">商品项</th></tr>
        ${goodsRows}
        <tr><th colspan="2" style="background:#dbeafe;">底部确认与签章</th></tr>
        ${footerRows}
        <tr><td style="font-weight:bold;background:#eef6ff;">申报日期</td><td>${todayIsoDate()}</td></tr>
        <tr><td colspan="2">提示：本 Excel 为填制草稿，正式申报以单一窗口、海关总署填制规范和报关行复核为准。</td></tr>
      </table>
    </body></html>
  `;
}

function downloadDeclarationExcelFile() {
  const data = collectDeclarationData();
  if (!$("declarationDocResult")?.innerHTML) renderDeclarationDoc({ preventDefault() {} });
  downloadBlob("报关单草稿.xls", `\ufeff${declarationExcelHtml(data)}`, "application/vnd.ms-excel;charset=utf-8");
}

function printDocumentPaper(moduleId) {
  if (moduleId === "docs-invoice") {
    renderInvoiceDoc({ preventDefault() {} });
  }
  if (moduleId === "docs-declaration") {
    renderDeclarationDoc({ preventDefault() {} });
  }
  const missing = moduleId === "docs-invoice"
    ? getMissingDocumentFields(invoiceRequiredFields)
    : getMissingDocumentFields(declarationRequiredFields);
  const choice = window.prompt(
    `导出前检查：${documentMissingSummary(missing)}\n输入 1：保留空白字段/空白货物行\n输入 2：隐藏空白货物行和空白占位文字\n点击取消：返回继续填写`,
    missing.length ? "2" : "1"
  );
  if (choice === null) return;
  document.body.dataset.hideEmptyDocFields = choice.trim() === "2" ? "1" : "0";
  markEmptyDocumentRows();

  const previousTitle = document.title;
  const titleSeed = moduleId === "docs-invoice"
    ? ($("docInvoiceNo")?.value || "箱单发票")
    : ($("declPreNo")?.value || "报关单草稿");
  const cleanup = () => {
    delete document.body.dataset.printDocument;
    delete document.body.dataset.hideEmptyDocFields;
    clearEmptyDocumentRows();
    document.title = previousTitle;
    window.removeEventListener("afterprint", cleanup);
  };

  document.body.dataset.printDocument = moduleId;
  document.title = `LogisMaster-${titleSeed}`;
  window.addEventListener("afterprint", cleanup, { once: true });
  window.requestAnimationFrame(() => window.print());
  window.setTimeout(() => {
    if (document.body.dataset.printDocument === moduleId) cleanup();
  }, 120000);
}

function rowHasDocumentValue(row) {
  return Array.from(row.querySelectorAll("input, textarea, select")).some((element) => String(element.value || "").trim());
}

function markEmptyDocumentRows() {
  document.querySelectorAll("[data-doc-item-row], [data-decl-item-row]").forEach((row, index) => {
    row.classList.toggle("doc-empty-row", index > 0 && !rowHasDocumentValue(row));
  });
}

function clearEmptyDocumentRows() {
  document.querySelectorAll(".doc-empty-row").forEach((row) => row.classList.remove("doc-empty-row"));
}

function clampPercent(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function visibleBarPercent(value) {
  return value > 0 ? Math.max(4, clampPercent(value)) : 3;
}

function completedInputPercent(ids = []) {
  if (!ids.length) return 0;
  const completed = ids.filter((id) => String($(id)?.value || "").trim()).length;
  return clampPercent((completed / ids.length) * 100);
}

function moneyOrDash(value, prefix = "USD") {
  return value ? `${prefix} ${value.toFixed(2)}` : "--";
}

function renderUtilizationRow(label, percent, note = "") {
  const safePercent = clampPercent(percent);
  const barPercent = visibleBarPercent(percent);
  const stateClass = percent > 100 ? "over" : percent > 88 ? "tight" : percent > 0 ? "ok" : "";
  return `
    <div class="util-row ${stateClass}">
      <span>${escapeHtml(label)}</span>
      <i><b style="width: ${barPercent}%"></b></i>
      <strong>${percent ? `${Math.round(percent)}%` : "--"}</strong>
      ${note ? `<small>${escapeHtml(note)}</small>` : ""}
    </div>
  `;
}

function renderDocChipList(items = []) {
  return `<div class="doc-chip-row">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
}

function seaContainerLabel(type) {
  return { LCL: "拼箱 LCL", "20GP": "20GP", "40GP": "40GP", "40HQ": "40HQ", "45HQ": "45HQ" }[type] || type;
}

function airModeLabel(mode) {
  return { express: "快件 Express", general: "普通空运散货", bsa: "包板/BSA", charter: "包机/Charter" }[mode] || "空运";
}

function cargoNatureLabel(nature) {
  return {
    general: "普货",
    "battery-contained": "含电池设备",
    "battery-alone": "电池单独运输",
    magnetic: "磁性/带喇叭磁钢",
    sample: "样品/维修件"
  }[nature] || "普货";
}

function evaluateSeaLoad(event) {
  event?.preventDefault();
  const length = numericField("seaLength");
  const width = numericField("seaWidth");
  const height = numericField("seaHeight");
  const cartons = numericField("seaCartons");
  const gross = numericField("seaGrossWeight");
  const type = $("seaContainerType")?.value || "LCL";
  const rate = numericField("seaRate");
  const fees = numericField("seaLocalFees");
  const packingMode = $("seaPackingMode")?.value || "carton";
  const cbm = length && width && height && cartons ? (length * width * height * cartons) / 1000000 : 0;
  const chargeTon = Math.max(cbm, gross / 1000);
  const containerCaps = { LCL: 0, "20GP": 28, "40GP": 58, "40HQ": 68, "45HQ": 78 };
  const containerPayload = { LCL: 0, "20GP": 28200, "40GP": 26700, "40HQ": 26500, "45HQ": 27600 };
  const containerTare = { LCL: 0, "20GP": 2200, "40GP": 3800, "40HQ": 3900, "45HQ": 4800 };
  const cap = containerCaps[type] || 0;
  const payload = containerPayload[type] || 0;
  const fill = cap ? (cbm / cap) * 100 : null;
  const vgm = containerTare[type] ? gross + containerTare[type] : 0;
  const baseFreight = rate ? (type === "LCL" ? chargeTon * rate : rate) : 0;
  const estimatedCost = baseFreight + fees;
  const weightUtil = payload ? (gross / payload) * 100 : 0;
  const density = cbm ? gross / cbm : 0;
  const selectedFillPercent = fill === null ? (cbm ? (cbm / 20) * 100 : 0) : fill;
  const gaugePercent = selectedFillPercent ? clampPercent(selectedFillPercent) : completedInputPercent(["seaLength", "seaWidth", "seaHeight", "seaCartons", "seaGrossWeight"]);
  const fillDisplay = fill === null ? (cbm ? `LCL 参考 ${clampPercent(cbm / 20 * 100)}% / 20CBM` : "LCL 待补") : `${Math.round(fill)}%`;
  const lclOrFcl = !cbm
    ? "填写尺寸后自动给出 LCL/FCL 建议"
    : cbm < 15 && gross < 8000
      ? "优先按 LCL 询价，同时关注目的港最低收费"
      : cbm < 24
        ? "建议同时比较 LCL 和 20GP"
        : cbm <= 58
          ? "建议比较 20GP / 40GP 整柜报价"
          : cbm <= 68
            ? "优先按 40HQ 核价，并复核可装性"
            : "可能需要拆柜或多柜方案";
  const weightBoundary = payload
    ? (gross > payload ? "超过参考载重" : weightUtil > 88 ? "接近限重" : "重量常规")
    : gross ? "看入仓重量" : "待补重量";
  const utilRows = [
    renderUtilizationRow("20GP", cbm ? (cbm / containerCaps["20GP"]) * 100 : 0, "约 28 CBM"),
    renderUtilizationRow("40GP", cbm ? (cbm / containerCaps["40GP"]) * 100 : 0, "约 58 CBM"),
    renderUtilizationRow("40HQ", cbm ? (cbm / containerCaps["40HQ"]) * 100 : 0, "约 68 CBM")
  ].join("");
  const docItems = ["箱单/发票", "唛头", "货好时间", "订舱口径"];
  if (packingMode === "pallet") docItems.push("托盘尺寸", "可堆叠层数");
  if (packingMode === "wood") docItems.push("IPPC/熏蒸");
  if (packingMode === "dg") docItems.push("MSDS", "UN38.3", "危包/限量");
  const warnings = [];
  if (!cbm) warnings.push("尺寸/箱数不完整，无法计算总体积。");
  if (fill !== null && fill > 100) warnings.push(`${seaContainerLabel(type)} 参考箱容不足，需换更大箱型或拆柜。`);
  if (gross > 0 && cbm > 0 && gross / cbm > 800) warnings.push("货物偏重，订舱前确认单箱承重、托盘承重和码头/仓库装卸能力。");
  if (fill !== null && fill > 90 && fill <= 100) warnings.push("箱容利用率很高，实际还要预留托盘、加固、通风和装卸空间。");
  if (payload && gross > payload) warnings.push("重量超过箱型参考载重，需让货代按船司、码头、拖车和道路限制复核。");
  if (/40HQ|45HQ/.test(type) && gross > 26000) warnings.push("重量可能超过常规道路/箱型操作边界，需让货代按港口和拖车限制复核。");
  if (packingMode === "pallet") warnings.push("托盘货要按托盘尺寸、可堆叠层数和叉车空间重新复核箱容，不能只看散箱 CBM。");
  if (packingMode === "dg") warnings.push("含电池/DG 要先确认 MSDS、UN38.3、危包/限量、船司接收和港区进港窗口。");
  if (packingMode === "wood") warnings.push("木包装需确认 IPPC 标识、熏蒸/非木证明和目的国木包装要求。");
  $("seaLoadResult").innerHTML = `
    <article class="freight-result-card primary cargo-dashboard sea-dashboard calc-command-card">
      <div class="calc-command-top">
        <div class="dashboard-head">
          <span>装柜仪表盘</span>
          <strong>${cbm ? `${cbm.toFixed(2)} CBM` : "待补尺寸"}</strong>
        </div>
        <div class="calc-gauge sea-gauge" style="--gauge: ${gaugePercent}%">
          <strong>${selectedFillPercent ? `${Math.round(selectedFillPercent)}%` : `${gaugePercent}%`}</strong>
          <span>${cap ? "选定箱型" : "填写进度"}</span>
        </div>
      </div>
      <div class="dashboard-metrics">
        <div><span>CBM</span><strong>${cbm ? cbm.toFixed(2) : "--"}</strong></div>
        <div><span>W/M</span><strong>${chargeTon ? chargeTon.toFixed(2) : "--"}</strong></div>
        <div><span>密度</span><strong>${density ? `${density.toFixed(0)} kg/CBM` : "--"}</strong></div>
      </div>
      <p>${escapeHtml(seaContainerLabel(type))}：${escapeHtml(fillDisplay)} · ${escapeHtml(lclOrFcl)}</p>
    </article>
    <article class="freight-result-card sea-meter-card wide"><span>箱型利用率</span><div class="container-util-list">${utilRows}</div></article>
    <article class="freight-result-card"><span>VGM/限重</span><strong>${escapeHtml(weightBoundary)}</strong><p>${vgm ? `初算 VGM ${vgm.toFixed(0)} kg；重量利用率 ${Math.round(weightUtil)}%。正式以称重和船司要求为准。` : "拼箱看货代仓库入仓重量、单箱承重和目的港收费口径。"}</p></article>
    <article class="freight-result-card"><span>费用快算</span><strong>${estimatedCost ? `USD ${estimatedCost.toFixed(2)}` : "待填费率"}</strong><div class="result-split-list"><div><span>基础运费</span><b>${moneyOrDash(baseFreight)}</b></div><div><span>港杂/本地</span><b>${moneyOrDash(fees)}</b></div></div><p>${type === "LCL" ? "LCL 按 W/M x 费率 + 杂费初算。" : "FCL 按柜价 + 杂费初算。"}</p></article>
    <article class="freight-result-card"><span>下单资料清单</span><strong>${completedInputPercent(["seaLength", "seaWidth", "seaHeight", "seaCartons", "seaGrossWeight"])}%</strong>${renderDocChipList(docItems)}</article>
    <article class="freight-result-card warning"><span>操作提醒</span><ul>${(warnings.length ? warnings : ["装柜前确认托盘尺寸、毛重、唛头、外箱强度、是否含电池/DG 和是否需要熏蒸/木包证明。"]).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article class="freight-result-card wide copy-quote-card"><span>询价说明</span><strong>生成给货代/供应商的核价文字</strong><p>复制后可直接粘贴到邮件或聊天里，让对方按费用项目报价。</p><button type="button" class="secondary-button" data-copy-inquiry="sea">复制海运询价说明</button><small id="seaCopyStatus"></small></article>
  `;
}

function loadSeaCalcExample() {
  const values = {
    seaLength: "60",
    seaWidth: "40",
    seaHeight: "35",
    seaCartons: "500",
    seaGrossWeight: "6800",
    seaRate: "1450",
    seaLocalFees: "580",
    seaContainerType: "40HQ",
    seaPackingMode: "carton"
  };
  Object.entries(values).forEach(([id, value]) => {
    if ($(id)) $(id).value = value;
  });
  evaluateSeaLoad({ preventDefault() {} });
}

const seaTerminalProfiles = {
  "shanghai-yangshan": {
    name: "上海港 · 洋山港区",
    city: "上海",
    terminal: "洋山港区",
    accept: {
      oog: "可询价/可申请，必须由船司和码头审核超限尺寸、配载和进港窗口。",
      reefer: "可操作冷箱，需确认插电、温控、堆场和提箱/进港计划。",
      bbk: "标准集装箱码头不是 BBK 默认渠道；件杂货/散杂货需另询船司、港区或项目物流。",
      dg: "危险品/特种箱需走出口重箱进港申请并经码头审核；部分危险品箱可能不能网上受理，需柜面或人工受理。"
    },
    documents: ["船司确认的特种箱订舱", "箱型/尺寸/重量/OOG 图纸或照片", "装箱加固方案", "冷箱温度设定或 DG 资料", "进港申请/预约审核结果"],
    fees: ["非标准集装箱/超限箱相关收费", "冷藏箱插电/监控/堆存", "危险品箱、危申和港区特殊操作", "吊装、搬移、翻装、查验、滞箱/堆存"],
    operation: ["先取得船司接受和箱型确认。", "在上港服务平台办理对应进港/计划申请，特种箱、危险品按平台提示走审核。", "审核通过后再安排拖车进港，避免到闸口被退。", "费用以服务中心收费标准和码头实际作业为准。"],
    sources: [
      ["上港集团操作指南", "https://www.sipg.com.cn/Home/OperatingGuide"],
      ["上港集团收费服务目录清单", "https://www.portshanghai.com.cn/u/cms/www/202006/181626267096.pdf"],
      ["上港集团服务平台", "https://www.sipg.com.cn/"]
    ]
  },
  "shanghai-waigaoqiao": {
    name: "上海港 · 外高桥港区",
    city: "上海",
    terminal: "外高桥港区",
    accept: {
      oog: "可询价/可申请，需确认具体外高桥码头公司、船公司、堆场和超限方向。",
      reefer: "可操作冷箱，需确认具体码头插电能力、温控要求和堆场窗口。",
      bbk: "不建议默认按集装箱流程处理；若是件杂货/大件，需另询项目物流或港区。",
      dg: "危险品、特种箱、非标箱需审核；不同危险品类别/箱型可能需线下或人工确认。"
    },
    documents: ["码头/船司确认的受理口径", "进港申请", "OOG 尺寸图", "冷箱设定温度", "DG 申报资料/MSDS"],
    fees: ["非标箱/超限箱", "冷箱插电与堆存", "危险品箱", "查验、搬移、翻装和港区特殊作业"],
    operation: ["先确认是外一期/外二期/外四期等具体码头。", "用上港平台按码头办理计划或进港申请。", "特殊箱未审核前不要直接安排拖车进港。", "收费以码头收费目录和实际作业项目为准。"],
    sources: [
      ["上港集团操作指南", "https://www.sipg.com.cn/Home/OperatingGuide"],
      ["上港集团收费服务目录清单", "https://www.portshanghai.com.cn/u/cms/www/202006/181626267096.pdf"],
      ["上港集团服务平台", "https://www.sipg.com.cn/"]
    ]
  },
  "xiamen-songyu": {
    name: "厦门港 · 嵩屿码头",
    city: "厦门",
    terminal: "嵩屿港区",
    accept: {
      oog: "可询价但必须逐票确认。嵩屿是集装箱码头，OOG 要看船司、箱型、码头设备和进港窗口。",
      reefer: "可询价/可操作方向，需确认冷箱插电、温控和堆场规则。",
      bbk: "不建议默认接 BBK；件杂/大件需另询码头和项目物流。",
      dg: "危险品需按厦门港区和码头要求确认类别、UN 号、进港限制和海事/码头审核。"
    },
    documents: ["订舱确认", "OOG 尺寸/重量/吊点资料", "冷箱温度设定", "DG 文件和危申资料", "码头/货代确认邮件"],
    fees: ["特种箱/非标箱操作", "冷箱插电和堆存", "危险品/特殊作业", "吊装、搬移、查验和滞港堆存"],
    operation: ["先让货代确认船公司挂靠嵩屿还是其他海沧码头。", "逐票确认特种箱是否接受，不同泊位/船公司可能不同。", "取得码头/货代确认后再安排进港。", "费用以厦门码头集团/码头网厅或报价单为准。"],
    sources: [
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["APM Terminals Xiamen", "https://www.apmterminals.com/en/xiamen"],
      ["厦门港口管理局", "https://port.xm.gov.cn/"]
    ]
  },
  "xiamen-international": {
    name: "厦门港 · 国际货柜码头",
    city: "厦门",
    terminal: "海沧国际货柜码头",
    accept: {
      oog: "需逐票确认。海沧不同码头泊位、设备和船司挂靠不同，不能只写“厦门港”判断。",
      reefer: "可询价/可操作方向，需确认冷箱堆场和插电规则。",
      bbk: "通常不按标准集装箱流程直接接，需另询项目物流/码头。",
      dg: "需确认危险品类别、UN 号和码头/海事审核要求。"
    },
    documents: ["具体码头确认", "特种箱订舱", "尺寸/重量/吊点", "温控或 DG 文件", "费用确认"],
    fees: ["特种箱/超限箱", "冷箱插电/堆存", "危险品和特殊操作", "查验/吊装/搬移"],
    operation: ["先区分国际货柜、海天/海润、嵩屿、远海或新海达。", "向货代/码头确认具体靠泊和进港规则。", "特种箱/OOG 需先审核后操作。", "费用以码头集团/码头实际收费公示或报价为准。"],
    sources: [
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["厦门港务控股", "https://www.xpgco.com.cn/"],
      ["厦门港口管理局", "https://port.xm.gov.cn/"]
    ]
  },
  "xiamen-haitian": {
    name: "厦门港 · 海天/海润码头",
    city: "厦门",
    terminal: "海沧海天/海润",
    accept: {
      oog: "需逐票确认，重点看船司挂靠、超限方向和码头设备。",
      reefer: "可询价/可操作方向，需确认冷箱堆场、插电和监控费用。",
      bbk: "不建议默认接收，需另询。",
      dg: "危险品按码头、海事和船司要求逐票审核。"
    },
    documents: ["订舱确认", "OOG 图纸/照片", "装箱加固方案", "冷箱设定或 DG 文件", "码头确认"],
    fees: ["非标箱/特种箱", "冷箱插电/堆存", "危险品/特殊操作", "查验/搬移/吊装"],
    operation: ["先确认具体海天/海润口径和船司挂靠。", "特种箱先审核再进港。", "冷箱提前确认插电和温控要求。", "费用按码头集团/实际报价核验。"],
    sources: [
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["厦门港务控股", "https://www.xpgco.com.cn/"]
    ]
  },
  "xiamen-yuanhai": {
    name: "厦门港 · 远海码头",
    city: "厦门",
    terminal: "远海自动化码头",
    accept: {
      oog: "自动化码头对超限/非标操作通常更需要提前确认；不要默认接受。",
      reefer: "可询价/可操作方向，需确认自动化堆场和冷箱规则。",
      bbk: "不建议默认接 BBK；大件/件杂货需另询。",
      dg: "危险品需逐票确认码头、船司、海事和自动化作业限制。"
    },
    documents: ["船司挂靠确认", "非标/OOG 数据", "冷箱或 DG 文件", "码头审核结果", "费用确认"],
    fees: ["非标/特殊作业", "冷箱插电/堆存", "危险品和特殊流程", "搬移/查验/滞港"],
    operation: ["确认是否挂靠远海自动化码头。", "OOG/BBK/DG 先走码头确认，不要按普通箱进港。", "冷箱需提前确认插电和监控。", "费用以码头/船司/货代确认单为准。"],
    sources: [
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["厦门远海码头", "https://www.xctg.com.cn/"]
    ]
  },
  generic: {
    name: "其他港口/码头",
    city: "待确认",
    terminal: "未指定",
    accept: {
      oog: "必须逐票确认，不能用城市港口名称代替码头结论。",
      reefer: "需确认冷箱插电能力、温控、堆存和费用。",
      bbk: "件杂/大件通常需要项目物流方案，不应默认集装箱码头接收。",
      dg: "危险品按 UN 号、类别、包装等级、码头/海事/船司要求逐票确认。"
    },
    documents: ["具体码头名称", "船司挂靠", "货型资料", "特殊操作申请", "费用确认"],
    fees: ["特种箱/非标箱", "冷箱插电", "危险品", "吊装/绑扎/查验/堆存"],
    operation: ["先明确具体码头，不要只写城市。", "让货代拿码头/船司确认。", "确认能接、费用、进港窗口后再操作。"],
    sources: [
      ["UN/LOCODE", "https://unlocode.unece.org/publications"],
      ["IMO Dangerous Goods", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"]
    ]
  }
};

const seaSpecialPortCatalog = [
  ["shanghai", "上海港", [
    ["shanghai-yangshan", "洋山港区"],
    ["shanghai-waigaoqiao", "外高桥港区"]
  ]],
  ["ningbo", "宁波舟山港", [
    ["ningbo-beilun", "北仑港区"],
    ["ningbo-meishan", "梅山港区"],
    ["ningbo-chuanshan", "穿山港区"],
    ["ningbo-daxie", "大榭港区"],
    ["ningbo-jintang", "金塘港区"]
  ]],
  ["shenzhen", "深圳港", [
    ["shenzhen-yantian", "盐田国际"],
    ["shenzhen-shekou", "蛇口集装箱码头"],
    ["shenzhen-chiwan", "赤湾港区"],
    ["shenzhen-dachan", "大铲湾码头"]
  ]],
  ["guangzhou", "广州港", [
    ["guangzhou-nansha", "南沙港区"],
    ["guangzhou-huangpu", "黄埔港区"]
  ]],
  ["qingdao", "青岛港", [
    ["qingdao-qianwan", "前湾港区"],
    ["qingdao-dongjiakou", "董家口港区"],
    ["qingdao-qqct", "QQCT/自动化码头"]
  ]],
  ["tianjin", "天津港", [
    ["tianjin-beijiang", "北疆港区"],
    ["tianjin-dongjiang", "东疆港区"],
    ["tianjin-alliance", "联盟国际/集装箱码头"]
  ]],
  ["xiamen", "厦门港", [
    ["xiamen-songyu", "嵩屿码头"],
    ["xiamen-international", "国际货柜码头"],
    ["xiamen-haitian", "海天/海润码头"],
    ["xiamen-yuanhai", "远海码头"]
  ]],
  ["fuzhou", "福州港", [
    ["fuzhou-jiangyin", "江阴港区"],
    ["fuzhou-mawei", "马尾港区"]
  ]],
  ["quanzhou", "泉州港", [
    ["quanzhou-shihu", "石湖港区"],
    ["quanzhou-douwei", "斗尾港区"]
  ]],
  ["dalian", "大连港", [
    ["dalian-dayaowan", "大窑湾集装箱码头"],
    ["dalian-wangang", "湾港/集装箱港区"]
  ]],
  ["yingkou", "营口港", [
    ["yingkou-bayuquan", "鲅鱼圈港区"],
    ["yingkou-xianrendao", "仙人岛港区"]
  ]],
  ["lianyungang", "连云港港", [
    ["lianyungang-container", "连云港集装箱码头"],
    ["lianyungang-xuwei", "徐圩港区"]
  ]],
  ["taicang", "太仓港", [
    ["taicang-container", "太仓港集装箱码头"],
    ["taicang-haitong", "太仓海通码头"]
  ]],
  ["nanjing", "南京港", [
    ["nanjing-longtan", "龙潭集装箱码头"],
    ["nanjing-xinshengwei", "新生圩港区"]
  ]],
  ["zhangjiagang", "张家港港", [
    ["zhangjiagang-container", "张家港集装箱码头"]
  ]],
  ["nantong", "南通港", [
    ["nantong-tonghai", "通海港区"],
    ["nantong-lvsi", "吕四港区"]
  ]],
  ["yantai", "烟台港", [
    ["yantai-container", "烟台港集装箱码头"],
    ["yantai-west", "西港区"]
  ]],
  ["rizhao", "日照港", [
    ["rizhao-container", "日照港集装箱码头"],
    ["rizhao-lanshan", "岚山港区"]
  ]],
  ["weihai", "威海港", [
    ["weihai-container", "威海港集装箱码头"]
  ]],
  ["tangshan", "唐山港", [
    ["tangshan-caofeidian", "曹妃甸港区"],
    ["tangshan-jingtang", "京唐港区"]
  ]],
  ["qinhuangdao", "秦皇岛港", [
    ["qinhuangdao-container", "秦皇岛港区"]
  ]],
  ["zhuhai", "珠海港", [
    ["zhuhai-gaolan", "高栏港区"],
    ["zhuhai-jiuzhou", "九洲港区"]
  ]],
  ["zhanjiang", "湛江港", [
    ["zhanjiang-baoman", "宝满集装箱码头"],
    ["zhanjiang-xiashan", "霞山港区"]
  ]],
  ["beibu", "北部湾港", [
    ["qinzhou-container", "钦州港区"],
    ["fangchenggang", "防城港港区"],
    ["beihai", "北海港区"]
  ]],
  ["haikou", "海口港", [
    ["haikou-xinhai", "新海港区"],
    ["haikou-macundao", "马村港区"]
  ]],
  ["yangpu", "洋浦港", [
    ["yangpu-xiaochantan", "小铲滩/洋浦集装箱码头"]
  ]]
];

const seaSpecialPortSources = {
  ningbo: [["宁波舟山港集团", "https://www.nbport.com.cn/"], ["宁波舟山港股份", "https://www.nbport.com.cn/"]],
  shenzhen: [["盐田国际", "https://www.yict.com.cn/"], ["招商港口", "https://www.cmport.com.hk/"]],
  guangzhou: [["广州港集团", "https://www.gzport.com/"], ["广州南沙港", "https://www.gzport.com/"]],
  qingdao: [["山东港口青岛港", "https://www.qingdao-port.com/"]],
  tianjin: [["天津港集团", "https://www.ptacn.com/"]],
  fuzhou: [["福州港务集团", "https://www.fzport.com/"]],
  quanzhou: [["泉州港口", "https://jtj.quanzhou.gov.cn/"]],
  dalian: [["辽宁港口集团", "https://www.liaogang.com/"]],
  yingkou: [["辽宁港口集团", "https://www.liaogang.com/"]],
  lianyungang: [["连云港港口集团", "https://www.lygport.com.cn/"]],
  taicang: [["太仓港", "https://www.taicangport.com/"]],
  nanjing: [["南京港集团", "https://www.nj-port.com/"]],
  zhangjiagang: [["张家港港务集团", "https://www.zjgport.com.cn/"]],
  nantong: [["南通港集团", "https://www.ntport.com.cn/"]],
  yantai: [["山东港口烟台港", "https://www.ytport.com/"]],
  rizhao: [["山东港口日照港", "https://www.rzport.com/"]],
  weihai: [["山东港口威海港", "https://www.whport.com.cn/"]],
  tangshan: [["唐山港集团", "https://www.jtport.com.cn/"]],
  qinhuangdao: [["河北港口集团", "https://www.porthebei.com/"]],
  zhuhai: [["珠海港", "https://www.0509.com.cn/"]],
  zhanjiang: [["湛江港集团", "https://www.zjport.com/"]],
  beibu: [["北部湾港", "https://www.bbwport.com/"]],
  haikou: [["海南港航", "https://www.coscoshippingports.com/"]],
  yangpu: [["洋浦经济开发区", "https://yangpu.hainan.gov.cn/"]]
};

function buildGenericSeaTerminalProfile(portName = "港口", terminalName = "码头/港区", portId = "") {
  return {
    name: `${portName} · ${terminalName}`,
    city: portName,
    terminal: terminalName,
    accept: {
      oog: `${terminalName} 的 OOG/Flat Rack/Open Top 需逐票确认超限方向、设备能力、进港路线、堆场窗口和船司挂靠。`,
      reefer: `${terminalName} 的冷箱需确认插电点位、温控监控、堆存、提还箱窗口和费用口径。`,
      bbk: `${terminalName} 如涉及 BBK/件杂/大件，通常不能按普通集装箱流程默认接收，需项目物流和港区逐票确认。`,
      dg: `${terminalName} 危险品需按 UN 号、Class、包装等级、海事/港区/船司要求逐票确认。`
    },
    documents: ["具体码头名称和船司挂靠", "货物尺寸/重量/照片或图纸", "订舱确认", "特殊操作申请", "费用和进港窗口确认"],
    fees: ["特种箱/OOG/BBK 特殊操作", "冷箱插电/监控/堆存", "危险品申报/堆存/监护", "吊装、搬移、查验、加固和滞港"],
    operation: ["先确认具体码头和船司挂靠。", "把尺寸、重量、吊点、温控或 DG 文件发货代/船司预审。", "拿到码头/船司书面确认后再安排进港。", "费用以码头官网、网厅、船司或货代当票报价为准。"],
    sources: seaSpecialPortSources[portId] || [["中国港口协会", "https://www.chinaports.org/"], ["UN/LOCODE", "https://unlocode.unece.org/publications"]]
  };
}

seaSpecialPortCatalog.forEach(([portId, portName, terminals]) => {
  (terminals || []).forEach(([terminalId, terminalName]) => {
    if (!seaTerminalProfiles[terminalId]) {
      seaTerminalProfiles[terminalId] = buildGenericSeaTerminalProfile(portName, terminalName, portId);
    }
  });
});

function seaSpecialPortName(portId = "") {
  return seaSpecialPortCatalog.find(([id]) => id === portId)?.[1] || "目标港口";
}

function terminalsForSeaSpecialPort(portId = "") {
  return seaSpecialPortCatalog.find(([id]) => id === portId)?.[2] || [["generic", "其他港口/码头"]];
}

function populateSeaSpecialPorts(selectedPort = "shanghai") {
  const portSelect = $("seaSpecialPort");
  if (!portSelect) return;
  portSelect.innerHTML = seaSpecialPortCatalog
    .map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`)
    .join("");
  portSelect.value = selectedPort && seaSpecialPortCatalog.some(([id]) => id === selectedPort) ? selectedPort : "shanghai";
  populateSeaSpecialTerminals(portSelect.value);
}

function populateSeaSpecialTerminals(portId = "shanghai", selectedTerminal = "") {
  const terminalSelect = $("seaSpecialTerminal");
  if (!terminalSelect) return;
  const terminals = terminalsForSeaSpecialPort(portId);
  terminalSelect.innerHTML = terminals
    .map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`)
    .join("");
  terminalSelect.value = selectedTerminal && terminals.some(([id]) => id === selectedTerminal) ? selectedTerminal : terminals[0]?.[0] || "generic";
}

const seaOpsFeeTerminalProfileMap = {
  "shanghai-yangshan": "shanghai-yangshan",
  "shanghai-waigaoqiao": "shanghai-waigaoqiao",
  "ningbo-beilun": "ningbo-zhoushan",
  "ningbo-meishan": "ningbo-zhoushan",
  "ningbo-chuanshan": "ningbo-zhoushan",
  "ningbo-daxie": "ningbo-zhoushan",
  "ningbo-jintang": "ningbo-zhoushan",
  "shenzhen-yantian": "shenzhen-yantian",
  "shenzhen-shekou": "shenzhen-shekou",
  "shenzhen-chiwan": "shenzhen-shekou",
  "shenzhen-dachan": "shenzhen-shekou",
  "guangzhou-nansha": "guangzhou-nansha",
  "guangzhou-huangpu": "guangzhou-nansha",
  "qingdao-qianwan": "qingdao-qianwan",
  "qingdao-dongjiakou": "qingdao-qianwan",
  "qingdao-qqct": "qingdao-qianwan",
  "tianjin-beijiang": "tianjin-xingang",
  "tianjin-dongjiang": "tianjin-xingang",
  "tianjin-alliance": "tianjin-xingang",
  "xiamen-songyu": "xiamen-haicang",
  "xiamen-international": "xiamen-haicang",
  "xiamen-haitian": "xiamen-haicang",
  "xiamen-yuanhai": "xiamen-haicang",
  "fuzhou-jiangyin": "fuzhou-jiangyin",
  "fuzhou-mawei": "fuzhou-jiangyin",
  "dalian-dayaowan": "dalian-port",
  "dalian-wangang": "dalian-port",
  "lianyungang-container": "lianyungang-port",
  "lianyungang-xuwei": "lianyungang-port"
};

function seaOpsFeePortEntryForTerminal(terminalId = "") {
  for (const [portId, portName, terminals] of seaSpecialPortCatalog) {
    const terminal = (terminals || []).find(([id]) => id === terminalId);
    if (terminal) return { portId, portName, terminalId: terminal[0], terminalName: terminal[1] };
  }
  return null;
}

function cloneSeaOpsFeeProfileForTerminal(baseProfile, terminalEntry) {
  const exact = baseProfile.id === terminalEntry.terminalId;
  return {
    ...baseProfile,
    id: terminalEntry.terminalId,
    portId: terminalEntry.portId,
    terminalId: terminalEntry.terminalId,
    name: `${terminalEntry.portName} · ${terminalEntry.terminalName}`,
    coverage: exact
      ? baseProfile.coverage
      : `${terminalEntry.portName}${terminalEntry.terminalName} 可按 ${baseProfile.name} 的公开/参考口径先拆项估算；正式核价仍需确认具体码头、船司和当票账单。`,
    feeLines: (baseProfile.feeLines || []).map((line) => ({ ...line })),
    cautions: [
      `当前选择的是 ${terminalEntry.terminalName}，报价和账单必须落到具体码头，不要只写${terminalEntry.portName}。`,
      ...(baseProfile.cautions || [])
    ],
    sources: (baseProfile.sources || []).map((source) => [...source])
  };
}

function buildGenericSeaOpsFeeProfile(portId = "shanghai", terminalId = "") {
  const entry = seaOpsFeePortEntryForTerminal(terminalId) || {
    portId,
    portName: seaSpecialPortName(portId),
    terminalId: terminalId || `${portId}-terminal`,
    terminalName: terminalsForSeaSpecialPort(portId)?.[0]?.[1] || "码头/港区"
  };
  return {
    id: entry.terminalId,
    portId: entry.portId,
    terminalId: entry.terminalId,
    name: `${entry.portName} · ${entry.terminalName}`,
    coverage: `${entry.portName}${entry.terminalName} 的费用先按普通箱、DG、冷箱、OOG/BBK、查验、移箱、堆存拆项核价。`,
    publicLevel: "全国码头参考口径",
    feeLines: [
      { types: ["general"], item: "普通箱码头作业/港杂", amount: "20GP 约 RMB 330-650/箱；40GP/HQ 约 RMB 530-950/箱", note: "全国主要码头参考区间；正式以具体码头、船司和货代当票账单为准。" },
      { types: ["dg"], item: "危险品箱特殊操作", amount: "普通箱费用 + DG 申报/审核/堆场/监护逐票核价", note: "按 UN 号、Class、包装等级、港区接收窗口、海事和船司规则确认。" },
      { types: ["reefer"], item: "冷箱插电/监控/堆存", amount: "常见 RMB 80-350/箱/天；按插电时间和码头规则计", note: "需确认 PTI、设定温度、插电起止时间、查验是否断电和超期堆存。" },
      { types: ["oog", "bbk"], item: "OOG/BBK/吊装/绑扎", amount: "逐票报价；吊装、绑扎、加固、特殊机械和超限运输另计", note: "按尺寸、重量、吊点、重心、进港路线和码头设备能力确认。" }
    ],
    cautions: [
      `先确认 ${entry.terminalName} 是否为船司挂靠码头，费用不能只按城市港口名称估。`,
      "查验、移箱、落箱、堆存、改配、超期和夜间作业通常不含在基础码头费里。",
      "DG、冷箱、OOG/BBK 必须逐票确认接收规则、资料、进港窗口和收费有效期。"
    ],
    sources: seaSpecialPortSources[entry.portId] || [["中国港口协会", "https://www.chinaports.org/"], ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]]
  };
}

function seaOpsFeeProfileByTerminal(terminalId = "") {
  const entry = seaOpsFeePortEntryForTerminal(terminalId);
  if (!entry) return seaOpsFeeProfiles[0];
  const baseId = seaOpsFeeTerminalProfileMap[terminalId];
  const baseProfile = seaOpsFeeProfiles.find((profile) => profile.id === baseId);
  return baseProfile ? cloneSeaOpsFeeProfileForTerminal(baseProfile, entry) : buildGenericSeaOpsFeeProfile(entry.portId, terminalId);
}

function allSeaOpsFeeProfiles() {
  return seaSpecialPortCatalog.flatMap(([, , terminals]) => (terminals || []).map(([terminalId]) => seaOpsFeeProfileByTerminal(terminalId)));
}

function populateSeaOpsFeePorts(selectedPort = "shanghai") {
  const portSelect = $("seaOpsFeePort");
  if (!portSelect) return;
  const fallback = selectedPort && seaSpecialPortCatalog.some(([id]) => id === selectedPort) ? selectedPort : "shanghai";
  portSelect.innerHTML = seaSpecialPortCatalog
    .map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`)
    .join("");
  portSelect.value = fallback;
}

function populateSeaOpsFeeTerminals(portId = "shanghai", selectedTerminal = "") {
  const terminalSelect = $("seaOpsFeeNode");
  if (!terminalSelect) return;
  const terminals = terminalsForSeaSpecialPort(portId);
  terminalSelect.innerHTML = terminals
    .map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`)
    .join("");
  terminalSelect.value = selectedTerminal && terminals.some(([id]) => id === selectedTerminal) ? selectedTerminal : terminals[0]?.[0] || "generic";
}

function selectSeaOpsFeeProfile(profile) {
  const terminalId = profile?.terminalId || profile?.id || "";
  const entry = seaOpsFeePortEntryForTerminal(terminalId);
  if (!entry) return;
  if ($("seaOpsFeePort")) {
    if (!$("seaOpsFeePort").children.length) populateSeaOpsFeePorts(entry.portId);
    $("seaOpsFeePort").value = entry.portId;
  }
  populateSeaOpsFeeTerminals(entry.portId, terminalId);
}

function specialSeaCargoProfile(type = "oog", port = "", terminalId = "generic") {
  const portText = seaSpecialPortName(port) || port || "目标港口";
  const terminal = seaTerminalProfiles[terminalId] || seaTerminalProfiles.generic;
  const profiles = {
    oog: {
      title: "OOG 超限货 / Flat Rack / Open Top",
      points: [
        "提前提供长宽高、重心、吊点、绑扎点、单件重量和照片/图纸。",
        "让船司确认超长、超宽、超高尺寸是否可接，并索要 OOG surcharge 和码头操作限制。",
        "在上海、宁波、盐田等港口操作时，需提前确认进港预约、加固方案和特殊作业窗口。"
      ]
    },
    reefer: {
      title: "Reefer 冷藏箱",
      points: [
        "确认设定温度、通风量、湿度、是否预冷、装箱时限和温度记录要求。",
        "订舱时写清 reefer set point，提柜后检查箱况、PTI 和电源连接。",
        "目的港提前确认插电费、冷箱堆场、提柜预约和超期费用。"
      ]
    },
    bbk: {
      title: "BBK / Break Bulk 件杂货",
      points: [
        "确认是否真的不能装柜：单件尺寸、重量、吊装方式、包装强度和防潮防震。",
        "需要船公司/港口确认吊装能力、堆存要求、绑扎加固、保险和装卸责任。",
        "费用通常不是标准箱价，需单独询价海运费、码头吊装、绑扎、港杂和保险。"
      ]
    },
    dg: {
      title: "危险品集装箱",
      points: [
        "确认 UN 号、危险品类别、包装等级、闪点、EMS、海污、净重和 MSDS。",
        "提前做 DG booking、危申、船司预审和港区进港窗口；第 9 类锂电池也不能当普通货忽略。",
        "不同港口/船司对 1-9 类危险品接收差异很大，正式以船司、码头和海事/港区要求为准。"
      ]
    }
  };
  const profile = profiles[type] || profiles.oog;
  return {
    ...profile,
    port: portText,
    terminal,
    terminalConclusion: terminal.accept[type] || "需逐票向码头/船司/货代确认是否接受。",
    costItems: terminal.fees || [],
    operationSteps: terminal.operation || [],
    terminalDocuments: terminal.documents || [],
    sources: dedupeTariffLinks([
      ["UN/LOCODE", "https://unlocode.unece.org/publications"],
      ["IMO Dangerous Goods", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"],
      ...(terminal.sources || [])
    ])
  };
}

function renderSeaSpecialGuide(event) {
  event?.preventDefault();
  const profile = specialSeaCargoProfile(
    $("seaSpecialType")?.value || "oog",
    $("seaSpecialPort")?.value || "",
    $("seaSpecialTerminal")?.value || "generic"
  );
  $("seaSpecialResult").innerHTML = `
    <article class="freight-result-card primary"><span>${escapeHtml(profile.port)}</span><strong>${escapeHtml(profile.title)}</strong><p>先把下单资料清单填齐，再看船司、货代和码头接收条件与费用口径。</p></article>
    <article class="freight-result-card terminal-verdict"><span>${escapeHtml(profile.terminal.name)}</span><strong>${escapeHtml(profile.terminalConclusion)}</strong><p>城市口岸不能代替码头结论；同一城市不同码头、船司和货型可能完全不同。</p></article>
    <article class="freight-result-card wide"><span>预备清单</span><ul>${profile.points.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article class="freight-result-card"><span>码头资料</span><ul>${profile.terminalDocuments.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article class="freight-result-card"><span>操作流程</span><ul>${profile.operationSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article class="freight-result-card"><span>费用参考项目</span><ul>${profile.costItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><p>具体金额以码头官网收费目录、网厅、船司/货代报价或当票作业单为准。</p></article>
    <article class="freight-result-card"><span>核验入口</span><div class="source-chip-grid">${profile.sources.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}</div></article>
  `;
}

function evaluateAirFreightCalc(event) {
  event?.preventDefault();
  const length = numericField("airLength");
  const width = numericField("airWidth");
  const height = numericField("airHeight");
  const pieces = numericField("airPieces");
  const gross = numericField("airGrossWeight");
  const mode = $("airFreightMode")?.value || "express";
  const rate = numericField("airRate");
  const surcharges = numericField("airSurcharges");
  const nature = $("airCargoNature")?.value || "general";
  const cbm = length && width && height && pieces ? (length * width * height * pieces) / 1000000 : 0;
  const divisor = mode === "express" ? 5000 : 6000;
  const volumeWeight = length && width && height && pieces ? (length * width * height * pieces) / divisor : 0;
  const chargeWeight = Math.max(gross, volumeWeight);
  const density = cbm ? gross / cbm : 0;
  const estimatedCost = rate && chargeWeight ? chargeWeight * rate + surcharges : 0;
  const modeText = airModeLabel(mode);
  const chargeSource = chargeWeight ? (volumeWeight > gross ? "体积重计费" : "实重计费") : "待补尺寸/重量";
  const throwCargo = volumeWeight && gross ? (volumeWeight > gross * 1.2 ? "明显抛货" : gross > volumeWeight * 1.2 ? "偏重货" : "接近平衡") : "待补";
  const grossBarWidth = chargeWeight ? `${Math.max(8, Math.min(100, Math.round((gross / chargeWeight) * 100)))}%` : "8%";
  const volumeBarWidth = chargeWeight ? `${Math.max(8, Math.min(100, Math.round((volumeWeight / chargeWeight) * 100)))}%` : "8%";
  const completeness = completedInputPercent(["airLength", "airWidth", "airHeight", "airPieces", "airGrossWeight"]);
  const baseFreight = rate && chargeWeight ? chargeWeight * rate : 0;
  const docItems = ["商业发票", "装箱单", "订舱资料", "AWB 信息"];
  if (nature === "battery-contained") docItems.push("MSDS", "UN38.3", "PI966/967");
  if (nature === "battery-alone") docItems.push("MSDS", "UN38.3", "PI965", "SOC");
  if (nature === "magnetic") docItems.push("磁检报告", "航空鉴定");
  if (nature === "sample") docItems.push("用途说明", "申报价值", "品牌授权");
  if (mode === "bsa") docItems.push("板型", "截仓时间", "可堆叠说明");
  if (mode === "charter") docItems.push("包机窗口", "装卸方案", "航权/航线确认");
  const tips = [];
  if (volumeWeight > gross * 1.2) tips.push("体积重明显大于实重，是抛货；报价和包装优化要重点看尺寸。");
  if (gross > volumeWeight * 1.2) tips.push("实重大于体积重，是偏重货；要确认单件重量、托盘承重和机场装卸限制。");
  if (/bsa|charter/.test(mode)) tips.push("包板/包机需要提前给板型、件重尺、堆叠限制、货好时间、截仓时间和安检资料。");
  if (nature === "battery-contained") tips.push("含电池设备需确认 UN38.3、MSDS、PI966/967、SOC、包装方式和承运人接收限制。");
  if (nature === "battery-alone") tips.push("电池单独运输通常比装在设备中更敏感，需先让承运人确认 PI965、SOC、危包和航线是否接收。");
  if (nature === "magnetic") tips.push("含喇叭磁钢、马达或磁性材料时，优先确认磁检报告和航空公司磁性限制。");
  if (nature === "sample") tips.push("样品/维修件要确认申报价值、用途说明、品牌授权、临时进口/退运资料和目的国收件人资质。");
  if (!tips.length) tips.push("计费重接近实重/体积重，继续确认电池、磁性、品牌、目的国清关和承运限制。");
  $("airFreightCalcResult").innerHTML = `
    <article class="freight-result-card primary cargo-dashboard air-dashboard calc-command-card">
      <div class="calc-command-top">
        <div class="dashboard-head">
          <span>Chargeable Weight</span>
          <strong>${chargeWeight ? `${chargeWeight.toFixed(1)} kg` : "待补尺寸/重量"}</strong>
        </div>
        <div class="calc-gauge air-gauge" style="--gauge: ${chargeWeight ? clampPercent((volumeWeight / Math.max(chargeWeight, 1)) * 100) : completeness}%">
          <strong>${chargeWeight ? `${chargeWeight.toFixed(0)}` : `${completeness}%`}</strong>
          <span>${chargeWeight ? "CW kg" : "填写进度"}</span>
        </div>
      </div>
      <div class="dashboard-metrics">
        <div><span>实重</span><strong>${gross ? `${gross.toFixed(1)} kg` : "--"}</strong></div>
        <div><span>体积重</span><strong>${volumeWeight ? `${volumeWeight.toFixed(1)} kg` : "--"}</strong></div>
        <div><span>判断</span><strong>${escapeHtml(throwCargo)}</strong></div>
      </div>
      <div class="charge-weight-bars" aria-label="实重和体积重对比">
        <div><span>实重</span><i style="width: ${grossBarWidth}"></i><b>${gross ? gross.toFixed(1) : "--"}</b></div>
        <div><span>体积重</span><i style="width: ${volumeBarWidth}"></i><b>${volumeWeight ? volumeWeight.toFixed(1) : "--"}</b></div>
      </div>
      <p>${escapeHtml(chargeSource)} · 公式：长 x 宽 x 高 x 件数 / ${divisor}</p>
    </article>
    <article class="freight-result-card"><span>运输类型</span><strong>${escapeHtml(modeText)}</strong><p>${mode === "express" ? "快件常用 5000，适合小票和门到门。" : "普通空运常用 6000；不同渠道可能调整。"}</p></article>
    <article class="freight-result-card"><span>体积</span><strong>${cbm ? `${cbm.toFixed(2)} CBM` : "待补尺寸"}</strong><p>尺寸会直接影响体积重和包板判断，包装优化通常先看这里。</p></article>
    <article class="freight-result-card"><span>密度判断</span><strong>${density ? `${density.toFixed(0)} kg/CBM` : "待补"}</strong><p>${density && density < 167 ? "偏抛货，报价会更受尺寸影响。" : density ? "偏重货，重点看单件重量和装卸限制。" : "补齐尺寸和重量后判断货型。"}</p></article>
    <article class="freight-result-card"><span>费用快算</span><strong>${estimatedCost ? `USD ${estimatedCost.toFixed(2)}` : "待填单价"}</strong><div class="result-split-list"><div><span>空运费</span><b>${moneyOrDash(baseFreight)}</b></div><div><span>燃油/安检/杂费</span><b>${moneyOrDash(surcharges)}</b></div></div><p>按计费重 x 空运单价 + 燃油/安检/杂费初算。</p></article>
    <article class="freight-result-card"><span>下单资料清单</span><strong>${completeness}% · ${escapeHtml(cargoNatureLabel(nature))}</strong>${renderDocChipList(docItems)}</article>
    <article class="freight-result-card warning"><span>操作提醒</span><ul>${tips.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article class="freight-result-card"><span>公式口径</span><strong>/${divisor}</strong><p>快件常见 /5000，普通空运常见 /6000；航空公司、货代渠道和目的港规则可能不同。</p></article>
    <article class="freight-result-card wide copy-quote-card"><span>询价说明</span><strong>生成给货代/承运商的核价文字</strong><p>复制后可直接让对方确认空运费、货站费、安检、仓储和特殊货限制。</p><button type="button" class="secondary-button" data-copy-inquiry="air">复制空运询价说明</button><small id="airCopyStatus"></small></article>
  `;
}

function loadAirCalcExample() {
  const values = {
    airLength: "60",
    airWidth: "40",
    airHeight: "35",
    airPieces: "20",
    airGrossWeight: "180",
    airRate: "4.5",
    airSurcharges: "120",
    airFreightMode: "general",
    airCargoNature: "battery-contained"
  };
  Object.entries(values).forEach(([id, value]) => {
    if ($(id)) $(id).value = value;
  });
  evaluateAirFreightCalc({ preventDefault() {} });
}

const customsPortGateways = [
  {
    id: "shanghai",
    name: "上海港",
    aliases: ["上海", "洋山", "外高桥", "SIPG", "上海港"],
    automation: "sipg",
    badge: "页面内自动尝试",
    status: "可先自动查；验证码时跳原站",
    queryMode: "箱号/提单号",
    note: "系统会先尝试上港集团箱货查询，失败后再尝试港航纵横；出现滑块/验证码时不绕过，改由人工在原网站完成。",
    links: [
      ["上港集团箱货查询", "https://www.sipg.com.cn/CONQUERY/index"],
      ["上港集团服务平台", "https://www.sipg.com.cn/"],
      ["港航纵横", "https://www.hb56.com/Index.aspx"]
    ]
  },
  {
    id: "ningbo",
    name: "宁波舟山港",
    aliases: ["宁波", "舟山", "北仑", "穿山", "梅山", "甬舟"],
    automation: "official",
    badge: "官网跳转",
    status: "官方页面可查，需跳转",
    queryMode: "进出门/装卸船/堆存",
    note: "宁波舟山港股份官网公开服务区提供集装箱信息查询入口，页面内暂不自动代查。",
    links: [
      ["宁波舟山港股份 · 港口商务", "https://www.nbport.com.cn/gfww/gksc/"],
      ["宁波舟山港股份", "https://www.nbport.com.cn/"]
    ]
  },
  {
    id: "tianjin",
    name: "天津港",
    aliases: ["天津", "新港", "北疆", "东疆"],
    automation: "official",
    badge: "官网跳转",
    status: "网厅/一码通查询",
    queryMode: "集港计划/装船进度/业务受理",
    note: "天津港常用一码通平台和集装箱业务网上受理中心；部分业务需要账号或公众号入口。",
    links: [
      ["天津港集装箱一码通平台", "https://eir.tjgportnet.com/eir/f/index"],
      ["天津港集装箱业务网上受理中心", "https://bil.tjgportnet.com/home/HomeIndex"]
    ]
  },
  {
    id: "qingdao",
    name: "青岛港",
    aliases: ["青岛", "前湾", "QQCT", "董家口"],
    automation: "official",
    badge: "官网/平台跳转",
    status: "多在云港通/港口平台核验",
    queryMode: "箱号/提单/提箱码",
    note: "青岛港相关查询通常在港口物流平台、云港通或船公司入口完成，页面内暂不自动代查。",
    links: [
      ["山东港口青岛港", "https://www.qingdao-port.net/"],
      ["青岛港物流平台资料", "https://oss.qingdao-port.net/wlds-common/download/container/%E9%9D%92%E5%B2%9B%E6%B8%AF%E8%BF%9B%E5%8F%A3%E6%8F%90%E7%AE%B1%E6%96%B0%E7%89%88%E4%BC%81%E4%B8%9A%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf"]
    ]
  },
  {
    id: "shenzhen-yantian",
    name: "深圳盐田",
    aliases: ["深圳", "盐田", "YICT", "大鹏湾"],
    automation: "official",
    badge: "官网/公众号跳转",
    status: "官网和移动端查询",
    queryMode: "柜号/提单/运抵报告",
    note: "盐田国际官网和官方移动入口适合查集装箱进度、运抵、船期等；页面内暂不自动代查。",
    links: [
      ["盐田国际集装箱码头", "https://www.yict.com.cn/index.html?locale=zh_CN"]
    ]
  },
  {
    id: "shenzhen-shekou",
    name: "深圳蛇口/赤湾/妈湾",
    aliases: ["蛇口", "赤湾", "妈湾", "SCT", "CCT", "MCT", "深圳西部"],
    automation: "official",
    badge: "码头/船司跳转",
    status: "多按具体码头或船司查",
    queryMode: "箱号/订舱/船司轨迹",
    note: "深圳西部港区需先确认具体码头和船司挂靠，常按码头网厅或船司官网查询。",
    links: [
      ["招商局港口", "https://www.cmport.com.hk/"],
      ["蛇口集装箱码头", "https://www.sctcn.com/"]
    ]
  },
  {
    id: "guangzhou-nansha",
    name: "广州南沙",
    aliases: ["广州", "南沙", "南沙港", "GCT", "广州港"],
    automation: "official",
    badge: "官网/APP跳转",
    status: "公共查询/APP/小程序",
    queryMode: "整箱/散货/码头状态",
    note: "广州港南沙相关查询通常通过广州港、码头官网、APP 或微信小程序完成，页面内暂不自动代查。",
    links: [
      ["广州集装箱码头有限公司", "https://www.gct.com.cn/"],
      ["广州港股份", "https://www.portgz.com/"],
      ["广州市港务局", "https://gwj.gz.gov.cn/"]
    ]
  },
  {
    id: "xiamen",
    name: "厦门港",
    aliases: ["厦门", "海沧", "嵩屿", "远海", "海天"],
    automation: "official",
    badge: "官网跳转",
    status: "码头集团/具体码头核验",
    queryMode: "箱号/船期/码头业务",
    note: "厦门港要先确认海沧国际、海天/海润、嵩屿、远海等具体码头，再按码头集团入口查询。",
    links: [
      ["厦门集装箱码头集团", "https://www.xctg.com.cn/"],
      ["厦门港务控股", "https://www.xpgco.com.cn/"],
      ["厦门港口管理局", "https://port.xm.gov.cn/"]
    ]
  },
  {
    id: "dalian",
    name: "大连港",
    aliases: ["大连", "大窑湾", "DCT"],
    automation: "official",
    badge: "官网跳转",
    status: "具体码头/船司核验",
    queryMode: "箱号/船司轨迹",
    note: "大连口岸建议确认大窑湾等具体码头和船司，优先用港口集团、码头或船司官网核验。",
    links: [
      ["辽宁港口集团", "https://www.liaoningport.com/"],
      ["大连港集装箱码头", "https://www.dct.com.cn/"]
    ]
  },
  {
    id: "lianyungang",
    name: "连云港",
    aliases: ["连云港", "LYG"],
    automation: "official",
    badge: "官网跳转",
    status: "港口平台/船司核验",
    queryMode: "箱号/船期/港口业务",
    note: "连云港建议按港口集团公开入口和船司轨迹核验，页面内暂不自动代查。",
    links: [
      ["连云港港口集团", "https://www.lygport.com.cn/"]
    ]
  },
  {
    id: "beibuwan",
    name: "北部湾/钦州",
    aliases: ["北部湾", "钦州", "防城", "北海"],
    automation: "official",
    badge: "官网跳转",
    status: "港口平台/船司核验",
    queryMode: "箱号/船期/港口业务",
    note: "北部湾港需按钦州、防城、北海等具体港区和船司轨迹核验。",
    links: [
      ["北部湾港集团", "https://www.bbwport.com/"]
    ]
  },
  {
    id: "taicang",
    name: "太仓港",
    aliases: ["太仓", "苏州港", "TICT", "浏家港"],
    automation: "official",
    badge: "官网跳转",
    status: "码头官网可查，需跳转",
    queryMode: "集装箱/船期/港区业务",
    note: "太仓港优先打开太仓国际集装箱码头官网，按箱号、提单或码头业务入口核验；页面内暂不自动代查。",
    links: [
      ["太仓国际集装箱码头", "https://tict.nbport.com.cn/TCWebSite/Home/Index"],
      ["太仓港口管理委员会", "https://www.tcport.gov.cn/tcg/gkgk/wztt.shtml"]
    ]
  },
  {
    id: "fuzhou",
    name: "福州港",
    aliases: ["福州", "江阴", "马尾", "FCT", "福港集箱"],
    automation: "official",
    badge: "官网跳转",
    status: "码头官网/平台核验",
    queryMode: "集装箱/船期/港区业务",
    note: "福州港集装箱业务建议先确认江阴、马尾等具体港区，再打开福港集箱或码头入口查询。",
    links: [
      ["福港集箱", "https://fct.fzport.com/"]
    ]
  },
  {
    id: "quanzhou",
    name: "泉州港/石湖",
    aliases: ["泉州", "石湖", "后渚", "秀涂", "石井"],
    automation: "official",
    badge: "官网/监管入口",
    status: "先确认码头，通常需人工核验",
    queryMode: "箱号/船司轨迹/码头业务",
    note: "泉州港需先确认石湖、后渚等具体港区；公开网页多为港口介绍和监管信息，箱货状态建议用船司轨迹或联系码头/货代。",
    links: [
      ["福建省泉州港口发展中心", "https://jtyst.fujian.gov.cn/qzg/gkgk/gkjs/"],
      ["船公司轨迹入口", "https://elines.coscoshipping.com/ebusiness/cargoTracking"]
    ]
  },
  {
    id: "shandong-east",
    name: "烟台/日照/威海",
    aliases: ["烟台", "日照", "威海", "龙口", "石臼", "岚山", "芝罘"],
    automation: "official",
    badge: "港口集团/码头跳转",
    status: "山东港口体系，按具体码头核验",
    queryMode: "箱号/提单/云港通/码头业务",
    note: "山东港口体系下烟台、日照、威海等口岸要先确认具体码头；烟台可用烟台国际集装箱码头，日照常需云港通/港口平台或船司轨迹。",
    links: [
      ["山东省港口集团", "https://www.sd-port.com/"],
      ["烟台国际集装箱码头", "https://www.ictsiyantai.com/index.html"],
      ["船公司轨迹入口", "https://elines.coscoshipping.com/ebusiness/cargoTracking"]
    ]
  },
  {
    id: "yingkou",
    name: "营口/鲅鱼圈",
    aliases: ["营口", "鲅鱼圈", "仙人岛", "盘锦", "辽港"],
    automation: "official",
    badge: "港口集团/船司跳转",
    status: "辽宁港口体系，需跳转",
    queryMode: "箱号/码头/船司轨迹",
    note: "营口口岸属于辽宁港口体系，需先确认营口港区、鲅鱼圈、仙人岛等具体港区和船司挂靠，再用港口集团或船司入口核验。",
    links: [
      ["辽宁港口集团", "https://www.liaoningport.com/"],
      ["船公司轨迹入口", "https://elines.coscoshipping.com/ebusiness/cargoTracking"]
    ]
  },
  {
    id: "caofeidian",
    name: "唐山/曹妃甸",
    aliases: ["唐山", "曹妃甸", "京唐", "河北港口"],
    automation: "official",
    badge: "官网跳转",
    status: "港区官网/电子口岸核验",
    queryMode: "箱号/港区业务/费用目录",
    note: "曹妃甸、京唐港区需先确认具体码头；公开入口适合核验港区业务和费用目录，箱货实时状态多需码头、船司或货代系统。",
    links: [
      ["曹妃甸港集团", "https://www.caofeidianport.com/index.htm"],
      ["河北电子口岸", "https://www.hebeieport.com/"]
    ]
  },
  {
    id: "zhanjiang",
    name: "湛江港",
    aliases: ["湛江", "霞山", "宝满", "Zhanjiang"],
    automation: "official",
    badge: "官网/船司跳转",
    status: "官网信息 + 船司轨迹",
    queryMode: "箱号/船司轨迹/港区业务",
    note: "湛江港可先打开港口集团官网确认业务入口；具体箱货状态建议同时用船司轨迹或联系码头/货代。",
    links: [
      ["湛江港集团", "https://www.zjport.com/"],
      ["船公司轨迹入口", "https://elines.coscoshipping.com/ebusiness/cargoTracking"]
    ]
  },
  {
    id: "wenzhou-taizhou",
    name: "温州/台州",
    aliases: ["温州", "状元岙", "乐清湾", "台州", "大麦屿", "健跳"],
    automation: "official",
    badge: "官网/船司跳转",
    status: "支线港，按码头/船司核验",
    queryMode: "箱号/船司轨迹/港区业务",
    note: "温州、台州以支线和区域港区为主，页面内不自动代查；建议先确认具体码头，再用港口、船司或货代系统核验。",
    links: [
      ["温州港集团", "https://www.wzport.com/"],
      ["浙江海事局", "https://www.zj.msa.gov.cn/"],
      ["船公司轨迹入口", "https://elines.coscoshipping.com/ebusiness/cargoTracking"]
    ]
  },
  {
    id: "zhuhai-shantou",
    name: "珠海/汕头",
    aliases: ["珠海", "高栏", "洪湾", "汕头", "广澳", "珠池"],
    automation: "official",
    badge: "官网/船司跳转",
    status: "先确认码头，需人工核验",
    queryMode: "箱号/码头/船司轨迹",
    note: "珠海高栏、洪湾以及汕头广澳、珠池等港区需先确认具体码头；公开入口不足时按船司轨迹或码头/货代系统查询。",
    links: [
      ["招商局港口", "https://www.cmport.com.hk/"],
      ["船公司轨迹入口", "https://elines.coscoshipping.com/ebusiness/cargoTracking"]
    ]
  },
  {
    id: "generic",
    name: "其他中国口岸",
    aliases: ["锦州", "秦皇岛", "黄骅", "南通", "镇江", "泰州", "嘉兴", "义乌", "海口", "三亚", "洋浦"],
    automation: "official",
    badge: "人工跳转",
    status: "先确认码头/船司",
    queryMode: "按具体码头/船司",
    note: "先确认具体口岸、码头、船司和箱号/提单号，再打开对应官网或船司轨迹页面；不要用城市名代替码头状态。",
    links: [
      ["港航纵横", "https://www.hb56.com/Index.aspx"],
      ["COSCO Cargo Tracking", "https://elines.coscoshipping.com/ebusiness/cargoTracking"],
      ["Maersk Tracking", "https://www.maersk.com/tracking/"]
    ]
  }
];

function customsPortById(id = "") {
  return customsPortGateways.find((port) => port.id === id) || customsPortGateways[0];
}

function inferCustomsPortProfile(value = "") {
  const text = normalize(value);
  if (!text) return customsPortById($("customsPortSelect")?.value || "shanghai");
  return customsPortGateways.find((port) =>
    normalize(port.name).includes(text) ||
    text.includes(normalize(port.name)) ||
    (port.aliases || []).some((alias) => {
      const aliasText = normalize(alias);
      return aliasText && (text.includes(aliasText) || aliasText.includes(text));
    })
  ) || customsPortById($("customsPortSelect")?.value || "generic");
}

function populateCustomsPortSelect() {
  const select = $("customsPortSelect");
  if (!select || select.children.length) return;
  select.innerHTML = customsPortGateways
    .map((port) => `<option value="${escapeHtml(port.id)}">${escapeHtml(port.name)}</option>`)
    .join("");
}

function renderCustomsPortMatrix(activeId = "") {
  const target = $("customsPortMatrix");
  if (!target) return;
  const active = activeId || $("customsPortSelect")?.value || "shanghai";
  target.innerHTML = customsPortGateways.map((port) => `
    <button type="button" class="customs-port-card ${port.id === active ? "active" : ""}" data-customs-port-id="${escapeHtml(port.id)}">
      <span>${escapeHtml(port.badge)}</span>
      <strong>${escapeHtml(port.name)}</strong>
      <p>${escapeHtml(port.status)}</p>
      <small>${escapeHtml(port.queryMode)}</small>
    </button>
  `).join("");
}

function customsLinksHtml(profile) {
  return (profile.links || [])
    .map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`)
    .join("");
}

function showCustomsOfficialGateway(payload = {}, profile = customsPortGateways[0], reason = "") {
  const links = profile.links?.length ? profile.links : customsPortGateways.find((item) => item.id === "generic").links;
  recordQueryFailure({
    module: "箱货/放行",
    query: [payload.container && `箱号 ${payload.container}`, payload.bl && `提单 ${payload.bl}`, profile.name].filter(Boolean).join(" / "),
    reason,
    links
  });
  renderBrowserScriptResult("customsScriptResult", {
    ok: false,
    code: "OFFICIAL_SITE_REQUIRED",
    source: profile.name,
    message: `${profile.name} 暂不支持页面内自动查询，请打开官方入口按 ${profile.queryMode} 核验。`,
    sourceLinks: (links || []).map(([name, url]) => ({ name, url }))
  }, payload);
  $("customsStatus").textContent = `${profile.name} 需要跳转官方入口`;
  openResultDialog(
    `${profile.name} 需要去官网核验`,
    "Customs / Manifest",
    buildFailureDialogHtml({
      intro: "这个口岸目前不做页面内自动代查，避免误读验证码、登录系统或码头专属状态。请打开官方入口按原网站结果截图留存。",
      reason: reason || profile.note,
      fields: [["箱号", payload.container || "未填写"], ["提单号", payload.bl || "未填写"], ["口岸/港区", profile.name]],
      links,
      next: [
        `打开 ${profile.name} 官方入口，按 ${profile.queryMode} 查询。`,
        "若官网要求登录、公众号、小程序或验证码，由查询人自己完成验证。",
        "查到后保存官网截图和查询时间；如显示查验、扣留、不可提、未放行，升级给关务/货代确认。"
      ]
    })
  );
}

loadShippingSources();

async function queryCustoms(event) {
  event.preventDefault();
  const bl = $("blNo").value || "未填写提单号";
  const container = $("containerNo").value || "未填写箱号";
  const direction = $("customsDirection").value;
  const profile = inferCustomsPortProfile($("customsCode")?.value || $("customsPortSelect")?.selectedOptions?.[0]?.textContent || "");
  const customsCode = $("customsCode").value || profile.name || "未填写关区/口岸";
  if ($("customsPortSelect")) $("customsPortSelect").value = profile.id;
  renderCustomsPortMatrix(profile.id);
  $("customsStatus").textContent = "正在自动查询箱货/放行状态";
  renderCustomsAdvice(bl, container, direction, customsCode, profile);
  const payload = {
    source: profile.automation === "sipg" ? "sipg" : "manual",
    container: container === "未填写箱号" ? "" : container,
    bl: bl === "未填写提单号" ? "" : bl,
    destination: customsCode
  };
  if (!payload.container && !payload.bl) {
    renderBrowserScriptResult("customsScriptResult", { ok: false, code: "CUSTOMS_QUERY_EMPTY", message: "请输入集装箱号或提单号。" }, payload);
    $("customsStatus").textContent = "请先输入箱号或提单号";
    showCustomsFallbackDialog(payload, "请输入集装箱号或提单号后再查。");
    return;
  }
  if (profile.automation !== "sipg") {
    showCustomsOfficialGateway(payload, profile, profile.note);
    return;
  }
  showQueryOverlay("正在查询箱货/放行状态", "系统会先查上港集团，失败后自动尝试港航纵横；遇到验证码会直接说明原因。", "Customs Script");
  try {
    let data = await fetchShippingBrowserQuery("sipg", payload);
    if (!data.ok) {
      const hb56 = await fetchShippingBrowserQuery("hb56", { ...payload, source: "hb56" });
      data = hb56.ok ? hb56 : { ...data, fallbackTried: hb56 };
    }
    renderBrowserScriptResult("customsScriptResult", data, payload);
    $("customsStatus").textContent = data.ok ? "已返回箱货查询结果" : "自动查询未取得结果 · 请看失败原因";
    if (data.ok && data.result?.rawText && $("customsManualPaste")) {
      $("customsManualPaste").value = data.result.rawText;
      summarizeCustomsManualResult();
    } else if (!data.ok) {
      showCustomsFallbackDialog(payload, data.message || data.code || "上港/港航网页没有返回可用箱货状态。");
    }
  } catch (error) {
    renderBrowserScriptResult("customsScriptResult", { ok: false, code: "CUSTOMS_SCRIPT_ERROR", message: error.message || "箱货脚本查询失败。" }, payload);
    $("customsStatus").textContent = "自动查询失败";
    showCustomsFallbackDialog(payload, error.message || "箱货脚本查询失败。");
  } finally {
    hideQueryOverlay();
  }
}

function showCustomsFallbackDialog(payload = {}, reason = "") {
  const links = [
    ["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index"],
    ["港航纵横", "https://www.hb56.com/Index.aspx"],
    ["COSCO Cargo Tracking", "https://elines.coscoshipping.com/ebusiness/cargoTracking"],
    ["Maersk Tracking", "https://www.maersk.com/tracking/"]
  ];
  recordQueryFailure({
    module: "箱货/放行",
    query: [payload.container && `箱号 ${payload.container}`, payload.bl && `提单 ${payload.bl}`, payload.destination || "上海港"].filter(Boolean).join(" / "),
    reason,
    links
  });
  openResultDialog(
    "箱货/放行状态暂未查到",
    "Customs / Manifest",
    buildFailureDialogHtml({
      intro: "自动查询没有拿到可用放行结果，可能是验证码、登录、网站限制或字段不完整。平台不会编造放行状态。",
      reason,
      fields: [["箱号", payload.container || "未填写"], ["提单号", payload.bl || "未填写"], ["口岸/港区", payload.destination || "上海港"]],
      links,
      next: [
        "优先打开上港集团箱货查询；如有滑块/验证码，由查询人自己完成。",
        "如果上港查不到，再用港航纵横或对应船司官网按箱号/提单号核验。",
        "查到原网站结果后，请截图保存查询时间；若显示查验、未放行、扣留或不可提，升级给关务/货代确认。"
      ]
    })
  );
}

function renderCustomsAdvice(bl = "未填写提单号", container = "未填写箱号", direction = "进口 Import", customsCode = "未填写关区/口岸", profile = null) {
  const directionNote = direction.includes("出口")
    ? "出口场景建议同时确认订舱、截关、舱单发送、放行和装船节点。"
    : "进口场景建议同时确认到港、舱单、换单、申报、查验和放行节点。";
  const sipgKeyword = container !== "未填写箱号" ? container : bl;
  const sipgMode = container !== "未填写箱号" ? "按箱号查询" : "按单号查询";
  const portProfile = profile || inferCustomsPortProfile(customsCode);
  const canAuto = portProfile.automation === "sipg";
  $("customsAdvice").classList.remove("hidden");
  $("customsAdvice").innerHTML = `
    ${renderResultBrief({
      className: "customs-result-brief",
      kicker: "Customs Brief",
      title: `${portProfile.name} · ${direction}`,
      conclusion: canAuto ? "可先在页面内尝试自动查询；遇到验证码、登录或无结果时，改由人工打开官方入口核验。" : "该口岸暂不做页面内自动代查，需跳转官方入口或船司/码头系统核验。",
      risk: "海关放行、码头放行、船司放货不是同一个状态；任一环节未完成都不能承诺可提/可装。",
      cost: "通关结果本身不等于费用结清；仍需确认换单/放箱、港杂、堆存、查验、免堆期和提柜预约。",
      action: canAuto ? `优先按 ${sipgMode} 输入 ${sipgKeyword}；查到后保存官网截图和查询时间。` : `打开 ${portProfile.name} 官方入口，按 ${portProfile.queryMode || "箱号/提单号"} 查询并截图留存。`,
      source: `${portProfile.status || "官方入口核验"}；更新时间按当前查询页面。`,
      links: portProfile.links || []
    })}
    <strong>建议查询路径</strong>
    <p>${escapeHtml(directionNote)}</p>
    <ul>
      <li>B/L No.: ${escapeHtml(bl)}</li>
      <li>Container No.: ${escapeHtml(container)}</li>
      <li>Customs / Port: ${escapeHtml(customsCode)} · ${escapeHtml(portProfile.status || "")}</li>
      <li>${canAuto ? `上海港放行：系统会尝试上港集团箱货查询，输入 ${escapeHtml(sipgKeyword)}，选择“${escapeHtml(sipgMode)}”。如出现滑动验证，由人工完成。` : `${escapeHtml(portProfile.name)}：页面内暂不自动代查，请打开官方入口按 ${escapeHtml(portProfile.queryMode || "箱号/提单号")} 查询。`}</li>
      <li>重点字段：海关放行、码头放行、理货、换单、授权、放箱、是否交单、查验指令、出场时间。</li>
      <li>当前页面不保存到服务器；正式版如接入单一窗口或报关行系统，需要账号权限和后端接口。</li>
    </ul>
    <div class="source-chip-grid">${customsLinksHtml(portProfile)}</div>
  `;
}

const airCarrierProfiles = {
  dhl: {
    name: "DHL Express",
    url: "https://www.dhl.com/global-en/home/tracking.html",
    pattern: /^(?:\d{10}|\d{11}|JD\d+)/i,
    note: "DHL 官网一般需要运单号查询；个别国家/地区页面可能要求验证码或跳转本地站点。"
  },
  ups: {
    name: "UPS",
    url: "https://www.ups.com/track",
    pattern: /^1Z[0-9A-Z]{16}$/i,
    note: "UPS 单号常见为 1Z 开头 18 位；官网状态是最权威来源。"
  },
  fedex: {
    name: "FedEx",
    url: "https://www.fedex.com/fedextrack/",
    pattern: /^\d{12,15}$/i,
    note: "FedEx 常见 12-15 位数字；不同服务可能需要到官网选择追踪类型。"
  },
  sf: {
    name: "顺丰 SF",
    url: "https://www.sf-express.com/",
    pattern: /^(?:SF)?\d{10,15}$/i,
    note: "顺丰国际/国内件可能要求手机号、验证码或登录 APP；以顺丰官方页面/APP 为准。"
  },
  other: {
    name: "其他/不确定",
    url: "https://www.17track.net/",
    pattern: /.*/,
    note: "无法识别承运商时，先问寄件方确认渠道，再用官网或综合查询站做初筛。"
  }
};

function detectAirCarrier(number = "", selected = "auto") {
  const clean = String(number || "").replace(/\s+/g, "").toUpperCase();
  if (selected && selected !== "auto" && airCarrierProfiles[selected]) return { id: selected, clean, ...airCarrierProfiles[selected] };
  const hit = Object.entries(airCarrierProfiles).find(([id, profile]) => id !== "other" && profile.pattern.test(clean));
  const [id, profile] = hit || ["other", airCarrierProfiles.other];
  return { id, clean, ...profile };
}

function buildAirTrackingLinks(carrier = {}, number = "") {
  const encoded = encodeURIComponent(number || "");
  const links = {
    dhl: [["DHL 官方追踪", carrier.url], ["DHL Express Tracking", `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${encoded}`]],
    ups: [["UPS 官方追踪", carrier.url], ["UPS Tracking 号码入口", `https://www.ups.com/track?tracknum=${encoded}`]],
    fedex: [["FedEx 官方追踪", carrier.url], ["FedEx Tracking 号码入口", `https://www.fedex.com/fedextrack/?trknbr=${encoded}`]],
    sf: [["顺丰官网/APP", carrier.url], ["顺丰国际", "https://intl.sf-express.com/"]],
    other: [["承运商官网优先", carrier.url], ["17TRACK 辅助初筛", `https://www.17track.net/en/track?nums=${encoded}`]]
  };
  return links[carrier.id] || links.other;
}

function buildAirRiskChecklist(product = "", destination = "") {
  const text = normalize(`${product} ${destination}`);
  const battery = /锂|电池|battery|充电盒|power bank|移动电源/i.test(text);
  const magnetic = /磁|喇叭|扬声器|speaker|magnet/i.test(text);
  const wireless = /蓝牙|无线|wifi|wi-fi|tws|headset|earbud/i.test(text);
  const sample = /样品|sample|维修|repair|返修|replacement/i.test(text);
  const rows = [
    ["发出前", "商业发票、装箱单、运单号、收发货人信息、真实品名和用途必须一致。"],
    ["到达后", "关注 Clearance delay / Held / Exception；先确认是否缺税号、授权书、付款凭证、认证或产品用途说明。"],
    ["空运和海运差异", "空运时效快但承运限制更严；海运成本低但节点多、ETA 更受港口和航线影响。"]
  ];
  if (battery) rows.unshift(["锂电池", "先确认 UN38.3、MSDS、运输危险性鉴定报告/运输条件鉴定书、Wh、PI965/966/967、SOC、包装方式和承运商是否接收。"]);
  if (magnetic) rows.push(["磁性", "喇叭、扬声器、磁铁类样品可能需要磁检/航空运输鉴定，避免被安检退运。"]);
  if (wireless) rows.push(["无线产品", "目的国可能要求 FCC/CE RED/ANATEL/NBTC/SRRC 等资料，快件清关也可能要求型号和用途说明。"]);
  if (sample) rows.push(["样品/维修件", "发票要写清用途、是否收费、是否返修；低申报或品名模糊会增加清关延误风险。"]);
  return rows;
}

function renderAirChecklist(product = "", destination = "") {
  const target = $("airChecklistGrid");
  if (!target) return;
  target.innerHTML = buildAirRiskChecklist(product, destination)
    .map(([title, text]) => `<article><span>${escapeHtml(title)}</span><strong>${escapeHtml(text)}</strong></article>`)
    .join("");
}

function airDestinationProfile(destination = "") {
  const text = normalize(destination);
  if (/brazil|brasil|巴西/.test(text)) {
    return {
      market: "巴西",
      clearance: ["收件人/进口商 CNPJ/CPF 和授权资料要提前确认。", "无线/蓝牙优先看 ANATEL；电源/插头/适配器可能涉及 INMETRO。", "商业发票、品名、用途和葡语标签/说明可能被要求补充。"],
      sources: [["Receita Federal Brazil", "https://www.gov.br/receitafederal/"], ["ANATEL", "https://www.gov.br/anatel/"], ["INMETRO", "https://www.gov.br/inmetro/"]]
    };
  }
  if (/us|usa|united states|美国/.test(text)) {
    return {
      market: "美国",
      clearance: ["收件人 IRS/EIN 或进口商信息要准确。", "无线产品看 FCC；电池/危险品按承运商和 PHMSA/FAA 规则核验。", "清关延误时常要求付款凭证、产品用途、材质和 HS 说明。"],
      sources: [["CBP", "https://www.cbp.gov/trade"], ["FCC", "https://www.fcc.gov/"], ["FAA Lithium Battery Resources", "https://www.faa.gov/hazmat/resources/lithium_batteries"]]
    };
  }
  if (/eu|europe|欧盟|欧洲|germany|france|netherlands|italy|spain|德国|法国|荷兰|意大利|西班牙/.test(text)) {
    return {
      market: "欧盟",
      clearance: ["进口商 EORI、VAT 和当地责任主体要确认。", "无线/电子产品常看 CE/RED、RoHS、REACH、电池法规、WEEE/EPR。", "标签、说明书和 DoC 语言版本可能影响客户入库。"],
      sources: [["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/"], ["European Commission Batteries", "https://environment.ec.europa.eu/topics/waste-and-recycling/batteries_en"], ["ECHA", "https://echa.europa.eu/"]]
    };
  }
  if (/thai|thailand|泰国/.test(text)) {
    return {
      market: "泰国",
      clearance: ["无线/蓝牙产品先问 NBTC 路径。", "进口商资质、发票品名和用途说明要提前给当地清关代理。", "电池和电源类产品需同步核验 TISI/承运商限制。"],
      sources: [["Thai Customs", "https://www.customs.go.th/"], ["NBTC", "https://www.nbtc.go.th/"]]
    };
  }
  if (/japan|日本/.test(text)) {
    return {
      market: "日本",
      clearance: ["无线产品看 MIC/TELEC，电源相关看 PSE 边界。", "进口商资料、日文标签/说明和客户用途说明要准备。", "样品也可能被要求说明是否销售。"],
      sources: [["Japan Customs", "https://www.customs.go.jp/english/"], ["MIC Japan", "https://www.tele.soumu.go.jp/e/"]]
    };
  }
  if (/saudi|uae|gcc|middle east|中东|沙特|阿联酋|迪拜/.test(text)) {
    return {
      market: "中东/GCC",
      clearance: ["沙特常看 SABER/SASO，阿联酋无线看 TDRA。", "进口商 CR/VAT、阿语标签、符合性证书和发票信息要提前确认。", "快件低申报或品名模糊容易被要求补资料。"],
      sources: [["SABER", "https://saber.sa/"], ["ZATCA", "https://zatca.gov.sa/"], ["Dubai Customs", "https://www.dubaicustoms.gov.ae/"]]
    };
  }
  return {
    market: destination || "目的地未填写",
    clearance: ["先确认收件人税号/进口商资质、当地认证、商业发票和产品用途说明。", "如遇 Clearance delay / Held / Exception，把官网状态截图给物流、货代和收件人确认缺什么。"],
    sources: [["IATA Cargo", "https://www.iata.org/en/programs/cargo/"], ["DHL Tracking", "https://www.dhl.com/global-en/home/tracking.html"], ["UPS Tracking", "https://www.ups.com/track"]]
  };
}

function buildAirOperationAdvice(origin = "", destination = "", product = "", mode = "快件 Courier") {
  const text = normalize(`${origin} ${destination} ${product} ${mode}`);
  const destProfile = airDestinationProfile(destination);
  const battery = /锂|电池|battery|充电盒|power bank|移动电源/i.test(text);
  const magnetic = /磁|喇叭|扬声器|speaker|magnet/i.test(text);
  const wireless = /蓝牙|无线|wifi|wi-fi|tws|headset|earbud|rf/i.test(text);
  const repair = /维修|返修|退运|replacement|repair|rma/i.test(text);
  const sample = /样品|sample/i.test(text);
  const courier = /courier|快件|dhl|ups|fedex|sf|顺丰/i.test(text);
  const riskFlags = [];
  const docs = ["商业发票：真实品名、HS、货值、原产国、用途、贸易条款。", "装箱单：件数、重量、尺寸、包装方式和型号。", courier ? "快递运单和收发件人完整信息。" : "AWB、订舱确认、交货仓库和安检资料。"];
  const departure = [];
  const arrival = [...destProfile.clearance];
  const owners = ["业务：确认客户能否配合目的国清关和税费支付。", "物流/货代：确认承运限制、安检资料和轨迹异常。", "收件人/进口商：准备税号、授权、认证和付款凭证。"];

  if (/上海|pvg|浦东|sha|shanghai|深圳|szx|广州|can|宁波|杭州|hgh/i.test(text)) {
    departure.push("中国启运：先确认出口品名、申报资料、磁检/电池文件和承运商是否收货。");
  } else {
    departure.push("启运地未明确时，先问发货仓库/货代确认当地安检、提货截止和出口申报要求。");
  }
  if (battery) {
    riskFlags.push("含电池：先按 UN3480/UN3481 或 UN3090/UN3091、PI965/966/967/968/969/970 判断。");
    docs.push("MSDS/SDS、UN38.3 Test Summary、运输危险性鉴定报告/运输条件鉴定书、电池规格书、Wh、包装方式、SOC 和外箱标签照片。");
  }
  if (magnetic) {
    riskFlags.push("磁性风险：喇叭、扬声器、磁铁或大磁路部件可能需要航空运输鉴定/磁检。");
    docs.push("磁检报告或航空运输条件鉴定书。");
  }
  if (wireless) {
    riskFlags.push("无线风险：目的国可能要求 FCC/CE RED/ANATEL/NBTC/MIC 等资料。");
    docs.push("无线型号、频段、发射功率、认证证书/测试报告或客户准入要求。");
  }
  if (repair) {
    riskFlags.push("维修/返修：发票要写清是否收费、是否返回、序列号和用途，避免被按商业销售处理。");
    docs.push("RMA/维修说明、序列号、客户说明和是否收费声明。");
  }
  if (sample) {
    riskFlags.push("样品：不要低申报或只写 sample，要写具体产品、用途和是否用于销售。");
  }

  const signalCount = [battery, magnetic, wireless, repair, sample].filter(Boolean).length;
  const confidence = Math.max(42, Math.min(92, 58 + signalCount * 8 + (destination ? 8 : 0) + (product ? 6 : 0) + (origin ? 4 : 0)));
  let opinion = "";
  if (battery && wireless) {
    opinion = `我的判断：这票不应按普通电子样品走。电池先决定承运商是否接，${destProfile.market}的无线/认证资料决定到达后会不会卡清关；先做承运商预审，再承诺时效。`;
  } else if (battery) {
    opinion = `我的判断：核心风险在启运前，不在目的港。只要电池文件、Wh、包装方式或 SOC 说不清，快件/空运就可能被拒收或改渠道。`;
  } else if (magnetic) {
    opinion = "我的判断：这票最容易在安检环节被退回。喇叭/磁性件即使不算危险品，也要先确认磁检或航空运输条件鉴定。";
  } else if (wireless) {
    opinion = `我的判断：承运可能不难，难点在 ${destProfile.market} 的准入资料。无线型号、频段、证书覆盖型号和收件人进口资质要先确认。`;
  } else if (repair) {
    opinion = "我的判断：维修/返修件的风险不是货值高低，而是用途、是否收费、是否返回和序列号说不清，被当作普通销售清关。";
  } else if (sample) {
    opinion = "我的判断：样品可以走快，但不能用“sample”替代真实品名。用途、型号、货值和是否销售要写清楚，否则清关延误概率会升高。";
  } else {
    opinion = "我的判断：目前没有命中强限制，但这只能说明输入文本风险不高；正式出运仍要让承运商按真实品名、材质、用途和目的国资料预审。";
  }

  const level = riskFlags.length >= 3 ? "高关注" : riskFlags.length ? "需预审" : "常规可查";
  const conclusion = riskFlags.length
    ? `${destProfile.market} 空运/快件初判：${level}。先补文件并让承运商预审，再承诺时效。`
    : `${destProfile.market} 空运/快件初判：常规资料齐全后可推进，但仍需收件人确认当地清关资料。`;
  return {
    level,
    conclusion,
    opinion,
    confidence,
    departure,
    docs,
    riskFlags: riskFlags.length ? riskFlags : ["未命中电池、磁性、无线、维修或样品关键词；仍需按真实产品资料复核。"],
    arrival,
    owners,
    sources: [
      ["IATA Lithium Battery Guidance", "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/"],
      ["FAA Lithium Battery Resources", "https://www.faa.gov/hazmat/resources/lithium_batteries"],
      ...destProfile.sources
    ]
  };
}

function renderAirGuideResult(data = {}) {
  const target = $("airGuideResult");
  if (!target) return;
  target.innerHTML = `
    <article class="air-guide-verdict">
      <span>${escapeHtml(data.level || "待判断")}</span>
      <strong>${escapeHtml(data.conclusion || "请先输入启运地、目的地和产品。")}</strong>
    </article>
    <article class="air-guide-opinion">
      <div>
        <span>独立判断</span>
        <strong>${escapeHtml(data.confidence ? `${data.confidence}%` : "待补资料")}</strong>
      </div>
      <p>${escapeHtml(data.opinion || "输入产品、目的国和出运方式后生成承运/清关判断。")}</p>
    </article>
    <div class="air-guide-result-grid">
      <article><span>启运前限制</span><ul>${(data.departure || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      <article><span>需要准备的材料</span><ul>${(data.docs || []).slice(0, 8).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      <article><span>产品/渠道风险</span><ul>${(data.riskFlags || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      <article><span>到达清关重点</span><ul>${(data.arrival || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      <article><span>找谁确认</span><ul>${(data.owners || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      <article><span>核验来源</span><div class="source-chip-grid">${(data.sources || []).map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}</div></article>
    </div>
  `;
}

function evaluateAirGuide(event) {
  event?.preventDefault();
  const origin = $("airGuideOrigin")?.value || "";
  const destination = $("airGuideDestination")?.value || "";
  const product = $("airGuideProduct")?.value || "";
  const mode = $("airGuideMode")?.value || "快件 Courier";
  const data = buildAirOperationAdvice(origin, destination, product, mode);
  renderAirGuideResult(data);
  renderAirChecklist(product, destination);
  if (event?.type === "submit") {
    openResultDialog("空运出运/到达注意", `${destination || "目的地"} · ${mode}`, $("airGuideResult")?.innerHTML || "");
  }
}

function loadAirGuideExample() {
  $("airGuideOrigin").value = "上海 / PVG";
  $("airGuideDestination").value = "巴西";
  $("airGuideProduct").value = "蓝牙耳机样品，内置锂电池，带充电盒";
  $("airGuideMode").value = "快件 Courier";
  evaluateAirGuide(new Event("change"));
}

function renderAirTrackingCards(data = {}, product = "", destination = "") {
  const links = Array.isArray(data.links) && data.links.length ? data.links : buildAirTrackingLinks(detectAirCarrier(data.trackingNo || "", data.carrier?.id || "auto"), data.trackingNo || "");
  const riskRows = buildAirRiskChecklist(product, destination).slice(0, 4);
  const judgement = data.judgement && typeof data.judgement === "object" ? data.judgement : null;
  $("airTrackingResult").innerHTML = `
    <article class="air-result-card primary ${data.ok ? "success" : ""}">
      <span>${data.ok ? "当前状态" : "未取得实时状态"}</span>
      <strong>${escapeHtml(data.ok ? data.status || "官网返回状态" : data.statusLevel || "需要官网人工核验")}</strong>
      <p>${escapeHtml(data.message || "正式仍以承运商官网页面显示为准。")}</p>
      <div class="manual-field-grid">
        <div><span>承运商</span><b>${escapeHtml(data.carrier?.name || "未识别")}</b></div>
        <div><span>运单号</span><b>${escapeHtml(data.trackingNo || "未填写")}</b></div>
        <div><span>查询时间</span><b>${escapeHtml(formatEta(data.queriedAt || new Date().toISOString()))}</b></div>
        <div><span>风险等级</span><b>${escapeHtml(data.statusLevel || "待判断")}</b></div>
      </div>
      <div class="source-chip-grid">
        ${links.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
      </div>
    </article>
    ${
      judgement
        ? `<article class="air-result-card">
            <span>独立判断</span>
            <strong>${escapeHtml(judgement.label || "待判断")} · ${escapeHtml(String(judgement.score || 0))}/100</strong>
            <p>${escapeHtml(judgement.opinion || "需要结合官网完整页面和产品资料判断。")}</p>
            <div class="manual-field-grid">
              ${(judgement.evidence || []).map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join("")}
            </div>
            <ul>${(judgement.actions || []).slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </article>`
        : ""
    }
    <article class="air-result-card">
      <span>状态解释</span>
      <strong>${escapeHtml(data.ok ? "请同步看官网更新时间" : "官网可能需要验证码/动态接口")}</strong>
      <p>${escapeHtml(data.ok ? "如果状态是 Clearance delay / Exception / Held，先截图官网状态，再找快递客服、货代或收件人确认缺什么资料。" : "自动查询失败时，不代表货物异常；只是平台没能读到官网实时内容。请打开官方链接继续核验。")}</p>
    </article>
    <article class="air-result-card checklist">
      <span>产品相关风险</span>
      <strong>${escapeHtml(product || "未填写产品")}</strong>
      <ul>${riskRows.map(([title, text]) => `<li><b>${escapeHtml(title)}：</b>${escapeHtml(text)}</li>`).join("")}</ul>
    </article>
  `;
}

async function queryAirTracking(event) {
  event?.preventDefault();
  const number = $("airTrackingNo")?.value || "";
  const selected = $("airCarrier")?.value || "auto";
  const product = $("airProduct")?.value || "";
  const destination = $("airDestination")?.value || "";
  const carrier = detectAirCarrier(number, selected);
  const links = buildAirTrackingLinks(carrier, carrier.clean);
  renderAirChecklist(product, destination);
  if (!carrier.clean) {
    $("airTrackingResult").innerHTML = `
      <article class="air-result-card warning">
        <span>等待输入</span>
        <strong>请输入快件/空运单号</strong>
        <p>输入后系统会识别承运商并给出官网查询入口。平台不会编造轨迹状态。</p>
      </article>
    `;
    return;
  }
  $("airTrackingResult").innerHTML = `
    <article class="air-result-card warning">
      <span>正在查询</span>
      <strong>${escapeHtml(carrier.name)} · ${escapeHtml(carrier.clean)}</strong>
      <p>正在尝试读取承运商官网公开追踪页面；如果官网需要验证码或动态接口，会显示失败原因。</p>
    </article>
  `;
  showQueryOverlay("正在查询空运/快件状态", `${carrier.name} / ${carrier.clean}。正在尝试读取官方追踪页面。`, "Air Tracking");
  try {
    const params = new URLSearchParams({ number: carrier.clean, carrier: selected, product, destination });
    const data = await fetchJsonOrFallback(`/.netlify/functions/air-tracking?${params.toString()}`, {
      ok: false,
      code: "LOCAL_FILE_MODE",
      message: "本地文件模式不能请求后端，已显示官网入口。",
      carrier: { id: carrier.id, name: carrier.name },
      trackingNo: carrier.clean,
      links,
      queriedAt: new Date().toISOString()
    });
    renderAirTrackingCards(data, product, destination);
    if (!data.ok) {
      recordQueryFailure({
        module: "空运/快件",
        query: `${data.carrier?.name || carrier.name} / ${carrier.clean}${destination ? ` / ${destination}` : ""}`,
        reason: data.message || "未取得承运商官网实时状态。",
        links: data.links || links
      });
      openResultDialog(
        "快件/空运状态暂未查到",
        data.carrier?.name || carrier.name,
        buildFailureDialogHtml({
          intro: "后端没有拿到承运商官网的可解析实时状态，平台不会编造轨迹。",
          reason: data.message || "官网可能需要验证码、登录、本地站点跳转或动态接口。",
          fields: [["承运商", data.carrier?.name || carrier.name], ["运单号", carrier.clean], ["目的地", destination || "未填写"]],
          links: data.links || links,
          next: ["打开官网后查看最新状态和更新时间。", "如果出现清关延误，把官网截图发给物流/货代/收件人确认缺少的文件。", "如公司需要平台内稳定直接返回状态，下一步要申请 DHL/UPS/FedEx/SF 官方 API 或账号授权。"]
        })
      );
    }
  } catch (error) {
    const data = {
      ok: false,
      message: error.message || "空运状态查询失败。",
      carrier: { id: carrier.id, name: carrier.name },
      trackingNo: carrier.clean,
      links,
      queriedAt: new Date().toISOString()
    };
    renderAirTrackingCards(data, product, destination);
    recordQueryFailure({
      module: "空运/快件",
      query: `${carrier.name} / ${carrier.clean}${destination ? ` / ${destination}` : ""}`,
      reason: data.message,
      links
    });
    openResultDialog(
      "快件/空运状态暂未查到",
      carrier.name,
      buildFailureDialogHtml({
        intro: "查询接口请求失败，平台不会编造轨迹。",
        reason: data.message,
        fields: [["承运商", carrier.name], ["运单号", carrier.clean], ["目的地", destination || "未填写"]],
        links,
        next: ["打开承运商官网继续核验。", "保存官网截图和查询时间，便于异常升级。"]
      })
    );
  } finally {
    hideQueryOverlay();
  }
}

function loadAirExample() {
  $("airTrackingNo").value = "1Z9999999999999999";
  $("airCarrier").value = "auto";
  $("airProduct").value = "蓝牙耳机样品，内置锂电池，带充电盒";
  $("airDestination").value = "美国";
  renderAirChecklist($("airProduct").value, $("airDestination").value);
}

function summarizeCustomsManualResult() {
  const text = $("customsManualPaste")?.value || "";
  const target = $("customsManualSummary");
  if (!target) return;
  if (!text.trim()) {
    target.innerHTML = `<article class="alert-card muted"><strong>暂无内容</strong><p>请先粘贴上港集团、港航纵横、船司或报关行系统的查询结果。</p></article>`;
    return;
  }
  const cleanText = text.replace(/\s+/g, " ").trim();
  const statusWords = [
    ["海关放行", /海关放行|customs released|customs release/i],
    ["码头放行", /码头放行|terminal released|港区放行/i],
    ["可提", /可提|可提货|ready for pickup|available for pickup/i],
    ["查验/布控", /查验|布控|inspection|hold|exam/i],
    ["未放行", /未放行|未可提|not released|not available/i],
    ["已申报", /已申报|declaration submitted|申报成功/i],
    ["换单/放箱", /换单|放箱|do released|delivery order/i]
  ];
  const hits = statusWords.filter(([, pattern]) => pattern.test(cleanText)).map(([label]) => label);
  const risky = /未放行|查验|布控|扣留|hold|inspection|not released|异常|改单|舱单不符/i.test(cleanText);
  const container = pickManualMatch(cleanText, [/(?:箱号|Container)[:：]?\s*([A-Z]{4}\d{7})/i]) || $("containerNo")?.value || "未识别";
  const bl = pickManualMatch(cleanText, [/(?:提单号|B\/L|BL)[:：]?\s*([A-Z0-9-]{6,})/i]) || $("blNo")?.value || "未识别";
  target.innerHTML = `
    <article class="manual-summary-card customs-summary-card">
      <strong>${risky ? "放行结论：存在异常/待确认节点" : "放行结论：未看到明显异常词"}</strong>
      <div class="manual-field-grid">
        <div><span>提单号</span><b>${escapeHtml(bl)}</b></div>
        <div><span>箱号</span><b>${escapeHtml(container)}</b></div>
        <div><span>识别状态</span><b>${escapeHtml(hits.join("、") || "未识别关键状态")}</b></div>
        <div><span>下一步</span><b>${risky ? "找报关行/货代/码头确认" : "保存截图并复核可提条件"}</b></div>
      </div>
      <ul>
        <li>${risky ? "先不要承诺可提货，确认海关、码头、船司三方是否都放行。" : "即使未见异常，也要确认免堆期、换单/放箱、提柜预约和费用是否完成。"}</li>
        <li>把原网站截图、查询时间、箱号/提单号一起保存，方便后续异常复盘。</li>
      </ul>
    </article>
  `;
}

async function loadTrends(keyword = "", showOverlay = false) {
  const cleanedKeyword = String(keyword || "").trim();
  $("trendStatus").textContent = cleanedKeyword ? `正在搜索：${cleanedKeyword}` : "正在加载过去一周公开新闻...";
  if (showOverlay) {
    showQueryOverlay("正在刷新全球趋势", cleanedKeyword ? `关键词：${cleanedKeyword}。正在生成中文摘要和业务影响。` : "正在更新热点榜、趋势摘要和风险方向。", "Global Briefing");
  }
  try {
    const params = new URLSearchParams();
    if (cleanedKeyword) params.set("keyword", cleanedKeyword);
    params.set("_t", String(Date.now()));
    const url = `/.netlify/functions/global-trends${params.toString() ? `?${params.toString()}` : ""}`;
    const data = await fetchJsonOrFallback(url, fallbackTrends("实时趋势接口响应较慢，先显示本地观察结论。", cleanedKeyword), { timeoutMs: 12000 });
    renderTrends(data);
    if (cleanedKeyword) addHistory("趋势查询", cleanedKeyword, data.summary || "已生成趋势摘要");
  } catch (error) {
    renderTrends(fallbackTrends(error.message, cleanedKeyword));
  } finally {
    if (showOverlay) hideQueryOverlay();
  }
}

function fallbackTrends(message = "", keyword = "") {
  const keywordText = keyword ? `“${keyword}”` : "全球宏观";
  const fallbackItemsForTrend = [
    {
      title: keyword ? `${keywordText}趋势观察` : "全球趋势观察",
      domain: "Manual checklist",
      sourceCountry: "Global",
      url: "https://www.reuters.com/markets/",
      seendate: "",
      takeaway: keyword
        ? `先检查${keywordText}是否会影响价格、船期、清关文件、目的国准入或客户交付承诺。`
        : "关注利率、汇率、能源、贸易政策、地缘风险和供应链新闻；页面会把信号拆成成本、时效、舱位、清关和港口作业。"
    }
  ];
  return {
    ok: false,
    fallback: true,
    source: "Manual trend watch",
    updatedAt: new Date().toISOString(),
    message,
    keyword,
    summary: keyword
      ? `暂时没有拿到${keywordText}的实时搜索结果。建议先看固定来源，并用更宽泛的关键词再试。`
      : "重点关注利率、汇率、能源、贸易政策、地缘风险和供应链变化；这些会影响成本、交期和清关不确定性。",
    insights: buildTrendInsightCards(fallbackItemsForTrend, [], keyword),
    items: fallbackItemsForTrend
  };
}

function buildTrendInsightCards(items = [], indicators = [], keyword = "") {
  const text = items.map((item) => `${item.title} ${item.category || ""} ${item.takeawayZh || item.takeaway || ""}`).join(" ").toLowerCase();
  const cards = [
    {
      title: "贸易/海关",
      signal: /tariff|customs|sanction|export|import|trade|关税|海关|制裁|进出口|贸易/.test(text)
        ? "有贸易或监管相关信号"
        : "暂未看到明显新信号",
      impact: "关注税率、监管证件、目的国准入、出口限制和清关资料是否变化。"
    },
    {
      title: "物流/港口",
      signal: /shipping|port|freight|supply chain|logistics|vessel|air cargo|express|courier|dhl|ups|fedex|sf express|船|港口|物流|供应链|空运|快件|快递|航空货运|红海|suez/.test(text)
        ? "有船期或供应链相关信号"
        : "暂未看到明显新信号",
      impact: "关注 ETA、绕航、港口拥堵、空运舱位、快件清关、承运限制和交付承诺是否需要调整。"
    },
    {
      title: "空运/快件",
      signal: /air cargo|airfreight|express|courier|iata|icao|dhl|ups|fedex|sf express|lithium battery|dangerous goods|空运|航空货运|快件|快递|锂电池|危险品/.test(text)
        ? "有空运、快件或危险品相关信号"
        : "暂未看到明显新信号",
      impact: "关注锂电池/磁性/DG 限制、承运商拒收、目的国快件清关、燃油附加费和机场拥堵。"
    },
    {
      title: "金融/成本",
      signal: /rate|inflation|currency|market|oil|central bank|汇率|利率|通胀|金融|油价/.test(text) || indicators.length
        ? "有金融或成本相关信号"
        : "暂未看到明显新信号",
      impact: "关注汇率、利率、能源、运费和付款风险对报价和采购成本的影响。"
    },
    {
      title: "政治/地缘",
      signal: /election|war|conflict|geopolitics|政治|选举|冲突|地缘/.test(text)
        ? "有地缘或政策不确定性信号"
        : "暂未看到明显新信号",
      impact: "关注制裁、出口管制、突发事件和客户所在市场需求变化。"
    }
  ];
  if (keyword) cards.unshift({ title: "本次关键词", signal: keyword, impact: "下面结论已按这个关键词优先筛选，结果不足时建议换更宽的词再查。" });
  return cards;
}

function buildTrendHotspots(items = []) {
  const groups = [
    ["关税/海关", /tariff|customs|duty|trade remedy|关税|海关|清关|贸易救济/i],
    ["航运/港口", /shipping|vessel|port|freight|supply chain|航运|船期|港口|物流|运费|供应链/i],
    ["地缘/安全", /war|conflict|military|sanction|election|geopolitics|战争|冲突|军演|制裁|选举|地缘/i],
    ["金融/成本", /rate|inflation|currency|oil|market|fed|central bank|利率|汇率|通胀|油价|金融/i],
    ["认证/产品", /battery|lithium|fcc|ce|rohs|reach|safety|电池|锂|认证|标准|召回/i]
  ];
  const textRows = items.map((item) => `${item.title || ""} ${item.category || ""} ${item.takeawayZh || item.takeaway || ""}`);
  return groups
    .map(([name, pattern]) => {
      const hits = textRows.filter((text) => pattern.test(text));
      return {
        name,
        count: hits.length,
        conclusion: hits.length >= 3 ? "高关注" : hits.length ? "有信号" : "暂未突出"
      };
    })
    .sort((a, b) => b.count - a.count);
}

function logisticsImpactForTrend(item = {}) {
  const text = normalize([item.title, item.category, item.takeawayZh, item.takeaway, item.domain].join(" "));
  const cost = /rate|currency|oil|fuel|freight|tariff|duty|inflation|运费|油价|燃油|汇率|关税|通胀|成本|价格/.test(text)
    ? "可能影响报价、燃油/运费或税费预算"
    : "暂无明显成本信号";
  const timing = /delay|congestion|strike|weather|war|conflict|port|suez|panama|延误|拥堵|罢工|天气|冲突|绕航|港口|运河/.test(text)
    ? "可能影响 ETA、截关、靠泊或派送承诺"
    : "暂无明显时效信号";
  const capacity = /capacity|blank sailing|air cargo|space|demand|supply|舱位|空运|航班|运力|甩柜|爆舱|需求/.test(text)
    ? "关注舱位、航班/航线和旺季订舱难度"
    : "暂无明显舱位信号";
  const customs = /customs|tariff|sanction|export control|certification|cbp|ustr|海关|清关|制裁|出口管制|认证|监管|关税/.test(text)
    ? "可能影响申报资料、税费、认证或目的国准入"
    : "暂无明显清关信号";
  const portOps = /port|terminal|container|dg|dangerous|reefer|battery|strike|港口|码头|集装箱|危险品|冷箱|电池|查验/.test(text)
    ? "关注码头作业、DG/冷箱接收、查验和提还箱窗口"
    : "暂无明显港口作业信号";
  return [
    ["成本", cost],
    ["时效", timing],
    ["舱位", capacity],
    ["清关", customs],
    ["港口作业", portOps]
  ];
}

const globalHotspotTopics = [
  ["关税与贸易救济", "看进口国是否新增关税、反倾销/反补贴、301/232 或报复性措施；影响报价和原产地判断。", "关务/财务", "https://www.wto.org/"],
  ["美国 CBP / USTR", "美国方向重点看 CBP 执法、USTR 301、HTS、原产地标识和 Forced Labor 相关风险。", "关务/合规", "https://www.cbp.gov/trade"],
  ["欧盟电池法规", "含电池产品关注电池法规、回收责任、标签、CE/RED/RoHS/REACH 是否同步影响客户资料。", "认证/质量", "https://environment.ec.europa.eu/topics/waste-and-recycling/batteries_en"],
  ["无线认证", "蓝牙、Wi-Fi、遥控器等产品要按市场看 FCC、CE RED、ANATEL、NBTC、SRRC、SABER 等。", "认证负责人", "https://www.fcc.gov/"],
  ["锂电池运输", "关注 IATA/IMDG、UN38.3、MSDS、SOC、UN3480/3481、船司/航司接受规则。", "物流/DG", "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/"],
  ["空运/快件清关", "UPS、DHL、FedEx、SF 等快件关注官网状态、清关延误、收件人税号、进口商资料和承运商限制。", "物流/业务", "https://www.dhl.com/global-en/home/tracking.html"],
  ["航空货运市场", "空运舱位、燃油附加费、机场拥堵和危险品数字化会影响急单成本、样品交期和承运限制。", "物流/计划", "https://www.iata.org/en/programs/cargo/"],
  ["港口拥堵", "看上海、宁波、盐田、洛杉矶、鹿特丹、新加坡、林查班等港口靠泊、提箱和预约情况。", "物流/计划", "https://www.marinetraffic.com/"],
  ["红海/苏伊士绕航", "影响亚洲-欧洲航线时效、运价、保险和客户交期承诺。", "物流/业务", "https://www.imo.org/"],
  ["巴拿马运河", "水位、通行限制和预约变化会影响美东/美湾线路。", "物流/计划", "https://pancanal.com/"],
  ["汇率波动", "人民币、美元、欧元、英镑、巴西雷亚尔变化会影响报价、付款和利润。", "财务/业务", "https://www.bis.org/"],
  ["利率与融资", "高利率环境会影响客户付款、库存资金和信用风险。", "财务", "https://www.federalreserve.gov/"],
  ["能源与燃油", "油价和燃油附加费会影响海运、空运和本地派送成本。", "物流/采购", "https://www.iea.org/"],
  ["制裁/受限方", "客户、收货人、国家、最终用途涉及受限时，需要做初筛并升级合规。", "合规/业务", "https://sanctionssearch.ofac.treas.gov/"],
  ["出口管制", "高性能芯片、无线、加密、军民两用或敏感目的国需特别关注。", "合规/关务", "https://www.bis.doc.gov/"],
  ["海关估价", "关联交易、模具费、许可费、运保费和协助费用可能影响完税价格。", "关务/财务", "http://www.customs.gov.cn/"],
  ["原产地与加征税", "美国原产进口中国、中国原产出口美国等场景要看额外关税和豁免清单。", "关务", "http://gss.mof.gov.cn/"],
  ["电商/平台合规", "Amazon、Mercado Libre 等平台可能要求 CE/FCC/ANATEL、电池、标签和责任人信息。", "业务/认证", "https://ec.europa.eu/growth/single-market/ce-marking_en"],
  ["目的国语言标签", "欧盟、巴西、中东、泰国、日本等市场常要求当地语言、安全警示或进口商信息。", "认证/当地进口商", "https://trade.ec.europa.eu/access-to-markets/"],
  ["进口商资质", "DDP、IOR、当地税号、进口许可证、SABER/ANATEL 持证主体会影响能不能进口。", "业务/当地进口商", "https://trade.gov/"],
  ["罢工与劳资事件", "港口、铁路、卡车、海关或码头工人罢工会影响提柜和派送。", "物流/计划", "https://www.ilo.org/"],
  ["台风/季风/极端天气", "华南、华东、东南亚、北美港口遇极端天气时，截关、靠泊和提柜可能推迟。", "物流", "https://public.wmo.int/"],
  ["供应链安全", "查验、反恐、AEO、封条、舱单数据准确性影响放行和客户交付。", "关务/物流", "https://www.wcoomd.org/"],
  ["产品召回/安全", "消费电子若发生召回或安全事故，可能影响认证、客户准入和平台销售。", "质量/认证", "https://www.cpsc.gov/"],
  ["包装与环保", "欧盟包装、电池、WEEE、EPR、塑料限制可能影响文件和标签。", "认证/业务", "https://environment.ec.europa.eu/"],
  ["保险和货损", "高货值、易损或延误风险高的货物，要把 Incoterms、保险和索赔证据提前写清。", "物流/业务", "https://iccwbo.org/"]
];

const techHotspotTopics = [
  ["AI 耳机/智能音频", "关注端侧 AI、语音助手、降噪算法和隐私合规，可能影响功能描述、认证资料和客户卖点。", "产品/认证", "https://www.consumertechnologyassociation.org/"],
  ["蓝牙 LE Audio / Auracast", "新蓝牙音频功能会影响芯片、频段、说明书、测试报告和目的国无线认证口径。", "研发/认证", "https://www.bluetooth.com/"],
  ["USB-C 与充电标准", "欧盟、英国等市场对充电接口和标签要求可能影响包装、说明书和适配器策略。", "产品/认证", "https://single-market-economy.ec.europa.eu/"],
  ["电池安全和小型锂电", "耳机、音箱、遥控器和充电盒要看 Wh、UN38.3、MSDS、SOC、包装和召回风险。", "质量/DG", "https://www.phmsa.dot.gov/training/hazmat/lithium-battery-guide-shippers"],
  ["无线频段与本地认证", "FCC、CE RED、ANATEL、NBTC、SRRC、ISED 等要求会影响上市周期和进口资料。", "认证负责人", "https://www.fcc.gov/"],
  ["EPR / WEEE / 电池回收", "欧盟、英国和部分平台要求生产者责任、回收标识和当地责任人信息。", "业务/认证", "https://environment.ec.europa.eu/"],
  ["产品网络安全", "联网音频设备可能涉及数据安全、默认密码、软件更新和客户准入要求。", "研发/法务", "https://www.enisa.europa.eu/"],
  ["消费电子召回", "关注过热、充电、声压、儿童安全和标签缺陷，影响认证、保险和客户信任。", "质量/认证", "https://www.cpsc.gov/"],
  ["芯片和元器件供应", "蓝牙芯片、功放 IC、电池和 PCB 供应变化会影响交期、成本和替代料认证。", "采购/计划", "https://www.semiconductors.org/"],
  ["绿色材料和限制物质", "RoHS、REACH、PFAS、包装限制会影响 BOM、供应商声明和客户文件。", "质量/供应商", "https://echa.europa.eu/"]
];

const financeHotspotTopics = [
  ["海运运价指数", "SCFI、FBX、WCI 等指数变化会影响报价有效期、旺季附加费和客户预算。", "物流/财务", "https://en.sse.net.cn/indices/scfinew.jsp"],
  ["空运燃油附加费", "燃油、安检、旺季和危险品附加费会影响样品、急单和高货值订单报价。", "物流/财务", "https://www.iata.org/en/programs/cargo/"],
  ["美元指数与人民币汇率", "美元/人民币波动会影响 FOB、CIF、DDP 报价和收款利润。", "财务/业务", "https://www.bis.org/"],
  ["客户信用和账期", "利率和融资环境变化会影响客户付款速度、信用额度和赊销风险。", "财务/业务", "https://www.worldbank.org/"],
  ["油价与本地派送", "柴油、航空煤油和能源价格会影响拖车、快递、空运和燃油附加费。", "物流/采购", "https://www.iea.org/"],
  ["保险费率和战争险", "高风险航线、绕航和地缘事件可能提高战争险、货运险和免赔要求。", "物流/业务", "https://iccwbo.org/"],
  ["材料价格", "铜、铝、塑胶、纸箱和电池材料价格会影响 BOM、采购成本和报价周期。", "采购/财务", "https://www.worldbank.org/en/research/commodity-markets"],
  ["库存资金成本", "交期拉长或客户推迟提货会增加库存占用、仓租和现金流压力。", "计划/财务", "https://www.imf.org/"],
  ["目的国税费成本", "VAT、GST、关税和清关服务费变化会影响 DDP/DDU 报价和客户收货体验。", "关务/财务", "https://trade.ec.europa.eu/access-to-markets/"],
  ["平台费用和退货成本", "电商平台仓储费、退货费和合规整改费会影响实际利润。", "业务/财务", "https://sellercentral.amazon.com/"]
];

function fallbackHotspotCards(rows = []) {
  return rows
    .map(
      ([title, summary, owner, url], index) => `
        <article class="hotspot-rank-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(summary)}</p>
            <small>优先确认：${escapeHtml(owner)}</small>
          </div>
          <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">来源</a>
        </article>
      `
    )
    .join("");
}

const hotspotDisplayCategories = ["政治", "科技", "金融"];
const hotspotBoardMinimum = 10;
const hotspotStaleMs = 2 * 60 * 60 * 1000;
const hotspotAutoRefreshMs = 60 * 60 * 1000;

function fallbackHotspotData() {
  const makeItem = ([title, summary, owner, url], index, category) => ({
    title,
    summary,
    description: summary,
    takeawayZh: `优先确认：${owner}。${summary}`,
    category,
    hotCategory: category,
    hotScore: 80 - index,
    domain: sourceDomainLabel({ url }),
    url,
    seendate: new Date().toISOString()
  });
  const politicalItems = globalHotspotTopics
    .filter((row) => hotspotCategoryForStaticTopic(row[0], row[1]) === "政治")
    .map((row, index) => makeItem(row, index, "政治"));
  const financeItems = globalHotspotTopics
    .filter((row) => hotspotCategoryForStaticTopic(row[0], row[1]) === "金融")
    .concat(financeHotspotTopics)
    .map((row, index) => makeItem(row, index, "金融"));
  const techItems = techHotspotTopics.map((row, index) => makeItem(row, index, "科技"));
  const items = [...politicalItems, ...techItems, ...financeItems].sort((a, b) => b.hotScore - a.hotScore);
  return {
    ok: true,
    fallback: true,
    updatedAt: new Date().toISOString(),
    source: "daily baseline hotlist",
    boards: hotspotDisplayCategories.map((category) => ({
      category,
      items: items.filter((item) => item.hotCategory === category).slice(0, hotspotBoardMinimum)
    })),
    items
  };
}

function hotspotCategoryForStaticTopic(title = "", summary = "") {
  const text = normalize(`${title} ${summary}`);
  if (/电池|无线|认证|标签|召回|环保|包装|产品|平台|芯片|ai|蓝牙|网络安全|材料|科技/.test(text)) return "科技";
  if (/汇率|利率|能源|燃油|成本|保险|金融|运费|舱位|市场|报价|采购|付款|油价/.test(text)) return "金融";
  return "政治";
}

function hotspotItemText(item = {}, includeCategory = false) {
  return normalize([
    item.title,
    includeCategory ? item.category : "",
    item.summary,
    item.description,
    item.takeawayZh,
    item.takeaway,
    item.domain
  ].join(" "));
}

function isHotspotNoise(item = {}) {
  const text = hotspotItemText(item, true);
  return /review|movie|film|tv|series|horror|comedy|celebrity|sports|gaming|game review|trailer|box office|影视|电影|剧集|娱乐|明星|体育|游戏评测/.test(text)
    && !/policy|government|regulation|market|stock|finance|ai|chip|semiconductor|cyber|tariff|sanction|政策|政府|监管|金融|市场|芯片|网络安全|关税|制裁/.test(text);
}

function hotspotCategoryForItem(item = {}) {
  if (isHotspotNoise(item)) return "";
  const text = hotspotItemText(item);
  if (/\bai\b|artificial intelligence|chip|semiconductor|bluetooth|battery|consumer electronics|software|cyber|data center|quantum|robot|hardware|telecom|\btechnology\b|科技|芯片|半导体|蓝牙|电池|消费电子|软件|网络安全|人工智能|数据中心|量子|机器人|硬件|通信/.test(text)) return "科技";
  if (/usb-c|charger|charging standard|充电标准|充电接口|适配器/.test(text)) return "科技";
  if (/rate|inflation|currency|oil|market|stock|bond|finance|central bank|economy|freight|surcharge|price|banking|yield|gdp|汇率|利率|通胀|油价|金融|经济|市场|运费|附加费|价格|成本|央行|股票|债券/.test(text)) return "金融";
  if (/geopolitic|election|government|policy|tariff|customs|sanction|export control|war|conflict|military|diplomatic|trade|regulation|law|court|minister|president|政治|选举|政府|政策|关税|海关|制裁|出口管制|战争|冲突|军事|外交|贸易|监管|法律|法院|总统|部长/.test(text)) return "政治";
  return "";
}

function hotspotScoreForItem(item = {}) {
  const text = normalize([item.title, item.category, item.summary, item.description, item.takeawayZh, item.takeaway].join(" "));
  let score = Number(item.hotScore || 0) || 8;
  if (/关税|海关|制裁|出口管制|认证|监管|电池|航运|港口|运费|供应链|通胀|汇率|利率|油价|地缘|冲突|罢工|tariff|customs|sanction|export control|certification|regulation|battery|shipping|port|freight|supply chain|inflation|currency|interest|oil|geopolitics|conflict|strike/.test(text)) score += 20;
  if (/gov|customs|wto|worldbank|imf|federalregister|cbp|ustr|europa|iata|imo/.test(String(item.domain || ""))) score += 10;
  if (Date.parse(item.seendate || item.date || item.updatedAt || "")) score += 4;
  return score;
}

function buildHotspotBoardsFromData(data = {}) {
  if (!data || (!Array.isArray(data.boards) && !Array.isArray(data.items))) {
    return buildHotspotBoardsFromData(fallbackHotspotData());
  }
  if (data.fallback && !Array.isArray(data.boards) && String(data.source || "").includes("Manual trend")) {
    return buildHotspotBoardsFromData(fallbackHotspotData());
  }
  const boardItems = Array.isArray(data.boards) ? data.boards.flatMap((board) => board.items || []) : [];
  const seen = new Set();
  const items = [...boardItems, ...(Array.isArray(data.items) ? data.items : [])].filter((item) => {
    const key = `${item.url || ""}|${item.title || ""}`.toLowerCase();
    if (!key.trim() || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (!items.length) return buildHotspotBoardsFromData(fallbackHotspotData());
  const ranked = items
    .map((item) => ({
      ...item,
      hotCategory: hotspotCategoryForItem(item),
      hotScore: hotspotScoreForItem(item)
    }))
    .filter((item) => hotspotDisplayCategories.includes(item.hotCategory))
    .sort((a, b) => b.hotScore - a.hotScore);
  if (!ranked.length) return buildHotspotBoardsFromData(fallbackHotspotData());
  const fallbackBoards = fallbackHotspotData().boards || [];
  return hotspotDisplayCategories.map((category) => {
    const primaryItems = ranked.filter((item) => item.hotCategory === category);
    const fallbackItems = fallbackBoards.find((board) => board.category === category)?.items || [];
    const mergedItems = [...primaryItems, ...fallbackItems].filter((item, index, rows) => {
      const key = `${item.url || ""}|${item.title || ""}`.toLowerCase();
      return key.trim() && rows.findIndex((row) => `${row.url || ""}|${row.title || ""}`.toLowerCase() === key) === index;
    });
    return {
      category,
      items: mergedItems.slice(0, hotspotBoardMinimum)
    };
  });
}

function hotspotFreshnessMeta(data = {}) {
  const updatedAt = data.updatedAt || "";
  const stamp = Date.parse(updatedAt);
  const fallback = Boolean(data.fallback);
  if (!Number.isFinite(stamp)) {
    return {
      state: fallback ? "fallback" : "watch",
      label: fallback ? "基线热榜" : "页面实时生成",
      ageText: "刚刚",
      detail: fallback ? "未取得后台缓存，使用本地业务规则兜底。" : "未取得后台时间戳，按当前页面结果判断。"
    };
  }
  const ageMs = Math.max(0, Date.now() - stamp);
  if (fallback) {
    return {
      state: "fallback",
      label: "基线热榜",
      ageText: formatEta(updatedAt),
      detail: "当前是本地规则兜底，不代表公开来源已经完成刷新。"
    };
  }
  if (ageMs > hotspotStaleMs) {
    return {
      state: "stale",
      label: "待刷新",
      ageText: formatEta(updatedAt),
      detail: "缓存偏旧，页面会尝试重新拉取公开来源。"
    };
  }
  if (ageMs <= 15 * 60 * 1000) {
    return {
      state: "live",
      label: "刚同步",
      ageText: formatEta(updatedAt),
      detail: "后台缓存很新，可按近实时信号处理。"
    };
  }
  return {
    state: "fresh",
    label: "近实时",
    ageText: formatEta(updatedAt),
    detail: "仍在有效窗口内，重要订单建议手动刷新一次。"
  };
}

function renderHotspotPulsePanel(data = {}, boards = []) {
  const meta = hotspotFreshnessMeta(data);
  const allItems = boards
    .flatMap((board) => (board.items || []).map((item) => ({ ...item, boardCategory: board.category })))
    .sort((a, b) => hotspotScoreForItem(b) - hotspotScoreForItem(a));
  const priorityItems = allItems.slice(0, 3);
  const categoryLine = boards
    .filter((board) => (board.items || []).length)
    .map((board) => `${board.category}${(board.items || []).length}`)
    .join(" / ");
  const sourceMode = data.fallback ? "本地规则" : (data.source || "后台趋势缓存");
  return `
    <section class="hotspot-pulse-panel hotspot-state-${escapeHtml(meta.state)}" aria-label="热点实时摘要">
      <div class="hotspot-pulse-head">
        <span>Near-live Radar</span>
        <strong>${escapeHtml(meta.label)} · ${escapeHtml(meta.ageText)}</strong>
        <small>${escapeHtml(meta.detail)}</small>
      </div>
      <div class="hotspot-pulse-grid">
        <article>
          <span>来源状态</span>
          <strong>${escapeHtml(sourceMode)}</strong>
          <p>${escapeHtml(data.fallback ? "先给业务基线判断；刷新成功后会替换为公开来源。" : "公开来源已进入缓存，按业务影响重新排序。")}</p>
        </article>
        <article>
          <span>榜单覆盖</span>
          <strong>${escapeHtml(String(allItems.length || 0))} 条</strong>
          <p>${escapeHtml(categoryLine || "等待公开来源返回。")}</p>
        </article>
        <article>
          <span>首要判断</span>
          <strong>${escapeHtml(priorityItems[0]?.boardCategory || priorityItems[0]?.hotCategory || "待观察")}</strong>
          <p>${escapeHtml(priorityItems[0] ? compactSourceStatement(sourceOpinionForItem(priorityItems[0], sourceStatementForItem(priorityItems[0]), priorityItems[0].hotCategory || ""), 128) : "暂无足够信号形成优先级。")}</p>
        </article>
      </div>
      ${
        priorityItems.length
          ? `<div class="hotspot-priority-list">
              ${priorityItems
                .map((item, index) => {
                  const summary = compactSourceStatement(sourceStatementForItem(item), 120);
                  return `
                    <article>
                      <span>${String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>${escapeHtml(item.title || sourceDomainLabel(item) || "热点信号")}</strong>
                        <p>${escapeHtml(summary)}</p>
                      </div>
                    </article>
                  `;
                })
                .join("")}
            </div>`
          : ""
      }
    </section>
  `;
}

function renderDynamicHotspotCard(item = {}, index = 0, options = {}) {
  const rank = String(index + 1).padStart(2, "0");
  const source = item.domain || sourceDomainLabel(item);
  const summary = sourceStatementForItem(item);
  const opinion = sourceOpinionForItem(item, summary, item.hotCategory || item.category || "");
  const compact = Boolean(options.compact);
  const showLink = options.showLink !== false;
  return `
    <article class="hotspot-rank-card dynamic-hotspot-card">
      <span>${rank}</span>
      <div>
        <strong>${escapeHtml(item.title || source || "热点来源")}</strong>
        <p>${escapeHtml(compact ? compactSourceStatement(summary, 118) : summary)}</p>
        ${compact ? "" : `<p class="opinion-line"><b>判断：</b>${escapeHtml(opinion)}</p>`}
        <small>${escapeHtml(source)}${item.seendate || item.date ? ` · ${escapeHtml(formatEta(item.seendate || item.date))}` : ""}</small>
      </div>
      ${showLink && item.url ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">来源</a>` : ""}
    </article>
  `;
}

function renderTrendHotspotBoard(data = {}) {
  const boards = buildHotspotBoardsFromData(data);
  const hasDynamic = boards.some((board) => board.items.length);
  const dailyBoard = $("dailyHotspotBoard");
  const sourceStrip = $("hotspotSourceStrip");

  if (dailyBoard && hasDynamic) {
    dailyBoard.innerHTML = `
      ${renderHotspotPulsePanel(data, boards)}
      ${boards
        .filter((board) => board.items.length)
        .map((board) => {
          const visibleItems = board.items.slice(0, hotspotBoardMinimum);
          const hiddenItems = board.items.slice(hotspotBoardMinimum);
          return `
        <section class="hotspot-board-column">
          <div class="hotspot-board-head">
            <span>${escapeHtml(board.category)}</span>
            <strong>${escapeHtml(String(board.items.length))} 条</strong>
          </div>
          <div class="hotspot-rank-grid dynamic-hotspot-grid">
            ${visibleItems.map((item, index) => renderDynamicHotspotCard(item, index, { compact: true })).join("")}
          </div>
          ${
            hiddenItems.length
              ? `<details class="hotspot-more-list">
                  <summary>展开另外 ${escapeHtml(String(hiddenItems.length))} 条来源</summary>
                  <div class="hotspot-rank-grid dynamic-hotspot-grid">
                    ${hiddenItems.map((item, index) => renderDynamicHotspotCard(item, index + visibleItems.length, { compact: true })).join("")}
                  </div>
                </details>`
              : ""
          }
        </section>
      `;
        })
        .join("")}
    `;
  } else if (dailyBoard) {
    dailyBoard.innerHTML = "";
  }

  if (sourceStrip) {
    const meta = hotspotFreshnessMeta(data);
    const topicRows = Array.isArray(data.topics)
      ? data.topics
          .filter((topic) => hotspotDisplayCategories.some((category) => String(topic.label || topic.id || "").includes(category)))
          .slice(0, 3)
          .map((topic) => `${topic.label || topic.id} ${Array.isArray(topic.items) ? topic.items.length : 0}`)
      : [];
    const sourceRows = Array.isArray(data.sourceBreakdown)
      ? data.sourceBreakdown.slice(0, 6).map((item) => `${item.source}: ${item.status}`)
      : [];
    sourceStrip.innerHTML = [
      `${meta.label} ${meta.ageText}`,
      data.fallback ? "来源模式：本地规则兜底" : "来源模式：公开来源缓存",
      ...topicRows,
      ...sourceRows
    ]
      .filter(Boolean)
      .slice(0, 8)
      .map((item) => `<span>${escapeHtml(item)}</span>`)
      .join("");
  }

  if ($("hotspotStatus") && !$("hotspotStatus").dataset.manual) {
    const meta = hotspotFreshnessMeta(data);
    $("hotspotStatus").textContent = `${meta.label} · ${meta.ageText}`;
  }
}

function setHotspotStatus(text = "", manual = true) {
  const target = $("hotspotStatus");
  if (!target) return;
  if (manual) target.dataset.manual = "1";
  else delete target.dataset.manual;
  target.textContent = text;
}

async function refreshHotspots(showOverlay = true) {
  setHotspotStatus("正在刷新...", true);
  await loadTrends("", showOverlay);
  const stamp = new Date().toISOString();
  try {
    localStorage.setItem("hotspotLastRefreshDate", stamp.slice(0, 10));
    localStorage.setItem("hotspotLastRefreshAt", stamp);
  } catch (error) {
    // localStorage unavailable is harmless in private mode.
  }
  setHotspotStatus(`已刷新 · ${formatEta(stamp)}`, true);
}

async function loadHotspotCache() {
  setHotspotStatus("正在读取后台热榜...", false);
  try {
    const data = await fetchJsonOrFallback(`/.netlify/functions/hotspot-cache?_t=${Date.now()}`, { ok: false });
    if (data?.ok && (Array.isArray(data.boards) || Array.isArray(data.items))) {
      const stampTime = Date.parse(data.updatedAt || "");
      const stale = !Number.isFinite(stampTime) || Date.now() - stampTime > hotspotStaleMs;
      if (stale) {
        try {
          localStorage.removeItem("hotspotLastRefreshDate");
          localStorage.removeItem("hotspotLastRefreshAt");
        } catch (error) {
          // localStorage unavailable is harmless in private mode.
        }
        window.hotspotCacheWasStale = true;
        return false;
      }
      renderTrendHotspotBoard(data);
      const stamp = data.updatedAt || new Date().toISOString();
      try {
        localStorage.setItem("hotspotLastRefreshDate", stamp.slice(0, 10));
        localStorage.setItem("hotspotLastRefreshAt", stamp);
      } catch (error) {
        // localStorage unavailable is harmless in private mode.
      }
      setHotspotStatus(`已同步热榜 · ${formatEta(stamp)}`, false);
      return true;
    }
  } catch (error) {
    // Fall back to live query below.
  }
  return false;
}

function maybeAutoRefreshHotspots() {
  renderTrendHotspotBoard(fallbackHotspotData());
  window.hotspotCacheWasStale = false;
  const today = new Date().toISOString().slice(0, 10);
  let lastDate = "";
  try {
    lastDate = localStorage.getItem("hotspotLastRefreshDate") || "";
  } catch (error) {
    lastDate = "";
  }
  loadHotspotCache().then((loaded) => {
    if (!loaded && (lastDate !== today || window.hotspotCacheWasStale)) {
      refreshHotspots(false);
    } else if (!loaded && $("hotspotStatus")) {
      $("hotspotStatus").textContent = "今日已自动刷新";
    }
  });
  window.setInterval(() => {
    const current = new Date().toISOString().slice(0, 10);
    let saved = "";
    try {
      saved = localStorage.getItem("hotspotLastRefreshDate") || "";
    } catch (error) {
      saved = "";
    }
    loadHotspotCache().then((loaded) => {
      if (!loaded) refreshHotspots(false);
    });
  }, hotspotAutoRefreshMs);
}

function renderTrends(data = {}) {
  const items = Array.isArray(data.items) ? data.items : [];
  const indicators = Array.isArray(data.indicators) ? data.indicators : [];
  const insights = Array.isArray(data.insights) && data.insights.length ? data.insights : buildTrendInsightCards(items, indicators, data.keyword);
  const hotspots = buildTrendHotspots(items);
  const sourceDigests = buildSourceDigests(items, { limit: 9, context: data.keyword || "" });
  $("trendStatus").textContent = `已更新 · ${formatEta(data.updatedAt)}`;
  renderTrendHotspotBoard(data);
  const trendSummaryText = sourceDigests.length ? summarizeSourceDigests(sourceDigests, data.keyword) : (data.summary || summarizeTrendItems(items, data.keyword));
  const strongestHotspot = hotspots[0];
  $("trendSummary").innerHTML = `
    ${renderResultBrief({
      className: "trend-result-brief",
      kicker: "Market Impact Brief",
      title: data.keyword ? `趋势影响：${data.keyword}` : "全球趋势影响",
      updatedAt: data.updatedAt,
      conclusion: trendSummaryText,
      risk: strongestHotspot ? `${strongestHotspot.name}：${strongestHotspot.conclusion}，命中 ${strongestHotspot.count} 条。` : "暂无突出热点，当前没有形成成本、时效、舱位、清关或港口作业结论。",
      cost: "把金额影响拆成运费、燃油、汇率、关税、仓储、查验和客户交付承诺逐项看。",
      action: "把趋势转成业务问题：是否影响报价、舱位、清关资料、认证、港口作业或客户 ETA。",
      source: sourceDigests.length ? `已逐条提炼 ${sourceDigests.length} 个来源网页。` : (items.length ? `公开消息 ${items.length} 条；更新时间 ${formatEta(data.updatedAt)}。` : "当前为固定观察清单或离线兜底结果。"),
      links: sourceDigests.length ? [] : items.slice(0, 4).map((item) => [item.domain || item.title || "来源", item.url]).filter((item) => item[1])
    })}
    ${renderSourceDigestBoard(sourceDigests, "趋势来源逐条解读")}
    <strong>综合判断</strong>
    <p>${escapeHtml(trendSummaryText)}</p>
    <div class="hotspot-strip">
      ${hotspots
        .map((item) => `<span><strong>${escapeHtml(item.name)}</strong>${escapeHtml(item.conclusion)} · ${escapeHtml(String(item.count))} 条</span>`)
        .join("")}
    </div>
    ${
      indicators.length
        ? `<div class="indicator-strip">${indicators
            .map((item) => `<span><strong>${escapeHtml(item.name)}</strong>${escapeHtml(String(item.value))} <small>${escapeHtml(item.date || item.source || "")}</small></span>`)
            .join("")}</div>`
        : ""
    }
    <div class="trend-insight-grid">
      ${insights
        .slice(0, 5)
        .map(
          (item) => `
            <article>
              <span>${escapeHtml(item.title)}</span>
              <strong>${escapeHtml(item.signal)}</strong>
              <p>${escapeHtml(item.impact)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
  const actionRows = [
    ...hotspots
      .filter((item) => item.count > 0)
      .map((item) => ({
        label: item.name,
        title: item.conclusion,
        body: `命中 ${item.count} 条信号，先判断是否影响报价、舱位、清关资料或 ETA 承诺。`,
        metric: `${item.count} 条`
      })),
    ...insights.map((item) => ({
      label: item.title,
      title: item.signal,
      body: item.impact,
      metric: "动作"
    }))
  ].slice(0, 6);
  $("trendGrid").innerHTML = actionRows.length
    ? `
      <article class="trend-card logistics-impact-card">
        <span>来源规则</span>
        <h3>同一个来源只在上方解读一次</h3>
        <p>这里改为影响维度和下一步动作，不再重复列新闻链接。</p>
        <small>${escapeHtml(sourceDigests.length ? `已去重 ${sourceDigests.length} 个来源。` : "没有来源解读时才保留摘要链接。")}</small>
      </article>
      ${actionRows
        .map((item) => `
          <article class="trend-card logistics-impact-card">
            <span>${escapeHtml(item.label)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
            <small>${escapeHtml(item.metric)}</small>
          </article>
        `)
        .join("")}
    `
    : `<article class="trend-card"><h3>暂无趋势结果</h3><p>${escapeHtml(data.message || "稍后重试。")}</p></article>`;
}

function summarizeTrendItems(items = [], keyword = "") {
  if (!items.length) return keyword ? `没有找到“${keyword}”相关结果，可以换更宽泛的关键词。` : "暂无公开新闻结果。";
  const domains = Array.from(new Set(items.map((item) => item.sourceCountry || item.domain).filter(Boolean))).slice(0, 4);
  const riskWords = items
    .flatMap((item) => [item.category, item.takeawayZh, item.takeaway, item.title])
    .join(" ")
    .toLowerCase();
  const points = [];
  if (/tariff|customs|sanction|export|trade|关税|海关|制裁|出口/.test(riskWords)) points.push("贸易政策或海关监管可能影响税率、资料和目的国准入");
  if (/shipping|port|supply|logistics|air cargo|express|courier|dhl|ups|fedex|船|港口|物流|供应链|空运|快件|快递|航空货运/.test(riskWords)) points.push("物流和供应链变化可能影响船期、空运舱位、快件清关、港口作业和交期");
  if (/rate|currency|inflation|market|finance|汇率|利率|通胀|金融/.test(riskWords)) points.push("汇率、利率和金融市场变化可能影响报价和成本");
  if (!points.length) points.push("未提取到明确物流影响；当前来源没有形成成本、时效、舱位、清关或港口作业结论");
  return `${keyword ? `关键词“${keyword}”：` : ""}本次找到 ${items.length} 条公开消息${domains.length ? `，来源涉及 ${domains.join("、")}` : ""}。主要提醒：${points.join("；")}。`;
}

async function queryPortRisk(event) {
  if (event) event.preventDefault();
  const port = $("portName").value || "Shanghai Port";
  const region = $("portRegion").value || "China";
  const cargo = $("portCargo").value || "Consumer Audio";
  const dg = $("portDgInfo")?.value || "";
  const dgClass = $("portDgClass")?.value || "";
  const params = new URLSearchParams({ port, region, cargo, dg, dgClass });
  $("portRiskStatus").textContent = "正在查询公开港口风险...";
  if (event) {
    showQueryOverlay("正在查询港口/物流风险", `${port} / ${cargo}。正在判断塞港、海况、DG 限制和核验入口。`, "Port Risk");
  }

  try {
    const data = await fetchJsonOrFallback(`/.netlify/functions/port-risk?${params.toString()}`, fallbackPortRisk(port, cargo));
    renderPortRisk(data);
    if (event) addHistory("港口风险", `${port} / ${cargo}`, data.congestionStatus || data.summary || "已查询港口风险");
  } catch (error) {
    renderPortRisk(fallbackPortRisk(port, cargo, error.message));
  } finally {
    if (event) hideQueryOverlay();
  }
}

function fallbackPortRisk(port = "Shanghai Port", cargo = "Consumer Audio", message = "") {
  const batteryCargo = /battery|电池|危险|dg|hazard/i.test(cargo);
  const known = portSuggestions.find((item) => {
    const haystack = normalize([item.name, item.region, ...item.aliases].join(" "));
    const needle = normalize(port);
    return haystack.includes(needle) || needle.includes(normalize(item.name));
  });
  return {
    ok: false,
    fallback: true,
    source: "Port risk conclusion",
    updatedAt: new Date().toISOString(),
    port: known?.name || port,
    region: known?.region || "",
    cargo,
    level: batteryCargo ? "Medium" : "Watch",
    congestionStatus: "未见明确塞港信号",
    congestionSummary: `${known?.name || port} 当前没有抓到明确拥堵/塞港新闻。建议按正常计划推进，同时向货代确认最新靠泊、提箱和码头预约。`,
    impact: batteryCargo ? "含电池/DG 货物仍需提前确认船司和码头接受规则。" : "常规货物暂无明显港口异常信号。",
    recommendation: "出货前仍建议向货代确认 ETA、靠泊码头、免堆期和提箱预约。",
    summary: message || `${known?.name || port} 暂未获取到实时公开新闻结果，先按手工清单处理。`,
    links: [
      ["上港集团箱货查询", "https://www.sipg.com.cn/conquery/index"],
      ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"]
    ],
    articles: []
  };
}

function renderPortRisk(data = {}) {
  const articles = Array.isArray(data.articles) ? data.articles : [];
  const links = Array.isArray(data.links) ? data.links : [];
  const weather = data.weather || {};
  const dg = data.dgAdvice || {};
  const dgSources = Array.isArray(dg.sources) ? dg.sources : [];
  const dgDocs = Array.isArray(dg.documents) ? dg.documents : [];
  const dgRestrictions = Array.isArray(dg.restrictions) ? dg.restrictions : [];
  const dgArticles = Array.isArray(dg.relatedArticles) ? dg.relatedArticles : [];
  const operationGuide = Array.isArray(data.operationGuide) ? data.operationGuide : [];
  const weatherParts = [
    weather.waveHeightM !== "" && weather.waveHeightM !== undefined ? `浪高 ${weather.waveHeightM} m` : "",
    weather.wavePeriodS !== "" && weather.wavePeriodS !== undefined ? `浪周期 ${weather.wavePeriodS} s` : "",
    weather.seaSurfaceTempC !== "" && weather.seaSurfaceTempC !== undefined ? `海温 ${weather.seaSurfaceTempC} C` : ""
  ].filter(Boolean);
  $("portRiskStatus").textContent = `已更新 · ${formatEta(data.updatedAt)}`;
  $("portRiskGrid").innerHTML = `
    ${renderResultBrief({
      className: `port-risk-result-brief level-${String(data.level || "watch").toLowerCase()}`,
      kicker: "Port Risk Brief",
      title: `${data.port || "港口"}${data.region ? ` · ${data.region}` : ""}`,
      updatedAt: data.updatedAt,
      conclusion: data.congestionStatus || data.summary || "请结合货代和码头信息确认。",
      risk: data.impact || "暂未发现明显影响；仍需关注 ETA、靠泊、提柜、预约和 DG 接收。",
      cost: "港口风险可能影响堆存、滞箱、查验、改配、移箱、拖车和特殊货操作费；以码头/货代账单为准。",
      action: data.recommendation || "出货前向货代确认最新靠泊、截关、提箱预约和免堆免箱期。",
      source: weatherParts.length ? `${weather.source || "Marine weather"}：${weatherParts.join("，")}` : "公开消息、港口入口和人工核验清单。",
      links: links.concat(dgSources)
    })}
    <article class="risk-card operation-guide-card">
      <span>港口操作指南</span>
      <strong>${escapeHtml(data.port || "港口")} · ${escapeHtml(dg.displayClass || "普通货物/待确认")}</strong>
      ${
        operationGuide.length
          ? `<div class="operation-guide-list">${operationGuide
              .map((item) => `
                <section>
                  <b>${escapeHtml(item.stage || "步骤")}</b>
                  <p>${escapeHtml(item.action || "")}</p>
                  ${item.owner ? `<small>负责/确认：${escapeHtml(item.owner)}</small>` : ""}
                </section>
              `)
              .join("")}</div>`
          : `<p>${escapeHtml(data.recommendation || "确认船司、货代、码头和当地代理的最新操作要求。")}</p>`
      }
    </article>
    <article class="risk-card level-${escapeHtml(String(data.level || "watch").toLowerCase())}">
      <span>是否塞港/拥堵</span>
      <strong>${escapeHtml(data.congestionStatus || "需关注")}</strong>
      <p>${escapeHtml(data.congestionSummary || data.summary || "请结合货代和码头信息确认。")}</p>
    </article>
    <article class="risk-card">
      <span>影响判断</span>
      <strong>${escapeHtml(data.level || "Watch")}</strong>
      <p>${escapeHtml(data.impact || "暂未发现明显影响。")}</p>
    </article>
    <article class="risk-card weather-card">
      <span>海况/作业</span>
      <strong>${escapeHtml(data.port || "未指定港口")}${data.region ? ` · ${escapeHtml(data.region)}` : ""}</strong>
      <p>${escapeHtml(data.recommendation || data.profileSummary || "建议向货代确认最新作业安排。")}</p>
      <small>${escapeHtml(weatherParts.length ? `${weather.source || "Marine weather"}：${weatherParts.join("，")}` : "海况接口暂未返回，按港口基础清单处理。")}</small>
    </article>
    <article class="risk-card dg-card">
      <span>危险品类别判断</span>
      <strong>${escapeHtml(dg.displayClass || "未识别为危险品")}</strong>
      <p>${escapeHtml(dg.meaning || "如含电池、液体、化学品、磁性材料或带压容器，请补充 UN 编号或 Class。")}</p>
      ${dg.unNumbers?.length ? `<small>可能涉及：${escapeHtml(dg.unNumbers.join("、"))}</small>` : ""}
      ${dg.examples?.length ? `<small>典型货物：${escapeHtml(dg.examples.join("、"))}</small>` : ""}
    </article>
    <article class="risk-card dg-card">
      <span>港口/船司限制</span>
      <strong>${escapeHtml(dg.specialStatus || "未抓到直接相关近期特殊限制")}</strong>
      <ul>${dgRestrictions.slice(0, 6).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="risk-card dg-card">
      <span>需要准备的资料</span>
      <strong>${dg.isDangerous ? "危险品出运前复核" : "普通货物基础复核"}</strong>
      <ul>${dgDocs.slice(0, 7).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="risk-card">
      <span>推荐核验入口</span>
      <div class="mini-link-list">
        ${links.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
        ${dgSources.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
      </div>
    </article>
    <article class="risk-card articles-card">
      <span>公开消息</span>
      ${
        articles.length
          ? articles
              .slice(0, 5)
              .map((item) => `<a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`)
              .join("")
          : "<p>暂无公开新闻命中。</p>"
      }
    </article>
    ${
      dgArticles.length
        ? `<article class="risk-card articles-card"><span>DG 相关线索</span>${dgArticles
            .map((item) => `<a href="${escapeHtml(item.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a>`)
            .join("")}</article>`
        : ""
    }
  `;
}

function renderPortSuggestions(filter = "") {
  const needle = normalize(filter);
  const matches = portSuggestions
    .filter((port) => {
      const haystack = normalize([port.name, port.region, ...port.aliases].join(" "));
      return !needle || haystack.includes(needle);
    })
    .slice(0, 6);

  $("portSuggestionsList").innerHTML = portSuggestions
    .map((port) => `<option value="${escapeHtml(port.name)}">${escapeHtml(port.region)}</option>`)
    .join("");
  $("portSuggestionStrip").innerHTML = matches
    .map((port) => `<button type="button" data-port-name="${escapeHtml(port.name)}" data-port-region="${escapeHtml(port.region)}">${escapeHtml(port.name)}</button>`)
    .join("");
}

function applyPortSuggestion(button) {
  $("portName").value = button.dataset.portName || "Shanghai Port";
  $("portRegion").value = button.dataset.portRegion || "China";
  renderPortSuggestions($("portName").value);
  queryPortRisk();
}

async function fetchJsonOrFallback(url, fallback, options = {}) {
  if (!location.protocol.startsWith("http")) return fallback;
  const timeoutMs = Number(options.timeoutMs || 18000);
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller && Number.isFinite(timeoutMs) && timeoutMs > 0
    ? window.setTimeout(() => controller.abort(), timeoutMs)
    : null;
  try {
    const response = await fetch(url, controller ? { signal: controller.signal } : undefined);
    return response.json();
  } catch (error) {
    if (fallback !== null && fallback !== undefined) {
      if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) {
        return {
          ...fallback,
          message: fallback.message || (error.name === "AbortError" ? "接口响应超时，已显示本地兜底结论。" : error.message || "接口请求失败，已显示本地兜底结论。")
        };
      }
      return fallback;
    }
    throw error;
  } finally {
    if (timeoutId) window.clearTimeout(timeoutId);
  }
}

function parsePercentNumber(value = "") {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

function getBatteryTransportProfile(input = {}) {
  const lithiumIon = /锂离子|li-ion|lithium ion/i.test(input.type);
  const lithiumMetal = /锂金属|lithium metal/i.test(input.type);
  const lithium = lithiumIon || lithiumMetal || /锂|lithium/i.test(input.type);
  const batteryOnly = input.packing === "Battery only";
  const packedWith = input.packing === "Packed with equipment";
  const contained = input.packing === "Contained in equipment";
  const airLike = input.mode === "Air" || input.mode === "Courier";
  const damaged = /损坏|鼓包|漏液|召回|废旧|维修|退运/i.test(input.condition);
  const docsMissing = input.docs === "未确认" || input.docs === "只有 MSDS" || input.docs === "只有 UN38.3";
  const appraisalMissing = input.docs !== "MSDS + UN38.3 + 运输危险性鉴定报告 已有";
  const soc = parsePercentNumber(input.soc);
  let score = 0;
  let unNo = "未触发";
  let pi = "按产品资料确认";
  let properName = "非电池危险品方向待确认";
  let dgClass = "未判定";
  let specialProvision = "未触发";
  let transportDgConclusion = "未判定";
  let customsDgConclusion = "未判定";
  const redFlags = [];
  const documents = [];
  const handling = [];
  const nextActions = [];

  if (input.included === "unknown") {
    score += 4;
    redFlags.push("是否含电池不确定：不能直接放行，需要供应商确认 BOM、规格书或电池声明。");
  }
  if (input.included === "no") {
    handling.push("未含电池时，电池 DG 风险通常不触发；仍需确认磁性、液体、喷雾、化学品或大功率储能附件。");
    transportDgConclusion = "运输中通常不按锂电池危险品处理。";
    customsDgConclusion = "报关中通常不按锂电池或危险化学品申报；真实品名仍要写清。";
  }
  if (input.included === "yes") {
    score += 2;
    documents.push("电池规格书：电芯/电池组型号、Wh、数量、净重、生产商。");
    documents.push("UN38.3 Test Summary 和 MSDS/SDS。");
    documents.push("运输危险性鉴定报告/货物运输条件鉴定书：空运、快件、含磁性部件或承运人要求时尤其关键。");
    documents.push("装箱方式、外箱唛头/标签照片、产品说明书或电池声明。");
  }
  if (lithiumIon) {
    dgClass = "Class 9 lithium battery";
    if (batteryOnly) {
      unNo = "UN3480";
      pi = airLike ? "PI965 方向" : "IMDG lithium ion battery 条目";
      properName = "Lithium ion batteries";
      score += 5;
      redFlags.push("锂离子电池单独运输风险最高，空运/快递通常限制更多。");
    } else if (packedWith) {
      unNo = "UN3481";
      pi = airLike ? "PI966 方向" : "IMDG packed with equipment 方向";
      properName = "Lithium ion batteries packed with equipment";
      score += 3;
    } else if (contained) {
      unNo = "UN3481";
      pi = airLike ? "PI967 方向" : "IMDG contained in equipment 方向";
      properName = "Lithium ion batteries contained in equipment";
      score += 2;
    } else {
      unNo = "UN3480/UN3481 待定";
      pi = "先确认包装方式";
      score += 4;
      redFlags.push("包装方式不清楚：无法判断 UN3480 还是 UN3481。");
    }
  } else if (lithiumMetal) {
    dgClass = "Class 9 lithium battery";
    if (batteryOnly) {
      unNo = "UN3090";
      pi = airLike ? "PI968 方向" : "IMDG lithium metal battery 条目";
      properName = "Lithium metal batteries";
      score += 5;
    } else if (packedWith) {
      unNo = "UN3091";
      pi = airLike ? "PI969 方向" : "IMDG packed with equipment 方向";
      properName = "Lithium metal batteries packed with equipment";
      score += 3;
    } else {
      unNo = "UN3091";
      pi = airLike ? "PI970 方向" : "IMDG contained in equipment 方向";
      properName = "Lithium metal batteries contained in equipment";
      score += 3;
    }
  } else if (/碱性|alkaline/i.test(input.type)) {
    dgClass = "通常非 Class 9 锂电池";
    properName = "Alkaline batteries / 按承运人规则确认";
    handling.push("碱性电池通常不按锂电池 UN3480/3090 判断，但仍需防短路、确认数量和承运人限制。");
  } else if (input.included === "yes") {
    score += 3;
    redFlags.push("电池类型不确定：无法判断 UN 编号和包装指令。");
  }

  const smallContainedLithiumIon = lithiumIon && (contained || packedWith) && input.wh > 0 && input.wh <= 100;
  const smallContainedLithiumMetal = lithiumMetal && (contained || packedWith) && input.wh > 0 && input.wh <= 2;
  if ((smallContainedLithiumIon || smallContainedLithiumMetal) && !damaged) {
    specialProvision = input.mode === "Sea"
      ? "IMDG SP188 方向：小型锂电池随设备/装在设备中可按 SP188 条件做非完全 DG 口径"
      : "IATA Section II/小电池条款方向：空运/快件按 PI966/967 或 PI969/970 对应小电池限制判断";
    handling.push("SP188/小电池条款不是“没有要求”，仍要满足 Wh/锂含量、UN38.3、短路防护、坚固包装、跌落/标签和文件条件。");
  } else if (lithium && input.included === "yes") {
    specialProvision = "未满足小电池豁免判断条件；按完整锂电池运输要求或承运人预审处理";
  }

  if (input.included === "yes" && lithium) {
    if (damaged) {
      transportDgConclusion = "运输中属于高风险锂电池危险品/禁限运场景，不得按普货出运。";
    } else if (specialProvision.includes("SP188") || specialProvision.includes("Section II")) {
      transportDgConclusion = "运输中属于锂电池管制货物；满足 SP188/小电池条件时可按相应例外/简化口径操作，但不是普通无监管货。";
    } else {
      transportDgConclusion = "运输中按 Class 9 锂电池危险品方向处理，订舱/交仓前确认 UN 编号、PI/IMDG 条目和承运限制。";
    }
    customsDgConclusion = "报关中通常按真实货物名称和电池属性申报，不等同于海关“危险化学品”；若是移动电源、储能电源、损坏/废旧电池或化学品电池物料，需要另看监管条件、CCC/检验和危险化学品目录边界。";
  } else if (input.included !== "no") {
    customsDgConclusion = "是否含电池不清，报关资料不能写成普通无电池产品；先补 BOM、电池声明和规格书。";
  }

  if (input.wh > 100) {
    score += 5;
    redFlags.push("Wh > 100：通常进入更高风险复核，空运/快递需 DG 专员和承运人逐票确认。");
  } else if (input.wh > 20) {
    score += 2;
    handling.push("Wh > 20：建议确认是电芯还是电池组，并核对是否超过承运人小电池豁免边界。");
  } else if (input.included === "yes" && !input.wh) {
    score += 3;
    redFlags.push("未填写 Wh：无法判断空运小电池/大电池边界。");
  }

  if (damaged) {
    score += 8;
    redFlags.push("损坏、鼓包、漏液、召回、废旧或维修退运电池：普通渠道不要出运，必须由 DG 专员确认专门方案。");
  }
  if (airLike && batteryOnly && lithiumIon && soc !== null && soc > 30) {
    score += 4;
    redFlags.push("锂离子电池单独空运/快递且 SOC 超过 30%：需要暂停并找 DG 专员确认。");
  } else if (airLike && batteryOnly && lithiumIon && soc === null) {
    score += 2;
    redFlags.push("锂离子电池单独空运/快递未填写 SOC：通常需要确认荷电状态。");
  }
  if (docsMissing && input.included !== "no") {
    score += 3;
    redFlags.push("文件不完整：MSDS/SDS 与 UN38.3 Test Summary 至少要补齐后再判断渠道。");
  }
  if (appraisalMissing && input.included !== "no" && (airLike || lithium || /磁|喇叭|speaker|扬声器|magnet/i.test(input.carrier || ""))) {
    score += 2;
    redFlags.push("未确认运输危险性鉴定报告/运输条件鉴定书：空运、快件、含电池或磁性货物经常会被承运人要求，缺失会影响订舱/交仓。");
  }
  if (airLike && lithium) {
    handling.push("空运/快递：确认是否需要锂电池操作标签、Class 9 标签、货运机限制、Shipper's Declaration 和承运人预审。");
  }
  if (input.mode === "Sea" && lithium) {
    handling.push("海运：按 IMDG Code 和船司 DG cut-off 核验 UN 编号、包装、标签、DG booking、危申和港区限制。");
  }
  if (input.carrier) {
    nextActions.push(`把 ${input.carrier} 的 DG/电池接受规则作为承运人复核入口。`);
  }
  nextActions.push("找供应商补电池规格书、UN38.3、MSDS/SDS、运输危险性鉴定报告/运输条件鉴定书、外箱标签照片。");
  nextActions.push("找货代/DG 专员确认 UN 编号、PI/IMDG 条目、标签、订舱和截单时间。");
  nextActions.push("如目的港/码头有 DG 限制，提前确认危申、堆场接收窗口和船司是否接受。");

  const level = score >= 10 ? "High" : score >= 5 ? "Medium" : "Low";
  const headline = damaged
    ? "高风险：损坏/召回/废旧电池不得按普通货处理"
    : level === "High"
      ? "高风险：出运前必须 DG 专员和承运人确认"
      : level === "Medium"
        ? "中风险：资料补齐后再订舱/交仓"
        : "低风险：保留资料并按承运人规则复核";

  return {
    level,
    headline,
    unNo,
    pi,
    properName,
    dgClass,
    specialProvision,
    transportDgConclusion,
    customsDgConclusion,
    redFlags: redFlags.length ? redFlags : ["当前未见明显高风险触发点，但仍需按最新 IATA/IMDG 和承运人规则确认。"],
    documents: documents.length ? documents : ["供应商电池声明或无电池声明。", "如承运人要求，提供 MSDS/SDS、测试报告或产品说明。"],
    handling: handling.length ? handling : ["防短路、防误启动、外箱稳固，保留承运人接收规则和装箱照片。"],
    nextActions,
    sources: [
      ["IATA Batteries / Lithium Battery Guidance", "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries"],
      ["IATA Dangerous Goods Regulations", "https://www.iata.org/en/programs/cargo/dgr/"],
      ["FAA Lithium Battery Resources", "https://www.faa.gov/hazmat/resources/lithium_batteries"],
      ["PHMSA Lithium Battery Guide", "https://www.phmsa.dot.gov/training/hazmat/lithium-battery-guide-shippers"],
      ["IMO IMDG Code", "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx"]
    ]
  };
}

function renderBatteryProfile(profile = {}) {
  return `
    <div class="dg-result-grid">
      <article class="dg-card primary">
        <span>初步 DG 结论</span>
        <strong>${escapeHtml(profile.headline)}</strong>
        <p>${escapeHtml(profile.dgClass)} · ${escapeHtml(profile.unNo)} · ${escapeHtml(profile.properName)} · ${escapeHtml(profile.pi)}</p>
      </article>
      <article class="dg-card">
        <span>运输中是否危险品</span>
        <strong>${escapeHtml(profile.transportDgConclusion || "未判定")}</strong>
        <p>${escapeHtml(profile.specialProvision || "未触发 SP188/小电池条款。")}</p>
      </article>
      <article class="dg-card">
        <span>报关中是否危险品</span>
        <strong>${escapeHtml(profile.customsDgConclusion || "未判定")}</strong>
        <p>运输 DG、海关危险化学品、CCC/监管条件是不同口径，页面会分开提示。</p>
      </article>
      <article class="dg-card">
        <span>必须补齐的文件</span>
        <ul>${profile.documents.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="dg-card">
        <span>包装/标签/限制</span>
        <ul>${profile.handling.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="dg-card alert">
        <span>风险点</span>
        <ul>${profile.redFlags.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="dg-card wide">
        <span>下一步找谁确认</span>
        <ul>${profile.nextActions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="dg-card wide">
        <span>建议核验来源</span>
        <div class="source-chip-grid">
          ${profile.sources.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
        </div>
      </article>
    </div>
  `;
}

function evaluateBattery(event) {
  event.preventDefault();
  const input = {
    included: $("batteryIncluded").value,
    type: $("batteryType").value,
    wh: Number($("batteryWh").value || 0),
    packing: $("batteryPacking").value,
    mode: $("transportMode").value,
    docs: $("batteryDocs").value,
    quantity: $("batteryQuantity")?.value || "",
    condition: $("batteryCondition")?.value || "",
    soc: $("batterySoc")?.value || "",
    carrier: $("batteryCarrier")?.value || ""
  };
  const profile = getBatteryTransportProfile(input);
  $("batteryRiskLevel").textContent = `${profile.level} Risk`;
  const box = $("batteryResult");
  box.className = `decision-box ${profile.level.toLowerCase()}-risk`;
  box.innerHTML = renderBatteryProfile(profile);
}

function loadExample() {
  $("productName").value = "蓝牙降噪耳机";
  $("englishName").value = "Bluetooth ANC earbuds";
  $("productCategory").value = "Headphone / Earbuds";
  $("tradeDirection").value = "进口";
  $("material").value = "塑料外壳、锂离子电池、电路板、喇叭单元";
  $("usage").value = "无线连接手机播放声音，带充电盒";
  $("spec").value = "Bluetooth，内置锂电池，充电盒，USB-C";
  $("destination").value = "美国";
  $("originCountry").value = "中国";
  $("modelInfo").value = "零售包装，随附充电线。需要确认 MSDS、UN38.3、无线认证和 3C 边界。";
  hsAutoCategory = $("productCategory").value;
  updateHsSmartAssist({ manualCategory: true });
  if ($("hsCaseSelect")) $("hsCaseSelect").value = "wireless-earbuds";
  setHsCaseNote("预期：8517629400。蓝牙/无线耳机成品不能因为含喇叭、电池、电路板就转成 851890 零件。");
}

function clearForm() {
  $("productForm").reset();
  if ($("productCategory")) $("productCategory").value = "";
  if ($("spec")) $("spec").value = "";
  hsAutoCategory = "";
  hsLastProfileCategory = "";
  $("emptyState").classList.remove("hidden");
  $("resultState").classList.add("hidden");
  $("candidateList").innerHTML = "";
  $("credibilityStrip")?.classList.add("hidden");
  if ($("credibilityStrip")) $("credibilityStrip").innerHTML = "";
  renderRisks(["填写产品信息后，这里会显示 HS、3C、Battery/DG、监管条件和人工复核提醒。"]);
  $("reviewState").textContent = "待输入";
  if ($("hsCaseSelect")) $("hsCaseSelect").value = "";
  setHsCaseNote("");
  updateHsSmartAssist();
}

function loadBatteryExample() {
  $("batteryIncluded").value = "yes";
  $("batteryType").value = "锂离子 / Li-ion";
  $("batteryWh").value = "1.1";
  $("batteryPacking").value = "Contained in equipment";
  $("transportMode").value = "Air";
  $("batteryDocs").value = "未确认";
  $("batteryQuantity").value = "每个耳机和充电盒内置小容量电池";
  $("batteryCondition").value = "正常新电池/随产品出货";
  $("batterySoc").value = "";
  $("batteryCarrier").value = "空运/快递渠道待确认";
}

function resetBattery() {
  $("batteryForm").reset();
  $("batteryRiskLevel").textContent = "待判断";
  $("batteryResult").className = "decision-box";
  $("batteryResult").innerHTML = "<strong>填写电池信息后生成提醒</strong><p>本工具不替代货代、航司、船司或 DG 专员判断。</p>";
}

function renderIssues() {
  const openCount = state.issues.filter((issue) => issue.status !== "Closed").length;
  $("openIssueCount").textContent = openCount;
  $("issueTable").innerHTML = state.issues.length
    ? state.issues
        .map(
          (issue, index) => `
            <tr>
              <td>${escapeHtml(issue.status)}</td>
              <td>${escapeHtml(issue.type)}</td>
              <td>${escapeHtml(issue.priority)}</td>
              <td>${escapeHtml(issue.title)}</td>
              <td>${escapeHtml(issue.owner || "-")}</td>
              <td>${escapeHtml(issue.date)}</td>
              <td><button class="status-button" data-issue="${index}" type="button">${issue.status === "Closed" ? "重开" : "关闭"}</button></td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="7">暂无待人工核验事项。你可以先记录 HS 不确定、缺 DG 文件、政策待确认、舱单状态待确认等内容。</td></tr>`;
  renderFailureBoard();
}

function addIssue(event) {
  event.preventDefault();
  state.issues.unshift({
    title: $("issueTitle").value,
    type: $("issueType").value,
    priority: $("issuePriority").value,
    owner: $("issueOwner").value,
    status: "Open",
    date: new Date().toISOString().slice(0, 10)
  });
  saveIssues();
  renderIssues();
  $("issueForm").reset();
}

function toggleIssue(index) {
  const issue = state.issues[index];
  if (!issue) return;
  issue.status = issue.status === "Closed" ? "Open" : "Closed";
  saveIssues();
  renderIssues();
}

function renderFailureBoard() {
  const countTarget = $("failureCount");
  const summaryTarget = $("failureSummaryGrid");
  const listTarget = $("failureEventList");
  const openFailures = state.failures.filter((item) => item.status !== "Closed");
  if (countTarget) countTarget.textContent = openFailures.length;
  if (!summaryTarget || !listTarget) return;
  const modules = ["船期/船位", "箱货/放行", "空运/快件", "政策/趋势", "其他"];
  const moduleCount = (label) =>
    openFailures.filter((item) => {
      const text = normalize(`${item.module} ${item.reason}`);
      if (label === "船期/船位") return /船期|船位|shipment|vessel|eta/.test(text);
      if (label === "箱货/放行") return /箱货|放行|customs|manifest/.test(text);
      if (label === "空运/快件") return /空运|快件|air|dhl|ups|fedex|sf/.test(text);
      if (label === "政策/趋势") return /政策|趋势|policy|trend/.test(text);
      return !/船期|船位|shipment|vessel|eta|箱货|放行|customs|manifest|空运|快件|air|dhl|ups|fedex|sf|政策|趋势|policy|trend/.test(text);
    }).length;
  summaryTarget.innerHTML = modules
    .map((label) => `<article><span>${escapeHtml(label)}</span><strong>${moduleCount(label)}</strong><small>待人工处理</small></article>`)
    .join("");
  listTarget.innerHTML = openFailures.length
    ? openFailures
        .slice(0, 10)
        .map(
          (item, index) => `
            <article class="failure-event-card">
              <div>
                <span>${escapeHtml(item.module)} · ${escapeHtml(item.level)} · ${escapeHtml(formatDateTimeForUser(item.date))}</span>
                <strong>${escapeHtml(item.query || "未填写查询条件")}</strong>
                <p>${escapeHtml(item.reason)}</p>
                <small>Owner：${escapeHtml(item.owner)} · 下一步：${escapeHtml(item.next)}</small>
                ${
                  item.links?.length
                    ? `<div class="source-chip-grid">${item.links.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}</div>`
                    : ""
                }
              </div>
              <button type="button" class="secondary-button" data-failure-to-issue="${index}">转人工核验</button>
            </article>
          `
        )
        .join("")
    : `<article class="failure-event-card muted"><strong>暂无自动查询失败</strong><p>船期、箱货、空运等自动查询失败时，会在这里形成待人工核验事项。</p></article>`;
}

function convertFailureToIssue(index) {
  const openFailures = state.failures.filter((item) => item.status !== "Closed");
  const failure = openFailures[Number(index)];
  if (!failure) return;
  state.issues.unshift({
    title: `${failure.module}：${failure.query || failure.reason}`,
    type: /空运|快件|air/i.test(failure.module) ? "Shipment" : /箱货|放行|customs/i.test(failure.module) ? "Customs / Manifest" : /船期|船位|shipment/i.test(failure.module) ? "Shipment" : "Policy",
    priority: failure.level || "Medium",
    owner: failure.owner || "",
    status: "Open",
    date: new Date().toISOString().slice(0, 10)
  });
  failure.status = "Closed";
  saveIssues();
  saveFailureEvents();
  renderIssues();
}

function clearFailureLog() {
  state.failures = [];
  saveFailureEvents();
  renderFailureBoard();
}

function renderFeedbacks() {
  const list = $("feedbackList");
  if (!list) return;
  list.innerHTML = state.feedbacks.length
    ? state.feedbacks
        .map(
          (item, index) => `
            <article class="feedback-card">
              <div>
                <span>${escapeHtml(item.module)} · ${escapeHtml(item.priority)}</span>
                <strong>${escapeHtml(item.text)}</strong>
                <p>${escapeHtml(item.contact || "未留联系人")} · ${escapeHtml(formatDateTimeForUser(item.date))}</p>
              </div>
              <button type="button" class="secondary-button" data-feedback-delete="${index}">删除</button>
            </article>
          `
        )
        .join("")
    : `<article class="feedback-card muted"><strong>暂无反馈</strong><p>建议先邀请 3-5 位同事测试，每个人记录一个最看不懂或最不准的点。</p></article>`;
}

function addFeedback(event) {
  event.preventDefault();
  const text = $("feedbackText")?.value.trim();
  if (!text) {
    $("feedbackResult").innerHTML = `<article class="alert-card muted"><strong>请先填写反馈内容</strong><p>例如：哪个模块、输入了什么、结果哪里不对。</p></article>`;
    return;
  }
  state.feedbacks.unshift({
    module: $("feedbackModule").value,
    priority: $("feedbackPriority").value,
    contact: $("feedbackContact").value,
    text,
    date: new Date().toISOString()
  });
  saveFeedbacks();
  renderFeedbacks();
  $("feedbackForm").reset();
  $("feedbackResult").innerHTML = `<article class="alert-card success"><strong>已保存反馈</strong><p>已保存到本机浏览器；后续可接邮件、数据库或企业微信/飞书。</p></article>`;
}

function deleteFeedback(index) {
  state.feedbacks.splice(Number(index), 1);
  saveFeedbacks();
  renderFeedbacks();
}

function renderHistory() {
  const list = $("historyList");
  if (!list) return;
  list.innerHTML = state.history.length
    ? state.history
        .map(
          (item) => `
            <article class="history-card">
              <span>${escapeHtml(item.type)}</span>
              <strong>${escapeHtml(item.query)}</strong>
              <p>${escapeHtml(item.result)}</p>
              <small>${escapeHtml(formatDateTimeForUser(item.date))}</small>
            </article>
          `
        )
        .join("")
    : `<article class="history-card muted"><strong>暂无查询历史</strong><p>查询政策、趋势、港口、船期或进口国要求后会自动记录在本机浏览器。</p></article>`;
}

function renderCountryMatrix() {
  if (!$("countryTable")) return;
  $("countryTable").innerHTML = countryRows
    .map(([market, focus, status]) => `<tr><td>${escapeHtml(market)}</td><td>${escapeHtml(focus)}</td><td>${escapeHtml(status)}</td></tr>`)
    .join("");
}

function detectRequirementSignals(productText = "") {
  const text = normalize(productText);
  const signals = [];
  if (/(纸箱|纸盒|彩盒|carton|paperboard box|corrugated|packaging box|包装)/.test(text)) signals.push("packaging");
  if (/(lcd|液晶|显示屏|显示板|显示面板|指示板|indicator panel|display panel|display module)/.test(text)) signals.push("displayPanel");
  if (/(蓝牙|无线|wifi|wi-fi|bluetooth|wireless|radio|tws)/.test(text)) signals.push("wireless");
  if (/(电池|锂|battery|li-ion|charging case|充电盒|power bank)/.test(text)) signals.push("battery");
  if (/(适配器|电源|插头|adapter|charger|power supply|usb-c|type-c)/.test(text)) signals.push("power");
  if (/(耳机|音箱|soundbar|speaker|headphone|earbuds|audio|cd player|播放)/.test(text)) signals.push("audio");
  if (/(维修|配件|零件|spare|repair|part)/.test(text)) signals.push("spare");
  return Array.from(new Set(signals));
}

function findRequirementProfile(country = "") {
  const needle = normalize(country);
  if (!needle) return requirementProfiles[0];
  return (
    requirementProfiles.find((profile) =>
      normalize([profile.market, ...profile.aliases].join(" ")).includes(needle) ||
      profile.aliases.some((alias) => needle.includes(normalize(alias)))
    ) || {
      market: country || "未指定市场",
      aliases: [],
      base: ["该市场暂无完整固定规则库；页面按商品类型输出基础清单，不自动套用美国、欧盟或消费电子要求。"],
      rules: [],
      sources: officialSources.slice(0, 6).map(([title, url]) => [title, url])
    }
  );
}

function labelRequirementSignals(signals = []) {
  const map = {
    packaging: "包装/纸制品",
    displayPanel: "显示/指示面板",
    wireless: "无线/蓝牙",
    battery: "电池/DG",
    power: "电源/适配器",
    audio: "音频整机",
    spare: "维修件/配件"
  };
  return signals.map((signal) => map[signal] || signal);
}

function requirementMaterialsForSignals(signals = []) {
  const base = ["完整中文/英文品名", "品牌", "型号", "材质", "用途", "规格参数", "原产地", "商业发票", "装箱单", "提单/运单"];
  if (signals.includes("packaging")) {
    return ["纸张/纸板材质", "瓦楞或非瓦楞", "是否成型", "是否印刷", "尺寸/规格", "用途：运输包装、销售包装或内包装", "原产地", "商业发票", "装箱单"];
  }
  if (signals.includes("displayPanel")) {
    return ["显示技术：LCD/LED/其他", "是否为显示/指示面板成品", "驱动板或控制接口", "用途主机", "品牌", "型号", "规格书", "商业发票", "装箱单"];
  }
  if (signals.includes("battery")) {
    return [...base, "电池规格书", "UN38.3 Test Summary", "MSDS/SDS", "Wh/电压/容量/数量", "包装方式"];
  }
  if (signals.includes("power")) {
    return [...base, "输入/输出参数", "插头规格", "电气安全证书或测试报告", "标签样稿", "说明书"];
  }
  if (signals.includes("wireless")) {
    return [...base, "无线模块/芯片资料", "频段和功率", "认证证书/测试报告", "标签样稿", "说明书"];
  }
  return base;
}

function buildRequirementSections(profile, product, signals, matchedRules, genericSignals) {
  const productLabels = labelRequirementSignals(signals);
  return [
    {
      title: "这个产品类别通常关注",
      items: [
        productLabels.length ? `系统识别为：${productLabels.join("、")}。` : "未识别到电池、无线、电源、纸箱或显示面板等专项词，按一般商品资料清单处理。",
        `产品描述：${product}`,
        ...profile.base
      ]
    },
    {
      title: "进口前要准备",
      items: [...requirementMaterialsForSignals(signals), ...matchedRules, ...genericSignals]
    },
    {
      title: "执行清单",
      items: [
        "把候选 HS/Commodity code、税率、监管证件、标签语言和进口商信息逐项填完整。",
        "只有命中无线、电池、电源、显示面板等专项词时，才追加对应认证或运输文件。",
        "没有填写的字段不自动联想成尺寸、品牌、用途或原产地。"
      ]
    }
  ];
}

function requirementCountryConclusion(profile = {}, product = "", signals = []) {
  const market = profile.market || "该市场";
  const productName = product || "当前产品";
  const ruleText = profile.base?.[0] || "";
  const parts = [`${market} / ${productName}：先按当地税则确认 HS/税率和进口商责任。`];
  if (signals.includes("packaging")) parts.push("产品命中包装/纸制品方向，重点是材质、瓦楞或非瓦楞、尺寸、是否印刷、成型状态和用途；不生成电池、无线或电源类资料要求。");
  if (signals.includes("displayPanel")) parts.push("产品命中 LCD/显示板/指示板方向，重点核对 8531 显示/指示面板边界、显示技术、接口、用途主机、品牌和型号。");
  if (/美国|US/i.test(market)) parts.push("美国侧重点是 HTS、CBP 估价/原产地、FCC（无线时）、301/232/AD/CVD 等额外贸易措施。");
  else if (/欧盟|EU/i.test(market)) parts.push("欧盟侧重点是 CE/RED、RoHS、REACH、WEEE/EPR、电池法规和欧盟责任人/进口商资料。");
  else if (/英国|UK/i.test(market)) parts.push("英国侧重点是 UKCA/UK Radio Equipment、进口商信息、英文标签、包装和电池责任。");
  else if (/日本/i.test(market)) parts.push("日本侧重点是日本税则、PSE（电气用品）、TELEC/MIC（无线）和日文标签/进口商资料。");
  else if (/泰国/i.test(market)) parts.push("泰国侧重点是 Thai Customs、NBTC（无线）、TISI（电气/标准）和进口商授权资料。");
  else if (/巴西/i.test(market)) parts.push("巴西侧重点是 NCM、Siscomex/Receita Federal、ANATEL（无线）、INMETRO（受监管产品）和葡语标签。");
  else if (/中国/i.test(market)) parts.push("中国侧重点是 10 位商品编码、监管条件、检验检疫、3C/SRRC 边界和中文申报要素。");
  else parts.push(ruleText || "该市场暂无完整固定规则库，先按官方税则、认证、标签、进口商资料和物流限制逐项确认。");
  if (signals.includes("wireless")) parts.push("因为命中无线/蓝牙，必须单列无线认证、频段/功率、标签和测试报告。");
  if (signals.includes("battery")) parts.push("因为命中电池，必须单列 MSDS/SDS、UN38.3、Wh、包装方式和承运限制。");
  if (signals.includes("power")) parts.push("因为命中电源/适配器，必须单列输入输出、电气安全认证、插头和能效/标签要求。");
  return parts.join(" ");
}

async function queryRequirements(event) {
  event.preventDefault();
  const shouldRecord = event?.type === "submit";
  const product = $("requirementProduct").value || "消费类音频产品";
  const country = $("requirementCountry").value || "中国";
  const profile = findRequirementProfile(country);
  const signals = detectRequirementSignals(product);
  const matchedRules = profile.rules
    .filter(([signal]) => signals.includes(signal))
    .map(([, text]) => text);
  const genericSignals = [];
  if (signals.includes("spare")) genericSignals.push("维修件/配件：确认是否专用于整机、是否单独销售、是否需要按零件归类。");
  if (signals.includes("packaging")) genericSignals.push("包装/纸制品：没有填写尺寸、品牌、用途时，页面只提示需要补充，不自动生成具体值。");
  if (!matchedRules.length && !genericSignals.length) genericSignals.push("没有命中电池/无线/电源等明显高风险词；按输入内容准备品名、规格、用途、材质、品牌和型号，不额外假设电池或无线。");
  const level = signals.includes("battery") || signals.includes("wireless") ? "中高关注" : signals.includes("power") ? "中等关注" : "常规关注";
  const sections = buildRequirementSections(profile, product, signals, matchedRules, genericSignals);
  const sources = profile.sources?.length ? profile.sources : officialSources.slice(0, 6).map(([title, url]) => [title, url]);

  $("requirementResult").innerHTML = `<article class="requirement-card"><strong>正在查询进口国要求...</strong><p>优先尝试可免费接入的官方 API；如果该国家暂无 API，则返回规则库结论和官方入口。</p></article>`;
  if (shouldRecord) {
    showQueryOverlay("正在查询进口国要求", `${country} / ${product}。正在整理海关、认证、标签、电池和清关资料结论。`, "Country Requirements");
  }

  if (location.protocol.startsWith("http")) {
    try {
      const params = new URLSearchParams({ product, country, origin: $("requirementOrigin")?.value || $("originCountry")?.value || $("tariffCheckOrigin")?.value || "" });
      const data = await fetchJsonOrFallback(`/.netlify/functions/requirement-check?${params.toString()}`, null);
      if (data?.ok) {
        renderRequirementResult(data);
        if (shouldRecord) addHistory("进口国要求", `${country} / ${product}`, data.conclusion || data.customsConclusion || "已生成进口国要求结论");
        if (shouldRecord) hideQueryOverlay();
        return;
      }
    } catch {
      // Fall back to the local rule result below.
    }
  }

  const fallbackResult = {
    ok: false,
    source: "本地目的国规则库",
    updatedAt: new Date().toISOString(),
    market: profile.market,
    product,
    level,
    signals: labelRequirementSignals(signals),
    conclusion: requirementCountryConclusion(profile, product, signals),
    customsConclusion: profile.base.join(" "),
    sections,
    sources
  };
  renderRequirementResult(fallbackResult);
  if (shouldRecord) addHistory("进口国要求", `${country} / ${product}`, fallbackResult.conclusion);
  if (shouldRecord) hideQueryOverlay();
}

function renderRequirementResult(data = {}) {
  const sections = Array.isArray(data.sections)
    ? data.sections.filter((section) => section.title !== "结论" && Array.isArray(section.items) && section.items.length)
    : [];
  const tariffCandidates = Array.isArray(data.tariffCandidates) ? data.tariffCandidates : [];
  const apiSections = sections.filter((section) => /官方税则|API|命中/i.test(section.title || ""));
  const detailSections = sections.filter((section) => !/官方税则|API|命中/i.test(section.title || "") && !(tariffCandidates.length && section.title === "直接结果"));
  const sources = Array.isArray(data.sources) ? data.sources : [];
  const evidence = Array.isArray(data.evidence) ? data.evidence : [];
  const gaps = Array.isArray(data.gaps) ? data.gaps : [];
  const actionItems = Array.isArray(data.actionItems) ? data.actionItems : [];
  const apiStatus = Array.isArray(data.apiStatus) ? data.apiStatus : [];
  const declarationElements = Array.isArray(data.declarationElements) ? data.declarationElements : [];
  const regulatoryNotes = Array.isArray(data.regulatoryNotes) ? data.regulatoryNotes : [];
  const redFlags = Array.isArray(data.redFlags) ? data.redFlags : [];
  const nextQuestions = Array.isArray(data.nextQuestions) ? data.nextQuestions : [];
  const originAssessment = data.originAssessment && typeof data.originAssessment === "object" ? data.originAssessment : null;
  const confidenceText = [data.confidenceScore ? `${data.confidenceScore}/100` : "", data.confidenceLabel || ""].filter(Boolean).join(" · ") || "待复核";
  $("requirementResult").innerHTML = `
    <article class="requirement-card">
      <div class="requirement-summary-grid">
        <div>
          <span>进口国/地区</span>
          <strong>${escapeHtml(data.market || "未指定市场")}</strong>
        </div>
        <div>
          <span>风险关注</span>
          <strong>${escapeHtml(data.level || "常规关注")}</strong>
        </div>
        <div>
          <span>识别类别</span>
          <strong>${escapeHtml((data.signals || []).join("、") || "一般商品")}</strong>
        </div>
        <div>
          <span>结论可信度</span>
          <strong>${escapeHtml(confidenceText)}</strong>
        </div>
      </div>
      <div class="requirement-conclusion">
        <strong>结论</strong>
        <p>${escapeHtml(data.conclusion || data.customsConclusion || "请先确认海关编码、税率、监管证件和产品合规要求。")}</p>
        ${data.customsConclusion ? `<p>${escapeHtml(data.customsConclusion)}</p>` : ""}
      </div>
      ${
        data.independentOpinion
          ? `<section class="requirement-section requirement-direct-result">
              <h3>我的独立判断</h3>
              <p>${escapeHtml(data.independentOpinion)}</p>
              ${originAssessment ? `<small>${escapeHtml(originAssessment.label || "原产地判断")}：${escapeHtml(originAssessment.opinion || "")}</small>` : ""}
            </section>`
          : ""
      }
      ${
        tariffCandidates.length
          ? `<section class="requirement-section requirement-direct-result">
              <h3>直接匹配结果</h3>
              <div class="tariff-candidate-grid">
                ${tariffCandidates
                  .map(
                    (candidate) => `
                      <article class="tariff-candidate-card">
                        <span>${escapeHtml(candidate.codeDisplay || candidate.code || "税号待确认")}</span>
                        <strong>${escapeHtml(candidate.name || "商品名称待确认")}</strong>
                        <p>${escapeHtml(candidate.rationale || "系统根据输入品名和规则库匹配。")}</p>
                        <small>${escapeHtml(candidate.appliedRateType || "适用税率")} ${escapeHtml(candidate.appliedRate || "待确认")} · 最惠国 ${escapeHtml(candidate.mfnRate || "待确认")} · 普通 ${escapeHtml(candidate.ordinaryRate || "待确认")}</small>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>`
          : ""
      }
      ${
        declarationElements.length || regulatoryNotes.length || redFlags.length || nextQuestions.length
          ? `<div class="requirement-action-grid">
              ${
                declarationElements.length
                  ? `<section class="requirement-section">
                      <h3>中国申报要素</h3>
                      <ul>${declarationElements.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </section>`
                  : ""
              }
              ${
                regulatoryNotes.length
                  ? `<section class="requirement-section">
                      <h3>监管/认证判断</h3>
                      <ul>${regulatoryNotes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </section>`
                  : ""
              }
              ${
                redFlags.length
                  ? `<section class="requirement-section requirement-gap-card">
                      <h3>红旗风险</h3>
                      <ul>${redFlags.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </section>`
                  : ""
              }
              ${
                nextQuestions.length
                  ? `<section class="requirement-section">
                      <h3>下一步追问</h3>
                      <ul>${nextQuestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </section>`
                  : ""
              }
            </div>`
          : ""
      }
      ${
        actionItems.length || gaps.length
          ? `<div class="requirement-action-grid">
              ${
                actionItems.length
                  ? `<section class="requirement-section">
                      <h3>可执行动作</h3>
                      <ul>${actionItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </section>`
                  : ""
              }
              ${
                gaps.length
                  ? `<section class="requirement-section requirement-gap-card">
                      <h3>需要补充/人工复核</h3>
                      <ul>${gaps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    </section>`
                  : ""
              }
            </div>`
          : ""
      }
      ${
        apiSections.length
          ? `<div class="requirement-api-strip">
              ${apiSections
                .map(
                  (section) => `
                    <div>
                      <span>${escapeHtml(section.title)}</span>
                      <strong>${escapeHtml((section.items || [])[0] || "暂无直接 API 编码命中。")}</strong>
                    </div>
                  `
                )
                .join("")}
            </div>`
          : ""
      }
      ${
        apiStatus.length
          ? `<div class="requirement-api-status" aria-label="API 接入状态">
              ${apiStatus.map((item) => `<span><b>${escapeHtml(item.source || "数据源")}</b>${escapeHtml(item.status || "状态待确认")}</span>`).join("")}
            </div>`
          : ""
      }
      <div class="requirement-section-grid">
        ${detailSections
          .map(
            (section) => `
              <section class="requirement-section">
                <h3>${escapeHtml(section.title)}</h3>
                <ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </section>
            `
          )
          .join("")}
      </div>
      ${
        evidence.length
          ? `<section class="requirement-section source-card-compact">
              <h3>证据链</h3>
              <div class="evidence-card-grid">
                ${evidence
                  .map(
                    (item) => `
                      <article class="evidence-card">
                        <span>${escapeHtml(item.sourceType || "来源")}</span>
                        <strong>${escapeHtml(item.title || "未命名来源")}</strong>
                        <p>${escapeHtml(item.usedFor || "用于核验结论。")}</p>
                        ${item.match ? `<small>${escapeHtml(item.match)}</small>` : ""}
                        ${item.url ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">打开来源</a>` : ""}
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>`
          : ""
      }
      <section class="requirement-section source-card-compact">
        <h3>数据来源</h3>
        <div class="source-chip-grid">
          ${sources.map(([title, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join("")}
        </div>
      </section>
      <small>数据源：${escapeHtml(data.source || "规则库")} · ${escapeHtml(formatEta(data.updatedAt))}。未填写的品牌、型号、尺寸、用途或原产地不会自动补全。</small>
    </article>
  `;
}

function loadRequirementExample() {
  $("requirementProduct").value = "蓝牙耳机，内置锂电池，带充电盒，USB-C 充电，零售包装";
  $("requirementCountry").value = "欧盟";
  if ($("requirementOrigin")) $("requirementOrigin").value = "中国";
  queryRequirements(new Event("submit"));
}

function formatDateTimeForUser(value = "") {
  if (!value) return "未填写 ETA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function saveVesselAlert(event) {
  event.preventDefault();
  const rule = {
    id: Date.now().toString(36),
    vessel: $("alertVesselName").value || $("vesselName").value || "未填写船名",
    destination: $("alertDestination").value || $("destinationPort").value || "未填写目的港",
    expectedEta: $("alertExpectedEta").value,
    email: $("alertEmail").value || "未填写邮箱",
    rule: $("alertRule").value,
    createdAt: new Date().toISOString()
  };
  state.vesselAlerts.unshift(rule);
  saveVesselAlerts();
  renderVesselAlerts();
  syncVesselAlertRule(rule);
  $("vesselAlertResult").innerHTML = `
    <article class="alert-card success">
      <strong>已保存预警规则</strong>
      <p>${escapeHtml(rule.vessel)} 前往 ${escapeHtml(rule.destination)}，${escapeHtml(rule.rule === "late_eta" ? "实际 ETA 晚于预想 ETA 时提醒" : "ETA 前一个工作日提醒")}。已先保存在本机；如配置低成本后端存储和邮件服务，会进入自动提醒。</p>
    </article>
  `;
  addHistory("ETA 预警", `${rule.vessel} -> ${rule.destination}`, rule.rule === "late_eta" ? "实际 ETA 晚于预想 ETA 时提醒" : "ETA 前一个工作日提醒");
  $("vesselAlertForm").reset();
}

async function syncVesselAlertRule(rule) {
  if (!location.protocol.startsWith("http")) return;
  try {
    const response = await fetch("/.netlify/functions/alert-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rule })
    });
    const data = await response.json();
    if (!data.storageConfigured) {
      $("vesselAlertResult").innerHTML += `<article class="alert-card muted"><strong>邮件提醒未完全启用</strong><p>服务器可保存规则；要自动发 163 邮件，还需要在服务器配置 SMTP_HOST=smtp.163.com、邮箱账号和 163 SMTP 授权码。</p></article>`;
    } else {
      $("vesselAlertResult").innerHTML += `<article class="alert-card success"><strong>已同步到服务器</strong><p>规则已保存到后端。配置 163 SMTP 授权码后，定时任务即可按 ETA 触发邮件。</p></article>`;
    }
  } catch {
    // Local alert remains available even if backend sync is not configured.
  }
}

function removeVesselAlert(id) {
  state.vesselAlerts = state.vesselAlerts.filter((item) => item.id !== id);
  saveVesselAlerts();
  renderVesselAlerts();
}

function renderVesselAlerts() {
  const list = $("vesselAlertList");
  if (!list) return;
  list.innerHTML = state.vesselAlerts.length
    ? state.vesselAlerts
        .map(
          (item) => `
            <article class="alert-card">
              <div>
                <span>${escapeHtml(item.rule === "late_eta" ? "ETA 延误预警" : "到港前提醒")}</span>
                <strong>${escapeHtml(item.vessel)} -> ${escapeHtml(item.destination)}</strong>
                <p>预想 ETA：${escapeHtml(formatDateTimeForUser(item.expectedEta))}；提醒邮箱：${escapeHtml(item.email)}</p>
                <small>自动发邮件上线条件：后端定时查询船讯网/船司数据 + 邮件 API + 邮箱白名单。</small>
              </div>
              <button type="button" class="secondary-button" data-alert-delete="${escapeHtml(item.id)}">删除</button>
            </article>
          `
        )
        .join("")
    : `<article class="alert-card muted"><strong>暂无关注船舶</strong><p>保存规则后，这里会显示需要跟踪的船和 ETA 风险。</p></article>`;
}

function toCsv(rows, headers) {
  return [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n");
}

function csvCell(value) {
  const text = String(value || "");
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function download(filename, content) {
  downloadBlob(filename, content, "text/csv;charset=utf-8");
}

function downloadBlob(filename, content, type = "application/octet-stream") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function learningVisualHtml(type = "boxes") {
  return `
    <div class="step-visual visual-${escapeHtml(type)}" aria-hidden="true">
      <span class="visual-sun"></span>
      <span class="visual-line"></span>
      <span class="visual-box one"></span>
      <span class="visual-box two"></span>
      <span class="visual-truck"></span>
      <span class="visual-ship"></span>
      <span class="visual-crane"></span>
      <span class="visual-doc"></span>
      <span class="visual-stamp"></span>
    </div>
  `;
}

function renderLearningFlow() {
  const target = $("learningFlow");
  if (!target) return;
  const activeSteps = learningState.processMode === "air" ? airLearningSteps : learningSteps;
  const rows = activeSteps.filter((step) => {
    const filterTokens = learningState.filter === "all" ? [] : learningState.filter.split("|").filter(Boolean);
    const stepText = [
      step.phase,
      step.title,
      step.summary,
      (step.actions || []).join(" "),
      (step.documents || []).join(" ")
    ].join(" ");
    const phaseHit = !filterTokens.length || filterTokens.some((token) => stepText.includes(token));
    const roleText = [step.owners, Object.keys(step.roleTips || {})].flat().join(" ");
    const roleHit = learningState.role === "all" || roleText.includes(learningState.role);
    return phaseHit && roleHit;
  });
  target.innerHTML = rows
    .map(
      (step) => `
        <button type="button" class="learning-step-card" data-learn-step="${escapeHtml(step.id)}">
          ${learningVisualHtml(step.visual)}
          <span class="step-node">${escapeHtml(step.no)} · ${escapeHtml(step.phase)}</span>
          <strong>${escapeHtml(step.title)}</strong>
          <p>${escapeHtml(step.summary)}</p>
          <small>点击看详细分工和风险</small>
        </button>
      `
    )
    .join("") || `<article class="learning-empty"><strong>这个筛选下暂无节点</strong><p>换一个阶段或角色再看。</p></article>`;
}

function learningList(title = "", items = []) {
  return `
    <article class="learning-detail-card">
      <span>${escapeHtml(title)}</span>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function buildLearningStepHtml(step = {}) {
  const roleTips = Object.entries(step.roleTips || {}).map(([role, text]) => `${role}：${text}`);
  return `
    <div class="learning-detail">
      <div class="learning-detail-hero">
        ${learningVisualHtml(step.visual)}
        <div>
          <span>${escapeHtml(step.no)} · ${escapeHtml(step.phase)}</span>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.summary)}</p>
        </div>
      </div>
      <div class="learning-detail-grid">
        ${learningList("谁负责", step.owners || [])}
        ${learningList("具体做什么", step.actions || [])}
        ${learningList("文件/系统", step.documents || [])}
        ${learningList("常见风险", step.risks || [])}
        ${learningList("常见误区", step.mistakes || [])}
        ${learningList("完成标准", step.done || [])}
        ${learningList("按角色看重点", roleTips)}
      </div>
      <div class="learning-input-box">
        <strong>想让系统判断更准，需要补这些信息</strong>
        <div>${(step.inputs || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </div>
    </div>
  `;
}

function openLearningStep(stepId = "") {
  const activeSteps = learningState.processMode === "air" ? airLearningSteps : learningSteps;
  const step = activeSteps.find((item) => item.id === stepId);
  if (!step) return;
  openResultDialog(step.title, `${step.no} · ${step.phase}`, buildLearningStepHtml(step));
}

function setLearningButtonState(selector, attr, value) {
  document.querySelectorAll(selector).forEach((button) => {
    button.classList.toggle("active", button.dataset[attr] === value);
  });
}

function activateKnowledgeView(view = "process") {
  const activeView = view === "glossary" ? "glossary" : "process";
  document.querySelectorAll("[data-knowledge-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.knowledgeView === activeView);
  });
  $("knowledgeProcessPanel")?.classList.toggle("active", activeView === "process");
  $("knowledgeGlossaryPanel")?.classList.toggle("active", activeView === "glossary");
  if (activeView === "glossary") renderGlossary();
}

function renderGlossary() {
  const target = $("glossaryGrid");
  if (!target) return;
  const query = glossaryState.search.trim().toLowerCase();
  const rows = glossaryTerms.filter((item) => {
    const categoryHit = glossaryState.category === "all" || item.category === glossaryState.category;
    const text = [item.term, item.cn, item.short, item.plain, item.when, item.risk, item.example, item.category].join(" ").toLowerCase();
    const searchHit = !query || text.includes(query);
    return categoryHit && searchHit;
  });
  target.innerHTML = rows.length
    ? rows
        .map(
          (item) => `
            <button type="button" class="glossary-card" data-glossary-term="${escapeHtml(item.id)}">
              <span>${escapeHtml(item.category)}</span>
              <strong>${escapeHtml(item.term)}</strong>
              <em>${escapeHtml(item.cn)}</em>
              <p>${escapeHtml(item.short)}</p>
              <small>点开看人话解释和风险</small>
            </button>
          `
        )
        .join("")
    : `<article class="glossary-empty"><strong>没有找到这个术语</strong><p>换个关键词试试，比如 ETA、报关、税率、UN38.3、认证。</p></article>`;
}

function buildGlossaryHtml(item = {}) {
  return `
    <div class="glossary-detail">
      <div class="glossary-detail-hero">
        <span>${escapeHtml(item.category)}</span>
        <h3>${escapeHtml(item.term)}</h3>
        <strong>${escapeHtml(item.cn)}</strong>
        <p>${escapeHtml(item.short)}</p>
      </div>
      <div class="glossary-detail-grid">
        <article>
          <span>翻成人话</span>
          <p>${escapeHtml(item.plain)}</p>
        </article>
        <article>
          <span>什么时候看</span>
          <p>${escapeHtml(item.when)}</p>
        </article>
        <article>
          <span>容易出错</span>
          <p>${escapeHtml(item.risk)}</p>
        </article>
        <article>
          <span>小例子</span>
          <p>${escapeHtml(item.example)}</p>
        </article>
      </div>
    </div>
  `;
}

function openGlossaryTerm(termId = "") {
  const item = glossaryTerms.find((term) => term.id === termId);
  if (!item) return;
  openResultDialog(`${item.term} / ${item.cn}`, `术语库 · ${item.category}`, buildGlossaryHtml(item));
}

function workspaceElementsFor(selectors = []) {
  return selectors.flatMap((selector) => {
    if (selector.startsWith(".")) return Array.from(document.querySelectorAll(selector));
    const element = $(selector);
    return element ? [element] : [];
  });
}

function syncNavGroups(activeId = "dashboard") {
  document.querySelectorAll(".nav-groups .nav-group").forEach((group) => {
    const hasActiveLink = !!group.querySelector(`a[href="#${activeId}"]`);
    group.open = hasActiveLink;
  });
}

function activateWorkspaceModule(moduleId = "dashboard", push = false) {
  let id = workspaceModules[moduleId] ? moduleId : "dashboard";
  if (id !== "dashboard" && !isAccessGranted()) {
    requireAccess();
    id = "dashboard";
    if (location.hash && location.hash !== "#dashboard") {
      history.replaceState(null, "", "#dashboard");
    }
  }
  const allSelectors = Array.from(new Set(Object.values(workspaceModules).flatMap((item) => item.selectors)));
  workspaceElementsFor(allSelectors).forEach((element) => {
    element.classList.add("workspace-hidden");
  });
  workspaceElementsFor(workspaceModules[id].selectors).forEach((element) => {
    element.classList.remove("workspace-hidden");
  });
  document.body.dataset.activeModule = id;
  document.querySelectorAll('.nav-groups a[href^="#"], .mobile-quick-nav a[href^="#"], .module-launch-card[href^="#"]').forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
  syncNavGroups(id);
  if (push) {
    history.pushState(null, "", `#${id}`);
  } else if (!location.hash || location.hash === "#") {
    history.replaceState(null, "", "#dashboard");
  }
  document.title = `${workspaceModules[id].title} - LogisMaster 物流查询平台`;
  if (id === "shipment" && vesselMapState.map) {
    window.setTimeout(() => vesselMapState.map.invalidateSize(), 80);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initWorkspaceNavigation() {
  document.querySelectorAll('.nav-groups a[href^="#"], .mobile-quick-nav a[href^="#"], .module-launch-card[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href").replace("#", "");
      if (!workspaceModules[id]) return;
      event.preventDefault();
      activateWorkspaceModule(id, true);
    });
  });
  window.addEventListener("hashchange", () => {
    const id = (location.hash || "#dashboard").replace("#", "");
    activateWorkspaceModule(id, false);
  });
  activateWorkspaceModule((location.hash || "#dashboard").replace("#", ""), false);
  markAccessReady();
}

function activateTab(targetId = "") {
  const target = $(targetId);
  if (!target) return;
  const scope = targetId.startsWith("shipment-")
    ? $("shipment")
    : targetId.startsWith("policy-")
      ? $("policy")
      : targetId.startsWith("hs-")
        ? $("hs")
        : target.closest("section") || document;
  scope.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === targetId);
  });
  scope.querySelectorAll("[data-tab-target]").forEach((button) => {
    const active = button.dataset.tabTarget === targetId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  if (targetId.includes("shipment") && vesselMapState.map) {
    window.setTimeout(() => vesselMapState.map.invalidateSize(), 80);
  }
}

function initModuleTabs() {
  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
  });
}

function openResultDialog(title = "生成结果", subtitle = "Result", html = "") {
  const dialog = $("resultDialog");
  if (!dialog) return;
  $("resultDialogTitle").textContent = title;
  $("resultDialogSubtitle").textContent = subtitle;
  $("resultDialogBody").innerHTML = html;
  dialog.hidden = false;
  document.body.classList.add("modal-open");
}

function closeResultDialog() {
  const dialog = $("resultDialog");
  if (!dialog) return;
  dialog.hidden = true;
  $("resultDialogBody").innerHTML = "";
  document.body.classList.remove("modal-open");
}

function bindEvents() {
  initAccessGate();
  initWorkspaceNavigation();
  initModuleTabs();
  renderLearningFlow();
  renderGlossary();
  renderHsCaseSelect();
  updateHsSmartAssist();
  $("globalSearchForm")?.addEventListener("submit", runGlobalSearch);
  $("globalSearchInput")?.addEventListener("input", () => {
    renderGlobalSearchResult($("globalSearchInput")?.value || "");
  });
  $("globalSearchChips")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-global-query]");
    if (!button) return;
    $("globalSearchInput").value = button.dataset.globalQuery || "";
    runGlobalSearch(new Event("submit"));
  });
  $("globalSearchResult")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-global-module]");
    if (!button) return;
    if (!requireAccess()) return;
    const query = button.dataset.globalQuery || $("globalSearchInput")?.value || "";
    const moduleId = button.dataset.globalModule || "";
    applyGlobalSearchFill(moduleId, query);
    activateWorkspaceModule(moduleId, true);
    await executeGlobalSearchModule(moduleId, query);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy-inquiry]");
    if (!button) return;
    const kind = button.dataset.copyInquiry;
    copyTextToClipboard(kind === "air" ? buildAirFreightInquiryText() : buildSeaLoadInquiryText(), kind === "air" ? "airCopyStatus" : "seaCopyStatus");
  });
  $("productForm").addEventListener("submit", recommend);
  ["productName", "englishName"].forEach((id) => {
    $(id)?.addEventListener("input", () => updateHsSmartAssist({ manualCategory: false }));
  });
  $("productCategory")?.addEventListener("change", () => {
    hsAutoCategory = "";
    updateHsSmartAssist({ manualCategory: true });
  });
	  $("hsSmartAssist")?.addEventListener("click", (event) => {
	    const button = event.target.closest("[data-fill-field]");
	    if (button) appendFieldValue(button.dataset.fillField, button.dataset.fillValue);
	    if (event.target.closest("#preciseHsJudge")) {
	      syncSmartParamsToSpec();
	      recommend(new Event("submit"));
	    }
	  });
  $("hsSmartAssist")?.addEventListener("change", (event) => {
    if (event.target.matches("[data-smart-param]")) syncSmartParamsToSpec();
  });
  $("hsSmartAssist")?.addEventListener("input", (event) => {
    if (event.target?.id === "smartParamExtra") syncSmartParamsToSpec();
  });
  $("tariffCheckForm")?.addEventListener("submit", evaluateTariffCheck);
  $("cccCheckForm")?.addEventListener("submit", evaluateCccCheck);
  $("fillCccFromHs")?.addEventListener("click", fillCccFromCurrentHs);
  $("loadExample").addEventListener("click", loadExample);
  $("clearForm").addEventListener("click", clearForm);
  $("loadHsCase")?.addEventListener("click", () => fillHsValidationCase($("hsCaseSelect")?.value || ""));
  $("hsCaseSelect")?.addEventListener("change", () => {
    const testCase = hsValidationCases.find((item) => item.id === $("hsCaseSelect")?.value);
    setHsCaseNote(testCase ? `预期：${testCase.expected}。${testCase.boundary}` : "");
  });
  $("runHsSelfTest")?.addEventListener("click", runHsValidationSuite);
  $("userSelect")?.addEventListener("change", updateRole);
  $("sourceSearch")?.addEventListener("input", () => renderSources($("sourceSearch").value));
  $("decisionForm")?.addEventListener("submit", evaluateDecisionSupport);
  $("loadDecisionExample")?.addEventListener("click", loadDecisionExample);
  $("clearDecision")?.addEventListener("click", clearDecisionSupport);
  $("shipmentForm").addEventListener("submit", queryShipment);
  $("seaPortLookupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSeaPortLookup($("seaPortLookupInput")?.value || "");
  });
  $("seaPortLookupInput")?.addEventListener("input", () => renderSeaPortLookup($("seaPortLookupInput")?.value || ""));
  $("seaLoadForm")?.addEventListener("submit", evaluateSeaLoad);
  $("loadSeaCalcExample")?.addEventListener("click", loadSeaCalcExample);
  ["seaLength", "seaWidth", "seaHeight", "seaCartons", "seaGrossWeight", "seaRate", "seaLocalFees", "seaContainerType", "seaPackingMode"].forEach((id) => {
    $(id)?.addEventListener("input", () => evaluateSeaLoad({ preventDefault() {} }));
    $(id)?.addEventListener("change", () => evaluateSeaLoad({ preventDefault() {} }));
  });
  evaluateSeaLoad({ preventDefault() {} });
  populateSeaSpecialPorts("shanghai");
  $("seaSpecialPort")?.addEventListener("change", () => {
    populateSeaSpecialTerminals($("seaSpecialPort")?.value || "shanghai");
    renderSeaSpecialGuide({ preventDefault() {} });
  });
  $("seaSpecialTerminal")?.addEventListener("change", () => renderSeaSpecialGuide({ preventDefault() {} }));
  $("seaSpecialType")?.addEventListener("change", () => renderSeaSpecialGuide({ preventDefault() {} }));
  $("seaSpecialForm")?.addEventListener("submit", renderSeaSpecialGuide);
  renderSeaSpecialGuide({ preventDefault() {} });
  $("seaOpsFeeForm")?.addEventListener("submit", renderSeaOpsFees);
  $("seaOpsFeePort")?.addEventListener("change", () => {
    populateSeaOpsFeeTerminals($("seaOpsFeePort")?.value || "shanghai");
    renderSeaOpsFees({ preventDefault() {} });
  });
  $("seaOpsFeeNode")?.addEventListener("change", renderSeaOpsFees);
  $("seaOpsFeeType")?.addEventListener("change", renderSeaOpsFees);
  $("runShippingScript")?.addEventListener("click", runShippingBrowserScript);
  $("refreshShippingSources")?.addEventListener("click", () => loadShippingSources());
  $("loadVesselExample").addEventListener("click", loadVesselExample);
  populateCustomsPortSelect();
  renderCustomsPortMatrix($("customsPortSelect")?.value || "shanghai");
  $("customsPortSelect")?.addEventListener("change", () => {
    const profile = customsPortById($("customsPortSelect")?.value || "shanghai");
    if ($("customsCode")) $("customsCode").value = profile.name;
    renderCustomsPortMatrix(profile.id);
    renderCustomsAdvice($("blNo")?.value || "未填写提单号", $("containerNo")?.value || "未填写箱号", $("customsDirection")?.value || "进口 Import", profile.name, profile);
  });
  $("customsPortMatrix")?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-customs-port-id]");
    if (!card) return;
    const profile = customsPortById(card.dataset.customsPortId || "shanghai");
    if ($("customsPortSelect")) $("customsPortSelect").value = profile.id;
    if ($("customsCode")) $("customsCode").value = profile.name;
    renderCustomsPortMatrix(profile.id);
    renderCustomsAdvice($("blNo")?.value || "未填写提单号", $("containerNo")?.value || "未填写箱号", $("customsDirection")?.value || "进口 Import", profile.name, profile);
  });
  $("customsCode")?.addEventListener("input", () => {
    const profile = inferCustomsPortProfile($("customsCode")?.value || "");
    if ($("customsPortSelect")) $("customsPortSelect").value = profile.id;
    renderCustomsPortMatrix(profile.id);
  });
  $("customsForm")?.addEventListener("submit", queryCustoms);
	  $("airTrackingForm")?.addEventListener("submit", queryAirTracking);
  $("airportLookupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderAirportLookup($("airportLookupInput")?.value || "");
  });
  $("airportLookupInput")?.addEventListener("input", () => renderAirportLookup($("airportLookupInput")?.value || ""));
  $("airFreightCalcForm")?.addEventListener("submit", evaluateAirFreightCalc);
  $("loadAirCalcExample")?.addEventListener("click", loadAirCalcExample);
  ["airLength", "airWidth", "airHeight", "airPieces", "airGrossWeight", "airRate", "airSurcharges", "airFreightMode", "airCargoNature"].forEach((id) => {
    $(id)?.addEventListener("input", () => evaluateAirFreightCalc({ preventDefault() {} }));
    $(id)?.addEventListener("change", () => evaluateAirFreightCalc({ preventDefault() {} }));
  });
  evaluateAirFreightCalc({ preventDefault() {} });
  $("airOpsFeeForm")?.addEventListener("submit", renderAirOpsFees);
  $("airOpsFeeNode")?.addEventListener("change", renderAirOpsFees);
  $("airOpsFeeType")?.addEventListener("change", renderAirOpsFees);
	  $("loadAirExample")?.addEventListener("click", loadAirExample);
	  $("airGuideForm")?.addEventListener("submit", evaluateAirGuide);
	  $("loadAirGuideExample")?.addEventListener("click", loadAirGuideExample);
	  ["airProduct", "airDestination"].forEach((id) => $(id)?.addEventListener("input", () => renderAirChecklist($("airProduct")?.value || "", $("airDestination")?.value || "")));
  $("runCustomsScript")?.addEventListener("click", runCustomsBrowserScript);
  $("loadCustomsExample")?.addEventListener("click", () => {
    $("blNo").value = "示例提单号";
    $("containerNo").value = "MSKU1234567";
    $("customsDirection").value = "进口 Import";
    if ($("customsPortSelect")) $("customsPortSelect").value = "shanghai";
    $("customsCode").value = "上海港";
    renderCustomsPortMatrix("shanghai");
    renderCustomsAdvice("示例提单号", "MSKU1234567", "进口 Import", "上海港", customsPortById("shanghai"));
  });
  $("summarizeCustomsManual")?.addEventListener("click", summarizeCustomsManualResult);
  $("clearCustomsManual")?.addEventListener("click", () => {
    $("customsManualPaste").value = "";
    $("customsManualSummary").innerHTML = "";
  });
  const invoiceDocForm = $("invoiceDocForm");
  invoiceDocForm?.addEventListener("submit", renderInvoiceDoc);
  invoiceDocForm?.addEventListener("input", () => renderInvoiceDoc({ preventDefault() {} }));
  invoiceDocForm?.addEventListener("change", () => renderInvoiceDoc({ preventDefault() {} }));
  renderInvoiceDoc({ preventDefault() {} });
  $("showInvoiceMode")?.addEventListener("click", () => setInvoiceDocumentMode("invoice"));
  $("showPackingMode")?.addEventListener("click", () => setInvoiceDocumentMode("packing"));
  $("addInvoiceItemRow")?.addEventListener("click", () => {
    addInvoiceItemRow();
    renderInvoiceDoc({ preventDefault() {} });
  });
  $("loadInvoiceExample")?.addEventListener("click", loadInvoiceExample);
  $("validateInvoiceDoc")?.addEventListener("click", validateInvoiceDoc);
  $("copyInvoiceDoc")?.addEventListener("click", () => copyTextToClipboard(invoiceDocSummary(), ""));
  $("printInvoiceDoc")?.addEventListener("click", () => printDocumentPaper("docs-invoice"));
  const declarationDocForm = $("declarationDocForm");
  declarationDocForm?.addEventListener("submit", renderDeclarationDoc);
  declarationDocForm?.addEventListener("input", () => {
    renderDeclarationBeginnerTips();
    if (declarationValidationActive) renderDeclarationDoc({ preventDefault() {} });
  });
  declarationDocForm?.addEventListener("change", () => {
    renderDeclarationBeginnerTips();
    if (declarationValidationActive) renderDeclarationDoc({ preventDefault() {} });
  });
  $("loadDeclarationExample")?.addEventListener("click", loadDeclarationExample);
  $("validateDeclarationDoc")?.addEventListener("click", validateDeclarationDoc);
  $("downloadDeclarationExcel")?.addEventListener("click", downloadDeclarationExcelFile);
  $("printDeclarationDoc")?.addEventListener("click", () => printDocumentPaper("docs-declaration"));
  $("addDeclarationGoodsRow")?.addEventListener("click", () => {
    addDeclarationGoodsRow();
    renderDeclarationBeginnerTips();
    renderDeclarationDoc({ preventDefault() {} });
  });
  $("summarizeShipmentManual")?.addEventListener("click", summarizeManualShipmentResult);
  $("clearShipmentManual")?.addEventListener("click", () => {
    $("shipmentManualPaste").value = "";
    $("shipmentManualSummary").innerHTML = "";
  });
  $("vesselAlertForm").addEventListener("submit", saveVesselAlert);
  $("vesselAlertList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-alert-delete]");
    if (button) removeVesselAlert(button.dataset.alertDelete);
  });
  $("refreshPolicy").addEventListener("click", () => loadPolicyUpdates(true));
  $("policyFilterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loadPolicyUpdates(true);
  });
	  $("refreshTrends").addEventListener("click", () => loadTrends($("trendKeyword").value, true));
	  $("refreshHotspots")?.addEventListener("click", () => refreshHotspots(true));
	  $("trendSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loadTrends($("trendKeyword").value, true);
  });
  $("clearTrendSearch").addEventListener("click", () => {
    $("trendKeyword").value = "";
    loadTrends("", true);
  });
  $("portName").addEventListener("input", () => renderPortSuggestions($("portName").value));
  $("portSuggestionStrip").addEventListener("click", (event) => {
    const button = event.target.closest("[data-port-name]");
    if (button) applyPortSuggestion(button);
  });
  $("portRiskForm").addEventListener("submit", queryPortRisk);
  $("batteryForm").addEventListener("submit", evaluateBattery);
  $("loadBatteryExample").addEventListener("click", loadBatteryExample);
  $("resetBattery").addEventListener("click", resetBattery);
  $("issueForm").addEventListener("submit", addIssue);
  $("issueTable").addEventListener("click", (event) => {
    const button = event.target.closest("[data-issue]");
    if (button) toggleIssue(Number(button.dataset.issue));
  });
  $("failureEventList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-failure-to-issue]");
    if (button) convertFailureToIssue(button.dataset.failureToIssue);
  });
  $("clearFailureLog")?.addEventListener("click", clearFailureLog);
  $("exportIssues").addEventListener("click", () =>
    download("consumer-audio-exception-log.csv", toCsv(state.issues, ["status", "type", "priority", "title", "owner", "date"]))
  );
  $("feedbackForm")?.addEventListener("submit", addFeedback);
  $("feedbackList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-feedback-delete]");
    if (button) deleteFeedback(button.dataset.feedbackDelete);
  });
  $("requirementForm").addEventListener("submit", queryRequirements);
  $("loadRequirementExample").addEventListener("click", loadRequirementExample);
  $("learningFlow")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-learn-step]");
    if (button) openLearningStep(button.dataset.learnStep);
  });
  document.querySelectorAll("[data-learn-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      learningState.filter = button.dataset.learnFilter || "all";
      setLearningButtonState("[data-learn-filter]", "learnFilter", learningState.filter);
      renderLearningFlow();
    });
  });
	  document.querySelectorAll("[data-learn-role]").forEach((button) => {
	    button.addEventListener("click", () => {
	      learningState.role = button.dataset.learnRole || "all";
	      setLearningButtonState("[data-learn-role]", "learnRole", learningState.role);
	      renderLearningFlow();
	    });
	  });
	  document.querySelectorAll("[data-process-mode]").forEach((button) => {
	    button.addEventListener("click", () => {
	      learningState.processMode = button.dataset.processMode || "sea";
	      setLearningButtonState("[data-process-mode]", "processMode", learningState.processMode);
	      renderLearningFlow();
	    });
	  });
	  document.querySelectorAll("[data-knowledge-view]").forEach((button) => {
    button.addEventListener("click", () => activateKnowledgeView(button.dataset.knowledgeView));
  });
  document.querySelectorAll("[data-glossary-category]").forEach((button) => {
    button.addEventListener("click", () => {
      glossaryState.category = button.dataset.glossaryCategory || "all";
      setLearningButtonState("[data-glossary-category]", "glossaryCategory", glossaryState.category);
      renderGlossary();
    });
  });
  $("glossarySearch")?.addEventListener("input", () => {
    glossaryState.search = $("glossarySearch").value || "";
    renderGlossary();
  });
  $("glossaryGrid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-glossary-term]");
    if (button) openGlossaryTerm(button.dataset.glossaryTerm);
  });
  $("closeResultDialog")?.addEventListener("click", closeResultDialog);
  $("resultDialog")?.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-result-dialog]")) closeResultDialog();
    if (event.target.closest("#rerunHsFromDialog")) applyDialogRefillAndRecommend();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("resultDialog")?.hidden) closeResultDialog();
  });
}

initAccessGate();
renderUsers();
renderSources();
renderTimeline();
renderPolicyWatchChips();
evaluateDecisionSupport();
loadPolicyUpdates();
renderDeclarationElements();
renderDeclarationBeginnerTips();
renderShipmentResult();
renderVesselAlerts();
loadTrends();
maybeAutoRefreshHotspots();
renderPortSuggestions();
queryPortRisk();
renderSeaPortLookup("上海");
renderAirportLookup("PVG");
populateOpsFeeSelects();
renderSeaOpsFees();
renderAirOpsFees();
renderSeaSpecialGuide();
queryAirTracking({ preventDefault() {} });
renderIssues();
renderFeedbacks();
queryRequirements({ preventDefault() {} });
renderRisks(["填写产品信息后，这里会显示 HS、3C、Battery/DG、监管条件和人工复核提醒。"]);
bindEvents();
