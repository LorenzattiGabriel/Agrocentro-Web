import { Dispatch, SetStateAction } from "react";

type Props = {
    section: string,
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
}

export default function SearchBar({section, productos, setProductos}: Props){

    const inputName = "searchbar-form-input"

    return (
        <form 
            className="flex-1 w-full flex gap-2"
            onSubmit={(e)=>{
                    e.preventDefault();
                    console.log("prevent default ok")
                    setProductos(
                        productos.filter((prod)=>{
                            const form = e.target as HTMLFormElement;
                            const input = form.elements.namedItem(inputName) as HTMLInputElement;
                            
                            return prod.name.toLowerCase().includes(input.value.toLowerCase().trim())
                        })
                    )
                }} 
        >
            <input
                name={inputName}
                type="text"
                placeholder={`Buscar ${section}...`}
                className="
                    w-full 
                    border rounded 
                    px-3 py-1 
                    text-md 
                    focus:outline-accent focus:outline-1
                "
            />
            <button
                type="submit"
                className="
                    cursor-pointer
                    px-4 py-1
                    rounded border-1 border-accent
                    font-medium text-sm 
                    bg-background text-accent 
                    hover:border-none hover:bg-accent hover:text-background 
                    transition-all hover:transition-all
                "
                aria-label="Buscar"
            >
                Buscar
            </button>
        </form>
    )
}