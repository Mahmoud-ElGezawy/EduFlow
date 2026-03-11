import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/material'
import { ArrowBack as BackIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import type { StudentDetail } from '@/api/mock-data'

interface StudentDetailCardProps {
  student: StudentDetail
}

export function StudentDetailCard({ student }: StudentDetailCardProps) {
  const { t } = useTranslation('dashboard')

  return (
    <Box>
      <Button
        component={I18nLink}
        to="/dashboard/students"
        startIcon={<BackIcon className="rtl-flip" />}
        sx={{ mb: 2 }}
      >
        {t('students.backToList', { defaultValue: 'Back to Students' })}
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {student.name}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {student.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EmailIcon fontSize="small" color="action" />
                <Typography variant="body2">{student.email}</Typography>
              </Box>
            )}
            {student.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2">{student.phone}</Typography>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary">
              {t('students.joinedOn', { defaultValue: 'Joined' })}: {student.joinDate}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {t('students.enrolledCourses', { defaultValue: 'Enrolled Courses' })}
          </Typography>
          {student.enrolledCourses.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              {t('students.noCourses', { defaultValue: 'No courses enrolled' })}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {student.enrolledCourses.map((course) => (
                <Box key={course.id}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.progress}% · {course.completedLessons}/{course.lessonCount} {t('students.lessons', { defaultValue: 'lessons' })}
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={course.progress} sx={{ height: 6, borderRadius: 1 }} />
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {t('students.assignments', { defaultValue: 'Assignments' })}
          </Typography>
          {student.assignments.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              {t('students.noAssignments', { defaultValue: 'No assignments' })}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {student.assignments.map((a) => (
                <Box
                  key={a.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {a.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {a.courseTitle}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {a.grade != null && (
                      <Typography variant="body2" fontWeight={600}>
                        {a.grade}%
                      </Typography>
                    )}
                    <Chip
                      label={a.status}
                      size="small"
                      color={a.status === 'graded' ? 'success' : a.status === 'submitted' ? 'info' : 'default'}
                    />
                    <Button
                      component={I18nLink}
                      to={`/dashboard/assignments/${a.id}`}
                      size="small"
                      variant="outlined"
                    >
                      {t('students.viewDetails', { defaultValue: 'View' })}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
