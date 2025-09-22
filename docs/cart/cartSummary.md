# Order — Summary Step

Goal: Specify routing, UX, data, and API for the final pre‑placement review. Handles incomplete orders via an explanatory modal and supports placing an order "on hold".

## Route & Files

- Page: `src/app/[locale]/order/summary/page.tsx`
- Components:
  - `src/components/order/summary/ItemsReview.tsx`
  - `src/components/order/summary/SectionCard.tsx` (wrapper for Shipping/Invoice/Payment)
  - `src/components/order/summary/ShippingAddressesCard.tsx`
  - `src/components/order/summary/InvoiceDataCard.tsx`
  - `src/components/order/summary/PaymentMethodCard.tsx`
  - `src/components/cart/CartSummary.tsx` (reuse for right sidebar totals)
  - `src/components/order/summary/IncompleteNotice.tsx`
  - `src/components/order/summary/IncompleteModal.tsx`
- Hooks:
  - `src/hooks/order/useOrderSummary.ts`
  - `src/hooks/order/useCompleteness.ts`
  - `src/hooks/order/usePlaceOrder.ts`
- API client: `src/lib/api/orderSummary.ts`

## Page Structure

- Stepper: 1 Cart → 2 File upload → 3 Shipment → 4 Payment → 5 Summary
- Left column
  - Products table with per‑item badges (e.g., "No files uploaded • correct")
  - Three cards below: Shipping addresses, Invoice data, Payment method, each with Edit link
- Right column
  - Summary card with currency toggle, totals, discount field (disabled here)
  - Incomplete order notice (if any) and the primary CTA
  - CTA text:
    - Complete order: `Order and pay`
    - Incomplete but allow on‑hold: `Place on hold`

## Completeness Rules

- Completeness is computed server‑side and returned with the summary.
- Fields:
  - `filesComplete`: every item has required files confirmed
  - `shipmentComplete`: One address selected OR for Multiple, all quantities assigned
  - `paymentComplete`: method selected AND invoice address set
  - `missing: string[]` localized or mappable keys
  - `canPlaceOnHold: boolean` (when incomplete orders are allowed)

## Incomplete Modal

- Title: "Note: the order is incomplete"
- Body: list missing details and explain on‑hold behavior
- Actions: `Back to cart` and `I understand, I place an on‑hold order`

## Data Contracts

- `OrderDraftItem`:
  - `id`, `name`, `copies`, `priceNet`, `priceGross`, `currency`, `shippingDateLabel`, `shippingBadge?`, `fileStatus: 'missing'|'uploaded'|'approved'`, `fileNote?`
- `OrderDraftSummary`:
  - `items: OrderDraftItem[]`
  - `shippingAddresses: string[]` (rendered details provided separately)
  - `invoiceAddressId?: string`
  - `paymentMethod?: string`
  - `printingNet`, `deliveryNet`, `totalNet`, `totalGross`, `currency`
  - `completeness: Completeness`
- `Completeness` as above
- `PlaceOrderPayload`: `{ allowOnHold?: boolean }`
- `PlaceOrderResponse`: `{ orderNumber: string; status: 'placed'|'on_hold'; paymentRedirectUrl?: string }`

Types live in `src/types/index.ts`.

## React Query

- Keys
  - Summary: `['order', 'summary']`
  - Completeness: `['order', 'summary', 'completeness']`
- Invalidation
  - Invalidate after any upstream change (shipment/payment/upload) and before placing order

## API Endpoints (server)

- `GET /api/order/summary` → `OrderDraftSummary`
- `POST /api/order/place` → `PlaceOrderResponse` (honors `allowOnHold`)

## UX Notes

- Edit links route back to the specific step (shipment/payment/upload) preserving state.
- If incomplete and `canPlaceOnHold` is true, show notice and open modal before confirming.
- If payment method requires redirect, defer until after `place` returns `paymentRedirectUrl`.

## Accessibility & i18n

- All text via translation keys.
- Modal is focus‑trapped with descriptive title and buttons.
