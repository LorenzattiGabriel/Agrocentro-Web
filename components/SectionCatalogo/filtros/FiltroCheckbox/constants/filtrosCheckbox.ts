import { Dispatch, SetStateAction } from "react";
import { filtrarMarca } from "../utils/filtros"
import { marcasTractores, marcasUsados } from "./marcas"
// import { categoriasImplementos } from "./categorias"

export type FiltroCheckbox = {
    id: string,
    nombreFiltro: string,
    arrOpciones: string[],
    filtrar: (
        opcionesSeleccionadas: string[], 
        
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
    ) => ({
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
}


export const filtrosCheckbox = {
    marcas_tractores: {id: "marcasTractores", nombreFiltro: "Marca", arrOpciones: marcasTractores, filtrar: filtrarMarca},
    // marcas_usados: {id: "marcasUsados", nombreFiltro: "Marca", arrOpciones: marcasUsados},
    // {nombre: "categoriaImplementos", arrOpciones: categoriasImplementos}
}
