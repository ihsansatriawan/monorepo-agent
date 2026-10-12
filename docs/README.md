# Docs

| Folder                   | What goes in it                                             |
| ------------------------ | ----------------------------------------------------------- |
| [`decision/`](decision/) | Technical decisions: why the code is the way it is.         |
| [`product/`](product/)   | Product decisions and product notes: what we build and why. |

---

## Decisions (`decision/`)

Write one when a choice would make a future reader ask "why is it like this?" Examples: picking a library, a folder convention, a trade-off you accepted.

**File name:** `NNN-short-kebab-title.md`, numbered in sequence (`001`, `002`, …). Numbers are never reused.

### Status

| Status       | Meaning                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------- |
| `accepted`   | In effect. Follow it.                                                                       |
| `superseded` | Replaced by a newer decision. Set `superseded_by` to that file.                             |
| `deprecated` | No longer applies, and nothing replaces it. Add one line at the top of the body saying why. |

A decision is never rewritten after it's accepted. To change it, write a new decision with `supersedes: NNN-…`, then mark the old one `superseded` with `superseded_by: NNN-…`. The only edits to an old record are its status fields and the deprecation note.

### Template

```markdown
---
status: accepted
date: YYYY-MM-DD
# supersedes: NNN-old-decision        (when this replaces one)
# superseded_by: NNN-new-decision     (set later, when status becomes superseded)
---

# NNN. Title in plain words

## Context

What situation or problem forced a choice.

## Decision

What we chose, stated as a rule someone can follow.

## Consequences

What becomes easier, what becomes harder, what to revisit later.
```

---

## Product (`product/`)

Two kinds of document, set with `type` in the frontmatter:

| Type       | Use it for                                                                               |
| ---------- | ---------------------------------------------------------------------------------------- |
| `decision` | A product choice: what we will or won't build, scope, priorities, behaviour.             |
| `note`     | Context worth keeping: research, user feedback, current-state snapshots, open questions. |

**File name:** `NNNN-short-kebab-title.md`, numbered in sequence (`0001`, `0002`, …). Decisions and notes share one sequence.

### Template: product decision

```markdown
---
type: decision
date: YYYY-MM-DD
---

# NNNN. Title in plain words

## Problem

Who is affected and what they can't do today.

## Decision

What we will do, and what is explicitly out of scope.

## Why

The reasoning and the alternatives we turned down.

## Impact

What changes for users and for the team.
```

### Template: product note

```markdown
---
type: note
date: YYYY-MM-DD
---

# NNNN. Title in plain words

Free-form. Lead with the takeaway, then the details.
```

---

## Index

### Decisions

| #                                                               | Title                                        | Status   |
| --------------------------------------------------------------- | -------------------------------------------- | -------- |
| [001](decision/001-pnpm-workspace-monorepo.md)                  | Use a pnpm workspace monorepo                | accepted |
| [002](decision/002-internal-packages-ship-typescript-source.md) | Internal packages ship TypeScript source     | accepted |
| [003](decision/003-file-based-routing-with-tanstack-router.md)  | File-based routing with TanStack Router      | accepted |
| [004](decision/004-validate-api-input-with-zod.md)              | Validate API input with zod                  | accepted |
| [005](decision/005-oxc-lint-format-and-pre-commit-checks.md)    | Lint and format with oxc, check every commit | accepted |
| [006](decision/006-e2e-tests-with-playwright-at-the-root.md)    | E2E tests with Playwright at the root        | accepted |

### Product

| #                                           | Title               | Type |
| ------------------------------------------- | ------------------- | ---- |
| [0001](product/0001-initial-app-surface.md) | Initial app surface | note |
