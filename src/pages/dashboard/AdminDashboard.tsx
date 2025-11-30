// src/pages/dashboard/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  // Validar admin de forma segura
  useEffect(() => {
    (async () => {
      try {
        // Verifica no backend se o usuário é admin
        const me = await apiGet("/auth/me");

        if (me?.role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
          return;
        }

        // Carrega dados do dashboard admin
        // ROTA CORRETA DEFINIDA PARA ADMIN:
        // GET /admin/dashboard
        const res = await apiGet("/admin/dashboard");
        setData(res);
      } catch (err) {
        console.error("Erro ao carregar dashboard admin:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-center px-6">
        Acesso negado.  
        <br />
        Conta não possui privilégios administrativos.
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow p-4 border border-slate-100">
          <p className="text-gray-600">Usuários cadastrados</p>
          <h2 className="text-xl font-bold text-gray-800">{data.users}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-slate-100">
          <p className="text-gray-600">Investimentos ativos</p>
          <h2 className="text-xl font-bold text-gray-800">{data.investimentos}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-slate-100">
          <p className="text-gray-600">Total Investido</p>
          <h2 className="text-xl font-bold text-gray-800">
            {data.valor_total.toLocaleString()} Kz
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-slate-100">
          <p className="text-gray-600">Rendimentos gerados hoje</p>
          <h2 className="text-xl font-bold text-gray-800">
            {data.rendimentos_hoje.toLocaleString()} Kz
          </h2>
        </div>
      </div>
    </div>
  );
}
