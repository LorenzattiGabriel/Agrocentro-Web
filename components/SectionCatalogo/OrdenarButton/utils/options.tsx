import { sortByHpAsc, sortByHpDesc, sortById, sortByPrecioAsc, sortByPrecioDesc } from "./sortFunctions";

export const orderOptions = [
    { value: "ventas", label: "Más vendido", sortFunction: sortById },
    { value: "precio-asc", label: "Precio (menor a mayor)", sortFunction: sortByPrecioAsc },
    { value: "precio-desc", label: "Precio (mayor a menor)", sortFunction: sortByPrecioDesc },
    { value: "hp-asc", label: "HP (menor a mayor)", sortFunction: sortByHpAsc },
    { value: "hp-desc", label: "HP (mayor a menor)", sortFunction:sortByHpDesc },
];