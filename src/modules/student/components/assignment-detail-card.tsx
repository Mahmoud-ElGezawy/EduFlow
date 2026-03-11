import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import { ArrowBack as BackIcon, Upload as UploadIcon, PictureAsPdf as PdfIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import type { StudentAssignment } from '@/api/mock-data'

interface AssignmentDetailCardProps {
  assignment: StudentAssignment
  onFileUpload?: (file: File) => void
}

export function AssignmentDetailCard({ assignment, onFileUpload }: AssignmentDetailCardProps) {
  const { t } = useTranslation('student')

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Button
          component={I18nLink}
          to="/student/assignments"
          startIcon={<BackIcon className="rtl-flip" />}
          sx={{ mb: 2 }}
        >
          {t('backToAssignments', { defaultValue: 'Back to Assignments' })}
        </Button>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {assignment.title}
          </Typography>
          <Chip
            label={assignment.status === 'submitted' ? t('submitted') : t('pending')}
            color={assignment.status === 'submitted' ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {assignment.courseTitle} · {t('due')}: {assignment.dueDate}
        </Typography>

        {assignment.description && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {assignment.description}
          </Typography>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {t('instructions', { defaultValue: 'Instructions' })}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', mb: 1 }}>
            {assignment.instructions}
          </Typography>
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
              {t('downloadAssignmentPdf', { defaultValue: 'Download assignment brief (PDF)' })}
            </Button>
          )}
        </Box>

        {assignment.status === 'submitted' && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {t('submittedAt', { defaultValue: 'Submitted at' })}: {assignment.submittedAt ? new Date(assignment.submittedAt).toLocaleString() : '-'}
            </Typography>
            {assignment.grade != null && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {t('grade', { defaultValue: 'Grade' })}: {assignment.grade}%
              </Typography>
            )}
            {assignment.feedback && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {t('feedback', { defaultValue: 'Feedback' })}: {assignment.feedback}
              </Typography>
            )}
          </Box>
        )}

        {assignment.status === 'pending' && onFileUpload && (
          <Box
            component="label"
            htmlFor="assignment-upload"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              py: 4,
              px: 2,
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
            }}
          >
            <UploadIcon color="action" sx={{ fontSize: 48 }} />
            <Typography variant="body2" color="text.secondary">
              {t('uploadFile')}
            </Typography>
            <input
              id="assignment-upload"
              type="file"
              accept=".pdf,image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onFileUpload(file)
              }}
            />
          </Box>
        )}

        {assignment.status === 'pending' && (
          <Button
            variant="contained"
            component={I18nLink}
            to={`/student/courses/${assignment.courseId}`}
            sx={{ mt: 2 }}
          >
            {t('submitAssignment')}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
