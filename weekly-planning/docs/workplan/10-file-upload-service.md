# 10 — File Upload Service

## Scope
MVP upload/download without preview; safe limits and validation.

## Allowed Formats & Limits
- Formats: PDF, AI, PSD, TIF, JPG, PNG
- Max size: 500 MB (configurable)
- Max pages: PDF up to 500 pages (configurable)

## Flow
1. Client requests upload URL → server returns presigned URL + required headers
2. Client uploads directly to storage (S3-compatible)
3. Server receives webhook or client finalizes → triggers antivirus scan
4. On success, file marked `READY`; else `QUARANTINED`

## Storage
- Bucket layout: `/orders/{orderId}/artwork/{uuid}`
- Retention: keep originals; lifecycle rules configurable

## Antivirus
- ClamAV daemon; scan results stored with file metadata
- Timeouts and retry policy documented

## Errors
- `FILE_TOO_LARGE`, `UNSUPPORTED_TYPE`, `SCAN_FAILED`, `VIRUS_DETECTED`

## Tasks
- Presigned upload endpoint and policy
- Scanner integration and status webhooks
- Download endpoint with authorization

## Acceptance Criteria (PM)
- Users can upload and download files reliably

## Acceptance Criteria (Dev)
- Error handling is explicit and user-friendly; audit logs present