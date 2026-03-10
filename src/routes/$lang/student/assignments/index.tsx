import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { mockStudentAssignments } from '@/api/mock-data'
import { Assignment as AssignmentIcon } from '@mui/icons-material'

export const Route = createFileRoute('/$lang/student/assignments/')({
  component: StudentAssignmentsPage,
})

function StudentAssignmentsPage() {
  const { t } = useTranslation('student')
  const assignments = mockStudentAssignments

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {t('assignments')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {assignments.map((a) => (
          <Card key={a.id}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssignmentIcon color="action" />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {a.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.courseTitle} · {t('due')}: {a.dueDate}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={a.status === 'submitted' ? t('submitted') : t('pending')}
                  color={a.status === 'submitted' ? 'success' : 'default'}
                  size="small"
                />
                {a.status === 'pending' && (
                  <Button variant="contained" size="small" component={I18nLink} to="/student/courses/1">
                    {t('submit')}
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
