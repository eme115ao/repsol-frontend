// src/pages/Minha.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBox,
  FiCreditCard,
  FiBarChart2,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";

/* TIPOS */
interface DashboardData {
  saldoDisponivel: number;
  totalInvestido: number;
  rendimentoHoje: number;
  rendimentoTotal: number;
}

export default function Minha() {
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId"));
  const phone = localStorage.getItem("phone");
  const inviteCode = localStorage.getItem("inviteCode");

  const [data, setData] = useState<DashboardData>({
    saldoDisponivel: 0,
    totalInvestido: 0,
    rendimentoHoje: 0,
    rendimentoTotal: 0,
  });

  // LOGO REDONDO PERFEITO (CORTA AS BORDAS BRANCAS AUTOMATICAMENTE)
  const logoUrl = "/logo.png";

  useEffect(() => {
    async function load() {
      try {
        const res = await apiGet<DashboardData>("/dashboard");
        setData(res);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 pb-28 px-4 pt-4 max-w-md mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

        {/* LOGO 100% CIRCULAR, SEM SOBRAS BRANCAS */}
        <div className="w-20 h-20 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center overflow-hidden">
          <img
            src={logoUrl}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-xl font-bold text-gray-900">{phone}</p>
          <p className="text-sm text-gray-500">ID: {userId}</p>
          <p className="text-sm text-gray-600">
            Código convite:{" "}
            <span className="text-orange-600 font-bold">{inviteCode}</span>
          </p>
        </div>
      </div>

      {/* SALDO */}
      <div className="rounded-3xl p-6 bg-white shadow-xl border border-slate-200 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <p className="text-sm font-semibold text-gray-600">
          Saldo Disponível
        </p>
        <p className="text-5xl font-extrabold text-orange-600 tracking-tight mt-1 mb-5 drop-shadow-sm">
          {data.saldoDisponivel.toLocaleString()} Kz
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-sm rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-600">Total Investido</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {data.totalInvestido.toLocaleString()} Kz
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-sm rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-600">Renda Hoje</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {data.rendimentoHoje.toLocaleString()} Kz
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm text-center p-4 mt-4">
          <p className="text-xs text-gray-600">Rendimento Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {data.rendimentoTotal.toLocaleString()} Kz
          </p>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Link
          to="/deposito"
          className="py-4 rounded-2xl text-center bg-orange-600 text-white font-bold text-lg shadow hover:bg-orange-700 hover:scale-[1.02] transition"
        >
          Recarregar
        </Link>

        <Link
          to="/levantamento"
          className="py-4 rounded-2xl text-center bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 hover:scale-[1.02] transition"
        >
          Retirar
        </Link>
      </div>

      {/* BANNER GANHAR COMISSÃO */}
      <Link
        to="/convidar"
        className="mt-6 block bg-gradient-to-r from-orange-500 to-orange-600 p-5 rounded-3xl shadow-xl hover:scale-[1.02] hover:shadow-2xl transition"
      >
        <p className="text-sm font-bold text-white">Ganhar Comissão</p>
      </Link>

      {/* MENU */}
      <div className="mt-8 space-y-3">
        <MenuItem
          title="Loja"
          link="/loja"
          icon={<FiBox size={24} className="text-orange-600" />}
        />

        <MenuItem
          title="Meu Banco"
          link="/meubanco"
          icon={<FiCreditCard size={24} className="text-blue-600" />}
        />

        <MenuItem
          title="Histórico"
          link="/historico"
          icon={<FiBarChart2 size={24} className="text-green-600" />}
        />

        <MenuItem
          title="Convidar Amigos"
          link="/convidar"
          icon={<FiUsers size={24} className="text-purple-600" />}
        />
      </div>

      {/* SAIR */}
      <button
        className="mt-8 w-full py-3 bg-red-600 text-white font-bold text-lg rounded-2xl shadow hover:bg-red-700 hover:scale-[1.02] transition"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Sair
      </button>
    </div>
  );
}

function MenuItem({
  title,
  link,
  icon,
}: {
  title: string;
  link: string;
  icon: JSX.Element;
}) {
  return (
    <Link
      to={link}
      className="flex items-center justify-between bg-white rounded-2xl shadow border border-slate-200 p-4 hover:bg-slate-100 hover:shadow-xl transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
          {icon}
        </div>

        <p className="text-sm font-semibold text-gray-900">{title}</p>
      </div>

      <FiChevronRight size={20} className="text-slate-400" />
    </Link>
  );
}
