

export default function CotizarButton(){

    return (
        <button
            //TO DO: mostrar un popup con el formulario para la cotización
            onClick={()=>{window.open("https://wa.me/#", "_blank", "noopener,noreferrer")}} //noopener,noreferrer: medida de seguridad contra Reverse Tabnabbing
            
            className="
                flex items-center gap-2 justify-center
                w-full py-1.5 px-4
                rounded
                font-medium 
                bg-green-600 text-white 
                hover:bg-green-900 hover:cursor-pointer
                transition-colors
                glow-sweep-right-delay
        ">
            <img src="/icons/WhatsApp.svg" alt="w" className="invert w-5"/>
            <span className="text-lg relative -top-[1.5px]">Cotizar</span>
        </button>
    )
}