import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Card, CardContent, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { mockEnrolledCourses, mockStudentAssignments, mockStudentAnalytics } from '@/api/mock-data'
import { AnalyticsChart } from '@/modules/dashboard/components/analytics-chart'

export const Route = createFileRoute('/$lang/student/')({
  component: StudentOverviewPage,
})

function StudentOverviewPage() {
  const { t } = useTranslation('student')
  const enrolledCount = mockEnrolledCourses.length
  const pendingAssignments = mockStudentAssignments.filter((a) => a.status === 'pending').length
  const avgProgress =
    mockEnrolledCourses.length > 0
      ? Math.round(
          mockEnrolledCourses.reduce((acc, c) => acc + c.progress, 0) / mockEnrolledCourses.length
        )
      : 0

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('overview')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {t('enrolledCourses')}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {enrolledCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {t('pendingAssignments')}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {pendingAssignments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {t('avgProgress')}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {avgProgress}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalyticsChart
            title={t('progressChart')}
            data={mockStudentAnalytics as { month: string; [key: string]: string | number | undefined }[]}
            dataKeys={[{ key: 'progress', color: '#0D9488', name: t('avgProgress') }]}
            valueFormatter={(v) => `${v}%`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalyticsChart
            title={t('enrolledCourses')}
            data={mockStudentAnalytics as { month: string; [key: string]: string | number | undefined }[]}
            dataKeys={[{ key: 'enrollments', color: '#6366f1', name: t('enrolledCourses') }]}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
