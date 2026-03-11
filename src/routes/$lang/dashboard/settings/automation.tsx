import { createFileRoute } from '@tanstack/react-router'
import { AutomationSettingsPage } from '@/modules/settings/pages/automation-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/automation')({
  component: AutomationSettingsPage,
})
