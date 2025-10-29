
import { ImplementoUsado } from "@/types/Producto";

interface Props {
    implementoUsado: ImplementoUsado;
}

export default function ContenidoImplementoUsado({ implementoUsado: implemento }: Props) {
    return (
        <div className="space-y-2 text-gray-700 mb-12 text-lg">
            <p><span className="font-semibold">Marca:</span> {implemento.marca ? implemento.marca : "Consultar"}</p>
            <p><span className="font-semibold">Modelo:</span> {implemento.modelo ? implemento.modelo : "Consultar"}</p>
            <p><span className="font-semibold">Condición:</span> Usado</p>
            <p><span className="font-semibold">Año:</span> {implemento.year? implemento.year : "Consultar"}</p>
            
            {implemento.descripcion.split(/(?<!\d)\.(?!\d{3})/).map((sentence, index, array) => {
                const trimmedSentence = sentence.trim();
                if (trimmedSentence !== '') {
                    // Add the period back if it's not the last sentence
                    const sentenceWithPeriod = index < array.length - 1 ? trimmedSentence + '.' : trimmedSentence;
                    return (
                        <p key={index}>{sentenceWithPeriod}</p>
                    );
                }
                return null;
            })}

        </div>
    );
}