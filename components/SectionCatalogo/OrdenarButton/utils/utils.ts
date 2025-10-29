import { ProductoSection } from "@/types/Producto";
import { orderOptions } from "../constants/options";

export function getOrderOptions(section: ProductoSection) {
    switch(section){
        case "implementos-nuevos": return orderOptions;
        case "implementos-usados": return orderOptions
        case "repuestos": return orderOptions;
    }
}

export function getOrderLabel(value: string, section: ProductoSection) {
    let found;
    switch(section){
        case "implementos-nuevos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "implementos-usados":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "repuestos":{
            found = orderOptions.find(opt => opt.value === value);
        }
    }
    return found ? found.label : "";
}

export function getOrderFunction(value: string, section: ProductoSection) {
    let found;
    switch(section){
        case "implementos-nuevos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "implementos-usados":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
        case "repuestos":{
            found = orderOptions.find(opt => opt.value === value);
            break;
        }
    }
   
    
    
    return found ? found.sortFunction : ()=>{throw new Error("No se encontró sort function.")};
}