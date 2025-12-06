import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FiBox, FiCreditCard, FiBarChart2, FiUsers } from "react-icons/fi";

/* TIPOS */
interface Investimento {
  id: number;
  investido: number;
  rendimentoAcumulado: number;
  createdAt: string;
  product: {
    id: number;
    nome: string;
    imagem: string | null;
    valorMinimo: number;
    rendimentoDia: number;
    duracaoDias: number;
  };
}

interface DashboardData {
  saldoDisponivel: number;
  totalInvestido: number;
  rendimentoHoje: number;
  rendimentoTotal: number;
  investimentos: Investimento[];
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
    investimentos: [],
  });

  // CORREÇÃO DEFINITIVA PARA NETLIFY — LOGO NA PASTA PUBLIC
  const logoUrl = "/logo.png";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

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
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">
      
      {/* TÍTULO */}
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Minha Conta
      </h1>

      {/* PERFIL */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 mb-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-5">

          {/* AVATAR / LOGO */}
          <div className="w-20 h-20 rounded-full bg-white border border-slate-300 shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={logoUrl}
              alt="Repsol Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-gray-900">{phone}</h2>
            <p className="text-sm text-gray-500">ID: {userId}</p>
            <p className="text-sm text-gray-600">
              Código convite:{" "}
              <strong className="text-orange-600">{inviteCode}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* SALDOS PRINCIPAIS */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300">
        <h2 className="text-sm font-semibold text-gray-600">Saldo Disponível</h2>
        <p className="text-4xl font-extrabold text-orange-600 mt-1 mb-4">
          {data.saldoDisponivel.toLocaleString()} Kz
        </p>

        <div className="grid grid-cols-2 gap-4 text-center">

          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm">
            <p className="text-sm text-gray-600">Total Investido</p>
            <p className="text-xl font-extrabold text-gray-900">
              {data.totalInvestido.toLocaleString()} Kz
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
            <p className="text-sm text-gray-600">Renda Hoje</p>
            <p className="text-xl font-extrabold text-gray-900">
              {data.rendimentoHoje.toLocaleString()} Kz
            </p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm text-center mt-4">
          <p className="text-sm text-gray-600">Rendimento Total</p>
          <p className="text-xl font-extrabold text-gray-900">
            {data.rendimentoTotal.toLocaleString()} Kz
          </p>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link
          to="/deposito"
          className="bg-orange-600 text-white py-3 rounded-2xl text-lg font-semibold shadow hover:scale-105 hover:bg-orange-700 transition"
        >
          Recarregar
        </Link>

        <Link
          to="/levantamento"
          className="bg-blue-600 text-white py-3 rounded-2xl text-lg font-semibold shadow hover:scale-105 hover:bg-blue-700 transition"
        >
          Retirar
        </Link>
      </div>

      {/* BANNER DE CONVITE */}
      <Link
        to="/convidar"
        className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-3xl shadow-xl mt-6 hover:shadow-2xl hover:scale-[1.02] transition-all"
      >
        <p className="text-sm font-semibold">Convide amigos e ganhe comissões</p>
        <p className="text-xs opacity-90 mt-1">
          Seu link exclusivo está disponível na página Convidar.
        </p>
      </Link>

      {/* MEUS PRODUTOS */}
      <h2 className="text-xl font-extrabold text-gray-900 mt-8 mb-3">Meus Produtos</h2>

      {data.investimentos.length === 0 ? (
        <p className="text-gray-600 text-sm">Você ainda não possui produtos.</p>
      ) : (
        <div className="space-y-4">
          {data.investimentos.map((inv) => (
            <div
              key={inv.id}
              className="bg-white p-4 rounded-3xl shadow-md border border-slate-200 hover:shadow-xl transition-all flex gap-4 items-center"
            >
              <div className="w-20 h-20 rounded-xl bg-orange-50 border border-orange-200 overflow-hidden">
                {inv.product.imagem ? (
                  <img
                    src={`/assets/${inv.product.imagem}`}
                    alt={inv.product.nome}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-orange-600 font-bold">
                    {inv.product.nome[0]}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">{inv.product.nome}</p>

                <p className="text-sm text-gray-600">
                  Investido: {inv.investido.toLocaleString()} Kz
                </p>

                <p className="text-sm text-gray-600">
                  Rend. acumulado: {inv.rendimentoAcumulado.toLocaleString()} Kz
                </p>

                <p className="text-xs text-gray-500">
                  Desde: {new Date(inv.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MENU EXTRA */}
      <div className="space-y-3 mt-6">
        <MenuItem
          title="Loja (Meus Produtos)"
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
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        className="mt-6 w-full bg-red-500 text-white py-3 rounded-2xl font-semibold shadow hover:bg-red-600 hover:scale-105 transition"
      >
        Sair
      </button>

      <div className="h-10" />
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
      className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow border border-slate-200 hover:bg-slate-100 hover:shadow-xl transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
      </div>
    </Link>
  );
}
