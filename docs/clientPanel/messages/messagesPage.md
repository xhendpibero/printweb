# Messages Page

Goal: Specify routing, UX, data, and API for in-panel messaging between the service and the customer (read-only announcements and optional reply threads). Includes empty inbox state.

## Route & Files

- Page (list): `src/app/[locale]/(panel)/messages/page.tsx`
- Optional thread view: `src/app/[locale]/(panel)/messages/[threadId]/page.tsx`
- Components:
  - `src/components/messages/MessagesEmpty.tsx`
  - `src/components/messages/MessagesList.tsx`
  - `src/components/messages/MessageListItem.tsx`
  - `src/components/messages/ThreadView.tsx` (optional)
  - `src/components/messages/Composer.tsx` (optional if replies enabled)
- Hooks:
  - `src/hooks/messages/useMessages.ts`
  - `src/hooks/messages/useThread.ts` (optional)
  - `src/hooks/messages/useSendMessage.ts` (optional)
- API client: `src/lib/api/messages.ts`

## Page Structure

- Heading: i18n key `panel.messages.title`
- Empty state box: centered message `Your inbox is empty` with subdued styling.
- When messages exist:
  - List with pagination and read/unread indicators
  - Columns: Subject, From, Date, Status (Unread/Read)
  - Clicking a row opens thread view (same page drawer or separate route)

## Data Contracts

- `MessageThread`:
  - `id`, `subject`, `lastMessagePreview`, `lastMessageAt`, `unread: boolean`
- `Message`:
  - `id`, `threadId`, `author` (system|support|user), `body`, `createdAt`
- `MessagesFilters`: `{ q?: string, page?: number, pageSize?: number, unreadOnly?: boolean }`
- `SendMessagePayload` (optional): `{ threadId?: string, subject?: string, body: string }`

Types live in `src/types/index.ts`.

## React Query

- Keys
  - List: `['messages', filters]`
  - Thread: `['messages', 'thread', threadId]`
- Invalidation
  - After send or mark-as-read: invalidate thread and list

## API Endpoints (server)

- `GET /api/messages` → list threads
- `GET /api/messages/:threadId` → messages in thread
- `POST /api/messages` → create thread (optional)
- `POST /api/messages/:threadId/reply` → send reply (optional)
- `POST /api/messages/:threadId/read` → mark as read

## UX Notes

- Keep empty state minimal and friendly.
- Show date in user locale; relative time on list, absolute in thread.
- Support attachments later (out of scope for MVP).

## Accessibility & i18n

- All strings via translation keys.
- Ensure list items are keyboard navigable; announce unread counts.

## Security & Permissions

- Users access only their organization’s threads.
- Sanitize HTML if rich text ever introduced.

## Open Questions

- Are replies enabled or read-only announcements?
- Should we expose order-linked threads as a separate filter?

