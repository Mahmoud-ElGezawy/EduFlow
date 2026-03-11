import { createFileRoute } from '@tanstack/react-router'
import { SettingsLayout } from '@/modules/settings/components/settings-layout'

export const Route = createFileRoute('/$lang/dashboard/settings')({
  component: SettingsLayout,
})
