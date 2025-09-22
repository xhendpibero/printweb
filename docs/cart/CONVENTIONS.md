# Cart/Checkout Conventions

This document aligns all cart/checkout specs so types, query keys, and endpoints are consistent.

## Shared Types

- Money: `{ amountMinor: number; currency: string }` — integer minor units (e.g., cents). No floats in responses.
- ID: string (ULID/UUID). Use as path and body params.
- ApiResult<T>: `{ ok: true; data: T } | { ok: false; error: { code: string; message: string; details?: unknown } }`
- Pagination: `{ items: T[]; page: number; pageSize: number; total: number }`

## React Query Keys

- Base key for checkout: `['order']`
- Steps: `['order','cart']`, `['order','upload', itemId]`, `['order','shipment']`, `['order','payment']`, `['order','summary']`
- Sub-ops: `['order','upload','sign', fileHash]`
- Confirmation page (post-order): `['order','confirmation', orderNumber]`

## Endpoints

- Cart step: `/api/order/cart` and mutations under `/api/order/cart/*`
- Uploads: `/api/order/uploads/*` (sign/complete/status)
- Shipment: `/api/order/shipment/*`
- Payment: `/api/order/payment/*`
- Place order: `/api/order/place` and `/api/order/summary`
- Confirmation: `/api/order/confirmation`

## Pricing Fields

- All price fields in specs refer to Money unless explicitly noted otherwise:
  - `printingNet`, `deliveryNet`, `totalNet`, `totalGross`, item price, etc.
  - When a spec shows a `number`, interpret as `Money`.

## Status & Completeness

- FileStatus: `missing | uploaded | approved`
- ShipmentMode: `one | multiple`
- Completeness flags: `filesComplete`, `shipmentComplete`, `paymentComplete`; include `missing: string[]`, `canPlaceOnHold: boolean`.

## i18n and A11y

- Use translation keys and keep labels in UI-only layer.
- Components expose `aria-*` props for progress, errors, and modals.

## Error Codes (Problem-like)

- `validation_error`, `not_found`, `conflict`, `rate_limited`, `unauthorized`, `forbidden`, `upload_failed`.

## Consistency Checklist

- Query keys use `['order', step]` consistently.
- Prices use Money everywhere.
- Endpoints follow `/api/cart/*` for steps; `/api/order/*` for placement and confirmation.
- IDs are strings and stable across steps.
- Each mutation documents invalidations for `['cart']` and its step key.
