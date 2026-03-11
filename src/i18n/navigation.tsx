import { forwardRef, useCallback } from 'react'
import { useNavigate, useLocation, useParams } from '@tanstack/react-router'
import { getLangFromPath, type Language } from './resource'

/** Normalize path for comparison: strip hash, query, trailing slash */
function normalizePath(p: string): string {
  const base = (p.split('#')[0].split('?')[0] || '/').replace(/\/$/, '') || '/'
  return base
}

/**
 * Check if current path matches the link's path.
 * @param currentPath - Path without lang (from getPathWithoutLang)
 * @param to - Link target path
 * @param exact - If true, only exact match. If false, also match subpaths (path.startsWith(to + '/'))
 */
export function isPathActive(currentPath: string, to: string, exact?: boolean): boolean {
  const curr = normalizePath(currentPath || '/')
  const target = normalizePath(to || '/')
  if (curr === target) return true
  if (exact) return false
  return curr.startsWith(target + '/')
}

/** Hook to check if a link is active based on current route */
export function useIsActiveLink(to: string, exact?: boolean): boolean {
  const { pathname } = useLocation()
  const currentPath = getPathWithoutLang(pathname)
  return isPathActive(currentPath, to, exact)
}

/** Prefer route param when inside $lang route; otherwise pathname/localStorage/browser. */
export function useCurrentLang(): Language {
  const params = useParams({ strict: false })
  const { pathname } = useLocation()
  const fromParams = params?.lang === 'ar' || params?.lang === 'en' ? (params.lang as Language) : null
  return fromParams ?? getLangFromPath(pathname)
}

export function useI18nNavigate() {
  const navigate = useNavigate()
  const lang = useCurrentLang()

  return useCallback(
    (to: string | { to: string; replace?: boolean }) => {
      const path = typeof to === 'string' ? to : to.to
      const replace = typeof to === 'object' ? to.replace : false
      const { to: routeTo, params: routeParams, hash } = toRoutePath(path, lang)
      navigate({ to: routeTo, params: routeParams, ...(hash && { hash }), replace })
    },
    [navigate, lang]
  )
}

export interface I18nLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  children?: React.ReactNode
}

export function toRoutePath(path: string, lang: string): { to: string; params: { lang: string }; hash?: string } {
  const [pathPart, hashPart] = path.includes('#') ? path.split('#') : [path, '']
  const hash = hashPart ? hashPart : undefined
  const normalized = pathPart.startsWith('/') ? pathPart : `/${pathPart}`
  const langMatch = normalized.match(/^\/(ar|en)(\/|$)/)
  const resolvedLang = langMatch ? langMatch[1] : lang
  let pathWithoutLang = langMatch ? normalized.replace(/^\/(ar|en)/, '') || '/' : normalized
  // Match route tree format: no trailing slashes (/$lang/dashboard, /$lang/dashboard/students)
  pathWithoutLang = pathWithoutLang.replace(/\/$/, '') || '/'
  const routePath = `/$lang${pathWithoutLang === '/' ? '' : pathWithoutLang}`
  return { to: routePath as '/', params: { lang: resolvedLang }, hash }
}

/** Get path without locale prefix (e.g. /ar/dashboard/students -> /dashboard/students) */
export function getPathWithoutLang(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const pathToUse = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname
  const normalized = pathToUse.startsWith('/') ? pathToUse : `/${pathToUse}`
  let pathWithoutLang = normalized.replace(/^\/(ar|en)(\/|$)/, '') || '/'
  pathWithoutLang = pathWithoutLang.replace(/\/$/, '') || pathWithoutLang || '/'
  return pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`
}

/** Build locale-prefixed href for a path (e.g. /dashboard/students + 'ar' -> /ar/dashboard/students) */
export function getI18nHref(path: string, lang: string): string {
  const [pathPart, hashPart] = path.includes('#') ? path.split('#') : [path, '']
  const hash = hashPart ? `#${hashPart}` : ''
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  const normalized = pathPart.startsWith('/') ? pathPart : `/${pathPart}`
  const pathWithoutLang = normalized.replace(/^\/(ar|en)(\/|$)/, '') || '/'
  const cleanPath = pathWithoutLang.replace(/\/$/, '') || pathWithoutLang
  const pathHref = `/${lang}${cleanPath === '/' ? '' : cleanPath}`
  const href = base ? `${base}${pathHref}` : pathHref
  return href + hash
}

/**
 * I18n-aware link that renders a native <a> with proper ref forwarding for MUI.
 * Uses client-side navigation on click while providing correct href for SEO and new-tab.
 */
export const I18nLink = forwardRef<HTMLAnchorElement, I18nLinkProps>(function I18nLink({ to, onClick, ...props }, ref) {
  const navigate = useNavigate()
  const lang = useCurrentLang()
  const { to: routeTo, params: routeParams, hash } = toRoutePath(to, lang)
  const href = getI18nHref(to, lang)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Run our navigation first (before parent onClick which may preventDefault)
      if (!props.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault()
        navigate({ to: routeTo, params: routeParams, ...(hash && { hash }) })
      }
      onClick?.(e)
    },
    [onClick, props.target, routeTo, routeParams, hash, navigate]
  )

  return <a ref={ref} href={href} onClick={handleClick} {...props} />
})
I18nLink.displayName = 'I18nLink'
