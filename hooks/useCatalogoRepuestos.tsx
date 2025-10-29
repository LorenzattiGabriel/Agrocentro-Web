"use client";

import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import { orderOptions } from "@/components/SectionCatalogo/OrdenarButton/constants/options";
import { getOrderOptions } from "@/components/SectionCatalogo/OrdenarButton/utils/utils"; 
import { ProductoSection, Repuesto } from "@/types/Producto";
import { useEffect, useState } from "react";


export default function useCatalogoRepuestos(initialData: Repuesto[], arrOpcionesMarca: string[], arrOpcionesCategoria: string[]){

    const section : ProductoSection = "repuestos"; 

    const [productos, setProductos] = useState<Repuesto[]>(initialData);
    
    const [opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria] = useState<string[]>(arrOpcionesCategoria);
    const [opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca] = useState<string[]>(arrOpcionesMarca);
    
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(getOrderOptions(section)[0].value);
        

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });

        let result = initialData; 

        //marca
        result = filtrosCheckbox.marcas_Repuestos.filtrar(opcionesSeleccionadasMarca, result) as Repuesto[];
        //categoria
        result = filtrosCheckbox.categorias_Repuestos.filtrar(opcionesSeleccionadasCategoria, result) as Repuesto[];
        

        //search
        if (search !== "") result = result.filter((prod) => 
            prod.nombre.toLowerCase().includes(search.toLowerCase().trim())
        );

        //orden
        const sortFunc = orderOptions.find(opt => opt.value === selectedOrder)?.sortFunction;    
        if (sortFunc) {
            result = sortFunc(result as any) as Repuesto[];
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