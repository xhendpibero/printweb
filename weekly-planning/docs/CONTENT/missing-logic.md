# Missing Logic and Open Questions

## CMS and Content Blocks
- Define exact schema for content blocks (hero, richText, list, imageText, downloads)
- Decide on markdown vs structured JSON for rich text
- Media handling: CDN, optimization, caching headers

## Navigation
- Source of truth for tabs/sidebar structure (CMS vs code)
- Localized labels and URL aliases
- Handling separators and dropdowns in sidebar

## SEO
- Canonical/hreflang rules per locale
- OpenGraph/Twitter cards for content pages
- Sitemaps and indexability rules

## Forms
- Contact form fields, validation, spam protection (hCaptcha/Cloudflare Turnstile)
- Email routing and CRM integration
- Success/error pages and rate limiting

## Legal Pages
- Versioning and effective dates
- PDF attachments and print view

## Performance
- Static generation vs ISR vs SSR per section
- Client-side navigation and prefetch strategy

## Analytics
- Pageview, scroll depth, link click tracking
- Download click tracking for PDFs/templates