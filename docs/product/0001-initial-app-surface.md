---
type: note
date: 2026-10-12
---

# 0001. Initial app surface

**Takeaway:** nothing user-facing exists yet. Both apps are scaffolds, and the platform doesn't call the api.

## Platform (web)

| Page  | Path     | State               |
| ----- | -------- | ------------------- |
| Home  | `/`      | Placeholder heading |
| About | `/about` | Placeholder heading |

## API

| Endpoint           | What it does                                                                    |
| ------------------ | ------------------------------------------------------------------------------- |
| `GET /health`      | Returns `{ status: "ok" }`                                                      |
| `GET /hello?name=` | Returns a greeting. `name` defaults to `world`.                                 |
| `POST /users`      | Checks `{ name, email }` and echoes it back with a new `id`. Nothing is stored. |

## Open questions

- Who is the platform for, and what is the first thing they should be able to do?
- What should a user record hold, and where is it stored?
