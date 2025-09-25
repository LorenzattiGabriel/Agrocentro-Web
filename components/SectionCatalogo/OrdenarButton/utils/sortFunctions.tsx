import { Dispatch, SetStateAction } from "react";


//
export function sortById(
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
    const arrProd = productos.map((prod)=>prod);

    setProductos(
        arrProd.sort((a,b)=>Number(a.id) - Number(b.id))
    )
}

//Productos sin precio van al final
export function sortByPrecioAsc(
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
    let productosSinPrecio = productos.filter((prod)=> typeof prod.price !== "number");
    let productosConPrecio = productos.filter((prod)=> typeof prod.price === "number");

    
    setProductos(
        productosConPrecio.sort((a,b)=>Number(a.price) - Number(b.price))
        .concat(productosSinPrecio)
    )
}

//Productos sin precio van al final
export function sortByPrecioDesc(
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
    let productosSinPrecio = productos.filter((prod)=> typeof prod.price !== "number");
    let productosConPrecio = productos.filter((prod)=> typeof prod.price === "number");

    
    setProductos(
        productosConPrecio.sort((a,b)=>Number(b.price) - Number(a.price))
        .concat(productosSinPrecio)
    )
}



export function sortByHpAsc(
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
    const arrProd = productos.map((prod)=>prod);

    setProductos(
        arrProd.sort((a,b)=>Number(a.hp) - Number(b.hp))
    )
}


export function sortByHpDesc(
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
    const arrProd = productos.map((prod)=>prod);

    setProductos(
        arrProd.sort((a,b)=>Number(b.hp) - Number(a.hp))
    )
}