# Cart — Payment Step

Goal: Specify routing, UX, data, and API for choosing a payment method and providing invoice data (pick from saved invoice addresses or create a new one). Includes deferred option "I will choose later".

## Route & Files

- Page: `src/app/[locale]/order/payment/page.tsx`
- Components:
  - `src/components/cart/payment/PaymentMethods.tsx`
  - `src/components/cart/payment/InvoiceAddressPicker.tsx`
  - `src/components/cart/payment/InvoiceAddressForm.tsx`
  - `src/components/cart/CartSummary.tsx` (reuse)
- Hooks:
  - `src/hooks/cart/payment/usePayment.ts`
  - `src/hooks/cart/payment/useInvoiceAddress.ts`
- API clients:
  - `src/lib/api/cartPayment.ts`
  - reuse `src/lib/api/addresses.ts` for invoice address CRUD

## Page Structure

- Stepper: 1 Cart → 2 File upload → 3 Shipment → 4 Payment → 5 Summary
- Left column
  - Section: Payment method (grid of method tiles)
  - Section: Saved invoice addresses with search and three-dot menu
  - Section: Invoice data form (Private person | Company account) when adding a new address
- Right column
  - Summary card with currency toggle, totals, and primary button: `Summary`

## Payment Methods

- Supported examples: `tpay`, `blik`, `spingo`, `payu`, `payu_link`, `card`, `transfer`, `paypal`, `cod` (disabled in UI), `deferred` (I will choose later)
- Tile shows logo + label; disabled when not available for currency or country.
- Selecting a method persists to cart state; may redirect to provider on the Summary/Place order step.

## Invoice Address

- Picker shows saved invoice addresses with radio select and search.
- Option to `Add new address` opens the Invoice data form.
- Form tabs: `Private person` | `Company account` (same structure as in Addresses page)
- On save, created address becomes selected and added to saved list.

## Data Contracts

- `PaymentMethod` = union of supported method ids
- `CartPaymentState`:
  - `method: PaymentMethod | null`
  - `invoiceAddressId?: string`
- `SetPaymentMethodPayload`: `{ method: PaymentMethod }`
- `SetInvoiceAddressPayload`: `{ addressId: string }`

Types in `src/types/index.ts`.

## React Query

- Keys
  - Payment: `['order', 'payment']`
- Invalidation
  - After setting method or invoice address, refetch `['order','cart']` totals if payment surcharges apply.

## API Endpoints (server)

- `GET /api/order/payment` → `CartPaymentState`
- `POST /api/order/payment/method` → set method
- `POST /api/order/payment/invoice-address` → set invoice address id
- Address creation uses `/api/addresses` with type `invoice`

## UX Notes

- Handle provider-specific notes under each tile when selected.
- Keep Summary button disabled until a valid method is selected.
- When `deferred` selected, allow proceeding; payment occurs later from Orders.

## Accessibility & i18n

- All strings via translation keys.
- Radio groups and tabs are keyboard accessible; forms have proper labels and errors.
