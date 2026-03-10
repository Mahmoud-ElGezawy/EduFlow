import { createFileRoute } from '@tanstack/react-router'
import { CreateCourseForm } from '@/modules/courses/components/create-course-form'
import { useCreateCourse } from '@/api/hooks/use-courses'
import { useI18nNavigate } from '@/i18n/navigation'

export const Route = createFileRoute('/$lang/dashboard/courses/new')({
  component: CreateCoursePage,
})

function CreateCoursePage() {
  const navigate = useI18nNavigate()
  const createCourse = useCreateCourse()

  const handleSubmit = async (data: {
    title: string
    description: string
    price: number
    grade?: string
    category?: string
  }) => {
    try {
      await createCourse.mutateAsync(data)
      navigate('/dashboard/courses')
    } catch {
      // Handle error - for now with mock API it will fail
    }
  }

  return (
    <CreateCourseForm onSubmit={handleSubmit} />
  )
}
