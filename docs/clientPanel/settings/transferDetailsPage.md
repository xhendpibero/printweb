# Settings — Transfer Details

Goal: Specify routing, UX, data, and API for presenting bank transfer information specific to the customer, including per-currency account numbers, recipient details, and guidance.

## Route & Files

- Page: `src/app/[locale]/(panel)/settings/transfer/page.tsx`
- Components:
  - `src/components/settings/TransferDetails.tsx`
  - `src/components/settings/CopyToClipboard.tsx` (reusable)
- Hooks:
  - `src/hooks/settings/useTransferDetails.ts`
- API client: `src/lib/api/settings.ts` (transfer endpoint)

## Page Structure

- SWIFT/BIC code prominently displayed
- Section: "Your individual bank account number" with a list by currency
- Section: Recipient details (company name, address, country)
- Section: Transfer title hint (e.g., "include payment number")
- Info callout with reminders about processing time and alternative payment methods
- Copy buttons for BIC and each account number

## Data Contracts

- `TransferDetails`:
  - `bic`: string
  - `accounts`: Array<{ `currency`: string; `ibanOrNumber`: string }>
  - `recipient`: { `name`: string; `addressLines`: string[]; `country`: string }
  - `transferTitleHint`: string

Types stored in `src/types/index.ts`.

## React Query

- Key: `['settings', 'transfer']`
- Prefetch in settings layout (optional) to reduce shimmer

## API Endpoint (server)

- `GET /api/settings/transfer` → `TransferDetails`

## UX Notes

- Use monospaced font for account numbers; allow quick copy.
- If multiple currencies available, sort by user’s preferred currency first.
- Consider masking with reveal for public kiosks (optional).

## Accessibility & i18n

- All strings and labels via translation keys.
- Ensure copy buttons have accessible names and announce copied state.

