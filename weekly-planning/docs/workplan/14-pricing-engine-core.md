# 14 — Pricing Engine Core

## Scope
Compute price per configuration and tiers; return printing and delivery costs.

## API
POST `/api/catalog/price`
Request:
```json
{
  "slug": "raised-spot-gloss-flyers",
  "configuration": {
    "format": "a4",
    "paper": "matte-300",
    "colors": "4-4",
    "finishings": ["soft-skin-foil"],
    "quantity": 1000,
    "shipping": "standard"
  },
  "locale": "en"
}
```
Response 200:
```json
{
  "currency": "EUR",
  "printingCostNet": 71.79,
  "deliveryCostNet": 30.0,
  "runs": [ { "quantity": 1000, "netPrice": 101.79, "unitPrice": 0.10179, "eta": "Thu (09/18)", "cutoffNote": "Order today until 16:00" } ],
  "priceVersion": 42
}
```

## Algorithm
1. Validate configuration (server-side rules)
2. Determine base via anchors for nearest tier or exact quantity
3. Apply rules in order of priority (adds/multiplies)
4. Apply volume scaling by quantity brackets (percentage up/down)
5. Add surcharges for options (paper/colors/finishings)
6. Add delivery based on selected shipping
7. Round monetary values to 2 decimals (bankers rounding), unitPrice to 5 decimals

## Limits & Errors
- Quantity ≤ 100,000; else `QUANTITY_TOO_HIGH`
- Invalid option → `INVALID_CONFIGURATION`

## Caching & Rate Limits
- Cache pricing for identical config for 60s
- Rate limit per IP to prevent abuse

## Acceptance Criteria (PM)
- Prices reflect anchors + option surcharges + shipping
- Unit price shown in tiers matches totals

## Acceptance Criteria (Dev)
- Deterministic outputs; snapshot tests on example table
- Performance P95 < 300ms