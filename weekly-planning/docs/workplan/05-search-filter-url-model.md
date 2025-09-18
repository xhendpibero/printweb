# 05 — Search Filter URL Model

## Scope
Model combined single-select filters in URL and in state.

## URL Contract
- `/en/search?product=flyers&enhancement=gold-foiling&substrate=coated-paper&collection=eco&industry=office&q=spot`
- One value per key; omit missing
- Unknown keys ignored; unknown values rejected upstream by API

## State Sync
- Parse URL on load → populate store
- Store changes write URL (replaceState) with debounce (250ms for `q`)
- Back/forward updates store

## Edge Cases
- Clearing a filter removes the key from URL
- `q` empty string removed from URL
- Locale switch preserves filters

## Tasks
- Router helpers (parse/serialize)
- Zustand middleware for URL sync
- Tests for forward/back and deep links

## Acceptance Criteria (PM)
- Deep links reproduce filter state
- Browser navigation preserves filters

## Acceptance Criteria (Dev)
- No infinite loops between URL and store
- 100% test coverage on serializer/parser