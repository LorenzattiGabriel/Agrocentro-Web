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
){
    setSelectedOrder(opt.value);
    setDropdownOpen(false);
}

