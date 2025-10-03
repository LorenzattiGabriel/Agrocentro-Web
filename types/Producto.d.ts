export type ProductoSection = "tractores" | "implementos" | "repuestos" | "usados";

export type Producto = TractorNuevo | TractorUsado | Implemento | Repuesto;

type Tractor = {
    id: number,  
    image: string,
    name: string,
    marca: string,
    hp: number
};

export type TractorNuevo = Tractor & {
    section: "tractores",
}

export type TractorUsado = Tractor & {
    section: "usados"
    year: number
};

export type Implemento = {
    id: number,  
    section: "implementos",    
    name: string,
    marca: string,
    image: string,
    categoria: string,
    modelo: string
};

export type Repuesto = {
    id: number,  
    section: "repuestos",    
    name: string,
    marca: string,
    descripcion: string,
    image: string,
    categoria: string,
    modelos: string[]
};

