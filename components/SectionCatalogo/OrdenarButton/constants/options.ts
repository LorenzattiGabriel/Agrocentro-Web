import { sortByNameAsc, sortByNameDesc} from "../utils/sortFunctions";



export const orderOptions = [
    { value: "name-asc", label: "Nombre (A-Z)", sortFunction: sortByNameAsc },
    { value: "name-desc", label: "Nombre (Z-A)", sortFunction: sortByNameDesc}
];

