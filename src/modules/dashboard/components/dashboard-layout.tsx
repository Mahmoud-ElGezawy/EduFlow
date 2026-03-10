import { useState } from 'react'
import { Box } from '@mui/material'
import { Outlet, useLocation } from '@tanstack/react-router'
import { DashboardSidebar, DashboardSidebarDrawer } from './dashboard-sidebar'
import { DashboardHeader } from './dashboard-header'
import { getLangFromPath } from '@/i18n/resource'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const lang = getLangFromPath(pathname)
  const anchor = lang === 'ar' ? 'right' : 'left'

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardSidebar />
      <DashboardSidebarDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} anchor={anchor} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
