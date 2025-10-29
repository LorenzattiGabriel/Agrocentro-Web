
import Link from "next/link";

export default function DbErrorPage() {
    return (
        <div className="flex flex-col items-center justify-start pt-40 min-h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Oops! Algo salió mal...</h1>
            <p className="text-lg mb-8 text-center">
                Lo sentimos, no pudimos realizar la operación en este momento. Por favor, inténtalo de nuevo más tarde o contacta al soporte técnico si el problema persiste.
            </p>

            <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                Volver a la página principal
            </Link>
        </div>
    );
}