// src/components/WhatsAppButtons.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButtons() {
  return (
    <div className="space-y-3">

      {/* Falar com o gerente */}
      <a
        href="https://wa.me/244975658117"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com o gerente via WhatsApp"
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow font-semibold hover:bg-green-700 transition"
      >
        <FaWhatsapp size={20} />
        Falar com o gerente
      </a>

      {/* Grupo oficial */}
      <a
        href="https://chat.whatsapp.com/Dg1G3Kdinhq7zvE1MZSKcx"
        target="_blank"
        rel="noreferrer"
        aria-label="Aderir ao grupo oficial do WhatsApp"
        className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl shadow font-semibold hover:bg-green-600 transition"
      >
        <FaWhatsapp size={20} />
        Aderir ao grupo
      </a>

    </div>
  );
}
