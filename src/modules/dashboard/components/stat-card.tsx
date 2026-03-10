import { Card, CardContent, Typography } from '@mui/material'

interface StatCardProps {
  title: string
  value: string | number
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 40px -10px rgba(13, 148, 136, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
