
type Props = {
    url: string
}

export default function VolverButton({url}: Props){


    return(
        <button
            onClick={() => window.open(url, "_self", "noopener,noreferrer")}
            className="
                bg-gray-200 hover:bg-gray-300
                text-gray-800 font-medium 
                px-10 py-2 rounded-lg 
                cursor-pointer
                col-span-2
                max-w-37
        ">
            ← Volver
        </button>
    )
}