import { expect, test } from '@playwright/test'

test('POST /users creates a user from a valid body', async ({ request }) => {
  const res = await request.post('/users', {
    data: { name: 'Ihsan', email: 'ihsan@example.com' },
  })

  expect(res.status()).toBe(201)
  expect(await res.json()).toEqual({
    id: expect.any(String),
    name: 'Ihsan',
    email: 'ihsan@example.com',
  })
})

test('POST /users rejects an invalid body with 400', async ({ request }) => {
  const res = await request.post('/users', {
    data: { name: '', email: 'not-an-email' },
  })

  expect(res.status()).toBe(400)
  expect(await res.json()).toMatchObject({ success: false })
})
