# 06 — Product Detail Endpoint

## Scope
Implement `GET /api/catalog/products/:slug` returning product, options, tiers, file specs, and breadcrumbs.

## Request
- Path: `/api/catalog/products/:slug`
- Query: `locale` (default `en`)

## Response 200
```json
{
  "slug": "raised-spot-gloss-flyers",
  "title": "Raised Spot Gloss Flyers",
  "breadcrumbs": [
    { "label": "Chroma", "href": "/en" },
    { "label": "Flyers", "href": "/en/search?product=flyers" },
    { "label": "Raised Spot Gloss Flyers" }
  ],
  "images": [ { "src": "/media/.../1.jpg", "alt": "Slide 1" } ],
  "formats": [ { "id": "a4", "label": "A4", "size": "210 x 297 mm" } ],
  "papers": [
    {
      "label": "Standard matte",
      "options": [ { "id": "matte-170", "label": "matte 170g" } ]
    }
  ],
  "colors": [ { "id": "4-4", "label": "color - both sides (4/4)" } ],
  "finishings": [
    { "title": "Surface finishings", "sides": ["front", "both"], "options": [ { "id": "soft-skin-foil", "label": "Soft Skin foil" } ] }
  ],
  "filePreparationNote": "I will upload ready file ...",
  "runs": [ { "quantity": 1000, "netPrice": 71.79, "unitPrice": 0.072, "eta": "Thu (09/18)", "cutoffNote": "Order today until 16:00" } ],
  "currency": "EUR",
  "printingCostNet": 71.79,
  "deliveryCostNet": 4.85,
  "fileSpec": {
    "format": "pdf",
    "resolutionDpi": 300,
    "colors": "color - both sides (4/4) CMYK",
    "grossFormat": "77 × 108 mm",
    "grossNote": "format with bleed added",
    "netFormat": "74 × 105 mm",
    "netNote": "the design's final size",
    "bleed": "1.5 mm"
  },
  "priceVersion": 42
}
```

## Localization
- Localize `title`, `breadcrumbs.label`, option labels, and `filePreparationNote`
- Fallback: if `locale` missing, return EN

## Caching
- Cache per `{slug|locale}` for 10 minutes; bust on product publish or pricing change
- Precompute and embed `runs` for fast render

## Errors
- 404 `PRODUCT_NOT_FOUND`
- 410 `PRODUCT_INACTIVE`

## Tasks
- Implement controller and service integrating CMS + pricing
- Add i18n wrappers with fallback
- Write integration tests (404/410)

## Acceptance Criteria (PM)
- Page renders with precomputed runs and correct locale
- Inactive products do not appear and return 410

## Acceptance Criteria (Dev)
- Contract matches docs, strong typing present
- Cache hits measurable; P95 < 150ms (cache warm)