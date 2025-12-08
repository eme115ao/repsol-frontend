import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaMoneyBillWave,
  FaStore,
  FaUserFriends,
} from "react-icons/fa";
import { MdOutlineSavings, MdOutlineRule } from "react-icons/md";

import WhatsAppMenuButton from "../components/WhatsAppMenuButton";

export default function Home() {
  // Caminho correto da imagem
  const logoUrl = new URL("/src/assets/logo.png", import.meta.url).href;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* CABEÇALHO */}
      <header className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 shadow">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center">

          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 overflow-hidden border border-orange-200">
            <img
              src={logoUrl}
              alt="Repsol Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>

          <h1 className="text-2xl font-extrabold">REPSOL S.A</h1>

          {/* REMOVIDO:
             Plataforma de investimentos com rendimentos diários
          */}
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">

        {/* MENU DE ATALHOS */}
        <section>
          <div className="grid grid-cols-5 gap-3 text-center mt-3">

            <Link to="/deposito" className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                <MdOutlineSavings className="text-orange-500" size={24} />
              </div>
              <span className="text-[11px] font-medium text-gray-700">
                Recarregar
              </span>
            </Link>

            <Link to="/levantamento" className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                <FaMoneyBillWave className="text-blue-500" size={22} />
              </div>
              <span className="text-[11px] font-medium text-gray-700">
                Retirar
              </span>
            </Link>

            <Link to="/regras" className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shadow-sm">
                <MdOutlineRule className="text-sky-600" size={22} />
              </div>
              <span className="text-[11px] font-medium text-gray-700">
                Regras
              </span>
            </Link>

            <Link to="/loja" className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shadow-sm">
                <FaStore className="text-amber-600" size={22} />
              </div>
              <span className="text-[11px] font-medium text-gray-700">
                Loja
              </span>
            </Link>

            <Link to="/convidar" className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                <FaUserFriends className="text-indigo-600" size={22} />
              </div>
              <span className="text-[11px] font-medium text-gray-700">
                Convidar
              </span>
            </Link>

          </div>
        </section>

        {/* REMOVIDO:
            - faixa do WhatsApp
            - banner Investindo na Repsol todos os dias
            - frases indesejadas
        */}

      </main>

      {/* BOTÃO ÚNICO DE WHATSAPP COM MENU */}
      <WhatsAppMenuButton />

    </div>
  );
}
