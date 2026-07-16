const assert = require("assert");
const os = require("os");
const path = require("path");

process.env.PLATFORM_ACCESS_CODE = "LOGISMASTER_SELF_TEST_ONLY";
process.env.LOCAL_DATA_DIR = path.join(os.tmpdir(), `logismaster-data-store-test-${Date.now()}`);

const accessAuth = require("../netlify/functions/access-auth");
const scheduleRecords = require("../netlify/functions/schedule-records");
const evidenceRecords = require("../netlify/functions/evidence-records");

function dateAt(dayOffset = 0) {
  return new Date(Date.now() + dayOffset * 86400000).toISOString().slice(0, 10);
}

async function run() {
  const denied = await evidenceRecords.handler({ httpMethod: "GET", headers: {} });
  assert.strictEqual(denied.statusCode, 401, "Evidence store must reject anonymous reads");

  const login = await accessAuth.handler({
    httpMethod: "POST",
    headers: {},
    body: JSON.stringify({ code: process.env.PLATFORM_ACCESS_CODE })
  });
  assert.strictEqual(login.statusCode, 200, "Self-test login must succeed");
  const cookie = login.headers["Set-Cookie"].split(";")[0];
  const headers = { cookie };

  const schedule = {
    mode: "air",
    originCode: "EHU",
    destinationCode: "FRA",
    carrier: "Lufthansa Cargo",
    flightNumber: "LH9001",
    departureDate: dateAt(4),
    arrivalDate: dateAt(5),
    transitHours: 16,
    sourceId: "lufthansa-cargo-download",
    capturedAt: dateAt(0)
  };
  const schedulePost = await scheduleRecords.handler({ httpMethod: "POST", headers, body: JSON.stringify({ records: [schedule] }) });
  assert.strictEqual(schedulePost.statusCode, 200, "Schedule store write must succeed");
  const scheduleGet = await scheduleRecords.handler({ httpMethod: "GET", headers: {}, queryStringParameters: { mode: "air", origin: "EHU" } });
  const scheduleBody = JSON.parse(scheduleGet.body);
  assert.strictEqual(scheduleBody.count, 1, "Schedule store must return the written route");

  const evidence = {
    id: "self-test-evidence-001",
    mode: "sea",
    type: "quote",
    origin: "CNXMN",
    destination: "THLCH",
    carrier: "Maersk",
    evidenceDate: dateAt(0),
    unit: "40HQ",
    currency: "USD",
    price: 1250,
    note: "Sanitized self-test record"
  };
  const evidencePost = await evidenceRecords.handler({ httpMethod: "POST", headers, body: JSON.stringify({ records: [evidence] }) });
  assert.strictEqual(evidencePost.statusCode, 200, "Evidence store write must succeed");
  const evidenceGet = await evidenceRecords.handler({ httpMethod: "GET", headers });
  assert.strictEqual(JSON.parse(evidenceGet.body).records.length, 1, "Evidence store must return the written record");
  const evidenceDelete = await evidenceRecords.handler({ httpMethod: "POST", headers, body: JSON.stringify({ action: "delete", id: evidence.id }) });
  assert.strictEqual(JSON.parse(evidenceDelete.body).deleted, 1, "Evidence store delete must succeed");

  console.log("Data store self-test passed");
}

run().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
