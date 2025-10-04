"use client";

import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import { orderOptions_tractores_usados } from "@/components/SectionCatalogo/OrdenarButton/constants/options";
import { getOrderOptions } from "@/components/SectionCatalogo/OrdenarButton/utils/utils";
import getDemoData from "@/components/SectionCatalogo/utils/getDemoData";
import { Implemento, ProductoSection } from "@/types/Producto";
import { useEffect, useState } from "react";


export default function useCatalogoImplementos(){

    const section : ProductoSection = "implementos"; 
    const data = getDemoData(section) as Implemento[];

    const [productos, setProductos] = useState<Implemento[]>(data);
    
    const [opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria] = useState<string[]>(filtrosCheckbox.categorias_Implementos.arrOpciones);
    const [opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca] = useState<string[]>(filtrosCheckbox.marcas_implementos.arrOpciones);
    
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(getOrderOptions(section)[0].value);
        

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });

        let result = data; 

        //marca
        result = filtrosCheckbox.marcas_implementos.filtrar(opcionesSeleccionadasMarca, result as Implemento[]) as Implemento[];
        //categoria
        result = filtrosCheckbox.categorias_Implementos.filtrar(opcionesSeleccionadasCategoria, result as Implemento[]) as Implemento[];
        

        //search
        if (search !== "") result = result.filter((prod) => 
            prod.name.toLowerCase().includes(search.toLowerCase().trim())
        );

        //orden
        const sortFunc = orderOptions_tractores_usados.find(opt => opt.value === selectedOrder)?.sortFunction;    
        if (sortFunc) {
            result = sortFunc(result as any) as Implemento[];
            setProductos(result);
        }
        else throw new Error("No hay funcion para ordenar.");
        
    }, [opcionesSeleccionadasCategoria, opcionesSeleccionadasMarca, search, selectedOrder]);
    
    
    return {
        productos, setProductos,
        opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        search, setSearch,
        selectedOrder, setSelectedOrder
    }
}