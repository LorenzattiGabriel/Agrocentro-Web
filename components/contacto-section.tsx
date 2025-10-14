'use client';
import { useState } from "react";
import { InstagramIcon, Mail, Phone, MapPin } from "lucide-react";

export function ContactoSection() {

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const numAgrocentro = "3574438081";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, telefono, email, mensaje } = formData;

    const texto = `Hola, mi nombre es ${nombre}%0A` +
      `Teléfono: ${telefono}%0A` +
      `Email: ${email}%0A%0A` +
      `Quería realizar una consulta, %0A${mensaje}`;

    const url = `https://wa.me/${numAgrocentro}?text=${texto}`;

    window.open(url, "_blank");
  };


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
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* --- NOMBRE --- */}
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                required
                className="w-full p-3 border-input rounded"
              />
              {/* --- EMAIL --- */}
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                onChange={handleChange}
                required
                className="w-full p-3 border-input rounded"
              />
              {/* --- TELEFONO --- */}
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                onChange={handleChange}
                required
                className="w-full p-3 border-input rounded"
              />
              {/* --- MENSAJE --- */}
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                onChange={handleChange}
                required
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
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <p className="opacity-90">(357) 4438083</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Villa Santa Rosa</p>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <p className="opacity-90">(357) 4438081</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <InstagramIcon className="h-4 w-4 mr-2" />
                <a
                  href="https://www.instagram.com/agrocentrocba.sas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 hover:underline hover:text-pink-600 transition"
                >
                  agrocentrocba.sas
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <p className="opacity-90">Agrocentrocba.sas@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
