import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import { Visibility as ViewIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AvailabilityCalendar } from '../components/availability-calendar'
import { AvailabilityEditor } from '../components/availability-editor'
import { BookingCalendar } from '../components/booking-calendar'
import { BookingModal } from '../components/booking-modal'
import { GroupDetailsModal } from '../components/group-details-modal'
import { mockBookingWeekSlots, mockSessionGroups } from '@/api/mock-data'
import type { OfflineStudent } from '../components/booking-modal'
import type { SessionGroup } from '@/api/mock-data'

export function BookingDashboard() {
  const { t } = useTranslation('dashboard')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ slot: { id: string; start: string; end: string; type?: 'online' | 'offline' }; date: string } | null>(null)
  const [groups, setGroups] = useState<SessionGroup[]>(mockSessionGroups)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<SessionGroup | null>(null)

  const handleSlotClick = (slot: { id: string; start: string; end: string; type?: 'online' | 'offline' }, date: string) => {
    setSelectedSlot({ slot, date })
    setModalOpen(true)
  }

  const handleSave = (data: { type: 'online' | 'offline'; students?: OfflineStudent[] }) => {
    if (!selectedSlot) return
    const newGroup: SessionGroup = {
      id: `g-${Date.now()}`,
      slotId: selectedSlot.slot.id,
      date: selectedSlot.date,
      start: selectedSlot.slot.start,
      end: selectedSlot.slot.end,
      type: data.type,
      createdAt: new Date().toISOString(),
      students: data.type === 'offline' && data.students?.length
        ? data.students.map((s) => ({ id: s.id, name: s.name, phone: s.phone, email: s.email, notes: s.notes }))
        : undefined,
    }
    setGroups((prev) => [newGroup, ...prev])
  }

  const handleViewDetails = (group: SessionGroup) => {
    setSelectedGroup(group)
    setDetailsModalOpen(true)
  }

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('booking.title', { defaultValue: 'Booking & Sessions' })}
      </Typography>

      {/* Booked Sessions */}
      {groups.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {t('booking.bookedSessions', { defaultValue: 'Booked Sessions' })}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {groups.map((group) => (
                <Box
                  key={group.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {formatDate(group.date)} · {group.start}–{group.end}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={group.type === 'online' ? t('booking.online', { defaultValue: 'Online' }) : t('booking.offline', { defaultValue: 'Offline' })}
                        size="small"
                        color={group.type === 'online' ? 'info' : 'default'}
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {group.students?.length ?? 0} {t('booking.studentsInSession', { defaultValue: 'students' })}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => handleViewDetails(group)}
                  >
                    {t('booking.viewDetails', { defaultValue: 'View Details' })}
                  </Button>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BookingCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </Grid>
        <Grid item xs={12} md={8}>
          <AvailabilityEditor />
          <Box sx={{ mt: 3 }}>
            <AvailabilityCalendar
              weekSlots={mockBookingWeekSlots}
              onSlotClick={handleSlotClick}
            />
          </Box>
        </Grid>
      </Grid>
      {selectedSlot && (
        <BookingModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          slotId={selectedSlot.slot.id}
          date={selectedSlot.date}
          start={selectedSlot.slot.start}
          end={selectedSlot.slot.end}
          type={selectedSlot.slot.type}
          onSave={handleSave}
        />
      )}
      <GroupDetailsModal open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} group={selectedGroup} />
    </Box>
  )
}
