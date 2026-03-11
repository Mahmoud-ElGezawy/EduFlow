import { Box, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CourseCard } from './course-card'

export interface TeacherCourseItem {
  id: string
  slug: string
  title: string
  thumbnail?: string
  price: number
  studentCount: number
  description?: string
}

interface TeacherCoursesProps {
  courses: TeacherCourseItem[]
  /** Optional id for anchor link (e.g. "courses") */
  id?: string
}

export function TeacherCourses({ courses, id: sectionId }: TeacherCoursesProps) {
  const { t } = useTranslation()
  return (
    <Box id={sectionId} sx={{ py: 4 }} component="section">
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
              description={course.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
