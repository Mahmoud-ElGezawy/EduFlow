import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface TeacherGroupItem {
  id: string
  name: string
  description: string
  memberCount: number
}

interface TeacherGroupsProps {
  groups: TeacherGroupItem[]
}

export function TeacherGroups({ groups }: TeacherGroupsProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }} component="section">
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t('studyGroups', { ns: 'teacher', defaultValue: 'Study Groups' })}
      </Typography>
      {groups.length === 0 ? (
        <Typography color="text.secondary">{t('noGroups', { ns: 'teacher', defaultValue: 'No study groups yet.' })}</Typography>
      ) : (
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {group.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {group.memberCount} {t('members', { ns: 'teacher', defaultValue: 'members' })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
