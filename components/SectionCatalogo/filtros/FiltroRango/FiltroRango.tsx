"use client";

import InputRango from "./components/InputRango";
import { Props } from "./Props";



export default function FiltroRango({filtroRango, rango, setRango, min_input_id, max_input_id}: Props) {


    return (
        <fieldset className="flex flex-col items-start gap-5">
            <div>
                <legend className="font-bold text-xl">
                    {filtroRango.nombre}
                    {filtroRango.subtitulo && <span className="font-semibold text-sm">{filtroRango.subtitulo}</span>}
                </legend>
                
            </div>

            <div>
                <div className="flex flex-wrap gap-2">

                    <InputRango  placeholder="Mínimo" min={0} 
                        input_id={min_input_id}
                        submitHandler={()=>{
                            const input = document.getElementById(min_input_id) as HTMLInputElement;
                            const num = Number(input.value);
                            setRango({...rango, min: input.value === "" || isNaN(num) ? 0 : num })
                        }}
                    />

                    <span className="font-semibold">-</span>
                    
                    <InputRango placeholder="Máximo" min={0} 
                        input_id={max_input_id}
                        submitHandler={()=>{
                            const input = document.getElementById(max_input_id) as HTMLInputElement;
                            const num = Number(input.value);
                            setRango({...rango, max: input.value === "" || isNaN(num) ? Infinity : num })
                        }}
                    />
                    
                    <button 
                        className="
                            font-black text-background bg-accent 
                            rounded-full 
                            p-1 w-7 h-7 
                            flex items-center justify-center 
                            cursor-pointer hover:bg-secondary hover:scale-105 
                            transition
                        "
                        type="button"
                        onMouseDown={()=>{
                            const input_min = document.getElementById(min_input_id) as HTMLInputElement;
                            const num_min = Number(input_min.value);
                            
                            const input_max = document.getElementById(max_input_id) as HTMLInputElement;
                            const num_max = Number(input_max.value);
                            setRango({
                                min: input_min.value === "" || isNaN(num_min) ? 0 : num_min,
                                max: input_max.value === "" || isNaN(num_max) ? Infinity : num_max
                            });
                            
                        }}
                    >
                        <span className="relative -top-[1px]">{'>'}</span>
                    </button>

                </div>

            </div>

        </fieldset>
    )
}