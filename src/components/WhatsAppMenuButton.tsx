// src/components/WhatsAppMenuButton.tsx
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppMenuButton() {
  const [open, setOpen] = useState(false);

  const gerente = "https://wa.me/244958360860";
  const grupo =
    "https://chat.whatsapp.com/JY7Usksv1GYEzanJfXj2X2?mode=hqrt3";

  return (
    <div className="fixed bottom-20 right-6 z-50">

      {/* BOTÃO PRINCIPAL */}
      <div className="relative">
        {/* BADGE ONLINE */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>

        <button
          onClick={() => setOpen(!open)}
          className="bg-green-600 text-white p-4 rounded-full shadow-2xl 
                     hover:bg-green-700 transition-transform duration-200 
                     hover:scale-110 active:scale-95"
        >
          <FaWhatsapp size={28} />
        </button>
      </div>

      {/* MENU DE OPÇÕES */}
      {open && (
        <div
          className="absolute bottom-16 right-0 bg-white shadow-2xl rounded-xl 
                     p-4 w-56 space-y-4 border animate-scale-in"
          style={{ transformOrigin: "bottom right" }}
        >
          <a
            href={gerente}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 
                       font-semibold transition"
          >
            <FaWhatsapp /> Falar com gerente
          </a>

          <a
            href={grupo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 
                       font-semibold transition"
          >
            <FaWhatsapp /> Grupo oficial
          </a>
        </div>
      )}
    </div>
  );
}
