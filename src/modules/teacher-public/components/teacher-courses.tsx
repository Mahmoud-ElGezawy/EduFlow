import { Box, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CourseCard } from './course-card'
import type { TeacherCourse } from '@/api/resources/teachers.resource'

interface TeacherCoursesProps {
  courses: TeacherCourse[]
  teacherSlug: string
}

export function TeacherCourses({ courses }: TeacherCoursesProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t('courses', { ns: 'teacher' })}
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard
              slug={course.slug}
              title={course.title}
              thumbnail={course.thumbnail}
              price={course.price}
              studentCount={course.studentCount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
