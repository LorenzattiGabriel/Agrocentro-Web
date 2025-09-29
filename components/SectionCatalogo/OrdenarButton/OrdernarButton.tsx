import { useState, useRef} from "react";
import { orderOptions } from "./constants/options";
import { handleDropdownBlur, handleOnClick } from "./utils/handlers";
import { getOrderLabel } from "./utils/utils";
import type { Props } from "./Props";


export default function OrdernarButton({selectedOrder, setSelectedOrder}: Props){

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    return(
        <div className="relative" ref={dropdownRef}>
            <button
                id="orderByDropdownButton"
                type="button"
                className="
                    h-10
                    border rounded 
                    px-3 py-1 
                    text-sm font-medium flex items-center 
                    gap-2 
                    focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-gray-200
                    hover:cursor-pointer hover:bg-gray-200
                    transition-all hover:transition-all
                "
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-controls="orderByDropdownMenu"
                onClick={() => setDropdownOpen((open) => !open)}
                onBlur={(e)=>{handleDropdownBlur(e, dropdownRef, setDropdownOpen)}}
            >
                Ordenar por: <span className="font-semibold">{getOrderLabel(selectedOrder)}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {dropdownOpen && (
                <ul
                    id="orderByDropdownMenu"
                    className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg z-10 fade-in-up"
                    role="listbox"
                    aria-labelledby="orderByDropdownButton"
                    tabIndex={-1}
                    onBlur={(e)=>{handleDropdownBlur(e, dropdownRef, setDropdownOpen)}}
                >
                    {orderOptions.map(opt => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={selectedOrder === opt.value}
                            tabIndex={0}
                            className={`
                                px-4 py-2 
                                hover:bg-secondary hover:text-white 
                                cursor-pointer 
                                transition-all hover:transition-all
                                ${selectedOrder === opt.value ? "bg-gray-200 font-semibold" : ""}`
                            }
                            onClick={() => {handleOnClick(opt,setSelectedOrder,setDropdownOpen)}}
                            onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") handleOnClick(opt,setSelectedOrder,setDropdownOpen);
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}