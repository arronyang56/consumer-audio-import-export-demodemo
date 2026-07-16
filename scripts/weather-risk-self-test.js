const assert = require("node:assert/strict");
const { _private } = require("../netlify/functions/weather-risk");

const {
  buildRiskConclusion,
  buildRouteProfile,
  contentFreshness,
  findPortProfile,
  noticeImpactForText,
  routeImpactForText
} = _private;

const origin = findPortProfile("厦门", "CNXMN");
const destination = findPortProfile("林查班", "THLCH");
assert(origin && destination, "test route ports must be recognized");

const route = buildRouteProfile(origin, destination);
assert(route.areas.includes("东亚-东南亚常规水道"), "Xiamen-Laem Chabang must use the East/Southeast Asia corridor");

const routeHit = routeImpactForText("中央气象台发布：南海北部有台风和海上大风影响，预计航行条件转差。", route);
assert.equal(routeHit.routeRelevant, true, "route-area weather must be relevant");
assert(routeHit.hazards.some((item) => item.id === "typhoon"), "typhoon hazard must be detected");

const unrelatedHit = routeImpactForText("中央气象台发布：渤海湾有大风影响。", route);
assert.equal(unrelatedHit.routeRelevant, false, "unrelated sea-area weather must not affect this route");

const fixedNow = Date.UTC(2026, 6, 16, 12);
assert.equal(contentFreshness("2026年7月15日发布", fixedNow).status, "recent", "recent publication date must pass");
assert.equal(contentFreshness("2026年5月1日发布", fixedNow).status, "stale", "old publication date must be stale");
assert.equal(noticeImpactForText("2020年7月15日 厦门港因台风暂停作业", origin).matched, false, "stale port notice must be excluded");

const typhoon = { id: "typhoon", label: "台风/热带气旋", action: "复核靠泊和开航窗口。" };
const duplicateNmc = [
  { id: "nmc-alert", group: "nmc", impactLevel: 2, freshnessStatus: "recent", hazards: [typhoon] },
  { id: "nmc-track", group: "nmc", impactLevel: 2, freshnessStatus: "recent", hazards: [typhoon] }
];
const duplicateConclusion = buildRiskConclusion(duplicateNmc, [], [], origin, destination, route);
assert.equal(duplicateConclusion.riskLevel, "elevated", "duplicate pages from one authority must not create high risk");

const corroboratingNotice = [{
  name: "厦门港务公告",
  group: "xpgco.com.cn",
  impact: "matched",
  freshnessStatus: "recent",
  hazards: [typhoon]
}];
const corroboratedConclusion = buildRiskConclusion(duplicateNmc, corroboratingNotice, [], origin, destination, route);
assert.equal(corroboratedConclusion.riskLevel, "high", "independent current port notice may corroborate official weather");

const undatedConclusion = buildRiskConclusion([
  { id: "nmc-alert", group: "nmc", impactLevel: 2, freshnessStatus: "undated", hazards: [typhoon] }
], [], [], origin, destination, route);
assert.equal(undatedConclusion.riskLevel, "watch", "one undated source must remain a lead, not a raised risk conclusion");

console.log("Weather risk self-test passed");
