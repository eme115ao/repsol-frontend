import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Painel Admin</h1>
      {stats ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white p-4 rounded shadow">
            <p>Usuários</p>
            <h2 className="text-xl font-bold">{stats.usuarios}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Investimentos</p>
            <h2 className="text-xl font-bold">{stats.investimentos}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Saldo Total</p>
            <h2 className="text-xl font-bold">{stats.saldoTotal} Kz</h2>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
