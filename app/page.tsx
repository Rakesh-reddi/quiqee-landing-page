import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Categories } from '@/components/sections/categories'
import { LocalTrust } from '@/components/sections/local-trust'
import { SocialProof } from '@/components/sections/social-proof'
import { FinalCTA } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'
import { StickyWhatsAppButton } from '@/components/whatsapp-button'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Categories />
      <LocalTrust />
      <SocialProof />
      <FinalCTA />
      <Footer />
      <StickyWhatsAppButton />
    </main>
  )
}
