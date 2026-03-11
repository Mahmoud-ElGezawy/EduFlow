import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import type { SessionType } from '@/api/mock-data'

export interface OfflineStudent {
  id: string
  name: string
  phone: string
  email: string
  notes?: string
}

export interface BookingModalProps {
  open: boolean
  onClose: () => void
  slotId: string
  date: string
  start: string
  end: string
  type?: SessionType
  onSave: (data: { type: SessionType; students?: OfflineStudent[] }) => void
}

export function BookingModal({ open, onClose, slotId, date, start, end, type, onSave }: BookingModalProps) {
  const { t } = useTranslation('dashboard')
  const [sessionType, setSessionType] = useState<SessionType>(type ?? 'online')
  const [students, setStudents] = useState<OfflineStudent[]>([
    { id: '1', name: '', phone: '', email: '' },
  ])

  const addStudent = () => {
    setStudents((prev) => [
      ...prev,
      { id: String(Date.now()), name: '', phone: '', email: '' },
    ])
  }

  const removeStudent = (id: string) => {
    setStudents((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev))
  }

  const updateStudent = (id: string, field: keyof OfflineStudent, value: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSave = () => {
    if (sessionType === 'offline') {
      const valid = students.every((s) => s.name.trim())
      if (!valid) return
      onSave({ type: 'offline', students })
    } else {
      onSave({ type: 'online' })
    }
    onClose()
    setSessionType(type ?? 'online')
    setStudents([{ id: '1', name: '', phone: '', email: '' }])
  }

  const handleClose = () => {
    onClose()
    setSessionType(type ?? 'online')
    setStudents([{ id: '1', name: '', phone: '', email: '' }])
  }

  const dateFormatted = new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t('booking.bookSlot', { defaultValue: 'Book a Session' })} — {dateFormatted} {start}–{end}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <RadioGroup
            row
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value as SessionType)}
          >
            <FormControlLabel value="online" control={<Radio />} label={t('booking.online', { defaultValue: 'Online' })} />
            <FormControlLabel value="offline" control={<Radio />} label={t('booking.offline', { defaultValue: 'Offline (In-person)' })} />
          </RadioGroup>

          {sessionType === 'offline' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {t('booking.studentDetails', { defaultValue: 'Student details (for groups)' })}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                {t('booking.studentDetailsHint', { defaultValue: 'Enter student info for each attendee. Save as a group.' })}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {students.map((student) => (
                  <Box
                    key={student.id}
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {t('booking.student', { defaultValue: 'Student' })} #{students.indexOf(student) + 1}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeStudent(student.id)}
                        disabled={students.length === 1}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <TextField
                      label={t('booking.studentName', { defaultValue: 'Name' })}
                      value={student.name}
                      onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                      size="small"
                      required
                      fullWidth
                    />
                    <TextField
                      label={t('booking.studentPhone', { defaultValue: 'Phone' })}
                      value={student.phone}
                      onChange={(e) => updateStudent(student.id, 'phone', e.target.value)}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label={t('booking.studentEmail', { defaultValue: 'Email' })}
                      type="email"
                      value={student.email}
                      onChange={(e) => updateStudent(student.id, 'email', e.target.value)}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label={t('booking.notes', { defaultValue: 'Notes' })}
                      value={student.notes ?? ''}
                      onChange={(e) => updateStudent(student.id, 'notes', e.target.value)}
                      size="small"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={addStudent} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                  {t('booking.addStudent', { defaultValue: 'Add student' })}
                </Button>
              </Box>
            </Box>
          )}

          {sessionType === 'online' && (
            <Typography variant="body2" color="text.secondary">
              {t('booking.onlineHint', { defaultValue: 'Online sessions use a video link. Students will receive the link when they book.' })}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>{t('booking.cancel', { defaultValue: 'Cancel' })}</Button>
        <Button variant="contained" onClick={handleSave}>
          {t('booking.saveGroup', { defaultValue: 'Save' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
