# Users In Your Organization

Goal: Specify routing, UX, data, and API for managing organization members, including add/edit user modal and role management.

## Route & Files

- Page: `src/app/[locale]/(panel)/organization/page.tsx`
- Components:
  - `src/components/org/UsersTable.tsx`
  - `src/components/org/UserRowMenu.tsx`
  - `src/components/org/UserModal.tsx` (add/edit)
  - `src/components/org/RoleBadge.tsx`
- Hooks:
  - `src/hooks/org/useOrgUsers.ts`
  - `src/hooks/org/useCreateOrgUser.ts`
  - `src/hooks/org/useUpdateOrgUser.ts`
  - `src/hooks/org/useInviteOrgUser.ts` (optional)
  - `src/hooks/org/useDeleteOrgUser.ts`
- API client: `src/lib/api/orgUsers.ts`

## Page Structure

- Toolbar: `Add user` primary button
- Table: columns Full name, Email, Role, Operations
- Pagination controls
- Row menu: Edit, Reset password (optional), Change role, Remove user

## Add/Edit User Modal

Fields:
- firstName (required)
- lastName (required)
- email (required, unique per org)
- phone? (optional)
- password (required on create; hidden on edit)
- repeatPassword (required on create; must match)
- role select: `admin | manager | member` (customizable)

Password strength meter and visibility toggle. Validate with Zod; enforce minimum length and complexity.

## Data Contracts

- `OrgRole` = `admin | manager | member`
- `OrgUser`:
  - `id`, `firstName`, `lastName`, `email`, `phone?`, `role: OrgRole`, `createdAt`, `updatedAt`
- `CreateOrgUserPayload`:
  - `firstName`, `lastName`, `email`, `phone?`, `password`, `role`
- `UpdateOrgUserPayload`:
  - `firstName?`, `lastName?`, `phone?`, `role?`, `password?` (admin-only)

Place types in `src/types/index.ts` and reuse across hooks and API.

## React Query

- Keys
  - List: `['org', 'users', filters]`
  - Item: `['org', 'users', id]`
- Invalidation
  - After create/update/delete: invalidate list and relevant item

## API Endpoints (server)

- `GET /api/org/users` → list with pagination
- `POST /api/org/users` → create
- `GET /api/org/users/:id` → fetch
- `PUT /api/org/users/:id` → update
- `DELETE /api/org/users/:id` → remove
- `POST /api/org/users/:id/reset-password` (optional)
- `POST /api/org/invite` (optional invite flow)

## Permissions

- Only `admin` can create, remove, and change roles.
- `manager` may edit profile fields but not role or admin users.
- Prevent self-demotion lockout: require at least one admin at all times.

## UX Notes

- Show a `RoleBadge` next to user names.
- Confirm destructive actions; block deleting the last admin.
- On create, optionally send a welcome/invitation email.

## Accessibility & i18n

- All strings via translation keys.
- Modal uses focus trap and `aria-live` for validation errors.

## Open Questions

- Do we support SSO users with limited fields editable?
- Is invite preferred over setting a password in modal?
- Should roles be extensible via feature flags?

