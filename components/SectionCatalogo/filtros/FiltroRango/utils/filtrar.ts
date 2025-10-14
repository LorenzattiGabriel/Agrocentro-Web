import { Rango } from "../types/rango";
import { Tractor, TractorUsado } from "@/types/Producto";



export function filtrarHP(
    rango: Rango, 
    
    productos: Tractor[]
){
    return productos.filter((prod)=>prod.hp >= rango.min && prod.hp <= rango.max);  
}


export function filtrarYear(
    rango: Rango, 
    
    usados: TractorUsado[]
){
    return usados.filter((usado)=>usado.year >= rango.min && usado.year <= rango.max);  
}