import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tractor, Wrench, Package, Shield, Users, Clock } from "lucide-react"

const services = [
  {
    icon: Tractor,
    title: "Maquinaria Nueva",
    description: "Tractores e implementos de las mejores marcas del mercado con garantía oficial.",
    features: ["Garantía oficial", "Financiación disponible", "Entrega inmediata"],
  },
  {
    icon: Package,
    title: "Equipos Usados",
    description: "Maquinaria usada seleccionada y revisada por nuestros técnicos especializados.",
    features: ["Revisión técnica", "Garantía extendida", "Historial verificado"],
  },
  {
    icon: Wrench,
    title: "Servicio Técnico",
    description: "Mantenimiento, reparación y puesta a punto de maquinaria agrícola.",
    features: ["Técnicos certificados", "Repuestos originales", "Servicio a campo"],
  },
  {
    icon: Shield,
    title: "Repuestos Originales",
    description: "Stock permanente de repuestos originales para todas las marcas.",
    features: ["Stock permanente", "Entrega rápida", "Precios competitivos"],
  },
  {
    icon: Users,
    title: "Asesoramiento",
    description: "Te ayudamos a elegir la maquinaria ideal para tu tipo de explotación.",
    features: ["Consulta gratuita", "Análisis personalizado", "Seguimiento post-venta"],
  },
  {
    icon: Clock,
    title: "Atención Integral",
    description: "Servicio completo desde la venta hasta el mantenimiento de tu equipo.",
    features: ["Atención personalizada", "Soporte continuo", "Respuesta rápida"],
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4 text-balance">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Soluciones integrales para el agro con más de 20 años de experiencia en el sector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-accent/10 p-3 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    Más información
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
