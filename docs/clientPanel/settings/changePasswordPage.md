# Settings — Change Your Password

Goal: Specify routing, UX, validation, and API for changing the authenticated user’s password, including strength meter and secure interactions.

## Route & Files

- Page: `src/app/[locale]/(panel)/settings/password/page.tsx`
- Components:
  - `src/components/settings/ChangePasswordForm.tsx`
  - `src/components/settings/PasswordStrength.tsx` (optional)
- Hooks:
  - `src/hooks/settings/useChangePassword.ts`
- API client: `src/lib/api/settings.ts` (password endpoint)

## Form Fields

- currentPassword (required, masked with visibility toggle)
- newPassword (required, strength meter)
- repeatNewPassword (required, must match)

Submit button: Change password

## Validation

- Zod schema:
  - currentPassword: non-empty
  - newPassword: min length 8–12, include at least 3 of 4 categories (upper, lower, number, symbol)
  - repeatNewPassword equals newPassword
  - newPassword must differ from currentPassword

## Data Contracts

- `ChangePasswordPayload`: `{ currentPassword: string, newPassword: string }`
- `ChangePasswordResponse`: `{ success: boolean }`

## React Query

- Mutation key: `['settings', 'password', 'change']`
- On success: toast confirmation; optionally invalidate `['me']`

## API Endpoints (server)

- `POST /api/settings/password` → expects `ChangePasswordPayload`; returns success
- Server verifies current password, applies rate limiting, rotates sessions on success

## UX Notes

- Show password visibility toggles with `aria-pressed` state.
- Display strength meter for new password.
- After success, clear inputs and optionally sign the user out of other sessions.

## Accessibility & i18n

- All strings via translation keys.
- Associate errors to inputs; announce success via toast and ARIA live region.

## Security

- CSRF protection and secure transport only.
- Do not log plaintext passwords.
- Invalidate/rotate session tokens on change.

