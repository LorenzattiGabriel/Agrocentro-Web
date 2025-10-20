"use client";

import { Implemento, Producto, Repuesto, TractorNuevo, TractorUsado } from "@/types/Producto";

type Props = {
  producto: Producto;
};

export default function CardProducto({ producto }: Props) {
  const tractorNuevo = producto as TractorNuevo;
  const tractorUsado = producto as TractorUsado;
  const implemento = producto as Implemento;
  const repuesto = producto as Repuesto;

  return (
    <article
      key={producto.id}
      className="
        max-w-70 w-full
        bg-white 
        flex flex-col overflow-hidden 
        rounded-2xl border border-gray-200 hover:border-secondary
        hover:shadow-2xl hover:bg-[#00a63d18] hover:scale-101 
        cursor-pointer
        transition-all hover:transition-all 
        fade-in-up
      "
      onClick={() => window.open(`/${producto.section}/${producto.id}`, "_self")}
    >
      <img
        src={producto.image}
        alt={producto.name}
        className="w-full h-56 object-cover bg-white"
        loading="lazy"
      />

      {/* ---------- TRACTORES NUEVOS ---------- */}
      {producto.section === "tractores" && (
        <div className="flex-1 flex flex-col p-4">
          <header>
            <h2 className="text-lg font-semibold text-foreground mb-1">{tractorNuevo.name}</h2>
            <p className="text-sm text-secondary mb-1">{tractorNuevo.marca}</p>
            <p className="text-sm text-muted-foreground italic mb-2">{tractorNuevo.modelo}</p>
          </header>

          <main className="h-full">
            <p className="text-sm text-foreground/90">
              {tractorNuevo.descripcion || "Sin descripción disponible"}
            </p>
          </main>
        </div>
      )}

      {/* ---------- TRACTORES USADOS ---------- */}
      {producto.section === "usados" && (
        <div className="flex-1 flex flex-col p-4">
          <header>
            <h2 className="text-lg font-semibold text-foreground mb-1">{tractorUsado.name}</h2>
            <p className="text-sm text-secondary mb-1">{tractorUsado.marca}</p>
            <p className="text-sm text-muted-foreground italic mb-2">{tractorUsado.modelo}</p>
          </header>

          <main className="h-full">
            <p className="text-sm text-foreground/90">
              {tractorUsado.descripcion || "Sin descripción disponible"}
            </p>
          </main>
        </div>
      )}

      {/* ---------- IMPLEMENTOS ---------- */}
      {producto.section === "implementos" && (
        <div className="flex-1 flex flex-col p-4">
          <header>
            <h2 className="text-lg font-semibold text-foreground mb-1">{implemento.name}</h2>
            <p className="text-sm text-secondary mb-1">{implemento.marca}</p>
            <p className="text-sm text-muted-foreground italic mb-2">{implemento.modelo}</p>
          </header>

          <main className="h-full">
            <p className="text-sm text-foreground/90">
              {implemento.descripcion || "Sin descripción disponible"}
            </p>
          </main>
        </div>
      )}

      {/* ---------- REPUESTOS ---------- */}
      {producto.section === "repuestos" && (
        <div className="flex-1 flex flex-col p-4">
          <header>
            <h2 className="text-lg font-semibold text-foreground mb-1">{repuesto.name}</h2>
            <p className="text-sm text-secondary mb-1">{repuesto.marca}</p>
            <p className="text-sm text-muted-foreground italic mb-2">{repuesto.modelo}</p>
          </header>

          <main className="h-full">
            <p className="text-sm text-foreground/90">
              {repuesto.descripcion || "Sin descripción disponible"}
            </p>
          </main>
        </div>
      )}
    </article>
  );
}
