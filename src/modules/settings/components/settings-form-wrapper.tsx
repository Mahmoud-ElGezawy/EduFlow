import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

export interface SettingsFormWrapperProps {
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  isSaving?: boolean
  saveLabel?: string
  isDirty?: boolean
}

/**
 * Wrapper for settings forms with async save support.
 * Handles loading state, save button, and form submission.
 */
export function SettingsFormWrapper({
  children,
  onSubmit,
  isSaving = false,
  saveLabel,
  isDirty = false,
}: SettingsFormWrapperProps) {
  const { t } = useTranslation('dashboard')
  const label = saveLabel ?? t('settings.save')
  const savingLabel = t('settings.saving', { defaultValue: 'Saving...' })
  const unsavedLabel = t('settings.unsavedChanges', { defaultValue: 'Unsaved changes' })

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 600, width: '100%' }}>
      {children}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSaving || !isDirty}
          startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {isSaving ? savingLabel : label}
        </Button>
        {isDirty && !isSaving && (
          <Typography variant="body2" color="text.secondary">
            {unsavedLabel}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
