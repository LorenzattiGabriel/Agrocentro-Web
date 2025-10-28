
import { Repuesto } from "@/types/Producto";

interface Props {
    repuesto: Repuesto;
}

export default function ContenidoRepuesto({ repuesto }: Props) {
    return (
        <div className="space-y-2 text-gray-700 mb-12 text-lg">
            <p><span className="font-semibold">Marca:</span> {repuesto.marca}</p>
            <p className="pt-2 text-[16.5px] font-bold">{repuesto.descripcion}</p>
        </div>
    );
}