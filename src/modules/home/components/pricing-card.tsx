import { Card, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Check as CheckIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export interface PricingCardProps {
  title: string
  price: string
  features: string[]
  ctaText: string
  onCtaClick: () => void
  highlighted?: boolean
}

export function PricingCard({ title, price, features, ctaText, onCtaClick, highlighted }: PricingCardProps) {
  const { t } = useTranslation()
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: highlighted ? 2 : 0,
        borderColor: 'primary.main',
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: highlighted ? 'translateY(-4px)' : 'translateY(-2px)',
        },
        ...(highlighted && {
          boxShadow: '0 20px 50px -12px rgba(13, 148, 136, 0.25)',
          '&::before': {
            content: `"${t('pricing.plans.popular', { ns: 'home' })}"`,
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
        }),
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 4, pt: highlighted ? 5 : 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 800, my: 2 }}>
          {price}
        </Typography>
        <List dense>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary={feature} primaryTypographyProps={{ sx: { fontSize: '0.95rem' } }} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardContent sx={{ pt: 0 }}>
        <Button
          variant={highlighted ? 'contained' : 'outlined'}
          fullWidth
          onClick={onCtaClick}
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            ...(highlighted && {
              boxShadow: '0 4px 14px 0 rgba(13, 148, 136, 0.35)',
            }),
          }}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}
