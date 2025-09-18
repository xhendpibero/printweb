# 29 — SEO: Sitemaps & Indexing

## Scope
Sitemap strategy and indexing limits for catalog and content pages.

## Structure
- `/sitemap.xml` (index) → links to locale sitemaps
- `/sitemap-en.xml`, `/sitemap-es.xml`, `/sitemap-pl.xml`
- Include: homepage, search (with limited representative URLs), product detail pages, blog posts

## Limits
- Max 50,000 URLs per sitemap; chunk product pages if needed
- Update frequency: daily for dynamic (products), weekly for content

## Exclusions
- Cart, checkout, account routes
- Duplicate filter combinations (keep representative search URLs only)

## Acceptance Criteria (PM)
- Search Console accepts sitemaps; key pages indexed

## Acceptance Criteria (Dev)
- Valid XML, correct `lastmod`, size under limits; automated generation pipeline