# 15 — Pricing Rules & Anchors

## Scope
Blend admin-entered anchor prices (quantity → price) with rule modifiers for options and volume scaling.

## Anchors
Example:
```
30 → €196.69
50 → €237.56
100 → €302.58
```
Interpolation: monotonic curve fit between anchors (log-linear suggested). Extrapolation: capped slope beyond highest anchor.

## Modifiers
- Option surcharges (additive): paper, colors, finishings
- Volume scaling (multiplicative): brackets e.g., 1–99: 1.00x, 100–499: 0.96x, 500–1999: 0.92x, ≥2000: 0.88x
- Editorial/seasonal multipliers (optional)

## Worked Example
- Base at 100 copies: €302.58
- Options: soft-skin +€18.00; paper premium +€12.50
- Volume bracket for 100: 0.96x
- Result: `(302.58 + 18 + 12.5) * 0.96 = €317.11` (rounded 2dp)

## Admin UX
- CSV upload for anchors; inline editor with validation
- Preview graph and computed prices for common quantities

## Acceptance Criteria (PM)
- Admin can set anchors and see immediate impact on computed prices

## Acceptance Criteria (Dev)
- Anchors strictly increasing quantities; validation errors on bad input
- Unit tests for interpolation/extrapolation and modifier stacking