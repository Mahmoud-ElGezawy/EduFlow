# EduFlow LMS - Modular Architecture & Feature Roadmap

This document describes the scalable modular architecture implemented and suggests future enhancements.

## Implemented Features

### 1. Settings Architecture ✅

**Location:** `src/modules/settings/`

A Shopify-like settings structure with:

- **General** – Academy name, logo upload
- **Booking** – Session duration, capacity, cutoff rules, timezone, waitlist, recurring
- **Payments** – Currency, payout schedule, payout email
- **Notifications** – Email, SMS, in-app toggles
- **Theme** – Color palette, font selection, border radius
- **Integrations** – Zoom, Google Calendar, Stripe, Twilio (UI scaffolding)
- **Automation** – Rule builder scaffolding ("When X → do Y")

**Reusable components:**
- `SettingsFormSection` – Card-based section with title/description
- `SettingsFormWrapper` – Form wrapper with async save, validation, dirty state

**Pattern:** Each settings page uses react-hook-form + zod + TanStack Query mutations.

### 2. Booking System ✅

**Location:** `src/modules/booking/`

- **Availability Editor** – Add time slots (day, start, end, capacity), recurring toggle
- **Weekly Calendar** – Week view with available/booked slots
- **Settings integration** – Booking settings (cutoff, timezone, waitlist, recurring) in Settings → Booking

**Route:** `/dashboard/booking`

### 3. Theme Customization ✅

**Location:** `src/modules/settings/pages/theme-settings.tsx`

- Color palette presets (Teal, Indigo, Violet, Rose, Emerald)
- Custom hex color input
- Font family selection (Plus Jakarta, Inter, Poppins, Cairo)
- Border radius control

**Future:** Apply theme dynamically per teacher via React context or CSS variables.

### 4. Teacher Storefront ✅

**Location:** `src/modules/teacher-public/`

- **Booking Widget** – Sticky card on teacher page with "View Availability" CTA
- **Testimonials** – Mock reviews displayed on teacher page
- **Layout** – Grid layout with main content + sidebar booking widget

### 5. Analytics Dashboard ✅

**Location:** `src/routes/$lang/dashboard/index.tsx`

- Revenue chart
- Students chart
- **Student Engagement** – Avg. progress % and enrollments over time

### 6. Notification System ✅

**Location:** `src/modules/settings/pages/notifications-settings.tsx`

- Email: booking confirmations, session reminders
- SMS: session reminders (requires integration)
- In-app notifications toggle

### 7. Automation Rules ✅

**Location:** `src/modules/settings/pages/automation-settings.tsx`

- UI scaffolding for rules (trigger → action)
- Example rules: "Student books class → Send reminder email 24h before"

---

## Suggested Additional Features

### Booking System (Phase 2)

- **Calendar UI** – Full calendar view with @mui/x-date-pickers or react-big-calendar
- **Recurring sessions** – CRUD for recurring availability templates
- **Waitlist** – Join waitlist when session is full, notify when slot opens
- **Session capacity** – Per-slot capacity with booking count
- **Booking cutoff** – Enforce minimum hours before session
- **Timezone handling** – Display all times in teacher/student timezone

### Theme Customization (Phase 2)

- **Dynamic theme per teacher** – Store theme in API, apply via `createTheme()` + `ThemeProvider`
- **Layout blocks** – Configurable homepage sections (hero, courses, testimonials, CTA)
- **Section drag-and-drop** – Use @dnd-kit or react-beautiful-dnd for reordering

### Teacher Storefront (Phase 2)

- **Customizable landing pages** – Block-based page builder
- **Course showcase** – Featured courses, categories
- **Embeddable booking widget** – Iframe/script for external sites

### Analytics (Phase 2)

- **Teacher performance** – Completion rates, avg. rating
- **Revenue breakdown** – By course, by period
- **Export** – CSV/PDF reports

### Notifications (Phase 2)

- **Email templates** – Customizable templates per notification type
- **SMS provider** – Twilio integration
- **In-app notification center** – Bell icon with dropdown, mark as read

### Automation (Phase 2)

- **Visual rule builder** – Drag-and-drop trigger + action
- **Triggers:** booking, enrollment, assignment submitted, lesson completed
- **Actions:** send email, send SMS, create task, webhook

---

## Component Architecture

```
src/
├── modules/
│   ├── settings/           # Settings module
│   │   ├── components/     # Reusable settings UI
│   │   └── pages/          # Per-section pages
│   ├── booking/            # Booking module
│   │   ├── components/     # Calendar, editor
│   │   └── pages/          # Dashboard
│   ├── teacher-public/     # Public teacher pages
│   └── ...
├── api/                    # API client, resources, hooks
├── global/                 # Header, footer, shared components
└── theme/                  # MUI theme
```

**Patterns:**
- **Forms:** react-hook-form + zod + @hookform/resolvers
- **Data:** TanStack Query (createQuery, createMutation)
- **API:** ky client with typed resources
- **i18n:** react-i18next with namespaces (common, dashboard, teacher, etc.)

---

## Extending Settings

To add a new settings section:

1. Create `src/modules/settings/pages/my-section-settings.tsx`
2. Add route `src/routes/$lang/dashboard/settings/my-section.tsx`
3. Add nav item in `settings-layout.tsx`
4. Add translations in `locales/*/dashboard.json`

---

## API Endpoints (Backend TODO)

The frontend expects these endpoints (currently mocked):

- `PUT /api/settings/general`
- `PUT /api/settings/booking`
- `PUT /api/settings/payments`
- `PUT /api/settings/notifications`
- `PUT /api/settings/theme`
- `GET /api/booking/availability`
- `POST /api/booking/slots`
