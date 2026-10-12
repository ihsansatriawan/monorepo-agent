import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { createLogger } from '@repo/logger'
import { Hono } from 'hono'
import { z } from 'zod'

const log = createLogger({ name: 'api', level: 'debug' })

const app = new Hono()

// Request logging
app.use(async (c, next) => {
  const start = performance.now()
  await next()
  log.info(`${c.req.method} ${c.req.path}`, {
    status: c.res.status,
    ms: Math.round(performance.now() - start),
  })
})

app.get('/health', (c) => c.json({ status: 'ok' }))

// Query validation: GET /hello?name=Ihsan
app.get(
  '/hello',
  zValidator('query', z.object({ name: z.string().min(1).default('world') })),
  (c) => {
    const { name } = c.req.valid('query')
    return c.json({ message: `Hello, ${name}!` })
  },
)

// JSON body validation: POST /users { "name": "...", "email": "..." }
const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
})

app.post('/users', zValidator('json', createUserSchema), (c) => {
  const user = c.req.valid('json')
  return c.json({ id: crypto.randomUUID(), ...user }, 201)
})

const port = Number(process.env.PORT ?? 3000)

serve({ fetch: app.fetch, port }, (info) => {
  log.info(`Listening on http://localhost:${info.port}`)
})
