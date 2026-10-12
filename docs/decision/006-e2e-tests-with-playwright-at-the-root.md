---
status: accepted
date: 2026-10-12
---

# 006. E2E tests with Playwright at the root

## Context

We need tests that exercise the running apps the way a client does: real HTTP calls against the api, and a real browser against the platform. These tests span more than one app, so they don't belong inside any one of them.

## Decision

- Playwright lives at the repo root: `playwright.config.ts`, with tests in `e2e/`.
- There is one Playwright project per app, each with its own folder and `baseURL`:
  - `api` (`e2e/api/`) makes HTTP-only calls through the `request` fixture. No browser starts.
  - `platform` (`e2e/platform/`) runs in Chromium (Desktop Chrome).
- Playwright starts both apps through `webServer`: the api with `start` on port 3000, the platform with `dev` on port 5173. Locally it reuses servers that are already running. On CI (`CI` set) it always starts fresh ones.
- The root `tsconfig.json` covers `e2e/` and the config only. `pnpm typecheck` runs it after the workspace packages.
- Only Chromium is installed. Run `pnpm exec playwright install chromium` once per machine.
- E2E tests are **not** part of the pre-commit hook. Run them with `pnpm test:e2e`.

## Consequences

- One command runs everything, and new specs go in the folder for the app they test.
- The platform is tested against the Vite dev server, not a production build. A bug that only appears in the build won't be caught here.
- Locally, a server you already have running on 3000 or 5173 gets reused, even if it's a different app or an old version. Stop it if results look stale.
- Without e2e in the hook, a commit can break end-to-end behaviour. Run the suite before pushing, or add it to CI.
