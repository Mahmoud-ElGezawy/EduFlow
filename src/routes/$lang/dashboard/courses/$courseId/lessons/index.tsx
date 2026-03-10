import { createFileRoute, useParams } from '@tanstack/react-router'
import { Box, Typography, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useCourseLessons } from '@/api/hooks/use-courses'
import { mockLessons } from '@/api/mock-data'
import { I18nLink } from '@/i18n/navigation'
import { Add as AddIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/$lang/dashboard/courses/$courseId/lessons/')({
  component: LessonListPage,
})

const LESSON_TYPE_LABELS: Record<string, string> = {
  video: 'Video',
  quiz: 'Quiz',
  pdf: 'PDF',
  assignment: 'Assignment',
}

function LessonListPage() {
  const { t } = useTranslation()
  const { courseId } = useParams({ strict: false })
  const { data: lessons } = useCourseLessons({
    variables: { courseId: courseId ?? '' },
    enabled: !!courseId,
  })
  const lessonsData = lessons ?? mockLessons

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Lesson Title', flex: 1, minWidth: 120 },
    {
      field: 'type',
      headerName: 'Type',
      minWidth: 100,
      valueFormatter: (v) => LESSON_TYPE_LABELS[v as string] ?? v,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      minWidth: 80,
      valueFormatter: (v) => (v ? `${v} min` : '-'),
    },
    { field: 'order', headerName: 'Order', minWidth: 70 },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" component="span" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {t('lessons', { ns: 'course' })}
        </Typography>
        <Button
          variant="contained"
          component={I18nLink}
          to={`/dashboard/courses/${courseId}/lessons/new`}
          startIcon={<AddIcon />}
          size="small"
          sx={{ flexShrink: 0 }}
        >
          {t('addLesson', { ns: 'dashboard' })}
        </Button>
      </Box>
      <Box sx={{ width: '100%', overflowX: 'auto', minHeight: 300 }}>
        <DataGrid
          rows={lessonsData}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          autoHeight
          sx={{ minWidth: 350 }}
        />
      </Box>
    </Box>
  )
}
