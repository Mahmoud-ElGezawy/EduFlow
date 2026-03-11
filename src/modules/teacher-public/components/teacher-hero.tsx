import { Box, Typography, Avatar, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'

interface TeacherHeroProps {
  name: string
  bio: string
  avatarUrl?: string
  courseCount: number
  studentCount: number
  /** Optional headline for profile/storefront (e.g. tagline) */
  headline?: string
  /** When provided, shows CTA buttons (Book a session / View courses) */
  teacherSlug?: string
}

export function TeacherHero({
  name,
  bio,
  avatarUrl,
  courseCount,
  studentCount,
  headline,
  teacherSlug,
}: TeacherHeroProps) {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 2, md: 4 },
        alignItems: 'center',
        py: { xs: 4, md: 6 },
        flexWrap: 'wrap',
        borderRadius: 3,
        p: { xs: 2, md: 4 },
        backgroundColor: 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Avatar
        src={avatarUrl}
        sx={{
          width: { xs: 80, md: 120 },
          height: { xs: 80, md: 120 },
          backgroundColor: 'primary.main',
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
        }}
      >
        {name.charAt(0)}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: { xs: 0, sm: 200 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        {headline && (
          <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>
            {headline}
          </Typography>
        )}
        <Typography color="text.secondary" paragraph sx={{ lineHeight: 1.7, maxWidth: 600 }}>
          {bio}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: teacherSlug ? 2 : 0 }}>
          {courseCount} {t('coursesCount', { ns: 'teacher' })} · {studentCount} {t('studentsCount', { ns: 'teacher' })}
        </Typography>
        {teacherSlug && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={I18nLink}
              to={`/teacher/${teacherSlug}/book`}
              variant="contained"
              size="large"
              sx={{ borderRadius: 2, px: 3 }}
            >
              {t('bookSession', { ns: 'teacher' })}
            </Button>
            <Button
              component={I18nLink}
              to="/teacher/profile#courses"
              variant="outlined"
              size="large"
              sx={{ borderRadius: 2, px: 3 }}
            >
              {t('viewCourses', { ns: 'teacher' })}
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  )
}
