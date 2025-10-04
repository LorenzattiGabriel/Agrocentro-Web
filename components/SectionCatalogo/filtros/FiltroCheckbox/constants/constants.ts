import tractores from "@/constants/tractores.json"
import implementos from "@/constants/implementos.json"
import repuestos from "@/constants/repuestos.json"

//MARCAS
export const marcasTractoresNuevos = [...new Set(tractores.filter(t=>t.nuevo).map((tractor)=>tractor.marca))];
export const marcasTractoresUsados = [...new Set(tractores.filter(t=>!t.nuevo).map((tractor)=>tractor.marca))];

export const marcasImplementos = [...new Set(implementos.map(implemento=>implemento.marca))];

export const marcasRepuestos = [...new Set(repuestos.map(repuesto=>repuesto.marca))];


// CATEGORIAS
export const categoriasImplementos = [...new Set(implementos.map((implemento)=>implemento.categoria))];
export const categoriasRepuestos = [...new Set(repuestos.map((repuesto)=>repuesto.categoria))];