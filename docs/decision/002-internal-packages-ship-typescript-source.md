---
status: accepted
date: 2026-10-12
---

# 002. Internal packages ship TypeScript source

## Context

`@repo/logger` is used by the platform (browser, through Vite) and by the api (Node, through tsx). If every package had its own build step, we would have to build packages in the right order and run a watcher per package during development.

## Decision

A workspace package points its `exports` at its TypeScript source (`"./src/index.ts"`) and has no build step. The app that consumes it compiles it: Vite in `platform`, tsx in `api`.

The api runs from source too: `dev` is `tsx watch src/index.ts` and `start` is `tsx src/index.ts`.

## Consequences

- An edit to a package shows up in both apps right away, with no build ordering.
- Packages can't be published to npm as they are.
- Package code has to compile under every consumer's setup. Keep it plain TypeScript, with no package-specific compiler features (`paths`, decorators).
- A shared package must not use runtime-specific APIs unless only one app uses it. The logger uses nothing but `console`.
- The api has no compiled output. To deploy it we either run tsx in production or add a bundler (for example tsdown). Adding a bundler would supersede this decision for the api.
