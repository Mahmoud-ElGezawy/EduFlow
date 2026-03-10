import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { mockEnrolledCourses } from '@/api/mock-data'
import { PlayArrow as PlayIcon } from '@mui/icons-material'

export const Route = createFileRoute('/$lang/student/courses/')({
  component: StudentCoursesPage,
})

function StudentCoursesPage() {
  const { t } = useTranslation('student')
  const courses = mockEnrolledCourses

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {t('myCourses')}
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {course.title}
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                  {course.teacherName}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t('progress')}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {course.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 1 }} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {course.completedLessons} / {course.lessonCount} {t('lessons')}
                </Typography>
              </CardContent>
              <Box sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
                <Button
                  variant="contained"
                  component={I18nLink}
                  to={`/student/courses/${course.id}`}
                  startIcon={<PlayIcon />}
                  fullWidth
                >
                  {t('continueLearning')}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
