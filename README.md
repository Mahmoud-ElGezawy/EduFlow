# SaaS LMS Frontend

A Learning Management System frontend built with React, TanStack Router, MUI, and TanStack Query.

## Tech Stack

- **Framework**: Vite + React
- **Routing**: TanStack Router (file-based)
- **UI**: MUI (Material UI)
- **Server State**: TanStack Query + react-query-kit
- **API Client**: ky
- **Forms**: react-hook-form + zod
- **i18n**: i18next (Arabic, English)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` to `/ar-sa/`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment

- `VITE_API_URL` - API base URL (default: `/api`)

## Route Structure

- `/` - Redirects to `/ar-sa/`
- `/{lang}/` - Homepage (ar-sa, en-sa)
- `/{lang}/subscribe` - Subscribe placeholder
- `/{lang}/teacher/{slug}` - Teacher academy page
- `/{lang}/course/{slug}` - Course details
- `/{lang}/dashboard` - Dashboard (overview, courses, students, assignments, payments, settings)

## Locales (i18n)

Translations are split by page/feature. Each file contains its own locale strings.

```
src/locales/
  ar-sa/
    common.json   # nav, loading, etc.
    home.json     # homepage sections
    dashboard.json
    teacher.json
    course.json
  en-sa/
    common.json
    home.json
    dashboard.json
    teacher.json
    course.json
```

Components use `t('key', { ns: 'home' })` to load from the `home` namespace.

## Mock Data

When the API is unavailable, the app falls back to mock data for demo purposes.
