import { createFileRoute, useParams } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { mockStudentDetails } from '@/api/mock-data'
import { StudentDetailCard } from '@/modules/dashboard/components/student-detail-card'

export const Route = createFileRoute('/$lang/dashboard/students/$studentId')({
  component: StudentDetailPage,
})

function StudentDetailPage() {
  const { studentId } = useParams({ from: '/$lang/dashboard/students/$studentId' })
  const student = mockStudentDetails[studentId]

  if (!student) {
    return (
      <Box sx={{ p: 3 }}>
        <Box>Student not found</Box>
      </Box>
    )
  }

  return <StudentDetailCard student={student} />
}
