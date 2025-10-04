import { Producto, TractorNuevo, TractorUsado } from "@/types/Producto";



export function sortById(productos: Producto[])
{
    return productos.sort((a,b)=>Number(a.id) - Number(b.id))
}


export function sortByHpAsc(productos: TractorNuevo[])
{
    return productos.sort((a,b)=>Number(a.hp) - Number(b.hp));
}


export function sortByHpDesc(productos: TractorNuevo[])
{
    return productos.sort((a,b)=>Number(b.hp) - Number(a.hp));

}


export function sortByYearAsc(productos: TractorUsado[])
{
    return productos.sort((a,b)=>Number(a.year) - Number(b.year));
}

export function sortByYearDesc(productos: TractorUsado[])
{
    return productos.sort((a,b)=>Number(b.year) - Number(a.year));

}