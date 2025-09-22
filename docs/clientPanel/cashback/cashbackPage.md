# CashBack Page

Goal: Specify routing, UX, data, and API for displaying and using CashBack balances across currencies, including blocked funds.

## Route & Files

- Page: `src/app/[locale]/(panel)/cashback/page.tsx`
- Components:
  - `src/components/cashback/CashbackBalances.tsx`
  - `src/components/cashback/CashbackHistory.tsx` (optional)
  - `src/components/cashback/RedeemToOrder.tsx` (optional)
- Hooks:
  - `src/hooks/cashback/useCashbackBalances.ts`
  - `src/hooks/cashback/useCashbackHistory.ts` (optional)
  - `src/hooks/cashback/useRedeemCashback.ts` (optional)
- API client: `src/lib/api/cashback.ts`

## Page Structure

- Heading: i18n key `panel.cashback.title`
- Balances list by currency
  - Currency code and symbol
  - `available` amount
  - `blocked` amount (pending settlements or disputes)
- Optional: History table with filters (date range, type)
- Optional: Redeem/apply to current cart or generate voucher

## Data Contracts

- `CashbackBalance`:
  - `currency`: ISO code (e.g., `PLN`, `EUR`)
  - `available`: number
  - `blocked`: number
  - `updatedAt`: string (ISO)
- `CashbackHistoryItem` (optional):
  - `id`, `createdAt`, `type: earn|redeem|adjust|block|unblock`, `amount`, `currency`, `note?`, `orderId?`
- `RedeemCashbackRequest` (optional): `{ amount: number, currency: string, cartId?: string }`
- `RedeemCashbackResponse` (optional): `{ success: boolean, appliedToCartId?: string, message?: string }`

Add types to `src/types/index.ts` and reuse across hooks and API.

## React Query

- Keys
  - Balances: `['cashback', 'balances']`
  - History: `['cashback', 'history', filters]`
- Invalidation
  - After redeem: invalidate balances and history

## API Endpoints (server)

- `GET /api/cashback/balances` → `CashbackBalance[]`
- `GET /api/cashback/history` → paged list with filters (optional)
- `POST /api/cashback/redeem` → apply to cart or generate voucher (optional)

If using server actions, mirror with exported functions.

## UX Notes

- Format amounts with locale and currency.
- Show blocked funds with a tooltip explaining the reason/policy.
- If multiple currencies exist, sort by user’s primary currency first.
- For redeem flow, validate available balance and enforce min/max rules.

## Accessibility & i18n

- All strings via translation keys.
- Ensure amounts are readable by screen readers; include currency in labels.

## Security & Permissions

- Balances must belong to current user/organization.
- Prevent negative balances and race conditions; use server-side transactions.

## Open Questions

- Can users transfer cashback between currencies?
- Do blocked funds have an ETA or source to display?
- Is redemption limited to checkout only or allowed as vouchers?

