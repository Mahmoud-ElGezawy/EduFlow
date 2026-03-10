import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/modules/dashboard/components/dashboard-layout'

export const Route = createFileRoute('/$lang/dashboard')({
  head: () => ({
    meta: [
      { title: 'Dashboard - SaaS LMS' },
      { name: 'description', content: 'Manage your academy dashboard.' },
    ],
  }),
  component: DashboardLayout,
})
