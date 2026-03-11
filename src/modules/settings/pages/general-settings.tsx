import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, TextField, Typography } from '@mui/material'
import { CloudUpload as UploadIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { mockAcademySettings } from '@/api/mock-data'
import { SettingsFormSection } from '../components/settings-form-section'
import { SettingsFormWrapper } from '../components/settings-form-wrapper'

const generalSettingsSchema = z.object({
  academyName: z.string().min(1, 'Academy name is required'),
})

type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>

export function GeneralSettingsPage() {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const settings = mockAcademySettings

  const { register, handleSubmit, formState } = useForm<GeneralSettingsForm>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      academyName: settings.name,
    },
  })

  const saveMutation = useMutation({
    mutationFn: async (data: GeneralSettingsForm) => {
      await apiClient.put('settings/general', { json: data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })

  const onSubmit = (data: GeneralSettingsForm) => {
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
        title={t('settings.academyName')}
        description={t('settings.academyNameDescription', { defaultValue: 'Your academy or institution name displayed to students.' })}
      >
        <TextField
          label={t('settings.academyName')}
          {...register('academyName')}
          error={!!formState.errors.academyName}
          helperText={formState.errors.academyName?.message}
          fullWidth
        />
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.logoUpload')}
        description={t('settings.uploadLogoDescription', { defaultValue: 'Upload your academy logo. Recommended size: 200x200px.' })}
      >
        <Box
          component="label"
          htmlFor="logo-upload"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            py: 4,
            px: 2,
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
          }}
        >
          {logoPreview ? (
            <Box component="img" src={logoPreview} alt="Logo" sx={{ maxWidth: 120, maxHeight: 120, objectFit: 'contain' }} />
          ) : (
            <UploadIcon color="action" sx={{ fontSize: 48 }} />
          )}
          <Typography variant="body2" color="text.secondary">
            {t('settings.uploadLogo')}
          </Typography>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setLogoPreview(URL.createObjectURL(file))
            }}
          />
        </Box>
      </SettingsFormSection>
    </SettingsFormWrapper>
  )
}
