import { createFileRoute } from '@tanstack/react-router'
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { PaymentMethodForm, type PaymentFormValues } from '@/modules/payment/components/payment-method-form'

export const Route = createFileRoute('/$lang/subscribe/checkout')({
  validateSearch: (s: Record<string, unknown>) => ({
    plan: (s.plan as string) ?? 'pro',
  }),
  component: CheckoutPage,
})

function CheckoutPage() {
  const { t } = useTranslation(['payment', 'home'])
  const { plan } = Route.useSearch()
  const methods = useForm<PaymentFormValues>({
    defaultValues: { paymentMethod: 'instapay' },
  })

  const planPrices: Record<string, string> = {
    starter: '99 EGP/month',
    pro: '299 EGP/month',
    academy: '599 EGP/month',
  }

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Checkout:', { plan, ...data })
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
          {t('subscribe', { ns: 'payment' })}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          Complete your subscription with a local payment method
        </Typography>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
                      <Typography variant="h6">{t(`pricing.plans.${plan}.name`, { ns: 'home' })}</Typography>
                      <Typography variant="h5" color="primary" fontWeight={700}>
                        {planPrices[plan] ?? planPrices.pro}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <PaymentMethodForm />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5 }}>
                      {t('payNow', { ns: 'payment' })}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button component={I18nLink} to="/subscribe" variant="text" fullWidth>
                      ← {t('selectPlan', { ns: 'payment' })}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
