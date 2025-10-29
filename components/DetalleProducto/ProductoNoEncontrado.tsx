
import Link from "next/link";

interface Props {
    nombreSection: string
    urlCatalogo: string;
}

export default function ProductoNoEncontrado({ nombreSection,urlCatalogo }: Props) {
    return (
        <div className="flex flex-col items-center justify-start pt-30 h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">{nombreSection} no encontrado</h1>
            <p className="text-lg mb-8">Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
            <Link href={urlCatalogo} className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                Volver al catálogo
            </Link>
        </div>
    );
}