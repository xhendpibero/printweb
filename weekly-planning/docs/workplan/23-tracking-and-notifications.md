# 23 — Tracking & Notifications

## Scope
Integrate shipment tracking updates and in-app/email notifications.

## Shipment Model
```json
{
  "orderId": "ord_123",
  "carrier": "dpd",
  "trackingNumber": "1234567890",
  "trackingUrl": "https://tracking.dpd.com/1234567890",
  "events": [
    { "code": "LABEL_CREATED", "at": "2025-09-14T10:00:00Z" },
    { "code": "IN_TRANSIT", "at": "2025-09-15T08:12:00Z" },
    { "code": "OUT_FOR_DELIVERY", "at": "2025-09-16T09:02:00Z" },
    { "code": "DELIVERED", "at": "2025-09-16T14:25:00Z" }
  ]
}
```

## Order Status Notifications
- `AWAITING_PAYMENT` (order confirmation)
- `PAID` (payment received)
- `IN_PRODUCTION`
- `SHIPPED` (includes tracking link)
- `DELIVERED`

## Channels
- Email (transactional templates)
- In-app notifications (bell + email archive)

## Cadence & Rules
- On state change, send immediate notification (debounced per order)
- Retry failed email deliveries up to 3 times

## Endpoints
- GET `/api/orders/:orderId/tracking`
- Webhook (future) `/api/integrations/carriers/:carrier/events`

## Acceptance Criteria (PM)
- Users receive timely updates and can view tracking in account

## Acceptance Criteria (Dev)
- Templates localized; URLs signed where appropriate
- Idempotent processing of duplicate events