import { Box, Drawer, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  School as CoursesIcon,
  People as StudentsIcon,
  Assignment as AssignmentsIcon,
  EventAvailable as BookingIcon,
  Payment as PaymentsIcon,
  Settings as SettingsIcon,
  Public as PublicIcon,
} from '@mui/icons-material'
import { Fragment } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { I18nLink, getPathWithoutLang, isPathActive } from '@/i18n/navigation'

const SIDEBAR_WIDTH = 260
const SIDEBAR_WIDTH_MOBILE = 'min(280px, 85vw)'

const items = [
  { to: '/dashboard', icon: DashboardIcon, labelKey: 'overview', exact: true },
  { to: '/dashboard/courses', icon: CoursesIcon, labelKey: 'courses' },
  { to: '/dashboard/students', icon: StudentsIcon, labelKey: 'students' },
  { to: '/dashboard/booking', icon: BookingIcon, labelKey: 'booking' },
  { to: '/dashboard/assignments', icon: AssignmentsIcon, labelKey: 'assignments' },
  { to: '/dashboard/payments', icon: PaymentsIcon, labelKey: 'payments' },
  { to: '/dashboard/settings', icon: SettingsIcon, labelKey: 'settings' },
  { to: '/teacher/profile', icon: PublicIcon, labelKey: 'viewMyPlatform', external: true },
]

const sidebarContent = (
  pathWithoutLang: string,
  t: (key: string, opts?: { ns?: string }) => string
) => (
  <List sx={{ py: 2, px: 1 }}>
    {items.map((item) => {
      const isExternal = 'external' in item && item.external
      const selected = !isExternal && isPathActive(pathWithoutLang ?? '', item.to, item.exact)
      const linkProps = isExternal ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}
      return (
      <Fragment key={item.to}>
        {isExternal && <Divider sx={{ my: 1, mx: 1 }} />}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          component={I18nLink}
          to={item.to}
          {...linkProps}
          selected={selected}
          sx={{
            borderRadius: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': { color: 'inherit' },
            },
            ...(selected && {
              '--variant-textColor': '#0D9488',
              '--variant-textBg': 'rgba(13, 148, 136, 0.12)',
              '--variant-outlinedColor': '#0D9488',
              '--variant-outlinedBorder': 'rgba(13, 148, 136, 0.5)',
              color: 'var(--variant-textColor)',
              backgroundColor: 'var(--variant-textBg)',
              '& .MuiListItemIcon-root': { color: 'inherit' },
              '&:hover': {
                backgroundColor: 'rgba(13, 148, 136, 0.2)',
                color: 'var(--variant-textColor)',
              },
            }),
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={t(item.labelKey, { ns: 'dashboard' })} primaryTypographyProps={{ fontWeight: 500 }} />
        </ListItemButton>
      </ListItem>
      </Fragment>
      )
    })}
  </List>
)

const sidebarBoxSx = {
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
}

export function DashboardSidebar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const pathWithoutLang = getPathWithoutLang(pathname)

  return (
    <Box
      component="nav"
      sx={{
        ...sidebarBoxSx,
        display: { xs: 'none', md: 'block' },
      }}
    >
      {sidebarContent(pathWithoutLang, t)}
    </Box>
  )
}

export interface DashboardSidebarDrawerProps {
  open: boolean
  onClose: () => void
  anchor?: 'left' | 'right'
}

export function DashboardSidebarDrawer({ open, onClose, anchor = 'left' }: DashboardSidebarDrawerProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const pathWithoutLang = getPathWithoutLang(pathname)

  return (
    <Drawer
      variant="temporary"
      anchor={anchor}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: SIDEBAR_WIDTH_MOBILE, sm: SIDEBAR_WIDTH },
          flexShrink: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Toolbar sx={{ justifyContent: 'flex-end', px: 1, minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            aria-label={t('aria.closeSidebar', { ns: 'common' })}
            onClick={onClose}
            sx={{ color: 'text.primary' }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box sx={{ flex: 1, overflow: 'auto' }} role="presentation" onClick={onClose} onKeyDown={onClose}>
          {sidebarContent(pathWithoutLang, t)}
        </Box>
      </Box>
    </Drawer>
  )
}
