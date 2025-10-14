import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"
import Link from "next/link"


import { locations } from "@/constants/locations"

const urlContacto = "/contacto";


export function LocationsSection() {


  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4 text-balance">Nuestras Sucursales</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Visitanos en cualquiera de nuestras dos sucursales en Córdoba
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={location.image || "/placeholder.svg"}
                  alt={`Sucursal ${location.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{location.name}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-accent mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{location.address}</p>
                      <p className="text-muted-foreground">{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-accent mr-3" />
                    <p>{location.phone}</p>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-accent mr-3" />
                    <p>{location.email}</p>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-accent mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm">{location.hours}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Link href={`/sucursales/#sucursal-${location.id}-title`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer">
                            Cómo llegar
                        </Button>
                    </Link>

                    <Link href={urlContacto} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                        Contactar
                        </Button>
                    </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
