# 28 — Analytics: GA4 & Consent

## Scope
Define tracking plan with GA4, server events, and consent management.

## Event Schema (examples)
- `search_performed` { q, filters, results, locale }
- `product_viewed` { slug, badges, locale }
- `config_changed` { slug, field, from, to }
- `price_computed` { slug, quantity, net, currency }
- `cart_updated` { itemsCount, subtotal }
- `checkout_started` { itemsCount, subtotal }
- `order_placed` { orderId, net, currency, itemsCount }

## Consent States
- `necessary`, `analytics`, `marketing`
- Banner defaults: `necessary=true`, others off until opt-in
- Store consent with timestamp and version

## Server Events
- Mirror key events server-side for reliability (order_placed, price_computed)
- Include consent state when applicable

## Acceptance Criteria (PM)
- Events visible in GA4 with clean naming and properties

## Acceptance Criteria (Dev)
- Consent respected (no analytics until opt-in)
- Event dispatch retried on transient failures