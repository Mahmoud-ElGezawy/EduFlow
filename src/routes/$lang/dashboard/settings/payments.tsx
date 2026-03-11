import { createFileRoute } from '@tanstack/react-router'
import { PaymentsSettingsPage } from '@/modules/settings/pages/payments-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/payments')({
  component: PaymentsSettingsPage,
})
