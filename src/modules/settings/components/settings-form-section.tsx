import { Box, Card, CardContent, Typography } from '@mui/material'
import type { ReactNode } from 'react'

export interface SettingsFormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

/**
 * Reusable section wrapper for settings forms.
 * Provides consistent card styling and optional description.
 */
export function SettingsFormSection({ title, description, children }: SettingsFormSectionProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: description ? 1 : 2 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</Box>
      </CardContent>
    </Card>
  )
}
