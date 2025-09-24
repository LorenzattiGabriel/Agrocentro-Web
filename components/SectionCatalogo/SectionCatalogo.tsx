import tractoresNuevos from "@/constants/tractores-nuevos.json"
import CardProducto from "./CardProducto";


export default function SectionCatalogo(){
    


    return (
    <div className="
        grid grid-cols-[1.5fr_5fr]       
        xl:px-10 2xl:px-30
        min-h-screen
    ">
        {/* Filtros */}
        <aside className="
            
        ">
            <form >

                <fieldset>
                    <legend>HP (caballos de fuerza)</legend>
                    <label><input type="radio"/>Todos</label>
                    <label><input type="radio"/>Menos de 100</label>
                    <label><input type="radio"/>Entre 100 y 150</label>
                    <label><input type="radio"/>Entre 150 y 200</label>
                    <label><input type="radio"/>Más de 200</label>
                </fieldset>



            </form>
        </aside>

        <div>

            {/* Barra busqueda */}
            <div>

            </div>

            {/* Catalogo */}
            <section
                className="
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
                    gap-6 
                    w-full max-w-300
                    py-8 px-8
                "
            >
                {tractoresNuevos.map((tractor) => <CardProducto producto={{...tractor, section: "tractores"}} key={tractor.id}/>)}
            </section>



        </div>
    </div>
    )
}