import getProductsBySection from "@/components/SectionCatalogo/utils/getDemoData";
import CatalogoRepuestosClient from "@/components/SectionCatalogo/Catalogos/CatalogoRepuestosClient";
import { Repuesto } from "@/types/Producto";


export default async function RepuestosPage() {

      // 1. Fetch data on the server. This component is a Server Component by default.
    const initialRepuestos = await getProductsBySection("repuestos") as Repuesto[];

    // 2. Pass the server-fetched data to a client component.
        return (
            <div>
                <CatalogoRepuestosClient initialData={initialRepuestos} />
            </div>
        );

    

}
