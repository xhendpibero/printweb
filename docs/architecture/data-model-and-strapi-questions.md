# Data Model + Strapi Mapping (Review + Questions)

This document consolidates what exists in the repo, proposes a normalized data model, maps it to Strapi content types/components, and lists key questions to resolve before finalizing APIs and implementation.

## Repo Signals (today)

- Types present in `src/types/index.ts`: `Product`, `Category`, `Configurator`, `ConfiguratorField/Option`, `PricingRule`, `ValidationRule`, `CartState/CartItem`, `Order/OrderItem`, `Address`, `User`.
- Client state: `src/stores/cart-store.ts` (Zustand) holds basic cart with `items`, `currency`, `shippingOption`.
- React Query provider set up (`src/lib/react-query.tsx`).
- App router with `src/app/[locale]/...` and extensive docs under `docs/` for panel/checkout flows.

Implication: backend is not wired yet; we will design Strapi content types + endpoints to serve these flows.

## Proposed Core Entities (ERD summary)

- User (auth provided elsewhere; Strapi stores profile fields/roles)
- Organization (optional; groups users)
- Address (shipping/invoice; owned by user/org)
- Category (tree)
- Product (belongs to Category)
- Configurator (per Product) → Fields → Options → PricingRules → ValidationRules
- Cart (server-side draft) → CartItem (references Product + configuration snapshot)
- Upload (per CartItem) → Files (storage metadata, status)
- Shipment (per Cart) → ShipmentAddress selection and per-item Assignments
- PaymentIntent (per Cart/Order) with payment method and provider payload
- Order (placed from Cart) → OrderItem (with configuration snapshot)
- Invoice (per Order; generated after placement or payment)
- DiscountProgram, Promotion, Coupon (affect pricing)
- CashbackBalance, CashbackHistory
- MessageThread, Message (support / announcements)
- MarketingConsent

Note: Use Money as `{ amountMinor: number; currency: string }` across all monetary fields.

## Strapi Content Types (collection types)

- `user` (if using Strapi Users & Permissions) or external auth + `profile`
  - fields: email, firstName, lastName, phone, role (enum)
- `organization`
  - name, taxId?, billingAddress (component), members (relation user many-to-many with role)
- `address`
  - owner: relation to user or organization
  - type: enum `shipping|invoice`
  - fields: firstName, lastName, company?, taxId?, street, city, postalCode, country, phone?, label, isDefault
- `category`
  - name, slug, parent (self relation), sortOrder
- `product`
  - name, slug, description, status, category (relation), images (media), basePrice (Money), productType (enum), configurator (relation)
- `configurator`
  - name, product (relation 1-1), fields (component repeatable), pricingRules (component repeatable), validationRules (component repeatable)
- `cart`
  - user or organization, currency, printingNet (Money), deliveryNet (Money), totalNet/totalGross (Money), status `active|abandoned|converted`
- `cart-item`
  - cart (relation), product (relation), configuration (JSON), copies, unitPrice (Money), totalPrice (Money), shippingMethod?, fingerprint
- `upload`
  - cartItem (relation), status `queued|uploading|processing|done|error`, provider `local|s3|gcs`, files (component repeatable), errorMessage?
- `shipment`
  - cart (relation), mode `one|multiple`, addresses (relation to address), assignments (JSON of itemId→splits)
- `payment-intent`
  - cart (relation), method, provider, status, amount (Money), currency, providerPayload (JSON)
- `order`
  - orderNumber, user/org, status, subtotal/shipping/tax/total (Money), currency, shippingAddress (component), billingAddress (component), paymentStatus, paymentMethod, createdAt
- `order-item`
  - order (relation), product (relation), configuration (JSON), quantity, unitPrice/totalPrice (Money), productionFiles (media or relation to upload files)
- `invoice`
  - order (relation), number, issueDate, dueDate, totals (Money), currency, pdfUrl
- `discount-program`
  - name, currentDiscountPct, tiers (component list)
- `promotion`
  - name, description, startsAt, endsAt, status, conditions (JSON)
- `coupon`
  - code, discountPct/amount, validFrom/To, usageLimits, promotion (relation)
- `cashback-balance`
  - owner (user/org), currency, available, blocked
- `cashback-history`
  - balance (relation), type, amount (Money), note, order (relation?)
- `message-thread`
  - owner (user/org), subject, lastMessageAt, unreadCount
- `message`
  - thread (relation), author (enum `system|support|user`), body (rich text), createdAt
- `marketing-consent`
  - owner (user), email:boolean, phone:boolean, updatedAt, updatedBy

## Strapi Components

- `shared.money` → amountMinor:int, currency:string
- `shared.address` → same fields as Address (normalized component)
- `configurator.field` → id, type, name, label, required, options (component), validation (JSON)
- `configurator.option` → id, label, value, priceModifier (Money or numeric), image
- `pricing.rule` → id, condition (JSON), modifier:number, type:enum
- `upload.file` → name, size, mime, pages?, url, storageKey
- `discount.tier` → name, threshold:number, discountPct:number

## URL + API Alignment (as agreed)

- Steps:
  - GET `/api/order/cart` (and `/api/order/cart/*` mutations)
  - GET `/api/order/uploads/*`
  - GET `/api/order/shipment/*`
  - GET `/api/order/payment/*`
  - GET `/api/order/summary`
  - POST `/api/order/place`
  - GET `/api/order/confirmation`

## Table Relations (selected)

- product 1—n cart-item, order-item
- category 1—n product; category self 1—n category (parent)
- configurator 1—1 product; configurator 1—n fields; field 1—n options; configurator 1—n pricingRules
- cart 1—n cart-item; cart 1—1 shipment; cart 1—1 payment-intent; cart 1—n uploads via items
- upload 1—n files
- order 1—n order-item; order 1—1 invoice; order belongs to user or organization
- address belongs to user or organization; shipment n—m addresses
- organization n—m users with role (through table)

## Derived/Computed Data

- Pricing computed from product + configurator + rules → writes unitPrice/totalPrice (Money) to cart items and orders (immutable snapshot).
- Completeness (summary) computed server-side; stored transiently or on cart as flags.

## Permissions (high level)

- Users can access only their cart, orders, addresses, messages, balances.
- Organization admins manage members, roles, and company-level addresses/invoices.
- Strapi role policies should gate mutations appropriately.

## Open Questions (to unblock backend + Strapi)

1) Auth & identity
- Are we using Strapi Users & Permissions, or external auth (NextAuth/Auth.js) with a separate `profile` CT in Strapi?
= I still don't understand the question, can you pick the best for this as a simpler one
- Do we support organizations at launch? If yes, can a user belong to multiple orgs?
= no, basically user that register from the login page will be the master of the organization, and user that created in clientPanel will be the member, so 1 user = 1 org 

2) Pricing engine
- Do pricing rules live in Strapi (simple JSON rules) or external service?
= simple JSON rules
- Money rounding: at what precision per currency? VAT handling per country?
= we only pl, eur and usd

3) Product configurator
- Which field types are required for MVP (select, range, file, etc.)?
= basically all required(because we will add choose like "none" in list), but can be customize each product some can be require to pick polish or background, some product don't have it.
- Do options carry image and price modifiers as Money or numeric deltas?
= some of options have their image to shown in the product page, and also custumization like an addons in the price x(times) the amount product 

4) Files & uploads
- Storage provider (local/S3/GCS)? Presigned upload flow OK?
= currently we still using local
- Max file size, allowed MIME, and per-item required page counts per product?
= 2mb, and the others is you can choose the best for us

5) Shipment
- Carriers/methods list source? How to price multi-address shipping — per address, per item weight, or flat?
= per address and per item weight
- Anonymous shipping toggle behavior and constraints?
= yeah just for the true/false in db

6) Payments
- Which providers at launch (Tpay, PayU, Card, PayPal, Transfer)? Which flows use redirects vs on-page capture?
we now just will serve 
"I will choose later"
and
"Transfer bank"
and the other chooses will be disabled

- Deferred “I will choose later”: does it create an order with `awaiting_payment` or `on_hold`?
= "on_hold"

7) Orders & on-hold
- Exact `status` lifecycle (draft → on_hold → processing → shipped ...)?
= yes, give me your best
- Who can release an on-hold order and what server validations are required?
= the admin, and can you confirm, what do you think the best that we can do to process this orders? we build admin dashboard or we can easily(if possible) just in strapi


8) Invoices
- Per-country invoice numbering rules and series? E-invoice consent linkage to invoice delivery?
= yes
- Period download: is it aggregated ZIP from Strapi or external ERP?
= yes

9) Discounts/Promos/Coupons
- Program tiers logic location? Do coupons stack with program discounts?
= could be possible, just make it flexible enough to customize it later in the future
- Where is discount applied (cart total vs per-item)?
= per cart / per order

10) Cashback
- Earning events (percentage of net? on paid orders?)
= no cashback for now
- Redemption rules (min amount, currency, expiry)?
= yes we can customize later in strapi/admin

11) Messages
- Are threads read-only announcements or two-way support?
= 2 way support
- Attachments in messages allowed?
= for now just text and image

12) Settings
- Which fields from Account Details sync with default addresses?
= yes make it just simple as possible
- Transfer details: static per tenant or per organization?
= per organization
- FTP credentials: per-user? app passwords vs account password?
= per user, but we can do this later as the priority very low

13) i18n
- Which entities are localized (product, category, content blocks)? Strapi i18n plugin enabled?
= let's not make it hard, and we focus use english for now, but if strapi possible handle it yes, 

14) Money
- Confirm Money object shape and serialization across all endpoints.
= I did't understand

15) IDs & numbering
- Use ULID/UUID for IDs; order number format e.g., `Z-YYYY-NNNNN` — who issues and how?
= yes for the orders

## Next Steps

- Confirm answers to open questions; lock Strapi content types.
- Generate Strapi CTs and components (schemas) based on the above.
- Implement API endpoints aligned to `/api/order/*` and clientPanel routes, returning Money consistently.
- Wire pricing + completeness calculators; integrate upload/purchase flows.

