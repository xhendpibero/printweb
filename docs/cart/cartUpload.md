# Cart — File Upload

Goal: Specify routing, UX, data, and API for the file upload step. Some products offer a preparation choice: Upload ready file vs Create your own design. Default flow is Upload ready file.

## Route & Files

- Page: `src/app/[locale]/order/upload/page.tsx`
- Components:
  - `src/components/cart/upload/PreparationChoice.tsx`
  - `src/components/cart/upload/Uploader.tsx`
  - `src/components/cart/upload/ItemSidebar.tsx`
  - `src/components/cart/upload/UploadProgress.tsx`
  - `src/components/cart/upload/CloudPickers.tsx` (Google Drive, Dropbox)
- Hooks:
  - `src/hooks/cart/upload/useUpload.ts`
  - `src/hooks/cart/upload/useUploadList.ts`
- API client: `src/lib/api/uploads.ts`

## Stepper

- Step sequence: 1. Cart → 2. File upload → 3. Shipment → 4. Payment → 5. Summary

## Preparation Choice (optional per product)

- Title: "How would you like to prepare your project?"
- Options:
  - Upload ready file — instant upload of your finished design
  - Create your own design — opens editor route (out of scope here)
- If product doesn’t support the editor, skip this view and show Uploader directly.

## Uploader View

- For the selected cart item, show spec summary and the required page count.
- Display size hint: e.g., `Net size: 210 x 297 mm, Gross size: 216 x 303 mm`.
- Upload sources:
  - From hard drive (file picker / drag & drop)
  - Google Drive, Dropbox (optional; gated behind OAuth)
  - FTP (links to FTP instructions)
- Allowed formats badge: e.g., JPEG, TIFF, PDF
- Show "Pages uploaded: X/Y"
- Actions: `Skip file uploads` (continue without files)

## Data Contracts

- `UploadContext`:
  - `cartId`, `itemId`, `requiredPages: number`, `allowedMime: string[]`, `maxFileSizeMB: number`
- `UploadItem`:
  - `id`, `name`, `size`, `mime`, `pages?: number`, `status: queued|uploading|processing|done|error`, `progress: number (0-100)`, `previewUrl?`, `errorMessage?`
- `UploadSession`:
  - `context: UploadContext`, `items: UploadItem[]`

## React Query

- Keys
  - Upload list: `['order', 'upload', itemId]`
  - Presigned URL: `['order', 'upload', 'sign', fileHash]`
- Invalidation
  - After processing completes for all items, invalidate `['cart']` and proceed to Shipment step.

## API Endpoints (server)

- `POST /api/order/uploads/sign` → returns `{ url, fields }` for S3/GCS or direct upload
- `POST /api/order/uploads/complete` → notify server of uploaded file, start processing
- `GET /api/order/uploads/:uploadId/status` → poll for processing state
- `POST /api/order/cart/items/:id/skip-uploads` → mark item as skipped

## Upload Mechanics

- Use direct-to-storage uploads with presigned URLs; avoid proxying large files through app server.
- Display per-file progress, retries with exponential backoff, and cancel.
- Validate client-side: type, size; validate page count server-side during processing.

## UX Notes

- Drag & drop target with accessible instructions.
- Keep sidebar showing all cart items; selecting another item updates uploader context.
- Prevent navigation away while uploads in progress; confirm before leaving.

## Accessibility & i18n

- All strings via translation keys.
- Announce progress updates and completion via ARIA live region.

## Open Questions

- Do we allow mixed sources in one session (local + drive)?
- What’s the maximum total size and per-file limit?
- How do we handle multi-page PDFs vs multiple images mapping to pages?
