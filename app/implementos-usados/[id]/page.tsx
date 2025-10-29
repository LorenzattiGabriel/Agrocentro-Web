import DetalleProducto from "@/components/DetalleProducto/DetalleProducto";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData";
import { implementosUsadosImgsPath } from "@/constants/images-paths";
import { implementosUsadosSection } from "@/constants/website-sections";
import { ImplementoNuevo } from "@/types/Producto";

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function ImplementoUsadoPage({ params }: Props){

    const productos = await getDemoData(implementosUsadosSection) as ImplementoNuevo[];
    
    //asignar PATH a imagenes
    productos.forEach(implementoNuevo => {
        implementoNuevo.ids_imagenes = implementoNuevo.ids_imagenes.map(id_imagen => {
            if (!id_imagen.includes(implementosUsadosImgsPath) && !id_imagen.includes("https://"))
                return `${implementosUsadosImgsPath}/${id_imagen}`


            return id_imagen;
        });
    });
    
    const implemento = productos.find(p=>p.id === params.id) as ImplementoNuevo;
    const recomendados = productos.filter(p=>p.categoria===implemento?.categoria).slice(0, 10);

    const urlCatalogo = `/${implementosUsadosSection}`;
      
    if (!implemento) {
        // TODO: Implement a proper 'Not Found' UI
        return <div className="flex justify-center items-center h-screen">Implemento no encontrado.</div>;
    }

    return <DetalleProducto producto={implemento} recomendados={recomendados} urlCatalogo={urlCatalogo} />;
}