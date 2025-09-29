import tractoresNuevos from "@/constants/tractores-nuevos.json"
import tractoresUsados from "@/constants/tractores-usados.json"

export const marcasTractores = [...new Set(tractoresNuevos.map((tractor)=>tractor.marca))];
export const marcasUsados = [...new Set(tractoresUsados.map((tractor)=>tractor.marca))];