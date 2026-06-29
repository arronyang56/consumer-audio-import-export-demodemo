const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const marketProfiles = [
  {
    id: "us",
    market: "美国 US",
    aliases: ["us", "usa", "united states", "美国"],
    customsConclusion: "美国海关通常要求确认 HTSUS 商品编码、申报价值、原产国标识、进口商记录和是否涉及额外贸易救济税。消费类音频产品如带无线功能，还要把 FCC 合规作为重点复核。",
    compliance: ["无线/蓝牙：核验 FCC ID、测试报告和标签。", "含锂电池：准备 UN38.3、MSDS、Wh、包装方式，按 DOT/IATA/IMDG 和承运人要求确认。", "注意 301、232、反倾销/反补贴等额外税费是否适用。"],
    sources: [["USITC HTS", "https://hts.usitc.gov/"], ["CBP CROSS", "https://rulings.cbp.gov/"], ["CBP Trade Remedies", "https://www.cbp.gov/trade/programs-administration/trade-remedies"], ["FCC Equipment Authorization", "https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm"]]
  },
  {
    id: "uk",
    market: "英国 UK",
    aliases: ["uk", "united kingdom", "英国"],
    customsConclusion: "英国进口通常要求确认 UK commodity code、第三国关税、VAT、进口申报代码和是否需要许可。消费电子还要确认 UKCA/无线/电池和进口商责任。",
    compliance: ["无线/蓝牙：核验 UK Radio Equipment Regulations、测试报告和标签。", "含电池：确认电池回收责任、运输文件和标签。", "申报时按 CDS 要求填写 commodity code、valuation、origin 和 procedure code。"],
    sources: [["UK Trade Tariff", "https://www.trade-tariff.service.gov.uk/"], ["GOV.UK Import Goods", "https://www.gov.uk/import-goods-into-uk"], ["CDS Declaration Instructions", "https://www.gov.uk/government/collections/uk-trade-tariff-volume-3-for-cds--2"]]
  },
  {
    id: "eu",
    market: "欧盟 EU",
    aliases: ["eu", "europe", "欧盟", "欧洲", "德国", "法国", "荷兰", "意大利", "西班牙"],
    customsConclusion: "欧盟进口通常要求确认 CN/TARIC 编码、关税、VAT、原产地、进口商/EORI，以及是否触发产品法规或市场监管要求。",
    compliance: ["无线/蓝牙：通常关注 RED 指令、CE DoC、测试报告、频段和说明书。", "消费电子：关注 CE、RoHS、REACH、WEEE、包装和当地语言标签。", "含电池：关注欧盟电池法规、回收标识、容量信息和运输文件。"],
    sources: [["EU Access2Markets", "https://trade.ec.europa.eu/access-to-markets/en/home"], ["EU TARIC", "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp"], ["EUR-Lex", "https://eur-lex.europa.eu/"], ["EU Safety Gate", "https://ec.europa.eu/safety-gate-alerts/"]]
  },
  {
    id: "th",
    market: "泰国 Thailand",
    aliases: ["thailand", "thai", "泰国", "林查班", "laem chabang"],
    customsConclusion: "泰国进口通常要求确认泰国海关税则、税率、VAT、当地进口商资料、清关代理要求和是否需要进口许可证。蓝牙/无线和电源类消费电子要优先问 NBTC/TISI。",
    compliance: ["无线/蓝牙：优先核验 NBTC 要求，确认型号、频段和进口商许可。", "电源/适配器：确认 TISI 或当地电气安全标准、插头规格和标签。", "含锂电池：准备 MSDS、UN38.3、Wh、包装方式，并确认船司/码头 DG 接受规则。"],
    sources: [["Thai Customs", "https://www.customs.go.th/"], ["Thailand National Single Window", "https://www.thainsw.net/"], ["NBTC", "https://www.nbtc.go.th/"], ["TISI", "https://www.tisi.go.th/"]]
  },
  {
    id: "cn",
    market: "中国",
    aliases: ["china", "中国", "大陆", "进口中国"],
    customsConclusion: "中国进口通常要求确认 10 位商品编码、监管条件、检验检疫类别、关税/增值税、申报要素和是否涉及 3C/无线电型号核准。",
    compliance: ["无线/蓝牙：核验无线电型号核准、频段和发射功率。", "电源/适配器：核验 3C 目录和认证证书。", "含电池：准备 MSDS、UN38.3、Wh、包装方式和运输限制说明。"],
    sources: [["海关总署", "http://www.customs.gov.cn/"], ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"], ["互联网+海关", "http://online.customs.gov.cn/"], ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/"]]
  },
  {
    id: "jp",
    market: "日本 Japan",
    aliases: ["japan", "日本", "jp"],
    customsConclusion: "日本进口通常要求确认日本税则编码、关税/消费税、进口商责任和是否涉及 PSE、TELEC/MIC、日文标签或产品安全要求。",
    compliance: ["无线/蓝牙：优先核验 TELEC/MIC 认证、频段和标签。", "电源/适配器：关注 PSE 标识和测试文件。", "含锂电池：准备 MSDS、UN38.3、Wh 和运输标签，并确认承运人规则。"],
    sources: [["Japan Customs Tariff", "https://www.customs.go.jp/english/tariff/"], ["Japan Customs", "https://www.customs.go.jp/english/"], ["METI Product Safety", "https://www.meti.go.jp/english/policy/economy/consumer/product_safety/"], ["MIC Radio Use", "https://www.tele.soumu.go.jp/e/index.htm"]]
  },
  {
    id: "za",
    market: "南非 South Africa",
    aliases: ["south africa", "南非", "za", "durban", "cape town"],
    customsConclusion: "南非进口通常要求确认 SARS 海关税则、关税/VAT、进口商资料、估价和原产地；部分产品还可能涉及 ITAC 进口管制、NRCS 强制规范或 ICASA 无线设备许可。",
    compliance: ["无线/蓝牙：优先确认 ICASA 型号/设备许可和当地进口商责任。", "消费电子：确认是否落入 NRCS 强制规范、标签和安全文件要求。", "含锂电池：准备 MSDS、UN38.3、Wh、包装方式，并让船司/清关代理确认 DG 接受规则。"],
    sources: [["SARS Customs and Excise", "https://www.sars.gov.za/customs-and-excise/"], ["ITAC South Africa", "https://www.itac.org.za/"], ["NRCS South Africa", "https://www.nrcs.org.za/"], ["ICASA", "https://www.icasa.org.za/"]]
  },
  {
    id: "au",
    market: "澳大利亚 Australia",
    aliases: ["australia", "澳大利亚", "au"],
    customsConclusion: "澳大利亚进口通常要求确认 ABF 商品归类、关税/GST、进口商资料、估价和是否涉及禁限管制。无线、适配器、电池类产品还要看 ACMA、产品安全和电气安全要求。",
    compliance: ["无线/蓝牙：确认 ACMA/RCM、频段和标签。", "电源/适配器：确认电气安全、RCM、插头和当地标签要求。", "含锂电池：按 IATA/IMDG、承运人和当地清关代理要求准备文件。"],
    sources: [["Australian Border Force Tariff", "https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff"], ["ACMA", "https://www.acma.gov.au/"], ["Product Safety Australia", "https://www.productsafety.gov.au/"]]
  },
  {
    id: "kr",
    market: "韩国 Korea",
    aliases: ["korea", "south korea", "韩国", "kr"],
    customsConclusion: "韩国进口通常要求确认韩国海关编码、关税/VAT、进口商资料和清关文件。消费电子常见复核点是 KC、无线/EMC、标签和电池运输文件。",
    compliance: ["无线/蓝牙：确认 RRA/KC 无线或 EMC 要求。", "电源/适配器：确认 KC 安全和标签。", "含锂电池：准备 MSDS、UN38.3、Wh 和承运人要求。"],
    sources: [["Korea Customs Service", "https://www.customs.go.kr/english/main.do"], ["KATS", "https://www.kats.go.kr/en/main.do"], ["RRA Korea", "https://www.rra.go.kr/en/index.do"]]
  },
  {
    id: "vn",
    market: "越南 Vietnam",
    aliases: ["vietnam", "越南", "vn", "胡志明"],
    customsConclusion: "越南进口通常要求确认海关编码、进口税/VAT、进口商资料、当地清关代理意见和是否需许可证。无线、标签和电池文件要提前和进口商确认。",
    compliance: ["无线/蓝牙：确认越南 MIC/当地型式认可要求。", "消费电子：确认越南标签、说明书和进口商责任。", "含电池：准备 MSDS、UN38.3、Wh 和承运人/DG 要求。"],
    sources: [["Vietnam Customs", "https://www.customs.gov.vn/"], ["Vietnam National Single Window", "https://vnsw.gov.vn/"], ["MIC Vietnam", "https://mic.gov.vn/"]]
  },
  {
    id: "sg",
    market: "新加坡 Singapore",
    aliases: ["singapore", "新加坡", "sg"],
    customsConclusion: "新加坡进口通常要求确认 Singapore Customs 商品编码、GST、进口许可证边界和进口商资料。无线通信产品可能涉及 IMDA，消费品还需看产品安全责任。",
    compliance: ["无线/蓝牙：确认 IMDA 设备注册或标签要求。", "电源/适配器：确认安全标志、插头和当地销售要求。", "含电池：准备 MSDS、UN38.3，并确认转运或进口 DG 限制。"],
    sources: [["Singapore Customs", "https://www.customs.gov.sg/"], ["IMDA", "https://www.imda.gov.sg/"], ["Enterprise Singapore", "https://www.enterprisesg.gov.sg/"]]
  },
  {
    id: "my",
    market: "马来西亚 Malaysia",
    aliases: ["malaysia", "马来西亚", "my", "port klang", "巴生"],
    customsConclusion: "马来西亚进口通常要求确认 Royal Malaysian Customs 税则、SST/进口税、进口商资料和清关代理意见。无线、认证和标签常见复核点是 MCMC/SIRIM。",
    compliance: ["无线/蓝牙：确认 MCMC/SIRIM 要求和进口商责任。", "电源/适配器：确认 SIRIM、电气安全和插头标签。", "含电池：准备 MSDS、UN38.3，并确认码头/船司 DG 接受规则。"],
    sources: [["Royal Malaysian Customs", "https://www.customs.gov.my/"], ["SIRIM QAS", "https://www.sirim-qas.com.my/"], ["MCMC", "https://www.mcmc.gov.my/"]]
  },
  {
    id: "in",
    market: "印度 India",
    aliases: ["india", "印度", "in"],
    customsConclusion: "印度进口通常要求确认 CBIC 税则、BCD/IGST、进口商 IEC、估价、原产地和当地清关代理意见。消费电子可能涉及 BIS、WPC/无线和标签要求。",
    compliance: ["无线/蓝牙：确认 WPC/ETA 或当地无线许可。", "消费电子/电源：确认 BIS/CRS、电气安全和标签。", "含电池：准备 MSDS、UN38.3、Wh，并确认承运人和当地 DG 要求。"],
    sources: [["CBIC India", "https://www.cbic.gov.in/"], ["BIS", "https://www.bis.gov.in/"], ["WPC India", "https://dot.gov.in/spectrum-management/2457"]]
  },
  {
    id: "br",
    market: "巴西 Brazil",
    aliases: ["brazil", "brasil", "巴西", "br", "santos"],
    customsConclusion: "巴西进口通常要求确认 NCM 商品编码、进口税/工业产品税/州税等税费、当地进口商资料、Siscomex/Portal Unico 流程和是否需要行政许可。消费电子如果带蓝牙/无线，ANATEL 认证是重点；电源或适配器类产品还要复核 INMETRO 边界。",
    compliance: ["无线/蓝牙：优先确认 ANATEL homologation/认证、标签和当地证书持有人。", "电源/适配器或受监管消费品：核验 INMETRO 强制认证目录和当地插头/标签要求。", "含锂电池：准备 MSDS、UN38.3、Wh、包装方式，并让进口商/货代确认海运或空运 DG 接受规则。"],
    sources: [["Receita Federal Classificação Fiscal", "https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/classificacao-fiscal-de-mercadorias"], ["Portal Siscomex", "https://www.gov.br/siscomex/pt-br"], ["ANATEL Certificação de Produtos", "https://www.gov.br/anatel/pt-br/regulado/certificacao-de-produtos"], ["INMETRO Produtos Regulados", "https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/produtos-e-servicos-regulados"]]
  },
  {
    id: "mx",
    market: "墨西哥 Mexico",
    aliases: ["mexico", "méxico", "墨西哥", "mx", "manzanillo"],
    customsConclusion: "墨西哥进口通常要求确认 TIGIE/HS 编码、关税/IVA、进口商登记、海关代理和是否涉及 NOM 标准。电子和无线产品要提前让当地进口商确认 NOM、IFETEL 和标签要求。",
    compliance: ["无线/蓝牙：确认 IFETEL 认证、频段和标签。", "消费电子/电源：确认 NOM 安全、能效或商业标签要求。", "含电池：准备 MSDS、UN38.3 和运输限制说明。"],
    sources: [["SAT Comercio Exterior", "https://www.sat.gob.mx/"], ["SNICE Mexico", "https://www.snice.gob.mx/"], ["IFETEL", "https://www.ift.org.mx/"], ["NOM Catalog", "https://www.gob.mx/se/acciones-y-programas/competitividad-y-normatividad-normalizacion"]]
  },
  {
    id: "ca",
    market: "加拿大 Canada",
    aliases: ["canada", "加拿大", "ca", "vancouver"],
    customsConclusion: "加拿大进口通常要求确认 CBSA Customs Tariff、GST/HST、估价、原产地、进口商资料和是否涉及管制品。无线设备通常需要 ISED 合规，消费品还要看安全、标签和客户要求。",
    compliance: ["无线/蓝牙：确认 ISED 认证、IC ID、说明书和标签。", "消费电子：确认加拿大消费品安全、能效或省级销售要求。", "含电池：准备 MSDS、UN38.3、Wh 和承运人限制说明。"],
    sources: [["CBSA Customs Tariff", "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html"], ["ISED Canada", "https://ised-isde.canada.ca/"], ["Health Canada Consumer Product Safety", "https://www.canada.ca/en/health-canada/services/consumer-product-safety.html"]]
  },
  {
    id: "id",
    market: "印度尼西亚 Indonesia",
    aliases: ["indonesia", "印尼", "印度尼西亚", "id", "jakarta"],
    customsConclusion: "印度尼西亚进口通常要求确认 BTKI/HS 编码、进口许可证/API、税费、当地进口商资质和清关代理意见。无线、电源和消费电子可能涉及 SDPPI、SNI 或当地标签要求。",
    compliance: ["无线/蓝牙：确认 SDPPI 认证和当地证书持有人。", "电源/消费电子：确认 SNI 或当地安全标准边界。", "含电池：准备 MSDS、UN38.3，并确认船司/码头 DG 接受规则。"],
    sources: [["Indonesia Customs DGCE", "https://www.beacukai.go.id/"], ["Indonesia National Single Window", "https://www.insw.go.id/"], ["SDPPI", "https://sertifikasi.postel.go.id/"]]
  },
  {
    id: "ph",
    market: "菲律宾 Philippines",
    aliases: ["philippines", "菲律宾", "ph", "manila"],
    customsConclusion: "菲律宾进口通常要求确认 Tariff Commission/BOC 编码、关税/VAT、进口商资料和是否需要许可。无线设备通常需要 NTC，消费电子还应确认当地产品标准和标签。",
    compliance: ["无线/蓝牙：确认 NTC 型式认可或相关许可。", "消费电子：确认 DTI/BPS 安全标准和标签要求。", "含电池：准备 MSDS、UN38.3 和承运人限制说明。"],
    sources: [["Philippines Tariff Commission", "https://tariffcommission.gov.ph/"], ["Bureau of Customs", "https://customs.gov.ph/"], ["NTC Philippines", "https://ntc.gov.ph/"]]
  },
  {
    id: "tr",
    market: "土耳其 Turkey",
    aliases: ["turkey", "turkiye", "türkiye", "土耳其", "tr", "istanbul"],
    customsConclusion: "土耳其进口通常要求确认土耳其税则、关税/VAT、进口商资料、CE/产品安全边界和是否涉及当地市场监管。无线产品要关注 BTK，电池和电子产品要确认标签、回收和清关资料。",
    compliance: ["无线/蓝牙：确认 BTK/无线设备要求。", "消费电子：关注 CE、RoHS、当地语言标签和进口商责任。", "含电池：准备 MSDS、UN38.3、Wh 和运输限制说明。"],
    sources: [["Trade Ministry Turkey", "https://ticaret.gov.tr/"], ["Turkish Customs Tariff Search", "https://uygulama.gtb.gov.tr/Tara/"], ["BTK Turkey", "https://www.btk.gov.tr/"]]
  },
  {
    id: "ae",
    market: "阿联酋 UAE",
    aliases: ["uae", "united arab emirates", "阿联酋", "迪拜", "dubai", "jebel ali"],
    customsConclusion: "阿联酋进口通常要求确认 GCC HS/关税、进口商资料、Dubai Trade/海关流程、阿语/英语标签和是否涉及 TDRA/产品合规。Jebel Ali 转运场景还要确认二程要求。",
    compliance: ["无线/蓝牙：确认 TDRA 型式认可和当地进口商责任。", "电源/消费电子：确认 Emirates Conformity Assessment 或客户要求。", "含电池：准备 MSDS、UN38.3，并确认转运港/船司 DG 接受规则。"],
    sources: [["Dubai Trade", "https://www.dubaitrade.ae/"], ["Dubai Customs", "https://www.dubaicustoms.gov.ae/"], ["TDRA UAE", "https://tdra.gov.ae/"]]
  },
  {
    id: "sa",
    market: "沙特 Saudi Arabia",
    aliases: ["saudi", "saudi arabia", "沙特", "ksa", "jeddah", "dammam"],
    customsConclusion: "沙特进口通常要求确认 HS/关税、SABER/SASO 合格评定、进口商资料、阿语标签和是否需要产品证书。消费电子、无线和电源类产品建议在出货前让当地进口商确认证书边界。",
    compliance: ["无线/蓝牙：确认 CST/通信设备要求。", "电源/消费电子：确认 SABER、SASO、能效或插头要求。", "含电池：准备 MSDS、UN38.3 和 DG 接受确认。"],
    sources: [["SABER Saudi", "https://saber.sa/"], ["ZATCA Saudi Customs", "https://zatca.gov.sa/"], ["SASO", "https://www.saso.gov.sa/"], ["CST Saudi", "https://www.cst.gov.sa/"]]
  },
  {
    id: "gcc",
    market: "中东 GCC",
    aliases: ["gcc", "中东", "沙特", "阿联酋", "uae", "saudi", "dubai"],
    customsConclusion: "GCC/中东进口通常要先确认目的国本地进口商、HS/关税、标签语言、G-Mark/SABER 等合格评定，以及无线许可和电池运输要求。",
    compliance: ["无线/蓝牙：核验当地电信许可、频段限制和进口商授权。", "电源/低压产品：关注 G-Mark、SABER 或当地合格评定要求。", "标签：常见要求为英文/阿文标签，具体以当地进口商和清关代理确认为准。"],
    sources: [["GSO Conformity", "https://www.gso.org.sa/en/conformity/conformity-tracking-system/"], ["SABER Saudi", "https://saber.sa/"], ["Dubai Trade", "https://www.dubaitrade.ae/"]]
  }
];

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=900" },
    body: JSON.stringify(body)
  };
}

function clean(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^\p{L}\p{N}\s.'"-]/gu, " ")
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "consumer-audio-import-export-demo/1.0" }
  });
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

function findMarket(country = "") {
  const needle = clean(country).toLowerCase();
  const profile = marketProfiles.find((item) => item.aliases.some((alias) => needle.includes(alias.toLowerCase())) || item.market.toLowerCase().includes(needle));
  if (profile) return profile;
  return {
    id: "generic",
    market: country ? `${country}（规则库待补充）` : "未指定市场",
    aliases: [],
    customsConclusion: "当前规则库还没有该进口国的固定结论；页面按商品类型输出基础清单，不自动套用美国、欧盟或消费电子要求。",
    compliance: ["填写 HS/税率/VAT/进口许可证状态。", "只有产品命中无线、电池、电源适配器时，才追加当地通信、电气安全、电池运输和标签要求。", "未填写的品牌、型号、尺寸、用途或原产地不自动补全。"],
    sources: [["WTO", "https://www.wto.org/"], ["ITC Market Access Map", "https://www.macmap.org/"], ["World Bank WITS", "https://wits.worldbank.org/"], ["UN Comtrade", "https://comtradeplus.un.org/"]]
  };
}

function detectSignals(product = "") {
  const text = clean(product).toLowerCase();
  const signals = [];
  if (/纸箱|纸盒|彩盒|carton|paperboard box|corrugated|packaging box|包装/.test(text)) signals.push("包装/纸制品");
  if (/lcd|液晶|显示屏|显示板|显示面板|指示板|indicator panel|display panel|display module/.test(text)) signals.push("显示/指示面板");
  if (/蓝牙|无线|wifi|wi-fi|bluetooth|wireless|radio|tws/.test(text)) signals.push("无线/蓝牙");
  if (/电池|锂|battery|li-ion|charging case|充电盒|power bank/.test(text)) signals.push("电池/DG");
  if (/适配器|电源|插头|adapter|charger|power supply|usb-c|type-c/.test(text)) signals.push("电源/适配器");
  if (/耳机|音箱|soundbar|speaker|headphone|earbuds|audio|cd player|播放/.test(text)) signals.push("音频整机");
  if (/维修|配件|零件|spare|repair|part/.test(text)) signals.push("维修件/配件");
  return signals;
}

function productQuery(product = "") {
  const text = clean(product).toLowerCase();
  if (/纸箱|纸盒|彩盒|carton|paperboard box|corrugated|packaging box|包装/.test(text)) return "cartons boxes paperboard";
  if (/lcd|液晶|显示屏|显示板|显示面板|指示板|indicator panel|display panel|display module/.test(text)) return "indicator panels liquid crystal display";
  if (/耳机|headphone|earbud|headset|tws/.test(text)) return "headphones";
  if (/音箱|speaker|soundbar|loudspeaker/.test(text)) return "loudspeakers";
  if (/电池|battery|li-ion|锂/.test(text)) return "lithium ion batteries";
  if (/适配器|charger|adapter|power supply|电源/.test(text)) return "power supply";
  if (/cd|播放|player/.test(text)) return "sound reproducing apparatus";
  return clean(product) || "audio equipment";
}

function productFamily(product = "", signals = []) {
  const text = clean(product).toLowerCase();
  if (signals.includes("包装/纸制品") || /纸箱|纸盒|彩盒|carton|paperboard box|corrugated|packaging box|包装/.test(text)) return "packaging";
  if (signals.includes("显示/指示面板")) return "display-panel";
  if (signals.includes("电池/DG")) return "battery";
  if (signals.includes("电源/适配器")) return "power";
  if (signals.includes("无线/蓝牙") || signals.includes("音频整机")) return "audio";
  return "general";
}

function productSpecificConclusion(profile, product, signals) {
  const family = productFamily(product, signals);
  const market = profile.market || "目标市场";
  const name = clean(product) || "该产品";
  if (family === "packaging") {
    return `${market}：${name}按纸制包装/纸箱方向准备资料，重点是材质、瓦楞/非瓦楞、成型状态、用途、尺寸/规格和是否印刷；没有命中电池、无线或电源词，不生成电池、DG、FCC/CE RED 等电子类要求。`;
  }
  if (family === "display-panel") {
    return `${market}：${name}按显示/指示面板方向核对，关键词命中 LCD/显示板/指示板；资料重点是显示技术、是否装有 LCD/LED、驱动板/接口、用途主机、品牌型号和是否只是裸屏，不按音箱整机或普通音频零件直接归入。`;
  }
  if (family === "battery") {
    return `${market}：${name}命中电池/DG 词，进口资料要同时覆盖商品归类、产品安全和运输危险品文件；运输侧重点是 UN38.3、MSDS/SDS、Wh、数量、包装方式和 UN3480/UN3481 边界。`;
  }
  if (family === "power") {
    return `${market}：${name}命中电源/适配器词，进口要求重点是电气安全、插头规格、能效或当地强制认证；如果没有电池词，不生成锂电池运输要求。`;
  }
  if (family === "audio") {
    const wireless = signals.includes("无线/蓝牙") ? "带无线/蓝牙时还要核对当地无线设备认证、频段、标签和证书持有人。" : "未命中无线词时，不自动套用无线认证要求。";
    return `${market}：${name}按音频产品方向核对，重点是整机/零件边界、用途、品牌型号、功能描述和候选税号；${wireless}`;
  }
  return `${market}：${name}没有命中电池、无线、电源、纸箱或显示面板等专项词，先按一般商品资料准备：完整品名、材质、用途、品牌、型号、规格、原产地、成交价格和候选 HS。`;
}

function requiredMaterials(profile, product, signals) {
  const family = productFamily(product, signals);
  const base = ["完整中文/英文品名", "品牌", "型号", "材质", "用途", "规格参数", "原产地", "商业发票", "装箱单", "提单/运单"];
  if (family === "packaging") {
    return ["纸张/纸板材质说明", "瓦楞或非瓦楞说明", "尺寸/规格", "是否印刷/是否成型", "用途：运输包装、销售包装或内包装", "原产地", "商业发票", "装箱单"];
  }
  if (family === "display-panel") {
    return ["显示技术：LCD/LED/其他", "是否为指示板/显示面板成品", "驱动板或控制接口说明", "用途主机", "品牌", "型号", "规格书", "商业发票", "装箱单"];
  }
  if (family === "battery") {
    return [...base, "电池规格书", "UN38.3 Test Summary", "MSDS/SDS", "Wh/电压/容量/数量", "包装方式", "运输危险性鉴定/承运人要求文件"];
  }
  if (family === "power") {
    return [...base, "输入/输出参数", "插头规格", "认证证书或测试报告", "标签样稿", "说明书"];
  }
  if (signals.includes("无线/蓝牙")) {
    return [...base, "无线模块/芯片资料", "频段和功率", "测试报告", "证书/认证编号", "标签样稿", "说明书"];
  }
  return base;
}

function liveRowsSummary(liveRows = []) {
  if (!liveRows.length) return ["本次可接入税则 API 未返回直接编码；当前结论来自内置国家规则和产品信号。"];
  return liveRows.map((row) => `${row.code || "编码待确认"}：${row.description}${row.duty ? `；税费/措施：${row.duty}` : ""}`);
}

function countryBaseConclusion(profile, product, signals) {
  const family = productFamily(product, signals);
  const raw = String(profile.customsConclusion || "");
  if (!raw) return "";
  if (family === "audio" || family === "battery" || family === "power") return raw;
  const sentences = raw
    .split(/(?<=[。.!?])\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((sentence) => !/消费|音频|无线|蓝牙|电池|电源|适配器|FCC|CE|RED|UKCA|NBTC|TISI|PSE|TELEC|MIC|ANATEL|INMETRO|SABER|SASO|ICASA|ISED|KC|WPC|SDPPI|NTC|BTK|TDRA/i.test(sentence));
  return sentences.join("") || `${profile.market || "目标市场"}进口通常先看商品编码、税率、估价、原产地、进口商资料、标签和许可证边界。`;
}

function relevantCompliance(profile, product, signals) {
  const family = productFamily(product, signals);
  if (family === "packaging") return [];
  return (profile.compliance || []).filter((item) => {
    const text = String(item || "");
    const wireless = /无线|蓝牙|FCC|RED|Radio|NBTC|TELEC|MIC|ANATEL|ICASA|ISED|WPC|SDPPI|NTC|BTK|TDRA|RRA|MCMC/i.test(text);
    const battery = /电池|锂|UN38|MSDS|Wh|DG|dangerous|battery/i.test(text);
    const power = /电源|适配器|插头|电气|能效|PSE|TISI|INMETRO|NOM|BIS|SNI|G-Mark|低压|SABER|SASO|RCM|SIRIM/i.test(text);
    const consumer = /消费电子|消费品|CE|RoHS|REACH|WEEE|EPR|标签|说明书|产品安全/i.test(text);
    if (wireless) return signals.includes("无线/蓝牙");
    if (battery) return signals.includes("电池/DG");
    if (power) return signals.includes("电源/适配器");
    if (consumer && family === "display-panel") return false;
    return true;
  });
}

async function fetchUsHts(product) {
  const url = new URL("https://hts.usitc.gov/reststop/search");
  url.searchParams.set("keyword", productQuery(product));
  const { ok, data } = await getJson(url);
  if (!ok || !Array.isArray(data)) return null;
  return data
    .filter((item) => item.htsno && item.description)
    .slice(0, 5)
    .map((item) => ({
      code: item.htsno,
      description: item.description,
      duty: item.general || item.tariff || "",
      note: item.additionalDuties || ""
    }));
}

function includedById(data = {}) {
  const map = new Map();
  (data.included || []).forEach((item) => map.set(`${item.type}:${item.id}`, item));
  return map;
}

async function fetchUkTariff(product) {
  const search = new URL("https://www.trade-tariff.service.gov.uk/uk/api/search");
  search.searchParams.set("q", productQuery(product));
  const searchResult = await getJson(search);
  const entry = searchResult.data?.data?.attributes?.entry;
  if (!searchResult.ok || !entry?.endpoint || !entry?.id) return null;

  const detailUrl = `https://www.trade-tariff.service.gov.uk/uk/api/${entry.endpoint}/${encodeURIComponent(entry.id)}`;
  const detail = await getJson(detailUrl);
  if (!detail.ok) return null;
  const included = includedById(detail.data);
  const commodities = (detail.data.included || [])
    .filter((item) => item.type === "commodity" && item.attributes?.declarable)
    .slice(0, 5)
    .map((item) => {
      const measureRefs = item.relationships?.overview_measures?.data || [];
      const measures = measureRefs
        .map((ref) => included.get(`${ref.type}:${ref.id}`))
        .filter(Boolean)
        .map((measure) => {
          const typeRef = measure.relationships?.measure_type?.data;
          const dutyRef = measure.relationships?.duty_expression?.data;
          const type = typeRef ? included.get(`${typeRef.type}:${typeRef.id}`)?.attributes?.description : "";
          const duty = dutyRef ? included.get(`${dutyRef.type}:${dutyRef.id}`)?.attributes?.verbose_duty : "";
          return [type, duty].filter(Boolean).join(": ");
        })
        .filter(Boolean);
      return {
        code: item.attributes.goods_nomenclature_item_id,
        description: item.attributes.description_plain,
        duty: measures.join("；")
      };
    });
  return commodities.length
    ? commodities
    : [
        {
          code: detail.data.data?.attributes?.goods_nomenclature_item_id || "",
          description: detail.data.data?.attributes?.description_plain || detail.data.data?.attributes?.description || "",
          duty: ""
        }
      ];
}

function buildSections(profile, product, signals, liveRows = []) {
  const family = productFamily(product, signals);
  const signalText = signals.length ? `本产品命中：${signals.join("、")}。` : "本产品没有命中专项监管词。";
  const baseConclusion = countryBaseConclusion(profile, product, signals);
  const compliance = relevantCompliance(profile, product, signals);
  return [
    {
      title: "结论",
      items: [
        baseConclusion,
        `${signalText}${productSpecificConclusion(profile, product, signals)}`
      ].filter(Boolean)
    },
    {
      title: "进口前要准备",
      items: [...requiredMaterials(profile, product, signals), ...compliance]
    },
    {
      title: "官方税则/API 命中",
      items: liveRowsSummary(liveRows)
    }
  ];
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "GET") return json(405, { ok: false, message: "Method not allowed" });

  const params = event.queryStringParameters || {};
  const product = clean(params.product) || "消费类音频产品";
  const country = clean(params.country) || "未指定";
  const profile = findMarket(country);
  const signals = detectSignals(product);
  let liveRows = [];
  let liveSource = "";
  let message = "";

  try {
    if (profile.id === "us") {
      liveRows = (await fetchUsHts(product)) || [];
      liveSource = "USITC HTS REST";
    } else if (profile.id === "uk") {
      liveRows = (await fetchUkTariff(product)) || [];
      liveSource = "UK Trade Tariff API";
    }
  } catch (error) {
    message = error.message || "Official tariff API failed.";
  }

  const family = productFamily(product, signals);
  const level = signals.includes("电池/DG") || signals.includes("无线/蓝牙")
    ? "中高关注"
    : signals.includes("电源/适配器") || signals.includes("显示/指示面板")
      ? "中等关注"
      : "常规关注";
  const conclusion = productSpecificConclusion(profile, product, signals);

  return json(200, {
    ok: true,
    source: liveSource || "内置目的国规则 + 官方入口",
    updatedAt: new Date().toISOString(),
    market: profile.market,
    product,
    level,
    signals,
    family,
    conclusion,
    customsConclusion: countryBaseConclusion(profile, product, signals),
    complianceConclusion: relevantCompliance(profile, product, signals).join(" "),
    sections: buildSections(profile, product, signals, liveRows),
    liveData: liveRows,
    sources: profile.sources,
    message
  });
};
