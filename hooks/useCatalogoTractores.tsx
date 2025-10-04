"use client";

import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import { filtrosRango } from "@/components/SectionCatalogo/filtros/FiltroRango/constants/filtrosRango";
import { Rango } from "@/components/SectionCatalogo/filtros/FiltroRango/types/rango";
import { orderOptions_tractores } from "@/components/SectionCatalogo/OrdenarButton/constants/options";
import { getOrderOptions } from "@/components/SectionCatalogo/OrdenarButton/utils/utils";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData";
import { ProductoSection, TractorNuevo } from "@/types/Producto";
import { useEffect, useState } from "react";


export default function useCatalogoTractores(){

    const section : ProductoSection = "tractores"; 
    const data = getDemoData(section) as TractorNuevo[];

    const [productos, setProductos] = useState<TractorNuevo[]>(data);
    
    const [opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca] = useState<string[]>(filtrosCheckbox.marcas_tractores_nuevos.arrOpciones);
    const [rangoHP, setRangoHP] = useState<Rango>({min:0, max: Infinity});
    
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(getOrderOptions(section)[0].value);
        

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });

        let result = data; 

        //marca
        result = filtrosCheckbox.marcas_tractores_nuevos.filtrar(opcionesSeleccionadasMarca, result as TractorNuevo[]) as TractorNuevo[];
        //hp
        result = filtrosRango.hp.filtrar(rangoHP, result) as TractorNuevo[];

        //search
        if (search !== "") result = result.filter((prod) => 
            prod.name.toLowerCase().includes(search.toLowerCase().trim())
        );

        //orden
        const sortFunc = orderOptions_tractores.find(opt => opt.value === selectedOrder)?.sortFunction;    
        if (sortFunc) {
            result = sortFunc(result as any) as TractorNuevo[];
            setProductos(result);
        }
        else throw new Error("No hay funcion para ordenar.");
        
    }, [opcionesSeleccionadasMarca, rangoHP, search, selectedOrder]);
    
    
    return {
        productos, setProductos,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        rangoHP, setRangoHP,
        search, setSearch,
        selectedOrder, setSelectedOrder
    }
}