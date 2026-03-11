import { createFileRoute, useParams } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { mockStudentAssignments } from '@/api/mock-data'
import { AssignmentDetailCard } from '@/modules/student/components/assignment-detail-card'

export const Route = createFileRoute('/$lang/student/assignments/$assignmentId')({
  component: AssignmentDetailPage,
})

function AssignmentDetailPage() {
  const { assignmentId } = useParams({ from: '/$lang/student/assignments/$assignmentId' })
  const assignment = mockStudentAssignments.find((a) => a.id === assignmentId)

  if (!assignment) {
    return (
      <Box sx={{ p: 3 }}>
        <Box>Assignment not found</Box>
      </Box>
    )
  }

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name)
    // In real app: upload to API, then refresh assignment status
  }

  return (
    <Box>
      <AssignmentDetailCard assignment={assignment} onFileUpload={handleFileUpload} />
    </Box>
  )
}
