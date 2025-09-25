export type ProductoSection = "tractores" | "implementos" | "repuestos" | "usados"

export type Producto = {
    id: number,
    section: ProductoSection
}

export type Tractor = Producto & {
    section: "tractores",    
    image: string,
    name: string,
    marca: string,
    hp: number,
    price: string | number //string es el valor "Consultar"
}