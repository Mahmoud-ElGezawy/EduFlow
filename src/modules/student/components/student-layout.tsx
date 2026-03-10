import { useState } from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { Outlet, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { StudentSidebar, StudentSidebarDrawer } from './student-sidebar'
import { getLangFromPath } from '@/i18n/resource'

export function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const lang = getLangFromPath(pathname)
  const anchor = lang === 'ar' ? 'right' : 'left'
  const { t } = useTranslation('student')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StudentSidebar />
      <StudentSidebarDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} anchor={anchor} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            display: { xs: 'block', md: 'none' },
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            <IconButton
              color="inherit"
              aria-label="open sidebar"
              edge="start"
              onClick={() => setSidebarOpen(true)}
              sx={{ mr: 2, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {t('title', { defaultValue: 'My Courses' })}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
