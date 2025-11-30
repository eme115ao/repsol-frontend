import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { SITE_URL } from "../config/constants";

export default function Equipa() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [codigo, setCodigo] = useState<string>("...");

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet("/api/referral/stats");
        setStats(res);

        const codeRes = await apiGet("/api/referral/my-code");
        setCodigo(codeRes.code || "N/A");
      } catch (err) {
        console.error("Erro Equipa:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function copiarLink() {
    const link = `${SITE_URL}/register?ref=${codigo}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado!");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white bg-gradient-to-br from-purple-600 to-indigo-700">
        Carregando equipa…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-600 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Minha Equipa
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card title="Comissões Hoje" value={stats.hoje} />
          <Card title="Comissões Ontem" value={stats.ontem} />
          <Card title="Total Comissões" value={stats.totalComissoes} />
          <Card title="Total Membros" value={stats.totalMembros} />
          <Card title="Depósitos da Equipa" value={stats.totalDepositos} />
          <Card title="Saques da Equipa" value={stats.totalSaques} />
        </div>

        <div className="bg-gray-50 rounded-xl shadow p-4 mb-6">
          <p className="font-semibold text-gray-700 mb-1">Seu link de convite:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled
              value={`${SITE_URL}/register?ref=${codigo}`}
              className="flex-1 bg-white border border-gray-300 p-2 rounded-lg text-gray-900"
            />
            <button
              onClick={copiarLink}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl shadow p-4">
          <h2 className="font-bold text-gray-900 text-xl">Tamanho da Equipa</h2>
          <ul className="mt-3 space-y-2 text-gray-800">
            <li>Nível 1: {stats.nivel1} pessoas</li>
            <li>Nível 2: {stats.nivel2} pessoas</li>
            <li>Nível 3: {stats.nivel3} pessoas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gray-50 shadow rounded-xl p-4 text-center">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
