import { ProductoSection } from "@/types/Producto";
import { orderOptions, orderOptions_tractores, orderOptions_tractores_usados } from "../constants/options";

export function getOrderOptions(section: ProductoSection) {
    switch(section){
        case "tractores": return orderOptions_tractores;
        case "implementos": return orderOptions;
        case "repuestos": return orderOptions;
        case "usados": return orderOptions_tractores_usados
    }
}

export function getOrderLabel(value: string, section: ProductoSection) {
    let found;
    switch(section){
        case "tractores":{
            found = orderOptions_tractores.find(opt => opt.value === value);
            break;
        }
        case "implementos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "repuestos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "usados":{
            found = orderOptions_tractores_usados.find(opt => opt.value === value);
        }
    }
    return found ? found.label : "";
}

export function getOrderFunction(value: string, section: ProductoSection) {
    let found;
    switch(section){
        case "tractores":{
            found = orderOptions_tractores.find(opt => opt.value === value);
            break;
        }
        case "implementos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "repuestos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "usados":{
            found = orderOptions_tractores_usados.find(opt => opt.value === value);
        }
    }
   
    
    
    return found ? found.sortFunction : ()=>{throw new Error("No se encontró sort function.")};
}