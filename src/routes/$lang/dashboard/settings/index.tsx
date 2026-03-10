import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CloudUpload as UploadIcon } from '@mui/icons-material'
import { mockAcademySettings } from '@/api/mock-data'

export const Route = createFileRoute('/$lang/dashboard/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  const { t } = useTranslation()
  const settings = mockAcademySettings

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('settings', { ns: 'dashboard' })}
      </Typography>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: { xs: 2, sm: 3 } }}>
          <TextField
            label={t('settings.academyName', { ns: 'dashboard' })}
            defaultValue={settings.name}
            fullWidth
          />
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('settings.logoUpload', { ns: 'dashboard' })}
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                py: 4,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
              }}
            >
              <UploadIcon color="action" sx={{ fontSize: 48 }} />
              <Typography color="text.secondary">{t('settings.uploadLogo', { ns: 'dashboard' })}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('settings.themeColor', { ns: 'dashboard' })}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: settings.primaryColor,
                  border: '2px solid',
                  borderColor: 'divider',
                }}
              />
              <Typography variant="body2">{t('settings.primaryColor', { ns: 'dashboard' })}: Teal</Typography>
            </Box>
          </Box>
          <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
            {t('settings.save', { ns: 'dashboard' })}
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
