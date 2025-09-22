# Order Confirmation

Goal: Specify routing, UX, data, and API for the post‑placement confirmation view. Supports orders placed normally or "on hold" and reflects optional `paymentType` query.

## Route & Files

- Page: `src/app/[locale]/order-confirmation/[orderNumber]/page.tsx`
- Query: `?paymentType=NotSelected|PayU|Card|Transfer|...` (optional)
- Components:
  - `src/components/order/confirmation/PlacedBanner.tsx` (variant for on‑hold)
  - `src/components/order/confirmation/Actions.tsx`
- Hooks:
  - `src/hooks/order/useOrderConfirmation.ts`
- API client: `src/lib/api/orderConfirmation.ts`

## Page Structure

- Heading: "Your order has been placed"
- Success banner
  - If `status === 'on_hold'`: explain that order is on hold and can be released later in the client panel
- Order number highlighted (e.g., `Z-1016-11490`)
- Primary actions:
  - `Go to order` → client panel details: `src/app/[locale]/(panel)/orders/[orderId or number]`
  - `Configure the next product` → entry to catalog/configurator
- Optional action when `paymentType=NotSelected` or unpaid: `Complete payment` button linking to payment URL

## Data Contracts

- `OrderConfirmation`:
  - `orderNumber: string`
  - `status: 'on_hold'|'awaiting_payment'|'processing'|'paid'`
  - `paymentType?: string`
  - `paymentUrl?: string`

Types in `src/types/index.ts`.

## React Query

- Key: `['order', 'confirmation', orderNumber]`

## API Endpoint (server)

- `GET /api/order/confirmation?number=Z-...` → `OrderConfirmation`

## UX Notes

- Keep message concise; emphasize next steps depending on status.
- If payment is pending and payment URL exists, show actionable button.

## Accessibility & i18n

- All strings via translation keys.
- Buttons have clear labels and focus states.

