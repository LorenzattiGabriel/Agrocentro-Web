import DetalleImplemento from "@/components/DetalleProducto/DetalleImplemento";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData";
import { implementosNuevosImgsPath } from "@/constants/images-paths";
import { implementosNuevosSection } from "@/constants/website-sections";
import { ImplementoNuevo } from "@/types/Producto";

interface Props {
  params: { id: string };
}

export default async function ImplementoPage({ params }: Props){

    const productos = await getDemoData("implementos-nuevos") as ImplementoNuevo[];
    
    //asignar PATH a imagenes
    productos.forEach(implementoNuevo => {
        implementoNuevo.ids_imagenes = implementoNuevo.ids_imagenes.map(id_imagen => {
            if (!id_imagen.includes(implementosNuevosImgsPath))
                return `${implementosNuevosImgsPath}/${id_imagen}`

            return id_imagen;
        });
    });
    
    const implemento = productos.find(p=>p.id === params.id) as ImplementoNuevo;
    const recomendados = productos.filter(p=>p.categoria===implemento?.categoria).slice(0, 10);

    const urlCatalogo = `/${implementosNuevosSection}`;
      
    if (!implemento) {
        // TODO: Implement a proper 'Not Found' UI
        return <div className="flex justify-center items-center h-screen">Implemento no encontrado.</div>;
    }

    return <DetalleImplemento implemento={implemento} recomendados={recomendados} urlCatalogo={urlCatalogo} />;
}