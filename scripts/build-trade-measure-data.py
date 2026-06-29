#!/usr/bin/env python3
"""Build China trade-measure data from official tariff-list PDFs.

The script downloads official list PDFs, extracts 8-digit HS codes, and
generates a browser-ready JS data file used by the HS/tariff module.
"""

from __future__ import annotations

import json
import re
import sys
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DEMO = ROOT if (ROOT / "site").exists() else ROOT / "public-demo"
RAW_DIR = PUBLIC_DEMO / "data" / "trade_measures" / "raw"
OUT_JS = PUBLIC_DEMO / "site" / "trade-measures-data.js"
OUT_REPORT = PUBLIC_DEMO / "data" / "trade_measures" / "audit-report.json"


@dataclass(frozen=True)
class SourcePdf:
    measure_id: str
    title: str
    rate: str
    url: str
    effective_from: str
    note: str


SOURCE_PDFS = [
    SourcePdf(
        measure_id="china_us_2018_25_aug",
        title="对美加征25%关税商品清单（2018年8月公布，160亿美元清单）",
        rate="25%",
        url="https://www.gov.cn/xinwen/2018-08/03/5311619/files/ffa5fdab36564a0392b03c160894b3f9.pdf",
        effective_from="2018-08-23",
        note="官方 PDF 清单命中；需继续核验排除延期、暂停或后续调整。",
    ),
    SourcePdf(
        measure_id="china_us_2019_25",
        title="对美实施加征25%关税商品清单（税委会公告〔2019〕3号附件1）",
        rate="25%",
        url="https://gss.mof.gov.cn/gzdt/zhengcefabu/201905/P020190513719203602248.pdf",
        effective_from="2019-06-01",
        note="2019年5月13日公告附件1；官方页面说明附件1所列税目实施加征25%。",
    ),
    SourcePdf(
        measure_id="china_us_2019_20",
        title="对美实施加征20%关税商品清单（税委会公告〔2019〕3号附件2）",
        rate="20%",
        url="https://gss.mof.gov.cn/gzdt/zhengcefabu/201905/P020190513719204287788.pdf",
        effective_from="2019-06-01",
        note="2019年5月13日公告附件2；官方页面说明附件2所列税目实施加征20%。",
    ),
    SourcePdf(
        measure_id="china_us_2019_10",
        title="对美实施加征10%关税商品清单（税委会公告〔2019〕3号附件3）",
        rate="10%",
        url="https://gss.mof.gov.cn/gzdt/zhengcefabu/201905/P020190513719204715521.pdf",
        effective_from="2019-06-01",
        note="2019年5月13日公告附件3；官方页面说明附件3所列税目实施加征10%。",
    ),
    SourcePdf(
        measure_id="china_us_2019_5",
        title="对美实施加征5%关税商品清单（税委会公告〔2019〕3号附件4）",
        rate="5%",
        url="https://gss.mof.gov.cn/gzdt/zhengcefabu/201905/P020190513719205123756.pdf",
        effective_from="2019-06-01",
        note="2019年5月13日公告附件4；官方页面说明附件4所列税目仍实施加征5%。",
    ),
]


GENERAL_US_ORIGIN_MEASURE = {
    "measureId": "china_us_2025_general_10_current",
    "title": "对原产于美国的进口商品保留10%对美加征关税税率",
    "rate": "10%",
    "scope": "原产于美国的进口商品",
    "effectiveFrom": "2025-11-10T13:01:00+08:00",
    "suspendedRate": "24%",
    "suspendedUntil": "2026-11-10T13:01:00+08:00",
    "sourceTitle": "国务院关税税则委员会公告2025年第10号",
    "sourceUrl": "https://gss.mof.gov.cn/gzdt/zhengcefabu/202511/t20251105_3975756.htm",
    "note": "官方公告：在一年内继续暂停实施24%的对美加征关税税率，保留10%的对美加征关税税率。",
}


def download(url: str, path: Path) -> None:
    if path.exists() and path.stat().st_size > 10_000:
        return
    req = urllib.request.Request(url, headers={"User-Agent": "hs-platform-tariff-audit/1.0"})
    with urllib.request.urlopen(req, timeout=45) as response:
        data = response.read()
    path.write_bytes(data)


def extract_codes(path: Path) -> list[str]:
    reader = PdfReader(str(path))
    text_parts: list[str] = []
    for page in reader.pages:
        text_parts.append(page.extract_text() or "")
    text = "\n".join(text_parts)
    codes = re.findall(r"(?<!\d)(\d{8})(?!\d)", text)
    return sorted(set(codes))


def code_name_map_from_china_tariff() -> dict[str, str]:
    tariff_js = PUBLIC_DEMO / "site" / "china-tariff-2026.js"
    if not tariff_js.exists():
        return {}
    text = tariff_js.read_text(encoding="utf-8")
    match = re.search(r"window\.CHINA_TARIFF_2026\s*=\s*(\[.*\]);\s*$", text, re.S)
    if not match:
        return {}
    rows = json.loads(match.group(1))
    return {str(row.get("hs", "")): str(row.get("name", "")) for row in rows if row.get("hs")}


def company_codes() -> list[str]:
    company_js = PUBLIC_DEMO / "site" / "company-hs-data.js"
    if not company_js.exists():
        return []
    text = company_js.read_text(encoding="utf-8")
    return sorted(set(re.findall(r'"code"\s*:\s*"(\d{8,10})"', text)))


def main() -> int:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    code_names = code_name_map_from_china_tariff()
    lists = []
    all_specific_codes: dict[str, list[dict[str, str]]] = {}

    for source in SOURCE_PDFS:
        filename = f"{source.measure_id}.pdf"
        path = RAW_DIR / filename
        download(source.url, path)
        codes = extract_codes(path)
        for code in codes:
            all_specific_codes.setdefault(code, []).append(
                {
                    "measureId": source.measure_id,
                    "rate": source.rate,
                    "sourceTitle": source.title,
                    "sourceUrl": source.url,
                    "effectiveFrom": source.effective_from,
                    "note": source.note,
                }
            )
        lists.append(
            {
                "measureId": source.measure_id,
                "title": source.title,
                "rate": source.rate,
                "effectiveFrom": source.effective_from,
                "sourceUrl": source.url,
                "note": source.note,
                "codeCount": len(codes),
                "sampleCodes": codes[:12],
            }
        )

    company_hits = []
    for raw_code in company_codes():
        hs8 = raw_code[:8]
        hits = all_specific_codes.get(hs8, [])
        if not hits:
            continue
        company_hits.append(
            {
                "code": raw_code,
                "hs8": hs8,
                "name": code_names.get(hs8, ""),
                "specificMeasures": hits,
                "generalMeasure": GENERAL_US_ORIGIN_MEASURE,
            }
        )

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourcePage": {
            "title": "国务院关税税则委员会关于对原产于美国的部分进口商品提高加征关税税率的公告",
            "url": "https://gss.mof.gov.cn/gzdt/zhengcefabu/201905/t20190513_3256788.htm",
        },
        "generalUsOriginMeasure": GENERAL_US_ORIGIN_MEASURE,
        "specificChinaUsLists": lists,
        "specificCodeMap": all_specific_codes,
        "audit": {
            "specificCodeCount": len(all_specific_codes),
            "companyCodeCount": len(company_codes()),
            "companySpecificHitCount": len(company_hits),
            "companySpecificHits": company_hits,
        },
    }

    OUT_JS.write_text(
        "// Generated by scripts/build_trade_measure_data.py. Do not edit by hand.\n"
        f"window.TRADE_MEASURE_DATA = {json.dumps(payload, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    OUT_REPORT.parent.mkdir(parents=True, exist_ok=True)
    OUT_REPORT.write_text(json.dumps(payload["audit"], ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"Generated {OUT_JS} with {len(all_specific_codes)} specific HS8 codes; "
        f"{len(company_hits)} company HS codes hit specific US-origin measures."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
