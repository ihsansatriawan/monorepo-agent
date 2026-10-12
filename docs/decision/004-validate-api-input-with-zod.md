---
status: accepted
date: 2026-10-12
---

# 004. Validate API input with zod

## Context

API handlers receive untrusted input in query strings, JSON bodies and route params.

## Decision

Every endpoint that reads input declares a zod schema and validates it with `zValidator(target, schema)` from `@hono/zod-validator`. Handlers read input only through `c.req.valid(target)`, never directly through `c.req.json()` or `c.req.query()`.

## Consequences

- Invalid input gets a 400 before the handler runs, and the handler's input types come from the schema.
- The default 400 body is zod's raw error (`{ success: false, error: ZodError }`). It is verbose and shows schema details to clients. For a consistent error shape, pass a hook as the third argument to `zValidator`. That would be a separate decision.
