# 03 — Search Ranking Service

## Scope
Blend ranking by product score with badge boosts; surface 2–4 `new` items.

## Inputs
- `baseScore` per product (0–1)
- `badges`: `eco`, `bestseller`, `new`
- Optional editorial weight: `editorialBoost` (0–0.2)

## Formula (example)
```
rankScore = baseScore
          + editorialBoost
          + (badge.eco ? 0.03 : 0)
          + (badge.bestseller ? 0.06 : 0)
          + (badge.new ? 0.08 : 0)
```
Tie-breakers: recency desc, title asc.

## First-Page Guarantee for "new"
- If `new` items exist, ensure at least 2 and at most 4 on page 1 by promoting them to ranks 2..5, interleaving to avoid clustering.

## Tasks
- Implement rank calculator and interleaver
- Unit tests with fixtures
- Configurable weights via env or CMS

## Acceptance Criteria (PM)
- New products visibly present (2–4 on page 1 when available)
- Bestseller items consistently rank higher than similar non-bestsellers

## Acceptance Criteria (Dev)
- Deterministic order given same inputs
- 95% test coverage on ranking utils