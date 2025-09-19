import { locations } from "@/constants/locations";
import ContenidoSucursal from "@/components/sucursales/ContenidoSucursal/ContenidoSucursal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContenidoSucursal_v2 from "@/components/sucursales/ContenidoSucursal/ContenidoSucursal_v2";


export default function SucursalesPage() {
  return (
    <main className="min-h-screen py-10">
        
        <h1 className="
            text-3xl md:text-4xl font-normal text-secondary
            text-center 
            mb-10 pr-4
        ">
                Nuestras Sucursales  
        </h1>

        <ContenidoSucursal
            name={locations[0].name}
            id={locations[0].id}
            image={locations[0].image}
            description={locations[0].description}
            about={locations[0].about}
            address={locations[0].address}
            city={locations[0].city}
            hours={locations[0].hours}
            email={locations[0].email}
            phone={locations[0].phone}
            maps={locations[0].maps}
        />

        <ContenidoSucursal
            name={locations[1].name}
            id={locations[1].id}
            image={locations[1].image}
            description={locations[1].description}
            about={locations[1].about}
            address={locations[1].address}
            city={locations[1].city}
            hours={locations[1].hours}
            email={locations[1].email}
            phone={locations[1].phone}
            maps={locations[1].maps}
        />

        


        {/* <section
        className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-muted/40 to-white"
        style={{ scrollSnapAlign: "start" }}
        aria-labelledby="sucursal-villasantarosa-title"
        >
        <div className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="max-w-xl">
            <header>
                <h2
                id="sucursal-villasantarosa-title"
                className="text-4xl md:text-5xl font-bold text-secondary mb-4"
                >
                Sucursal Villa Santa Rosa
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                Nuestra sucursal en Villa Santa Rosa ofrece atención especializada, stock permanente de repuestos y maquinaria, y soluciones rápidas para el sector agropecuario local y regional.
                </p>
            </header>
            <dl className="space-y-4">
                <div className="flex items-start">
                <dt className="sr-only">Dirección</dt>
                <dd className="flex items-center">
                    <span className="mr-3 mt-1">
                    <MapPin className="h-6 w-6 text-accent" />
                    </span>
                    <div>
                    <span className="font-medium block">Av. San Martín 1250</span>
                    <span className="text-muted-foreground block">Villa Santa Rosa, Córdoba</span>
                    </div>
                </dd>
                </div>
                <div className="flex items-center">
                <dt className="sr-only">Teléfono</dt>
                <dd className="flex items-center">
                    <span className="mr-3">
                    <Phone className="h-6 w-6 text-accent" />
                    </span>
                    <span>(03525) 789-012</span>
                </dd>
                </div>
                <div className="flex items-center">
                <dt className="sr-only">Email</dt>
                <dd className="flex items-center">
                    <span className="mr-3">
                    <Mail className="h-6 w-6 text-accent" />
                    </span>
                    <span>villasantarosa@agrocentro.com.ar</span>
                </dd>
                </div>
                <div className="flex items-center">
                <dt className="sr-only">Horarios</dt>
                <dd className="flex items-center">
                    <span className="mr-3">
                    <Clock className="h-6 w-6 text-accent" />
                    </span>
                    <span>Lun-Vie: 8:00-18:00 | Sáb: 8:00-12:30</span>
                </dd>
                </div>
            </dl>
            <div className="mt-8">
                <h2 className="font-semibold mb-2 text-lg">Sobre la sucursal</h2>
                <p className="text-muted-foreground">
                En Villa Santa Rosa, brindamos soluciones rápidas y eficientes para el sector agropecuario, con atención personalizada y un equipo comprometido con la satisfacción de nuestros clientes.
                </p>
            </div>
            </div>
            <div className="w-full">
                <div className="rounded-lg overflow-hidden shadow-lg border bg-white">
                    <img
                    src="/agricultural-machinery-showroom.jpg"
                    alt="Sucursal Villa Santa Rosa"
                    className="w-full h-[350px] object-cover"
                    loading="lazy"
                    />
                </div>
            </div>
        </div>
        </section> */}

    </main>
  )
}
