export type Producto = {
    id: number,
    section: "tractores" | "implementos" | "repuestos" | "usados"
}

export type Tractor = Producto & {
    section: "tractores",    
    image: string,
    name: string,
    marca: string,
    hp: number,
    price: string | number //string es el valor "Consultar"
}