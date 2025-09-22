# Cart Page

Goal: Specify routing, UX, data, and API for the shopping cart: items list, per-item actions (three-dot menu), currency switcher, discounts, and summary. Upload File and Finish Later will be documented separately.

## Route & Files

- Page: `src/app/[locale]/order/cart/page.tsx`
- Components:
  - `src/components/cart/CartItem.tsx`
  - `src/components/cart/CartItemMenu.tsx` (three-dot menu)
  - `src/components/cart/CartList.tsx`
  - `src/components/cart/CartSummary.tsx`
  - `src/components/cart/CurrencyToggle.tsx`
  - `src/components/cart/DiscountCode.tsx`
- Hooks:
  - `src/hooks/cart/useCart.ts`
  - `src/hooks/cart/useCartMutations.ts`
  - `src/hooks/cart/useCurrency.ts`
- API client: `src/lib/api/cart.ts`

## Page Structure

- Heading: Cart
- Left: list of items with thumbnail, name, configuration details link, quantity/number of copies, price (net and gross) and shipping info + badge (e.g., STANDARD)
- Per-item menu (three dots): Duplicate product in the order, Edit, Add order name, Remove
- Right: Summary card
  - Currency selector (toggle between e.g., PLN/EUR)
  - Printing cost (net), Delivery cost (net)
  - Discount code input
  - Net price and Gross price totals
  - Primary actions: Upload file, Finish later
  - Helper link: What is the "Finish later" option?

## Data Contracts

- `CartCurrency` = e.g., `PLN | EUR`
- `CartItem`:
  - `id`, `productId`, `name`, `thumbnailUrl?`
  - `configurationSummary`: string
  - `copies`: number
  - `prices`: `{ net: number; gross: number; currency: CartCurrency }`
  - `shipping`: `{ dateLabel: string; methodLabel: string; badge?: string }`
  - `orderName?: string`
- `Cart`:
  - `items: CartItem[]`
  - `currency: CartCurrency`
  - `printingNet: number`, `deliveryNet: number`, `totalNet: number`, `totalGross: number`
  - `discountCode?: string`
- `DuplicateItemPayload`: `{ itemId: string }`
- `EditItemPayload`: `{ itemId: string, configuration: unknown }`
- `RemoveItemPayload`: `{ itemId: string }`
- `SetOrderNamePayload`: `{ itemId: string, orderName: string }`
- `ApplyDiscountPayload`: `{ code: string }`
- `SetCurrencyPayload`: `{ currency: CartCurrency }`

Types live in `src/types/index.ts`.

## React Query

- Keys
  - Cart: `['order','cart']`
- Invalidation
  - After any mutation, refetch `['cart']`. For currency change, refetch cart priced in new currency.

## API Endpoints (server)

- `GET /api/order/cart` → `Cart`
- `POST /api/order/cart/items/:id/duplicate` → `Cart`
- `PUT /api/order/cart/items/:id` → edit configuration; returns `Cart`
- `DELETE /api/order/cart/items/:id` → `Cart`
- `POST /api/order/cart/items/:id/name` → set order name; returns `Cart`
- `POST /api/order/cart/discount` → apply discount code; returns `Cart`
- `POST /api/order/cart/currency` → set currency; returns `Cart`

## Currency Toggle

- Toggle reflects available currencies; disabled options shown but not clickable when unavailable.
- Changing currency re-prices all items and totals server-side; avoid client-side math to prevent rounding drift.

## Three-dot Item Menu

- Actions:
  - Duplicate product in the order → clones item with same configuration
  - Edit → navigates to product config page
  - Add order name → inline prompt or modal
  - Remove → confirm then delete

## UX Notes

- Toast when product added to cart; keep visible briefly.
- Show net and gross values; format per selected currency/locale.
- Persist discount code in server cart; keep field disabled while applying.

## Accessibility & i18n

- All labels via translation keys.
- Menu is keyboard-navigable and accessible; buttons have clear names.

## Follow-ups

- Create `cartUpload.md` for Upload file flow.
- Create `cartFinishLater.md` for Save/Finish later flow.
