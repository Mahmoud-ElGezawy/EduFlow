import { createFileRoute } from '@tanstack/react-router'
import { StudentLayout } from '@/modules/student/components/student-layout'

export const Route = createFileRoute('/$lang/student')({
  component: StudentLayout,
})
