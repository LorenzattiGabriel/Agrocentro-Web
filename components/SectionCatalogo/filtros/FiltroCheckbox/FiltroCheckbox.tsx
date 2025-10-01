import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { type FiltroCheckbox } from "./constants/filtrosCheckbox";

type Props = {
    opcionCheckbox: FiltroCheckbox,

    opcionesSeleccionadas: string[],
    setOpcionesSeleccionadas: Dispatch<SetStateAction<string[]>>
}


export default function FiltroCheckbox({opcionCheckbox, opcionesSeleccionadas, setOpcionesSeleccionadas}: Props) {

    const [verTodo, setVerTodo] = useState<boolean>(true);

    return (
        <fieldset id={opcionCheckbox.id} className="flex flex-col gap-5">
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
                                    else {
                                        let result = opcionesSeleccionadas.filter(opt=>opt!==opcion);

                                        if (result.length === 0) {setVerTodo(true); setOpcionesSeleccionadas(opcionCheckbox.arrOpciones)}
                                        else setOpcionesSeleccionadas(result)
                                    }
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