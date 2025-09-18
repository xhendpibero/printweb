# 22 — Shipping Zones & Carriers

## Scope
Poland-only MVP; prepare structure for additional zones and carriers.

## Zone Model
```json
{
  "zones": [
    { "code": "PL", "label": "Poland", "active": true }
  ],
  "defaultZone": "PL"
}
```

## Carriers (placeholders)
```json
[
  { "code": "dpd", "label": "DPD", "active": true },
  { "code": "inpost", "label": "InPost", "active": true },
  { "code": "ups", "label": "UPS", "active": false }
]
```

## Endpoints
- GET `/api/shipping/zones` → list zones
- GET `/api/shipping/carriers?zone=PL` → carriers for zone
- Validation in checkout: shipping address country must be in active zones

## Checkout Validation
- If address.country not in zones → 400 `OUT_OF_ZONE`
- If carrier selected not active → 400 `CARRIER_UNAVAILABLE`

## Acceptance Criteria (PM)
- Only PL addresses accepted at checkout
- Carriers list reflects active/inactive status

## Acceptance Criteria (Dev)
- Strong typing; unit tests for zone validation
- Easy to add new zones without code changes (config-driven)