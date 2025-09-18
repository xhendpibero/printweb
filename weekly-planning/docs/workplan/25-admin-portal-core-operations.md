# 25 — Admin Portal: Core Operations

## Scope
Admin capabilities: manual order edits/overrides, refunds, reprints, and bulk ops.

## RBAC Roles (MVP)
- Admin: full access
- Support: order edits, refunds (with limits), reprints
- Production: update production/shipping statuses

## Operations
- Order edit: address changes before production; line adjustments with audit
- Refunds: bank transfer refunds recorded with amount, reason, reference
- Reprints: create child order linked to original; zero-priced internal item
- Bulk ops: CSV export of orders; status updates in batch (guarded)

## Safety Checks
- Price/quantity edits after `PAID` require approval (dual control optional)
- Immutable fields after `IN_PRODUCTION`

## Audit
- Every admin action logged with user, timestamp, before/after diff

## Endpoints
- Admin REST under `/api/admin/*` with role enforcement

## Acceptance Criteria (PM)
- Common support tasks achievable without engineering

## Acceptance Criteria (Dev)
- RBAC middleware tested; audit logs immutable and queryable