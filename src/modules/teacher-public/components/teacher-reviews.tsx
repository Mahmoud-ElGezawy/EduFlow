import { Box, Typography, Card, CardContent, Rating } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface TeacherReviewItem {
  id: string
  studentName?: string
  author?: string
  rating: number
  reviewText?: string
  comment?: string
  date: string
}

interface TeacherReviewsProps {
  reviews: TeacherReviewItem[]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function TeacherReviews({ reviews }: TeacherReviewsProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }} component="section">
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t('reviews', { ns: 'teacher' })}
      </Typography>
      {reviews.length === 0 ? (
        <Typography color="text.secondary">{t('noReviews', { ns: 'teacher' })}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {review.studentName ?? review.author}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" precision={0.5} />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {review.reviewText ?? review.comment}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(review.date)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
