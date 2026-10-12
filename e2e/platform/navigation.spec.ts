import { expect, test } from '@playwright/test'

test('home page renders', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: 'Home' })).toBeVisible()
})

test('nav link goes to the about page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'About' }).click()

  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible()
})

test('about page loads directly by URL', async ({ page }) => {
  await page.goto('/about')

  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible()
})
