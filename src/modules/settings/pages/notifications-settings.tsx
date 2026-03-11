import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { SettingsFormSection } from '../components/settings-form-section'
import { SettingsFormWrapper } from '../components/settings-form-wrapper'

const notificationsSchema = z.object({
  emailBookings: z.boolean(),
  emailReminders: z.boolean(),
  smsReminders: z.boolean(),
  inAppNotifications: z.boolean(),
})

type NotificationsForm = z.infer<typeof notificationsSchema>

export function NotificationsSettingsPage() {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()

  const { handleSubmit, formState, control } = useForm<NotificationsForm>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailBookings: true,
      emailReminders: true,
      smsReminders: false,
      inAppNotifications: true,
    },
  })

  const saveMutation = useMutation({
    mutationFn: async (data: NotificationsForm) => {
      await apiClient.put('settings/notifications', { json: data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'notifications'] })
    },
  })

  const onSubmit = (data: NotificationsForm) => {
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
        title={t('settings.notifications.emailTitle', { defaultValue: 'Email Notifications' })}
        description={t('settings.notifications.emailDescription', { defaultValue: 'Configure email notifications.' })}
      >
        <Controller
          name="emailBookings"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label={t('settings.notifications.emailBookings', { defaultValue: 'New booking confirmations' })}
            />
          )}
        />
        <Controller
          name="emailReminders"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label={t('settings.notifications.emailReminders', { defaultValue: 'Session reminders' })}
            />
          )}
        />
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.notifications.smsTitle', { defaultValue: 'SMS Notifications' })}
        description={t('settings.notifications.smsDescription', { defaultValue: 'SMS reminders (requires SMS integration).' })}
      >
        <Controller
          name="smsReminders"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label={t('settings.notifications.smsReminders', { defaultValue: 'SMS session reminders' })}
            />
          )}
        />
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.notifications.inAppTitle', { defaultValue: 'In-App Notifications' })}
        description={t('settings.notifications.inAppDescription', { defaultValue: 'Notifications within the platform.' })}
      >
        <Controller
          name="inAppNotifications"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label={t('settings.notifications.inApp', { defaultValue: 'Enable in-app notifications' })}
            />
          )}
        />
      </SettingsFormSection>
    </SettingsFormWrapper>
  )
}
