import { ProductoSection } from "@/types/Producto"

export type Props = {
    section: ProductoSection,

    selectedOrder: string,
    
    setSelectedOrder: Dispatch<SetStateAction<string>>
}