import { Dispatch, SetStateAction } from "react"
import { Rango } from "../types/rango"


type Props = {
    placeholder: string,
    min?: number,
    max?: number,

    // value: number,
    submitHandler: Function,

    input_id: string,

}

export const inputRango_classname = "input-rangoco-classname"

// 
// export default function InputRango({placeholder, min, max, value, changeHandler, submitHandler}: Props){
export default function InputRango({placeholder, min, max, submitHandler, input_id}: Props){
    
    return(
        <input 
            id={input_id}
            type="number" 
            className={`
                border-1 border-gray-400 rounded-md  hover:border-secondary
                outline-accent focus:outline-1
                text-center text-sm
                max-w-22
                transition
                ${inputRango_classname}  
            `}
            placeholder={placeholder}
            min={`${min&&min}`}
            max={`${max&&max}`}

            // value={value===0?"":value}
            // onChange={(e)=>changeHandler(e.target.value)}
            onKeyDown={(e)=>{
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitHandler();
                }
            }}
        />
    )
}