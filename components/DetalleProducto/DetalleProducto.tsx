"use client";

import VolverButton from "../SectionCatalogo/buttons/VolverButton";

import { Producto, Repuesto } from "@/types/Producto";
import CotizadorModal from "@/components/cotizador-modal";
import CotizarButton from "@/components/SectionCatalogo/buttons/CotizarButton";
import CardProducto from "@/components/SectionCatalogo/CardProducto";
import ProductImage from "@/components/ProductImage";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContenidoDetalleProducto from "./ContenidoDetalleProducto/ContenidoDetalleProducto";

interface Props {
    producto: Producto;
    urlCatalogo: string;
    recomendados: Producto[];
}
export default function DetalleProducto({ producto, urlCatalogo, recomendados }: Props) {

    const [verCotizador, setVerCotizador] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % producto.ids_imagenes.length);
    };
    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + producto.ids_imagenes.length) % producto.ids_imagenes.length);
    };


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

            <div className="flex flex-col items-center col-span-2 md:col-span-1 gap-4">
                <div className="relative w-full aspect-square">
                    {producto.ids_imagenes.length > 0 ? (
                        <>
                            {producto.ids_imagenes.map((img, index) => (
                                <ProductImage
                                    key={index}
                                    src={img}
                                    alt={`${producto.nombre} - imagen ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-contain rounded-lg bg-white shadow-sm transition-opacity duration-300 ${
                                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                                    }`}
                                    loading="eager"
                                    productType={producto.section === 'repuestos' ? 'repuestos' : 'implementos'}
                                    isNew={producto.section === 'implementos-nuevos' ? true : producto.section === 'implementos-usados' ? false : undefined}
                                />
                            ))}
                            {producto.ids_imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors cursor-pointer z-10"
                                        aria-label="Imagen anterior"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors cursor-pointer z-10"
                                        aria-label="Siguiente imagen"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <img
                            src="/placeholder.svg"
                            alt={`${producto.nombre} - imagen no disponible`}
                            className="w-full h-full object-contain rounded-lg bg-white shadow-sm"
                        />
                    )}
                </div>
                {/* Thumbnails */}
                {producto.ids_imagenes.length > 1 && (
                    <div className="flex gap-2 justify-center flex-wrap">
                        {producto.ids_imagenes.map((img, index) => (
                            <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-20 h-20 rounded-md overflow-hidden border-2 transition ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}>
                                <ProductImage 
                                    src={img} 
                                    alt={`Thumbnail ${index + 1}`} 
                                    className="w-full h-full object-cover" 
                                    loading="eager"
                                    productType={producto.section === 'repuestos' ? 'repuestos' : 'implementos'}
                                    isNew={producto.section === 'implementos-nuevos' ? true : producto.section === 'implementos-usados' ? false : undefined}
                                />
                            </button>
                        ))}
                    </div>
                )}
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