import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/dashboard/students')({
  component: StudentsLayout,
})

function StudentsLayout() {
  return <Outlet />
}
