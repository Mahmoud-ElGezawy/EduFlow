import { createFileRoute } from '@tanstack/react-router'
import { BookingDashboard } from '@/modules/booking/pages/booking-dashboard'

export const Route = createFileRoute('/$lang/dashboard/booking/')({
  component: BookingDashboard,
})
