"use client";

import { Implemento, Producto, Repuesto, TractorNuevo, TractorUsado } from "@/types/Producto"

type Props = {
    producto: Producto
}

export default function CardProducto({producto}:Props){

    const tractor = producto as TractorNuevo;
    const usado = producto as TractorUsado;
    const implemento = producto as Implemento;
    const repuesto = producto as Repuesto;


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
            onClick={()=>window.open(`/${producto.section}/${producto.id}`, "_self")} 
        >
            <img 
                src={producto.image} 
                alt={producto.name} 
                className="w-full h-56 object-cover bg-white"
                loading="lazy"
            />

            {producto.section==="tractores"&&
                <div className="flex-1 flex flex-col p-4">
                    <header>
                        
                        <h2 className="text-lg font-semibold text-foreground mb-1">{tractor.name}</h2>
                        <p className="text-sm text-secondary mb-2">{tractor.marca}</p>
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
            }

            {producto.section==="usados"&&
                <div className="flex-1 flex flex-col p-4">
                    <header>
                        
                        <h2 className="text-lg font-semibold text-foreground mb-1">{usado.name}</h2>
                        <p className="text-sm text-secondary mb-2">{usado.marca}</p>
                    </header>

                    <main className="h-full">
                        <dl className="flex flex-col justify-end gap-1 text-md h-full">
                            <div className="flex items-center gap-1">
                                <dt className="hidden">Año</dt>
                                <dd className=" font-bold text-foreground/90">{usado.year}</dd>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <dt className="font-medium">HP:</dt>
                                <dd>{usado.hp}</dd>
                            </div>
                            
                        </dl>
                    </main>
                </div>
            }

            {producto.section==="implementos"&&
                <div className="flex-1 flex flex-col p-4">
                    <header>
                        
                        <h2 className="text-lg font-semibold text-foreground mb-1">{implemento.name}</h2>
                        <p className="text-sm text-secondary mb-2">{implemento.marca}</p>
                    </header>

                    <main className="h-full">
                        <dl className="flex flex-col justify-end gap-1 text-md h-full">
                            <div className="flex items-center gap-1">
                                <dt className="hidden">Categoría:</dt>
                                <dd className=" font-bold text-foreground/90">{implemento.categoria}</dd>
                            </div>
                        </dl>
                    </main>
                </div>
            }

            {producto.section==="repuestos"&&
                <div className="flex-1 flex flex-col p-4">
                    <header>
                        <div className="flex items-center gap-1 justify-end absolute top-2 right-2 bg-accent text-background rounded-2xl px-2 py-0.5">
                                <dt className="hidden">Categoría:</dt>
                                <dd className="font-normal">{repuesto.categoria}</dd>
                        </div>
                        <h2 className="text-lg font-semibold text-foreground mb-1">{repuesto.name}</h2>
                        <p className="text-sm text-secondary mb-2">{repuesto.marca}</p>
                    </header>

                    <main className="h-full">
                        <dl className="flex flex-col justify-end gap-1 text-md h-full">
                            <div className="flex items-start gap-2">
                                <dt>Modelos:</dt>
                                <dd className="font-bold text-foreground/90">{repuesto.modelos.join(", ")}</dd>
                            </div>
                        </dl>
                    </main>
                </div>
            }




        </article>
    )
}