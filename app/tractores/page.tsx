"use client";

import CardProducto from "@/components/SectionCatalogo/CardProducto";
import { filtrosCheckbox } from "@/components/SectionCatalogo/filtros/FiltroCheckbox/constants/filtrosCheckbox";
import FiltroCheckbox from "@/components/SectionCatalogo/filtros/FiltroCheckbox/FiltroCheckbox";
import { filtrosRango } from "@/components/SectionCatalogo/filtros/FiltroRango/constants/filtrosRango";
import FiltroRango from "@/components/SectionCatalogo/filtros/FiltroRango/FiltroRango";
import SectionCatalogo from "@/components/SectionCatalogo/SectionCatalogo"
import useCatalogoTractores from "@/hooks/useCatalogoTractores"


export default function TractoresPage() {

    const {
        productos, setProductos, 
        opcionesSeleccionadasMarca, setOpcionesSeleccionadasMarca,
        rangoHP, setRangoHP,
        search, setSearch,
        selectedOrder, setSelectedOrder
    } = useCatalogoTractores();

    const cards = productos.map((producto) => <CardProducto producto={producto} key={producto.id}/>);

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
                    />

                    <FiltroRango 
                        filtroRango={filtrosRango.hp}
                        setRango={setRangoHP}
                    />
                </>
            }
        />
    </main>
  )
}
