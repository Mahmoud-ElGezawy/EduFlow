import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import {
  Settings as GeneralIcon,
  EventAvailable as BookingIcon,
  Payment as PaymentsIcon,
  Notifications as NotificationsIcon,
  Palette as ThemeIcon,
  IntegrationInstructions as IntegrationsIcon,
  Rule as AutomationIcon,
} from '@mui/icons-material'
import { Outlet, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { I18nLink, getPathWithoutLang, isPathActive } from '@/i18n/navigation'

const SETTINGS_ITEMS = [
  { to: '/dashboard/settings/general', icon: GeneralIcon, labelKey: 'settings.nav.general' },
  { to: '/dashboard/settings/booking', icon: BookingIcon, labelKey: 'settings.nav.booking' },
  { to: '/dashboard/settings/payments', icon: PaymentsIcon, labelKey: 'settings.nav.payments' },
  { to: '/dashboard/settings/notifications', icon: NotificationsIcon, labelKey: 'settings.nav.notifications' },
  { to: '/dashboard/settings/theme', icon: ThemeIcon, labelKey: 'settings.nav.theme' },
  { to: '/dashboard/settings/integrations', icon: IntegrationsIcon, labelKey: 'settings.nav.integrations' },
  { to: '/dashboard/settings/automation', icon: AutomationIcon, labelKey: 'settings.nav.automation' },
]

export function SettingsLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const pathWithoutLang = getPathWithoutLang(pathname)

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('settings', { ns: 'dashboard' })}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box
          sx={{
            width: { xs: '100%', md: 220 },
            flexShrink: 0,
          }}
        >
          <List sx={{ py: 0, px: 0 }}>
            {SETTINGS_ITEMS.map((item) => {
              const selected = isPathActive(pathWithoutLang ?? '', item.to)
              return (
              <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={I18nLink}
                  to={item.to}
                  selected={selected}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    ...(selected && {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'inherit' },
                      '&:hover': { backgroundColor: 'primary.dark' },
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }),
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <item.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t(item.labelKey, { ns: 'dashboard' })}
                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
              )
            })}
          </List>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
