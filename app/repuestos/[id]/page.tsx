import DetalleProducto from "@/components/DetalleProducto/DetalleProducto";
import ProductoNoEncontrado from "@/components/DetalleProducto/ProductoNoEncontrado";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData"
import { repuestosImgsPath } from "@/constants/images-paths";
import { repuestosSection } from "@/constants/website-sections";
import { Repuesto } from "@/types/Producto";

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function RepuestoPage({ params }: Props){

    // Fetch productos (URLs de Supabase ya incluidas)
    const productos = await getDemoData(repuestosSection) as Repuesto[];
    
    const repuesto = productos.find(p=>p.id === params.id) as Repuesto;
    const recomendados = productos.filter(p=>p.categoria===repuesto?.categoria).slice(0, 10);
    
    const urlCatalogo = `/${repuestosSection}`;
      
    if (!repuesto) {
        return <ProductoNoEncontrado nombreSection="Repuesto" urlCatalogo={`/${repuestosSection}`} />
    }

    return (
        <DetalleProducto producto={repuesto} urlCatalogo={urlCatalogo} recomendados={recomendados}/>
    )
}