import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useDashboardCourses } from '@/api/hooks/use-courses'
import { mockCourseList } from '@/api/mock-data'
import { I18nLink } from '@/i18n/navigation'
import { PageWithTable } from '@/modules/dashboard/components/page-with-table'
import { Add as AddIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/$lang/dashboard/courses/')({
  component: CourseListPage,
})

function CourseListPage() {
  const { t } = useTranslation()
  const { data: courses } = useDashboardCourses()
  const coursesData = courses ?? mockCourseList

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: t('courses.title', { ns: 'dashboard' }),
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <I18nLink to={`/dashboard/courses/${params.row.id}/lessons`}>{params.value}</I18nLink>
      ),
    },
    { field: 'students', headerName: t('courses.students', { ns: 'dashboard' }), minWidth: 90 },
    { field: 'price', headerName: t('courses.price', { ns: 'dashboard' }), minWidth: 90, valueFormatter: (v) => `${v} EGP` },
    { field: 'status', headerName: t('courses.status', { ns: 'dashboard' }), minWidth: 90 },
  ]

  return (
    <PageWithTable
      title={t('courses', { ns: 'dashboard' })}
      rows={coursesData}
      columns={columns}
      getRowId={(row) => (row as { id: string }).id}
      toolbar={
        <Button variant="contained" component={I18nLink} to="/dashboard/courses/new" startIcon={<AddIcon />}>
          {t('newCourse', { ns: 'dashboard' })}
        </Button>
      }
    />
  )
}
