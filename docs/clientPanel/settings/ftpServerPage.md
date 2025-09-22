# Settings — FTP Server

Goal: Specify routing, UX, data, and API for showing per-user FTP/SFTP connection details.

## Route & Files

- Page: `src/app/[locale]/(panel)/settings/ftp/page.tsx`
- Components:
  - `src/components/settings/FtpDetails.tsx`
  - `src/components/settings/CopyToClipboard.tsx` (reuse)
- Hooks:
  - `src/hooks/settings/useFtpDetails.ts`
- API client: `src/lib/api/settings.ts` (ftp endpoint)

## Page Structure

- Section title: FTP server
- Fields displayed:
  - host (e.g., `ftp.example.com`)
  - protocol (`SFTP` preferred; show FTP if that’s what’s provided)
  - port (default 22 for SFTP, 21 for FTP)
  - login (usually the account email or username)
  - password hint: "same as your account password" or show app-specific password if enabled
  - passive mode hint for FTP (if applicable)
- Provide copy buttons for host, port, login.
- Optional: Quick config snippets for common clients (lftp, FileZilla).

## Data Contracts

- `FtpDetails`:
  - `host: string`
  - `protocol: 'sftp' | 'ftp'`
  - `port: number`
  - `login: string`
  - `passwordHint?: string` (do not expose real password)
  - `notes?: string[]`

Types in `src/types/index.ts`.

## React Query

- Key: `['settings', 'ftp']`

## API Endpoint (server)

- `GET /api/settings/ftp` → `FtpDetails`

## Security Notes

- Never return plaintext passwords.
- Prefer SFTP; note deprecation of plain FTP if applicable.
- If app passwords are supported, provide a link to manage them.

## Accessibility & i18n

- All labels via translation keys.
- Copy buttons announce copied values.

