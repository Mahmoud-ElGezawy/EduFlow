import { Container } from '@mui/material'
import { HeroSection } from '../components/hero-section'
import { BenefitsSection } from '../components/benefits-section'
import { TeacherExamples } from '../components/teacher-examples'
import { PricingSection } from '../components/pricing-section'
import { TestimonialsSection } from '../components/testimonials-section'
import { CallToAction } from '../components/call-to-action'

export function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <HeroSection />
      <BenefitsSection />
      <TeacherExamples />
      <PricingSection />
      <TestimonialsSection />
      <CallToAction />
    </Container>
  )
}
