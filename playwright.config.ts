import { defineConfig, devices } from '@playwright/test'

const API_PORT = 3000
const PLATFORM_PORT = 5173
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      // HTTP-only tests: uses the `request` fixture, no browser
      name: 'api',
      testDir: './e2e/api',
      use: { baseURL: `http://localhost:${API_PORT}` },
    },
    {
      name: 'platform',
      testDir: './e2e/platform',
      use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PLATFORM_PORT}` },
    },
  ],

  // Starts both apps before the tests. Locally, reuses servers already running from `pnpm dev`.
  webServer: [
    {
      command: 'pnpm --filter @repo/api start',
      url: `http://localhost:${API_PORT}/health`,
      env: { PORT: String(API_PORT) },
      reuseExistingServer: !isCI,
    },
    {
      command: `pnpm --filter @repo/platform dev --port ${PLATFORM_PORT} --strictPort`,
      url: `http://localhost:${PLATFORM_PORT}`,
      reuseExistingServer: !isCI,
    },
  ],
})
