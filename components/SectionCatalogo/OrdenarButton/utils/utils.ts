import { orderOptions } from "../constants/options";

export function getOrderLabel(value: string) {
    const found = orderOptions.find(opt => opt.value === value);
    return found ? found.label : "";
}

export function getOrderFunction(value: string) {
    const found = orderOptions.find(opt => opt.value === value);
    return found ? found.sortFunction : ()=>{throw new Error("No se encontró sort function.")};
}