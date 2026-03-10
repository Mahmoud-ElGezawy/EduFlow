import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { ArrowForward as ArrowIcon } from '@mui/icons-material'

const teachers = [
  { slug: 'ahmed-math', name: 'Ahmed Math Academy', students: 1200 },
  { slug: 'sara-science', name: 'Sara Science', students: 850 },
]

export function TeacherExamples() {
  const { t } = useTranslation()

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {t('teachers.title', { ns: 'home' })}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.125rem' }}>
          {t('teachers.subtitle', { ns: 'home' })}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {teachers.map((teacher) => (
          <Grid item xs={12} md={6} key={teacher.slug}>
            <Card
              component={I18nLink}
              to={`/teacher/${teacher.slug}`}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  '& .arrow-icon': {
                    transform: 'translateX(4px)',
                  },
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {teacher.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {teacher.students.toLocaleString()} {t('teachers.students', { ns: 'home' })}
                  </Typography>
                </Box>
                <Box
                  className="arrow-icon"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <ArrowIcon sx={{ fontSize: 20 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
