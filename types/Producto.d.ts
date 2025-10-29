export type ProductoSection = "implementos-nuevos" |"implementos-usados" | "repuestos";

export type Producto = ImplementoNuevo | ImplementoUsado | Repuesto;

// Base type for all implements, containing shared properties
export type Implemento = {
    id: string,
    nombre: string,
    ids_imagenes: string[],
    marca: string,
    modelo: string,
    categoria: string,

    descripcion: string
};

export type ImplementoNuevo = Implemento & {
    section: "implementos-nuevos"
};

export type ImplementoUsado = Implemento & {
    section: "implementos-usados",
    year: number
};

export type Repuesto = {
    id: string,  
    
    section: "repuestos",    
    
    nombre: string,
    ids_imagenes: string[],
    marca: string,
    categoria: string,

    descripcion: string
};

