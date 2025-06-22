import AnimatedHero from '@/components/AnimatedHero'
import { AnimatedServicesSection, AnimatedWhyChooseUsSection, AnimatedCTASection } from '@/components/AnimatedSections'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnimatedHero />
      
      {/* Services Section */}
      <AnimatedServicesSection />

      {/* Why Choose Us Section */}
      <AnimatedWhyChooseUsSection />

      {/* CTA Section */}
      <AnimatedCTASection />
    </div>
  )
} 