import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  VideoLibrary as VideoIcon,
  People as PeopleIcon,
  TrendingUp as RevenueIcon,
} from '@mui/icons-material'

const benefits = [
  { key: 'easyCreation', icon: VideoIcon, color: '#0D9488' },
  { key: 'studentManagement', icon: PeopleIcon, color: '#8B5CF6' },
  { key: 'revenueTracking', icon: RevenueIcon, color: '#F59E0B' },
]

export function BenefitsSection() {
  const { t } = useTranslation()

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          {t('benefits.title', { ns: 'home' })}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}
        >
          {t('benefits.subtitle', { ns: 'home' })}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {benefits.map((benefit) => (
          <Grid item xs={12} md={4} key={benefit.key}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  '& .benefit-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Box
                  className="benefit-icon"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    backgroundColor: `${benefit.color}15`,
                    color: benefit.color,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <benefit.icon sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {t(`benefits.${benefit.key}.title`, { ns: 'home' })}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t(`benefits.${benefit.key}.description`, { ns: 'home' })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
