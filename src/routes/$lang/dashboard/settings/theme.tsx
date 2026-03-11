import { createFileRoute } from '@tanstack/react-router'
import { ThemeSettingsPage } from '@/modules/settings/pages/theme-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/theme')({
  component: ThemeSettingsPage,
})
