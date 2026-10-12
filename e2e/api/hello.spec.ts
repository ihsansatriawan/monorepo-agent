import { expect, test } from '@playwright/test'

test('GET /hello defaults the name to "world"', async ({ request }) => {
  const res = await request.get('/hello')

  expect(res.status()).toBe(200)
  expect(await res.json()).toEqual({ message: 'Hello, world!' })
})

test('GET /hello greets by the given name', async ({ request }) => {
  const res = await request.get('/hello', { params: { name: 'Ihsan' } })

  expect(res.status()).toBe(200)
  expect(await res.json()).toEqual({ message: 'Hello, Ihsan!' })
})
