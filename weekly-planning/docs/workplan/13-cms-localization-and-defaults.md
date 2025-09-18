# 13 — CMS Localization & Defaults

## Scope
Implement per-locale content with EN as default and duplication on new locale creation.

## Fallback Logic
Pseudo-code:
```
getLocalized(field, locale):
  if field[locale] exists and non-empty: return field[locale]
  else: return field["en"]
```

## Duplication Workflow
- When adding a new locale (e.g., `pl`), bulk copy EN fields into `pl`
- Mark entries as `needs-translation=true`
- Editors replace text over time; fallback ensures continuity

## Fields to Localize
- Product: `title`, `excerpt`, option labels, file spec notes, breadcrumbs
- Taxonomy labels
- Static pages and emails (phase 2 for emails)

## Risks & Mitigations
- Drift between EN and others → track `updatedAt` per locale
- Partial translations → visual indicators in CMS

## Acceptance Criteria (PM)
- Switching locale shows translated content where available; EN elsewhere

## Acceptance Criteria (Dev)
- Fallback applied consistently across API responses
- Bulk duplication script idempotent