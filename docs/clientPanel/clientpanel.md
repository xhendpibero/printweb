# Client Panel Overview

Purpose: Define IA, routing, data contracts, and UX patterns for the authenticated client panel.

Scope: Web app (Next.js App Router) with i18n `[locale]`, React Query for server state, and protected routes.

## Information Architecture

- Dashboard
- Orders
- Invoices
- Discounts & Promotions
- CashBack
- Addresses
- Users in Organization
- Messages
- Settings
  - Account Details
  - Change Password
  - Transfer Details
  - Marketing Consent
  - FTP Server

## Routing & Folders

- Base: `src/app/[locale]/(panel)/` wraps all authenticated pages
  - `dashboard/`
  - `orders/`
  - `invoices/`
  - `discounts/`
  - `cashback/`
  - `addresses/`
  - `organization/`
  - `messages/`
  - `settings/` (tabs for subpages)

Use a shared layout: `src/app/[locale]/(panel)/layout.tsx` containing sidebar, topbar, and auth guard.

## Auth & Access Control

- Guard: Protect `(panel)` with middleware or server auth check in layout.
- Session: Expose a `useSession()`/`getSession()` helper in `src/lib/auth/`.
- Permissions: Gate features (e.g., organization users) with role/claims.

## Data Layer

- React Query
  - Query client set up in `src/lib/react-query.tsx`
  - Query keys: `['orders']`, `['orders', id]`, `['invoices']`, `['addresses']`, `['me']`, `['settings']`
- API Client
  - `src/lib/api/` per domain: `orders.ts`, `invoices.ts`, `addresses.ts`, `settings.ts`
  - Centralized fetcher with auth headers, error handling
- Server end
  - Prefer route handlers under `src/app/api/*` or server actions collocated with pages

## Types & Schemas

- Add/extend in `src/types/index.ts`:
  - `User`, `OrganizationUser`
  - `Order`, `OrderItem`, `OrderFilters`, `OrderStatus`, `PaymentStatus`
  - `Invoice`, `Address`, `Message`
  - `UserSettings`, `UpdateUserSettingsPayload`, `PasswordChangePayload`
- Validation via Zod in `src/schemas/` (mirrored server-side)

## UI Conventions

- Sidebar lives in `(panel)/layout.tsx`; items driven by a config array with i18n keys.
- Page shell: heading, filters/actions, content list/detail, pagination.
- Forms: React Hook Form + Zod, consistent field components in `src/components/ui/`.
- Feedback: toasts for success/error; inline field errors.
- Loading/empty/error states standardized components.

## Settings Structure

- Route: `src/app/[locale]/(panel)/settings/`
  - `page.tsx` (tabbed shell)
  - `account/`, `password/`, `transfer/`, `marketing/`, `ftp/` as subroutes or tabs
- Components: `src/components/settings/*Form.tsx`
- API: `src/lib/api/settings.ts`
- Hooks: `src/hooks/useUserSettings.ts`

## Orders Structure (summary)

- Route: `src/app/[locale]/(panel)/orders/`
  - `page.tsx` for list + filters
  - `[orderId]/page.tsx` for details and actions
- Filters: date range, order status, payment status, search, view type
- Actions: cancel order, reorder, open invoice

## Navigation & i18n

- All routes live under `[locale]`.
- Sidebar labels must be translation keys, not literals.
- Persist view preferences in query or localStorage when appropriate.

## Performance

- Pagination and server-side filtering for lists.
- Suspense-friendly data fetching; cache detail queries on navigate.
- Avoid overfetching by scoping query keys to filter params.

## Testing & QA

- Unit test hooks and API clients.
- Storybook (optional) for forms and list items.
- Manual checklist per page: load, filter, paginate, empty states, errors.

## Implementation Order

1) `(panel)` layout + auth guard
2) Sidebar navigation with i18n
3) Orders list page (MVP) + API
4) Orders detail page
5) Settings shell + Account Details form
6) Remaining settings tabs
7) Other sections as needed

