import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { SettingsFormSection } from '../components/settings-form-section'
import { SettingsFormWrapper } from '../components/settings-form-wrapper'

const paymentsSchema = z.object({
  currency: z.string().min(1),
  payoutSchedule: z.string().min(1),
  payoutEmail: z.string().email().optional().or(z.literal('')),
})

type PaymentsForm = z.infer<typeof paymentsSchema>

export function PaymentsSettingsPage() {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, control } = useForm<PaymentsForm>({
    resolver: zodResolver(paymentsSchema),
    defaultValues: {
      currency: 'EGP',
      payoutSchedule: 'weekly',
      payoutEmail: '',
    },
  })

  const saveMutation = useMutation({
    mutationFn: async (data: PaymentsForm) => {
      await apiClient.put('settings/payments', { json: data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'payments'] })
    },
  })

  const onSubmit = (data: PaymentsForm) => {
    saveMutation.mutate(data)
  }

  return (
    <SettingsFormWrapper
      onSubmit={handleSubmit(onSubmit)}
      isSaving={saveMutation.isPending}
      saveLabel={t('settings.save')}
      isDirty={formState.isDirty}
    >
      <SettingsFormSection
        title={t('settings.payments.currencyTitle', { defaultValue: 'Currency' })}
        description={t('settings.payments.currencyDescription', { defaultValue: 'Default currency for course prices.' })}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('settings.payments.currency', { defaultValue: 'Currency' })}</InputLabel>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select {...field} label={t('settings.payments.currency', { defaultValue: 'Currency' })}>
                <MenuItem value="EGP">EGP - Egyptian Pound</MenuItem>
                <MenuItem value="USD">USD - US Dollar</MenuItem>
                <MenuItem value="SAR">SAR - Saudi Riyal</MenuItem>
                <MenuItem value="AED">AED - UAE Dirham</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.payments.payoutTitle', { defaultValue: 'Payout Settings' })}
        description={t('settings.payments.payoutDescription', { defaultValue: 'Configure how you receive earnings.' })}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('settings.payments.payoutSchedule', { defaultValue: 'Payout schedule' })}</InputLabel>
          <Controller
            name="payoutSchedule"
            control={control}
            render={({ field }) => (
              <Select {...field} label={t('settings.payments.payoutSchedule', { defaultValue: 'Payout schedule' })}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <TextField
          label={t('settings.payments.payoutEmail', { defaultValue: 'Payout email' })}
          {...register('payoutEmail')}
          error={!!formState.errors.payoutEmail}
          helperText={formState.errors.payoutEmail?.message}
          fullWidth
          sx={{ maxWidth: 320, mt: 2 }}
        />
      </SettingsFormSection>
    </SettingsFormWrapper>
  )
}
