import { Box, Button, Card, CardContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export type SessionType = 'online' | 'offline'

export interface AvailabilitySlot {
  dayOfWeek: number
  startTime: string
  endTime: string
  capacity: number
  type: SessionType
}

export function AvailabilityEditor() {
  const { t } = useTranslation('dashboard')
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [recurring, setRecurring] = useState(true)

  const addSlot = () => {
    setSlots((prev) => [
      ...prev,
      { dayOfWeek: 0, startTime: '09:00', endTime: '10:00', capacity: 10, type: 'online' as const },
    ])
  }

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {t('booking.availability', { defaultValue: 'Set Your Availability' })}
        </Typography>
        <FormControlLabel
          control={<Switch checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />}
          label={t('booking.recurringSessions', { defaultValue: 'Recurring weekly sessions' })}
        />
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {slots.map((slot, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                select
                SelectProps={{ native: true }}
                label={t('booking.day', { defaultValue: 'Day' })}
                value={slot.dayOfWeek}
                onChange={(e) =>
                  setSlots((prev) => {
                    const next = [...prev]
                    next[i] = { ...next[i], dayOfWeek: Number(e.target.value) }
                    return next
                  })
                }
                sx={{ minWidth: 120 }}
              >
                {DAYS.map((d, idx) => (
                  <option key={idx} value={idx}>
                    {d}
                  </option>
                ))}
              </TextField>
              <TextField
                type="time"
                label={t('booking.start', { defaultValue: 'Start' })}
                value={slot.startTime}
                onChange={(e) =>
                  setSlots((prev) => {
                    const next = [...prev]
                    next[i] = { ...next[i], startTime: e.target.value }
                    return next
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 100 }}
              />
              <TextField
                type="time"
                label={t('booking.end', { defaultValue: 'End' })}
                value={slot.endTime}
                onChange={(e) =>
                  setSlots((prev) => {
                    const next = [...prev]
                    next[i] = { ...next[i], endTime: e.target.value }
                    return next
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 100 }}
              />
              <TextField
                type="number"
                label={t('booking.capacity', { defaultValue: 'Capacity' })}
                value={slot.capacity}
                onChange={(e) =>
                  setSlots((prev) => {
                    const next = [...prev]
                    next[i] = { ...next[i], capacity: Number(e.target.value) }
                    return next
                  })
                }
                sx={{ minWidth: 80 }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>{t('booking.sessionType', { defaultValue: 'Type' })}</InputLabel>
                <Select
                  value={slot.type}
                  label={t('booking.sessionType', { defaultValue: 'Type' })}
                  onChange={(e) =>
                    setSlots((prev) => {
                      const next = [...prev]
                      next[i] = { ...next[i], type: e.target.value as 'online' | 'offline' }
                      return next
                    })
                  }
                >
                  <MenuItem value="online">{t('booking.online', { defaultValue: 'Online' })}</MenuItem>
                  <MenuItem value="offline">{t('booking.offline', { defaultValue: 'Offline' })}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addSlot} variant="outlined" sx={{ alignSelf: 'flex-start' }}>
            {t('booking.addSlot', { defaultValue: 'Add time slot' })}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
