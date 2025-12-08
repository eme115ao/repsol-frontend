// src/components/WhatsAppMenuButton.tsx
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppMenuButton() {
  const [open, setOpen] = useState(false);

  const gerente = "https://wa.me/244958360860";
  const grupo =
    "https://chat.whatsapp.com/JY7Usksv1GYEzanJfXj2X2?mode=hqrt3";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* BOTÃO PRINCIPAL */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition"
      >
        <FaWhatsapp size={28} />
      </button>

      {/* MENU DE OPÇÕES */}
      {open && (
        <div className="absolute bottom-16 right-0 bg-white shadow-xl rounded-lg p-3 w-48 space-y-3 border">
          <a
            href={gerente}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold"
          >
            <FaWhatsapp /> Falar com gerente
          </a>

          <a
            href={grupo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold"
          >
            <FaWhatsapp /> Grupo oficial
          </a>
        </div>
      )}
    </div>
  );
}
