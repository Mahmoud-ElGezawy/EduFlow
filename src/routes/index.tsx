import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RedirectToLang,
})

function RedirectToLang() {
  const navigate = useNavigate()
  useEffect(() => {
    const stored = (localStorage.getItem('i18nextLng') || '').split('-')[0]
    const browserLang = navigator.language?.startsWith('ar') ? 'ar' : navigator.language?.startsWith('en') ? 'en' : null
    const lang = (stored === 'ar' || stored === 'en') ? stored : browserLang ?? 'ar'
    navigate({ to: '/$lang', params: { lang }, replace: true })
  }, [navigate])
  return null
}
