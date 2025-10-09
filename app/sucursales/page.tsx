import { locations } from "@/constants/locations";
import ContenidoSucursal from "@/components/sucursales/ContenidoSucursal/ContenidoSucursal";



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
    </main>
  )
}
