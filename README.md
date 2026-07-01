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
