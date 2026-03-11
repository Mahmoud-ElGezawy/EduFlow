import { Box, Typography, Container, Link as MuiLink } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink, useIsActiveLink } from '@/i18n/navigation'

export function Footer() {
  const { t } = useTranslation()
  const subscribeActive = useIsActiveLink('/subscribe', false)
  const dashboardActive = useIsActiveLink('/dashboard', false)
  const studentActive = useIsActiveLink('/student', false)

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 },
        mt: 'auto',
        backgroundColor: 'grey.50',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t('footer.copyright', { ns: 'common', year: new Date().getFullYear() })}
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap', justifyContent: 'center' }}>
            <MuiLink
              component={I18nLink}
              to="/subscribe"
              color={subscribeActive ? 'primary.main' : 'text.secondary'}
              underline="hover"
              sx={{ fontSize: '0.875rem', fontWeight: subscribeActive ? 600 : 400 }}
            >
              {t('footer.subscribe', { ns: 'common' })}
            </MuiLink>
            <MuiLink
              component={I18nLink}
              to="/dashboard"
              color={dashboardActive ? 'primary.main' : 'text.secondary'}
              underline="hover"
              sx={{ fontSize: '0.875rem', fontWeight: dashboardActive ? 600 : 400 }}
            >
              {t('footer.dashboard', { ns: 'common' })}
            </MuiLink>
            <MuiLink
              component={I18nLink}
              to="/student"
              color={studentActive ? 'primary.main' : 'text.secondary'}
              underline="hover"
              sx={{ fontSize: '0.875rem', fontWeight: studentActive ? 600 : 400 }}
            >
              {t('footer.myCourses', { ns: 'common' })}
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
