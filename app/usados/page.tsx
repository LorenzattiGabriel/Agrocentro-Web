import SectionCatalogo from "@/components/SectionCatalogo/SectionCatalogo"


export default function UsadosPage() {
  return (
    <main className="min-h-screen">
        <h1 className="
            text-2xl md:text-3xl font-semibold text-secondary
            pl-10 pt-3
            mb-10 pr-4
        ">
            TRACTORES USADOS
        </h1>

        <SectionCatalogo section="usados"/>
    </main>
  )
}
