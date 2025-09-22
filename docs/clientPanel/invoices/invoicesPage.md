# Invoices Page

Goal: Specify routing, UX, data, and API for the client Invoices section, including time filtering, bulk period downloads, and electronic-invoice consent.

## Route & Files

- List: `src/app/[locale]/(panel)/invoices/page.tsx`
- Components:
  - `src/components/invoices/InvoicesFilters.tsx`
  - `src/components/invoices/InvoicesList.tsx`
  - `src/components/invoices/InvoiceRow.tsx`
  - `src/components/invoices/InvoicesDownloadPanel.tsx`
  - `src/components/invoices/EInvoiceConsent.tsx`
- Hooks:
  - `src/hooks/invoices/useInvoices.ts`
  - `src/hooks/invoices/useInvoiceDownload.ts`
  - `src/hooks/invoices/useEInvoiceConsent.ts`
- API client: `src/lib/api/invoices.ts`

## Filters & Query Params

- `dateFrom`, `dateTo` (ISO) or `period=any|last30|thisMonth|lastMonth|custom`
- `q` (search by invoice number or order number)
- `page`, `pageSize`

Reflect filter state to URL. Debounce search by 300ms.

## Data Contracts

- `Invoice`:
  - `id`, `number`, `issueDate`, `dueDate?`, `orderNumber?`
  - `grossTotal`, `netTotal`, `currency`, `status` (`paid|unpaid|overdue|canceled`)
  - `downloadUrl` (PDF), `xmlUrl?` (if e-invoice format available)
- `InvoiceFilters`: aligns with query params
- `Paged<T>`: `items`, `page`, `pageSize`, `total`
- `PeriodDownloadRequest`: `{ month: number (1-12), year: number }`
- `EInvoiceConsent`: `{ enabled: boolean, updatedAt: string }`

Types reside in `src/types/index.ts` and are reused by hooks and API.

## Interactions

- Empty state when no invoices match selection.
- Each invoice row displays: number, issue date, related order, status badge, totals, and a Download action.
- Download panel: select `month` and `year`, then `Download` to fetch a combined ZIP/PDF for that period.
- E-invoice section: toggle consent with confirmation; show current state and last update timestamp.

## React Query

- Keys
  - List: `['invoices', filters]`
  - Consent: `['invoices', 'consent']`
- Invalidation
  - After toggling consent: invalidate `['invoices', 'consent']`

## API Endpoints (server)

- `GET /api/invoices` → list with filters/pagination
- `GET /api/invoices/:id` → returns metadata and signed URLs (if needed)
- `GET /api/invoices/:id/download` → returns PDF file stream
- `POST /api/invoices/download-period` → body `PeriodDownloadRequest`; returns file stream (zip/pdf)
- `GET /api/invoices/consent` → `EInvoiceConsent`
- `POST /api/invoices/consent` → `{ enabled: boolean }`

If using server actions, mirror these via exported actions and return `Blob`/`Response` for downloads.

## Accessibility & i18n

- All strings via translation keys.
- Download buttons have clear labels and `aria-busy` when pending.
- Toggle includes accessible name and state announcements.

## Error/Loading States

- Skeleton rows for invoice list.
- Inline error with retry for list fetch.
- For downloads, show progress state and toast on failure.

## Security & Compliance

- Ensure authorization on all endpoints; invoices must belong to current user/organization.
- Generate short-lived signed URLs if files are stored externally.
- Log consent changes with user id and timestamp.

## Open Questions

- Should period download include credit notes?
- Do we support multiple formats (PDF+XML) per invoice in UI?
- Permissions for organization members to see company-wide invoices?

