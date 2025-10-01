import { filtrarHP, filtrarPrecio } from "../utils/filtrar";




export const filtrosRango = {
    hp: {
        nombre: "HP",
        filtrar: filtrarHP
    },
    precio: {
        nombre: "Precio",
        subtitulo: " | $ USD",
        filtrar: filtrarPrecio
    }
}