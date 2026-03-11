import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useState } from 'react'
import { mockAcademySettings, mockThemeLayoutBlocks } from '@/api/mock-data'
import { LayoutBlocksEditor } from '../components/layout-blocks-editor'
import { SettingsFormSection } from '../components/settings-form-section'
import { SettingsFormWrapper } from '../components/settings-form-wrapper'

const THEME_PALETTES = [
  { value: 'teal', label: 'Teal', primary: '#0D9488' },
  { value: 'indigo', label: 'Indigo', primary: '#4F46E5' },
  { value: 'violet', label: 'Violet', primary: '#7C3AED' },
  { value: 'rose', label: 'Rose', primary: '#E11D48' },
  { value: 'emerald', label: 'Emerald', primary: '#059669' },
]

const FONT_OPTIONS = [
  { value: 'plus-jakarta', label: 'Plus Jakarta Sans' },
  { value: 'inter', label: 'Inter' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'cairo', label: 'Cairo (Arabic)' },
]

const themeSettingsSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
  fontFamily: z.string().min(1),
  borderRadius: z.number().min(0).max(24),
})

type ThemeSettingsForm = z.infer<typeof themeSettingsSchema>

export function ThemeSettingsPage() {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()
  const settings = mockAcademySettings
  const [layoutBlocks, setLayoutBlocks] = useState(mockThemeLayoutBlocks)

  const { register, handleSubmit, formState, watch, setValue, control } = useForm<ThemeSettingsForm>({
    resolver: zodResolver(themeSettingsSchema),
    defaultValues: {
      primaryColor: settings.primaryColor,
      fontFamily: 'plus-jakarta',
      borderRadius: 12,
    },
  })

  const primaryColor = watch('primaryColor')

  const saveMutation = useMutation({
    mutationFn: async (data: ThemeSettingsForm) => {
      await apiClient.put('settings/theme', { json: data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'theme'] })
    },
  })

  const onSubmit = (data: ThemeSettingsForm) => {
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
        title={t('settings.themeColor')}
        description={t('settings.themeColorDescription', { defaultValue: 'Customize your academy branding colors.' })}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          {THEME_PALETTES.map((p) => (
            <Box
              key={p.value}
              onClick={() => setValue('primaryColor', p.primary, { shouldDirty: true })}
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                backgroundColor: p.primary,
                border: p.primary === primaryColor ? '3px solid' : '2px solid',
                borderColor: p.primary === primaryColor ? 'primary.main' : 'divider',
                cursor: 'pointer',
                '&:hover': { opacity: 0.9 },
              }}
            />
          ))}
          <TextField
            label={t('settings.customColor', { defaultValue: 'Custom hex' })}
            {...register('primaryColor')}
            error={!!formState.errors.primaryColor}
            helperText={formState.errors.primaryColor?.message}
            sx={{ width: 100 }}
          />
        </Box>
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.fontTitle', { defaultValue: 'Typography' })}
        description={t('settings.fontDescription', { defaultValue: 'Choose a font for your storefront.' })}
      >
        <FormControl fullWidth sx={{ maxWidth: 280 }}>
          <InputLabel>{t('settings.fontFamily', { defaultValue: 'Font family' })}</InputLabel>
          <Controller
            name="fontFamily"
            control={control}
            render={({ field }) => (
              <Select {...field} label={t('settings.fontFamily', { defaultValue: 'Font family' })}>
                {FONT_OPTIONS.map((f) => (
                  <MenuItem key={f.value} value={f.value}>
                    {f.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.borderRadiusTitle', { defaultValue: 'Border radius' })}
        description={t('settings.borderRadiusDescription', { defaultValue: 'Roundness of cards and buttons.' })}
      >
        <TextField
          label={t('settings.borderRadius', { defaultValue: 'Border radius (px)' })}
          type="number"
          {...register('borderRadius', { valueAsNumber: true })}
          error={!!formState.errors.borderRadius}
          helperText={formState.errors.borderRadius?.message}
          sx={{ maxWidth: 120 }}
        />
      </SettingsFormSection>

      <SettingsFormSection
        title={t('settings.layoutBlocksTitle', { defaultValue: 'Layout Blocks' })}
        description={t('settings.layoutBlocksSectionDescription', { defaultValue: 'Customize your storefront homepage sections.' })}
      >
        <LayoutBlocksEditor blocks={layoutBlocks} onBlocksChange={setLayoutBlocks} />
      </SettingsFormSection>
    </SettingsFormWrapper>
  )
}
