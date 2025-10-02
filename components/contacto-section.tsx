import { Mail, Phone, MapPin } from "lucide-react";

export function ContactoSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[600px] py-16"
      style={{ backgroundImage: 'url("/bg_contactoSection.jpg")' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row p-2">
        {/* --- COLUMNA BLANCA --- */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-secondary mb-6">
            Contacta con nosotros
          </h2>
          {/* --- FORMULARIO --- */}
          <div>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-3 border-input rounded"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-3 border-input rounded"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full p-3 border-input rounded"
              />
              <textarea
                placeholder="Mensaje"
                className="w-full p-3 border-input rounded resize-none h-32"
              />
              <button
                type="submit"
                className="bg-primary text-white py-3 px-6 rounded hover:bg-primary/90 transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* --- COLUMNA VERDE --- */}
        <div className="flex-[0.5] bg-accent backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <div className="text-white bg-accent/90 rounded-lg p-6 h-full flex items-center justify-center">
            <div className="space-y-6 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Río Primero</p>
                  <p className="opacity-90">Ruta Nacional 9 Km 695</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Villa Santa Rosa</p>
                  <p className="opacity-90">Av. San Martín 1250</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <p className="opacity-90">(03525) 123-456</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <p className="opacity-90">info@agrocentro.com.ar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
