import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import { Menu as MenuIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'

export interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { t } = useTranslation()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <IconButton
          color="inherit"
          aria-label={t('aria.openSidebar', { ns: 'common' })}
          edge="start"
          onClick={() => onMenuClick?.()}
          sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', flexGrow: 1 }}>
          {t('title', { ns: 'dashboard' })}
        </Typography>
        <Button
          component={I18nLink}
          to="/teacher/profile"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          startIcon={<OpenInNewIcon />}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {t('viewMyPlatform', { ns: 'dashboard' })}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
