# 07 — Configurator Option Constraints

## Scope
Enforce invalid combinations, `active=false`, and stock=0 logic; auto-unselect invalid options.

## Rule Schema
```json
{
  "id": "block-soft-skin-on-matte-90",
  "when": { "finishing": "soft-skin-foil", "paper": "matte-90" },
  "action": { "type": "disallow" }
}
```

Alternative (auto reset with message):
```json
{
  "id": "reset-foil-when-4-0",
  "when": { "colors": "4-0", "finishing": "soft-skin-foil" },
  "action": { "type": "autoReset", "fields": ["finishing"], "message": "Foil not available for 4-0" }
}
```

## Stock/Active
- Options include `active` and optional `stock` number
- If selected option becomes inactive or stock 0, UI unselects and shows toast

## Server Validation API
- `POST /api/catalog/validate-config`
Request:
```json
{ "slug": "raised-spot-gloss-flyers", "configuration": { "format": "a4", "paper": "matte-300", "colors": "4-4", "finishings": ["soft-skin-foil"] } }
```
Response 200:
```json
{ "ok": true, "messages": [] }
```
Response 200 (invalid):
```json
{
  "ok": false,
  "messages": [
    { "field": "finishing", "code": "DISALLOWED_COMBINATION", "message": "Soft Skin foil not available with 4-0" }
  ],
  "suggestions": { "finishing": ["spot-3d-uv", "matte-foil"] }
}
```

## UI Behavior
- On change, run client validation; if fails, auto-reset per rule and show inline hint
- Before pricing, call server validation; block pricing if invalid

## Tasks
- Rule loader and evaluator
- Client + server validators
- UI auto-reset and messaging

## Acceptance Criteria (PM)
- Users cannot proceed with invalid combos; clear guidance provided

## Acceptance Criteria (Dev)
- Deterministic rule evaluation; conflict resolution documented (disallow > autoReset)
- Unit tests cover rules and stock/active transitions