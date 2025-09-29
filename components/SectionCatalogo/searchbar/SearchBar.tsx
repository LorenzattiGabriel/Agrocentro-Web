import type {Props} from "./Props"

export default function SearchBar({section, setSearch}: Props){

    const inputName = "searchbar-form-input"

    

    return (
        <form 
            className="flex-1 w-full flex gap-2"
            onSubmit={(e)=>{
                    e.preventDefault();
                    
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem(inputName) as HTMLInputElement;
                    
                    setSearch(input.value);
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
                    focus:outline-accent focus:outline-1 focus:bg-gray-100
                    hover:bg-gray-100
                    transition-all hover:transition-all
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