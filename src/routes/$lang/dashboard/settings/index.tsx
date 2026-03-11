import { createFileRoute, Navigate, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/dashboard/settings/')({
  component: SettingsIndexRedirect,
})

function SettingsIndexRedirect() {
  const params = useParams({ strict: false })
  const lang = params?.lang ?? 'ar'
  return <Navigate to="/$lang/dashboard/settings/general" params={{ lang }} />
}
