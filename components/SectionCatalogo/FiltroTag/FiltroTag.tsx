
type Props = {
    nombre: string,
    handler: Function
}


export default function FiltroTag({nombre, handler}: Props){

    return (
        <button 
            type="button" 
            onClick={()=>handler()}
            className="
                flex items-center
                bg-accent text-background
                rounded 
                px-2 
                text-sm font-medium
                cursor-pointer hover:bg-secondary
                transition-all
            "
        >
            {nombre}
            <span className="
                ml-3 text-2xl relative -top-[2.5px]
            ">
                ×
            </span>
        </button>
    )
}