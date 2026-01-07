"use client";

import useCatalogoRepuestos from "@/hooks/useCatalogoRepuestos";
import { Repuesto } from "@/types/Producto";
import CardProducto from "../CardProducto";
import { useState, useEffect } from "react";
import { filtrosCheckbox } from "../filtros/FiltroCheckbox/constants/filtrosCheckbox";
import FiltroTag from "../FiltroTag/FiltroTag";
import SectionCatalogo from "../SectionCatalogo";
import Pagination from "../Pagination/Pagination";
import FiltroCheckbox from "../filtros/FiltroCheckbox/FiltroCheckbox";
import { searchbar_input_id } from "../searchbar/SearchBar";




type Props = {
    initialData: Repuesto[];
};


export default function CatalogoRepuestos({ initialData }: Props) {
    
    const arrOpcionesMarca = Array.from(new Set(initialData.map((producto) => producto.marca).filter(Boolean)));
    const arrOpcionesCategoria = Array.from(new Set(initialData.map((producto) => producto.categoria).filter(Boolean)));
    
    const {
        productos, setProductos, 
        opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        search, setSearch,
        selectedOrder, setSelectedOrder
    } = useCatalogoRepuestos(initialData, arrOpcionesMarca, arrOpcionesCategoria);

    // Paginación
    const ITEMS_PER_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);
    
    // Resetear a página 1 cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [productos.length, search, selectedOrder]);
    
    // Calcular productos de la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = productos.slice(startIndex, endIndex);

    const cards = currentProducts.map((producto) => <CardProducto producto={producto} key={producto.id}/>);


    const [verTodoCategorias, setVerTodoCategorias] = useState<boolean>(true);
    const [verTodoMarcas, setVerTodoMarcas] = useState<boolean>(true);


    const marcas_y_categorias_tags = 
        <>
        {/* Marcas seleccionadas */}
        {Array.isArray(opcionesSeleccionadasMarca) 
        &&
        opcionesSeleccionadasMarca.length !== arrOpcionesMarca.length
        &&
        (opcionesSeleccionadasMarca).map((marca: string) => (
            <FiltroTag 
                nombre={marca}
                handler={()=>{
                    let result = opcionesSeleccionadasMarca.filter(opt=>opt!==marca);

                    if (result.length === 0) { 
                        setVerTodoMarcas(true); 
                        setOpcionesSeleccionadasMarca(arrOpcionesMarca);
                    }
                    else setOpcionesSeleccionadasMarca(result);
                }}
            />
        ))
        }

        {/* Categorias seleccionadas */}
        {Array.isArray(opcionesSeleccionadasCategoria) 
        &&
        opcionesSeleccionadasCategoria.length !== arrOpcionesCategoria.length
        &&
        (opcionesSeleccionadasCategoria).map((categoria: string) => (
            <FiltroTag 
                nombre={categoria}
                handler={()=>{
                    let result = opcionesSeleccionadasCategoria.filter(opt=>opt!==categoria);
                    


                    if (result.length === 0) {
                        setVerTodoCategorias(true);
                        setOpcionesSeleccionadasCategoria(arrOpcionesCategoria);
                    }
                    else setOpcionesSeleccionadasCategoria(result);
                }}
            />
        ))
        }
        </>

  return (
    <main className="min-h-screen">
        <h1 className="
            text-2xl md:text-3xl font-semibold text-secondary
            pl-10 pt-3
            mb-10 pr-4
        ">
            REPUESTOS
        </h1>

       

        <SectionCatalogo 
            section="repuestos"
            sectionName="Repuestos"
            cards={cards}
            setSearch={setSearch}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            filtrosElement={
                <>
                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.marcas_Repuestos}
                        arrOpciones={arrOpcionesMarca} 
                        opcionesSeleccionadas={opcionesSeleccionadasMarca}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasMarca}
                        verTodo={verTodoMarcas} setVerTodo={setVerTodoMarcas}
                    />

                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.categorias_Repuestos} 
                        arrOpciones={arrOpcionesCategoria}
                        opcionesSeleccionadas={opcionesSeleccionadasCategoria}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasCategoria}
                        verTodo={verTodoCategorias} setVerTodo={setVerTodoCategorias}
                    />
                </>
            }
            tagsElement={
                <div className="flex flex-wrap gap-2 mb-2">
                    {/* Search */}
                    {search && search.trim() !== "" && (
                        <FiltroTag 
                            nombre={`"${search}"`}
                            handler={()=>{
                                const input = document.getElementById(searchbar_input_id) as HTMLInputElement;
                                input.value="";
                                setSearch("");
                            }}
                        />
                    )}
                </div>
            }
            paginationElement={
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={productos.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            }
        />
    </main>
  )

}