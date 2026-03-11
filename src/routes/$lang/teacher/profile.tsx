import { createFileRoute } from '@tanstack/react-router'
import { TeacherProfilePage } from '@/modules/teacher-public/pages/teacher-profile-page'

export const Route = createFileRoute('/$lang/teacher/profile')({
  head: () => ({
    meta: [
      { title: 'Teacher Profile - SaaS LMS' },
      { name: 'description', content: 'View the teacher\'s public profile, courses, sessions, and more.' },
    ],
  }),
  component: TeacherProfilePage,
})
