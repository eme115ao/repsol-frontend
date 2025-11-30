// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaMoneyBillWave,
  FaStore,
  FaUserFriends,
} from "react-icons/fa";
import { MdOutlineSavings, MdOutlineRule } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      <header className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 shadow">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <span className="text-2xl font-extrabold tracking-wide">R</span>
          </div>
          <h1 className="text-2xl font-extrabold">REPSOL S.A</h1>
          <p className="text-xs mt-1 text-orange-100">
            Plataforma de investimentos com rendimentos diários
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">

        {/* FAIXA WHATSAPP */}
        <section className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white">
            <FaWhatsapp size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">
              Convide seus amigos para ganhar comissões
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              Link exclusivo disponível na página “Convidar”.
            </p>
          </div>
          <Link
            to="/convidar"
            className="text-xs font-semibold text-green-700 flex items-center gap-1"
          >
            Ver <FiChevronRight size={14} />
          </Link>
        </section>

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

        {/* BANNER PRINCIPAL */}
        <section>
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 shadow-md flex items-center gap-4">
            <div className="flex-1">
              <p className="uppercase text-[11px] tracking-widest text-orange-100 font-semibold">
                Ganhe renda extra
              </p>
              <h2 className="text-xl font-extrabold leading-snug mt-1">
                Investindo na Repsol todos os dias
              </h2>
              <p className="text-xs text-orange-50 mt-2">
                Escolha um plano na aba <strong>Produtos</strong> e acompanhe seus rendimentos automaticamente.
              </p>

              <Link
                to="/produtos"
                className="inline-flex mt-3 items-center justify-center px-4 py-2 rounded-full bg-white text-orange-600 text-xs font-semibold shadow-sm"
              >
                Ver produtos
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
