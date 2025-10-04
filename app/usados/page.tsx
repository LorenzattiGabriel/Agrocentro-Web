"use client";

import CardProducto from "@/components/SectionCatalogo/CardProducto";
import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import FiltroCheckbox from "@/components/SectionCatalogo/filtros/FiltroCheckbox/FiltroCheckbox";
import { filtrosRango } from "@/components/SectionCatalogo/filtros/FiltroRango/constants/filtrosRango";
import FiltroRango from "@/components/SectionCatalogo/filtros/FiltroRango/FiltroRango";
import FiltroTag from "@/components/SectionCatalogo/FiltroTag/FiltroTag";
import { searchbar_input_id } from "@/components/SectionCatalogo/searchbar/SearchBar";
import SectionCatalogo from "@/components/SectionCatalogo/SectionCatalogo"
import useCatalogoTractoresUsados from "@/hooks/useCatalogoTractoresUsados";
import { useState } from "react";


export default function TractoresUsadosPage() {

    const {
        productos, setProductos, 
        rangoYear, setRangoYear,
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        rangoHP, setRangoHP,
        search, setSearch,
        selectedOrder, setSelectedOrder
    } = useCatalogoTractoresUsados();

    const cards = productos.map((producto) => <CardProducto producto={producto} key={producto.id}/>);

    const [verTodo, setVerTodo] = useState<boolean>(true);

    const min_input_hp_id = "tractor-hp-filtrorango-min"
    const max_input_hp_id = "tractor-hp-filtrorango-max"

    const min_input_year_id = "tractorUsado-year-filtrorango-min"
    const max_input_year_id = "tractorUsado-year-filtrorango-max"

    const tagElemento = 
        <>
        {/* Marcas seleccionadas */}
        {Array.isArray(opcionesSeleccionadasMarca) 
        &&
        opcionesSeleccionadasMarca.length !== filtrosCheckbox.marcas_tractores_nuevos.arrOpciones.length 
        &&
        (opcionesSeleccionadasMarca).map((marca: string) => (
            <FiltroTag 
                nombre={marca}
                handler={()=>{
                    let result = opcionesSeleccionadasMarca.filter(opt=>opt!==marca);

                    if (result.length === 0) {
                        setVerTodo(true);
                        setOpcionesSeleccionadasMarca(filtrosCheckbox.marcas_tractores_nuevos.arrOpciones);
                    }
                    else setOpcionesSeleccionadasMarca(result);
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
            TRACTORES NUEVOS
        </h1>

       

        <SectionCatalogo 
            section="tractores"
            cards={cards}
            setSearch={setSearch}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            filtrosElement={
                <>
                    <FiltroCheckbox 
                        opcionCheckbox={filtrosCheckbox.marcas_tractores_nuevos}
                        opcionesSeleccionadas={opcionesSeleccionadasMarca}
                        setOpcionesSeleccionadas={setOpcionesSeleccionadasMarca}
                        verTodo={verTodo} setVerTodo={setVerTodo}
                    />

                    <FiltroRango
                        filtroRango={filtrosRango.hp}
                        rango={rangoHP} setRango={setRangoHP}
                        min_input_id={min_input_hp_id}
                        max_input_id={max_input_hp_id}
                    />

                    <FiltroRango
                        filtroRango={filtrosRango.year}
                        rango={rangoYear} setRango={setRangoYear}
                        min_input_id={min_input_year_id}
                        max_input_id={max_input_year_id}
                    />
                </>
            }
            tagsElement={
                <div className="flex flex-wrap gap-2 mb-2">
                    {/* Rango HP */}
                    {rangoHP && (rangoHP.min > 0 || rangoHP.max < Infinity) && (
                        <FiltroTag 
                            nombre={`HP: ${rangoHP.min} - ${rangoHP.max === Infinity ? "∞" : rangoHP.max}`}
                            handler={()=>{
                                const input_min = document.getElementById(min_input_hp_id) as HTMLInputElement;
                                input_min.value="";
                                const input_max = document.getElementById(max_input_hp_id) as HTMLInputElement;
                                input_max.value="";

                                setRangoHP({ min: 0, max: Infinity })
                            }}
                        />
                    )}

                    {/* Rango Year */}
                    {rangoYear && (rangoYear.min > 0 || rangoYear.max < Infinity) && (
                        <FiltroTag 
                            nombre={`Año: ${rangoYear.min} - ${rangoYear.max === Infinity ? "∞" : rangoYear.max}`}
                            handler={()=>{
                                const input_min = document.getElementById(min_input_year_id) as HTMLInputElement;
                                input_min.value="";
                                const input_max = document.getElementById(max_input_year_id) as HTMLInputElement;
                                input_max.value="";

                                setRangoYear({ min: 0, max: Infinity })
                            }}
                        />
                    )}

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
