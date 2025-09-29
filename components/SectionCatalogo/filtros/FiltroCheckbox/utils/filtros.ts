import { Dispatch, SetStateAction } from "react";


export function filtrarMarca(
    marcasSeleccionadas: string[],

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
    })[],

    setProductos: Dispatch<SetStateAction<({
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
    })[]>>
){
    let arrProductos = productos.map((p)=>p);

    setProductos(
        arrProductos.filter((prod)=>marcasSeleccionadas.find((marca)=>marca===prod.marca))
    )
}