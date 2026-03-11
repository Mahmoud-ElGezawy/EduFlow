import { createFileRoute } from '@tanstack/react-router'
import { GridColDef } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import { Visibility as ViewIcon } from '@mui/icons-material'
import { useAssignments } from '@/api/hooks/use-dashboard'
import { PageWithTable } from '@/modules/dashboard/components/page-with-table'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { mockAssignments } from '@/api/mock-data'
import { useCurrentLang } from '@/i18n/navigation'

export const Route = createFileRoute('/$lang/dashboard/assignments/')({
  component: AssignmentListPage,
})

function AssignmentListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const lang = useCurrentLang()
  const { data: assignments } = useAssignments()
  const assignmentsData = assignments ?? mockAssignments

  const columns: GridColDef[] = [
    {
      field: 'studentName',
      headerName: t('assignments.student', { ns: 'dashboard' }),
      flex: 1,
      minWidth: 120,
      align: lang === 'ar' ? 'right' : 'left',
      headerAlign: lang === 'ar' ? 'right' : 'left',
      renderHeader: lang === 'ar' ? (params) => (
        <Box component="span" sx={{ display: 'block', textAlign: 'right', direction: 'rtl', width: '100%', flex: 1, minWidth: 0 }}>
          {params.colDef.headerName}
        </Box>
      ) : undefined,
      renderCell: lang === 'ar' ? (params) => (
        <Box component="span" sx={{ display: 'block', textAlign: 'right', direction: 'rtl', width: '100%' }}>
          {params.value}
        </Box>
      ) : undefined,
    },
    {
      field: 'title',
      headerName: t('assignments.title', { ns: 'dashboard' }),
      minWidth: 120,
      align: lang === 'ar' ? 'right' : 'left',
      headerAlign: lang === 'ar' ? 'right' : 'left',
      renderHeader: lang === 'ar' ? (params) => (
        <Box component="span" sx={{ display: 'block', textAlign: 'right', direction: 'rtl', width: '100%', flex: 1, minWidth: 0 }}>
          {params.colDef.headerName}
        </Box>
      ) : undefined,
      renderCell: lang === 'ar' ? (params) => (
        <Box component="span" sx={{ display: 'block', textAlign: 'right', direction: 'rtl', width: '100%' }}>
          {params.value}
        </Box>
      ) : undefined,
    },
    { field: 'courseTitle', headerName: t('assignments.course', { ns: 'dashboard', defaultValue: 'Course' }), minWidth: 120 },
    { field: 'submissionDate', headerName: t('assignments.submissionDate', { ns: 'dashboard' }), minWidth: 110 },
    { field: 'status', headerName: t('assignments.status', { ns: 'dashboard' }), minWidth: 90 },
    {
      field: 'actions',
      headerName: '',
      minWidth: 140,
      flex: 0,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<ViewIcon />}
          onClick={() => navigate({ to: '/$lang/dashboard/assignments/$assignmentId', params: { lang, assignmentId: params.row.id } })}
        >
          {t('assignments.view', { ns: 'dashboard', defaultValue: 'View' })}
        </Button>
      ),
    },
  ]

  return (
    <PageWithTable
      title={t('assignments', { ns: 'dashboard' })}
      rows={assignmentsData}
      columns={columns}
      getRowId={(row) => (row as { id: string }).id}
    />
  )
}
