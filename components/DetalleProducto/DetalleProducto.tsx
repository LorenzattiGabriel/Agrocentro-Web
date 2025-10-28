"use client";

import VolverButton from "../SectionCatalogo/buttons/VolverButton";


import { Producto, Repuesto } from "@/types/Producto";
import CotizadorModal from "@/components/cotizador-modal";
import CotizarButton from "@/components/SectionCatalogo/buttons/CotizarButton";
import CardProducto from "@/components/SectionCatalogo/CardProducto";
import { useState } from "react";
import ContenidoDetalleProducto from "./ContenidoDetalleProducto/ContenidoDetalleProducto";

interface Props {
    producto: Producto;
    urlCatalogo: string;
    recomendados: Producto[];
}


export default function DetalleProducto({ producto, urlCatalogo, recomendados }: Props) {

    const [verCotizador, setVerCotizador] = useState<boolean>(false);


    return (
    <main className="min-h-screen bg-gray-50 pt-10">
        

        
        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Volver */}
            <div className="col-span-2 flex justify-between items-center">
                <VolverButton url={urlCatalogo}/>
                <h2 className="col-span-2 text-xl text-right">Categoría: <span className="text-primary">{producto.categoria}</span></h2>
            </div>

            {/* Product Image */}
            <h1 className="text-4xl font-bold mb-2 col-span-2 text-center">{producto.nombre}</h1>

            <div className="flex flex-col items-center col-span-2 md:col-span-1 max-h-90">
                <img
                    src={producto.ids_imagenes[0]}
                    alt={producto.nombre}
                    className="w-fit object-contain rounded-lg bg-white shadow-sm max-h-90"
                />
                {/* (Optional) thumbnails if you had more images */}
            </div>

            {/* Product Info */}
            <div className="flex flex-col col-span-1">

                <ContenidoDetalleProducto producto={producto}/>


                {/* Actions */}
                <div className="
                    border-2 hover:shadow-md transition
                    p-6 
                    rounded-2xl
                    flex flex-col gap-4
                ">
                    <p className="text-foreground text-center"> 
                        Contacta al vendedor para conocer el precio y disponibilidad.
                    </p>
                    <div className="w-full">
                        <CotizarButton clickHandler={()=>setVerCotizador(true)}/>
                        <CotizadorModal 
                            productoSection={producto.section}
                            isOpen={verCotizador}
                            onClose={()=>setVerCotizador(false)}
                            maquina={producto.nombre}
                        />  
                    </div>
                </div>
            </div>
        </section>

        <hr />

        {/* Extra Section */}
        <section className="max-w-6xl mx-auto px-6 mt-16 col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Productos relacionados: <span className="text-primary">{producto.categoria}</span></h2>
            {/* Grid of related items here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {recomendados.map(r=>
                <div>
                    <CardProducto producto={r} key={r.id} />
                </div>
                )}
            </div>
        </section>
    </main>
    )
}