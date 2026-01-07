"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { type FiltroCheckbox } from "./constants/filtrosCheckbox";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
    opcionCheckbox: FiltroCheckbox,
    arrOpciones: string[],

    opcionesSeleccionadas: string[],
    setOpcionesSeleccionadas: Dispatch<SetStateAction<string[]>>,

    verTodo: boolean,
    setVerTodo: Dispatch<SetStateAction<boolean>>
}


export default function FiltroCheckbox({opcionCheckbox, arrOpciones, opcionesSeleccionadas, setOpcionesSeleccionadas, verTodo, setVerTodo}: Props) {

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <fieldset id={opcionCheckbox.id} className="flex flex-col gap-3">
            <div className="flex w-full items-center justify-between">
                <button 
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 font-bold text-xl hover:text-accent transition-colors"
                >
                    <legend className="cursor-pointer">{opcionCheckbox.nombreFiltro}</legend>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-accent" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </button>

                {isExpanded && (
                    <button className={`cursor-pointer border-1 rounded-2xl px-2 hover:scale-105 hover:text-accent transition bg-white text-xs ${verTodo? `text-accent border-accent `: `text-gray-500`}`}
                        type="button"
                        onMouseDown={(e)=>{
                            document.querySelectorAll(`#${opcionCheckbox.id} input`).forEach((el)=>{
                                let checkbox = el as HTMLInputElement
                                checkbox.checked = false;
                            })
                        
                            setOpcionesSeleccionadas(arrOpciones);

                            setVerTodo(true);
                        }}
                    >
                        Ver todo
                    </button>
                )}
            </div>

            {isExpanded && (
                <div className="flex flex-col gap-1 w-full">
                {arrOpciones.map((opcion)=>{
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
                                    else {
                                        let result = opcionesSeleccionadas.filter(opt=>opt!==opcion);

                                        if (result.length === 0) {setVerTodo(true); setOpcionesSeleccionadas(arrOpciones)}
                                        else setOpcionesSeleccionadas(result)
                                    }
                                }}
                            />
                            {opcion}
                        </label>
                    )
                })}
                </div>
            )}
        </fieldset>
    )
}