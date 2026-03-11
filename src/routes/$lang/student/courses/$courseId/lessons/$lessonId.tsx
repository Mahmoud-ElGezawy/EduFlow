import { createFileRoute, useParams } from '@tanstack/react-router'
import { Box, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { mockLessons } from '@/api/mock-data'
import { ArrowBack as BackIcon, CloudUpload as UploadIcon } from '@mui/icons-material'

export const Route = createFileRoute('/$lang/student/courses/$courseId/lessons/$lessonId')({
  component: LessonViewerPage,
})

function LessonViewerPage() {
  const { t } = useTranslation('student')
  const { courseId, lessonId } = useParams({ strict: false })
  const lesson = mockLessons.find((l) => l.id === lessonId) ?? mockLessons[0]

  const renderContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <Box
            sx={{
              aspectRatio: '16/9',
              bgcolor: 'grey.900',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 40, color: 'white', ml: 0.5 }}>▶</Typography>
            </Box>
          </Box>
        )
      case 'quiz':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('quizQuestion')}
              </Typography>
              <FormControl>
                <RadioGroup>
                  <FormControlLabel value="a" control={<Radio />} label="Option A" />
                  <FormControlLabel value="b" control={<Radio />} label="Option B" />
                  <FormControlLabel value="c" control={<Radio />} label="Option C" />
                </RadioGroup>
              </FormControl>
              <Button variant="contained" sx={{ mt: 2 }}>
                {t('submitAnswer')}
              </Button>
            </CardContent>
          </Card>
        )
      case 'pdf':
        return (
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {t('pdfPlaceholder')}
              </Typography>
              <Button variant="outlined" startIcon={<UploadIcon />}>
                {t('downloadPdf')}
              </Button>
            </CardContent>
          </Card>
        )
      case 'assignment':
        return (
          <Card>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('assignmentInstructions')}
              </Typography>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  py: 4,
                  px: 2,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography color="text.secondary">{t('uploadFile')}</Typography>
              </Box>
              <Button variant="contained">{t('submitAssignment')}</Button>
            </CardContent>
          </Card>
        )
      default:
        return (
          <Typography color="text.secondary">
            {t('contentPlaceholder')}
          </Typography>
        )
    }
  }

  return (
    <Box>
      <Button
        component={I18nLink}
        to={`/student/courses/${courseId}`}
        startIcon={<BackIcon className="rtl-flip" />}
        sx={{ mb: 2 }}
      >
        {t('backToCourse')}
      </Button>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {lesson.title}
      </Typography>
      {renderContent()}
    </Box>
  )
}
