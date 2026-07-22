const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const complianceSource = fs.readFileSync(path.join(root, "site/china-compliance-data.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(complianceSource, context, { filename: "china-compliance-data.js" });

const cases = context.window.CHINA_COMPLIANCE_CASES;
const meta = context.window.CHINA_COMPLIANCE_META;
const findCases = context.window.findChinaComplianceCases;
assert(Array.isArray(cases), "China compliance cases must be an array");
assert(cases.length >= 100, `Expected at least 100 China compliance cases, got ${cases.length}`);
assert(meta.familyCount >= 12, `Expected at least 12 product families, got ${meta.familyCount}`);
assert(cases.every((item) => item.requiredFacts.length && item.counterEvidence.length), "Every compliance case needs missing facts and counter-evidence");
assert(cases.every((item) => item.declarationElements.length && item.docs.length), "Every compliance case needs declaration elements and documents");

[
  ["65W 氮化镓 USB-C 快充充电器", "power-adapter"],
  ["10000mAh 磁吸移动电源 37Wh", "battery-storage"],
  ["未贴片裸 FPC 柔性印刷电路板", "bare-circuit"],
  ["蓝牙降噪 TWS 耳机", "wireless-audio"],
  ["带触摸屏的 LCD 显示模组", "flat-panel-module"],
  ["音箱维修用低音单元", "audio-parts"]
].forEach(([query, expected]) => {
  const match = findCases(query, 1)[0];
  assert.strictEqual(match?.familyId, expected, `${query} should match ${expected}, got ${match?.familyId || "none"}`);
});

const policyMonitor = require(path.join(root, "netlify/functions/policy-monitor.js"));
const { enrichPolicyRecord, buildQuery } = policyMonitor._test;
const official = { domain: "customs.gov.example", sourceType: "官方公告", credibility: { score: 94 } };
assert.strictEqual(enrichPolicyRecord({ ...official, title: "海关政策入口", description: "" }).recordType, "official-entry");
assert.strictEqual(
  enrichPolicyRecord({ ...official, title: "发布进口规则调整公告", description: "本公告修订进口申报要求并自2026年8月1日起实施，适用产品和过渡安排详见附件。" }).recordType,
  "new-change"
);
assert.strictEqual(
  enrichPolicyRecord({ ...official, title: "现行进口办事指南", description: "本指南说明进口申报、税费缴纳、许可核验和所需文件，企业应按商品编码查询具体措施。" }).recordType,
  "current-policy"
);
assert.strictEqual(
  enrichPolicyRecord({ domain: "example.com", title: "市场观察", description: "行业媒体分析近期贸易和物流形势，对报价和供应链成本可能产生影响。", credibility: { score: 55 } }).recordType,
  "news-analysis"
);

["中国", "美国", "欧盟", "英国", "越南", "印度尼西亚", "日本", "韩国"].forEach((market) => {
  const query = buildQuery({ importCountry: market, product: "蓝牙耳机", direction: "出口" });
  assert(query.length > 40 && /customs|tariff/i.test(query), `${market} query must include policy terms`);
});

const appSource = fs.readFileSync(path.join(root, "site/app.js"), "utf8");
["最终判断", "证据与来源", "可信度", "未知项", "报价", "船期", "通关", "认证", "单证"].forEach((label) => {
  assert(appSource.includes(label), `Unified conclusion contract is missing ${label}`);
});

const scheduleContext = { window: {} };
vm.createContext(scheduleContext);
vm.runInContext(fs.readFileSync(path.join(root, "site/generated-schedule-records.js"), "utf8"), scheduleContext, { filename: "generated-schedule-records.js" });
vm.runInContext(fs.readFileSync(path.join(root, "site/schedule-database.js"), "utf8"), scheduleContext, { filename: "schedule-database.js" });
const scheduleDatabase = scheduleContext.window.LOGISTICS_SCHEDULE_DATABASE;
const generatedScheduleData = scheduleContext.window.LOGISTICS_GENERATED_SCHEDULE_DATA;
const baselineTransit = scheduleDatabase.baselineTransit || [];
function hasBaselineRoute(originCode, destinationCode) {
  const equivalentCodes = {
    CNTAO: ["CNTAO", "CNQDG"],
    CNQDG: ["CNQDG", "CNTAO"]
  };
  const origins = equivalentCodes[originCode] || [originCode];
  const destinations = equivalentCodes[destinationCode] || [destinationCode];
  return baselineTransit.some((item) => origins.includes(item.originCode) && destinations.includes(item.destinationCode));
}
const scheduleEvidenceIds = new Set([
  ...(scheduleDatabase.sources || []).map((source) => source.id),
  ...(scheduleDatabase.downloads || []).map((download) => download.id)
]);
assert(baselineTransit.length >= 700, `Expected at least 700 bidirectional baseline transit lanes, got ${baselineTransit.length}`);
assert(scheduleDatabase.matrixBaseline?.laneCount >= 550, "Schedule database must include bidirectional matrix baseline coverage");
assert(scheduleDatabase.matrixBaseline?.inboundLaneCount >= 300, "Schedule database must include at least 300 import-to-China baseline lanes");
assert(scheduleDatabase.automaticRefresh?.githubWorkflow, "Schedule database must document the automatic refresh workflow");
assert(scheduleDatabase.automaticRefresh?.qualityGate?.minimumValidatedServices >= 8, "Schedule refresh needs a service quality gate");
assert(scheduleDatabase.updatePolicy?.keepLastGoodSnapshot, "Schedule refresh must keep the last good snapshot on source failure");
[
  "CNXMN->THLCH",
  "CNSHA->USLAX",
  "CNSHA->SGSIN",
  "CNSZX->THLCH",
  "CNSHA->CNSZX",
  "CNQDG->CNSHA",
  "CNSHA->AEJEA",
  "CNYTN->AUSYD",
  "CNNGB->INNSA",
  "CNSHA->DEHAM",
  "CNYTN->PHMNL",
  "CNXMN->CNYTN",
  "CNSZX->USNYC",
  "CNSHA->BRSSZ",
  "CNNGB->CAVAN",
  "CNYTN->LKCMB",
  "CNQDG->DEHAM",
  "CNTAO->DEHAM",
  "CNTXG->USLAX",
  "CNGZG->USNYC",
  "CNLYG->BRSSZ",
  "CNFOC->AUMEL",
  "CNDLC->KEMBA",
  "CNTXG->ESVLC",
  "NLRTM->CNSHA",
  "USLAX->CNSHA",
  "USLAX->CNNGB",
  "NLRTM->CNNGB"
].forEach((route) => {
  const [originCode, destinationCode] = route.split("->");
  assert(hasBaselineRoute(originCode, destinationCode), `Baseline transit database must cover ${route}`);
});

assert(generatedScheduleData.serviceCount >= 60, `Expected at least 60 validated carrier services, got ${generatedScheduleData.serviceCount}`);
assert(generatedScheduleData.recordCount >= 4000, `Expected at least 4,000 current carrier schedule records, got ${generatedScheduleData.recordCount}`);
assert(generatedScheduleData.routeCount >= 1000, `Expected at least 1,000 carrier-published routes, got ${generatedScheduleData.routeCount}`);
const generatedRecords = Object.values(generatedScheduleData.services || {}).flatMap((service) => service.records || []);
const scheduleFreshnessCutoff = Date.now() - 14 * 86400000;
const currentGeneratedRecords = generatedRecords.filter((record) => (
  Date.parse(record.capturedAt || 0) >= scheduleFreshnessCutoff
  && Date.parse(record.capturedAt || 0) <= Date.now() + 86400000
  && Date.parse(record.arrivalDate || 0) >= Date.now() - 86400000
));
const currentGeneratedRoutes = new Set(currentGeneratedRecords.map((record) => `${record.originCode}->${record.destinationCode}`));
assert(currentGeneratedRecords.length >= 3500, `Expected at least 3,500 fresh current carrier sailings, got ${currentGeneratedRecords.length}`);
assert(currentGeneratedRoutes.size >= 900, `Expected at least 900 fresh current carrier routes, got ${currentGeneratedRoutes.size}`);
[
  "NLRTM->CNSHA",
  "NLRTM->CNNGB",
  "USLAX->CNSHA",
  "USLAX->CNNGB",
  "CNNGB->USLAX",
  "CNSHA->NLRTM"
].forEach((route) => {
  const [originCode, destinationCode] = route.split("->");
  assert(
    generatedRecords.some((item) => item.originCode === originCode && item.destinationCode === destinationCode),
    `Current carrier schedule snapshot must include ${route}`
  );
});
Object.values(generatedScheduleData.services || {}).forEach((service) => {
  const counts = new Map();
  (service.records || []).forEach((record) => {
    const route = `${record.originCode}->${record.destinationCode}`;
    counts.set(route, (counts.get(route) || 0) + 1);
  });
  counts.forEach((count, route) => {
    assert(count <= 2, `${service.snapshot?.serviceId || "carrier service"} retained more than two current sailings for ${route}`);
  });
});

const globalTrends = require(path.join(root, "netlify/functions/global-trends.js"))._test;
const ukElectionTerms = globalTrends.expandKeywordTerms("英国大选");
assert.strictEqual(globalTrends.detectMarket("英国大选"), "uk", "UK election query must resolve to the UK market");
assert(ukElectionTerms.includes("UK general election"), "UK election query must expand to UK election terms");
assert(!ukElectionTerms.includes("US election"), "UK election query must not expand to US election terms");
assert.strictEqual(
  globalTrends.isRelevant({ title: "India's government under pressure as protests intensify", domain: "bbc.co.uk", sourceCountry: "Global" }, "英国大选"),
  false,
  "A UK media domain alone must not turn foreign political news into UK-election evidence"
);
assert.strictEqual(
  globalTrends.isRelevant({ title: "India election campaign enters final week", domain: "bbc.co.uk", sourceCountry: "Global" }, "英国大选"),
  false,
  "A foreign election must not pass the UK-election topic gate"
);
assert.strictEqual(
  globalTrends.isRelevant({ title: "UK general election campaign enters final week", domain: "bbc.co.uk", sourceCountry: "United Kingdom" }, "英国大选"),
  true,
  "A dated UK-election article should pass the topic gate"
);
const ukElectionDecision = globalTrends.buildTopicDecision([], [], "英国大选");
assert(/过去 14 天/.test(ukElectionDecision), "Zero-result UK election query needs an explicit time-window conclusion");
assert(/现行 UK Trade Tariff/.test(ukElectionDecision), "Zero-result UK election query needs an operational conclusion");

const vesselSources = require(path.join(root, "netlify/functions/shipxy-eta.js"))._test;
const freshCandidate = {
  ok: true,
  result: { mmsi: "123456789", position: { lat: 31.2, lon: 121.5 }, lastReportAt: new Date().toISOString() }
};
const staleCandidate = {
  ok: true,
  result: { mmsi: "123456789", position: { lat: 31.2, lon: 121.5 }, lastReportAt: new Date(Date.now() - 48 * 36e5).toISOString() }
};
assert(vesselSources.providerScore(freshCandidate) > vesselSources.providerScore(staleCandidate), "Fresh AIS data must outrank stale AIS data");
assert.strictEqual(vesselSources.normalizeShipFinder({ lat: 31.2, lng: 121.5, mmsi: 123456789 }).mmsi, 123456789, "ShipFinder adapter must preserve vessel identity");
const portRisk = require(path.join(root, "netlify/functions/port-risk.js"))._test;
assert.strictEqual(portRisk.numeric(""), null, "Empty congestion metrics must stay unknown instead of becoming zero");
assert.strictEqual(portRisk.numeric("0"), 0, "An explicit zero congestion metric must be preserved");
baselineTransit.forEach((item) => {
  assert(Array.isArray(item.rangeDays) && item.rangeDays.length === 2, `${item.id} must include a two-point day range`);
  assert(item.rangeDays[0] > 0 && item.rangeDays[1] >= item.rangeDays[0], `${item.id} has an invalid transit range`);
  assert((item.sourceIds || []).every((id) => scheduleEvidenceIds.has(id)), `${item.id} references an unregistered source or download`);
});

console.log(`Intelligence quality self-test passed: ${cases.length} China cases, ${meta.familyCount} families, ${baselineTransit.length} bidirectional baseline lanes, ${currentGeneratedRecords.length} fresh carrier sailings across ${currentGeneratedRoutes.size} fresh routes, UK election routing, multi-source AIS scoring, congestion null handling, policy evidence and unified conclusion contracts.`);
