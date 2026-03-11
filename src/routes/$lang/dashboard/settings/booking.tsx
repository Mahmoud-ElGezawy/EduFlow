import { createFileRoute } from '@tanstack/react-router'
import { BookingSettingsPage } from '@/modules/settings/pages/booking-settings'

export const Route = createFileRoute('/$lang/dashboard/settings/booking')({
  component: BookingSettingsPage,
})
