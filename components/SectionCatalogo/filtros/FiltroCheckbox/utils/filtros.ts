import { Implemento, Producto, Repuesto, ImplementoUsado } from "@/types/Producto";


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
    return productos.filter((prod)=>opcionesSeleccionadas.find((categoria)=>categoria===prod.categoria))
}




export function filtrarYear(
    opcionesSeleccionadas: number[],

    productos: ImplementoUsado[]
){    
    return productos.filter((usado)=>opcionesSeleccionadas.find((year)=>year===usado.year))
}