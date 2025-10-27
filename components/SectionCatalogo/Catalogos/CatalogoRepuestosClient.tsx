"use client";

import useCatalogoRepuestos from "@/hooks/useCatalogoRepuestos";
import { Repuesto } from "@/types/Producto";
import CardProducto from "../CardProducto";
import { useState } from "react";
import { filtrosCheckbox } from "../filtros/FiltroCheckbox/constants/filtrosCheckbox";
import FiltroTag from "../FiltroTag/FiltroTag";
import SectionCatalogo from "../SectionCatalogo";
import FiltroCheckbox from "../filtros/FiltroCheckbox/FiltroCheckbox";
import { searchbar_input_id } from "../searchbar/SearchBar";



// Your UI components for filters, search bar, and product list would be imported here
// import { FiltroMarca, FiltroCategoria, SearchBar, OrderButton, ProductGrid } from "@/components/...";

type Props = {
    initialData: Repuesto[];
};


export default function CatalogoRepuestosClient ({ initialData }: Props) {

    
    const {
        productos, setProductos, 
        opcionesSeleccionadasCategoria, setOpcionesSeleccionadasCategoria,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        search, setSearch,
        selectedOrder, setSelectedOrder
    } = useCatalogoRepuestos(initialData);

    //asignar 
    const images_basic_path = `/images/products/repuestos`;
    initialData.forEach(producto => {
        producto.ids_imagenes = producto.ids_imagenes.map(id_imagen => {
            if (!id_imagen.includes(images_basic_path))
                return `${images_basic_path}/${producto.marca.toLowerCase()}/${id_imagen}`

            return id_imagen;
        });
    });


    const cards = productos.map((producto) => <CardProducto producto={producto} key={producto.id}/>);

    const [verTodoCategorias, setVerTodoCategorias] = useState<boolean>(true);
    const [verTodoMarcas, setVerTodoMarcas] = useState<boolean>(true);


    const marcas_y_categorias_tags = 
        <>
        {/* Marcas seleccionadas */}
        {Array.isArray(opcionesSeleccionadasMarca) 
        &&
        opcionesSeleccionadasMarca.length !== filtrosCheckbox.marcas_implementos.arrOpciones.length 
        &&
        (opcionesSeleccionadasMarca).map((marca: string) => (
            <FiltroTag 
                nombre={marca}
                handler={()=>{
                    let result = opcionesSeleccionadasMarca.filter(opt=>opt!==marca);

                    if (result.length === 0) {
                        setVerTodoMarcas(true);
                        setOpcionesSeleccionadasMarca(filtrosCheckbox.marcas_implementos.arrOpciones);
                    }
                    else setOpcionesSeleccionadasMarca(result);
                }}
            />
        ))
        }

        {/* Categorias seleccionadas */}
        {Array.isArray(opcionesSeleccionadasCategoria) 
        &&
        opcionesSeleccionadasCategoria.length !== filtrosCheckbox.categorias_Implementos.arrOpciones.length 
        &&
        (opcionesSeleccionadasCategoria).map((categoria: string) => (
            <FiltroTag 
                nombre={categoria}
                handler={()=>{
                    let result = opcionesSeleccionadasCategoria.filter(opt=>opt!==categoria);
                    


                    if (result.length === 0) {
                        setVerTodoCategorias(true);
                        setOpcionesSeleccionadasCategoria(filtrosCheckbox.categorias_Implementos.arrOpciones);
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
            cards={cards}
            setSearch={setSearch}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            filtrosElement={
                <>
                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.marcas_Repuestos}
                        opcionesSeleccionadas={opcionesSeleccionadasMarca}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasMarca}
                        verTodo={verTodoMarcas} setVerTodo={setVerTodoMarcas}
                    />

                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.categorias_Repuestos}
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
        />
    </main>
  )

}