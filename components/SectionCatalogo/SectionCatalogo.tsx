"use client";

import OrdernarButton from "./OrdenarButton/OrdernarButton";
import SearchBar from "./searchbar/SearchBar";
import { ProductoSection } from "@/types/Producto";
import { Dispatch, SetStateAction, useState } from "react";
import FiltrarButton from "./buttons/FiltrarButton";


type Props = {
    section: ProductoSection,
    cards: JSX.Element[],
    setSearch: Dispatch<SetStateAction<string>>,
    selectedOrder: string,
    setSelectedOrder: Dispatch<SetStateAction<string>>,
    filtrosElement: JSX.Element
}

export default function SectionCatalogo({section, cards, setSearch, selectedOrder, setSelectedOrder, filtrosElement}: Props){

    const [showSidebar, setShowSidebar] = useState(false);


    return (
    <div className="
        grid grid-cols-1 sm:grid-cols-[1.5fr_5fr]       
        xl:px-10 2xl:px-30
        min-h-screen
    ">
        {/* Overlay mobile */}
        <div 
            className={`fixed inset-0 z-200 bg-black/90 sm:hidden ${!showSidebar&&"hidden"}`} 
            onMouseDown={()=>{setShowSidebar(false)}}>    
        </div>

        {/* Filtros */}
        <aside className="absolute sm:static">
            <form className={`
                fixed top-0 bottom-0 z-201
                
                transition-transform duration-300
                ${showSidebar ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0                

                sm:sticky sm:top-35 sm:z-2 
                pt-25 sm:pt-3 pb-10 px-7 md:pr-0 lg:pl-0
                bg-background
                flex justify-end
            `}>

                <div className="max-w-60 flex flex-col gap-8">
                    <div>
                        <h2 className="font-bold text-4xl mb-1">{section.replace(/\b\w/g, c => c.toUpperCase())}</h2>
                        <p>{cards.length} resultados</p>
                    </div>

                    {filtrosElement}
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
                    <div className="flex justify-between w-full sm:w-fit gap-2">
                        <FiltrarButton handler={()=>{setShowSidebar(true)}}/>
                        <OrdernarButton section={section} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />

                    </div>
                    
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
                {cards}
            </section>



        </div>
    </div>
    )
}