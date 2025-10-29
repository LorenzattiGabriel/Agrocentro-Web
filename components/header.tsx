"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { ProductoSection } from "@/types/Producto";
import { implementosNuevosSection, implementosUsadosSection, repuestosSection } from "@/constants/website-sections";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-5000">
      {/* Top bar with contact info */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>Contacto: (357) 4438081</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Río Primero | Villa Santa Rosa</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Horarios: Mañana 8:00-12.45 | Tarde 15:30-19:30</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/agrocentro-logo.png"
              alt="Agrocentro"
              width={60}
              height={60}
              className="mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-secondary">AGROCENTRO</h1>
              <p className="text-sm text-muted-foreground">
                Maquinaria Agrícola
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 mx-auto">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </Link>

            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">
                Productos
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-black">
                <Link
                  href={`/${implementosNuevosSection}`}
                  className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                >
                  Implementos Nuevos
                </Link>
                <Link
                  href={`/${repuestosSection}`}
                  className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                >
                  Repuestos
                </Link>
              </div>
            </div>

            <Link
              href={`/${implementosUsadosSection}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              Usados
            </Link>

            <div className="relative group ">
              <button className="text-foreground hover:text-primary transition-colors">
                Nosotros
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-black">
                <Link
                  href="/quienes-somos"
                  className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                >
                  Quiénes Somos
                </Link>
                <Link
                  href="/sucursales"
                  className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                >
                  Sucursales
                </Link>
              </div>
            </div>

            <Link
              href="/contacto"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </nav>

          <button
            className="ml-auto lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Inicio
              </Link>
              <Link
                href="/tractores"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Tractores
              </Link>
              <Link
                href="/implementos"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Implementos
              </Link>
              <Link
                href="/repuestos"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Repuestos
              </Link>
              <Link
                href="/usados"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Usados
              </Link>
              <Link
                href="/quienes-somos"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Quiénes Somos
              </Link>
              <Link
                href="/sucursales"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Sucursales
              </Link>

              <Link
                href="/contacto"
                className="text-foreground hover:text-primary"
                onClick={handleLinkClick}
              >
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
