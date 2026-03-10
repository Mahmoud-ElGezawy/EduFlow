import { createFileRoute } from '@tanstack/react-router'
import { Box, Container, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { I18nLink } from '@/i18n/navigation'
import { PaymentMethodForm, type PaymentFormValues } from '@/modules/payment/components/payment-method-form'

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  paymentMethod: z.enum(['instapay', 'vodafone_cash', 'fawry']),
  instapayPhone: z.string().optional(),
  vodafoneCashPhone: z.string().optional(),
  fawryCode: z.string().optional(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof registerSchema> & PaymentFormValues

export const Route = createFileRoute('/$lang/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { t } = useTranslation('payment')
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      paymentMethod: 'instapay',
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Register:', data)
  }

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
          {t('register')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          Create your academy account and choose a payment method
        </Typography>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      {...methods.register('fullName')}
                      label={t('fullName')}
                      fullWidth
                      error={!!methods.formState.errors.fullName}
                      helperText={methods.formState.errors.fullName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...methods.register('email')}
                      label={t('email')}
                      type="email"
                      fullWidth
                      error={!!methods.formState.errors.email}
                      helperText={methods.formState.errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...methods.register('password')}
                      label={t('password')}
                      type="password"
                      fullWidth
                      error={!!methods.formState.errors.password}
                      helperText={methods.formState.errors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...methods.register('confirmPassword')}
                      label={t('confirmPassword')}
                      type="password"
                      fullWidth
                      error={!!methods.formState.errors.confirmPassword}
                      helperText={methods.formState.errors.confirmPassword?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PaymentMethodForm />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5 }}>
                      {t('register')}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Already have an account? <I18nLink to="/">Sign in</I18nLink>
                    </Typography>
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
