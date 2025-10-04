import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturedProducts } from "@/components/featured-products"
import { LocationsSection } from "@/components/locations-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <FeaturedProducts />
      <LocationsSection />
    </main>
  )
}
