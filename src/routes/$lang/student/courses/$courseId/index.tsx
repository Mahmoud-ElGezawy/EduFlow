import { createFileRoute, useParams, useLocation } from '@tanstack/react-router'
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink, getPathWithoutLang, isPathActive } from '@/i18n/navigation'
import { mockLessons, mockCourse, mockEnrolledCourses } from '@/api/mock-data'
import { PlayCircle as VideoIcon, Quiz as QuizIcon, PictureAsPdf as PdfIcon, Assignment as AssignmentIcon } from '@mui/icons-material'

export const Route = createFileRoute('/$lang/student/courses/$courseId/')({
  component: StudentCourseDetailPage,
})

const LESSON_ICONS: Record<string, React.ComponentType<{ sx?: object }>> = {
  video: VideoIcon,
  quiz: QuizIcon,
  pdf: PdfIcon,
  assignment: AssignmentIcon,
}

function StudentCourseDetailPage() {
  const { t } = useTranslation('student')
  const { pathname } = useLocation()
  const pathWithoutLang = getPathWithoutLang(pathname)
  const { courseId } = useParams({ strict: false })
  const course = mockEnrolledCourses.find((c) => c.id === courseId) ?? {
    id: courseId ?? '',
    title: mockCourse.title,
    teacherName: 'Ahmed Hassan',
    progress: 0,
    lessonCount: mockLessons.length,
    completedLessons: 0,
  }
  const lessons = mockLessons.sort((a, b) => a.order - b.order)

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        {course.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {course.teacherName}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('lessons')}
      </Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        {lessons.map((lesson, idx) => {
          const Icon = LESSON_ICONS[lesson.type] ?? VideoIcon
          const lessonPath = `/student/courses/${courseId}/lessons/${lesson.id}`
          const active = isPathActive(pathWithoutLang, lessonPath, true)
          return (
            <ListItem key={lesson.id} disablePadding divider={idx < lessons.length - 1}>
              <ListItemButton
                component={I18nLink}
                to={lessonPath}
                selected={active}
                sx={{
                  ...(active && {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': { color: 'inherit' },
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={lesson.title}
                  secondary={lesson.duration ? `${lesson.duration} min` : undefined}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
