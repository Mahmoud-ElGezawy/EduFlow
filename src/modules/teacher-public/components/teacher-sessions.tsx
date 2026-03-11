import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface TeacherSessionItem {
  id: string
  title: string
  date: string
  duration: number
  availableSeats: number
}

interface TeacherSessionsProps {
  sessions: TeacherSessionItem[]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export function TeacherSessions({ sessions }: TeacherSessionsProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }} component="section">
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t('upcomingSessions', { ns: 'teacher', defaultValue: 'Upcoming Sessions' })}
      </Typography>
      {sessions.length === 0 ? (
        <Typography color="text.secondary">{t('noSessions', { ns: 'teacher', defaultValue: 'No upcoming sessions.' })}</Typography>
      ) : (
        <Grid container spacing={3}>
          {sessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {session.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {formatDate(session.date)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      size="small"
                      label={`${session.duration} ${t('minutes', { ns: 'teacher', defaultValue: 'min' })}`}
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={`${session.availableSeats} ${t('seatsAvailable', { ns: 'teacher', defaultValue: 'seats' })}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
