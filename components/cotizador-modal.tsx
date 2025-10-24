'use client';
import { useEffect, useState } from 'react';
import { ProductoSection } from '../types/Producto';

type CotizadorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  maquina: string;
  productoSection: ProductoSection;
};

const numVillaSantaRosa = "3574438081";
const numRioPrimero = "3574438083"
const numMaquinarias = "3574440032"

function getTelefono(productoSection: ProductoSection) {
  switch (productoSection) {
    case 'tractores': return numMaquinarias;
    case 'implementos': return numMaquinarias;
    case 'usados': return numMaquinarias;
    case 'repuestos': return numVillaSantaRosa;
  }
}

const CotizadorModal = ({ isOpen, onClose, maquina, productoSection }: CotizadorModalProps) => {
  if (!isOpen) return null;
  const [enviado, setEnviado] = useState(false)
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [medioPago, setMedioPago] = useState("");

  const numWhatsApp = getTelefono(productoSection);

  const handleSubmit = () => {

    const mensaje = `Hola, estoy interesado en la máquina ${maquina}. 
El método de pago sería: ${medioPago}. 
Estos son mis datos de contacto: 
Nombre: ${nombre}. 
Teléfono: ${telefono}. 
Mail: ${email}.`;

    const urlWhatsapp = `https://wa.me/${numWhatsApp}?text=${encodeURIComponent(mensaje)}`;
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

  {/* --- CERRAR CON BOTON DE "VOLVER" --- */ }
  useEffect(() => {
    if (!isOpen) return;
    window.history.pushState({ modalOpen: true }, "");
    const handlePopState = (event: PopStateEvent) => {
      if (isOpen) onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget)
          onClose()
      }}
    >

      <form
        className="flex items-center justify-center py-16 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg space-y-4 bg-white relative">

          <button
            onClick={onClose}
            type="button"
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
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />

          {/* --- SELECT --- */}
          <select
            value={medioPago}
            onChange={(e) => setMedioPago(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
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
            type="submit"
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
      </form>
    </div>

  );
};

export default CotizadorModal;
