import { ImplementoNuevo, ImplementoUsado, Producto, Repuesto } from "@/types/Producto";
import ContenidoImplementoNuevo from "./ContenidoImplementoNuevo";
import ContenidoImplementoUsado from "./ContenidoImplementoUsado";
import ContenidoRepuesto from "./ContenidoRepuesto";


interface Props {
    producto: Producto;
}


export default function ContenidoDetalleProducto({ producto }: Props) {
    switch (producto.section) {
        case "implementos-nuevos":
            return <ContenidoImplementoNuevo implementoNuevo={producto as ImplementoNuevo} />;
        case "implementos-usados":
            return <ContenidoImplementoUsado implementoUsado={producto as ImplementoUsado} />;
        case "repuestos":
            return <ContenidoRepuesto repuesto={producto as Repuesto} />;
        default:
            return null;
    }
}