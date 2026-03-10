import { createFileRoute } from '@tanstack/react-router'
import { CourseDetailsPage } from '@/modules/courses/pages/course-details-page'

export const Route = createFileRoute('/$lang/course/$courseSlug')({
  head: () => ({
    meta: [
      { title: 'Course Details - SaaS LMS' },
      { name: 'description', content: 'View course details and enroll.' },
    ],
  }),
  component: CourseDetailsPage,
})
