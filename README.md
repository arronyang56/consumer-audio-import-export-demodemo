# Consumer Audio Import Export Platform

Public desensitized test version for import/export reference workflows.

## What is included

- Dashboard overview
- HS Code Assistant
- Declaration Elements
- Policy Monitor
- Shipment / ETA test panel
- Battery & Dangerous Goods check
- Document checklist
- Exception log
- Cost and lead time benchmark
- Country requirement matrix

## Deployment

This project is configured for Netlify.

- Static site publish directory: `site`
- Netlify Functions directory: `netlify/functions`
- Required production environment variable for ShipXY test API: `SHIPXY_API_KEY`
- Required production environment variable for access control: `PLATFORM_ACCESS_CODE_HASH` or `PLATFORM_ACCESS_CODE`

The ShipXY key must be configured in Netlify environment variables. Do not put it in frontend files.

GitHub Actions deployment to the production server uses these repository secrets:

- `PROD_SSH_HOST`
- `PROD_SSH_USER`
- `PROD_SSH_KEY`
- `PLATFORM_ACCESS_CODE_HASH`
- `PLATFORM_AUTH_SECRET` is optional but recommended

Optional repository variables:

- `PROD_SSH_PORT` defaults to `22`
- `PROD_APP_DIR` defaults to `/opt/hs-platform`
- `PROD_SERVICE_NAME` defaults to `hs-platform`
- `PROD_HEALTH_URLS` defaults to both production health URLs

Generate the access code hash locally with:

```sh
printf '%s' 'your-access-code' | shasum -a 256
```

## Notes

This public version does not contain real company data. API-based results are for workflow testing and should be verified against official customs, carrier, forwarder, and compliance sources before business use.

Persistent runtime records are stored under `LOCAL_DATA_DIR` (defaults to `.data`):

- `schedule-records.json` stores validated carrier schedule snapshots.
- `business-evidence-records.json` stores authenticated, sanitized quote and shipment evidence.

The deployment archive excludes `.data`, so releases do not overwrite runtime records. Back up this directory with the application backup and never commit it to Git.

## Official schedule snapshots

`site/generated-schedule-records.js` is generated from carrier-published schedule PDFs. It must not be edited by hand.

- Service URLs and port-code mappings live in `scripts/oocl-schedule-services.json`.
- `scripts/refresh-schedule-database.py` rejects HTML/Cloudflare pages, stale files, mismatched service titles, incomplete voyages, invalid dates, and implausible transit times.
- A failed refresh keeps the last good file unchanged. The frontend independently excludes snapshots older than its freshness window.
- Planned ETD/ETA records are never used as actual delay evidence.

For a browser-assisted refresh, download the listed official PDFs into one directory and run:

```sh
python3 -m pip install --requirement requirements-schedule.txt
python3 scripts/refresh-schedule-database.py \
  --manifest scripts/oocl-schedule-services.json \
  --input-dir /path/to/downloaded-pdfs \
  --output site/generated-schedule-records.js
```

The scheduled GitHub workflow attempts the same strict import daily. If the carrier blocks unattended downloads, it preserves the current snapshot instead of bypassing the block or publishing guessed data.
