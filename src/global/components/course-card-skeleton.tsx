import { Card, CardContent, Skeleton } from '@mui/material'

export function CourseCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton variant="text" width="80%" height={28} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  )
}
