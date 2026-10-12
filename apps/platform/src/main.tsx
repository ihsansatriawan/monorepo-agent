import { createLogger } from '@repo/logger'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen'

const log = createLogger({ name: 'platform', level: 'debug' })

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

router.subscribe('onResolved', ({ toLocation }) => {
  log.debug('navigated', { path: toLocation.pathname })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
