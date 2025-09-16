import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturedProducts } from "@/components/featured-products"
import { LocationsSection } from "@/components/locations-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <FeaturedProducts />
      <LocationsSection />
      <Footer />
    </main>
  )
}
