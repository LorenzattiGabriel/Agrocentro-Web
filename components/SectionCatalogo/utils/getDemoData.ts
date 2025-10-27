import { prisma } from "@/lib/prisma";
import { ImplementoNuevo, ImplementoUsado, ProductoSection, Repuesto } from "@/types/Producto";

// This is a simple in-memory cache store.
// NOTE: In a serverless environment (like Vercel), each function instance
// will have its own separate cache. For a globally shared cache,
// consider a service like Vercel KV, Upstash, or Redis.
const cacheStore: {
    catalogData?: {
        data: {
            implementos: Awaited<ReturnType<typeof prisma.implementos.findMany>>;
            repuestos: Awaited<ReturnType<typeof prisma.repuestos.findMany>>;
        };
        timestamp: number;
    }
} = {};

const REVALIDATE_AFTER_SECONDS = process.env.PRODUCT_CACHE_SECONDS ? parseInt(process.env.PRODUCT_CACHE_SECONDS) : 60; // Cache for [ ] seconds

/**
 * Fetches catalog data using a time-based server-wide cache.
 * The data is fetched from the database only if the cache is older
 * than REVALIDATE_AFTER_SECONDS.
 */
export const getCatalogData = async () => {
    const now = Date.now();
    const cachedEntry = cacheStore.catalogData;


    if (cachedEntry && (now - cachedEntry.timestamp) < REVALIDATE_AFTER_SECONDS * 1000) {
        // console.log("Serving catalog data from server cache.");
        return cachedEntry.data;
    }

    // console.log("Fetching fresh catalog data from database.");
    const [implementos, repuestos] = await Promise.all([
        prisma.implementos.findMany(),
        prisma.repuestos.findMany()
    ]);

    const data = { implementos, repuestos };
    cacheStore.catalogData = { data, timestamp: now };

    return data;
};

/**
 * Retrieves and filters product data for a specific section using the cached data.
 * Renamed from getDemoData for clarity.
 * @param section The product section to retrieve data for.
 */
export default async function getProductsBySection(section: ProductoSection){
    const { implementos, repuestos } = await getCatalogData();

    switch(section) {
        case "implementos-nuevos": 
            return implementos
                .filter(p => p.esNuevo)
                .map(p => ({...p, section: "implementos-nuevos"} as ImplementoNuevo));
        
        case "implementos-usados":
            return implementos
                .filter(p => !p.esNuevo)
                .map(p => ({...p, section: "implementos-usados", year: p.anio} as ImplementoUsado));
        
        case "repuestos":
            return repuestos
                .map(p => ({...p, section: "repuestos"} as Repuesto));
    }
}