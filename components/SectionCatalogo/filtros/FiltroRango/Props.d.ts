import { FiltroRango } from "./types/filtrosRango";
import { Rango } from "./types/rango";

type Props = {
    filtroRango: FiltroRango

    setRango: Dispatch<SetStateAction<Rango>>
}