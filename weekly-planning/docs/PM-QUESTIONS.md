# Product Manager Questions Checklist

A working list of decisions we need to finalize to complete the build. Please add answers inline.

## Catalog & Search
- Product taxonomy: confirm canonical list and slugs for product types, enhancements, substrates, collections, industries.
  - Answer: Use canonical slugs across product types, enhancements, substrates, collections, and industries. Search endpoint `/en/search?` accepts any combination of these as params; multiple categories can be combined simultaneously, one slug value per category.
- Are filters single-select only (as designed) or will any become multi-select?
  - Answer: Single-select per taxonomy group (one slug each), but users can filter across multiple groups at once (product type + enhancement + substrate + collection + industry).
- Search ranking: do we rank by price-from, popularity, or editorial weight? 
  - Answer: Blend score: primary scoring field per product + badge boosts (eco/bestseller/new). Ensure at least 2–4 "new" items surface on the first page when available.
- Result card fields: image policy (aspect ratio), badges (eco/bestseller), and price-from display rules.
  - Answer: Card image default 1:1. On hover, zoom/crop to 4:5 and reveal mini description below title. Show badges (eco/bestseller/new). Do not show price on search cards.

## Product Detail & Configurator
- Option constraints: any invalid combinations to block (e.g., certain foilings with certain papers)? Provide rules.
  - Answer: Enforce option constraints with revalidation on change. If a combination becomes inactive (`active=false`) or stock is 0 for any option, automatically unselect that option and prompt user to rechoose.
- Quantity tiers: global or per product? Fixed list or dynamic by lead time/material?
  - Answer: Per product. Admin-configurable activation; max quantity per product 100,000. Company accepts arbitrary requests where active. Clarify tiers later; treat as configurable list per product.
- Lead time/cutoff: per product or per plant? How are holidays handled?
  - Answer: Configurable (per product or global). Checkout on weekends processes next business day. Payment window is up to 27 hours, with daily cutoff at 16:00. If checkout at 13:00, cutoff is same-day 16:00; otherwise next business cutoff.
- File upload: size limits, allowed formats, virus scanning, preview rendering requirements.
  - Answer: Team to propose defaults. MVP: safe sensible limits (e.g., PDFs/images), antivirus scan, and basic validation; finalize in technical doc.
- 3D Upload preview: must-have for MVP or can be deferred?
  - Answer: Deferred. MVP supports upload and subsequent download only (no live preview).
- About/Specs content: will marketing own rich content blocks in CMS? Do we need per-locale variants?
  - Answer: Yes, CMS-owned. Per-locale with EN as default; new locales duplicate EN as seed.

## Pricing
- Pricing strategy: purely rules-based or blend of rules + table lookups?
  - Answer: Blend rules + table lookups. Support admin-entered anchor prices per quantity (e.g., 1,000 → €1,075.30) and modifiers per customization (colors/finishing/paper). Apply percentage adjustments by quantity scale (volume discounts/surcharges). Unit/copy examples provided.
- Currency handling: single currency per market or multi-currency support with FX updates?
  - Answer: EUR primary. Checkout may adjust later; design for future multi-currency.
- Delivery pricing: flat per order, per product, or carrier-rate based? Any free thresholds?
  - Answer: Flat for MVP, configurable later. Options: express (€50), standard (€30), economy (€20). Shown under shipping + print run selection.
- Price versioning cadence: how often do price changes occur? Required user messaging if price changes in cart?
  - Answer: Price computed fresh on product detail, cart load, and before checkout. Version increments after any checkout-created deal price is locked. Cart revalidates and informs user if price changes before payment.

## Cart & Checkout
- Guest checkout allowed? What customer data is mandatory at each step?
  - Answer: Guest checkout not allowed. Login required. Mandatory: profile data (to be defined), billing/shipping address, and payment method details.
- Payment methods for MVP (Stripe cards, BLIK, PayU, bank transfer)? Any deferrals?
  - Answer: MVP uses bank transfer only. Later, multiple methods will be added.
- Tax/VAT handling: how determined (country, VAT ID)? Display net vs gross preferences.
  - Answer: Yes, to be implemented; determine by country and VAT ID. Net/gross display to be supported.
- Revalidation rules: exactly when to re-price and re-check availability; user flow if something changes.
  - Answer: Revalidate on page load, cart open, checkout start, and pre-payment. Validate price version, availability, and configuration; if changed, prompt user to accept updates or adjust.
- Promotions/discounts: codes, product-level vs cart-level, stacking rules.
  - Answer: Simple discount codes for MVP, applied to total cart. No stacking.

## Shipping & Fulfillment
- Carriers for MVP (DPD, InPost, UPS, others)? Shipping zones and restrictions.
  - Answer: Poland-only for MVP; carriers may include DPD/InPost/UPS later.
- Smart shipping rules: do we split shipments by product constraints? Who defines grouping heuristics?
  - Answer: Single address per checkout for MVP. Users can manage multiple addresses in profile settings.
- Tracking integrations and notification cadence.
  - Answer: Yes, provide tracking and update notifications within the system.

## Accounts & Admin
- Account features for MVP: order history, invoices, saved configurations, address book.
  - Answer: Yes to all.
- Admin needs: manual order edit/override, refunds, reprints, bulk operations.
  - Answer: Yes to all.
- SLA targets for support and escalations.
  - Answer: Yes (to be detailed separately).

## Content (Company/Info)
- Source of truth: CMS will manage pages and nav? Any static exceptions?
  - Answer: CMS manages products and checkout-related content, plus blog posts in a single table. Frontend will hardcode/derive navigation/sidebar structure as needed.
- Forms: contact recipients, spam protection, autoresponse content.
  - Answer: Yes.
- Legal pages: versioning process, locales, print/PDF requirements.
  - Answer: Yes.

## Internationalization
- Locales for launch; which content must be localized (products, pages, emails)?
  - Answer: Start with EN only, but architect for full localization of products, pages, and emails.
- hreflang and canonical strategy per locale.
  - Answer: Use locale-based slugs like `/en`, `/es`, `/pl` with appropriate hreflang/canonicals.

## Analytics & SEO
- KPIs: conversion, abandonment, AOV, time to quote.
  - Answer: Yes.
- Tracking plan (GA4, server events, consent management).
  - Answer: Yes.
- Sitemap strategy and indexing limits.
  - Answer: Yes.

## Performance & Availability
- SSG/ISR/SSR mix per page type. Cache TTLs.
  - Answer: Yes (to be configured per page type).
- Uptime and error budgets; alerting thresholds.
  - Answer: Yes.

## Security & Compliance
- GDPR compliance tasks (data retention, deletion requests).
  - Answer: Yes.
- PCI scope with selected payment methods.
  - Answer: Yes.

## Timelines & Dependencies
- External dependencies (carrier APIs, payment onboarding) and readiness dates.
  - Answer: Yes.
- MVP vs Phase 2 features split.
  - Answer: Yes; MVP/Phase 2 delineated above.