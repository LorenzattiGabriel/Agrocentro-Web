import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredProducts = [
  {
    id: 1,
    name: "Tractor John Deere 6110M",
    category: "Tractores",
    price: "Consultar",
    image: "/john-deere-green-tractor-6110m.jpg",
    features: ["110 HP", "Transmisión PowerQuad", "Cabina con A/C"],
    condition: "Nuevo",
    badge: "Destacado",
  },
  {
    id: 2,
    name: "Sembradora Agrometal MX 23",
    category: "Implementos",
    price: "Consultar",
    image: "/agricultural-seeder-implement-green.jpg",
    features: ["23 surcos", "Dosificación neumática", "Monitor de siembra"],
    condition: "Nuevo",
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Tractor Massey Ferguson 4275",
    category: "Tractores",
    price: "$45.000",
    image: "/red-massey-ferguson-tractor-used.jpg",
    features: ["75 HP", "4x4", "1.200 horas"],
    condition: "Usado",
    badge: "Oportunidad",
  },
  {
    id: 4,
    name: "Pulverizadora Apache 3030",
    category: "Implementos",
    price: "Consultar",
    image: "/agricultural-sprayer-equipment.jpg",
    features: ["3000L", "Barral 24m", "GPS Ready"],
    condition: "Nuevo",
    badge: "Destacado",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4 text-balance">Productos Destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubre nuestra selección de maquinaria agrícola nueva y usada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    product.badge === "Destacado"
                      ? "bg-primary"
                      : product.badge === "Nuevo"
                        ? "bg-accent"
                        : "bg-orange-500"
                  }`}
                >
                  {product.badge}
                </Badge>
                <Badge variant="secondary" className="absolute top-2 left-2">
                  {product.condition}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h3 className="font-semibold text-lg text-balance">{product.name}</h3>
                </div>
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Ver más
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="mr-4 bg-transparent">
            Ver todos los productos
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Solicitar cotización
          </Button>
        </div>
      </div>
    </section>
  )
}
