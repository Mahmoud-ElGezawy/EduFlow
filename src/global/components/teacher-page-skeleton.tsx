import { Box, Skeleton, Container } from '@mui/material'

export function TeacherPageSkeleton() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          <Skeleton variant="circular" width={120} height={120} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={40} />
            <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="80%" height={24} sx={{ mt: 1 }} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" height={120} sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" width={280} height={200} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}
