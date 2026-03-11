import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/student/assignments')({
  component: AssignmentsLayout,
})

function AssignmentsLayout() {
  return <Outlet />
}
