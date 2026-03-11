import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface TimeSlot {
  id: string
  start: string
  end: string
  available: boolean
  capacity?: number
  booked?: number
  type?: 'online' | 'offline'
}

export interface DaySlots {
  date: string
  slots: TimeSlot[]
}

export interface AvailabilityCalendarProps {
  weekSlots: DaySlots[]
  onSlotClick?: (slot: TimeSlot, date: string) => void
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function AvailabilityCalendar({ weekSlots, onSlotClick }: AvailabilityCalendarProps) {
  const { t } = useTranslation('dashboard')

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {t('booking.weekView', { defaultValue: 'Weekly Availability' })}
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ display: 'flex', gap: 2, minWidth: 'max-content' }}>
            {weekSlots.map((day) => (
              <Box key={day.date} sx={{ minWidth: 140 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {day.slots.map((slot) => (
                    <Chip
                      key={slot.id}
                      label={`${slot.start} - ${slot.end}${slot.type ? ` (${slot.type === 'online' ? t('booking.online', { defaultValue: 'Online' }) : t('booking.offline', { defaultValue: 'Offline' })})` : ''}`}
                      size="small"
                      variant={slot.available ? 'filled' : 'outlined'}
                      color={slot.available ? 'primary' : 'default'}
                      onClick={() => slot.available && onSlotClick?.(slot, day.date)}
                      sx={{
                        justifyContent: 'flex-start',
                        cursor: slot.available ? 'pointer' : 'default',
                        '&:hover': slot.available ? { opacity: 0.9 } : {},
                      }}
                    />
                  ))}
                  {day.slots.length === 0 && (
                    <Typography variant="caption" color="text.secondary">
                      {t('booking.noSlots', { defaultValue: 'No slots' })}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
