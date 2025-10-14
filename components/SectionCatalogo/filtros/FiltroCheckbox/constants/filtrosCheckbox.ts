import { filtrarCategoria, filtrarMarca } from "../utils/filtros"
import { categoriasImplementos, categoriasRepuestos, marcasImplementos, marcasRepuestos, marcasTractoresNuevos, marcasTractoresUsados } from "./constants"
import { Implemento, Producto, Repuesto, Tractor, TractorUsado } from "@/types/Producto";
// import { categoriasImplementos } from "./categorias"

export type FiltroCheckbox = {
    id: string,
    nombreFiltro: string,
    arrOpciones: string[],
    filtrar: Function
}


export const filtrosCheckbox = {
    marcas_tractores_nuevos: {id: "marcasTractores", nombreFiltro: "Marca", arrOpciones: marcasTractoresNuevos, filtrar: filtrarMarca},
    marcas_tractores_usados: {id: "marcasUsados", nombreFiltro: "Marca", arrOpciones: marcasTractoresUsados, filtrar: filtrarMarca},
    marcas_implementos: {id: "marcasImplementos", nombreFiltro: "Marca", arrOpciones: marcasImplementos, filtrar: filtrarMarca},
    marcas_Repuestos: {id: "marcasRepuestos", nombreFiltro: "Marca", arrOpciones: marcasRepuestos, filtrar: filtrarMarca},


    categorias_Implementos: {id: "categoriasImplementos", nombreFiltro: "Categorías", arrOpciones: categoriasImplementos, filtrar: filtrarCategoria},
    categorias_Repuestos: {id: "categoriasRepuestos", nombreFiltro: "Categorías", arrOpciones: categoriasRepuestos, filtrar: filtrarCategoria}
}
