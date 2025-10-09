import { Producto, TractorUsado } from "@/types/Producto";


export type filtrosRango = {
    nombre: string,
    
    subtitulo?: string,
    
    filtrar: (
        rango: Rango, 
        productos: Tractor[] | TractorUsado[]
    )=> void   
}