import { Dispatch, RefObject, SetStateAction } from "react";
import { getOrderFunction } from "./utils";

// Close dropdown on outside click
export function handleDropdownBlur(
    e: React.FocusEvent<HTMLButtonElement | HTMLUListElement>,
    dropdownRef: RefObject<HTMLDivElement>,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
) {
    // If focus moves outside the dropdown, close it
    if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
        setDropdownOpen(false);
    }
}

export function handleOnClick(
    opt: {value: string; label: string;},
    setSelectedOrder: Dispatch<SetStateAction<string>>,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>,
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
    setProductos: Dispatch<SetStateAction<({
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
){
    setSelectedOrder(opt.value);
    setDropdownOpen(false);
    
    const sortFunc = getOrderFunction(opt.value);    
    if (sortFunc) sortFunc(productos,setProductos);
}

