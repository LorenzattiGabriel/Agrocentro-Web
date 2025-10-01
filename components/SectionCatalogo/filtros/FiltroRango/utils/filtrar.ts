import { Dispatch, SetStateAction } from "react";
import { Rango } from "../types/rango";



export function filtrarHP(
    rango: Rango, 
    
    productos: ({
        id: number;
        name: string;
        marca: string;
        price: string;
        image: string;
        hp: number;
    } | {
        id: number;
        name: string;
        marca: string;
        price: number;
        image: string;
        hp: number;
    })[]
){
        return productos.filter((prod)=>prod.hp >= rango.min && prod.hp <= rango.max);  
}


// Se deja los "consultar precio al final"
export function filtrarPrecio(
    rango: Rango, 
    
    productos: ({
        id: number;
        name: string;
        marca: string;
        price: string;
        image: string;
        hp: number;
    } | {
        id: number;
        name: string;
        marca: string;
        price: number;
        image: string;
        hp: number;
    })[]
){
    const arrProductosSinPrecio = productos.filter((p)=>typeof p.price === "string");
    const arrProductosConPrecio = productos.filter((p)=>typeof p.price === "number");


    return arrProductosConPrecio.filter(
        (prod)=>{
            if (typeof prod.price === "number") return prod.price >= rango.min && prod.price <= rango.max
        }
    )
    .concat(arrProductosSinPrecio)
    
    
}