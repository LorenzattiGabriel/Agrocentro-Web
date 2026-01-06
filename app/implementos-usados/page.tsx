import CatalogoImplementosUsados from "@/components/SectionCatalogo/Catalogos/CatalogoImplementosUsados";
import getProductsBySection from "@/components/SectionCatalogo/utils/getDemoData";
import { implementosUsadosImgsPath } from "@/constants/images-paths";
import { implementosUsadosSection } from "@/constants/website-sections";
import { ImplementoNuevo } from "@/types/Producto";

export const dynamic = 'force-dynamic';

export default async function ImplementosUsadosPage() {
    
    // 1. Fetch data on the server (URLs de Supabase ya incluidas).
    const initialImplementos = await getProductsBySection(implementosUsadosSection) as ImplementoNuevo[];

    // 2. Pass the server-fetched data to a client component.
    return (
        <CatalogoImplementosUsados initialData={initialImplementos} />
    );
}
