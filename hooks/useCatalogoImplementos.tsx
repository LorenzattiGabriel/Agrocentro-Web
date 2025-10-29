"use client";

import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import { orderOptions } from "@/components/SectionCatalogo/OrdenarButton/constants/options";
import { getOrderOptions } from "@/components/SectionCatalogo/OrdenarButton/utils/utils";
import { ImplementoNuevo, ProductoSection } from "@/types/Producto";
import { useEffect, useState } from "react";


export default function useCatalogoImplementos(data: ImplementoNuevo[], arrOpcionesMarca: string[], arrOpcionesCategoria: string[]){
    
    const section : ProductoSection = "implementos-nuevos"; 

    const [productos, setProductos] = useState<ImplementoNuevo[]>(data);

    
    const [opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria] = useState<string[]>(arrOpcionesCategoria);
    const [opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca] = useState<string[]>(arrOpcionesMarca);
    
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(getOrderOptions(section)[0].value);
        

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });

        let result = data; 

        //marca
        result = filtrosCheckbox.marcas_implementos.filtrar(opcionesSeleccionadasMarca, result as ImplementoNuevo[]) as ImplementoNuevo[];
        //categoria
        result = filtrosCheckbox.categorias_Implementos.filtrar(opcionesSeleccionadasCategoria, result as ImplementoNuevo[]) as ImplementoNuevo[];
        

        //search
        if (search !== "") result = result.filter((prod) => 
            prod.nombre.toLowerCase().includes(search.toLowerCase().trim())
        );

        //orden
        const sortFunc = orderOptions.find(opt => opt.value === selectedOrder)?.sortFunction;    
        if (sortFunc) {
            result = sortFunc(result as any) as ImplementoNuevo[];
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