# Settings — Account Details

Goal: Specify routing, UX, data, and API for editing the user’s account profile and default billing details, including phone, address fields, and invoice/receipt language.

## Route & Files

- Page: `src/app/[locale]/(panel)/settings/account/page.tsx`
- Components:
  - `src/components/settings/AccountDetailsForm.tsx`
  - `src/components/settings/AccountCTA.tsx` (promo/education banner)
- Hooks:
  - `src/hooks/settings/useAccountDetails.ts`
  - `src/hooks/settings/useUpdateAccountDetails.ts`
- API client: `src/lib/api/settings.ts` (account endpoints)

## Form Fields

- firstName (required)
- lastName (required)
- phoneCountryCode (select)
- phoneNumber
- country (select with search)
- street
- buildingNumber
- apartmentNumber?
- postalCode (required)
- city (required)
- invoiceLanguage (select, e.g., `en`, `pl`, etc.)

Buttons: Cancel, Save

## Data Contracts

- `AccountDetails`:
  - `firstName`, `lastName`, `phoneCountryCode?`, `phoneNumber?`
  - `address`: `{ country, street?, buildingNumber?, apartmentNumber?, postalCode, city }`
  - `invoiceLanguage`: string (IETF or app-supported code)
- `UpdateAccountDetailsPayload`: partial of the above minus derived fields

Types in `src/types/index.ts`.

## Validation

- Zod schema with:
  - Required: firstName, lastName, postalCode, city
  - Country-specific postal validation (basic for MVP)
  - Phone optional but validated when present

## React Query

- Keys
  - `['settings', 'account']`
- Invalidation
  - After successful update, invalidate `['settings', 'account']` and `['me']`

## API Endpoints (server)

- `GET /api/settings/account` → `AccountDetails`
- `PUT /api/settings/account` → `AccountDetails` (updated)

## UX Notes

- Prefill form with current values and disable Save until dirty.
- Show phone country code as a separate control.
- Provide Cancel to reset to server state.
- Display an informational banner (CTA) below the form.

## Accessibility & i18n

- All labels and validation messages via translation keys.
- Proper labels, descriptions, and error associations.

## Security

- Server validates fields and enforces allowed countries.
- Audit log for changes to personal data (optional).

## Open Questions

- Is invoice language independent from UI language?
- Should address here sync with default invoice/shipping addresses pages?

