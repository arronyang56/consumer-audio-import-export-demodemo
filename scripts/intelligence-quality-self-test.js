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
vm.runInContext(fs.readFileSync(path.join(root, "site/schedule-database.js"), "utf8"), scheduleContext, { filename: "schedule-database.js" });
const scheduleDatabase = scheduleContext.window.LOGISTICS_SCHEDULE_DATABASE;
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
assert(baselineTransit.length >= 130, `Expected at least 130 baseline transit lanes, got ${baselineTransit.length}`);
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
  "CNTXG->USLAX"
].forEach((route) => {
  const [originCode, destinationCode] = route.split("->");
  assert(hasBaselineRoute(originCode, destinationCode), `Baseline transit database must cover ${route}`);
});
baselineTransit.forEach((item) => {
  assert(Array.isArray(item.rangeDays) && item.rangeDays.length === 2, `${item.id} must include a two-point day range`);
  assert(item.rangeDays[0] > 0 && item.rangeDays[1] >= item.rangeDays[0], `${item.id} has an invalid transit range`);
  assert((item.sourceIds || []).every((id) => scheduleEvidenceIds.has(id)), `${item.id} references an unregistered source or download`);
});

console.log(`Intelligence quality self-test passed: ${cases.length} China cases, ${meta.familyCount} families, ${baselineTransit.length} baseline transit lanes, policy evidence contract and unified conclusion contract.`);
