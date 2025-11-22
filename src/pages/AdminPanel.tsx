// src/pages/AdminPanel.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function AdminPanel() {
  const [stats, setStats] = useState<any>(null);
  const [transacoes, setTransacoes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const s = await apiGet("/api/admin/stats");
        const t = await apiGet("/api/admin/transacoes");
        setStats(s || {});
        setTransacoes(t || []);
      } catch (err) {
        console.error("Admin:", err);
      }
    })();
  }, []);

  if (!stats) return <div className="p-6">Carregando painel...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <div className="text-gray-500 text-sm">Usuários</div>
          <div className="text-xl font-bold">{stats.totalUsers}</div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <div className="text-gray-500 text-sm">Investimentos</div>
          <div className="text-xl font-bold">{stats.totalInvestments}</div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <div className="text-gray-500 text-sm">Depósitos</div>
          <div className="text-xl font-bold">{stats.totalDeposits}</div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <div className="text-gray-500 text-sm">Levantamentos</div>
          <div className="text-xl font-bold">{stats.totalWithdraws}</div>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-3">Transações Recentes</h2>

      <div className="space-y-3">
        {transacoes.map(t => (
          <div key={t.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{t.tipo}</div>
              <div className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
            </div>
            <div className="font-semibold">{Number(t.valor).toLocaleString()} KZ</div>
          </div>
        ))}
      </div>
    </div>
  );
}
