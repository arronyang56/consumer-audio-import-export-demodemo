const fs = require("fs");
const path = require("path");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const chinaTariffFile = path.join(__dirname, "..", "..", "site", "china-tariff-2026.js");
let chinaTariffCache = null;

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
    aliases: ["china", "中国", "大陆", "进口中国", "cn"],
    customsConclusion: "中国进口通常要求确认 10 位商品编码、监管条件、检验检疫类别、关税/增值税、申报要素和是否涉及 3C/无线电型号核准。",
    compliance: ["无线/蓝牙：核验无线电型号核准、频段和发射功率。", "电源/适配器：核验 3C 目录和认证证书。", "含电池：准备 MSDS、UN38.3、Wh、包装方式和运输限制说明。"],
    sources: [["中国 2026 进出口税则", "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm"], ["互联网+海关税目税号查询", "https://online.customs.gov.cn/ocportal/mySearch/"], ["中国国际贸易单一窗口", "https://www.singlewindow.cn/"], ["国家认证认可监督管理委员会", "https://www.cnca.gov.cn/"], ["工业和信息化部无线电管理", "https://www.miit.gov.cn/jgsj/wgj/index.html"], ["市场监管总局", "https://www.samr.gov.cn/"]]
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

function compactHs(value = "") {
  return String(value || "").replace(/\D/g, "");
}

function loadChinaTariffRows() {
  if (Array.isArray(chinaTariffCache)) return chinaTariffCache;
  try {
    const text = fs.readFileSync(chinaTariffFile, "utf8");
    const start = text.indexOf("[");
    const end = text.lastIndexOf("];");
    if (start < 0 || end < start) throw new Error("China tariff data shape not recognised.");
    chinaTariffCache = JSON.parse(text.slice(start, end + 1));
  } catch {
    chinaTariffCache = [];
  }
  return chinaTariffCache;
}

function findChinaTariffRecord(hs = "") {
  const code = compactHs(hs).slice(0, 8);
  if (!code) return null;
  return loadChinaTariffRows().find((row) => compactHs(row.hs || row.hs8) === code) || null;
}

function hasConcreteRate(value = "") {
  const text = String(value || "").trim();
  return text && text !== "-" && text !== "—" && text !== "待确认";
}

function getAppliedChinaRate(record = {}) {
  const provisional = record.provisionalRate || "";
  if (hasConcreteRate(provisional)) return { rate: provisional, type: "暂定税率" };
  return { rate: record.mfnRate || "待确认", type: "最惠国税率" };
}

function makeEvidence({ title, url, sourceType = "官方来源", usedFor = "", match = "", authority = "high" }) {
  return { title, url, sourceType, usedFor, match, authority };
}

const chinaProductRules = [
  {
    id: "wireless-earphone",
    hs: "85176294",
    score: 94,
    patterns: [/蓝牙耳机|无线耳机|tws|earbuds?|wireless headset|bluetooth headset|bluetooth earphone/i],
    rationale: "产品描述命中无线耳机/蓝牙耳机，优先匹配中国 2026 税则 8517.6294 无线耳机。",
    required: ["品牌型号", "蓝牙/无线模块资料", "频段和发射功率", "是否带充电盒和电池 Wh", "中文标签和说明书"]
  },
  {
    id: "wired-earphone",
    hs: "85183000",
    score: 82,
    patterns: [/耳机|耳塞|headphones?|headsets?|earphone/i],
    rationale: "产品描述命中耳机/耳塞，但未明确无线；按耳机、耳塞机方向初筛。",
    required: ["连接方式", "是否带麦克风", "品牌型号", "用途", "是否含电池或无线模块"]
  },
  {
    id: "soundbar-speaker",
    hs: "85182200",
    score: 84,
    patterns: [/soundbar|多喇叭|组合音箱|家庭影院|bar speaker|multi.?speaker/i],
    rationale: "产品描述命中多喇叭音箱/Soundbar，优先按多喇叭音箱方向初筛。",
    required: ["喇叭数量", "是否带箱体", "是否带功放", "额定功率", "是否含无线/电池"]
  },
  {
    id: "single-speaker",
    hs: "85182100",
    score: 78,
    patterns: [/单喇叭音箱|单扬声器音箱|single speaker/i],
    rationale: "产品描述命中单喇叭音箱，按 8518.2100 方向初筛。",
    required: ["是否单喇叭", "是否带箱体", "额定功率", "品牌型号"]
  },
  {
    id: "bluetooth-speaker",
    hs: "85182200",
    alternatives: ["85182100"],
    score: 86,
    patterns: [/蓝牙音箱|无线音箱|便携音箱|智能音箱|portable speaker|bluetooth speaker|wireless speaker|smart speaker/i],
    rationale: "产品描述命中蓝牙/无线音箱。若为多喇叭或组合音箱，优先按 8518.2200；若确认为单喇叭，再收敛至 8518.2100。",
    required: ["单喇叭/多喇叭", "是否带箱体", "是否带功放", "蓝牙/无线模块资料", "额定功率", "是否含电池"]
  },
  {
    id: "microphone",
    hs: "85181000",
    score: 84,
    patterns: [/麦克风|话筒|传声器|microphone|mic\b/i],
    rationale: "产品描述命中麦克风/传声器，按 8518.1000 方向初筛。",
    required: ["有线/无线", "是否带接收器", "频段", "用途", "品牌型号", "是否带电池"]
  },
  {
    id: "speaker-driver",
    hs: "85182900",
    score: 76,
    patterns: [/扬声器|喇叭|speaker driver|loudspeaker|woofer|tweeter|中音单元|低音单元|高音单元/i],
    rationale: "产品描述命中扬声器/喇叭单元；若不是完整音箱，优先按其他扬声器方向初筛。",
    required: ["是否无箱体", "喇叭数量", "尺寸/功率", "用途主机", "是否只是零件"]
  },
  {
    id: "amplifier",
    hs: "85184000",
    score: 82,
    patterns: [/功放|音频扩大器|amplifier|power amp/i],
    rationale: "产品描述命中音频扩大器/功放，按功放成品方向初筛。",
    required: ["是否完整成品", "输入/输出接口", "额定功率", "声道数", "电源方式"]
  },
  {
    id: "audio-parts",
    hs: "85189000",
    score: 72,
    patterns: [/音频.*零件|音箱.*零件|功放板|功放.*板|pcba|pcb assembly|amplifier board|维修件|配件|spare part|audio parts/i],
    rationale: "产品描述命中音频设备零件/板卡/维修件；需确认是否专用于 8518 项下音频设备。",
    required: ["用途主机", "是否专用于音频设备", "是否裸 PCB", "是否装配元器件", "功能说明"]
  },
  {
    id: "display-panel",
    hs: "85312000",
    score: 84,
    patterns: [/lcd|led|显示板|显示屏|显示面板|指示板|indicator panel|display module|display panel/i],
    rationale: "产品描述命中 LCD/LED 显示板或指示板，按 8531.2000 方向初筛。",
    required: ["显示技术", "是否为指示板/显示模块", "接口/驱动板说明", "用途主机", "规格书"]
  },
  {
    id: "paper-carton",
    hs: "48191000",
    score: 90,
    patterns: [/纸箱|瓦楞纸箱|外箱|纸盒|carton|corrugated box|paperboard box/i],
    rationale: "产品描述命中瓦楞纸箱/纸板箱，按 4819.1000 方向初筛。",
    required: ["是否瓦楞纸", "是否成型", "尺寸/规格", "是否印刷", "用途和原产地"]
  },
  {
    id: "power-adapter",
    hs: "85044014",
    alternatives: ["85044099"],
    score: 70,
    patterns: [/电源适配器|充电器|稳压电源|power adapter|charger|power supply|ac.?dc/i],
    rationale: "产品描述命中电源适配器/电源转换设备；8504.40 项下子目依功率、用途、精度和结构分流，需补电气参数后定案。",
    required: ["输入/输出电压电流", "额定功率", "AC/DC 结构", "是否随整机进口", "插头形式", "是否中国内销"]
  },
  {
    id: "data-cable",
    hs: "85444229",
    alternatives: ["85444219", "85444211"],
    score: 78,
    patterns: [/数据线|充电线|usb.?c|type.?c|lightning|连接线|电缆|cable|wire harness|线束/i],
    rationale: "产品描述命中带接头电导体/数据线。额定电压、用途和是否为汽车线束会影响 8544 项下子目，当前先按低压带接头线缆方向初筛。",
    required: ["两端接头类型", "额定电压", "是否用于汽车/机器", "是否单独销售", "线长", "导体材质"]
  },
  {
    id: "router",
    hs: "85176236",
    alternatives: ["85176295", "85176299"],
    score: 86,
    patterns: [/路由器|router|网关|gateway|mesh/i],
    rationale: "产品描述命中路由器/网关。普通路由器优先按 8517.6236；若明确为无线路由器，可复核 8517.6295。",
    required: ["有线/无线", "Wi-Fi/蜂窝通信制式", "端口数量", "是否带电源适配器", "品牌型号", "无线电资料"]
  },
  {
    id: "plastic-parts",
    hs: "39269090",
    alternatives: ["39269010"],
    score: 72,
    patterns: [/塑胶件|塑料件|塑料外壳|塑胶外壳|注塑件|外壳|plastic housing|plastic part|injection molded/i],
    rationale: "产品描述命中塑料/塑胶外壳或注塑件。若能证明专用于特定整机，可能需回到零件归类；当前先按其他塑料制品方向初筛。",
    required: ["材质树脂", "用途主机", "是否专用零件", "是否单独销售", "成型方式", "图片/图纸"]
  },
  {
    id: "steel-screws",
    hs: "73181590",
    alternatives: ["73181400"],
    score: 74,
    patterns: [/螺丝|螺钉|螺栓|螺母|自攻螺丝|screw|bolt|nut/i],
    rationale: "产品描述命中钢铁螺钉/螺栓/紧固件。是否自攻、材质和是否带垫圈会影响 7318 项下子目。",
    required: ["材质", "是否自攻", "直径/长度", "是否带螺母或垫圈", "用途", "表面处理"]
  },
  {
    id: "paper-label",
    hs: "48211000",
    alternatives: ["48209000"],
    score: 76,
    patterns: [/纸标签|贴纸|纸质标签|不干胶标签|label|sticker/i],
    rationale: "产品描述命中纸质标签/贴纸；若为纸或纸板标签，不论是否印制，优先按 4821 项下复核。",
    required: ["材质：纸/塑料/纺织", "是否印制", "是否自粘", "尺寸", "用途", "成卷或裁切"]
  },
  {
    id: "printed-manual",
    hs: "49111090",
    alternatives: ["49111010"],
    score: 68,
    patterns: [/说明书|宣传册|彩页|保修卡|用户手册|manual|leaflet|brochure|warranty card/i],
    rationale: "产品描述命中印刷说明书/宣传资料，按 4911 项下印刷品方向初筛；若只是随整机附带，需确认是否与整机合并申报。",
    required: ["印刷内容", "是否商业广告资料", "是否随整机附带", "数量", "材质", "语言版本"]
  },
  {
    id: "generic-electronic-device",
    hs: "85437099",
    alternatives: ["85437091", "85437092"],
    score: 60,
    patterns: [/电子设备|电子模块|控制器|遥控器|电子产品|electronic device|controller|remote control|module/i],
    rationale: "产品描述过宽，仅命中未列名电子设备方向；必须补功能、工作原理和用途后再定税号。",
    required: ["具体功能", "工作原理", "是否收发信号", "用途主机", "是否完整成品", "品牌型号"]
  },
  {
    id: "lithium-battery",
    hs: "85076000",
    score: 78,
    patterns: [/锂电池|锂离子|battery|li-ion|lithium/i],
    rationale: "产品描述命中锂离子电池，按 8507.6000 方向初筛；如电池已装入设备，则应回到整机税号判断。",
    required: ["电池型号", "容量/Wh", "是否单独进口", "UN38.3", "MSDS/SDS", "包装方式"]
  },
  {
    id: "power-bank",
    hs: "85076000",
    score: 74,
    patterns: [/移动电源|充电宝|power bank|portable charger/i],
    rationale: "产品描述命中移动电源/充电宝。归类和监管通常不只看电池，还要看外壳、电路、输出口和成品用途；当前先按锂离子蓄电池方向初筛并提示 DG 文件。",
    required: ["容量/Wh", "输入输出参数", "电芯类型", "UN38.3", "MSDS/SDS", "包装和 SOC"]
  }
];

const chinaGenericRequiredFields = ["中文品名", "品牌型号", "材质/用途", "工作原理", "规格参数", "原产国", "成交价格", "图片/规格书"];

function detectHsFromInput(product = "", params = {}) {
  const direct = compactHs(params.hs || params.code || "");
  if (direct.length >= 6) return direct.slice(0, 8);
  const textHit = String(product || "").match(/\b\d{8,10}\b/);
  return textHit ? textHit[0].slice(0, 8) : "";
}

function buildChinaTariffCandidate(rule, direct = false) {
  const record = findChinaTariffRecord(rule.hs);
  if (!record) return null;
  const applied = getAppliedChinaRate(record);
  return {
    code: record.hs8 || record.hs || rule.hs,
    codeDisplay: record.codeDisplay || record.hs8 || rule.hs,
    name: record.name || "",
    appliedRate: applied.rate,
    appliedRateType: applied.type,
    mfnRate: record.mfnRate || "待确认",
    provisionalRate: record.provisionalRate || "-",
    ordinaryRate: record.ordinaryRate || "待确认",
    importVat: record.importVat || "按进口环节增值税现行政策确认",
    confidence: direct ? Math.max(rule.score || 88, 92) : rule.score || 70,
    rationale: direct ? "用户输入了候选 HS，系统直接匹配中国 2026 税则基础库。" : rule.rationale,
    requiredFields: rule.required || [],
    sourceTitle: record.sourceTitle || "财政部：中华人民共和国进出口税则（2026）",
    sourceUrl: record.sourceUrl || "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm",
    verifyUrl: record.verifyUrl || "https://online.customs.gov.cn/ocportal/mySearch/",
    dataSource: "中国 2026 进出口税则基础库"
  };
}

function extractChinaSearchTerms(product = "") {
  const text = clean(product).toLowerCase();
  const terms = new Set();
  [
    "蓝牙", "无线", "耳机", "耳塞", "音箱", "扬声器", "喇叭", "麦克风", "话筒", "功放", "适配器", "充电器",
    "电源", "锂电池", "电池", "移动电源", "充电宝", "纸箱", "纸盒", "标签", "说明书", "塑料", "塑胶",
    "外壳", "螺丝", "螺钉", "路由器", "数据线", "电缆", "线束", "显示屏", "显示板", "摄像头"
  ].forEach((term) => {
    if (text.includes(term)) terms.add(term);
  });
  String(product || "")
    .split(/[\s,，、/;；|()（）]+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2 && item.length <= 24 && !/^\d+(\.\d+)?(w|v|a|mah|wh|kg|cm|mm)?$/i.test(item))
    .forEach((item) => terms.add(item.toLowerCase()));
  return Array.from(terms).slice(0, 10);
}

function scoreChinaTariffRecord(row = {}, terms = [], product = "") {
  const haystack = clean([row.hs, row.codeDisplay, row.name, row.keywords].filter(Boolean).join(" ")).toLowerCase();
  if (!haystack || !terms.length) return 0;
  let score = 0;
  terms.forEach((term) => {
    const key = String(term || "").toLowerCase();
    if (!key) return;
    if (haystack.includes(key)) score += key.length >= 4 ? 18 : 12;
    if (String(row.name || "").toLowerCase() === key) score += 28;
  });
  const productText = String(product || "").toLowerCase();
  if (/无线|蓝牙|bluetooth|wireless/.test(productText) && /无线/.test(haystack)) score += 12;
  if (/耳机|earphone|headset|earbud/.test(productText) && /耳机|耳塞/.test(haystack)) score += 18;
  if (/音箱|speaker/.test(productText) && /音箱|扬声器/.test(haystack)) score += 16;
  if (/纸箱|carton|box/.test(productText) && /纸|纸板|纸箱/.test(haystack)) score += 16;
  if (/其他|未列名/.test(row.name || "")) score -= 8;
  if (/税目|本章|以上|以下/.test(row.name || "")) score -= 6;
  return score;
}

function buildChinaTariffSearchCandidates(product = "", usedCodes = new Set()) {
  const terms = extractChinaSearchTerms(product);
  if (!terms.length) return [];
  return loadChinaTariffRows()
    .map((row) => ({ row, score: scoreChinaTariffRecord(row, terms, product) }))
    .filter(({ row, score }) => score >= 32 && !usedCodes.has(row.hs8 || row.hs))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ row, score }) => buildChinaTariffCandidate({
      hs: row.hs8 || row.hs,
      score: Math.max(55, Math.min(78, score)),
      rationale: `未命中特定业务规则，系统按输入关键词（${terms.slice(0, 4).join("、")}）在中国 2026 税则基础库中检索到相近条目。`,
      required: chinaGenericRequiredFields
    }))
    .filter(Boolean);
}

function buildChinaTariffCandidates(product = "", params = {}) {
  const text = String(product || "");
  const hs = detectHsFromInput(text, params);
  const wirelessEarphoneHit = chinaProductRules.find((rule) => rule.id === "wireless-earphone")?.patterns.some((pattern) => pattern.test(text));
  const componentHit = /外壳|壳料|塑胶件|塑料件|注塑件|零件|配件|维修件|spare|repair|parts?|housing|component/i.test(text);
  const finishedHit = /整机|成品|套装|完整|complete|finished|whole/i.test(text);
  const finishedProductRuleIds = new Set(["wireless-earphone", "wired-earphone", "bluetooth-speaker", "soundbar-speaker", "single-speaker", "microphone", "amplifier", "router"]);
  const directCandidates = [];
  if (hs) {
    const record = findChinaTariffRecord(hs);
    if (record) {
      directCandidates.push(buildChinaTariffCandidate({
        hs: record.hs8 || record.hs,
        score: 96,
        required: ["品名", "品牌型号", "材质/用途", "规格参数", "原产国", "成交价格"]
      }, true));
    }
  }

  const ruleCandidates = chinaProductRules
    .filter((rule) => {
      if (!rule.patterns.some((pattern) => pattern.test(text))) return false;
      if (componentHit && !finishedHit && finishedProductRuleIds.has(rule.id)) return false;
      if (rule.id === "wired-earphone" && wirelessEarphoneHit) return false;
      if (rule.id === "lithium-battery" && /内置|内含|带.*电池|含.*电池|配有.*电池|充电盒|耳机|音箱|speaker|headphones?|earbuds?/i.test(text)) return false;
      return true;
    })
    .flatMap((rule) => [buildChinaTariffCandidate(rule), ...(rule.alternatives || []).map((hsCode) => buildChinaTariffCandidate({ ...rule, hs: hsCode, score: Math.max((rule.score || 70) - 8, 55), rationale: `${rule.rationale} 另列 ${hsCode} 作为参数不完整时的备选子目。` }))])
    .filter(Boolean);

  const seen = new Set();
  const searchCandidates = buildChinaTariffSearchCandidates(text, new Set([...directCandidates, ...ruleCandidates].map((candidate) => candidate.code)));
  return [...directCandidates, ...ruleCandidates, ...searchCandidates]
    .filter((candidate) => {
      const key = candidate.code;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 5);
}

function buildChinaActionItems(signals = [], candidate = null) {
  const items = [
    "直接按上方候选税号核算基础关税；如输入了原产国，再判断是否叠加额外关税或贸易措施。",
    "申报资料至少准备：中文品名、品牌、型号、用途、材质/功能、规格参数、图片、发票、装箱单、提单/运单。"
  ];
  if (candidate?.requiredFields?.length) items.push(`当前税号定案还缺：${candidate.requiredFields.join("、")}。`);
  if (signals.includes("无线/蓝牙")) items.push("命中无线/蓝牙：同步判断 SRRC/无线电型号核准、频段、发射功率、标签和说明书。");
  if (signals.includes("电池/DG")) items.push("命中电池：同步准备 MSDS/SDS、UN38.3 Test Summary、Wh、包装方式和承运限制说明。");
  if (signals.includes("电源/适配器")) items.push("命中电源/适配器：同步判断 CCC 目录边界、输入输出参数、插头和是否随整机进口。");
  return items;
}

function originFromParams(params = {}, product = "") {
  return clean(params.origin || params.originCountry || params.exportCountry || params.sourceCountry || params.from || "") ||
    (String(product || "").match(/(?:原产国|产地|origin)[:：]?\s*([A-Za-z\u4e00-\u9fa5 ]{2,20})/i)?.[1] || "");
}

function buildChinaGaps(product = "", signals = [], candidates = [], params = {}) {
  const gaps = [];
  const text = String(product || "");
  if (!detectHsFromInput(text)) gaps.push("未输入候选 HS，当前税号由品名关键词初筛。");
  if (!originFromParams(params, text) && !/美国|中国|日本|越南|泰国|欧盟|德国|英国|巴西|origin|原产/i.test(text)) gaps.push("原产国未填写，不能自动判断对美加征、协定税率或其他原产地措施。");
  if (/音箱|speaker|喇叭|扬声器/i.test(text) && !/单喇叭|多喇叭|箱体|无箱体|soundbar|driver|woofer|tweeter/i.test(text)) gaps.push("音箱/扬声器类需补：单喇叭或多喇叭、是否带箱体、是否只是喇叭单元。");
  if (signals.includes("电源/适配器") && !/(\d+\s*w|\d+\s*瓦|\d+v|伏|a\b|安)/i.test(text)) gaps.push("电源类缺输入输出、电压电流、功率和用途，8504.40 子目只能先给备选。");
  if (candidates.length > 1) gaps.push("存在多个候选税号，请按上方缺口补资料后收敛到一个申报税号。");
  return gaps;
}

function buildChinaOriginAssessment(params = {}, product = "") {
  const origin = originFromParams(params, product);
  if (!origin) {
    return {
      label: "原产国缺失",
      opinion: "当前不能判断协定税率、贸易措施或原产地证路径；报价和税费只能按基础税率先估。",
      actions: ["补原产国/地区。", "确认是否有原产地证、RCEP/其他协定税率适用可能。"]
    };
  }
  if (/中国|大陆|china|cn/i.test(origin)) {
    return {
      label: "原产国：中国",
      opinion: "如果货物进口中国且原产国也是中国，要先判断是否属于退运、返修、复进口或保税流转，不应简单按一般进口口径处理。",
      actions: ["确认贸易方式：一般贸易、退运、修理物品、保税或暂时进出境。", "准备原出口报关单、维修说明或退运原因资料。"]
    };
  }
  if (/越南|泰国|马来|新加坡|印尼|菲律宾|老挝|柬埔寨|缅甸|asean|vietnam|thailand|malaysia|singapore|indonesia|philippines/i.test(origin)) {
    return {
      label: `原产国：${origin}`,
      opinion: "东盟来源建议同步评估 RCEP/中国-东盟协定税率，但能否享惠取决于原产地规则和证书，不自动默认低税率。",
      actions: ["确认 HS 对应协定税率。", "确认原产地证格式、直运规则和生产工序是否满足原产地标准。"]
    };
  }
  if (/美国|usa|united states|us/i.test(origin)) {
    return {
      label: "原产国：美国",
      opinion: "美国原产进口中国时，要额外核对是否涉及对美加征、排除清单、反倾销/反补贴或其他贸易措施。",
      actions: ["让报关行按 10 位税号复核对美措施。", "报价中单独列基础关税、增值税和可能叠加税费。"]
    };
  }
  return {
    label: `原产国：${origin}`,
    opinion: "已获得原产国信息，可以进入协定税率、原产地证和贸易措施判断；是否享惠仍需按 10 位税号和证书复核。",
    actions: ["确认是否有可用原产地证。", "让报关行按税号核对协定税率和贸易措施。"]
  };
}

function buildChinaDeclarationElements(product = "", signals = [], candidate = null) {
  const elements = new Set(["品名", "品牌类型", "出口享惠情况", "用途", "材质", "品牌", "型号", "规格参数"]);
  if (candidate?.codeDisplay) elements.add(`候选税号：${candidate.codeDisplay}`);
  if (signals.includes("无线/蓝牙")) ["无线功能", "频段", "发射功率", "无线模块/芯片", "是否带接收器"].forEach((item) => elements.add(item));
  if (signals.includes("电池/DG")) ["电池类型", "容量/Wh", "是否单独电池", "UN38.3", "MSDS/SDS", "包装方式"].forEach((item) => elements.add(item));
  if (signals.includes("电源/适配器")) ["输入电压电流", "输出电压电流", "额定功率", "插头形式", "是否随整机"].forEach((item) => elements.add(item));
  if (signals.includes("线缆/连接器")) ["接头类型", "额定电压", "导体材质", "线长", "用途设备"].forEach((item) => elements.add(item));
  if (signals.includes("塑料/外壳")) ["塑料材质", "成型方式", "用途主机", "是否专用零件", "图纸/图片"].forEach((item) => elements.add(item));
  if (signals.includes("五金/紧固件")) ["材质", "是否自攻", "尺寸", "表面处理", "是否带垫圈/螺母"].forEach((item) => elements.add(item));
  if (signals.includes("印刷/标签")) ["材质", "是否印制", "内容用途", "尺寸", "成卷或裁切"].forEach((item) => elements.add(item));
  return Array.from(elements).slice(0, 18);
}

function buildChinaRegulatoryNotes(signals = [], candidate = null) {
  const notes = [];
  if (candidate) notes.push(`税率先按 ${candidate.appliedRateType} ${candidate.appliedRate} 估算，正式仍以通关时税则和海关解释为准。`);
  if (signals.includes("无线/蓝牙")) notes.push("无线/蓝牙产品在中国进口或内销前，要判断 SRRC 无线电型号核准和标签说明书要求。");
  if (signals.includes("电源/适配器")) notes.push("电源/适配器、电源线、带电产品要判断 CCC 目录边界，不要只看税号。");
  if (signals.includes("电池/DG")) notes.push("电池或含电设备同时影响运输：空运/快递/海运 DG 文件、包装、SOC 和承运限制要提前确认。");
  if (signals.includes("维修件/配件")) notes.push("维修件/零件要确认是否专用于整机、是否成套进口，以及是否可按零件或整机归类。");
  if (signals.includes("包装/纸制品")) notes.push("包装物要区分运输包装、零售包装、标签/说明书，不能和整机自动合并。");
  return notes.length ? notes : ["当前未命中无线、电池、电源等专项监管词，先按一般商品归类、估价、原产地和单证完整性复核。"];
}

function buildChinaRedFlags(product = "", signals = [], gaps = []) {
  const text = String(product || "");
  const flags = [];
  if (/样品|sample/i.test(text)) flags.push("样品不等于免税或免证；仍要看数量、价值、用途和监管条件。");
  if (/维修|退运|返修|repair|return/i.test(text)) flags.push("维修/退运场景不能直接按一般贸易处理，要先确认贸易方式和旧件资料。");
  if (signals.includes("无线/蓝牙") && !/型号|model|频段|功率|fcc|srrc/i.test(text)) flags.push("无线产品缺型号、频段、功率或证书信息，认证判断不可靠。");
  if (signals.includes("电池/DG") && !/(wh|mah|毫安|瓦时|un38|msds|sds)/i.test(text)) flags.push("含电池但缺 Wh、UN38.3 或 MSDS/SDS，运输结论不能定。");
  if (signals.includes("电源/适配器") && !/(\d+\s*w|\d+\s*瓦|\d+v|伏|a\b|安)/i.test(text)) flags.push("电源类缺电气参数，CCC 和子目判断都会变弱。");
  if (gaps.length >= 3) flags.push("缺口较多，当前结论只能用于初筛，不建议直接给客户承诺税费或清关资料。");
  return flags;
}

function buildChinaNextQuestions(signals = [], candidate = null) {
  const questions = ["这个货是进口中国内销、退运返修，还是保税/暂时进出境？", "原产国和是否有原产地证是什么？"];
  if (!candidate) questions.push("有没有候选 HS、图片、规格书或历史报关单？");
  if (signals.includes("无线/蓝牙")) questions.push("是否有 SRRC/无线电型号核准、频段和发射功率资料？");
  if (signals.includes("电池/DG")) questions.push("电池是单独进口还是装在设备内？Wh、UN38.3、MSDS/SDS 是否齐？");
  if (signals.includes("电源/适配器")) questions.push("适配器输入输出、功率、插头和 CCC 证书状态是什么？");
  if (signals.includes("线缆/连接器")) questions.push("线缆两端接头、额定电压和用途设备是什么？");
  return questions.slice(0, 6);
}

function buildChinaIndependentOpinion({ product = "", signals = [], candidates = [], gaps = [], reliability = {} }) {
  const main = candidates[0];
  if (!main) {
    return `我的判断：${product} 现在不能直接给税号。问题不是数据库没有，而是输入信息还不足以把税则表收敛到一个条目；先补用途、材质、功能、图片/规格书和候选 HS。`;
  }
  if ((main.confidence || 0) >= 88 && gaps.length <= 2) {
    return `我的判断：${product} 可以先按 ${main.codeDisplay} 做报价和资料清单初稿，但正式申报前仍要用品牌型号、规格书和原产国把监管条件、认证和税费补齐。`;
  }
  if (signals.includes("电池/DG")) {
    return `我的判断：税号只是第一步。${product} 同时命中 ${signals.join("、")}，真正容易出问题的是认证、危险品文件、标签和报关资料口径不一致。`;
  }
  if (signals.includes("无线/蓝牙") || signals.includes("电源/适配器")) {
    const concerns = [
      signals.includes("无线/蓝牙") && "无线认证/频段功率",
      signals.includes("电源/适配器") && "电气参数/CCC边界",
      signals.includes("线缆/连接器") && "接头/额定电压/用途",
      signals.includes("塑料/外壳") && "材质/用途主机",
      signals.includes("印刷/标签") && "材质/印刷内容"
    ].filter(Boolean).join("、");
    return `我的判断：${product} 的风险不只在税号，还在${concerns || "认证、标签和申报要素"}是否一致；不能只凭品名就给最终清关结论。`;
  }
  return `我的判断：${product} 已有候选方向 ${main.codeDisplay}，但可信度是 ${reliability.label || "待复核"}；下一步要用缺口问题把候选压缩到一个可申报税号。`;
}

function scoreReliability({ candidates = [], gaps = [], liveSource = "", profile = {}, signals = [] }) {
  let score = 48;
  if (candidates.length) score += 22;
  if (candidates[0]?.confidence) score += Math.min(18, Math.round((candidates[0].confidence - 60) / 2));
  if (liveSource) score += 10;
  if (profile.id === "cn" && candidates.length) score += 10;
  if (signals.length) score += 4;
  score -= Math.min(24, gaps.length * 6);
  score = Math.max(25, Math.min(96, score));
  const label = score >= 85 ? "高可信：可作为操作参考" : score >= 72 ? "中高可信：可用于报价初筛" : score >= 58 ? "中可信：需补资料复核" : "低可信：仅做方向提示";
  return { score, label };
}

function buildChinaEvidence(profile, candidates, signals) {
  const evidence = [
    makeEvidence({
      title: "财政部：中华人民共和国进出口税则（2026）",
      url: candidates[0]?.sourceUrl || "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm",
      usedFor: "候选商品编码、最惠国税率、暂定税率、普通税率",
      match: candidates[0] ? `${candidates[0].codeDisplay} ${candidates[0].name}` : "未命中具体税号"
    }),
    makeEvidence({
      title: "互联网+海关：税目税号/税率查询",
      url: "https://online.customs.gov.cn/ocportal/mySearch/",
      usedFor: "正式申报前复核税目、税率、监管条件和通关口径",
      match: "作为核验入口，不要求用户自行查询才给结论"
    })
  ];
  if (signals.includes("无线/蓝牙")) {
    evidence.push(makeEvidence({ title: "工业和信息化部无线电管理局", url: "https://www.miit.gov.cn/jgsj/wgj/index.html", usedFor: "无线电型号核准、频率和发射功率口径", match: "产品命中无线/蓝牙" }));
  }
  if (signals.includes("电源/适配器") || signals.includes("音频整机")) {
    evidence.push(makeEvidence({ title: "国家认证认可监督管理委员会", url: "https://www.cnca.gov.cn/", usedFor: "CCC 目录、认证实施规则和认证结果核验", match: "产品可能涉及中国强制性产品认证边界" }));
  }
  evidence.push(makeEvidence({ title: "中国国际贸易单一窗口", url: "https://www.singlewindow.cn/", usedFor: "通关申报、监管证件、申报资料提交", match: profile.market || "中国" }));
  return evidence;
}

function buildChinaDirectResult({ profile, product, signals, params }) {
  const candidates = buildChinaTariffCandidates(product, params);
  const main = candidates[0] || null;
  const gaps = buildChinaGaps(product, signals, candidates, params);
  const reliability = scoreReliability({ candidates, gaps, liveSource: main ? "中国 2026 税则基础库" : "", profile, signals });
  const actionItems = buildChinaActionItems(signals, main);
  const evidence = buildChinaEvidence(profile, candidates, signals);
  const originAssessment = buildChinaOriginAssessment(params, product);
  const declarationElements = buildChinaDeclarationElements(product, signals, main);
  const regulatoryNotes = buildChinaRegulatoryNotes(signals, main);
  const redFlags = buildChinaRedFlags(product, signals, gaps);
  const nextQuestions = buildChinaNextQuestions(signals, main);
  const independentOpinion = buildChinaIndependentOpinion({ product, signals, candidates, gaps, reliability });
  const direct = main
    ? `中国进口初判：${product} 优先按 ${main.codeDisplay}（${main.name}）方向处理；当前适用 ${main.appliedRateType} ${main.appliedRate}，普通税率 ${main.ordinaryRate}，进口增值税按现行政策确认。`
    : `中国进口初判：${product} 暂未从已接入的中国 2026 税则库命中具体税号；请补充更完整品名、用途、材质、功能和候选 HS。`;
  const compliance = relevantCompliance(profile, product, signals);
  const sourceStatus = main ? "中国税则基础库已接入；中国官方查询网页保留为核验证据。" : "中国官方查询网页暂无稳定公开 API；当前等待更多产品信息后再匹配本地税则库。";
  return {
    candidates,
    gaps,
    reliability,
    actionItems,
    evidence,
    independentOpinion,
    declarationElements,
    regulatoryNotes,
    redFlags,
    nextQuestions,
    originAssessment,
    conclusion: `${direct}${compliance.length ? ` ${compliance.join(" ")}` : ""} 可信度：${reliability.label}。`,
    sections: [
      {
        title: "直接结果",
        items: [
          direct,
          independentOpinion,
          main ? `税费口径：${main.appliedRateType} ${main.appliedRate}；最惠国 ${main.mfnRate}；暂定 ${main.provisionalRate}；普通 ${main.ordinaryRate}。` : "暂未形成可核算税率。",
          originAssessment.opinion,
          ...actionItems
        ]
      },
      {
        title: "需要补充/人工复核",
        items: gaps.length ? gaps : ["当前输入已能形成初筛结论；正式申报仍需由关务或报关行按票据和监管条件复核。"]
      },
      {
        title: "API/数据状态",
        items: [
          "已接入：中国 2026 进出口税则基础库，可按用户输入直接返回候选税号和税率。",
          sourceStatus,
          "已接入：英国 Trade Tariff 官方 API；美国 HTS 查询接口；其他国家先返回规则库和官方来源证据。"
        ]
      }
    ]
  };
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
  if (/标签|贴纸|说明书|宣传册|保修卡|label|sticker|manual|leaflet|brochure|warranty/.test(text)) signals.push("印刷/标签");
  if (/lcd|液晶|显示屏|显示板|显示面板|指示板|indicator panel|display panel|display module/.test(text)) signals.push("显示/指示面板");
  if (/蓝牙|无线|wifi|wi-fi|bluetooth|wireless|radio|tws/.test(text)) signals.push("无线/蓝牙");
  if (/电池|锂|battery|li-ion|charging case|充电盒|power bank/.test(text)) signals.push("电池/DG");
  if (/适配器|电源|插头|adapter|charger|power supply|usb-c|type-c/.test(text)) signals.push("电源/适配器");
  if (/数据线|连接线|线束|电缆|cable|wire harness/.test(text)) signals.push("线缆/连接器");
  if (/塑料|塑胶|外壳|注塑|plastic|housing|injection molded/.test(text)) signals.push("塑料/外壳");
  if (/螺丝|螺钉|螺栓|螺母|紧固件|screw|bolt|nut|fastener/.test(text)) signals.push("五金/紧固件");
  if (/耳机|音箱|soundbar|speaker|headphone|earbuds|audio|cd player|播放|麦克风|话筒|microphone/.test(text)) signals.push("音频整机");
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
  if (signals.includes("线缆/连接器")) return "cable";
  if (signals.includes("塑料/外壳")) return "plastic-part";
  if (signals.includes("五金/紧固件")) return "hardware";
  if (signals.includes("印刷/标签")) return "printed";
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
  if (family === "cable") {
    return `${market}：${name}按线缆/连接器方向核对，重点是是否带接头、额定电压、导体材质、用途设备和是否为汽车/机器线束；不要因为写了 USB-C 就自动归到充电器。`;
  }
  if (family === "plastic-part") {
    return `${market}：${name}按塑料件/外壳方向核对，先确认材质、用途主机、是否专用零件和是否单独销售；若确认为整机专用零件，可能需要回到对应整机零件项复核。`;
  }
  if (family === "hardware") {
    return `${market}：${name}按五金紧固件方向核对，重点是材质、是否自攻、尺寸、表面处理和是否带垫圈/螺母。`;
  }
  if (family === "printed") {
    return `${market}：${name}按印刷品/标签方向核对，重点是材质、是否印制、是否自粘、内容用途和是否随整机附带。`;
  }
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
  if (family === "cable") {
    return ["两端接头类型", "额定电压", "导体材质", "线长", "用途设备", "是否汽车/机器线束", "原产地", "商业发票", "装箱单"];
  }
  if (family === "plastic-part") {
    return ["塑料材质", "用途主机", "是否专用零件", "图纸/图片", "成型方式", "是否单独销售", "原产地", "商业发票", "装箱单"];
  }
  if (family === "hardware") {
    return ["材质", "尺寸", "是否自攻", "表面处理", "是否带螺母/垫圈", "用途", "原产地", "商业发票", "装箱单"];
  }
  if (family === "printed") {
    return ["材质", "是否印制", "印刷内容", "是否自粘", "尺寸", "成卷或裁切", "是否随整机附带", "原产地", "商业发票", "装箱单"];
  }
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
  if (["packaging", "printed", "plastic-part", "hardware", "cable"].includes(family) && !signals.includes("无线/蓝牙") && !signals.includes("电池/DG") && !signals.includes("电源/适配器")) return [];
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
    } else if (profile.id === "cn") {
      liveSource = "中国 2026 税则基础库";
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
  const chinaDirect = profile.id === "cn" ? buildChinaDirectResult({ profile, product, signals, params }) : null;
  const nonChinaGaps = liveRows.length ? [] : ["当前目的国暂无直接税则 API 命中，结果来自规则库和官方来源证据。"];
  const nonChinaReliability = scoreReliability({ candidates: liveRows, gaps: nonChinaGaps, liveSource, profile, signals });
  const conclusion = chinaDirect?.conclusion || productSpecificConclusion(profile, product, signals);

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
    sections: chinaDirect?.sections || buildSections(profile, product, signals, liveRows),
    liveData: liveRows,
    tariffCandidates: chinaDirect?.candidates || [],
    confidenceScore: chinaDirect?.reliability?.score || nonChinaReliability.score,
    confidenceLabel: chinaDirect?.reliability?.label || nonChinaReliability.label,
    evidence: chinaDirect?.evidence || profile.sources.map(([title, url]) => makeEvidence({ title, url, usedFor: "目的国规则和人工核验来源", match: profile.market, authority: liveSource ? "medium" : "reference" })),
    independentOpinion: chinaDirect?.independentOpinion || "",
    declarationElements: chinaDirect?.declarationElements || [],
    regulatoryNotes: chinaDirect?.regulatoryNotes || [],
    redFlags: chinaDirect?.redFlags || [],
    nextQuestions: chinaDirect?.nextQuestions || [],
    originAssessment: chinaDirect?.originAssessment || null,
    gaps: chinaDirect?.gaps || nonChinaGaps,
    actionItems: chinaDirect?.actionItems || requiredMaterials(profile, product, signals).slice(0, 8),
    apiStatus: [
      { source: liveSource || "规则库", status: liveRows.length || chinaDirect?.candidates?.length ? "已返回结构化结果" : "未返回直接编码" },
      { source: "UK Trade Tariff API", status: profile.id === "uk" ? "已接入" : "按目的国需要时调用" },
      { source: "USITC HTS REST", status: profile.id === "us" ? "已接入" : "按目的国需要时调用" },
      { source: "中国 2026 税则基础库", status: profile.id === "cn" ? "已接入并直出结果" : "中国市场优先使用" }
    ],
    sources: profile.sources,
    message
  });
};
