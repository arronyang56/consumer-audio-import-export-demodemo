const fs = require("fs");
const path = require("path");

const pdfPath = process.argv[2] || "/private/tmp/china-tariff-2026-full.pdf";
const outPath = process.argv[3] || path.join(__dirname, "..", "site", "china-tariff-2026.js");
const sourceUrl = "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm";
const verifyUrl = "https://online.customs.gov.cn/ocportal/mySearch/";

function compactHs(value = "") {
  return String(value || "").replace(/\D/g, "");
}

function rateText(value = "") {
  const text = String(value || "").replace(/\s+/g, "").trim();
  if (!text || text === "-") return text || "-";
  return /%|从量|复合|暂/.test(text) ? text : `${text}%`;
}

function splitMfnAndProvisional(value = "") {
  const text = String(value || "").replace(/\s+/g, "").trim();
  const match = text.match(/^(.+?)[△▲∆](.+)$/);
  if (!match) {
    return { mfnRate: rateText(text), provisionalRate: "-" };
  }
  return {
    mfnRate: rateText(match[1]),
    provisionalRate: rateText(match[2])
  };
}

function normalizeName(parts = []) {
  return parts
    .join("")
    .replace(/\s+/g, "")
    .replace(/^[-－—]+/, "")
    .trim();
}

function groupLines(items = []) {
  const lines = [];
  items.forEach((item) => {
    const str = String(item.str || "").trim();
    if (!str) return;
    const x = item.transform[4];
    const y = item.transform[5];
    let line = lines.find((row) => Math.abs(row.y - y) < 2.2);
    if (!line) {
      line = { y, items: [] };
      lines.push(line);
    }
    line.items.push({ str, x, y, width: item.width || 0 });
  });
  return lines
    .map((line) => ({ ...line, items: line.items.sort((a, b) => a.x - b.x) }))
    .sort((a, b) => b.y - a.y);
}

function getSeq(line) {
  const parts = line.items.filter((item) => item.x >= 35 && item.x < 60).map((item) => item.str).join("");
  return /^\d{1,5}$/.test(parts) ? parts : "";
}

function getCode(line) {
  const parts = line.items
    .filter((item) => item.x >= 58 && item.x < 100 && /^[\d.]+$/.test(item.str))
    .map((item) => item.str)
    .join("")
    .replace(/\s+/g, "");
  return /^\d{4}\.\d{4}$/.test(parts) ? parts : "";
}

function collect(line, minX, maxX) {
  return line.items.filter((item) => item.x >= minX && item.x < maxX).map((item) => item.str);
}

function finishRecord(record, rows) {
  if (!record || !record.codeDisplay) return;
  const hs = compactHs(record.codeDisplay);
  const name = normalizeName(record.nameParts);
  if (!/^\d{8}$/.test(hs) || !name) return;
  const mfnRaw = record.mfnParts.join("").replace(/\s+/g, "").trim();
  const ordinaryRaw = record.ordinaryParts.join("").replace(/\s+/g, "").trim();
  const rates = splitMfnAndProvisional(mfnRaw);
  rows.push({
    seq: Number(record.seq),
    hs,
    hs8: hs,
    codeDisplay: record.codeDisplay,
    name,
    keywords: `${hs},${record.codeDisplay},${name}`,
    mfnRate: rates.mfnRate,
    mfnRaw,
    ordinaryRate: rateText(ordinaryRaw),
    provisionalRate: rates.provisionalRate,
    importVat: "按进口环节增值税现行政策确认",
    sourceTitle: "财政部：中华人民共和国进出口税则（2026）",
    sourceUrl,
    verifyUrl,
    effectiveNote: "来自财政部发布的《中华人民共和国进出口税则（2026）》PDF 自动解析；正式申报请以海关税目税号查询和通关时海关解释为准。"
  });
}

async function main() {
  const pdfjs = await import("/Users/lewisbaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data }).promise;
  const rows = [];

  for (let pageNo = 1; pageNo <= doc.numPages; pageNo += 1) {
    const page = await doc.getPage(pageNo);
    const content = await page.getTextContent();
    const lines = groupLines(content.items);
    let current = null;

    lines.forEach((line) => {
      const seq = getSeq(line);
      const codeDisplay = getCode(line);
      if (seq && codeDisplay) {
        finishRecord(current, rows);
        current = { seq, codeDisplay, nameParts: [], mfnParts: [], ordinaryParts: [] };
      }
      if (!current) return;
      current.nameParts.push(...collect(line, 100, 225));
      if (!current.mfnParts.length) current.mfnParts.push(...collect(line, 225, 282).filter((part) => part !== " "));
      if (!current.ordinaryParts.length) current.ordinaryParts.push(...collect(line, 512, 560).filter((part) => part !== " "));
    });
    finishRecord(current, rows);
  }

  const deduped = Array.from(new Map(rows.map((row) => [row.hs, row])).values()).sort((a, b) => a.seq - b.seq);
  const banner = `// Generated from 财政部《中华人民共和国进出口税则（2026）》. Do not edit by hand.\n`;
  fs.writeFileSync(outPath, `${banner}window.CHINA_TARIFF_2026 = ${JSON.stringify(deduped, null, 2)};\n`);
  console.log(JSON.stringify({ pages: doc.numPages, rows: deduped.length, outPath }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
