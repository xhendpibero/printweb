# Pricing Engine, Product Creation (CMS), and Cart/Checkout Logic

This document defines how products are created and priced (per configuration), how seller and buyer sides interact, and how cart/checkout persists with validations for price/stock changes.

## 1. Product Creation in CMS

Each product must define:
- Identity: `slug`, `title`, `productType`, `status`
- Media: gallery images
- Options:
  - Formats (id, label, size)
  - Papers grouped (group label → options with id/label)
  - Colors (id, label)
  - Finishings (group title → sides [front/both] + options with id/label)
- Pricing Model:
  - `basePrice` (optional)
  - `rules`: list of conditional price modifiers (additive or multiplier)
  - `quantityTiers`: predefined quantities and computed prices
  - `surcharges`: e.g., finishing or paper surcharges
  - `currency`
- File Specifications: format, dpi, colors, gross/net format, bleed
- Logistics: production lead times, cutoffs, shipping options

Suggested CMS entities:
- `products` with embedded `options`, `pricingRules`, `fileSpec`
- Reference tables for enums: `productTypes`, `enhancements`, `substrates`, `collections`, `industries`

## 2. Pricing Engine (Per-Configuration)

Given `{ slug, configuration, quantity }` compute net price and tiers.

### 2.1 Configuration Schema
```
configuration = {
  format: string,      // e.g., "a4"
  paper: string,       // e.g., "matte-300"
  colors: string,      // e.g., "4-4"
  finishings: string[],// e.g., ["soft-skin-foil", "spot-3d-uv"]
}
```

### 2.2 Rule Types
- Conditional adds: `+ x` when conditions match
- Conditional multiplies: `* x` (e.g., 1.2 for 20%)
- Tier base: different base per quantity bucket

Example rule JSON:
```json
{
  "id": "paper-matte-300",
  "when": { "paper": "matte-300" },
  "action": { "type": "add", "amount": 12.5 }
}
```

### 2.3 Price Versioning
- Each product has `priceVersion` (monotonic)
- Pricing response includes `priceVersion`
- Cart items store `priceVersion` + `configFingerprint`
- On checkout, server validates versions and recomputes if drifted

### 2.4 Output
```json
{
  "currency": "EUR",
  "printingCostNet": 71.79,
  "deliveryCostNet": 4.85,
  "priceVersion": 42,
  "runs": [ { "quantity": 1000, "netPrice": 71.79, "unitPrice": 0.072 } ]
}
```

## 3. Seller vs Buyer Logic

- Seller side defines:
  - Option dictionaries and constraints
  - Pricing rules and tiers
  - Lead times and shipping matrices
  - Stock/availability for variants (optional for print-on-demand)
- Buyer side UI:
  - Enforces allowed options
  - Shows price updates per configuration
  - Displays lead time and cutoff notes

## 4. Cart & Checkout Persistence

- Cart item fields:
  - `productId`, `name`, `quantity`, `price` (locked at add time)
  - `configuration` (saved), `thumbnail`
  - `priceVersion`, `configFingerprint`
- Persistence layer: local (Zustand persist) + server session for logged-in users
- Revalidation events:
  - On page load
  - On checkout start
  - Before payment intent creation
- Server should re-price items and ensure availability; if changed, return actionable deltas

### 4.1 Revalidation Response (example)
```json
{
  "items": [
    {
      "itemId": "abc123",
      "ok": false,
      "newPrice": 76.64,
      "newPriceVersion": 43,
      "reason": "PRICE_CHANGED"
    }
  ],
  "totals": { "net": 120.50, "currency": "EUR" }
}
```

## 5. API Endpoints Summary

- `GET /api/catalog/search` → results per filters
- `GET /api/catalog/products/:slug` → product detail + options + tiers
- `POST /api/catalog/price` → price for configuration/quantity
- `POST /api/cart/validate` → validate items (priceVersion/stock)
- `POST /api/checkout/session` → create payment intent after validation

## 6. Frontend Mock Integration

- Pricing engine mock to simulate rule evaluation (see code)
- Cart store extended to store `priceVersion` and `configFingerprint`
- Product page uses mock to show tiered pricing and totals

## 7. Stock Handling (optional)

- If stock tracked (e.g., limited materials): product detail returns `availability` map
- Cart validation fails with `OUT_OF_STOCK` and suggests alternatives (quantities or dates)

## 8. Audit & Observability

- Log price requests with anonymized configuration hashes
- Track version mismatches and user adjustments
- Metrics: price recompute latency, revalidation change rate