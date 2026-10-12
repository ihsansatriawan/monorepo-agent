---
status: accepted
date: 2026-10-12
---

# 003. File-based routing with TanStack Router

## Context

The platform needs client-side routing, and we want links checked against routes that actually exist.

## Decision

Use TanStack Router with file-based routing through `@tanstack/router-plugin/vite`:

- Every file in `apps/platform/src/routes/` is a route. `__root.tsx` is the shared layout.
- `autoCodeSplitting: true` is set, so each route loads lazily.
- The plugin writes `src/routeTree.gen.ts`. We commit it so `pnpm typecheck` passes on a fresh clone. Never edit it by hand.

## Consequences

- Adding a page means adding a file, and `<Link to="…">` is type-checked against the real routes.
- `routeTree.gen.ts` shows up in diffs whenever routes change.
- In `vite.config.ts`, `tanstackRouter()` must stay before `react()`.
