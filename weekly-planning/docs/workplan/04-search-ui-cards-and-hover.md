# 04 — Search UI Cards & Hover

## Scope
Implement card UI: 1:1 image, badges, title; on hover zoom to 4:5 and show mini description; no price.

## UI Specs
- Default aspect: 1:1 image crop
- Hover: zoom/crop to 4:5, reveal mini description below title
- Badges: pill style `eco`, `bestseller`, `new`
- Title below image; description appears only on hover/focus

## Interactions & A11y
- Keyboard focus triggers hover state
- Focus order: image → title → card link
- ARIA: `aria-describedby` links description when visible

## States
- Loading skeleton
- No image fallback
- Badge overflow handled responsively

## Tasks
- Card component + CSS transitions
- Badge component
- Tests for hover/focus behavior

## Acceptance Criteria (PM)
- Cards show only image + title at rest; description only on hover/focus
- No prices displayed

## Acceptance Criteria (Dev)
- Cross-browser hover/focus parity
- Screenshot tests across breakpoints