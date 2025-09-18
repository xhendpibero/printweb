# 17 — Delivery Pricing & Shipping Options

## Scope
Flat shipping options for MVP: express (€50), standard (€30), economy (€20); configurable later.

## Data Model
```json
{
  "options": [
    { "code": "express", "label": "Express", "priceNet": 50.0, "currency": "EUR", "active": true },
    { "code": "standard", "label": "Standard", "priceNet": 30.0, "currency": "EUR", "active": true },
    { "code": "economy", "label": "Economy", "priceNet": 20.0, "currency": "EUR", "active": true }
  ],
  "rules": [],
  "version": 1
}
```

## Endpoints
- GET `/api/shipping/options?locale=en`
  - Returns active options with localized labels
- POST `/api/shipping/quote`
  - Body: `{ cartId, address, optionCode }`
  - Response: `{ option: { code, label }, deliveryCostNet, currency }`
- Admin (future): CRUD for options and rules

## Integration Points
- Pricing engine includes `deliveryCostNet` from chosen option
- Cart totals recompute when option changes
- Checkout requires selection of one option

## UI
- Radio group for options with prices
- Tooltip for delivery speed expectations (copy from CMS)

## Future-Proofing
- Add `zone` and `weight` constraints later
- Carrier-rate integration can replace flat prices via rules

## Acceptance Criteria (PM)
- Users can select among three options and see totals update
- Option labels localized

## Acceptance Criteria (Dev)
- Contract stable and typed; invalid `optionCode` → 400 `UNKNOWN_SHIPPING_OPTION`
- Unit/integration tests ensure totals update and persistence