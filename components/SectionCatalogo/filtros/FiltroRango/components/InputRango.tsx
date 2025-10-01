import { Dispatch, SetStateAction } from "react"
import { Rango } from "../types/rango"


type Props = {
    placeholder: string,
    min?: number,
    max?: number,

    value: number,
    changeHandler: Function,
    submitHandler: Function
}

export default function InputRango({placeholder, min, max, value, changeHandler, submitHandler}: Props){
    
    return(
        <input 
            type="number" 
            className="
                border-1 border-gray-400 rounded-md  hover:border-secondary
                outline-accent focus:outline-1
                text-center text-sm
                max-w-22
                transition
            "
            placeholder={placeholder}
            min={`${min&&min}`}
            max={`${max&&max}`}

            value={value===0?"":value}
            onChange={(e)=>changeHandler(e.target.value)}
            onKeyDown={(e)=>{
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitHandler();
                }
            }}
        />
    )
}