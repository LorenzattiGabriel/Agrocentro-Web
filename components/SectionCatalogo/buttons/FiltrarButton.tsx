import { SlidersHorizontal } from "lucide-react"


type Props = {
    handler: Function
}


export default function FiltrarButton ({handler}: Props){
    
    return (
        <button 
            className="
                sm:hidden
                min-h-10 h-fit
                border rounded 
                px-3 py-1 text-sm 
                focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-gray-200 
                cursor-pointer hover:bg-gray-200 
                transition-all hover:transition-all
            " 
            
            onMouseDown={()=>{handler()}}
        >
            Filtrar productos <SlidersHorizontal className="inline mx-2 w-4.5 text-accent"/>
        </button>
    )
}