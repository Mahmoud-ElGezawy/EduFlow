import { createFileRoute } from '@tanstack/react-router'
import { GridColDef } from '@mui/x-data-grid'
import { useAssignments } from '@/api/hooks/use-dashboard'
import { PageWithTable } from '@/modules/dashboard/components/page-with-table'
import { useTranslation } from 'react-i18next'
import { mockAssignments } from '@/api/mock-data'

export const Route = createFileRoute('/$lang/dashboard/assignments/')({
  component: AssignmentListPage,
})

function AssignmentListPage() {
  const { t } = useTranslation()
  const { data: assignments } = useAssignments()
  const assignmentsData = assignments ?? mockAssignments

  const columns: GridColDef[] = [
    { field: 'studentName', headerName: t('assignments.student', { ns: 'dashboard' }), flex: 1, minWidth: 120 },
    { field: 'title', headerName: t('assignments.title', { ns: 'dashboard' }), minWidth: 120 },
    { field: 'submissionDate', headerName: t('assignments.submissionDate', { ns: 'dashboard' }), minWidth: 110 },
    { field: 'status', headerName: t('assignments.status', { ns: 'dashboard' }), minWidth: 90 },
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
