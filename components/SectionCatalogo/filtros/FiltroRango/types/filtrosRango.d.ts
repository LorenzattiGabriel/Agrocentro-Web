

export type FiltroRango = {
    nombre: string,
    
    subtitulo?: string,
    
    filtrar: (
        rango: Rango, 
        productos: ({
            id: number;
            name: string;
            marca: string;
            price: string;
            image: string;
            hp: number;
        } | {
            id: number;
            name: string;
            marca: string;
            price: number;
            image: string;
            hp: number;
        })[], 
        setProductosFiltrados: Dispatch<SetStateAction<({
            id: number;
            name: string;
            marca: string;
            price: string;
            image: string;
            hp: number;
        } | {
            id: number;
            name: string;
            marca: string;
            price: number;
            image: string;
            hp: number;
        })[]>>
    )=> void   
}