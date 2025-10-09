"use client";

import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import { filtrosRango } from "@/components/SectionCatalogo/filtros/FiltroRango/constants/filtrosRango";
import { Rango } from "@/components/SectionCatalogo/filtros/FiltroRango/types/rango";
import { orderOptions_tractores, orderOptions_tractores_usados } from "@/components/SectionCatalogo/OrdenarButton/constants/options";
import { getOrderOptions } from "@/components/SectionCatalogo/OrdenarButton/utils/utils";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData";
import { ProductoSection, TractorUsado } from "@/types/Producto";
import { useEffect, useState } from "react";


export default function useCatalogoTractoresUsados(){

    const section : ProductoSection = "usados"; 
    const data = getDemoData(section) as TractorUsado[];

    const [productos, setProductos] = useState<TractorUsado[]>(data);
    
    const [opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca] = useState<string[]>(filtrosCheckbox.marcas_tractores_usados.arrOpciones);
    const [rangoYear, setRangoYear] = useState<Rango>({min:0, max: Infinity});
    const [rangoHP, setRangoHP] = useState<Rango>({min:0, max: Infinity});
    
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(getOrderOptions(section)[0].value);
        

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });

        let result = data; 

        //marca
        result = filtrosCheckbox.marcas_tractores_nuevos.filtrar(opcionesSeleccionadasMarca, result as TractorUsado[]) as TractorUsado[];
        //hp
        result = filtrosRango.hp.filtrar(rangoHP, result) as TractorUsado[];
        //year
        result = filtrosRango.year.filtrar(rangoYear, result as TractorUsado[]);

        //search
        if (search !== "") result = result.filter((prod) => 
            prod.name.toLowerCase().includes(search.toLowerCase().trim())
        );

        //orden
        const sortFunc = orderOptions_tractores_usados.find(opt => opt.value === selectedOrder)?.sortFunction;    
        if (sortFunc) {
            result = sortFunc(result as any) as TractorUsado[];
            setProductos(result);
        }
        else throw new Error("No hay funcion para ordenar.");
        
    }, [rangoYear, opcionesSeleccionadasMarca, rangoHP, search, selectedOrder]);
    
    
    return {
        productos, setProductos,
        rangoYear, setRangoYear,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        rangoHP, setRangoHP,
        search, setSearch,
        selectedOrder, setSelectedOrder
    }
}