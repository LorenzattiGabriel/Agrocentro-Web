import getProductsBySection from "@/components/SectionCatalogo/utils/getDemoData";
import CatalogoRepuestos from "@/components/SectionCatalogo/Catalogos/CatalogoRepuestos";
import { Repuesto } from "@/types/Producto";
import { repuestosImgsPath } from "@/constants/images-paths";
import { repuestosSection } from "@/constants/website-sections";

export const dynamic = 'force-dynamic';

export default async function RepuestosPage() {

    // 1. Fetch data on the server (URLs de Supabase ya incluidas).
    const initialRepuestos = await getProductsBySection(repuestosSection) as Repuesto[];

    // 2. Pass the server-fetched data to a client component.
    return (
        <div>
            <CatalogoRepuestos initialData={initialRepuestos} />
        </div>
    );
}
