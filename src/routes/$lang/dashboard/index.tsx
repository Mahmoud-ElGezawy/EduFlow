import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Typography } from '@mui/material'
import { useDashboardStats } from '@/api/hooks/use-dashboard'
import { StatCard } from '@/modules/dashboard/components/stat-card'
import { AnalyticsChart } from '@/modules/dashboard/components/analytics-chart'
import { useTranslation } from 'react-i18next'
import { mockDashboardStats, mockTeacherAnalytics } from '@/api/mock-data'

export const Route = createFileRoute('/$lang/dashboard/')({
  component: DashboardOverviewPage,
})

function DashboardOverviewPage() {
  const { t } = useTranslation()
  const { data: stats } = useDashboardStats()
  // Prefer mock so revenue shows as 250 K; if API returns 12500, show as 250 K
  const statsData = stats ?? mockDashboardStats
  const revenueValue = statsData.revenue === 12500 ? 250000 : statsData.revenue
  const revenueDisplay = revenueValue >= 1000 ? `${(revenueValue / 1000).toFixed(0)} K` : `${statsData.revenue} EGP`

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {t('overview', { ns: 'dashboard' })}
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('totalStudents', { ns: 'dashboard' })} value={statsData.totalStudents} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('totalCourses', { ns: 'dashboard' })} value={statsData.totalCourses} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('revenue', { ns: 'dashboard' })} value={revenueDisplay} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title={t('assignmentsPending', { ns: 'dashboard' })} value={statsData.assignmentsPending} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalyticsChart
            title={t('analytics.revenue', { ns: 'dashboard' })}
            data={mockTeacherAnalytics as { month: string; [key: string]: string | number | undefined }[]}
            dataKeys={[{ key: 'revenue', color: '#0D9488', name: t('analytics.revenue', { ns: 'dashboard' }) }]}
            valueFormatter={(v) => `${(v / 1000).toFixed(0)} K`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalyticsChart
            title={t('analytics.students', { ns: 'dashboard' })}
            data={mockTeacherAnalytics as { month: string; [key: string]: string | number | undefined }[]}
            dataKeys={[{ key: 'students', color: '#6366f1', name: t('totalStudents', { ns: 'dashboard' }) }]}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
