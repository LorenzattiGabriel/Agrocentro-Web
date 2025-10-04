"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
    clickHandler: Function
}

const wppButtonId = "WhatsApp-icon-img-contactar-button";

export default function CotizarButton({clickHandler}:Props){


    return (
        <button
            type="button"
            onClick={()=>clickHandler()}
            
            className=" group
                flex items-center gap-3 justify-center
                w-full py-1.5 px-4
                rounded
                font-medium 
                bg-primary text-white 
                active:bg-background active:text-primary active:border-1 active:border-primary
                hover:scale-101
                
                cursor-pointer
                transition
                glow-sweep-right
                h-full
        ">
            <img src="/icons/WhatsApp.svg" alt="w" className="invert w-5 filter group-active:[filter:invert(17%)_sepia(98%)_saturate(7496%)_hue-rotate(1deg)_brightness(85%)_contrast(105%)]" id={wppButtonId}/>

            <span className="text-xl relative -top-[1px]">Cotizar</span>
        </button>
    )
}