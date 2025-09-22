# Addresses Page

Goal: Specify routing, UX, data, and API for managing shipping and invoice addresses, including modals for creating addresses as Private person or Company account.

## Route & Files

- Page: `src/app/[locale]/(panel)/addresses/page.tsx`
- Components:
  - `src/components/addresses/AddressesFilters.tsx`
  - `src/components/addresses/AddressesTable.tsx`
  - `src/components/addresses/AddressRowMenu.tsx`
  - `src/components/addresses/AddressModal.tsx` (shared shell with tabs)
  - `src/components/addresses/ShippingAddressForm.tsx`
  - `src/components/addresses/InvoiceAddressForm.tsx`
- Hooks:
  - `src/hooks/addresses/useAddresses.ts`
  - `src/hooks/addresses/useCreateAddress.ts`
  - `src/hooks/addresses/useUpdateAddress.ts`
  - `src/hooks/addresses/useDeleteAddress.ts`
- API client: `src/lib/api/addresses.ts`

## Page Structure

- Filters toolbar
  - `type` select: `shipping` | `invoice`
  - `q` search input (name, company, street, city)
  - Primary actions: `Add shipping address`, `Add invoice address`
- Table
  - Columns: Name, Address (multiline), Options (menu)
  - Pagination: `page`, `pageSize`
- Row menu actions
  - `Edit`, `Set as default`, `Delete` (confirm), `Use in checkout` (optional)

## Create/Edit Modals

- Single modal shell with tabbed forms:
  - Tabs: `Private person` | `Company account`
  - For Shipping address, optional selector for delivery method (Courier / InPost / Pickup)

### ShippingAddressForm (Private person)

Required fields:
- firstName, lastName
- phoneCountryCode, phoneNumber
- country, street, buildingNumber, apartmentNumber?
- postalCode, city
- email (prefilled, editable?)
- addressName (label)
- deliveryMethod? (`courier|inpost|dpd_pickup` etc.)

### ShippingAddressForm (Company account)

Fields = Private person plus:
- companyName (required)
- taxId (required)

### InvoiceAddressForm

Two modes (tabs): Private person vs Company account
- Private person: firstName, lastName, country, street, buildingNumber, apartmentNumber?, postalCode, city, addressName
- Company account: firstName?, lastName?, companyName (required), taxId (required), country, street, buildingNumber, apartmentNumber?, postalCode, city, addressName

Validation handled by Zod schemas; formatting rules for phone and postal code per country.

## Data Contracts

- `AddressType` = `shipping | invoice`
- `DeliveryMethod` = `courier | inpost | dpd_pickup` (extensible)
- `BaseAddress`:
  - `id`, `type: AddressType`, `name` (address label)
  - `firstName`, `lastName`, `companyName?`, `taxId?`
  - `country`, `street`, `buildingNumber`, `apartmentNumber?`
  - `postalCode`, `city`
  - `phoneCountryCode?`, `phoneNumber?`, `email?`
  - `isDefault?: boolean`
  - `deliveryMethod?`: `DeliveryMethod` (shipping only)
  - `createdAt`, `updatedAt`
- `AddressFilters`: `{ type?: AddressType, q?: string, page?: number, pageSize?: number }`
- `CreateAddressPayload` / `UpdateAddressPayload`: subset of `BaseAddress` without `id/createdAt/updatedAt`

Types belong in `src/types/index.ts`.

## React Query

- Keys
  - List: `['addresses', filters]`
  - Item: `['addresses', id]`
- Invalidation
  - After create/update/delete/setDefault: invalidate list and item

## API Endpoints (server)

- `GET /api/addresses` → list with filters/pagination
- `POST /api/addresses` → create
- `GET /api/addresses/:id` → fetch by id
- `PUT /api/addresses/:id` → update
- `DELETE /api/addresses/:id` → delete
- `POST /api/addresses/:id/default` → set as default

## UX Notes

- Show country picker with search; default to user locale.
- Phone number split into country code and number; use lib for validation.
- Persist last used delivery method for convenience.
- Confirm deletion; disable delete for the only remaining default when required.
- Support multiline address display; ensure truncation with tooltip for long lines.

## Accessibility & i18n

- All labels via translation keys.
- Modal has focus trap, `aria-labelledby`, and ESC/close button.
- Form fields have associated labels and inline errors.

## Security & Permissions

- Ensure addresses belong to current user/org; enforce per-type limits (optional).
- Validate taxId format server-side when `companyName` is present.

## Open Questions

- Should users manage separate defaults per address type and delivery method?
- Do we restrict countries or infer from shipping zones?
- Can the same invoice address be reused across orders automatically?

