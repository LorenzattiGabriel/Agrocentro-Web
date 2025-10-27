export function BotonFlotante() {

    const numVentas = "3574438081";
    return (
        <a
            href={`https://wa.me/3574438081?text=Hola!%20Quisiera%20hacer%20una%20consulta.`}
            target="_blank"
            rel="noopener noreferrer"
            className=" fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl hover:scale-110 transition z-50"
        >
            <img
                src="/icons/ic_WhatsApp_flotante.svg"
                alt="WhatsApp"
                className="w-full h-full object-contain"
            />
        </a>

    )
}