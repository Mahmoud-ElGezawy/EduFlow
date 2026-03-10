import i18n from './i18n'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

// Hard redirect before React mounts - prevents router redirect loop
if (typeof window !== 'undefined') {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const path = window.location.pathname
  const rootPath = base ? `${base}/` : '/'
  if (path === rootPath || path === base || path === '/' || path === '') {
    // Preserve user's language: check i18next stored preference, then browser, default to 'ar'
    const stored = (localStorage.getItem('i18nextLng') || '').split('-')[0]
    const browserLang = navigator.language?.startsWith('ar') ? 'ar' : navigator.language?.startsWith('en') ? 'en' : null
    const lang = (stored === 'ar' || stored === 'en') ? stored : browserLang ?? 'ar'
    window.location.replace(`${rootPath}${lang}`)
  } else {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    )
  }
}
