import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TeacherAboutProps {
  about: string
}

export function TeacherAbout({ about }: TeacherAboutProps) {
  const { t } = useTranslation()
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {t('about', { ns: 'teacher' })}
      </Typography>
      <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
        {about}
      </Typography>
    </Box>
  )
}
