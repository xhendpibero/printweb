# 24 — Accounts: Order History & Invoices

## Scope
Account area with orders list/detail, invoice access, saved configurations, and address book.

## Endpoints (Authenticated)
- GET `/api/account/orders?limit=20&offset=0` → list with summary
- GET `/api/account/orders/:orderId` → detail (own orders only)
- GET `/api/account/orders/:orderId/invoice` → PDF download (signed URL)
- Saved configurations:
  - GET `/api/account/configs`
  - POST `/api/account/configs` (create)
  - DELETE `/api/account/configs/:id`
- Addresses:
  - GET `/api/account/addresses`
  - POST `/api/account/addresses`
  - PUT `/api/account/addresses/:id`
  - DELETE `/api/account/addresses/:id`

## Security
- JWT/session auth; enforce user ownership on all resources
- Rate limits to protect list endpoints

## UX
- Orders list: status badges, total, createdAt
- Detail: items, configuration summary, tracking, invoice link
- Configurations: quick add-to-cart
- Address book: default shipping/billing selectors

## Acceptance Criteria (PM)
- Users can view their full order history and download invoices

## Acceptance Criteria (Dev)
- Access controls tested; PDF URLs time-bound and single-use