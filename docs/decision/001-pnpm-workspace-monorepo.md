---
status: accepted
date: 2026-10-12
---

# 001. Use a pnpm workspace monorepo

## Context

We have a backend API, a web frontend, and code we want to share between them, starting with a logger. Separate repos would mean duplicated config, and shared code would have to be published before either app could use it.

## Decision

One repo, managed with pnpm workspaces:

- `apps/*` holds deployable apps (`api`, `platform`).
- `packages/*` holds shared code that apps consume (`logger`).
- Every package uses the `@repo/` scope. Packages depend on each other with `workspace:*`.
- A version used by several packages (currently `typescript`) goes in the `catalog:` in `pnpm-workspace.yaml`, and packages reference it as `"catalog:"`.
- Shared TypeScript settings live in `tsconfig.base.json`, and each package extends it.
- pnpm 11 blocks dependency install scripts by default. Any package allowed to run one must be listed under `allowBuilds`.

## Consequences

- One install, one lockfile, and a change across packages lands in a single commit.
- Root scripts fan out with `pnpm -r` and `--filter`.
- There is no task runner (Turborepo, Nx), so no build caching and no dependency-ordered builds. Revisit this if builds get slow or packages start needing their own build step.
