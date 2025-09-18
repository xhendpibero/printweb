# 08 — Configurator Quantity Tiers

## Scope
Per-product tiers up to 100,000 max; admin-activated.

## Tier Schema
```json
{
  "tiers": [
    { "quantity": 30, "netPrice": 196.69 },
    { "quantity": 50, "netPrice": 237.56 },
    { "quantity": 100, "netPrice": 302.58 }
  ],
  "currency": "EUR",
  "maxQuantity": 100000,
  "active": true
}
```

## Rules
- Quantities must be positive integers ascending
- Max enforce at 100,000 per product
- If no tiers, pricing engine can interpolate/extrapolate based on anchors/rules

## UI
- Dropdown or grid of tier buttons
- Custom quantity input validates against max and snaps to nearest supported if required

## Tasks
- Tier storage and retrieval
- UI component with accessibility
- Validation on server and client

## Acceptance Criteria (PM)
- Tiers reflect admin settings; max enforced

## Acceptance Criteria (Dev)
- Server rejects invalid tier definitions
- Tests verify rounding/snapping logic