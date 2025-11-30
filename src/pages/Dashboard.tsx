// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

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
    rendimento: number;
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

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet("/api/dashboard");
        setData(res);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <div className="bg-white p-6 rounded-2xl shadow border border-slate-200 mb-4">
        <h2 className="text-sm font-semibold text-gray-600">Saldo Disponível</h2>
        <p className="text-3xl font-bold text-orange-600 mt-1">
          {data.saldoDisponivel.toLocaleString()} Kz
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
            <p className="text-xs text-gray-600">Total Investido</p>
            <p className="font-bold text-gray-900">
              {data.totalInvestido.toLocaleString()} Kz
            </p>
          </div>

          <div className="p-3 rounded-xl bg-green-50 border border-green-100">
            <p className="text-xs text-gray-600">Renda Hoje</p>
            <p className="font-bold text-gray-900">
              {data.rendimentoHoje.toLocaleString()} Kz
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 mt-3 text-center">
          <p className="text-xs text-gray-600">Rendimento Total</p>
          <p className="font-bold text-gray-900">
            {data.rendimentoTotal.toLocaleString()} Kz
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link
          to="/deposito"
          className="bg-orange-500 text-white py-3 rounded-xl font-semibold shadow text-center"
        >
          Recarregar
        </Link>

        <Link
          to="/levantamento"
          className="bg-blue-600 text-white py-3 rounded-xl font-semibold shadow text-center"
        >
          Retirar
        </Link>
      </div>

      <Link
        to="/convidar"
        className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-2xl shadow mb-6"
      >
        <p className="text-sm font-semibold">Convide amigos e ganhe comissões</p>
        <p className="text-xs opacity-80 mt-1">
          Seu link exclusivo está disponível na página Convidar.
        </p>
      </Link>

      <h2 className="text-lg font-bold text-gray-800 mb-2">Meus Produtos</h2>

      {data.investimentos.length === 0 ? (
        <p className="text-sm text-gray-600">
          Você ainda não comprou nenhum produto.
        </p>
      ) : (
        <div className="space-y-4">
          {data.investimentos.map((inv) => (
            <div
              key={inv.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow flex gap-4 items-center"
            >
              <div className="w-16 h-16 rounded-xl bg-orange-100 overflow-hidden border border-orange-200">
                {inv.product.imagem ? (
                  <img
                    src={`/assets/${inv.product.imagem}`}
                    alt={inv.product.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-orange-600 font-bold">
                    {inv.product.nome[0]}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="font-bold text-gray-800">{inv.product.nome}</p>

                <p className="text-xs text-gray-600">
                  Investido: {inv.investido.toLocaleString()} Kz
                </p>

                <p className="text-xs text-gray-600">
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

      <div className="h-10" />
    </div>
  );
}
