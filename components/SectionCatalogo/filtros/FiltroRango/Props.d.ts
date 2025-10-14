import { filtrosRango } from "./types/filtrosRango";
import { Rango } from "./types/rango";

type Props = {
    filtroRango: filtrosRango

    rango: Rango,
    setRango: Dispatch<SetStateAction<Rango>>,

    min_input_id: string,
    max_input_id: string
}