import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ScrollVideo from '@/components/ScrollVideo'
import MenuSection from '@/components/MenuSection'
import ValuesSection from '@/components/ValuesSection'
import LocationSection from '@/components/LocationSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ScrollVideo />
      <MenuSection />
      <ValuesSection />
      <LocationSection />
      <CTASection />
      <Footer />
    </main>
  )
}
