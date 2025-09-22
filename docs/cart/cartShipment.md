# Cart — Shipment Step

Goal: Specify routing, UX, data, and API for selecting shipping addresses and assigning quantities per address. Supports One address and Multiple addresses with an Assign shipping addresses modal.

## Route & Files

- Page: `src/app/[locale]/order/shipment-address/page.tsx`
- Components:
  - `src/components/cart/shipment/AddressModeToggle.tsx` (One vs Multiple)
  - `src/components/cart/shipment/AddressPicker.tsx` (list + search)
  - `src/components/cart/shipment/AddressCard.tsx` (with three-dot menu)
  - `src/components/cart/shipment/ProductsAssignList.tsx` (status per item)
  - `src/components/cart/shipment/AssignModal.tsx` (quantity split)
  - `src/components/cart/CartSummary.tsx` (reuse)
- Hooks:
  - `src/hooks/cart/shipment/useShipment.ts`
  - `src/hooks/cart/shipment/useAssign.ts`
- API client: `src/lib/api/cartShipment.ts`

## Modes

- One address
  - Pick a single saved address or add new
  - Optional: checkbox "Use address in payment" to set invoice address
- Multiple addresses
  - Select two or more saved addresses
  - For each cart item, open Assign modal to distribute quantities across selected addresses
  - Note: shipping date may be delayed by one day when using multiple addresses (copy shown)

## Assign Shipping Addresses Modal

- Header: product name, quantity total, price
- Left: product configuration summary
- Right: list of selected addresses, each with an input `Amount` and an `Assign all` shortcut
- Footer actions: `Assign evenly` (split remaining equally), `Cancel`, `Save`
- Validation: sum of amounts must equal product quantity; prevent negatives and decimals when not allowed

## Data Contracts

- `ShipmentMode` = `one` | `multiple`
- `ShipmentState`:
  - `mode: ShipmentMode`
  - `addressIds: string[]` (one or many)
  - `assignments: Record<itemId, Array<{ addressId: string; qty: number }>>`
- `AssignPayload`: `{ itemId: string, splits: Array<{ addressId: string; qty: number }> }`

Types in `src/types/index.ts`.

## React Query

- Keys
  - Shipment: `['order', 'shipment']`
- Invalidation
  - After save or address changes, refetch shipment and cart totals (deliveryNet may change)

## API Endpoints (server)

- `GET /api/order/shipment` → `ShipmentState`
- `POST /api/order/shipment/mode` → `{ mode }`
- `POST /api/order/shipment/address` → add/remove address ids
- `POST /api/order/shipment/assign` → `AssignPayload`

## UX Notes

- Show search for addresses; support lazy pagination.
- Indicate per-item assignment status (e.g., All products assigned badge).
- Anonymous shipping option toggle with explanatory tooltip.
- Disable Go to payment until assignments are complete in Multiple mode.

## Accessibility & i18n

- All strings via translation keys.
- Modal uses focus trap; inputs have labels and constraints.
