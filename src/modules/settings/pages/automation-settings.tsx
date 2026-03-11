import { useState } from 'react'
import { Box, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { mockAutomationRules } from '@/api/mock-data'
import type { AutomationRule } from '@/api/mock-data'
import { SettingsFormSection } from '../components/settings-form-section'

const TRIGGERS = [
  { value: 'booking', label: 'Student books class' },
  { value: 'enrollment', label: 'New enrollment' },
  { value: 'assignment_submitted', label: 'Assignment submitted' },
  { value: 'lesson_completed', label: 'Lesson completed' },
]

const ACTIONS = [
  { value: 'reminder_email', label: 'Send reminder email 24h before' },
  { value: 'welcome_email', label: 'Send welcome email' },
  { value: 'notify_teacher', label: 'Notify teacher' },
  { value: 'sms_reminder', label: 'Send SMS reminder' },
]

export function AutomationSettingsPage() {
  const { t } = useTranslation('dashboard')
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomationRules)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTrigger, setNewTrigger] = useState('booking')
  const [newAction, setNewAction] = useState('reminder_email')

  const addRule = () => {
    const triggerLabel = TRIGGERS.find((t) => t.value === newTrigger)?.label ?? newTrigger
    const actionLabel = ACTIONS.find((a) => a.value === newAction)?.label ?? newAction
    setRules((prev) => [
      ...prev,
      { id: String(Date.now()), trigger: triggerLabel, action: actionLabel, enabled: true },
    ])
    setShowAddForm(false)
  }

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  return (
    <Box>
      <SettingsFormSection
        title={t('settings.automation.title', { defaultValue: 'Automation Rules' })}
        description={t('settings.automation.description', {
          defaultValue: 'Define rules to automate actions (e.g. send reminder when student books class).',
        })}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {rules.map((rule) => (
            <Card key={rule.id} variant="outlined">
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography fontWeight={600}>{rule.trigger}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    → {rule.action}
                  </Typography>
                </Box>
                <Chip
                  label={rule.enabled ? t('settings.automation.enabled', { defaultValue: 'Enabled' }) : t('settings.automation.disabled', { defaultValue: 'Disabled' })}
                  color={rule.enabled ? 'success' : 'default'}
                  size="small"
                  onClick={() => toggleRule(rule.id)}
                  sx={{ cursor: 'pointer' }}
                />
              </CardContent>
            </Card>
          ))}
          {showAddForm ? (
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>{t('settings.automation.when', { defaultValue: 'When' })}</InputLabel>
                  <Select value={newTrigger} label={t('settings.automation.when', { defaultValue: 'When' })} onChange={(e) => setNewTrigger(e.target.value)}>
                    {TRIGGERS.map((tr) => (
                      <MenuItem key={tr.value} value={tr.value}>{tr.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>{t('settings.automation.then', { defaultValue: 'Then' })}</InputLabel>
                  <Select value={newAction} label={t('settings.automation.then', { defaultValue: 'Then' })} onChange={(e) => setNewAction(e.target.value)}>
                    {ACTIONS.map((a) => (
                      <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography
                    component="button"
                    variant="body2"
                    color="primary"
                    onClick={addRule}
                    sx={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {t('settings.automation.saveRule', { defaultValue: 'Save Rule' })}
                  </Typography>
                  <Typography
                    component="button"
                    variant="body2"
                    color="text.secondary"
                    onClick={() => setShowAddForm(false)}
                    sx={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    {t('common.cancel', { ns: 'common', defaultValue: 'Cancel' })}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ) : (
            <Card
              variant="outlined"
              sx={{
                borderStyle: 'dashed',
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
              }}
              onClick={() => setShowAddForm(true)}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <AddIcon />
                <Typography>{t('settings.automation.addRule', { defaultValue: 'Add automation rule' })}</Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </SettingsFormSection>
    </Box>
  )
}
