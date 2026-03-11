import { createFileRoute } from '@tanstack/react-router'
import { GridColDef } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import { Visibility as ViewIcon } from '@mui/icons-material'
import { useStudents } from '@/api/hooks/use-dashboard'
import { PageWithTable } from '@/modules/dashboard/components/page-with-table'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { mockStudents } from '@/api/mock-data'
import { useCurrentLang } from '@/i18n/navigation'

export const Route = createFileRoute('/$lang/dashboard/students/')({
  component: StudentListPage,
})

function StudentListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const lang = useCurrentLang()
  const { data: students } = useStudents()
  const studentsData = students ?? mockStudents

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('students.name', { ns: 'dashboard' }),
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
    { field: 'course', headerName: t('students.course', { ns: 'dashboard' }), minWidth: 120 },
    { field: 'joinDate', headerName: t('students.joinDate', { ns: 'dashboard' }), minWidth: 100 },
    {
      field: 'progress',
      headerName: t('students.progress', { ns: 'dashboard' }),
      minWidth: 80,
      valueFormatter: (v) => `${v}%`,
    },
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
          onClick={() => navigate({ to: '/$lang/dashboard/students/$studentId', params: { lang, studentId: params.row.id } })}
        >
          {t('students.view', { ns: 'dashboard', defaultValue: 'View' })}
        </Button>
      ),
    },
  ]

  return (
    <PageWithTable
      title={t('students', { ns: 'dashboard' })}
      rows={studentsData}
      columns={columns}
      getRowId={(row) => (row as { id: string }).id}
    />
  )
}
