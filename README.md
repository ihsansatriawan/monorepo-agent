# monorepo-agent

A pnpm workspace with a Hono API, a React web app, and a shared logger.

| Package           | What it is                                               |
| ----------------- | -------------------------------------------------------- |
| `apps/api`        | HTTP API: Hono, with zod input validation (`zValidator`) |
| `apps/platform`   | Web app: React, Vite, TanStack Router (file-based)       |
| `packages/logger` | Small console logger shared by both apps                 |

## Requirements

- **Node.js:** developed on v26.
- **pnpm 11:** the exact version is pinned in `packageManager` in `package.json`.

## Getting started

```bash
git clone git@github.com:ihsansatriawan/monorepo-agent.git
cd monorepo-agent

pnpm install                            # also installs the git hooks
pnpm exec playwright install chromium   # once per machine, for e2e tests

pnpm dev                                # starts api and platform together
```

- API: http://localhost:3000
- Platform: http://localhost:5173

## Project structure

```
.
├── apps/
│   ├── api/                 # @repo/api
│   │   └── src/index.ts     # routes and server
│   └── platform/            # @repo/platform
│       └── src/
│           ├── main.tsx
│           ├── routes/      # one file per page
│           └── routeTree.gen.ts   # generated, don't edit
├── packages/
│   └── logger/              # @repo/logger
├── e2e/                     # Playwright tests
│   ├── api/
│   └── platform/
├── docs/                    # decision records and product docs
├── playwright.config.ts
├── pnpm-workspace.yaml      # workspace globs and shared version catalog
└── tsconfig.base.json       # TypeScript settings every package extends
```

## Scripts

Run these from the repo root.

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `pnpm dev`             | Start api and platform in watch mode          |
| `pnpm dev:api`         | Start only the api                            |
| `pnpm dev:platform`    | Start only the platform                       |
| `pnpm build`           | Build every package that has a `build` script |
| `pnpm typecheck`       | Type-check every package and `e2e/`           |
| `pnpm lint`            | Lint with oxlint (warnings fail too)          |
| `pnpm lint:fix`        | Lint and apply automatic fixes                |
| `pnpm format`          | Format with oxfmt                             |
| `pnpm format:check`    | Check formatting without writing              |
| `pnpm test:e2e`        | Run the Playwright suite                      |
| `pnpm test:e2e:ui`     | Open Playwright's interactive UI              |
| `pnpm test:e2e:report` | Open the last HTML report                     |

## Apps

### api

Runs from TypeScript source with `tsx`. There is no compile step. The port comes from `PORT` and defaults to `3000`.

| Endpoint           | What it does                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| `GET /health`      | Returns `{ "status": "ok" }`                                           |
| `GET /hello?name=` | Returns a greeting. `name` defaults to `world`.                        |
| `POST /users`      | Validates `{ name, email }` and echoes it with a new `id` (no storage) |

```bash
curl -X POST localhost:3000/users \
  -H 'content-type: application/json' \
  -d '{"name":"Ihsan","email":"ihsan@example.com"}'
```

Every endpoint that reads input validates it with a zod schema through `zValidator`, and handlers read it with `c.req.valid(...)`. Invalid input gets a `400`.

### platform

To add a page, add a file to `apps/platform/src/routes/`. The TanStack Router plugin regenerates `routeTree.gen.ts` while `dev` or `build` runs. Commit that file, but don't edit it.

## Shared packages

Workspace packages ship TypeScript source with no build step. Each app compiles them itself.

```ts
import { createLogger } from '@repo/logger'

const log = createLogger({ name: 'api', level: 'debug' })
log.info('Listening', { port: 3000 })

const dbLog = log.child('db') // prefix: [api:db]
```

To add a package:

1. Create `packages/<name>/package.json` with `"name": "@repo/<name>"` and `"exports": { ".": "./src/index.ts" }`.
2. In each app that uses it, add `"@repo/<name>": "workspace:*"` to `dependencies`.
3. Run `pnpm install`.

## Working in the workspace

```bash
pnpm --filter @repo/api <script>        # run a script in one package
pnpm --filter @repo/platform add <dep>  # add a dependency to one package
pnpm add -D -w <dep>                    # add a dev tool at the root
```

If several packages use the same dependency, put its version in the `catalog:` section of `pnpm-workspace.yaml` and reference it as `"catalog:"` in each `package.json`.

## Testing

End-to-end tests use Playwright and live in `e2e/`. There is one project per app:

- **`api`:** HTTP requests only, no browser.
- **`platform`:** runs in Chromium.

`pnpm test:e2e` starts both apps for you. If `pnpm dev` is already running, it reuses those servers. To run a single project:

```bash
pnpm test:e2e --project=api
```

## Code quality

The Husky pre-commit hook runs `lint`, then `typecheck`, then `build`, and stops at the first failure.

Formatting is not checked on commit, so run `pnpm format` before committing or enable format on save in your editor. E2E tests aren't part of the hook either, so run `pnpm test:e2e` before pushing.

## Docs

`docs/` holds the reasoning behind the code:

- **`docs/decision/`:** technical decision records. Each is `accepted`, `superseded` or `deprecated`.
- **`docs/product/`:** product decisions and notes.

See [`docs/README.md`](docs/README.md) for the conventions and an index.
