# 02 — Search API Endpoint

## Scope
Implement `/api/catalog/search` with combined single-select filters and text `q`.

## Request
Query params (all optional)
- `product`, `enhancement`, `substrate`, `collection`, `industry`: taxonomy slugs
- `q`: free text
- `locale`: default `en`
- `limit`: default 24, max 60
- `offset`: default 0, max 240

## Response 200
```json
{
  "items": [
    {
      "slug": "raised-spot-gloss-flyers",
      "title": "Raised Spot Gloss Flyers",
      "excerpt": "Short description...",
      "image": "/media/.../thumb.jpg",
      "productType": "flyers",
      "badges": ["bestseller", "eco"],
      "score": 0.84
    }
  ],
  "total": 123
}
```

## Behavior
- Validate each filter via taxonomy; else 400 `INVALID_FILTER_VALUE`
- Combine filters conjunctively (AND)
- Rank by blended scoring (see item 03), then paginate
- Cache by normalized filter key: `{locale|q|product|enhancement|substrate|collection|industry|limit|offset}` for 5 minutes; bust on product updates

## Errors
- 400 `INVALID_FILTER_VALUE`
- 400 `INVALID_PAGINATION`

## Tasks
- Define query schema and validator
- Integrate ranking function
- Implement caching and cache key normalization
- Add integration tests (no price in payload)

## Acceptance Criteria (PM)
- Filters and text search work together; no multi-select within a group
- First page looks relevant with badge-boosted items
- No pricing on cards

## Acceptance Criteria (Dev)
- 100% schema validation coverage
- Deterministic cache keying; cache metrics emitted
- P95 latency < 150ms (cache warm)