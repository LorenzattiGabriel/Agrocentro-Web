import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image src="/images/agrocentro-logo.png" alt="Agrocentro" width={40} height={40} className="mr-3" />
              <div>
                <h3 className="text-xl font-bold">AGROCENTRO</h3>
                <p className="text-sm opacity-90">Maquinaria Agrícola</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4 text-pretty leading-relaxed">
              Más de 20 años brindando soluciones integrales para el agro. Maquinaria nueva y usada, repuestos y
              servicio técnico especializado.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tractores" className="opacity-90 hover:opacity-100 transition-opacity">
                  Tractores
                </Link>
              </li>
              <li>
                <Link href="/implementos" className="opacity-90 hover:opacity-100 transition-opacity">
                  Implementos
                </Link>
              </li>
              <li>
                <Link href="/repuestos" className="opacity-90 hover:opacity-100 transition-opacity">
                  Repuestos
                </Link>
              </li>
              <li>
                <Link href="/usados" className="opacity-90 hover:opacity-100 transition-opacity">
                  Maquinaria Usada
                </Link>
              </li>
              <li>
                <Link href="/financiacion" className="opacity-90 hover:opacity-100 transition-opacity">
                  Financiación
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicio-tecnico" className="opacity-90 hover:opacity-100 transition-opacity">
                  Servicio Técnico
                </Link>
              </li>
              <li>
                <Link href="/mantenimiento" className="opacity-90 hover:opacity-100 transition-opacity">
                  Mantenimiento
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="opacity-90 hover:opacity-100 transition-opacity">
                  Garantía
                </Link>
              </li>
              <li>
                <Link href="/asesoramiento" className="opacity-90 hover:opacity-100 transition-opacity">
                  Asesoramiento
                </Link>
              </li>
              <li>
                <Link href="/capacitacion" className="opacity-90 hover:opacity-100 transition-opacity">
                  Capacitación
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Río Primero</p>
                  <p className="opacity-90">Ruta Nacional 9 Km 695</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Villa Santa Rosa</p>
                  <p className="opacity-90">Av. San Martín 1250</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <p className="opacity-90">(357) 4438081</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <p className="opacity-90">agrocentrocba.sas@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2025 Agrocentro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
