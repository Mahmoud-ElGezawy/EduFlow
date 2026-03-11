import { createFileRoute } from '@tanstack/react-router'
import { IntegrationsSettingsPage } from '@/modules/settings/pages/integrations-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/integrations')({
  component: IntegrationsSettingsPage,
})
