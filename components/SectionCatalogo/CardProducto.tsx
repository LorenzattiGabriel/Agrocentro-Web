"use client";

import { ProductoSection, Tractor } from "@/types/Producto"
import CotizarButton from "./buttons/CotizarButton"
import DetalleButton from "./buttons/DetalleButton"

type Props = {
    producto: Tractor,
    section: ProductoSection
}

export default function CardProducto({producto, section}:Props){
    return (
        <article
            key={producto.id} 
            className="
                max-w-70 w-full
                bg-white 
                flex flex-col overflow-hidden 
                rounded-2xl border-1 hover:border-secondary
                hover:shadow-2xl hover:bg-[#00a63d18] hover:scale-101 
                cursor-pointer
                transition-all hover:transition-all 
                fade-in-up
            "
            onClick={()=>window.open(`/${section}/${producto.id}`, "_self")} 
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

                <main className="h-full">
                    <dl className="flex flex-col justify-end gap-1 text-md h-full">
                        <div className="flex items-center gap-1">
                            <dt className="font-medium">HP:</dt>
                            <dd>{producto.hp}</dd>
                        </div>
                    </dl>
                </main>
                


            </div>
        </article>
    )
}