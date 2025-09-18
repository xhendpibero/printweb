# 18 — Cart Store & Persistence

## Scope
Persist cart client-side and server-side for logged-in users; include priceVersion and config hash.

## Store Shape
```ts
interface CartItem {
  itemId: string;
  slug: string;
  quantity: number; // run quantity
  configuration: {
    format: string; paper: string; colors: string; finishings: string[];
  };
  priceVersion: number;
  configFingerprint: string;
  thumbnail?: string;
  shippingOption?: string; // code
}
interface CartState {
  items: CartItem[];
  shippingOption?: string;
  currency: 'EUR';
}
```

## Client Persistence
- Zustand with `persist` to IndexedDB/localStorage
- Versioned schema with migration function

## Server Persistence
- Authenticated users: POST `/api/cart/save` with current state
- GET `/api/cart` to restore after login
- Merge strategy: server wins on newer `updatedAt`; else client adds new items

## Merge Logic
- De-duplicate by `(slug + configFingerprint)`; sum quantities when identical
- Revalidate after merge

## Triggers
- Save on item add/remove/update and option change (debounced)

## Acceptance Criteria (PM)
- Cart persists across sessions and devices (once logged in)

## Acceptance Criteria (Dev)
- Deterministic merge; unit tests for collisions and revalidation post-merge
- Sensitive data excluded from client storage