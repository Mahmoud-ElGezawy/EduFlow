import { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Menu as MenuIcon, Language as LanguageIcon, Close as CloseIcon } from '@mui/icons-material'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getLangFromPath } from '@/i18n/resource'
import { toRoutePath, getPathWithoutLang, I18nLink } from '@/i18n/navigation'

const navItems = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/#pricing', labelKey: 'nav.pricing' },
  { to: '/subscribe', labelKey: 'nav.subscribe' },
  { to: '/register', labelKey: 'register', ns: 'payment' },
  { to: '/dashboard', labelKey: 'nav.teacherDashboard' },
  { to: '/student', labelKey: 'nav.studentDashboard', variant: 'contained' as const },
]

export function Header() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const lang = getLangFromPath(pathname)

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar'
    const pathWithoutLang = getPathWithoutLang(pathname) || '/'
    const { to: routeTo, params } = toRoutePath(pathWithoutLang, newLang)
    navigate({ to: routeTo, params, replace: false })
  }

  const handleDrawerToggle = () => setMobileOpen((o) => !o)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)')
    const handler = () => setMobileOpen(false)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const navContent = (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        alignItems: 'center',
        gap: { lg: 0.5, xl: 1 },
        flexWrap: 'nowrap',
      }}
    >
      <IconButton
        onClick={toggleLang}
        size="small"
        sx={{ color: 'text.secondary', flexShrink: 0 }}
        title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
      >
        <LanguageIcon />
      </IconButton>
      {navItems.map((item) => (
        <Button
          key={item.to}
          component={I18nLink}
          to={item.to}
          variant={item.variant ?? 'text'}
          size="small"
          sx={{
            color: 'text.primary',
            fontWeight: 500,
            px: { lg: 1.5, xl: 2 },
            fontSize: { lg: '0.8125rem', xl: '0.875rem' },
            ...(item.variant === 'contained' && { ml: 0.5 }),
          }}
        >
          {t(item.labelKey, { ns: item.ns ?? 'common', defaultValue: item.labelKey })}
        </Button>
      ))}
    </Box>
  )

  const drawerContent = (
    <Box sx={{ width: '100%', pt: 1, pb: 2 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton onClick={toggleLang} size="small" sx={{ color: 'text.secondary' }}>
          <LanguageIcon />
        </IconButton>
        <IconButton aria-label="close menu" onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={I18nLink} to={item.to} sx={{ py: 1.5 }}>
              <ListItemText
                primary={t(item.labelKey, { ns: item.ns ?? 'common', defaultValue: item.labelKey })}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1280,
            mx: 'auto',
            width: '100%',
            px: { xs: 1.5, sm: 2, md: 3 },
            minHeight: { xs: 56, sm: 64 },
            overflow: 'hidden',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={I18nLink}
            to="/"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              fontWeight: 800,
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
            }}
          >
            EduFlow
          </Typography>
          {navContent}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor={lang === 'ar' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: 'min(280px, 85vw)', sm: 280 } },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
