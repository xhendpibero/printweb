# 30 — Performance: Caching SSG/ISR/SSR

## Scope
Define rendering strategy per page and cache TTLs; measure and optimize.

## Route Strategies
- `/en` (home): SSG
- `/en/search`: SSR with short CDN cache (stale-while-revalidate 60s)
- `/en/[slug]` (product): ISR (revalidate 10 min), embed precomputed runs
- APIs: cache per endpoint (see respective specs)

## Cache Headers
- `Cache-Control: public, max-age=60, stale-while-revalidate=120`
- ETags for stable payloads

## Budgets
- Product detail render < 2s on 3G/slow CPU
- Price recompute < 300ms
- Search P95 < 150ms warm cache

## Monitoring
- Core Web Vitals via RUM
- Server metrics: latency, error rates, cache hit ratio
- Alerts on error ≥ 1% or latency p95 regression

## Acceptance Criteria (PM)
- Pages feel fast and responsive under normal traffic

## Acceptance Criteria (Dev)
- Budgets enforced in CI with Lighthouse thresholds; dashboards configured