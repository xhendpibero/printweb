# Settings — Marketing Consent

Goal: Specify routing, UX, data, and API for capturing and managing the user’s marketing communication consents (e.g., email and phone), with auditability and clear copy.

## Route & Files

- Page: `src/app/[locale]/(panel)/settings/marketing/page.tsx`
- Components:
  - `src/components/settings/MarketingConsentForm.tsx`
- Hooks:
  - `src/hooks/settings/useMarketingConsent.ts`
  - `src/hooks/settings/useUpdateMarketingConsent.ts`
- API client: `src/lib/api/settings.ts` (marketing endpoints)

## Form Fields

- consentEmail: boolean checkbox
- consentPhone: boolean checkbox
- Introductory blurb with data controller info and purpose

Buttons: Save

## Data Contracts

- `MarketingConsent`:
  - `email: boolean`, `phone: boolean`
  - `updatedAt: string`, `updatedBy: string` (server-filled)
- `UpdateMarketingConsentPayload`: `{ email?: boolean; phone?: boolean }`

Types in `src/types/index.ts`.

## React Query

- Key: `['settings', 'marketing']`
- On success, refetch the same key and show toast

## API Endpoints (server)

- `GET /api/settings/marketing` → `MarketingConsent`
- `POST /api/settings/marketing` → `MarketingConsent`

## UX Notes

- If no phone on file, disable phone checkbox with hint.
- Keep copy clear about purpose and revocation options.
- Persist Save disabled until dirty; show last updated timestamp.

## Accessibility & i18n

- All strings via translation keys.
- Checkboxes have proper labels and descriptions.

## Compliance & Security

- Record consent history (who, when, what changed) for audit.
- Ensure explicit opt-in; no pre-checked boxes.

