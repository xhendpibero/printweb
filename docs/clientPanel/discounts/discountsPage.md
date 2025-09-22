# Discounts & Promotions Page

Goal: Specify routing, UX, data, and API for displaying a customer’s discount program, current discount, and any active promotions/coupons.

## Route & Files

- Page: `src/app/[locale]/(panel)/discounts/page.tsx`
- Components:
  - `src/components/discounts/ProgramSummary.tsx`
  - `src/components/discounts/PromotionsList.tsx`
  - `src/components/discounts/CouponRedeemer.tsx` (optional)
- Hooks:
  - `src/hooks/discounts/useDiscountProgram.ts`
  - `src/hooks/discounts/usePromotions.ts`
  - `src/hooks/discounts/useRedeemCoupon.ts` (optional)
- API client: `src/lib/api/discounts.ts`

## Page Structure

- Heading: i18n key `panel.discounts.title`
- Program block
  - Current program name
  - Current discount percentage
  - Optional next tier preview (thresholds)
- Promotions (optional)
  - List active time-bounded promotions applicable to the user/org
  - Each item: name, description, validity window, conditions
- Coupon input (optional)
  - Field to submit a coupon/voucher code and display result

## Data Contracts

- `DiscountProgram`:
  - `programId`, `name`, `currentDiscountPct`
  - `nextTier?`: `{ name: string, threshold: number, discountPct: number }`
- `Promotion`:
  - `id`, `name`, `description`, `startsAt`, `endsAt`, `status: active|upcoming|expired`
  - `conditions?`: array of human-readable strings or structured rules
- `CouponRedeemRequest`: `{ code: string }`
- `CouponRedeemResponse`: `{ accepted: boolean, message: string, discountPct?: number, promotionId?: string }`

Put types in `src/types/index.ts` and reuse across hooks and API.

## React Query

- Keys
  - Program: `['discounts', 'program']`
  - Promotions: `['discounts', 'promotions']`
- Invalidation
  - After coupon redeem: invalidate program and promotions if accepted

## API Endpoints (server)

- `GET /api/discounts/program` → `DiscountProgram`
- `GET /api/discounts/promotions` → `Promotion[]`
- `POST /api/discounts/redeem` → `CouponRedeemResponse`

If using server actions, mirror these with exported functions.

## UX Notes

- Empty promotions list shows a simple empty state.
- Show current discount prominently; format as percentage with locale.
- If next tier available, display progress hint (e.g., amount to reach next tier).
- Coupon field validates client-side (non-empty) and handles server error messages gracefully.

## Accessibility & i18n

- All labels via translation keys.
- Announce coupon results via toast and ARIA live region.

## Security & Permissions

- Ensure discounts belong to current user/organization.
- Log coupon redemption attempts with user id and timestamp.

## Open Questions

- Are promotions personalized or global?
- Should coupons affect cart immediately or only next purchase?
- Is there a tier history to display?

