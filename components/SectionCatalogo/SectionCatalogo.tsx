"use client";

import tractoresNuevos from "@/constants/tractores-nuevos.json"
import CardProducto from "./CardProducto";
import OrdernarButton from "./OrdenarButton/OrdernarButton";
import SearchBar from "./searchbar/SearchBar";
import { ProductoSection } from "@/types/Producto";
import { useEffect, useState } from "react";
import { orderOptions } from "./OrdenarButton/constants/options";
import FiltroCheckbox from "./filtros/FiltroCheckbox/FiltroCheckbox";
import { filtrosCheckbox } from "./filtros/FiltroCheckbox/constants/filtrosCheckbox";
import { getOrderFunction } from "./OrdenarButton/utils/utils";
import FiltroRango from "./filtros/FiltroRango/FiltroRango";
import { filtrosRango } from "./filtros/FiltroRango/constants/filtrosRango";
import { Rango } from "./filtros/FiltroRango/types/rango";

type Props = {
    section: ProductoSection
}

export default function SectionCatalogo({section}: Props){

    const allProducts = tractoresNuevos;

    const [productos, setProductos] = useState(allProducts);
    const [selectedOrder, setSelectedOrder] = useState(orderOptions[0].value);
    const [search, setSearch] = useState("");


    const [opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca] = useState<string[]>(filtrosCheckbox.marcas_tractores.arrOpciones);
    const [rangoHP, setRangoHP] = useState<Rango>({min:0, max: Infinity});
    const [rangoPrecio, setRangoPrecio] = useState<Rango>({min:0, max: Infinity});



    // Orden de implementacion de filtros (se aplican todos al mismo tiempo, pero van en cierto orden de ejecucion):
    // Marca -> HP -> Precio -> SearchBox -> Sort/Ordenar Por
    
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });

        let result = allProducts;

        //marca
        result = filtrosCheckbox.marcas_tractores.filtrar(opcionesSeleccionadasMarca, result);

        //hp
        result = filtrosRango.hp.filtrar(rangoHP, result);

        //precio
        result = filtrosRango.precio.filtrar(rangoPrecio, result);


        //search
        if (search !== "") result = result.filter((prod) => 
            prod.name.toLowerCase().includes(search.toLowerCase().trim())
        );

        //orden
        const sortFunc = getOrderFunction(selectedOrder);    
        if (sortFunc) sortFunc(result, setProductos);
        else throw new Error("No hay funcion para ordenar.");

    }, [opcionesSeleccionadasMarca, rangoHP, rangoPrecio, search, selectedOrder]);


    return (
    <div className="
        grid grid-cols-[1.5fr_5fr]       
        xl:px-10 2xl:px-30
        min-h-screen
    ">
        {/* Filtros */}
        <aside>
            <form className="sticky top-35 z-2 pt-3 pb-10 flex justify-end">

                <div className="max-w-60 flex flex-col gap-8">
                    <div>
                        <h2 className="font-bold text-4xl mb-1">{section.replace(/\b\w/g, c => c.toUpperCase())}</h2>
                        <p>{productos.length} resultados</p>
                    </div>

                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.marcas_tractores}
                        opcionesSeleccionadas={opcionesSeleccionadasMarca}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasMarca}
                    />

                    <FiltroRango 
                        filtroRango={filtrosRango.hp}
                        setRango={setRangoHP}
                    />

                    <FiltroRango 
                        filtroRango={filtrosRango.precio}
                        setRango={setRangoPrecio}
                    />
                </div>

            </form>
        </aside>


        <div className="max-w-300">

            {/* Busqueda */}
            <div className="
                pt-3 pb-6 md:pb-3 bg-white
                sticky top-35 z-2
            ">
                <div className="
                    md:h-10
                    flex flex-col md:flex-row 
                    items-start md:items-stretch gap-4 
                    px-8
                ">
                    <OrdernarButton selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />

                    <SearchBar  section={section} setSearch={setSearch}/>
                </div>
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