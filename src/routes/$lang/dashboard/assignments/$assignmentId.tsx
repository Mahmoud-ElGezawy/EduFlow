import { createFileRoute, useParams } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { mockAssignmentDetails } from '@/api/mock-data'
import { AssignmentDetailCard } from '@/modules/dashboard/components/assignment-detail-card'

export const Route = createFileRoute('/$lang/dashboard/assignments/$assignmentId')({
  component: AssignmentDetailPage,
})

function AssignmentDetailPage() {
  const { assignmentId } = useParams({ from: '/$lang/dashboard/assignments/$assignmentId' })
  const assignment = mockAssignmentDetails[assignmentId]

  if (!assignment) {
    return (
      <Box sx={{ p: 3 }}>
        <Box>Assignment not found</Box>
      </Box>
    )
  }

  return <AssignmentDetailCard assignment={assignment} />
}
