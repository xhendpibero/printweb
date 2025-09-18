# Content Pages: Company and Info

This folder documents the simple content pages (company/info) that share common layouts and navigation patterns, plus the logic we still need to define.

## Layout Patterns

- Tabs Layout (same page layout, switchable tabs):
  - `/en/company/contact`
  - `/en/company/tenders`
  - `/en/company/what-we-do`
  - `/en/company/about-us`

- Sidebar Container Layout (left navigation, content on the right):
  - Single pages:
    - `/en/company/contact`
    - `/en/info/frequently-asked-questions`
    - `/en/info/reason-for-rejection`
    - `/en/printonline`
  - Section: "How to prepare the files"
    - `/en/info/upload-3d`
    - `/en/info/raised-spot-gloss-varnishing`
    - `/en/info/uv-varnishing-masks-for-download`
    - `/en/info/gold-foilingsilver-foiling`
    - `/en/info/en/gold-foilingsilver-foiling-raised-spot-gloss-varnishing`
    - `/en/info/help-custom-shape`
  - Section: "Calendars"
    - `/en/calendar-pages-three-month-calendars`
    - `/en/single-insert-calendars`
    - Dropdown: "Calendar pages for download"
      - `/en/info/calendar/calendar-pages--pocket-calendars`
      - `/en/info/calendar/calendar-pages--slide-binding-calendars`
      - `/en/info/calendar/calendar-pages--spiral-bound-calendars`
      - `/en/info/calendar/calendar-pages--desk-pad-calendars`
      - `/en/info/calendar/calendar-pages--desk-calendars`
  - Legal/Policies:
    - `/en/info/privacy-policy`
    - `/en/info/cookies-policy`
    - `/en/info/terms-and-conditions`
    - `/en/info/general-terms-of-sale`

## Routing & i18n

- Route prefix per locale (e.g., `/en/...`), slugs stable across locales
- Canonical and hreflang links provided by CMS

## Content Model (CMS)

- Page
  - `slug`, `title`, `locale`, `layout` (tabs|sidebar|simple)
  - `seo` (title, description, canonical)
  - `blocks`: ordered array of components (hero, richText, list, imageText, downloadList)
  - `attachments`: optional PDFs/images for download
  - `navGroup`: optional (to place the page under a sidebar section/dropdown)

## Rendering Rules

- Tabs layout: top-level tabs map to sibling pages under `/company/*` group
- Sidebar layout: left nav tree built from `content-nav` structure (see code config), supports sections, separators, dropdowns
- Simple pages: header + content blocks + footer, no nav

## Missing Logic (see `missing-logic.md` for details)

- CMS integration and content blocks contract
- Forms handling (contact), validation, and spam protection
- SEO metadata and breadcrumbs
- Navigation config driven by CMS
- Redirects/legacy URL mapping