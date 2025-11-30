// src/components/Footer.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-4 pb-6 mt-6">
      <div className="max-w-md mx-auto px-4 text-center text-gray-600 text-sm">
        <p className="font-semibold text-gray-700">
          Repsol S.A.
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Plataforma de investimentos e gestão financeira digital.
        </p>

        <div className="w-full h-px bg-slate-200 my-4"></div>

        <div className="flex items-center justify-center gap-2 text-green-600">
          <FaWhatsapp size={18} />
          <span className="text-xs">Suporte 24h via WhatsApp</span>
        </div>

        <p className="text-[10px] text-gray-400 mt-3">
          © {new Date().getFullYear()} Repsol Angola — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
