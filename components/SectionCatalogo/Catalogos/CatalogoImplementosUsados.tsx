"use client";

import CardProducto from "@/components/SectionCatalogo/CardProducto";
import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import FiltroCheckbox from "@/components/SectionCatalogo/filtros/FiltroCheckbox/FiltroCheckbox";
import FiltroTag from "@/components/SectionCatalogo/FiltroTag/FiltroTag";
import SectionCatalogo from "@/components/SectionCatalogo/SectionCatalogo";
import useCatalogoImplementos from "@/hooks/useCatalogoImplementos";
import { ImplementoNuevo } from "@/types/Producto";
import { useState } from "react";

interface Props {
    initialData: ImplementoNuevo[];
}

export default function CatalogoImplementosUsados({ initialData }: Props) {
    
    const arrOpcionesMarca = Array.from(new Set(initialData.map((producto) => producto.marca)));
    const arrOpcionesCategoria = Array.from(new Set(initialData.map((producto) => producto.categoria)));
    
    const {
        productos,
        opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        search, setSearch,
        selectedOrder, setSelectedOrder
    } = useCatalogoImplementos(initialData, arrOpcionesMarca, arrOpcionesCategoria);
    
    const cards = productos.map((producto) => <CardProducto producto={producto} key={producto.id}/>);
    
    
    
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
            key={marca}
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
            key={categoria}
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
            IMPLEMENTOS
        </h1>

        <SectionCatalogo 
            section="implementos-nuevos"
            sectionName="Implementos nuevos"
            cards={cards}
            setSearch={setSearch}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            filtrosElement={
                <>
                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.marcas_implementos}
                        arrOpciones={arrOpcionesMarca}
                        opcionesSeleccionadas={opcionesSeleccionadasMarca}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasMarca}
                        verTodo={verTodoMarcas} setVerTodo={setVerTodoMarcas}
                    />

                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.categorias_Implementos}
                        arrOpciones={arrOpcionesCategoria}
                        opcionesSeleccionadas={opcionesSeleccionadasCategoria}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasCategoria}
                        verTodo={verTodoCategorias} setVerTodo={setVerTodoCategorias}
                    />
                </>
            }
            // tagsElement={marcas_y_categorias_tags}
            tagsElement={<></>}
        />
    </main>
  )
}
