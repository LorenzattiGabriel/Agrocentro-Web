"use client";

import { useState } from "react";
import { ImplementoNuevo } from "@/types/Producto";
import VolverButton from "@/components/SectionCatalogo/buttons/VolverButton";
import CotizarButton from "@/components/SectionCatalogo/buttons/CotizarButton";
import CotizadorModal from "@/components/cotizador-modal";
import CardProducto from "@/components/SectionCatalogo/CardProducto";

interface DetalleImplementoProps {
    implemento: ImplementoNuevo;
    recomendados: ImplementoNuevo[];
    urlCatalogo: string;
}

export default function DetalleImplemento({ implemento, recomendados, urlCatalogo }: DetalleImplementoProps) {
    const [verCotizador, setVerCotizador] = useState<boolean>(false);

    return (
        <main className="min-h-screen bg-gray-50 pt-10">
            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                
                {/* Volver */}
                <div className="col-span-2 flex justify-between items-center">
                    <VolverButton url={urlCatalogo}/>
                    <h2 className="col-span-2 text-xl text-right">Categoría: <span className="text-primary">{implemento.categoria}</span></h2>
                </div>

                {/* Product Image */}
                <h1 className="text-4xl font-bold mb-2 col-span-2 text-center">{implemento.nombre}</h1>

                <div className="flex flex-col items-center col-span-2 md:col-span-1 max-h-90">
                    <img
                        src={implemento.ids_imagenes[0]}
                        alt={implemento.nombre}
                        className="w-fit object-contain rounded-lg bg-white shadow-sm max-h-90"
                    />
                    {/* (Optional) thumbnails if you had more images */}
                </div>

                {/* Product Info */}
                <div className="flex flex-col col-span-1">

                    <div className="space-y-2 text-gray-700 mb-12 text-lg">
                        <p><span className="font-semibold">Marca:</span> {implemento.marca}</p>
                        <p><span className="font-semibold">Modelo:</span> {implemento.modelo}</p>
                    </div>

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
                                productoSection={implemento.section}
                                isOpen={verCotizador}
                                onClose={()=>setVerCotizador(false)}
                                maquina={implemento.nombre}
                            />  
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            {/* Extra Section */}
            <section className="max-w-6xl mx-auto px-6 mt-16 col-span-2">
                <h2 className="text-2xl font-semibold mb-6">Productos relacionados: <span className="text-primary">{implemento.categoria}</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {recomendados.map(r=> <CardProducto producto={r} key={r.id} />)}
                </div>
            </section>
        </main>
    );
}
