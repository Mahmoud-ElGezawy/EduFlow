export const LANGUAGES = ['ar', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

export const LOCALE_DEFAULT: Language = 'ar'

export function getSupportedLanguage(lang: string): Language {
  return LANGUAGES.includes(lang as Language) ? (lang as Language) : LOCALE_DEFAULT
}

/** Get user's preferred language when pathname has no lang (e.g. at root). Matches RedirectToLang logic. */
function getPreferredLang(): Language {
  if (typeof window === 'undefined') return LOCALE_DEFAULT
  const stored = (localStorage.getItem('i18nextLng') || '').split('-')[0]
  if (stored === 'ar' || stored === 'en') return stored
  const browserLang = navigator.language?.startsWith('ar')
    ? 'ar'
    : navigator.language?.startsWith('en')
      ? 'en'
      : null
  return (browserLang as Language) ?? LOCALE_DEFAULT
}

export function getLangFromPath(pathname: string): Language {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const pathWithoutBase = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname
  const segment = pathWithoutBase.split('/').filter(Boolean)[0]
  const fromPath = segment === 'ar' || segment === 'en' ? (segment as Language) : null
  return fromPath ?? getPreferredLang()
}

export function getLangDirection(lng: Language): 'rtl' | 'ltr' {
  return lng === 'ar' ? 'rtl' : 'ltr'
}
