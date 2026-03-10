import { Outlet, createRootRoute, HeadContent, useLocation } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import i18n from '@/i18n'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { theme } from '@/theme'
import { Header } from '@/global/components/header'
import { Footer } from '@/global/components/footer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const emotionCache = createCache({ key: 'css', prepend: true })

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'SaaS LMS' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const { pathname } = useLocation()
  const langRef = useRef<string | null>(null)

  const lang = (() => {
    const seg = pathname.split('/').filter(Boolean)[0]
    return seg === 'ar' || seg === 'en' ? seg : 'ar'
  })()

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (pathname === '/' || pathname === '') return
    if (langRef.current === lang) return
    langRef.current = lang

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'

    const current = i18n.language?.split('-')[0]
    if (current !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, pathname])

  return (
    <AppQueryClientProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              '[lang="ar"]': { fontFamily: '"Cairo", "Helvetica", "Arial", sans-serif' },
              '[lang="en"]': { fontFamily: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif' },
            }}
          />
          <CssBaseline />
          <HeadContent />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Outlet />
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </AppQueryClientProvider>
  )
}

function AppQueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
