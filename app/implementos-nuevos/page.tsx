import CatalogoImplementosNuevos from "@/components/SectionCatalogo/Catalogos/CatalogoImplementosNuevos";
import getProductsBySection from "@/components/SectionCatalogo/utils/getDemoData";
import { implementosNuevosImgsPath } from "@/constants/images-paths";
import { implementosNuevosSection } from "@/constants/website-sections";
import { ImplementoNuevo } from "@/types/Producto";

export const dynamic = 'force-dynamic';

export default async function ImplementosPage() {
    
    // 1. Fetch data on the server (URLs de Supabase ya incluidas).
    const initialImplementos = await getProductsBySection(implementosNuevosSection) as ImplementoNuevo[];

    // 2. Pass the server-fetched data to a client component.
    return (
        <CatalogoImplementosNuevos initialData={initialImplementos} />
    );
}
