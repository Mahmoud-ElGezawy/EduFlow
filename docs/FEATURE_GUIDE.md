# EduFlow LMS – Feature Guide

Where each feature lives, what’s implemented, and what’s planned.

---

## 1. Automation Rules

**"When student books class → send reminder email"**

| Item | Location | Status |
|------|----------|--------|
| **Settings page** | `src/modules/settings/pages/automation-settings.tsx` | ✅ Implemented |
| **Route** | `/dashboard/settings/automation` | ✅ |
| **Nav** | Settings sidebar → "Automation" | ✅ |

**What exists:**
- UI to add/edit rules (trigger → action)
- Triggers: Student books class, New enrollment, Assignment submitted, Lesson completed
- Actions: Send reminder email 24h before, Send welcome email, Notify teacher, Send SMS reminder
- Toggle rules on/off
- Mock data in `src/api/mock-data.ts` → `mockAutomationRules`

**What’s missing:**
- Backend API to persist rules
- Actual execution (no emails/SMS sent)
- Visual rule builder (drag-and-drop)
- More triggers/actions (webhook, create task)

---

## 2. Notification System

**Email, SMS, in-app notifications**

| Item | Location | Status |
|------|----------|--------|
| **Settings page** | `src/modules/settings/pages/notifications-settings.tsx` | ✅ Implemented |
| **Route** | `/dashboard/settings/notifications` | ✅ |
| **Nav** | Settings sidebar → "Notifications" | ✅ |

**What exists:**
- **Email:** New booking confirmations, Session reminders (toggles)
- **SMS:** Session reminders (toggle; needs Twilio or similar)
- **In-app:** Enable in-app notifications (toggle)
- Form with react-hook-form + zod
- Saves via `PUT /api/settings/notifications` (currently mocked)

**What’s missing:**
- Email templates (customize content)
- SMS provider integration (e.g. Twilio)
- In-app notification center (bell icon, dropdown, mark as read)
- Real email/SMS sending

---

## 3. Analytics Dashboard

**Teacher performance, revenue, engagement**

| Item | Location | Status |
|------|----------|--------|
| **Dashboard page** | `src/routes/$lang/dashboard/index.tsx` | ✅ Implemented |
| **Chart component** | `src/modules/dashboard/components/analytics-chart.tsx` | ✅ |
| **Route** | `/dashboard` (Overview) | ✅ |

**What exists:**
- **Stat cards:** Total students, Total courses, Revenue, Assignments pending
- **Revenue chart:** Line chart (Recharts)
- **Students chart:** Line chart
- **Student engagement:** Avg. progress %, Enrollments over time
- Mock data: `mockTeacherAnalytics`, `mockEngagementAnalytics` in `src/api/mock-data.ts`

**What’s missing:**
- Teacher performance (completion rates, ratings)
- Revenue breakdown by course/period
- Export (CSV/PDF)
- Date range filter
- More metrics (retention, churn, etc.)

**Libraries:** Recharts (already in `package.json`)

---

## 4. Booking System

**Availability, calendar, recurring, waitlist, capacity, cutoff, timezone**

### 4a. Booking Dashboard (main UI)

| Item | Location | Status |
|------|----------|--------|
| **Page** | `src/modules/booking/pages/booking-dashboard.tsx` | ✅ |
| **Route** | `/dashboard/booking` | ✅ |
| **Nav** | Dashboard sidebar → "Booking" | ✅ |

**Components:**
- `BookingCalendar` – Date picker to select a date
- `AvailabilityEditor` – Add time slots (day, start, end, capacity), recurring toggle
- `AvailabilityCalendar` – Week view of slots

### 4b. Booking Settings (configuration)

| Item | Location | Status |
|------|----------|--------|
| **Page** | `src/modules/settings/pages/booking-settings.tsx` | ✅ |
| **Route** | `/dashboard/settings/booking` | ✅ |

**What exists:**

| Feature | Where | Status |
|---------|-------|--------|
| **Session duration** | Settings → Booking | ✅ (default 60 min) |
| **Session capacity** | Settings → Booking | ✅ (default 10) |
| **Booking cutoff** | Settings → Booking | ✅ (minutes before session) |
| **Timezone** | Settings → Booking | ✅ (auto-detected) |
| **Waitlist** | Settings → Booking | ✅ (toggle) |
| **Recurring sessions** | Settings → Booking | ✅ (toggle) |
| **Availability editor** | Booking dashboard | ✅ (day, start, end, capacity per slot) |
| **Recurring toggle** | Availability editor | ✅ (weekly sessions) |
| **Calendar UI** | `BookingCalendar` (MUI DateCalendar) | ✅ |
| **Week view** | `AvailabilityCalendar` | ✅ |

**What’s missing:**
- Backend persistence of slots
- **Real waitlist** – join when full, notify when slot opens
- **Session capacity enforcement** – booking count vs capacity
- **Recurring templates** – CRUD for recurring availability
- **Full calendar view** – month/week with @mui/x-date-pickers or react-big-calendar
- **Timezone display** – show times in teacher/student timezone

**Libraries:** `@mui/x-date-pickers` (already in use)

---

## 5. Quick Reference: Routes & Files

| Feature | Route | Main File |
|---------|-------|-----------|
| Automation | `/dashboard/settings/automation` | `automation-settings.tsx` |
| Notifications | `/dashboard/settings/notifications` | `notifications-settings.tsx` |
| Analytics | `/dashboard` | `dashboard/index.tsx` |
| Booking | `/dashboard/booking` | `booking-dashboard.tsx` |
| Booking settings | `/dashboard/settings/booking` | `booking-settings.tsx` |

---

## 6. Suggested Libraries (Phase 2)

| Feature | Library | Purpose |
|---------|---------|---------|
| Full calendar | `@mui/x-date-pickers` (already used) or `react-big-calendar` | Month/week view |
| In-app notifications | `@mui/material` Snackbar | Toast-style notifications |
| Email templates | Custom | Rich text editor for templates |
| SMS | Twilio SDK | Send SMS |
| Analytics export | `jspdf` + `jspdf-autotable` or `papaparse` | PDF/CSV export |

---

## 7. API Endpoints (Backend TODO)

```
PUT  /api/settings/general
PUT  /api/settings/booking
PUT  /api/settings/payments
PUT  /api/settings/notifications
PUT  /api/settings/theme
GET  /api/booking/availability
POST /api/booking/slots
POST /api/automation/rules
```

---

## 8. Navigation Path

**Teacher dashboard sidebar** (`src/modules/dashboard/components/dashboard-sidebar.tsx`):
- Overview (analytics)
- Courses
- Students
- Assignments
- **Booking**
- Payments
- **Settings** (General, Booking, Payments, Notifications, Theme, Integrations, **Automation**)
