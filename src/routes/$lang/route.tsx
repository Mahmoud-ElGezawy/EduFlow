import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

const SUPPORTED_LANGS = ['ar', 'en'] as const

export const Route = createFileRoute('/$lang')({
  validateSearch: () => ({}),
  beforeLoad: ({ params }) => {
    const lang = params.lang
    if (!SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])) {
      throw redirect({ to: '/$lang', params: { lang: 'ar' }, replace: true })
    }
  },
  component: LangLayoutComponent,
})

function LangLayoutComponent() {
  return <Outlet />
}
