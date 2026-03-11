import { createFileRoute } from '@tanstack/react-router'
import { NotificationsSettingsPage } from '@/modules/settings/pages/notifications-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/notifications')({
  component: NotificationsSettingsPage,
})
