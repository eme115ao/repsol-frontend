import { useEffect, useState } from "react";
import api from "../services/api";
import WhatsAppFloating from "../components/WhatsAppFloating";

export default function Historico() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        // endpoint /transactions?userId=...
        const res = await api.get(`/transactions?userId=${user.id}`);
        // se a API devolver { ok: true, data: [...] }
        setTransactions(res.data?.data ?? res.data ?? []);
      } catch (e) {
        setError("Erro ao buscar histórico.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.id]);

  if (loading) return <div className="p-4">Carregando histórico...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (!transactions.length)
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Histórico</h1>
        <div className="bg-white p-4 rounded-xl shadow">Nenhuma transação encontrada.</div>
        <WhatsAppFloating />
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Histórico</h1>

      <div className="flex flex-col gap-3">
        {transactions.map((t) => (
          <div key={t.id} className="bg-white p-3 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {t.type || t.tipo || "Transação"} — Kz {t.amount ?? t.valor ?? 0}
              </p>
              <p className="text-sm text-gray-600">{new Date(t.createdAt || t.date || t.created_at).toLocaleString()}</p>
            </div>

            <div className="text-right">
              <p className={`font-semibold ${t.status === "approved" ? "text-green-600" : (t.status === "rejected" ? "text-red-600" : "text-yellow-600")}`}>
                {t.status ?? t.estado ?? "pending"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <WhatsAppFloating />
    </div>
  );
}
