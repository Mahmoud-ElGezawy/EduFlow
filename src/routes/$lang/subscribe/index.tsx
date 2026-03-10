import { createFileRoute, useLocation } from '@tanstack/react-router'
import { Box, Typography, Container, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getI18nHref } from '@/i18n/navigation'
import { getLangFromPath } from '@/i18n/resource'
import { Check as CheckIcon } from '@mui/icons-material'

export const Route = createFileRoute('/$lang/subscribe/')({
  head: () => ({
    meta: [
      { title: 'Subscribe - SaaS LMS' },
      { name: 'description', content: 'Subscribe to create your academy.' },
    ],
  }),
  component: SubscribePage,
})

const PLAN_KEYS = ['starter', 'pro', 'academy'] as const

function SubscribePage() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const lang = getLangFromPath(pathname)

  const getFeatures = (planKey: string) => {
    const features = t(`pricing.plans.${planKey}.features`, { ns: 'home', returnObjects: true }) as string[]
    return Array.isArray(features) ? features : []
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            {t('subscribe.title', { ns: 'common', defaultValue: 'Create Your Academy' })}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('subscribe.subtitle', { ns: 'common', defaultValue: 'Choose a plan and start teaching online today.' })}
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="stretch">
          {PLAN_KEYS.map((planKey) => (
            <Grid item xs={12} md={4} key={planKey}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: planKey === 'pro' ? 2 : 0,
                  borderColor: 'primary.main',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {t(`pricing.plans.${planKey}.name`, { ns: 'home' })}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 800, my: 2 }}>
                    {t(`pricing.plans.${planKey}.price`, { ns: 'home' })}
                  </Typography>
                  <List dense>
                    {getFeatures(planKey).map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} primaryTypographyProps={{ sx: { fontSize: '0.95rem' } }} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardContent sx={{ pt: 0 }}>
                  <Button
                    variant={planKey === 'pro' ? 'contained' : 'outlined'}
                    fullWidth
                    component="a"
                    href={`${getI18nHref('/subscribe/checkout', lang)}?plan=${planKey}`}
                    size="large"
                    sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                  >
                    {t(`pricing.plans.${planKey}.cta`, { ns: 'home' })}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
