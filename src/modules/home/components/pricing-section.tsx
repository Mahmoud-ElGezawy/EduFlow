import { Box, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useI18nNavigate } from '@/i18n/navigation'
import { PricingCard } from './pricing-card'

const PLAN_KEYS = ['starter', 'pro', 'academy'] as const

export function PricingSection() {
  const { t } = useTranslation()
  const navigate = useI18nNavigate()

  const getFeatures = (planKey: string) => {
    const features = t(`pricing.plans.${planKey}.features`, { ns: 'home', returnObjects: true }) as string[]
    return Array.isArray(features) ? features : []
  }

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }} id="pricing">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {t('pricing.title', { ns: 'home' })}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}>
          {t('pricing.subtitle', { ns: 'home' })}
        </Typography>
      </Box>
      <Grid container spacing={4} alignItems="stretch">
        {PLAN_KEYS.map((planKey) => (
          <Grid item xs={12} md={4} key={planKey}>
            <PricingCard
              title={t(`pricing.plans.${planKey}.name`, { ns: 'home' })}
              price={t(`pricing.plans.${planKey}.price`, { ns: 'home' })}
              features={getFeatures(planKey)}
              ctaText={t(`pricing.plans.${planKey}.cta`, { ns: 'home' })}
              onCtaClick={() => navigate('/subscribe')}
              highlighted={planKey === 'pro'}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
