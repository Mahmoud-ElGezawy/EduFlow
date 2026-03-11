import { Card, CardContent, Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import { useTranslation } from 'react-i18next'
import { useCurrentLang } from '@/i18n/navigation'

export interface BookingCalendarProps {
  selectedDate: Date | null
  onDateChange: (date: Date | null) => void
  bookedDates?: string[]
}

export function BookingCalendar({ selectedDate, onDateChange }: BookingCalendarProps) {
  const { t } = useTranslation('dashboard')
  const lang = useCurrentLang()
  const isRtl = lang === 'ar'

  return (
    <Card
      sx={{
        /* Fix calendar navigation arrows in RTL - flip icons so they point correctly */
        ...(isRtl && {
          '& .MuiPickersArrowSwitcher-previousIconButton svg, & .MuiPickersArrowSwitcher-nextIconButton svg':
            { transform: 'scaleX(-1)' },
        }),
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {t('booking.selectDate', { defaultValue: 'Select Date' })}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang === 'ar' ? 'ar' : 'en'}>
          <DateCalendar
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(d) => onDateChange(d ? d.toDate() : null)}
            disablePast
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  )
}
