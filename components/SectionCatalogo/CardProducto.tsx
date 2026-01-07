"use client";

import { Implemento, ImplementoUsado, Producto, Repuesto } from "@/types/Producto"
import ProductImage from "@/components/ProductImage"

type Props = {
    producto: Producto
}

export default function CardProducto({producto}:Props){

    const implemento = producto as Implemento;
    const implementoUsado = producto as ImplementoUsado;
    const repuesto = producto as Repuesto;




    return (
        <article
            key={producto.id} 
            className="
                w-full
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
            <ProductImage 
                src={producto.ids_imagenes?.[0]} 
                alt={producto.nombre} 
                className="w-full h-48 sm:h-56 object-cover bg-white"
                loading="lazy"
                productType={producto.section === 'repuestos' ? 'repuestos' : 'implementos'}
                isNew={producto.section === 'implementos-nuevos' ? true : producto.section === 'implementos-usados' ? false : undefined}
            />

            

            {producto.section==="implementos-usados"&&
                <div className="flex-1 flex flex-col p-4">
                    <header>
                        
                        <h2 className="text-lg font-semibold text-foreground mb-1">{implementoUsado.nombre}</h2>
                        <p className="text-sm text-secondary mb-2">{implementoUsado.marca}</p>
                    </header>

                    <main className="h-full">
                        <dl className="flex flex-col justify-end gap-1 text-md h-full">
                            <div className="flex items-center gap-1">
                                <dt className="hidden">Categoría:</dt>
                                <dd className=" font-bold text-foreground/90">{implemento.categoria}</dd>
                            </div>

                            <div className="flex items-center gap-1">
                                <dt className="hidden">Año</dt>
                                <dd className=" font-bold text-foreground/90">{implementoUsado.year}</dd>
                            </div>
                            
                        </dl>
                    </main>
                </div>
            }

            {producto.section==="implementos-nuevos"&&
                <div className="flex-1 flex flex-col p-4">
                    <header>
                        
                        <h2 className="text-lg font-semibold text-foreground mb-1">{implemento.nombre}</h2>
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
                        <h2 className="text-lg font-semibold text-foreground mb-1">{repuesto.nombre}</h2>
                        <p className="text-sm text-secondary mb-2">{repuesto.marca}</p>
                    </header>

                    <main className="h-full">
                        <dl className="flex flex-col justify-end gap-1 text-md h-full">
                            <div className="flex items-start gap-2">
                                <dt>Descripcion:</dt>
                                <dd className="font-bold text-foreground/90">{repuesto.descripcion}</dd>
                            </div>
                        </dl>
                    </main>
                </div>
            }




        </article>
    )
}