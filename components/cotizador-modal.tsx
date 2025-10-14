'use client';
import { useEffect, useState } from 'react';

type CotizadorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  maquina: string;
};

const CotizadorModal = ({ isOpen, onClose, maquina }: CotizadorModalProps) => {
  if (!isOpen) return null;
  const [enviado, setEnviado] = useState(false)
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [medioPago, setMedioPago] = useState("");

  const handleSubmit = () => {
    const mensaje = `Hola, estoy interesado en la máquina ${maquina}. 
El método de pago sería: ${medioPago}. 
Estos son mis datos de contacto: 
Nombre: ${nombre}. 
Teléfono: ${telefono}. 
Mail: ${email}.`;

    const urlWhatsapp = `https://wa.me/5491111111111?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, "_blank");

    setEnviado(true);

  };

  {/* --- CERRAR CON ESC --- */ }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50"
      onClick={onClose}
    >

      <section className="flex items-center justify-center py-16 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg space-y-4 bg-white relative">

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold">Cotizar: {maquina}</h2>

          {/* --- CAMPOS A COMPLETAR --- */}
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          {/* --- SELECT --- */}
          <select
            value={medioPago}
            onChange={(e) => setMedioPago(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Seleccioná un método de pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Cheque a 0 días">Cheque a 0 días</option>
            <option value="Cheque a 30 días">Cheque a 30 días</option>
            <option value="Cheque a 60 días">Cheque a 60 días</option>
            <option value="Cheque a 90 días">Cheque a 90 días</option>
            <option value="Cheque a 120 días">Cheque a 120 días</option>
            <option value="Cheque a 160 días">Cheque a 160 días</option>
            <option value="Cheque a 180 días">Cheque a 180 días</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Enviar por WhatsApp
          </button>

          {enviado && (
            <p className="text-green-700 text-sm mt-2">
              ✅ ¡Gracias por tu consulta! Nos pondremos en contacto a la brevedad.
            </p>
          )}

        </div>
      </section>
    </div>
  );
};

export default CotizadorModal;
