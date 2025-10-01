import { useState } from "react"
import InputRango from "./components/InputRango";
import { Rango } from "./types/rango";
import { Props } from "./Props";



export default function FiltroRango({filtroRango, productos, setProductosFiltrados}: Props) {
    
    const [rango, setRango] = useState<Rango>({min:0, max: Infinity});
    
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

                    <InputRango value={rango.min} placeholder="Mínimo" min={0} 
                        changeHandler={(value: string)=>{
                            const num = Number(value);
                            setRango({...rango, min: value === "" || isNaN(num) ? 0 : num })
                        }}
                        submitHandler={()=>{filtroRango.filtrar(rango, productos, setProductosFiltrados)}}
                    />

                    <span className="font-semibold">-</span>
                    
                    <InputRango value={rango.max} placeholder="Máximo" min={0} 
                        changeHandler={(value: string)=>{
                            const num = Number(value);
                            setRango({...rango, max: value === "" || isNaN(num) ? Infinity : num })
                        }}
                        submitHandler={()=>{filtroRango.filtrar(rango, productos, setProductosFiltrados)}}
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
                        onMouseDown={()=>{filtroRango.filtrar(rango, productos, setProductosFiltrados)}}
                    >
                        <span className="relative -top-[1px]">{'>'}</span>
                    </button>

                </div>

            </div>

        </fieldset>
    )
}