
import { ImplementoUsado } from "@/types/Producto";

interface Props {
    implementoUsado: ImplementoUsado;
}

export default function ContenidoImplementoUsado({ implementoUsado: implemento }: Props) {
    return (
        <div className="space-y-2 text-gray-700 mb-12 text-lg">
            <p><span className="font-semibold">Marca:</span> {implemento.marca}</p>
            <p><span className="font-semibold">Modelo:</span> {implemento.modelo}</p>
            <p><span className="font-semibold">Condición:</span>Usado</p>
            <p><span className="font-semibold">Año:</span> {implemento.year}</p>

            {implemento.descripcion.split('.').map((sentence, index, array) => (
                sentence.trim() !== '' && (
                    <p key={index}>{sentence.trim() + (index < array.length - 1 ? '.' : '')}</p>
                )
            ))}

        </div>
    );
}