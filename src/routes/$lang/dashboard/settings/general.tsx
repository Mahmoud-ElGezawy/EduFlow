import { createFileRoute } from '@tanstack/react-router'
import { GeneralSettingsPage } from '@/modules/settings/pages/general-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/general')({
  component: GeneralSettingsPage,
})
