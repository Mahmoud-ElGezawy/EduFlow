import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import arCommon from '../locales/ar/common.json'
import arHome from '../locales/ar/home.json'
import arDashboard from '../locales/ar/dashboard.json'
import arTeacher from '../locales/ar/teacher.json'
import arCourse from '../locales/ar/course.json'
import arStudent from '../locales/ar/student.json'
import arPayment from '../locales/ar/payment.json'
import arLessons from '../locales/ar/lessons.json'

import enCommon from '../locales/en/common.json'
import enHome from '../locales/en/home.json'
import enDashboard from '../locales/en/dashboard.json'
import enTeacher from '../locales/en/teacher.json'
import enCourse from '../locales/en/course.json'
import enStudent from '../locales/en/student.json'
import enPayment from '../locales/en/payment.json'
import enLessons from '../locales/en/lessons.json'

const SUPPORTED = ['ar', 'en'] as const

function getInitialLang(): string {
  if (typeof window === 'undefined') return 'ar'
  const seg = window.location.pathname.split('/').filter(Boolean)[0]
  return SUPPORTED.includes(seg as (typeof SUPPORTED)[number]) ? seg : 'ar'
}

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      common: arCommon,
      home: arHome,
      dashboard: arDashboard,
      teacher: arTeacher,
      course: arCourse,
      student: arStudent,
      payment: arPayment,
      lessons: arLessons,
    },
    en: {
      common: enCommon,
      home: enHome,
      dashboard: enDashboard,
      teacher: enTeacher,
      course: enCourse,
      student: enStudent,
      payment: enPayment,
      lessons: enLessons,
    },
  },
  lng: getInitialLang(),
  fallbackLng: 'ar',
  defaultNS: 'common',
  ns: ['common', 'home', 'dashboard', 'teacher', 'course', 'student', 'payment', 'lessons'],
  interpolation: { escapeValue: false },
  initImmediate: false,
  react: { useSuspense: false },
})

export default i18n
export { LANGUAGES, LOCALE_DEFAULT, getSupportedLanguage } from './resource'
export { useI18nNavigate, I18nLink, useCurrentLang, useIsActiveLink, isPathActive, getPathWithoutLang } from './navigation'
