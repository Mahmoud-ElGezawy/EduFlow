import { createFileRoute } from '@tanstack/react-router'
import { GridColDef } from '@mui/x-data-grid'
import { useStudents } from '@/api/hooks/use-dashboard'
import { PageWithTable } from '@/modules/dashboard/components/page-with-table'
import { useTranslation } from 'react-i18next'
import { mockStudents } from '@/api/mock-data'

export const Route = createFileRoute('/$lang/dashboard/students/')({
  component: StudentListPage,
})

function StudentListPage() {
  const { t } = useTranslation()
  const { data: students } = useStudents()
  const studentsData = students ?? mockStudents

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('students.name', { ns: 'dashboard' }), flex: 1, minWidth: 120 },
    { field: 'course', headerName: t('students.course', { ns: 'dashboard' }), minWidth: 120 },
    { field: 'joinDate', headerName: t('students.joinDate', { ns: 'dashboard' }), minWidth: 100 },
    {
      field: 'progress',
      headerName: t('students.progress', { ns: 'dashboard' }),
      minWidth: 80,
      valueFormatter: (v) => `${v}%`,
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
