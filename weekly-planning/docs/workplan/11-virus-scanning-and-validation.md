# 11 — Virus Scanning & Validation

## Scope
Integrate antivirus scanning and file validation into upload flow.

## Endpoints
- POST `/api/uploads/init`
  - Body: `{ filename, contentType, sizeBytes, orderId }`
  - Response: `{ uploadId, presigned: { url, method, headers }, maxSizeBytes }`
- POST `/api/uploads/finalize`
  - Body: `{ uploadId }` → triggers scan job
  - Response: `{ uploadId, status: "SCANNING" }`
- GET `/api/uploads/:uploadId`
  - Response: `{ status: "READY"|"SCANNING"|"QUARANTINED"|"FAILED", details? }`

## Validation & Scanning Flow
1. Init validates type/size via allowlist and limits
2. Client uploads directly to storage via presigned URL
3. Finalize enqueues scan job (ClamAV or equivalent)
4. Scanner reads object, validates magic bytes, runs AV scan
5. Result persisted to DB/metadata; READY → usable, QUARANTINED → blocked

## Security
- Validate MIME by magic bytes, not extension
- Presigned URL expires in ≤ 10 minutes
- Restrict ACL to private; downloads authorized per user/order
- Rate-limit init/finalize endpoints

## Error Codes
- `FILE_TOO_LARGE`, `UNSUPPORTED_TYPE`, `UPLOAD_EXPIRED`, `SCAN_FAILED`, `VIRUS_DETECTED`

## Observability
- Emit metrics: scan duration, fail rate, quarantine count
- Log uploadId ↔ orderId correlation id

## Tasks
- Implement init/finalize/status endpoints
- Wire S3 client and queue/worker for AV
- Add retry/backoff for scan failures

## Acceptance Criteria (PM)
- Infected files never attach to orders; users see clear messages
- Clean files progress without manual intervention

## Acceptance Criteria (Dev)
- End-to-end test covers happy path + virus detection
- P95 scan completion < 60s; retries capped; audit logs present