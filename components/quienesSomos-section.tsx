export function QuienesSomosPage() {
  return (
    <section className="py-12 md:py-16">
      {/* --- CONOCIENDO AGROCENTRO --- */}
      <div className="container mx-auto px-6 space-y-24">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-secondary mb-4 text-balance">
          Conociendo Agrocentro
        </h2>
        <div className="text-base md:text-lg text-muted-foreground mx-auto text-center leading-relaxed px-4">
          <p>
            En Agrocentro, nos especializamos en brindar soluciones integrales en maquinarias agrícolas,
            acompañando al productor en cada etapa del proceso productivo. Con años de experiencia en el 
            sector, nuestro compromiso es impulsar el crecimiento del agro con tecnología confiable, 
            asesoramiento personalizado y un servicio postventa de excelencia.
          </p>
        </div>

        {/* --- MISION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Misión</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Ser una empresa referente a nivel regional en la distibución y servicio de maquinaria
              agrícola, reconocida por su excelencia operativa, innovación constante y su aporte al 
              desarrollo sostenible del sector agropecuario.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/ig_mision.JPG"
              alt="imagen mision"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* --- VISION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/ig_vision.JPG"
              alt="imagen mision"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Visión</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Proveer maquinarias agrícolas de alta calidad y soluciones innovadoras que mejoren la 
              productividad, eficiencia y sustentabilidad del campo, estableciendo relaciones duraderas 
              con nuestros clientes basadas en confianza, compromiso y cercanía.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
