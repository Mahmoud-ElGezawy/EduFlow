import { Box, Container, Button, Grid } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { I18nLink } from '@/i18n/navigation'
import { useTranslation } from 'react-i18next'
import { useTeacher, useTeacherCourses } from '@/api/hooks/use-teachers'
import { TeacherHero } from '../components/teacher-hero'
import { TeacherAbout } from '../components/teacher-about'
import { TeacherCourses } from '../components/teacher-courses'
import { TeacherReviews } from '../components/teacher-reviews'
import { BookingWidget } from '../components/booking-widget'
import { mockTeacher, mockTeacherSara, mockTeacherCourses, mockTeacherCoursesSara } from '@/api/mock-data'

const MOCK_TEACHERS: Record<string, typeof mockTeacher> = {
  'ahmed-math': mockTeacher,
  'sara-science': mockTeacherSara,
}

const MOCK_COURSES: Record<string, typeof mockTeacherCourses> = {
  'ahmed-math': mockTeacherCourses,
  'sara-science': mockTeacherCoursesSara,
}

export function TeacherPage() {
  const { t } = useTranslation()
  const { teacherSlug } = useParams({ strict: false })
  const slug = teacherSlug ?? ''

  const { data: teacher } = useTeacher({
    variables: { slug },
    enabled: !!slug,
  })
  const { data: courses } = useTeacherCourses({
    variables: { teacherSlug: slug },
    enabled: !!slug,
  })

  const fallbackTeacher = MOCK_TEACHERS[slug] ?? mockTeacher
  const fallbackCourses = MOCK_COURSES[slug] ?? mockTeacherCourses
  const teacherData = teacher ?? fallbackTeacher
  const coursesData = courses ?? fallbackCourses

  const mockReviews = [
    { id: '1', author: 'Omar K.', rating: 5, comment: 'Excellent teacher! Clear explanations and patient.', date: '2025-01-10' },
    { id: '2', author: 'Nora S.', rating: 5, comment: 'Highly recommend. My grades improved significantly.', date: '2025-01-05' },
  ]

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
      <TeacherHero
        name={teacherData.name}
        bio={teacherData.bio}
        avatarUrl={teacherData.avatarUrl}
        courseCount={teacherData.courseCount}
        studentCount={teacherData.studentCount}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TeacherAbout about={teacherData.bio} />
          {coursesData.length > 0 && (
            <TeacherCourses courses={coursesData} />
          )}
          <TeacherReviews reviews={mockReviews} />
          <Box sx={{ py: 4 }}>
            <Button
              variant="contained"
              size="large"
              component={I18nLink}
              to="/subscribe"
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              {t('joinAcademy', { ns: 'teacher' })}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <BookingWidget teacherSlug={slug} />
        </Grid>
      </Grid>
    </Container>
  )
}
