// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import WhatsAppButtons from "../components/WhatsAppButtons";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setData(res.data);
      } catch (err: any) {
        setError("Erro ao carregar informações do dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-orange-500 text-xl font-semibold">Carregando informações...</div>;
  if (error) return <div className="flex items-center justify-center h-64 text-red-500 text-xl font-semibold">{error}</div>;

  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">
        Bem-vindo(a) à Plataforma Repsol
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <p className="text-lg font-semibold text-gray-800">
          Total investido:{" "}
          <span className="text-green-600">Kz {data?.totalInvestido ?? 0}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800 mt-2">
          Rendimento diário:{" "}
          <span className="text-green-600">Kz {data?.rendimentoDiario ?? 0}</span>
        </p>
      </div>

      {/* Exibir investimentos (se houver) */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Investimentos</h2>
        {data?.investimentos?.length ? (
          data.investimentos.map((inv: any) => (
            <div key={inv.id} className="bg-white p-4 rounded shadow mb-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{inv.productNome}</div>
                  <div className="text-sm text-gray-500">Rendimento acumulado: Kz {inv.rendimentoAcumulado}</div>
                  <div className="text-sm text-gray-400 mt-1">Início: {inv.inicio}</div>
                </div>
                <div className="text-right font-bold">Kz {inv.investido}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Sem investimentos no momento.</div>
        )}
      </div>

      <WhatsAppButtons />
    </div>
  );
}
