# 16 — Price Versioning & Revalidation

## Scope
Introduce `priceVersion` and revalidation across product, cart, and checkout.

## Concepts
- `priceVersion` (integer): Monotonic per product. Increment on any pricing-relevant change (anchors, rules, delivery prices). Included in product detail and pricing responses.
- `configFingerprint` (string): Stable hash of ordered configuration JSON (e.g., SHA-256 hex truncated to 16 chars). Captured when pricing is computed.

## Triggers
Revalidate cart items:
- App load (if cart present)
- Cart view open
- Checkout start
- Before payment session creation
- Resume checkout (returning from bank)
- If cached price older than 60 minutes

## API
POST `/api/cart/validate`
Request:
```json
{
  "items": [
    {
      "itemId": "abc123",
      "slug": "raised-spot-gloss-flyers",
      "configuration": { "format": "a4", "paper": "matte-300", "colors": "4-4", "finishings": ["soft-skin-foil"], "quantity": 1000 },
      "priceVersion": 42,
      "configFingerprint": "8b12e9c1a4df77aa"
    }
  ]
}
```
Response 200:
```json
{
  "items": [
    {
      "itemId": "abc123",
      "ok": false,
      "reason": "PRICE_CHANGED",
      "current": { "priceVersion": 43, "netPrice": 76.64, "currency": "EUR" },
      "suggested": { "quantity": 1000 }
    }
  ],
  "totals": { "net": 120.50, "currency": "EUR" }
}
```
Reasons: `PRICE_CHANGED`, `OUT_OF_STOCK`, `CONFIG_INVALID`, `PRODUCT_INACTIVE`.

## UX Handling
- Non-blocking banner in cart with CTA: "Update prices" → applies deltas
- Blocking step at checkout if any invalid or price drift; modal shows item deltas and requires confirm

## Observability
- Metric: revalidation change rate, average delta amount, failure reasons distribution

## Tasks
- Implement hashing util and attach fingerprints
- Validation endpoint aggregating per-item checks
- Frontend flows to prompt and apply updates

## Acceptance Criteria (PM)
- Users are clearly informed of changes and can accept updates
- Checkout cannot proceed with invalid items

## Acceptance Criteria (Dev)
- Deterministic hashing; identical configs yield identical fingerprints
- Unit and integration tests for each reason code