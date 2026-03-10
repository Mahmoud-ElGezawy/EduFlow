import { Box, Typography, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

interface TeacherReviewsProps {
  reviews: Review[]
}

export function TeacherReviews({ reviews }: TeacherReviewsProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }}>
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
                <Typography variant="subtitle2">{review.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
