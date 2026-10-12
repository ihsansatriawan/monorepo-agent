---
status: accepted
date: 2026-10-12
---

# 005. Lint and format with oxc, check every commit

## Context

We want one code style and want common mistakes caught before code lands, without the setup and speed cost of ESLint plus Prettier.

## Decision

- **Lint with oxlint** (`.oxlintrc.json`). Plugins: `typescript`, `unicorn`, `oxc`, `import`, `react`. The `correctness` category is an error and `suspicious` is a warning. `pnpm lint` runs with `--deny-warnings`, so warnings also fail.
- **Format with oxfmt** (`.oxfmtrc.json`). No semicolons and single quotes. Everything else uses oxfmt defaults: 100-column lines, trailing commas, sorted `package.json` keys, and markdown formatting too.
- `routeTree.gen.ts` is generated, so both tools skip it.
- **The Husky pre-commit hook** runs `pnpm lint`, `pnpm typecheck` and `pnpm build` across the whole repo and stops at the first failure.

## Consequences

- A commit can't land with lint errors, type errors or a broken build.
- The hook checks the whole working tree, not only staged files. Unstaged edits can make a commit pass or fail, and commit time grows with the repo (about 2s today). If it gets slow, move to staged-only checks or a cached task runner.
- Formatting is not checked in the hook. Run `pnpm format`, or format on save in your editor.
- `git commit --no-verify` skips the hook. Use it only as a deliberate escape hatch.
