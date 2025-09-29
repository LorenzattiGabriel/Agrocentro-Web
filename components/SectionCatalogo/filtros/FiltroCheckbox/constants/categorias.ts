import implementos from "@/constants/implementos.json"
import repuestos from "@/constants/repuestos.json"


export const categoriasImplementos = [...new Set(implementos.map((implemento)=>implemento.categoria))];
export const categoriasRepuestos = [...new Set(repuestos.map((repuesto)=>repuesto.categoria))];