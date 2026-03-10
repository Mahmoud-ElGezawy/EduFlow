import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/modules/home/pages/home-page'

export const Route = createFileRoute('/$lang/')({
  head: () => ({
    meta: [
      { title: 'SaaS LMS - Create Your Academy' },
      { name: 'description', content: 'Create and manage your online academy. Reach students and grow your impact.' },
    ],
  }),
  component: HomePage,
})
