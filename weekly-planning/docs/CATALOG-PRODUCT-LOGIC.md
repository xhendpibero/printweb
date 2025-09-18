# Catalog and Product Logic (Backend Integration Guide)

This document specifies the logic, data contracts, and endpoints needed to power the Catalog (search/filters) and Product detail/configuration pages. It also outlines the mock data used by the frontend so the backend can replace it seamlessly.

## 1. URL Model

- Search page (single-choice filters in query params):
  - `/en/search?product=calendars&enhancement=gold-foiling&substrate=coated-paper&collection=eco&industry=office`
- Product detail page (slug-based):
  - `/en/[slug]` e.g. `/en/raised-spot-gloss-flyers`

## 2. Taxonomy and Filters

- Product types (aka top-level taxonomy): Flyers, Business Cards, Catalogs, Books, Posters, Calendars, Large Format, Labels and Stickers, Notepads, Presentation Folders, Plano Sheets, Envelopes, Promotional Items, Notebooks, Other, Samples, Pens
- Enhancements: Gold Foiling, Silver Foiling, Colored Foiling, Spot UV Varnish, 3D UV Varnish, Drip-Off Varnish, High Gloss Varnish, Matte Foil, Glossy Foil, Soft Skin Foil
- Paper substrate: coated paper, eco-friendly paper, offset paper, decorative paper, self-adhesive paper, cardboard, plastic material
- Collection: New, Eco, Bestseller, Off the shelf
- Industry: For Office, For Schools, Hospitality, For Fashion Brands

Backend should provide canonical values (slug + label) to match frontend options.

## 3. Search API

- GET `/api/catalog/search`
  - Query params (all optional, single-value):
    - `product` | `enhancement` | `substrate` | `collection` | `industry`
    - `q` (free text)
    - `locale` (e.g. `en`)
    - `limit`, `offset`
  - Response 200 JSON:
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
          "priceFrom": { "amount": 49.54, "currency": "EUR" }
        }
      ],
      "total": 123
    }
    ```
  - Notes:
    - Single-choice filters map 1:1 to internal taxonomy
    - Provide stable slugs for item detail links

## 4. Product Detail API

- GET `/api/catalog/products/:slug`
  - Response 200 JSON:
    ```json
    {
      "slug": "raised-spot-gloss-flyers",
      "title": "Raised Spot Gloss Flyers",
      "breadcrumbs": [
        { "label": "Chroma", "href": "/en" },
        { "label": "Flyers", "href": "/en/search?product=flyers" },
        { "label": "Raised Spot Gloss Flyers" }
      ],
      "images": [
        { "src": "/media/.../1.jpg", "alt": "Slide 1" }
      ],
      "formats": [
        { "id": "a4", "label": "A4", "size": "210 x 297 mm" }
      ],
      "papers": [
        {
          "label": "Standard matte",
          "options": [ { "id": "matte-170", "label": "matte 170g" } ]
        }
      ],
      "colors": [
        { "id": "4-4", "label": "color - both sides (4/4)" },
        { "id": "4-0", "label": "color - one side (4/0)" }
      ],
      "finishings": [
        {
          "title": "Surface finishings",
          "sides": ["front", "both"],
          "options": [ { "id": "soft-skin-foil", "label": "Soft Skin foil" } ]
        }
      ],
      "filePreparationNote": "I will upload ready file ...",
      "runs": [
        { "quantity": 1000, "netPrice": 71.79, "unitPrice": 0.072, "eta": "Thu (09/18)", "cutoffNote": "Order today until 18:00" }
      ],
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
      }
    }
    ```
  - Notes:
    - `runs` should be precomputed price tiers for fast rendering
    - `currency` is required; prices are net

## 5. Pricing API (optional real-time)

- POST `/api/catalog/price`
  - Body JSON:
    ```json
    {
      "slug": "raised-spot-gloss-flyers",
      "configuration": {
        "format": "a4",
        "paper": "matte-300",
        "colors": "4-4",
        "finishings": ["soft-skin-foil", "spot-3d-uv"],
        "quantity": 1000
      },
      "locale": "en"
    }
    ```
  - Response 200 JSON:
    ```json
    {
      "printingCostNet": 71.79,
      "deliveryCostNet": 4.85,
      "currency": "EUR",
      "runs": [ { "quantity": 1000, "netPrice": 71.79, "unitPrice": 0.072, "eta": "Thu (09/18)", "cutoffNote": "Order today until 18:00" } ]
    }
    ```

## 6. File Specifications & Assets

- Provide per-product file specification fields (format, dpi, colors, gross/net format, bleed)
- Provide mockup/download URLs (PDF templates) per format
- Optional: JSON for dynamic content blocks (About tab) with structured components

## 7. Internationalization

- All fields support `locale` (e.g., `en`, `pl`), with fallbacks
- Slugs remain consistent; localized titles/breadcrumbs returned per `locale`

## 8. Frontend Mock Data Mapping

- Search filters options: `src/lib/search-filters.ts`
- Product example + types: `src/lib/products.ts`
- Product page route: `src/app/en/[slug]/page.tsx`
- Product components:
  - Gallery: `src/components/product/ProductGallery.tsx`
  - Options: `src/components/product/ProductOptions.tsx`
  - Pricing: `src/components/product/PricingTable.tsx`, `src/components/product/ProductSummary.tsx`
  - Tabs: `src/components/product/ProductTabs.tsx`

Replace mocks by implementing the APIs and swapping data providers while keeping shapes stable.

## 9. Performance Expectations

- Product detail should render < 2s with precomputed `runs`
- Price recomputation (< 300ms) for quantity/config changes
- Cache search results (per filter set) and product detail responses

## 10. Security & Validation

- Validate filter values against known enums
- Validate product configuration server-side before pricing
- Sanitize and authorize file/template downloads