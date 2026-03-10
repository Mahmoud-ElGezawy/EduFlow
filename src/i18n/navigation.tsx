import { forwardRef, useCallback } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { getLangFromPath } from './resource'

export function useI18nNavigate() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const lang = getLangFromPath(pathname)

  return useCallback(
    (to: string | { to: string; replace?: boolean }) => {
      const path = typeof to === 'string' ? to : to.to
      const replace = typeof to === 'object' ? to.replace : false
      const { to: routeTo, params: routeParams } = toRoutePath(path, lang)
      navigate({ to: routeTo, params: routeParams, replace })
    },
    [navigate, lang]
  )
}

export interface I18nLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  children?: React.ReactNode
}

export function toRoutePath(path: string, lang: string): { to: string; params: { lang: string } } {
  const [pathPart, hashPart] = path.includes('#') ? path.split('#') : [path, '']
  const hash = hashPart ? `#${hashPart}` : ''
  const normalized = pathPart.startsWith('/') ? pathPart : `/${pathPart}`
  const langMatch = normalized.match(/^\/(ar|en)(\/|$)/)
  const resolvedLang = langMatch ? langMatch[1] : lang
  let pathWithoutLang = langMatch ? normalized.replace(/^\/(ar|en)/, '') || '/' : normalized
  // Match route tree format: no trailing slashes (/$lang/dashboard, /$lang/dashboard/students)
  pathWithoutLang = pathWithoutLang.replace(/\/$/, '') || '/'
  const routePath = `/$lang${pathWithoutLang === '/' ? '' : pathWithoutLang}`
  return { to: (routePath + hash) as '/', params: { lang: resolvedLang } }
}

/** Get path without locale prefix (e.g. /ar/dashboard/students -> /dashboard/students) */
export function getPathWithoutLang(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const pathWithoutLang = normalized.replace(/^\/(ar|en)(\/|$)/, '') || '/'
  return pathWithoutLang.replace(/\/$/, '') || pathWithoutLang || '/'
}

/** Build locale-prefixed href for a path (e.g. /dashboard/students + 'ar' -> /ar/dashboard/students) */
export function getI18nHref(path: string, lang: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const normalized = path.startsWith('/') ? path : `/${path}`
  const pathWithoutLang = normalized.replace(/^\/(ar|en)(\/|$)/, '') || '/'
  const cleanPath = pathWithoutLang.replace(/\/$/, '') || pathWithoutLang
  const href = `/${lang}${cleanPath === '/' ? '' : cleanPath}`
  return base ? `${base}${href}` : href
}

/**
 * I18n-aware link that renders a native <a> with proper ref forwarding for MUI.
 * Uses client-side navigation on click while providing correct href for SEO and new-tab.
 */
export const I18nLink = forwardRef<HTMLAnchorElement, I18nLinkProps>(function I18nLink({ to, onClick, ...props }, ref) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const lang = getLangFromPath(pathname)
  const { to: routeTo, params: routeParams } = toRoutePath(to, lang)
  const href = getI18nHref(to, lang)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Run our navigation first (before parent onClick which may preventDefault)
      if (!props.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault()
        navigate({ to: routeTo, params: routeParams })
      }
      onClick?.(e)
    },
    [onClick, props.target, routeTo, routeParams, navigate]
  )

  return <a ref={ref} href={href} onClick={handleClick} {...props} />
})
I18nLink.displayName = 'I18nLink'
