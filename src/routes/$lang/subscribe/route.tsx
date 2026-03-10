import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/subscribe')({
  component: SubscribeLayout,
})

function SubscribeLayout() {
  return <Outlet />
}
