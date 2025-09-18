# 21 — Discount Codes & Promotions

## Scope
Implement simple cart-level discount codes (no stacking).

## Code Schema
```json
{
  "code": "WELCOME10",
  "type": "percent", // or "fixed"
  "amount": 10,       // percent (0-100) or fixed amount
  "currency": "EUR", // required for fixed
  "active": true,
  "startsAt": "2025-09-01T00:00:00Z",
  "endsAt": "2025-12-31T23:59:59Z",
  "minSubtotal": 0,
  "maxRedemptions": 10000,
  "perUserLimit": 3,
  "stackable": false,
  "scope": "cart"     // MVP: cart-level only
}
```

## Endpoints
- POST `/api/promotions/apply`
  - Body: `{ cartId, code }`
  - Response: `{ ok: true, discount: { type, amount, currency }, totals: { before, discount, after, currency } }`
- POST `/api/promotions/remove`
  - Body: `{ cartId }`
  - Response: `{ ok: true, totals: { after } }`
- Validation runs on cart load and before checkout

## Calculation Order (MVP)
1. Compute cart net (printing + delivery)
2. Apply discount to cart net (floor at 0)
3. Compute taxes on discounted net

## Rules
- Case-insensitive code matching; trim spaces
- No stacking: one active code per cart
- Revalidate code on each pricing/revalidation event

## Errors
- `INVALID_CODE`, `NOT_ACTIVE`, `EXPIRED`, `USAGE_LIMIT_REACHED`, `MIN_SUBTOTAL_NOT_MET`

## Observability
- Track redemption count, failure reasons, average discount amount

## Acceptance Criteria (PM)
- Users can apply/remove a single code; totals update immediately
- Clear messaging for invalid/expired codes

## Acceptance Criteria (Dev)
- Deterministic totals; unit tests for percent/fixed and edge cases
- Revalidation removes invalidated codes automatically