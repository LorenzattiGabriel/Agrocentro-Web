import getProductsBySection from "@/components/SectionCatalogo/utils/getDemoData";
import CatalogoRepuestosClient from "@/components/SectionCatalogo/Catalogos/CatalogoRepuestosClient";
import { Repuesto } from "@/types/Producto";
import { repuestosImgsPath } from "@/constants/images-paths";


export default async function RepuestosPage() {

    // 1. Fetch data on the server. This component is a Server Component by default.
    const initialRepuestos = await getProductsBySection("repuestos") as Repuesto[];

    //asignar PATH a imagenes de Repuestos
    initialRepuestos.forEach(repuesto => {
        repuesto.ids_imagenes = repuesto.ids_imagenes.map(id_imagen => {
            if (!id_imagen.includes(repuestosImgsPath))
                return `${repuestosImgsPath}/${repuesto.marca.toLowerCase()}/${id_imagen}`

            return id_imagen;
        });
    });

    
    // 2. Pass the server-fetched data to a client component.
    return (
        <div>
            <CatalogoRepuestosClient initialData={initialRepuestos} />
        </div>
    );

    

}
