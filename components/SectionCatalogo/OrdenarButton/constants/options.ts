import { sortByHpAsc, sortByHpDesc, sortById, sortByYearAsc, sortByYearDesc} from "../utils/sortFunctions";

export const orderOptions = [
    { value: "ventas", label: "Más vendido", sortFunction: sortById }
];


export const orderOptions_tractores = [
    { value: "ventas", label: "Más vendido", sortFunction: sortById },
    { value: "hp-asc", label: "HP (menor a mayor)", sortFunction: sortByHpAsc },
    { value: "hp-desc", label: "HP (mayor a menor)", sortFunction:sortByHpDesc }
];

export const orderOptions_tractores_usados = [
    { value: "ventas", label: "Más vendido", sortFunction: sortById },
    { value: "hp-asc", label: "HP (menor a mayor)", sortFunction: sortByHpAsc },
    { value: "hp-desc", label: "HP (mayor a menor)", sortFunction:sortByHpDesc },
    { value: "year-asc", label: "Año (menor a mayor)", sortFunction: sortByYearAsc },
    { value: "year-desc", label: "Año (mayor a menor)", sortFunction:sortByYearDesc }
];
