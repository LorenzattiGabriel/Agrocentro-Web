"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    title: "Maquinaria Agrícola de Primera Calidad",
    subtitle: "Tractores, implementos y repuestos para potenciar tu campo",
    description: "Más de 20 años brindando soluciones integrales para el agro en Río Primero y Villa Santa Rosa",
    image: "/modern-green-tractor-in-agricultural-field.jpg",
    cta: "Ver Productos",
  },
  {
    title: "Usados Seleccionados",
    subtitle: "Maquinaria usada revisada por técnicos especializados",
    description: "Garantía y respaldo oficial en cada equipo usado que ofrecemos",
    image: "/used-agricultural-machinery-in-warehouse.jpg",
    cta: "Ver Usados",
  },
  {
    title: "Servicio Técnico Especializado",
    subtitle: "Mantenimiento y reparación de maquinaria agrícola",
    description: "Técnicos certificados y repuestos originales para mantener tu equipo en óptimas condiciones",
    image: "/agricultural-technician-repairing-tractor.jpg",
    cta: "Solicitar Servicio",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h2 className="text-5xl font-bold mb-4 text-balance">{slide.title}</h2>
              <h3 className="text-2xl font-semibold mb-4 text-accent">{slide.subtitle}</h3>
              <p className="text-lg mb-8 text-pretty leading-relaxed">{slide.description}</p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {slide.cta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-foreground bg-transparent"
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
