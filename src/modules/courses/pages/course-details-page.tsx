import { Box, Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { useCourse, useCourseLessons } from '@/api/hooks/use-courses'
import { mockCourse, mockLessons } from '@/api/mock-data'

const LESSON_TYPE_LABELS: Record<string, string> = {
  video: 'Video',
  quiz: 'Quiz',
  pdf: 'PDF',
  assignment: 'Assignment',
}

export function CourseDetailsPage() {
  const { t } = useTranslation('course')
  const { courseSlug } = useParams({ strict: false })
  const slug = courseSlug ?? ''

  const { data: course } = useCourse({
    variables: { slug },
    enabled: !!slug,
  })
  const courseData = course ?? mockCourse
  const { data: lessons } = useCourseLessons({
    variables: { courseId: courseData.id },
    enabled: !!courseData.id,
  })
  const lessonsData = lessons ?? mockLessons

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {courseData.title}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {courseData.description}
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          {courseData.price} EGP
        </Typography>

        {lessonsData && lessonsData.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('lessons')}
            </Typography>
            <List>
              {lessonsData
                .sort((a, b) => a.order - b.order)
                .map((lesson) => (
                  <ListItem key={lesson.id}>
                    <ListItemText
                      primary={lesson.title}
                      secondary={`${LESSON_TYPE_LABELS[lesson.type] ?? lesson.type}${lesson.duration ? ` · ${lesson.duration} min` : ''}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        )}

        <Button
          variant="contained"
          size="large"
          component={I18nLink}
          to="/student/courses"
          sx={{ mt: 4 }}
        >
          {t('enrollNow')}
        </Button>
      </Box>
    </Container>
  )
}
