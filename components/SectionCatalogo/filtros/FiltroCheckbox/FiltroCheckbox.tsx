import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { type OpcionCheckbox } from "./constants/opcionesCheckbox";

type Props = {
    opcionCheckbox: OpcionCheckbox,

    productos: ({
        id: number;
        name: string;
        marca: string;
        price: string;
        image: string;
        hp: number;
    } | {
        id: number;
        name: string;
        marca: string;
        price: number;
        image: string;
        hp: number;
    })[],

    setProductosFiltrados: Dispatch<SetStateAction<({
        id: number;
        name: string;
        marca: string;
        price: string;
        image: string;
        hp: number;
    } | {
        id: number;
        name: string;
        marca: string;
        price: number;
        image: string;
        hp: number;
    })[]>>
}


export default function FiltroCheckbox({opcionCheckbox, productos, setProductosFiltrados}: Props) {
    
    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState<string[]>(opcionCheckbox.arrOpciones);
    const [verTodo, setVerTodo] = useState<boolean>(true);

    useEffect(()=>{
        opcionCheckbox.filtrar(opcionesSeleccionadas, productos, setProductosFiltrados);

    }, [opcionesSeleccionadas])

    return (
        <fieldset id={opcionCheckbox.id} className="flex flex-col items-start gap-5 max-w-60 ml-auto">
            <div className="flex w-full items-center justify-between">
                <legend className="font-bold text-xl">{opcionCheckbox.nombreFiltro}</legend>

                <button className={`cursor-pointer border-1 rounded-2xl px-2 my-2 hover:scale-105 hover:text-accent mr-1 transition bg-white ${verTodo? `text-accent border-accent `: `text-gray-500`}`}
                    type="button"
                    onMouseDown={(e)=>{
                        document.querySelectorAll(`#${opcionCheckbox.id} input`).forEach((el)=>{
                            let checkbox = el as HTMLInputElement
                            checkbox.checked = false;
                        })
                    
                        setOpcionesSeleccionadas(opcionCheckbox.arrOpciones);

                        setVerTodo(true);
                    }}
                >
                    Ver todo
                </button>
            </div>

            <div className="flex flex-col gap-1 w-full">
                {opcionCheckbox.arrOpciones.map((opcion)=>{
                    return (
                        <label className={`cursor-pointer hover:text-accent w-full transition hover:transition ${verTodo?"hover:border-b-1 hover:border-b-accent":""}`} key={opcion}>
                            <input type="checkbox" className={`mr-4 accent-accent ${verTodo? "hidden" :""}`}
                                onChange={(e)=>{
                                    //quitar seleccion de "todo" al seleccionar un checkbox
                                    if (verTodo && e.target.checked){
                                        setOpcionesSeleccionadas([opcion])
                                        setVerTodo(false);
                                        return;
                                    }
                                    
                                    if (e.target.checked) setOpcionesSeleccionadas([...opcionesSeleccionadas, opcion])
                                    else setOpcionesSeleccionadas(opcionesSeleccionadas.filter(opt=>opt!==opcion));
                                }}
                            />
                            {opcion}
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}