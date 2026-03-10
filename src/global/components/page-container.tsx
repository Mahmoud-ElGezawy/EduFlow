import { Container } from '@mui/material'

interface PageContainerProps {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export function PageContainer({ children, maxWidth = 'lg' }: PageContainerProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
      {children}
    </Container>
  )
}
