import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RedirectToAr,
})

function RedirectToAr() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/$lang', params: { lang: 'ar' }, replace: true })
  }, [navigate])
  return null
}
