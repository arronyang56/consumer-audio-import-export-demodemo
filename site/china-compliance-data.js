(function () {
  "use strict";

  const sources = {
    tariff2026: {
      title: "中国 2026 年进出口税则",
      authority: "国务院关税税则委员会 / 海关总署",
      url: "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm",
      verifiedAt: "2026-07-20",
      use: "核对中国税号、税目名称和申报日适用税率。"
    },
    declaration2026: {
      title: "海关总署公告 2025 年第 260 号",
      authority: "海关总署",
      url: "https://www.customs.gov.cn/customs/2025-12/31/article_2025123119403025129.html",
      verifiedAt: "2026-07-20",
      use: "核对 2026 年海关商品编号和规范申报目录。"
    },
    cccCatalog: {
      title: "强制性产品认证目录与实施规则",
      authority: "国家认证认可监督管理委员会",
      url: "https://www.cnca.gov.cn/hlwfw/ywzl/qzxcprz/ssgz/art/2026/art_5261f654e02d45edaf0805fb268c9fc9.html",
      verifiedAt: "2026-04-17",
      use: "按产品用途、供电方式和目录界定核对 CCC，不按 HS 自动推断。"
    },
    batteryCcc: {
      title: "移动电源、锂离子电池和电池组 CCC 实施规则",
      authority: "国家认证认可监督管理委员会",
      url: "https://www.cnca.gov.cn/zwxx/gg/2025/art/2025/art_915c12eceb7a4ad1a848e9598844e911.html",
      verifiedAt: "2026-07-20",
      use: "核对移动电源、锂离子电池和电池组的 CCC 规则边界。"
    },
    srrc: {
      title: "无线电发射设备型号核准",
      authority: "工业和信息化部",
      url: "https://ythzxfw.miit.gov.cn/bssx/axy/wxdhwxtx/art/2020/art_e00be70da40a4355afe7b869eba30fdb.html",
      verifiedAt: "2026-07-20",
      use: "核对在中国销售、使用的无线电发射设备型号核准及标识要求。"
    },
    lithiumAir: {
      title: "MH/T 1052-2025 锂电池航空运输规范",
      authority: "中国民用航空局",
      url: "https://www.caac.gov.cn/XXGK/XXGK/BZGF/HYBZ/202510/P020251201605806958609.pdf",
      verifiedAt: "2026-07-20",
      use: "核对 UN38.3、锂电池型号和航空运输安全测试要求。"
    }
  };

  const shared = {
    baseDocs: ["产品规格书", "产品图片", "品牌型号", "用途和工作原理", "BOM/材质说明"],
    baseElements: ["品名", "品牌", "型号", "用途", "材质/构成", "功能或工作原理"],
    chinaNote: "结论是中国进口/内销初筛；正式申报以申报日税则、海关监管条件和关务复核为准。"
  };

  const families = [
    {
      id: "power-adapter",
      category: "充电器与电源",
      code: "8504401400",
      hsDirection: "850440 静止式变流器/电源转换设备方向",
      role: "power-supply",
      examples: ["USB-C 电源适配器", "氮化镓快充充电器", "手机充电器", "笔记本电源适配器", "音箱电源适配器", "路由器电源适配器", "平板电脑充电器", "多口桌面充电器", "旅行充电器", "PD 快充头", "AC/DC 电源供应器", "壁插式充电器"],
      aliases: ["power adapter", "charger", "gan charger", "usb-c charger", "ac dc adapter", "power supply"],
      requiredFacts: ["输入/输出电压电流", "额定功率", "是否直接接交流电网", "配套设备类型", "插头形式", "是否中国内销"],
      counterEvidence: ["若含电芯并可储能，不再只是充电器", "若仅为未装配电路板，先看 8534", "随整机包装不等于自动跟随整机税号"],
      compliance: { ccc: "可能适用：按 0807/0907 电源目录边界和配套设备核对", srrc: "通常不适用；若含无线发射功能需另判", dg: "通常非 DG；含电池时重新判断" },
      docs: ["输入输出铭牌", "电路/安规规格", "CCC 证书或目录外说明", "插头和标签照片"],
      declarationElements: ["额定功率", "输入输出参数", "是否稳压", "用途", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog"]
    },
    {
      id: "battery-storage",
      category: "移动电源与锂电池",
      code: "8507600090",
      hsDirection: "850760 锂离子蓄电池方向",
      role: "battery",
      examples: ["移动电源", "充电宝", "磁吸移动电源", "笔记本移动电源", "户外小型移动电源", "无线充移动电源", "耳机充电盒单独进口", "锂离子电池组", "聚合物锂电池", "圆柱锂电芯", "方形锂电芯", "设备维修电池包", "备用锂电池", "带保护板锂电池组"],
      aliases: ["power bank", "portable charger", "li-ion battery pack", "lithium polymer battery", "battery cell", "charging case"],
      requiredFacts: ["电芯化学体系", "额定容量 mAh", "额定能量 Wh", "电压", "是否可对外供电", "UN 编号", "单独/装在设备内/与设备同包装"],
      counterEvidence: ["不含电芯的空壳或保护板不是电池", "含电池的完整耳机/音箱仍先按整机主要功能判断", "充电器只转换电能且不储能时看 850440"],
      compliance: { ccc: "移动电源及目录覆盖的锂离子电池/电池组需按现行 CCC 规则核对", srrc: "仅在含无线发射功能时另判", dg: "高关注：核 UN38.3、SDS/MSDS、Wh、UN3480/UN3481、包装和承运人限制" },
      docs: ["UN38.3 试验概要", "SDS/MSDS", "电池规格书", "Wh 计算", "包装方式", "运输条件鉴定/承运人预审"],
      declarationElements: ["电池类型", "容量", "能量", "用途", "是否带保护电路", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "batteryCcc", "lithiumAir"]
    },
    {
      id: "bare-circuit",
      category: "PCB 与 FPC",
      code: "8534009000",
      hsDirection: "8534 印刷电路方向",
      role: "bare-pcb",
      examples: ["裸 PCB", "未装配印刷电路板", "双层 PCB", "多层 PCB", "高频 PCB", "铝基 PCB", "刚性线路板", "裸 FPC", "柔性印刷电路板", "软硬结合板", "未贴片控制板", "空白线路板"],
      aliases: ["bare pcb", "printed circuit board", "bare fpc", "flexible printed circuit", "rigid flex pcb"],
      requiredFacts: ["是否焊接/贴装元器件", "层数", "基材", "单双面", "是否柔性", "最终用途"],
      counterEvidence: ["已装配元器件的 PCBA 通常不能只按裸 PCB", "可独立工作的功能模块按自身功能判断", "专用零件需要同时核主机零件品目"],
      compliance: { ccc: "通常不因裸板本体适用；成品用途另判", srrc: "裸板通常不适用；装配射频功能后另判", dg: "通常非 DG" },
      docs: ["板层结构", "Gerber/规格摘要", "未装配声明", "材料说明", "用途说明"],
      declarationElements: ["层数", "是否装配", "基材", "用途", "尺寸"],
      sourceIds: ["tariff2026", "declaration2026"]
    },
    {
      id: "assembled-pcba",
      category: "PCBA 与功能板",
      code: "8543709990",
      hsDirection: "已装配 PCBA 需按独立功能或专用主机零件继续判断",
      role: "independent-electrical-function",
      examples: ["通用控制 PCBA", "电源管理 PCBA", "蓝牙功能板", "Wi-Fi 功能板", "音频解码板", "USB 接口板", "触控控制板", "LED 控制板", "电机控制板", "传感器接口板", "主控 PCBA", "已贴片电路板"],
      aliases: ["pcba", "pcb assembly", "control board", "function board", "assembled circuit board"],
      requiredFacts: ["是否已装配元器件", "能否独立工作", "输入输出", "核心功能", "是否专用于某主机", "对应主机税目"],
      counterEvidence: ["无元器件的裸板先看 8534", "专用于 8518 音频设备且不能独立工作的零件可能看 851890", "无线收音机专用板可能看 8529"],
      compliance: { ccc: "按最终产品或独立功能边界核对，不能仅凭 PCBA 判断", srrc: "含可工作的无线发射功能时需核型号核准边界", dg: "通常非 DG；随附电池时另判" },
      docs: ["功能框图", "BOM 摘要", "输入输出说明", "主机适配说明", "是否独立工作的声明"],
      declarationElements: ["功能", "是否装配", "是否独立工作", "用途", "对应主机", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "srrc"]
    },
    {
      id: "wireless-audio",
      category: "无线音频",
      code: "8517629400",
      hsDirection: "85176294 无线耳机方向",
      role: "headphone",
      examples: ["蓝牙耳机", "TWS 耳机", "无线头戴耳机", "蓝牙降噪耳机", "无线游戏耳机", "颈挂式蓝牙耳机", "开放式蓝牙耳机", "骨传导蓝牙耳机", "无线通话耳麦", "单耳蓝牙耳机"],
      aliases: ["bluetooth earbuds", "tws earbuds", "wireless headset", "wireless headphone", "bluetooth headset"],
      requiredFacts: ["无线制式和频段", "是否完整成品", "是否含麦克风", "是否含电池/充电盒", "能否独立通信", "销售包装"],
      counterEvidence: ["有线耳机方向为 851830", "单独扬声器单元或维修件不是无线耳机成品", "充电盒单独进口应按储能/充电功能另判"],
      compliance: { ccc: "按音视频设备、随附电源和电池目录边界核对", srrc: "高关注：蓝牙/无线发射设备核型号核准及代码标注", dg: "含锂电池：核 UN38.3、Wh、包装方式和承运限制" },
      docs: ["无线规格/频段", "SRRC 证书或豁免依据", "电池规格和 UN38.3", "产品标签", "说明书"],
      declarationElements: ["连接方式", "无线频段", "是否带麦克风", "是否含电池", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog", "srrc", "lithiumAir"]
    },
    {
      id: "wireless-network",
      category: "无线与通信设备",
      code: "8517629500",
      hsDirection: "851762 数据接收、转换和发送设备方向；路由器需细分",
      role: "finished-network-device",
      examples: ["无线路由器", "Wi-Fi 路由器", "5G CPE", "无线接入点", "随身 Wi-Fi", "Mesh 路由器", "工业无线路由器", "车载 Wi-Fi 设备", "无线网桥", "家庭网关"],
      aliases: ["wireless router", "wifi router", "access point", "5g cpe", "mobile wifi", "mesh router"],
      requiredFacts: ["主要通信功能", "有线/无线接口", "频段", "是否含蜂窝模块", "是否带交换/调制功能", "供电方式"],
      counterEvidence: ["仅无线网卡可能看 85176292", "只发射不处理数据的设备需另判", "完整智能手机属于 851713 方向"],
      compliance: { ccc: "按电信终端/配套电源目录边界核对", srrc: "高关注：Wi-Fi、蜂窝等无线发射功能核型号核准", dg: "含电池时核锂电运输要求" },
      docs: ["通信功能框图", "频段和发射功率", "SRRC 资料", "网口/蜂窝制式", "电源规格"],
      declarationElements: ["通信功能", "网络制式", "接口", "频段", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog", "srrc"]
    },
    {
      id: "flat-panel-module",
      category: "显示模组",
      code: "8524919000",
      hsDirection: "8524 平板显示模组方向；按 LCD/OLED、是否触控及专用主机细分",
      role: "display-module",
      examples: ["LCD 显示模组", "TFT LCD 模组", "触控 LCD 模组", "手机 LCD 模组", "平板电脑显示模组", "笔记本液晶模组", "车载 LCD 模组", "OLED 显示模组", "AMOLED 模组", "电子墨水屏模组", "小尺寸液晶模组", "带触摸屏显示模组"],
      aliases: ["lcd module", "tft lcd module", "touch display module", "oled module", "amoled module", "e-ink display module"],
      requiredFacts: ["LCD/OLED/其他技术", "是否带触控", "尺寸", "分辨率", "是否专用于特定主机", "是否只是指示板"],
      counterEvidence: ["仅显示状态的装配指示板可能看 853120", "完整监视器/电视机不属于显示模组", "无显示功能的控制 PCBA 按功能另判"],
      compliance: { ccc: "模组通常按本体和最终用途核对；完整显示设备另判", srrc: "通常不适用；含无线发射模块时另判", dg: "通常非 DG" },
      docs: ["显示技术规格", "尺寸/分辨率", "触控说明", "专用主机说明", "接口和驱动说明"],
      declarationElements: ["显示技术", "尺寸", "分辨率", "是否触控", "用途", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026"]
    },
    {
      id: "indicator-panel",
      category: "显示与指示板",
      code: "8531200000",
      hsDirection: "853120 装有 LCD/LED 的显示板或指示板方向",
      role: "display-panel",
      examples: ["设备状态显示板", "LCD 指示面板", "LED 指示板", "音箱显示板组件", "功放前面板显示板", "家电状态指示板", "仪表指示面板", "菜单显示板"],
      aliases: ["indicator panel", "lcd indicator board", "led display panel", "status display board"],
      requiredFacts: ["是否仅显示/指示状态", "是否装有 LCD/LED", "是否带控制功能", "能否显示视频图像", "对应设备"],
      counterEvidence: ["用于呈现图像的平板显示模组先看 8524", "仅控制不显示的 PCBA 按功能或零件另判", "完整设备不能按内部显示板申报"],
      compliance: { ccc: "按最终设备和供电边界核对", srrc: "通常不适用", dg: "通常非 DG" },
      docs: ["显示内容说明", "电路功能", "对应主机", "接口", "产品照片"],
      declarationElements: ["显示方式", "用途", "是否装配", "对应主机", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026"]
    },
    {
      id: "finished-audio",
      category: "音频整机",
      code: "8518220000",
      hsDirection: "8518 音频设备方向；按耳机、扬声器、音箱、功放及结构细分",
      role: "finished-speaker",
      examples: ["多喇叭音箱", "Soundbar", "家庭影院音箱", "蓝牙音箱", "智能音箱", "会议音箱", "便携音箱", "有源音箱", "低音炮", "桌面音箱", "组合音响音箱", "电视回音壁"],
      aliases: ["speaker system", "soundbar", "bluetooth speaker", "smart speaker", "powered speaker", "subwoofer"],
      requiredFacts: ["喇叭数量", "是否装入箱体", "是否带功放", "无线功能", "是否含电池", "是否完整成品"],
      counterEvidence: ["无箱体扬声器先看 851829", "单喇叭音箱可能看 851821", "高音/低音单元或功能板可能是 851890 零件"],
      compliance: { ccc: "按音视频设备目录、供电方式和额定参数核对", srrc: "含蓝牙/Wi-Fi 时核型号核准", dg: "含锂电池时核 UN38.3、Wh 和承运限制" },
      docs: ["整机结构和喇叭数量", "功率/供电参数", "无线规格", "电池资料", "CCC/SRRC 资料"],
      declarationElements: ["结构", "喇叭数量", "额定功率", "连接方式", "是否含电池", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog", "srrc", "lithiumAir"]
    },
    {
      id: "audio-parts",
      category: "音频零件与附件",
      code: "8518900000",
      hsDirection: "851890 税目 8518 所列货品的专用零件方向",
      role: "audio-dedicated-part",
      examples: ["音箱高音单元", "音箱低音单元", "音箱中音单元", "功放功能板", "音箱分频器", "音箱网罩", "音箱支架组件", "麦克风咪头", "耳机发声单元", "功放前面板组件", "音箱维修主板", "音频设备专用结构件"],
      aliases: ["speaker driver", "tweeter", "woofer", "crossover", "amplifier board", "audio spare part", "microphone capsule"],
      requiredFacts: ["对应主机", "专用性", "是否能独立工作", "是否已装配", "具体功能", "是否只是通用材料件"],
      counterEvidence: ["完整音箱/功放/耳机按整机税目", "裸 PCB 先看 8534", "具有独立功能的通用电气模块按自身功能判断"],
      compliance: { ccc: "通常随最终产品边界核对；可独立销售成品另判", srrc: "不因用于无线设备自动适用；具备无线发射功能时另判", dg: "通常非 DG；含电池组件另判" },
      docs: ["对应主机型号", "专用性声明", "功能说明", "装配状态", "产品照片/BOM"],
      declarationElements: ["零件名称", "对应主机", "功能", "材质", "是否装配", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026"]
    },
    {
      id: "wired-audio",
      category: "有线音频",
      code: "8518300000",
      hsDirection: "851830 耳机、耳塞机及耳麦组合机方向",
      role: "headphone",
      examples: ["有线耳机", "有线头戴耳机", "USB 有线耳机", "3.5mm 耳机", "监听耳机", "有线游戏耳机", "电话客服耳麦", "带麦克风有线耳机"],
      aliases: ["wired headphone", "wired headset", "usb headset", "earphone", "monitor headphone"],
      requiredFacts: ["有线/无线", "接口", "是否带麦克风", "是否完整成品", "是否含主动电子模块"],
      counterEvidence: ["蓝牙/无线耳机先看 85176294", "发声单元或线材单独进口不是完整耳机", "仅麦克风需看 851810"],
      compliance: { ccc: "按产品目录和供电边界核对", srrc: "纯有线通常不适用", dg: "不含电池通常非 DG" },
      docs: ["接口规格", "结构照片", "麦克风说明", "品牌型号", "供电方式"],
      declarationElements: ["连接方式", "接口", "是否带麦克风", "用途", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog"]
    },
    {
      id: "cable-connector",
      category: "线缆与连接件",
      code: "8544422900",
      hsDirection: "854442 带接插件的绝缘电导体方向；按电压和用途细分",
      role: "cable",
      examples: ["USB 数据线", "USB-C 充电线", "HDMI 线", "音频连接线", "带插头电源线", "网线跳线", "Lightning 数据线", "带接插件线束", "同轴连接线", "设备内部连接线"],
      aliases: ["usb cable", "charging cable", "hdmi cable", "audio cable", "power cord", "patch cable", "wire harness"],
      requiredFacts: ["额定电压", "是否带接插件", "接口类型", "导体材质", "长度", "用途"],
      counterEvidence: ["不带接插件的电导体需看其他子目", "光纤线缆不按普通电导体", "带独立转换芯片的适配器/转换器需按功能另判"],
      compliance: { ccc: "电线组件/电源线按目录界定核对；数据线不自动适用", srrc: "通常不适用", dg: "通常非 DG" },
      docs: ["线材规格", "额定电压", "接口照片", "导体材质", "CCC 资料或目录外说明"],
      declarationElements: ["额定电压", "是否带接插件", "接口", "长度", "用途", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog"]
    },
    {
      id: "smart-device",
      category: "手机与穿戴设备",
      code: "8517130000",
      hsDirection: "851713 智能手机方向；穿戴设备需按独立通信和主要功能反证",
      role: "finished-smartphone",
      examples: ["5G 智能手机", "4G 智能手机", "折叠屏手机", "三防智能手机", "双卡智能手机", "eSIM 智能手机", "工业智能手机", "智能手机整机"],
      aliases: ["smartphone", "5g mobile phone", "cellular phone", "foldable phone", "rugged smartphone"],
      requiredFacts: ["是否完整成品", "蜂窝制式", "SIM/eSIM", "主要功能", "是否含电池", "销售包装"],
      counterEvidence: ["维修主板、显示模组和电池按零件或自身功能另判", "仅计时/健康监测的手表不能直接按智能手机", "没有蜂窝通信的平板设备需另判"],
      compliance: { ccc: "按电信终端设备目录和配套电源边界核对", srrc: "高关注：蜂窝/Wi-Fi/蓝牙发射功能核型号核准", dg: "含锂电池时核 UN38.3 和运输限制" },
      docs: ["网络制式", "IMEI/SIM 说明", "SRRC/CCC 资料", "电池规格", "产品标签说明书"],
      declarationElements: ["网络制式", "SIM 形式", "功能", "是否含电池", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "cccCatalog", "srrc", "lithiumAir"]
    },
    {
      id: "remote-control",
      category: "遥控与控制附件",
      code: "8526920000",
      hsDirection: "852692 无线电遥控设备方向；红外/有线控制器需按自身功能另判",
      role: "remote",
      examples: ["无线遥控器", "射频遥控器", "车库门遥控器", "音箱无线遥控器", "电视无线遥控器", "无线钥匙遥控器", "工业无线遥控器", "灯具射频遥控器"],
      aliases: ["radio remote control", "rf remote controller", "wireless remote", "key fob", "industrial remote control"],
      requiredFacts: ["红外/射频/蓝牙", "频段", "控制对象", "是否含电池", "是否只是有线控制面板"],
      counterEvidence: ["纯红外遥控器不能只凭“遥控”按无线电遥控", "功放/音箱专用但可独立遥控时按遥控器自身功能判断", "仅控制板零件需另判"],
      compliance: { ccc: "通常不因遥控器本体适用；配套产品另判", srrc: "射频/蓝牙遥控高关注；红外通常不适用", dg: "含纽扣电池或锂电池时核运输和包装" },
      docs: ["遥控技术和频段", "发射功率", "SRRC 资料", "电池类型", "控制对象说明"],
      declarationElements: ["遥控方式", "频段", "用途", "是否含电池", "品牌型号"],
      sourceIds: ["tariff2026", "declaration2026", "srrc"]
    }
  ];

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function chineseBigrams(value) {
    const chars = String(value || "").replace(/[^\u3400-\u9fff]/g, "");
    const grams = [];
    for (let index = 0; index < chars.length - 1; index += 1) grams.push(chars.slice(index, index + 2));
    return Array.from(new Set(grams));
  }

  const cases = families.flatMap((family) => family.examples.map((name, index) => ({
    id: `${family.id}-${String(index + 1).padStart(2, "0")}`,
    familyId: family.id,
    category: family.category,
    name,
    code: family.code,
    hsDirection: family.hsDirection,
    role: family.role,
    aliases: family.aliases,
    keywords: [name, ...family.aliases].join(","),
    requiredFacts: family.requiredFacts,
    counterEvidence: family.counterEvidence,
    compliance: family.compliance,
    docs: Array.from(new Set([...shared.baseDocs, ...family.docs])),
    declarationElements: Array.from(new Set([...shared.baseElements, ...family.declarationElements])),
    sourceIds: family.sourceIds,
    source: family.sourceIds.map((id) => sources[id]?.title).filter(Boolean).join(" / "),
    regulation: `${family.hsDirection}。${shared.chinaNote}`,
    notes: `必须确认：${family.requiredFacts.join("、")}。反证：${family.counterEvidence.join("；")}。`,
    lastUsed: "中国合规知识库 2026-07"
  })));

  function matchCases(query, limit = 5) {
    const text = normalize(query);
    if (!text) return [];
    return cases
      .map((item) => {
        const exact = text.includes(normalize(item.name)) ? 120 : 0;
        const aliasHits = item.aliases.filter((alias) => text.includes(normalize(alias))).length;
        const nameParts = normalize(item.name).split(/[\s/+-]+/).filter((part) => part.length >= 2);
        const partHits = nameParts.filter((part) => text.includes(part)).length;
        const bigramHits = chineseBigrams(item.name).filter((part) => text.includes(part)).length;
        const bigramScore = bigramHits >= 2 ? bigramHits * 8 : 0;
        return { ...item, matchScore: exact + aliasHits * 35 + partHits * 12 + bigramScore };
      })
      .filter((item) => item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore || b.name.length - a.name.length)
      .slice(0, limit);
  }

  const familyCounts = families.reduce((result, family) => {
    result[family.id] = family.examples.length;
    return result;
  }, {});

  window.CHINA_COMPLIANCE_SOURCES = sources;
  window.CHINA_COMPLIANCE_FAMILIES = families;
  window.CHINA_COMPLIANCE_CASES = cases;
  window.CHINA_COMPLIANCE_META = {
    version: "2026.07.20",
    caseCount: cases.length,
    familyCount: families.length,
    familyCounts,
    focus: ["HS 候选", "CCC", "SRRC", "锂电池运输", "申报要素", "单证", "反证", "缺失资料"],
    warning: shared.chinaNote
  };
  window.findChinaComplianceCases = matchCases;
})();
