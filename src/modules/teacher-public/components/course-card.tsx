import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'

interface CourseCardProps {
  slug: string
  title: string
  thumbnail?: string
  price: number
  studentCount: number
}

export function CourseCard({ slug, title, thumbnail, price, studentCount }: CourseCardProps) {
  const { t } = useTranslation()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 40px -10px rgba(13, 148, 136, 0.2)',
        },
      }}
    >
      <Box
        sx={{
          height: 160,
          backgroundColor: 'grey.200',
          backgroundImage: thumbnail ? `url(${thumbnail})` : 'none',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!thumbnail && (
          <Typography color="text.secondary" fontWeight={500}>
            Course
          </Typography>
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {studentCount.toLocaleString()} {t('teachers.students', { ns: 'home' })}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1, fontWeight: 700 }}>
          {price} EGP
        </Typography>
        <Button
          component={I18nLink}
          to={`/course/${slug}`}
          variant="contained"
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          {t('viewCourse', { ns: 'course' })}
        </Button>
      </CardContent>
    </Card>
  )
}
