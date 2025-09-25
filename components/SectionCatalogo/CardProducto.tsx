"use client";

import { Tractor } from "@/types/Producto"
import CotizarButton from "./buttons/CotizarButton"
import DetalleButton from "./buttons/DetalleButton"

type Props = {
    producto: Tractor
}

export default function CardProducto({producto}:Props){
    return (
        <article
            key={producto.id} 
            className="
                max-w-70 w-full
                bg-white 
                flex flex-col overflow-hidden 
                rounded-2xl border-1 hover:border-secondary
                hover:shadow-2xl hover:bg-[#00a63d18] hover:scale-101 
                transition-all hover:transition-all 
                fade-in-up
            "
        >
            <img 
                src={producto.image} 
                alt={producto.name} 
                className="w-full h-56 object-cover bg-white"
                loading="lazy"
            />

            <div className="flex-1 flex flex-col p-4">
                <header>
                    <h2 className="text-lg font-semibold text-foreground mb-1">{producto.name}</h2>
                    <p className="text-sm text-secondary mb-2">{producto.marca}</p>
                </header>

                <main>
                    <dl className="flex flex-col justify-between gap-1 text-md mb-3">
                        <div className="flex items-center gap-1">
                            <dt className="font-medium">HP:</dt>
                            <dd>{producto.hp}</dd>
                        </div>
                    </dl>
                </main>
                

                <footer className="mt-auto flex flex-col gap-2 group">
                    {/* Precio */}
                    <div className="
                        text-right
                        font-semibold text-xl  
                        pb-1                      
                    ">
                        <dt className="hidden">Precio</dt>
                        <dd>
                            {typeof producto.price === "number"
                                ? 
                                <>
                                $ {Number(producto.price).toLocaleString("de-DE")}
                                <span className="text-sm font-semibold"> USD</span>
                                </>
                                : <span className="text-sm font-semibold">Consultar Precio</span>
                            }
                            
                        </dd>
                    </div>

                    <CotizarButton />
                    <DetalleButton productoSection={producto.section} productoId={producto.id} />
                </footer>

            </div>
        </article>
    )
}