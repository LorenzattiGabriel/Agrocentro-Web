import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { implementosNuevosSection, implementosUsadosSection } from "@/constants/website-sections"
import getProductsBySection from "./SectionCatalogo/utils/getDemoData"
import { ArrowRightIcon } from "lucide-react"
import { ImplementoNuevo } from "@/types/Producto"
import { implementosNuevosImgsPath } from "@/constants/images-paths"

const urlNuevos = `/${implementosNuevosSection}`;
const urlContacto = "/contacto";

export async function FeaturedProducts() {
  const featuredProducts = (await getProductsBySection("implementos-nuevos") as ImplementoNuevo[]).slice(0, 4);

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
            <Card key={product.id} className="group overflow-hidden flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img
                  src={product.ids_imagenes[0] ? `${implementosNuevosImgsPath}/${product.ids_imagenes[0]}` : "/placeholder.svg"}
                  alt={product.nombre}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge
                  className="absolute top-2 right-2 bg-primary text-primary-foreground"
                >
                  Destacado
                </Badge>
                <Badge variant="secondary" className="absolute top-2 left-2">
                  Nuevo
                </Badge>
              </div>
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-sm text-secondary">{product.categoria}</p>
                  <h3 className="font-semibold text-lg text-balance mb-2">{product.nombre}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 text-pretty">
                    {product.descripcion}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-primary">Consultar</span>
                  <Link href={`/${product.section}/${product.id}`}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                        Ver más <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
            <Link href={urlNuevos}>
                <Button size="lg" variant="outline" className="mr-4 bg-transparent">
                    Ver todos los productos
                </Button>
            </Link>
            <Link href={urlContacto}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Solicitar cotización
                </Button>
            </Link>
        </div>
      </div>
    </section>
  )
}
