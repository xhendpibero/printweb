# 27 — i18n: Locales, Hreflang, Canonicals

## Scope
Implement `/en`, `/es`, `/pl` locale routing, hreflang, and canonical tags.

## Routing
- Prefix routes with locale: `/en/...`, default to `/en`
- 301 redirect naked paths to default locale
- Preserve query params on locale switch

## Tags
Example head tags for `/en/search?product=flyers`:
```html
<link rel="canonical" href="https://example.com/en/search?product=flyers" />
<link rel="alternate" hreflang="en" href="https://example.com/en/search?product=flyers" />
<link rel="alternate" hreflang="es" href="https://example.com/es/search?product=flyers" />
<link rel="alternate" hreflang="pl" href="https://example.com/pl/search?product=flyers" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/search?product=flyers" />
```

## Pitfalls
- Avoid duplicate content by ensuring canonical points to locale URL
- Keep slugs consistent across locales; translate labels only

## Acceptance Criteria (PM)
- Search and product pages emit correct hreflang/canonical sets

## Acceptance Criteria (Dev)
- Snapshot tests for head tags per locale
- Locale switcher preserves filters