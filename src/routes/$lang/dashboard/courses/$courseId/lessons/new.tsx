import { createFileRoute, useParams } from '@tanstack/react-router'
import { CreateLessonForm } from '@/modules/lessons/components/create-lesson-form'
import { useI18nNavigate } from '@/i18n/navigation'

export const Route = createFileRoute('/$lang/dashboard/courses/$courseId/lessons/new')({
  component: AddLessonPage,
})

function AddLessonPage() {
  const navigate = useI18nNavigate()
  const { courseId } = useParams({ strict: false })

  const handleSubmit = async () => {
    navigate(`/dashboard/courses/${courseId}/lessons`)
  }

  return (
    <CreateLessonForm onSubmit={handleSubmit} />
  )
}
