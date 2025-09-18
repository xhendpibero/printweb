# 09 — Lead Time & Cutoff

## Scope
Configurable lead times with weekday/weekend behavior; daily cutoff 16:00; payment window 27 hours.

## Business Rules
- Orders placed on weekends are processed next business day
- Daily cutoff at 16:00 local time
- If checkout at 13:00, cutoff is same-day 16:00; otherwise next business cutoff
- Payment must be received within 27 hours; otherwise order may be cancelled
- Holidays: configurable calendar; use next business day when crossing holidays

## Computation
Inputs: `now`, `timezone`, `leadDays`, `holidayCalendar`
Algorithm:
1. Determine `cutoffToday` = today at 16:00
2. If `now <= cutoffToday`, same-day cutoff; else next business day cutoff at 16:00
3. Add `leadDays` business days to compute ETA date
4. If payment pending > 27h past checkout, mark `AWAITING_PAYMENT_EXPIRED`

## API Fields
- In product `runs`: `eta`, `cutoffNote`
- In order: `paymentDueAt`, `estimatedShipDate`

## Examples
- Fri 15:30 checkout, lead 2 days → cutoff Fri 16:00; ETA Tue (skips weekend)
- Fri 17:10 checkout, lead 2 days → cutoff Mon 16:00; ETA Wed

## Tasks
- Business calendar utility with holidays
- Cutoff/ETA calculator with tests
- Display strings in product/cart/checkout

## Acceptance Criteria (PM)
- Messages are accurate and consistent across pages

## Acceptance Criteria (Dev)
- Algorithm unit-tested with weekend/holiday cases