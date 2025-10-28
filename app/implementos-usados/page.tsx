import CatalogoImplementosUsados from "@/components/SectionCatalogo/Catalogos/CatalogoImplementosUsados";
import getProductsBySection from "@/components/SectionCatalogo/utils/getDemoData";
import { implementosNuevosImgsPath } from "@/constants/images-paths";
import { implementosUsadosSection } from "@/constants/website-sections";
import { ImplementoNuevo } from "@/types/Producto";

export default async function ImplementosUsadosPage() {
    
    // 1. Fetch data on the server.
    const initialImplementos = await getProductsBySection(implementosUsadosSection) as ImplementoNuevo[];

    //asignar PATH a imagenes
    initialImplementos.forEach(implementoNuevo => {
        implementoNuevo.ids_imagenes = implementoNuevo.ids_imagenes.map(id_imagen => {
            if (!id_imagen.includes(implementosNuevosImgsPath))
                return `${implementosNuevosImgsPath}/${id_imagen}`

            return id_imagen;
        });
    });


    // 2. Pass the server-fetched data to a client component.
    return (
        <CatalogoImplementosUsados initialData={initialImplementos} />
    );
}
