"use client";

import tractoresNuevos from "@/constants/tractores-nuevos.json"
import CardProducto from "./CardProducto";
import OrdernarButton from "./OrdenarButton/OrdernarButton";
import SearchBar from "./searchbar/SearchBar";
import { ProductoSection } from "@/types/Producto";
import { useState } from "react";
import { orderOptions } from "./OrdenarButton/utils/options";


type Props = {
    section: ProductoSection
}

export default function SectionCatalogo({section}: Props){

    const allProducts = tractoresNuevos;

    const [productos, setProductos] = useState(allProducts);
    const [selectedOrder, setSelectedOrder] = useState(orderOptions[0].value);

    return (
    <div className="
        grid grid-cols-[1.5fr_5fr]       
        xl:px-10 2xl:px-30
        min-h-screen
    ">
        {/* Filtros */}
        <aside className="
            
        ">
            <form >

                <fieldset>
                    <legend>HP (caballos de fuerza)</legend>
                    <label><input type="radio"/>Todos</label>
                    <label><input type="radio"/>Menos de 100</label>
                    <label><input type="radio"/>Entre 100 y 150</label>
                    <label><input type="radio"/>Entre 150 y 200</label>
                    <label><input type="radio"/>Más de 200</label>
                </fieldset>



            </form>
        </aside>


        <div className="max-w-300">

            {/* Busqueda */}
            <div className="
                h-10
                flex flex-col md:flex-row 
                items-start md:items-stretch gap-4 
                px-8
                mb-6
            ">
                <OrdernarButton selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} productos={productos} setProductos={setProductos}/>
                <SearchBar selectedOrder={selectedOrder} section={section} productos={allProducts} setProductos={setProductos}/>
            </div>
           

            {/* Catalogo */}
            <section
                className="
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
                    justify-items-center justify-left
                    gap-3 xl:gap-6
                    py-8 px-8
                "
            >
                {productos.map((producto) => <CardProducto producto={{...producto, section: "tractores"}} key={producto.id}/>)}
            </section>



        </div>
    </div>
    )
}