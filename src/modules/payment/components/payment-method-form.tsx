import { Box, Card, CardContent, Typography, TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AccountBalance, PhoneAndroid } from '@mui/icons-material'

export type PaymentMethod = 'instapay' | 'vodafone_cash' | 'fawry'

export interface PaymentFormValues {
  paymentMethod: PaymentMethod
  instapayPhone?: string
  vodafoneCashPhone?: string
  fawryCode?: string
}

export function PaymentMethodForm() {
  const { t } = useTranslation('payment')
  const { register, watch, control } = useFormContext<PaymentFormValues>()
  const method = watch('paymentMethod')

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {t('chooseMethod')}
      </Typography>
      <Controller
        name="paymentMethod"
        control={control}
        defaultValue="instapay"
        render={({ field }) => (
          <RadioGroup {...field}>
        <Card
          sx={{
            mb: 2,
            border: method === 'instapay' ? 2 : 1,
            borderColor: method === 'instapay' ? 'primary.main' : 'divider',
          }}
        >
          <CardContent>
            <FormControlLabel value="instapay" control={<Radio />} label="" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { xs: 2, sm: 4 } }}>
              <AccountBalance sx={{ color: 'primary.main', fontSize: 32 }} />
              <Box>
                <Typography fontWeight={600}>Instapay</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('instapayDesc')}
                </Typography>
                {method === 'instapay' && (
                  <TextField
                    {...register('instapayPhone')}
                    label={t('phoneNumber')}
                    placeholder="01XXXXXXXXX"
                    fullWidth
                    sx={{ mt: 2, maxWidth: { xs: '100%', sm: 280 } }}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            mb: 2,
            border: method === 'vodafone_cash' ? 2 : 1,
            borderColor: method === 'vodafone_cash' ? 'primary.main' : 'divider',
          }}
        >
          <CardContent>
            <FormControlLabel value="vodafone_cash" control={<Radio />} label="" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { xs: 2, sm: 4 } }}>
              <PhoneAndroid sx={{ color: '#e60000', fontSize: 32 }} />
              <Box>
                <Typography fontWeight={600}>Vodafone Cash</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('vodafoneDesc')}
                </Typography>
                {method === 'vodafone_cash' && (
                  <TextField
                    {...register('vodafoneCashPhone')}
                    label={t('phoneNumber')}
                    placeholder="01XXXXXXXXX"
                    fullWidth
                    sx={{ mt: 2, maxWidth: { xs: '100%', sm: 280 } }}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            mb: 2,
            border: method === 'fawry' ? 2 : 1,
            borderColor: method === 'fawry' ? 'primary.main' : 'divider',
          }}
        >
          <CardContent>
            <FormControlLabel value="fawry" control={<Radio />} label="" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { xs: 2, sm: 4 } }}>
              <AccountBalance sx={{ color: '#c41e3a', fontSize: 32 }} />
              <Box>
                <Typography fontWeight={600}>Fawry</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('fawryDesc')}
                </Typography>
                {method === 'fawry' && (
                  <TextField
                    {...register('fawryCode')}
                    label={t('fawryCode')}
                    placeholder="123456789"
                    fullWidth
                    sx={{ mt: 2, maxWidth: { xs: '100%', sm: 280 } }}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
          </RadioGroup>
        )}
      />
    </Box>
  )
}
