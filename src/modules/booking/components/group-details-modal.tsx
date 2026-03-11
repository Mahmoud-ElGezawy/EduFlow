import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Close as CloseIcon, Person as PersonIcon, Schedule as ScheduleIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import type { SessionGroup } from '@/api/mock-data'

export interface GroupDetailsModalProps {
  open: boolean
  onClose: () => void
  group: SessionGroup | null
}

export function GroupDetailsModal({ open, onClose, group }: GroupDetailsModalProps) {
  const { t } = useTranslation('dashboard')

  if (!group) return null

  const dateFormatted = new Date(group.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const studentCount = group.students?.length ?? 0

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('booking.groupDetails', { defaultValue: 'Session Details' })}
        </Typography>
        <IconButton aria-label={t('booking.close', { defaultValue: 'Close' })} onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Session info */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignItems: 'center',
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon color="action" fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('booking.date', { defaultValue: 'Date' })}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {dateFormatted}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('booking.time', { defaultValue: 'Time' })}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {group.start} – {group.end}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="action" fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('booking.studentsCount', { defaultValue: 'Students' })}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {studentCount}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={group.type === 'online' ? t('booking.online', { defaultValue: 'Online' }) : t('booking.offline', { defaultValue: 'Offline' })}
              size="small"
              color={group.type === 'online' ? 'info' : 'default'}
              variant="outlined"
            />
          </Box>

          {group.notes && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t('booking.notes', { defaultValue: 'Notes' })}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {group.notes}
              </Typography>
            </Box>
          )}

          {/* Student list */}
          {group.type === 'offline' && group.students && group.students.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('booking.studentList', { defaultValue: 'Students in this session' })} ({studentCount})
                </Typography>
                <List dense disablePadding sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
                  {group.students.map((student, idx) => (
                    <ListItem key={student.id} sx={{ py: 1.5, borderBottom: idx < group.students!.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {student.name}
                            </Typography>
                            {student.phone && (
                              <Typography variant="caption" color="text.secondary">
                                {t('booking.phone', { defaultValue: 'Phone' })}: {student.phone}
                              </Typography>
                            )}
                            {student.email && (
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                {t('booking.email', { defaultValue: 'Email' })}: {student.email}
                              </Typography>
                            )}
                            {student.notes && (
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                                {student.notes}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}

          {group.type === 'online' && (
            <Typography variant="body2" color="text.secondary">
              {t('booking.onlineSessionDetails', { defaultValue: 'Online session. Video link is sent to participants.' })}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
