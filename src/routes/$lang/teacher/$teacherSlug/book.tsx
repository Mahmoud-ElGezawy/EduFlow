import { createFileRoute } from '@tanstack/react-router'
import { Box, Button, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from '@tanstack/react-router'
import { I18nLink } from '@/i18n/navigation'

export const Route = createFileRoute('/$lang/teacher/$teacherSlug/book')({
  component: TeacherBookPage,
})

function TeacherBookPage() {
  const { t } = useTranslation('teacher')
  const params = useParams({ strict: false })
  const slug = params?.teacherSlug ?? ''

  return (
    <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        {t('bookSession', { defaultValue: 'Book a Session' })}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {t('bookingComingSoon', {
          defaultValue: 'Session booking will be available soon. Subscribe to the academy to get notified.',
        })}
      </Typography>
      <Button component={I18nLink} to={`/teacher/${slug}`} variant="outlined" sx={{ mr: 1 }}>
        {t('backToProfile', { defaultValue: 'Back to profile' })}
      </Button>
      <Button component={I18nLink} to="/subscribe" variant="contained">
        {t('joinAcademy', { ns: 'teacher' })}
      </Button>
    </Container>
  )
}
