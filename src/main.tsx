import i18n from './i18n'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

// Always render the app - let the router handle root redirect via client-side navigation.
// This avoids a full page load to /EduFlow/ar which would 404 on GitHub Pages.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
)
