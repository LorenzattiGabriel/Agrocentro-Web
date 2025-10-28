import { ImplementoNuevo } from "@/types/Producto";

interface Props {
    implementoNuevo: ImplementoNuevo;
}

export default function ContenidoImplementoNuevo({ implementoNuevo: implemento }: Props) {
    return (
        <div className="space-y-2 text-gray-700 mb-12 text-lg">
            <p><span className="font-semibold">Marca:</span> {implemento.marca}</p>
            <p><span className="font-semibold">Modelo:</span> {implemento.modelo}</p>
        </div>
    );
}