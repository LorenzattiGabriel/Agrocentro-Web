import { filtrarCategoria, filtrarMarca } from "../utils/filtros"

export type FiltroCheckbox = {
    id: string,
    nombreFiltro: string,
    filtrar: Function
}


export const filtrosCheckbox = {
    marcas_tractores_nuevos: {id: "marcasTractores", nombreFiltro: "Marca", filtrar: filtrarMarca},
    marcas_tractores_usados: {id: "marcasUsados", nombreFiltro: "Marca", filtrar: filtrarMarca},
    marcas_implementos: {id: "marcasImplementos", nombreFiltro: "Marca", filtrar: filtrarMarca},
    marcas_Repuestos: {id: "marcasRepuestos", nombreFiltro: "Marca", filtrar: filtrarMarca},


    categorias_Implementos: {id: "categoriasImplementos", nombreFiltro: "Categorías", filtrar: filtrarCategoria},
    categorias_Repuestos: {id: "categoriasRepuestos", nombreFiltro: "Categorías", filtrar: filtrarCategoria}
}
