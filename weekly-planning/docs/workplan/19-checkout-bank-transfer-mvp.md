# 19 — Checkout: Bank Transfer MVP

## Scope
Implement checkout with bank transfer as sole method; others later.

## Flow
1. User reviews cart → revalidation runs
2. Address + contact step
3. Shipping selection step (required)
4. Summary with totals
5. Place order → create order with status `AWAITING_PAYMENT` and bank details shown
6. Email sent with payment instructions and payment reference
7. Admin reconciles bank transfer (manual MVP) → set `PAID`

## Order States
- `AWAITING_PAYMENT` → `PAID` → `IN_PRODUCTION` → `SHIPPED` → `DELIVERED`
- Cancellations: `CANCELLED_BY_USER`, `PAYMENT_EXPIRED`

## Endpoints
- POST `/api/checkout/session` → validates cart, locks prices, creates order, returns bank details
- GET `/api/orders/:orderId` → user-visible order
- POST `/api/orders/:orderId/confirm-payment` (admin) → mark as `PAID`

## Bank Details (Config)
- IBAN, beneficiary, SWIFT/BIC, bank name, payment reference template (e.g., `ORD-{orderNumber}`)

## Emails
- Order confirmation with bank instructions
- Payment received notification
- Payment overdue reminder (27-hour window)

## Acceptance Criteria (PM)
- Clear payment instructions after placing order and via email
- Orders visible in account with correct state transitions

## Acceptance Criteria (Dev)
- Idempotent session creation; duplicate submits do not create duplicate orders
- Revalidation occurs before order creation; locked prices recorded