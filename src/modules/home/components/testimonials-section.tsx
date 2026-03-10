import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormatQuote as QuoteIcon } from '@mui/icons-material'

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {t('testimonials.title', { ns: 'home' })}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}>
          {t('testimonials.subtitle', { ns: 'home' })}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <QuoteIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.3, mb: 1 }} />
                <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8, mb: 2 }}>
                  "{t(`testimonials.quotes.${i}.text`, { ns: 'home' })}"
                </Typography>
                <Typography color="text.secondary" fontWeight={600}>
                  — {t(`testimonials.quotes.${i}.author`, { ns: 'home' })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
