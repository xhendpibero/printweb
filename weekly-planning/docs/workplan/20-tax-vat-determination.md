# 20 — Tax & VAT Determination

## Scope
Determine VAT based on country and VAT ID; support net/gross displays.

## Rules
- Default VAT by ship-to country (MVP: PL/EU basics)
- If valid EU VAT ID (different country) → reverse charge where applicable
- B2C vs B2B handling based on presence/validation of VAT ID

## Validation
- Format checks per country
- VIES (or stub for MVP) for EU VAT validation

## Calculation
- Net → Gross: `gross = net * (1 + rate)`
- Cart totals show both when applicable; invoices follow legal format

## Examples
- PL B2C, rate 23%: net 100 → gross 123
- PL B2B with valid PL VAT: net 100 → gross 123
- PL seller → DE B2B with valid DE VAT: reverse charge → tax 0 on invoice

## Errors
- `INVALID_VAT_ID`, `VIES_UNAVAILABLE` (fallback to treat as invalid)

## Tasks
- VAT rules config and validator
- Totals calculator and invoice formatter
- UI fields for VAT ID with validation and messages

## Acceptance Criteria (PM)
- Taxes computed correctly for common EU scenarios
- Users see clear indication of net vs gross

## Acceptance Criteria (Dev)
- Unit tests for VAT cases; resilience when VIES down