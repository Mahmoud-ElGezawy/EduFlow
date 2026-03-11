import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, FormControlLabel, Switch, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { SettingsFormSection } from '../components/settings-form-section'
import { SettingsFormWrapper } from '../components/settings-form-wrapper'

const bookingSettingsSchema = z.object({
  defaultSessionDuration: z.number().min(15).max(240),
  sessionCapacity: z.number().min(1).max(100),
  bookingCutoffMinutes: z.number().min(0).max(10080),
  timezone: z.string().min(1),
  enableWaitlist: z.boolean(),
  enableRecurring: z.boolean(),
})

type BookingSettingsForm = z.infer<typeof bookingSettingsSchema>

export function BookingSettingsPage() {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, control } = useForm<BookingSettingsForm>({
    resolver: zodResolver(bookingSettingsSchema),
    defaultValues: {
      defaultSessionDuration: 60,
      sessionCapacity: 10,
      bookingCutoffMinutes: 60,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      enableWaitlist: true,
      enableRecurring: true,
    },
  })

  const saveMutation = useMutation({
    mutationFn: async (data: BookingSettingsForm) => {
      await apiClient.put('settings/booking', { json: data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'booking'] })
    },
  })

  const onSubmit = (data: BookingSettingsForm) => {
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
        title={t('settings.booking.title', { defaultValue: 'Session Settings' })}
        description={t('settings.booking.sessionDescription', { defaultValue: 'Configure default session duration and capacity.' })}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label={t('settings.booking.sessionDuration', { defaultValue: 'Default session duration (min)' })}
            type="number"
            {...register('defaultSessionDuration', { valueAsNumber: true })}
            error={!!formState.errors.defaultSessionDuration}
            helperText={formState.errors.defaultSessionDuration?.message}
            sx={{ minWidth: 180 }}
          />
          <TextField
            label={t('settings.booking.sessionCapacity', { defaultValue: 'Session capacity' })}
            type="number"
            {...register('sessionCapacity', { valueAsNumber: true })}
            error={!!formState.errors.sessionCapacity}
            helperText={formState.errors.sessionCapacity?.message}
            sx={{ minWidth: 180 }}
          />
        </Box>
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.booking.cutoffTitle', { defaultValue: 'Booking Cutoff' })}
        description={t('settings.booking.cutoffDescription', { defaultValue: 'Minimum time before a session that students can book.' })}
      >
        <TextField
          label={t('settings.booking.cutoffMinutes', { defaultValue: 'Cutoff (minutes before)' })}
          type="number"
          {...register('bookingCutoffMinutes', { valueAsNumber: true })}
          error={!!formState.errors.bookingCutoffMinutes}
          helperText={formState.errors.bookingCutoffMinutes?.message}
          fullWidth
          sx={{ maxWidth: 200 }}
        />
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.booking.timezoneTitle', { defaultValue: 'Timezone' })}
        description={t('settings.booking.timezoneDescription', { defaultValue: 'All times are displayed in this timezone.' })}
      >
        <TextField
          label={t('settings.booking.timezone', { defaultValue: 'Timezone' })}
          {...register('timezone')}
          error={!!formState.errors.timezone}
          helperText={formState.errors.timezone?.message}
          fullWidth
          sx={{ maxWidth: 320 }}
        />
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.booking.featuresTitle', { defaultValue: 'Features' })}
        description={t('settings.booking.featuresDescription', { defaultValue: 'Enable waitlist and recurring sessions.' })}
      >
        <Controller
          name="enableWaitlist"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label={t('settings.booking.enableWaitlist', { defaultValue: 'Enable waitlist for full sessions' })}
            />
          )}
        />
        <Controller
          name="enableRecurring"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label={t('settings.booking.enableRecurring', { defaultValue: 'Enable recurring sessions' })}
            />
          )}
        />
      </SettingsFormSection>
    </SettingsFormWrapper>
  )
}
