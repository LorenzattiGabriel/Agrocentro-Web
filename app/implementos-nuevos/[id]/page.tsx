import DetalleProducto from "@/components/DetalleProducto/DetalleProducto";
import ProductoNoEncontrado from "@/components/DetalleProducto/ProductoNoEncontrado";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData";
import { implementosNuevosImgsPath } from "@/constants/images-paths";
import { implementosNuevosSection } from "@/constants/website-sections";
import { ImplementoNuevo } from "@/types/Producto";

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function ImplementoPage({ params }: Props){

    const productos = await getDemoData(implementosNuevosSection) as ImplementoNuevo[];
    
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
        return <ProductoNoEncontrado nombreSection="Implemento" urlCatalogo={`/${implementosNuevosSection}`} />
    }

    return <DetalleProducto producto={implemento} recomendados={recomendados} urlCatalogo={urlCatalogo} />;
}