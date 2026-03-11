import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
} from '@mui/material'
import { ArrowBack as BackIcon, Download as DownloadIcon, PictureAsPdf as PdfIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { I18nLink } from '@/i18n/navigation'
import type { Assignment } from '@/api/resources/dashboard.resource'

interface AssignmentDetailCardProps {
  assignment: Assignment
}

export function AssignmentDetailCard({ assignment }: AssignmentDetailCardProps) {
  const { t } = useTranslation('dashboard')
  const [grade, setGrade] = useState(assignment.grade ?? '')
  const [feedback, setFeedback] = useState(assignment.feedback ?? '')

  const isSubmitted = assignment.status === 'submitted' || assignment.status === 'graded'

  return (
    <Box>
      <Button
        component={I18nLink}
        to="/dashboard/assignments"
        startIcon={<BackIcon className="rtl-flip" />}
        sx={{ mb: 2 }}
      >
        {t('assignments.backToList', { defaultValue: 'Back to Assignments' })}
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {assignment.title}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Button
              component={I18nLink}
              to={`/dashboard/students/${assignment.studentId}`}
              size="small"
              sx={{ textTransform: 'none', p: 0, minWidth: 0 }}
            >
              {t('assignments.student', { ns: 'dashboard' })}: {assignment.studentName}
            </Button>
            <Typography variant="body2" color="text.secondary">
              {t('assignments.course', { defaultValue: 'Course' })}: {assignment.courseTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('assignments.dueDate', { defaultValue: 'Due' })}: {assignment.dueDate}
            </Typography>
            <Chip
              label={assignment.status}
              size="small"
              color={assignment.status === 'graded' ? 'success' : assignment.status === 'submitted' ? 'info' : 'default'}
            />
          </Box>
          {assignment.description && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              {assignment.description}
            </Typography>
          )}
          {assignment.instructionsPdfUrl && (
            <Button
              startIcon={<PdfIcon />}
              variant="outlined"
              size="small"
              href={assignment.instructionsPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1 }}
            >
              {t('assignments.downloadBrief', { defaultValue: 'Download assignment brief (PDF)' })}
            </Button>
          )}
        </CardContent>
      </Card>

      {isSubmitted && (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t('assignments.submission', { defaultValue: 'Submission' })}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('assignments.submittedOn', { defaultValue: 'Submitted at' })}: {assignment.submissionDate ?? '-'}
              </Typography>
              {assignment.submittedFileUrl && (
                <Button
                  startIcon={<DownloadIcon />}
                  variant="outlined"
                  size="small"
                  href={assignment.submittedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('assignments.downloadFile', { defaultValue: 'Download submission' })}
                </Button>
              )}
              {!assignment.submittedFileUrl && (
                <Typography variant="body2" color="text.secondary">
                  {t('assignments.noFile', { defaultValue: 'No file attached' })}
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t('assignments.gradeAndFeedback', { defaultValue: 'Grade & Feedback' })}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label={t('assignments.grade', { defaultValue: 'Grade' })}
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{ maxWidth: 120 }}
                />
                <TextField
                  label={t('assignments.feedback', { defaultValue: 'Feedback' })}
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t('assignments.feedbackPlaceholder', { defaultValue: 'Add feedback for the student...' })}
                  fullWidth
                />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
                  {t('assignments.saveGrade', { defaultValue: 'Save Grade' })}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      )}

      {assignment.status === 'pending' && (
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography color="text.secondary" variant="body2">
              {t('assignments.awaitingSubmission', { defaultValue: 'Awaiting student submission' })}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
