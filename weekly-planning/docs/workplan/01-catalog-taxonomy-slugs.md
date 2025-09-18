# 01 — Catalog Taxonomy & Slugs

## Scope
Define canonical taxonomy values and slugs for product types, enhancements, substrates, collections, and industries. Provide JSON contracts for frontend and API.

## Deliverables
- Canonical list with `slug` + `label` per taxonomy (JSON seeds)
- Validation rules and error codes for `/api/catalog/search`
- Sync job or CMS export guidance

## Data Model
```json
{
  "productTypes": [ { "slug": "flyers", "label": "Flyers" } ],
  "enhancements": [ { "slug": "gold-foiling", "label": "Gold Foiling" } ],
  "substrates": [ { "slug": "coated-paper", "label": "Coated paper" } ],
  "collections": [ { "slug": "eco", "label": "Eco" }, { "slug": "new", "label": "New" }, { "slug": "bestseller", "label": "Bestseller" } ],
  "industries": [ { "slug": "office", "label": "For Office" } ]
}
```

## JSON Seeds (proposed paths)
- `docs/taxonomy/productTypes.json`
- `docs/taxonomy/enhancements.json`
- `docs/taxonomy/substrates.json`
- `docs/taxonomy/collections.json`
- `docs/taxonomy/industries.json`

## API Contract: GET /api/catalog/taxonomy
Response 200
```json
{
  "productTypes": [ { "slug": "flyers", "label": "Flyers" } ],
  "enhancements": [ { "slug": "gold-foiling", "label": "Gold Foiling" } ],
  "substrates": [ { "slug": "coated-paper", "label": "Coated paper" } ],
  "collections": [ { "slug": "eco", "label": "Eco" }, { "slug": "new", "label": "New" }, { "slug": "bestseller", "label": "Bestseller" } ],
  "industries": [ { "slug": "office", "label": "For Office" } ]
}
```

## Validation Rules for Search Params
- Each of `product|enhancement|substrate|collection|industry` must be a valid slug from taxonomy
- Only a single value per key
- Unknown values → 400 with code `INVALID_FILTER_VALUE`

Error example
```json
{
  "error": {
    "code": "INVALID_FILTER_VALUE",
    "message": "Unknown collection: premium",
    "details": { "param": "collection", "value": "premium" }
  }
}
```

## Tasks
- Finalize canonical lists based on `docs/CATALOG-PRODUCT-LOGIC.md`
- Generate JSON seeds and wire a loader utility
- Implement `/api/catalog/taxonomy`
- Implement validation helper for search endpoint

## Acceptance Criteria (PM)
- Frontend filters render from taxonomy endpoint
- Invalid slugs are rejected with actionable errors
- JSON seeds exist and are versioned

## Acceptance Criteria (Dev)
- Strong typing for taxonomy structures
- Unit tests cover validation helper with valid/invalid inputs
- Endpoint returns within < 50ms (cached)