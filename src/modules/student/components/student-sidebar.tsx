import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Close as CloseIcon, School as CoursesIcon, Assignment as AssignmentsIcon, Home as HomeIcon } from '@mui/icons-material'
import { useLocation } from '@tanstack/react-router'
import { I18nLink, getPathWithoutLang } from '@/i18n/navigation'
import { useTranslation } from 'react-i18next'

const SIDEBAR_WIDTH = 260
const SIDEBAR_WIDTH_MOBILE = 'min(280px, 85vw)'

const items = [
  { to: '/student', icon: HomeIcon, labelKey: 'overview' },
  { to: '/student/courses', icon: CoursesIcon, labelKey: 'myCourses' },
  { to: '/student/assignments', icon: AssignmentsIcon, labelKey: 'assignments' },
]

function isItemSelected(pathWithoutLang: string, itemTo: string): boolean {
  if (pathWithoutLang === itemTo) return true
  if (itemTo === '/student') return false
  return pathWithoutLang.startsWith(itemTo + '/')
}

const sidebarBoxSx = {
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
}

const sidebarContent = (
  pathWithoutLang: string,
  t: (key: string) => string
) => (
  <List sx={{ py: 2, px: 1 }}>
    {items.map((item) => (
      <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          component={I18nLink}
          to={item.to}
          selected={isItemSelected(pathWithoutLang, item.to)}
          sx={{
            borderRadius: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': { color: 'inherit' },
            },
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': { color: 'inherit' },
              '&:hover': { backgroundColor: 'primary.dark' },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={t(item.labelKey)} primaryTypographyProps={{ fontWeight: 500 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
)

export function StudentSidebar() {
  const { t } = useTranslation('student')
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

export interface StudentSidebarDrawerProps {
  open: boolean
  onClose: () => void
  anchor?: 'left' | 'right'
}

export function StudentSidebarDrawer({ open, onClose, anchor = 'left' }: StudentSidebarDrawerProps) {
  const { t } = useTranslation('student')
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
            aria-label="close sidebar"
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
