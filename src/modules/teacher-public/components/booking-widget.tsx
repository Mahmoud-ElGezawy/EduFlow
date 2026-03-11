import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { CalendarMonth as CalendarIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'

interface BookingWidgetProps {
  teacherSlug: string
}

export function BookingWidget({ teacherSlug }: BookingWidgetProps) {
  const { t } = useTranslation('teacher')

  return (
    <Card sx={{ position: 'sticky', top: 24 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CalendarIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('bookSession', { defaultValue: 'Book a Session' })}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('bookSessionDescription', { defaultValue: 'Schedule a one-on-one or group session with this teacher.' })}
        </Typography>
        <Button
          component={I18nLink}
          to={`/teacher/${teacherSlug}/book`}
          variant="contained"
          fullWidth
          startIcon={<CalendarIcon />}
        >
          {t('viewAvailability', { defaultValue: 'View Availability' })}
        </Button>
      </CardContent>
    </Card>
  )
}
