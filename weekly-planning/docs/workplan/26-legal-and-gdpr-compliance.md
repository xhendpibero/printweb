# 26 — Legal & GDPR Compliance

## Scope
Implement privacy requests (export/delete), retention, consent logs.

## Data Subject Requests (DSR)
- Export: compile user profile, orders, invoices metadata, files references; deliver via time-bound download link
- Delete: soft-delete account, purge PII where legally allowed; retain invoices as required by law (anonymize linkages)
- Verify identity before fulfilling requests

## Endpoints
- POST `/api/privacy/requests` { type: `export|delete` }
- GET `/api/privacy/requests/:id` status
- Admin review queue for manual approval (MVP optional)

## Retention
- Define data classes and retention durations (orders, invoices, uploads, logs)
- Scheduled cleanup job with report

## Consent
- Capture consent for analytics/marketing with timestamp, version, locale
- Store proof-of-consent records per user/device

## Audit & Reporting
- Immutable logs of DSRs and outcomes
- Exportable CSV for compliance review

## Acceptance Criteria (PM)
- Users can request export/delete and see status updates

## Acceptance Criteria (Dev)
- Redaction routines tested; retention job dry-run mode and reporting