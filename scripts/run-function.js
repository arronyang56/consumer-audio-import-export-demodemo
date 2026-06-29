const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const functionName = process.argv[2];
const queryText = process.argv.slice(3).join("&");

if (!functionName || !/^[a-z0-9-]+$/i.test(functionName)) {
  console.error("Usage: node scripts/run-function.js <function-name>");
  process.exit(2);
}

if (!process.env.LOCAL_DATA_DIR) {
  process.env.LOCAL_DATA_DIR = path.join(rootDir, ".data");
}
if (process.env.SITE_URL && !process.env.URL) {
  process.env.URL = process.env.SITE_URL;
}

const mod = require(path.join(rootDir, "netlify", "functions", `${functionName}.js`));
const queryStringParameters = Object.fromEntries(new URLSearchParams(queryText));

Promise.resolve(
  mod.handler({
    httpMethod: "GET",
    path: `/.netlify/functions/${functionName}`,
    headers: {},
    queryStringParameters,
    body: ""
  })
)
  .then((result) => {
    const body = result?.body || "{}";
    try {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.log(body);
    }
  })
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
