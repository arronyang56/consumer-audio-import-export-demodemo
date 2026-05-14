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

The ShipXY key must be configured in Netlify environment variables. Do not put it in frontend files.

## Notes

This public version does not contain real company data. API-based results are for workflow testing and should be verified against official customs, carrier, forwarder, and compliance sources before business use.
