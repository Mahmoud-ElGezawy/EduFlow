import { createFileRoute } from '@tanstack/react-router'
import { TeacherPage } from '@/modules/teacher-public/pages/teacher-page'

export const Route = createFileRoute('/$lang/teacher/$teacherSlug')({
  head: () => ({
    meta: [
      { title: 'Teacher Academy - SaaS LMS' },
      { name: 'description', content: 'Browse courses from this teacher.' },
    ],
  }),
  component: TeacherPage,
})
