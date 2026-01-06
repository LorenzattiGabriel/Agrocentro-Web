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

    // Fetch productos (URLs de Supabase ya incluidas)
    const productos = await getDemoData(implementosNuevosSection) as ImplementoNuevo[];
    
    const implemento = productos.find(p=>p.id === params.id) as ImplementoNuevo;
    const recomendados = productos.filter(p=>p.categoria===implemento?.categoria).slice(0, 10);

    const urlCatalogo = `/${implementosNuevosSection}`;
      
    if (!implemento) {
        return <ProductoNoEncontrado nombreSection="Implemento" urlCatalogo={`/${implementosNuevosSection}`} />
    }

    return <DetalleProducto producto={implemento} recomendados={recomendados} urlCatalogo={urlCatalogo} />;
}