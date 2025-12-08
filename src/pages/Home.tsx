// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaMoneyBillWave,
  FaStore,
  FaUserFriends,
  FaHistory
} from "react-icons/fa";
import { MdOutlineSavings, MdOutlineRule } from "react-icons/md";

export default function Home() {
  const bannerUrl = new URL("/src/assets/banner2.png", import.meta.url).href;

  return (
    <div className="min-h-screen bg-slate-50 pb-28">

      {/* CABEÇALHO */}
      <header className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 shadow">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold tracking-wide drop-shadow">
            REPSOL S.A
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-5 space-y-8">

        {/* FAIXA INVITE */}
        <section className="bg-green-50 border border-green-200 rounded-3xl px-4 py-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
            <FaWhatsapp size={22} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              Convide seus amigos para ganhar comissões
            </p>
          </div>

          <Link
            to="/convidar"
            className="text-xs font-bold text-green-700 hover:underline"
          >
            Ver
          </Link>
        </section>

        {/* MENU — Agora são 6 itens, preenchendo o espaço corretamente */}
        <section>
          <div className="grid grid-cols-3 gap-5 text-center">

            <Link to="/deposito" className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center shadow">
                <MdOutlineSavings className="text-orange-600" size={30} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Recarregar
              </span>
            </Link>

            <Link to="/levantamento" className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center shadow">
                <FaMoneyBillWave className="text-blue-600" size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Retirar
              </span>
            </Link>

            <Link to="/regras" className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center shadow">
                <MdOutlineRule className="text-sky-600" size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Regras
              </span>
            </Link>

            <Link to="/loja" className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center shadow">
                <FaStore className="text-amber-600" size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Minha Loja
              </span>
            </Link>

            <Link to="/convidar" className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center shadow">
                <FaUserFriends className="text-indigo-600" size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Convidar
              </span>
            </Link>

            {/* NOVO BOTÃO — HISTÓRICO */}
            <Link to="/historico" className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shadow">
                <FaHistory className="text-gray-700" size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Histórico
              </span>
            </Link>

          </div>
        </section>

        {/* BANNER */}
        <section>
          <img
            src={bannerUrl}
            alt="Banner Repsol"
            className="rounded-3xl w-full shadow-lg border border-slate-200"
          />
        </section>

      </main>
    </div>
  );
}
