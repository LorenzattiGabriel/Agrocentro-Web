import { filtrarHP, filtrarYear } from "../utils/filtrar";




export const filtrosRango = {
    hp: {
        nombre: "HP",
        filtrar: filtrarHP
    },
    year: {
        nombre: "Año",
        filtrar: filtrarYear
    }
}