export const LANGUAGES = ['ar', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

export const LOCALE_DEFAULT: Language = 'ar'

export function getSupportedLanguage(lang: string): Language {
  return LANGUAGES.includes(lang as Language) ? (lang as Language) : LOCALE_DEFAULT
}

export function getLangFromPath(pathname: string): Language {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const pathWithoutBase = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname
  const segment = pathWithoutBase.split('/').filter(Boolean)[0]
  return getSupportedLanguage(segment ?? LOCALE_DEFAULT)
}

export function getLangDirection(lng: Language): 'rtl' | 'ltr' {
  return lng === 'ar' ? 'rtl' : 'ltr'
}
