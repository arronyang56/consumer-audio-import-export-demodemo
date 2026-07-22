#!/usr/bin/env python3
"""Build a last-good OOCL schedule snapshot from official service PDFs."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import tempfile
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import date, datetime, timedelta
from html.parser import HTMLParser
from pathlib import Path

from pypdf import PdfReader


PREFIX = "window.LOGISTICS_GENERATED_SCHEDULE_DATA = "
DATE_CELL = re.compile(r"^(\d{1,2})--(\d{1,2}) ([A-Z][a-z]{2})$")
UPDATE_DATE = re.compile(r"Last Update Date:\s*(\d{2}-[A-Za-z]{3}-\d{4})")
MONTHS = {name: index for index, name in enumerate(
    ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
    start=1,
)}


class ScheduleImportError(RuntimeError):
    pass


class ServiceLinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        href = dict(attrs).get("href") or ""
        if re.search(r"_LT\.pdf(?:$|\?)", urllib.parse.unquote(href), re.I):
            self.links.append(href)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", default="scripts/oocl-schedule-services.json")
    parser.add_argument("--input-dir", action="append", default=[])
    parser.add_argument("--output", default="site/generated-schedule-records.js")
    parser.add_argument("--download", action="store_true")
    parser.add_argument("--today", help="Override current date for deterministic tests")
    return parser.parse_args()


def load_existing(path: Path) -> dict:
    if not path.exists():
        return {"services": {}}
    text = path.read_text(encoding="utf-8").strip()
    if not text.startswith(PREFIX) or not text.endswith(";"):
        raise ScheduleImportError(f"Existing generated file has an invalid wrapper: {path}")
    return json.loads(text[len(PREFIX):-1])


def configured_services(manifest: dict) -> list[dict]:
    configured = {item["id"].upper(): dict(item) for item in manifest.get("services", [])}
    base_url = manifest.get("pdfBaseUrl") or urllib.parse.urljoin(manifest["sourcePage"], "/SiteCollectionDocuments/OOCL/eServices/Sailing%20Schedule%20by%20Service/")
    for raw_id in manifest.get("discoverServiceIds", []):
        service_id = str(raw_id).upper()
        if service_id in configured:
            continue
        file_name = f"{service_id}_LT.pdf"
        configured[service_id] = {
            "id": service_id,
            "name": f"OOCL {service_id} Service",
            "fileName": file_name,
            "url": urllib.parse.urljoin(base_url, urllib.parse.quote(file_name)),
            "minVoyages": 2,
        }
    ordered_ids = [item["id"].upper() for item in manifest.get("services", [])]
    ordered_ids.extend(str(item).upper() for item in manifest.get("discoverServiceIds", []) if str(item).upper() not in ordered_ids)
    return [configured[item] for item in ordered_ids if item in configured]


def discover_services(manifest: dict) -> tuple[list[dict], list[str]]:
    configured = {item["id"].upper(): dict(item) for item in configured_services(manifest)}
    desired = {str(item).upper() for item in manifest.get("discoverServiceIds", [])}
    if not desired:
        return list(configured.values()), []

    request = urllib.request.Request(
        manifest["sourcePage"],
        headers={
            "User-Agent": "LogisMaster-Schedule-Refresh/1.1 (+official-public-PDF-validation)",
            "Accept": "text/html,application/xhtml+xml",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        html = response.read(2_000_000).decode("utf-8", errors="ignore")
    parser = ServiceLinkParser()
    parser.feed(html)

    discovered: list[str] = []
    for href in parser.links:
        absolute = urllib.parse.urljoin(manifest["sourcePage"], href)
        file_name = Path(urllib.parse.unquote(urllib.parse.urlparse(absolute).path)).name
        match = re.search(r"([A-Z0-9]+)\s*_LT\.pdf$", file_name, re.I)
        if not match:
            continue
        service_id = match.group(1).upper()
        if service_id not in desired and service_id not in configured:
            continue
        if service_id in configured:
            configured[service_id]["url"] = absolute
            configured[service_id]["fileName"] = file_name
        else:
            configured[service_id] = {
                "id": service_id,
                "name": f"OOCL {service_id} Service",
                "fileName": file_name,
                "url": absolute,
                "minVoyages": 2,
            }
        discovered.append(service_id)

    ordered_ids = [item["id"].upper() for item in manifest.get("services", [])]
    ordered_ids.extend(item for item in manifest.get("discoverServiceIds", []) if str(item).upper() not in ordered_ids)
    services = [configured[item.upper()] for item in ordered_ids if item.upper() in configured]
    return services, sorted(set(desired) - set(discovered))


def validate_pdf_bytes(content: bytes, service: dict) -> None:
    if len(content) < 4096:
        raise ScheduleImportError("file is too small to be a schedule PDF")
    if not content.startswith(b"%PDF-"):
        sample = content[:500].decode("utf-8", errors="ignore").lower()
        if "cloudflare" in sample or "just a moment" in sample:
            raise ScheduleImportError("received a Cloudflare page instead of a PDF")
        raise ScheduleImportError("response is not a PDF")


def download_pdf(service: dict, directory: Path) -> Path:
    request = urllib.request.Request(
        service["url"],
        headers={
            "User-Agent": "LogisMaster-Schedule-Refresh/1.0 (+official-public-PDF-validation)",
            "Accept": "application/pdf",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        content_type = (response.headers.get("Content-Type") or "").lower()
        content = response.read(4_000_000)
    validate_pdf_bytes(content, service)
    if "pdf" not in content_type and content_type:
        raise ScheduleImportError(f"unexpected content type: {content_type}")
    path = directory / service["fileName"]
    path.write_bytes(content)
    return path


def find_local_pdf(service: dict, input_dirs: list[Path]) -> Path | None:
    url_name = Path(urllib.parse.urlparse(service["url"]).path).name
    candidates = {
        service["fileName"],
        urllib.parse.unquote(url_name),
        urllib.parse.quote(urllib.parse.unquote(url_name), safe="._-"),
        url_name,
    }
    for directory in input_dirs:
        for name in candidates:
            path = directory / name
            if path.is_file():
                return path
        target = re.sub(r"(?:%20|\s)+", "", service["fileName"], flags=re.I).lower()
        for path in directory.glob("*.pdf"):
            normalized = re.sub(r"(?:%20|\s)+", "", path.name, flags=re.I).lower()
            if normalized == target:
                return path
    return None


def page_rows(page) -> list[list[tuple[float, str]]]:
    fragments: list[tuple[float, float, str]] = []

    def visitor(text, _cm, tm, _font, _size):
        value = str(text or "").strip()
        if value:
            fragments.append((round(float(tm[5]) * 2) / 2, round(float(tm[4]), 1), value))

    page.extract_text(visitor_text=visitor)
    grouped: dict[float, list[tuple[float, str]]] = defaultdict(list)
    for y, x, text in fragments:
        grouped[y].append((x, text))
    return [sorted(grouped[y]) for y in sorted(grouped, reverse=True)]


def value_in_column(row: list[tuple[float, str]], labels: list[float], index: int, excluded: set[str]) -> str:
    start = labels[index] + 5
    end = labels[index + 1] - 10 if index + 1 < len(labels) else 10_000
    return " ".join(text for x, text in row if start < x < end and text not in excluded).strip()


def parse_voyages(reader: PdfReader) -> list[dict]:
    voyages: list[dict] = []
    active: list[dict] = []
    active_labels: list[float] = []

    for page in reader.pages:
        rows = page_rows(page)
        index = 0
        while index < len(rows):
            row = rows[index]
            labels = sorted(x for x, text in row if text == "Vessel Name")
            if labels:
                voyage_index = index + 1
                while voyage_index < min(len(rows), index + 6) and not any(
                    text == "Vessel/Voyage" for _x, text in rows[voyage_index]
                ):
                    voyage_index += 1
                voyage_row = rows[voyage_index] if voyage_index < len(rows) else []
                active = []
                active_labels = labels
                for column, _label_x in enumerate(labels):
                    vessel = value_in_column(row, labels, column, {"Vessel Name"})
                    voyage = value_in_column(voyage_row, labels, column, {"Vessel/Voyage"})
                    item = {"vessel": vessel, "voyage": voyage, "calls": []}
                    voyages.append(item)
                    active.append(item)
                index = voyage_index + 1
                continue

            if active and any(DATE_CELL.fullmatch(text) for _x, text in row):
                for column, voyage in enumerate(active):
                    start = active_labels[column] - 10
                    end = active_labels[column + 1] - 10 if column + 1 < len(active_labels) else 10_000
                    cell = [(x, text) for x, text in row if start <= x < end]
                    dates = [text for _x, text in cell if DATE_CELL.fullmatch(text)]
                    ports = [
                        text for _x, text in cell
                        if not DATE_CELL.fullmatch(text) and text not in {"Port", "Arr--Dep"}
                    ]
                    if dates and ports:
                        voyage["calls"].append({"port": " ".join(ports), "window": dates[0]})
            index += 1

    return [
        item for item in voyages
        if item["vessel"] and item["voyage"] and len(item["calls"]) >= 2
    ]


def date_window(value: str, year: int) -> tuple[date, date]:
    match = DATE_CELL.fullmatch(value)
    if not match:
        raise ScheduleImportError(f"invalid port window: {value}")
    arrival_day, departure_day, month_name = match.groups()
    departure_month = MONTHS[month_name]
    departure = date(year, departure_month, int(departure_day))
    arrival_month = departure_month - 1 if int(arrival_day) > int(departure_day) else departure_month
    arrival_year = year
    if arrival_month == 0:
        arrival_month = 12
        arrival_year -= 1
    arrival = date(arrival_year, arrival_month, int(arrival_day))
    return arrival, departure


def resolve_call_dates(calls: list[dict], update_day: date) -> list[dict]:
    resolved: list[dict] = []
    year = update_day.year
    previous_departure: date | None = None
    for call in calls:
        arrival, departure = date_window(call["window"], year)
        while previous_departure and departure < previous_departure:
            year += 1
            arrival, departure = date_window(call["window"], year)
        if previous_departure and departure - previous_departure > timedelta(days=240):
            raise ScheduleImportError("voyage port sequence contains an implausible date jump")
        resolved.append({**call, "arrival": arrival, "departure": departure})
        previous_departure = departure
    return resolved


def record_id(parts: list[str]) -> str:
    digest = hashlib.sha256("|".join(parts).encode("utf-8")).hexdigest()[:20]
    return f"schedule-{digest}"


def build_records(service: dict, voyages: list[dict], ports: dict, update_day: date, future_days: int) -> list[dict]:
    records: dict[str, dict] = {}
    source_id = f"oocl-{service['id'].lower()}-service"
    if service["id"] in {"EAX1", "SEAP"}:
        source_id = f"oocl-{service['id'].lower()}-service"
    earliest = update_day - timedelta(days=1)
    latest_departure = update_day + timedelta(days=future_days)
    latest_arrival = update_day + timedelta(days=future_days + 60)

    for voyage in voyages:
        try:
            calls = resolve_call_dates(voyage["calls"], update_day)
        except (ScheduleImportError, ValueError):
            continue
        for origin_index, origin_call in enumerate(calls[:-1]):
            origin = ports.get(origin_call["port"])
            if not origin:
                continue
            if not earliest <= origin_call["departure"] <= latest_departure:
                continue
            seen_destinations: set[str] = set()
            for destination_index in range(origin_index + 1, len(calls)):
                destination_call = calls[destination_index]
                destination = ports.get(destination_call["port"])
                if not destination or destination["code"] == origin["code"]:
                    continue
                if destination["code"] in seen_destinations:
                    continue
                seen_destinations.add(destination["code"])
                transit_hours = (destination_call["arrival"] - origin_call["departure"]).days * 24
                if transit_hours <= 0 or transit_hours > 24 * 120 or destination_call["arrival"] > latest_arrival:
                    continue
                stops = destination_index - origin_index - 1
                departure_text = origin_call["departure"].isoformat()
                arrival_text = destination_call["arrival"].isoformat()
                item = {
                    "id": record_id([
                        service["id"], origin["code"], destination["code"], voyage["vessel"],
                        voyage["voyage"], departure_text, arrival_text,
                    ]),
                    "mode": "sea",
                    "originCode": origin["code"],
                    "destinationCode": destination["code"],
                    "carrier": "OOCL",
                    "vessel": voyage["vessel"],
                    "voyage": voyage["voyage"],
                    "departureDate": departure_text,
                    "arrivalDate": arrival_text,
                    "transitHours": transit_hours,
                    "directness": "官方服务表直达" if stops == 0 else f"官方服务表 · 中途 {stops} 次挂靠",
                    "sourceId": source_id,
                    "evidenceType": "carrier-official-pdf",
                    "capturedAt": update_day.isoformat(),
                    "confidence": "carrier-published",
                    "note": (
                        f"OOCL {service['id']} 计划船期：{origin_call['port']} 离港 {departure_text}，"
                        f"{destination_call['port']} 到港 {arrival_text}。这是计划窗口，不代表实际延误或订舱保证。"
                    ),
                    "serviceId": service["id"],
                    "sourceUpdatedAt": update_day.isoformat(),
                }
                records[item["id"]] = item
    return sorted(records.values(), key=lambda item: (item["departureDate"], item["originCode"], item["destinationCode"]))


def parse_service(path: Path, service: dict, manifest: dict, today: date) -> dict:
    content = path.read_bytes()
    validate_pdf_bytes(content, service)
    reader = PdfReader(path)
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    update_match = UPDATE_DATE.search(text)
    if not update_match:
        raise ScheduleImportError("Last Update Date is missing")
    update_day = datetime.strptime(update_match.group(1), "%d-%b-%Y").date()
    age = (today - update_day).days
    if age < -1 or age > int(manifest["freshnessDays"]):
        raise ScheduleImportError(f"snapshot date {update_day} is outside the freshness window")
    if f"--{service['id']}" not in text.replace(" ", "") and service["id"] not in text[:1000]:
        raise ScheduleImportError("service title does not match the manifest")

    voyages = parse_voyages(reader)
    if len(voyages) < int(service.get("minVoyages", 1)):
        raise ScheduleImportError(f"only {len(voyages)} valid voyages; expected at least {service['minVoyages']}")
    raw_records = build_records(
        service,
        voyages,
        manifest["ports"],
        update_day,
        int(manifest["futureWindowDays"]),
    )
    if not raw_records:
        raise ScheduleImportError("no current mapped port-to-port records were produced")
    max_records_per_route = max(1, int(manifest.get("maxRecordsPerServiceRoute", 2)))
    records_by_route: dict[str, list[dict]] = defaultdict(list)
    for record in raw_records:
        records_by_route[f"{record['originCode']}->{record['destinationCode']}"].append(record)
    records = sorted(
        (
            record
            for route_records in records_by_route.values()
            for record in sorted(route_records, key=lambda item: item["departureDate"])[:max_records_per_route]
        ),
        key=lambda item: (item["departureDate"], item["originCode"], item["destinationCode"]),
    )
    unmapped_ports = sorted({
        call["port"]
        for voyage in voyages
        for call in voyage.get("calls", [])
        if call.get("port") and call["port"] not in manifest["ports"]
    })
    routes = {f"{item['originCode']}->{item['destinationCode']}" for item in records}
    source_id = f"oocl-{service['id'].lower()}-service"
    return {
        "source": {
            "id": source_id,
            "mode": "sea",
            "name": f"OOCL {service['id']} Service Schedule",
            "url": service["url"],
            "format": "official-pdf",
            "cadence": "daily",
            "automation": "validated-pdf-ingestion",
            "note": f"OOCL 官方 {service['id']} 服务表；文件更新日期 {update_day.isoformat()}，通过格式、日期、船名航次和港口窗口校验。",
        },
        "download": {
            "id": f"oocl-service-{service['id'].lower()}",
            "sourceId": source_id,
            "mode": "sea",
            "originScope": "该服务表全部已映射挂靠港（含进口、出口和跨境第三国方向）",
            "destinationScope": service["name"],
            "format": "pdf",
            "cadence": "daily",
            "url": service["url"],
        },
        "snapshot": {
            "serviceId": service["id"],
            "publisher": manifest["publisher"],
            "capturedAt": update_day.isoformat(),
            "fileName": service["fileName"],
            "sha256": hashlib.sha256(content).hexdigest(),
            "voyageCount": len(voyages),
            "rawRecordCount": len(raw_records),
            "recordCount": len(records),
            "routeCount": len(routes),
            "recordsPerRouteLimit": max_records_per_route,
            "unmappedPorts": unmapped_ports[:40],
            "status": "validated",
        },
        "records": records,
    }


def write_output(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=False)
    path.write_text(f"{PREFIX}{serialized};\n", encoding="utf-8")


def main() -> int:
    args = parse_args()
    manifest_path = Path(args.manifest)
    output_path = Path(args.output)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    today = date.fromisoformat(args.today) if args.today else date.today()
    existing = load_existing(output_path)
    services = dict(existing.get("services") or {})
    input_dirs = [Path(item).expanduser() for item in args.input_dir]
    successes = []
    failures = []

    with tempfile.TemporaryDirectory(prefix="logismaster-schedules-") as temp_name:
        temp_dir = Path(temp_name)
        manifest_services = configured_services(manifest)
        discovery_missing: list[str] = []
        if args.download and manifest.get("discoverServiceIds"):
            try:
                manifest_services, discovery_missing = discover_services(manifest)
            except Exception as error:
                failures.append({"service": "OOCL-SERVICE-DISCOVERY", "reason": str(error)})
        for service in manifest_services:
            try:
                path = find_local_pdf(service, input_dirs)
                if path is None and args.download:
                    path = download_pdf(service, temp_dir)
                if path is None:
                    raise ScheduleImportError("official PDF not found in the supplied input directories")
                parsed = parse_service(path, service, manifest, today)
                services[service["id"]] = parsed
                successes.append({"service": service["id"], **parsed["snapshot"]})
            except Exception as error:
                failures.append({"service": service["id"], "reason": str(error)})

    if not successes and existing.get("services"):
        print(json.dumps({"updated": False, "keptLastGood": True, "failures": failures}, ensure_ascii=False, indent=2))
        return 0
    if len(services) < 8:
        raise ScheduleImportError(f"quality gate failed: only {len(services)} validated services are available")

    all_records = [record for service in services.values() for record in service.get("records", [])]
    all_routes = {f"{item['originCode']}->{item['destinationCode']}" for item in all_records}
    payload = {
        "schemaVersion": "1.1",
        "updatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "publisher": manifest["publisher"],
        "sourcePage": manifest["sourcePage"],
        "serviceCount": len(services),
        "recordCount": len(all_records),
        "routeCount": len(all_routes),
        "services": services,
        "lastRefresh": {"successes": successes, "failures": failures, "discoveryMissing": discovery_missing},
    }
    write_output(output_path, payload)
    print(json.dumps({
        "updated": True,
        "serviceCount": len(services),
        "recordCount": len(all_records),
        "routeCount": len(all_routes),
        "successes": successes,
        "failures": failures,
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ScheduleImportError as error:
        print(json.dumps({"updated": False, "error": str(error)}, ensure_ascii=False, indent=2))
        raise SystemExit(2)
