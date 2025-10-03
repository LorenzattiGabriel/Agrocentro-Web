import { Implemento, Producto, Repuesto, TractorUsado } from "@/types/Producto";


export function filtrarMarca(
    opcionesSeleccionadas: string[],

    productos: Producto[]
){    
    return productos.filter((prod)=>opcionesSeleccionadas.find((marca)=>marca===prod.marca))
}


export function filtrarCategoria(
    opcionesSeleccionadas: string[],

    productos: Implemento[] | Repuesto[]
){    
    return productos.filter((prod)=>opcionesSeleccionadas.find((categoria)=>categoria===prod.marca))
}




export function filtrarYear(
    opcionesSeleccionadas: number[],

    productos: TractorUsado[]
){    
    return productos.filter((usado)=>opcionesSeleccionadas.find((year)=>year===usado.year))
}