
type Props = {
    productoSection: string,
    productoId: number
}

export default function DetalleButton ({productoSection, productoId}: Props){
    return (
        <button 
            onClick={()=>window.open(`/${productoSection}/${productoId}`, "_self")} 
            className="inline-block w-full text-center font-medium 
            py-2 px-4 rounded border-black border-1
            text-black bg-white 
            hover:text-white hover:bg-black hover:cursor-pointer
            transition-colors
        ">
            Ver detalles
        </button>
    )
}