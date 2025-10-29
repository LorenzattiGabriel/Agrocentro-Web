import DetalleProducto from "@/components/DetalleProducto/DetalleProducto";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData"
import { repuestosImgsPath } from "@/constants/images-paths";
import { repuestosSection } from "@/constants/website-sections";
import { Repuesto } from "@/types/Producto";

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function RepuestoPage({ params }: Props){

    const productos = await getDemoData(repuestosSection) as Repuesto[];
    
    //asignar PATH a imagenes de Repuestos
    productos.forEach(repuesto => {
        repuesto.ids_imagenes = repuesto.ids_imagenes.map(id_imagen => {
            if (!id_imagen.includes(repuestosImgsPath))
                return `${repuestosImgsPath}/${repuesto.marca.toLowerCase()}/${id_imagen}`

            return id_imagen;
        });
    });
    
    const repuesto = productos.find(p=>p.id === params.id) as Repuesto;
    const recomendados = productos.filter(p=>p.categoria===repuesto?.categoria).slice(0, 10);
    
    const urlCatalogo = `/${repuestosSection}`;
      
    if (!repuesto) {
        // TODO: Implement a proper 'Not Found' UI
        return <div className="flex justify-center items-center h-screen">Implemento no encontrado.</div>;
    }


    return (
        <DetalleProducto producto={repuesto} urlCatalogo={urlCatalogo} recomendados={recomendados}/>
    )
}