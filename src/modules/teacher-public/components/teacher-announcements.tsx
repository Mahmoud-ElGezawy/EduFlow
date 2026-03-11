import { Box, Typography, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface TeacherAnnouncementItem {
  id: string
  title: string
  description: string
  date: string
}

interface TeacherAnnouncementsProps {
  announcements: TeacherAnnouncementItem[]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function TeacherAnnouncements({ announcements }: TeacherAnnouncementsProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }} component="section">
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t('announcements', { ns: 'teacher', defaultValue: 'Announcements' })}
      </Typography>
      {announcements.length === 0 ? (
        <Typography color="text.secondary">{t('noAnnouncements', { ns: 'teacher', defaultValue: 'No announcements yet.' })}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {announcement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {announcement.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(announcement.date)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
