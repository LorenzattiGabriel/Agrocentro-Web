import { Implemento, ProductoSection, Repuesto, TractorNuevo, TractorUsado } from "@/types/Producto";
import tractores from "@/constants/tractores.json"
import implementos from "@/constants/implementos.json"
import repuestos from "@/constants/repuestos.json"


export default function getDemoData(section: ProductoSection){
    switch(section) {
        case "tractores": 
            return tractores.filter(p=>p.nuevo).map(p=>{return {...p, section: "tractores"}}) as TractorNuevo[];
        
        case "implementos": return implementos.map(p=>{return {...p, section: "implementos"}}) as Implemento[];
        
        case "repuestos": return repuestos.map(p=>{return {...p, section: "repuestos"}}) as Repuesto[];
        
        case "usados": return tractores.filter(p=>!p.nuevo).map(p=>{return {...p, section: "usados"}}) as TractorUsado[];
    }
}