// src/pages/dashboard/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet("/api/admin/stats");
        setStats(res);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!stats) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin — Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Usuários</div>
          <div className="text-2xl font-semibold">{stats.users}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Investido</div>
          <div className="text-2xl font-semibold">{Number(stats.totalInvested).toLocaleString()} KZ</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Transações pendentes</div>
          <div className="text-2xl font-semibold">{stats.pendingTransactions}</div>
        </div>
      </div>
    </div>
  );
}
