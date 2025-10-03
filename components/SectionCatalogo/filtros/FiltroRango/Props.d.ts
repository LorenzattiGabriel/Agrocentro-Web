import { filtrosRango } from "./types/filtrosRango";
import { Rango } from "./types/rango";

type Props = {
    filtroRango: filtrosRango

    setRango: Dispatch<SetStateAction<Rango>>
}