import { Box, Typography, Button, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { School as SchoolIcon } from '@mui/icons-material'
import { I18nLink } from '@/i18n/navigation'

export function HeroSection() {
  const { t } = useTranslation('home')

  return (
    <Box
      sx={{
        py: { xs: 6, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.04) 0%, rgba(245, 158, 11, 0.04) 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              mb: 2,
              borderRadius: 100,
              backgroundColor: 'primary.main',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <SchoolIcon sx={{ fontSize: 20 }} />
            {t('hero.badge')}
          </Box>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.15,
              color: 'text.primary',
            }}
          >
            {t('hero.title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: 520,
              mb: 4,
            }}
          >
            {t('hero.subtitle')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={I18nLink}
            to="/subscribe"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 2,
              boxShadow: '0 4px 14px 0 rgba(13, 148, 136, 0.35)',
              '&:hover': {
                boxShadow: '0 6px 20px 0 rgba(13, 148, 136, 0.4)',
              },
            }}
          >
            {t('hero.cta')}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: { xs: 280, md: 360 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 50%, #2DD4BF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(13, 148, 136, 0.25)',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              },
            }}
          >
            <Box
              sx={{
                fontSize: 120,
                opacity: 0.3,
                color: 'white',
              }}
            >
              <SchoolIcon sx={{ fontSize: 'inherit' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
