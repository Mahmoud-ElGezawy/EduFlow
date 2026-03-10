import { Box, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'

export function CallToAction() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4 },
        textAlign: 'center',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(13, 148, 136, 0.35)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {t('cta.title', { ns: 'home' })}
        </Typography>
        <Typography sx={{ mb: 4, opacity: 0.95, fontSize: '1.125rem', maxWidth: 500, mx: 'auto' }}>
          {t('cta.subtitle', { ns: 'home' })}
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={I18nLink}
          to="/subscribe"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.15)',
            '&:hover': {
              backgroundColor: 'grey.100',
              boxShadow: '0 6px 20px 0 rgba(0,0,0,0.2)',
            },
          }}
        >
          {t('cta.button', { ns: 'home' })}
        </Button>
      </Box>
    </Box>
  )
}
