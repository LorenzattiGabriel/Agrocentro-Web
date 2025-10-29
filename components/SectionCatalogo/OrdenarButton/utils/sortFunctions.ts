import { Producto } from "@/types/Producto";


export function sortByNameAsc(productos: Producto[])
{
    return productos.sort((a,b)=>a.nombre.localeCompare(b.nombre));
}

export function sortByNameDesc(productos: Producto[])
{
    return productos.sort((a,b)=>b.nombre.localeCompare(a.nombre));
}




