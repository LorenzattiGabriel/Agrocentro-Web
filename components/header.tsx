"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, Phone, MapPin } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>Contacto: (03525) 123-456</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Río Primero | Villa Santa Rosa</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Horarios: Lun-Vie 8:00-18:00 | Sáb 8:00-12:30</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/agrocentro-logo.png" alt="Agrocentro" width={60} height={60} className="mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-secondary">AGROCENTRO</h1>
              <p className="text-sm text-muted-foreground">Maquinaria Agrícola</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">Productos</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/tractores" className="block px-4 py-2 text-sm hover:bg-muted">
                  Tractores
                </Link>
                <Link href="/implementos" className="block px-4 py-2 text-sm hover:bg-muted">
                  Implementos
                </Link>
                <Link href="/repuestos" className="block px-4 py-2 text-sm hover:bg-muted">
                  Repuestos
                </Link>
              </div>
            </div>
            
            <Link href="/usados" className="text-foreground hover:text-primary transition-colors">
              Usados
            </Link>
            
            <Link href="/servicios" className="text-foreground hover:text-primary transition-colors">
              Servicios
            </Link>
            
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">Nosotros</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/quienes-somos" className="block px-4 py-2 text-sm hover:bg-muted">
                  Quiénes Somos
                </Link>
                <Link href="/sucursales" className="block px-4 py-2 text-sm hover:bg-muted">
                  Sucursales
                </Link>
              </div>
            </div>
            
            <Link href="/contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Search and CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Cotizar</Button>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary">
                Inicio
              </Link>
              <Link href="/tractores" className="text-foreground hover:text-primary">
                Tractores
              </Link>
              <Link href="/implementos" className="text-foreground hover:text-primary">
                Implementos
              </Link>
              <Link href="/repuestos" className="text-foreground hover:text-primary">
                Repuestos
              </Link>
              <Link href="/usados" className="text-foreground hover:text-primary">
                Usados
              </Link>
              <Link href="/servicios" className="text-foreground hover:text-primary">
                Servicios
              </Link>
              <Link href="/contacto" className="text-foreground hover:text-primary">
                Contacto
              </Link>
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button className="bg-primary hover:bg-primary/90 flex-1">Cotizar</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
