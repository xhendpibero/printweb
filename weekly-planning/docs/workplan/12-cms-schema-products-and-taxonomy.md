# 12 — CMS Schema: Products & Taxonomy

## Scope
Define CMS content models for products, options, pricing rules, and taxonomy references.

## Content Models
- Product
  - `slug` (unique), `status`, `title` (localized), `excerpt` (localized)
  - Media: gallery (assets)
  - Options: relations to OptionGroup, Color, Finishing, Paper
  - Pricing: anchors, rules, currency
  - Logistics: leadTimes, cutoffPolicy
  - FileSpec: format, dpi, colors, gross/net format, bleed (localized notes)
  - Badges: `eco|bestseller|new` (booleans)
- Taxonomy (per type)
  - `slug`, `label` (localized), `type` in {productType, enhancement, substrate, collection, industry}
- OptionGroup / Option
  - Group: `label` (localized), `key` in {formats, papers, colors, finishings}
  - Option: `id`, `label` (localized), `active`, `stock` (optional), `metadata`
- PricingRule
  - `id`, `when` (JSON), `action` (JSON), `priority`
- AnchorTable
  - Rows: `{ quantity, netPrice }[]`, `currency`

## Relations
- Product ↔ Taxonomy (many-to-many for types/collections/industries)
- Product ↔ OptionGroup (1-to-many)
- Product ↔ PricingRule, AnchorTable (1-to-many / 1-to-1)

## Sample Query (GraphQL-like)
```graphql
query Product($slug: String!, $locale: String!) {
  product(slug: $slug, locale: $locale) {
    slug
    title
    badges { eco bestseller new }
    gallery { url alt }
    options { groups { key label options { id label active stock } } }
    pricing { anchors { quantity netPrice currency } rules { id when action priority } }
    logistics { leadDays cutoffHour timezone }
    fileSpec { format resolutionDpi colors grossFormat netFormat bleed note }
  }
}
```

## Publishing & Versioning
- On publish, increment `priceVersion` if pricing changed
- Emit webhook for cache busting

## Acceptance Criteria (PM)
- Editors can create products with full options and badges
- Localized titles/excerpts visible in preview

## Acceptance Criteria (Dev)
- Model validations prevent bad data (duplicate IDs, unsorted tiers)
- API returns localized fields with EN fallback