import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
          Home
        </Link>
        <Link to="/about" activeProps={{ style: { fontWeight: 'bold' } }}>
          About
        </Link>
      </nav>
      <hr />
      <main style={{ padding: 12 }}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  )
}
