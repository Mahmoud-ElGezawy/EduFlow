import { Box, Card, CardContent, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SettingsFormSection } from '../components/settings-form-section'

const INTEGRATIONS = [
  { id: 'zoom', name: 'Zoom', description: 'Video conferencing for live sessions' },
  { id: 'google-calendar', name: 'Google Calendar', description: 'Sync availability with Google Calendar' },
  { id: 'stripe', name: 'Stripe', description: 'Payment processing' },
  { id: 'twilio', name: 'Twilio', description: 'SMS notifications' },
]

export function IntegrationsSettingsPage() {
  const { t } = useTranslation('dashboard')

  return (
    <Box>
      <SettingsFormSection
        title={t('settings.integrations.title', { defaultValue: 'Integrations' })}
        description={t('settings.integrations.description', { defaultValue: 'Connect third-party services to extend your platform.' })}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {INTEGRATIONS.map((integration) => (
            <Card key={integration.id} variant="outlined" sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography fontWeight={600}>{integration.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {integration.description}
                  </Typography>
                </Box>
                <Typography variant="body2" color="primary.main">
                  {t('settings.integrations.connect', { defaultValue: 'Connect' })}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </SettingsFormSection>
    </Box>
  )
}
