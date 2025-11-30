// src/components/WhatsAppFloating.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/244975658117"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      className="fixed bottom-24 right-4 bg-green-600 text-white p-4 rounded-full shadow-xl z-50 hover:bg-green-700 transition"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
