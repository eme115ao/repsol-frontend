// src/pages/dashboard/AdminTransacoes.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../services/api";

interface Transacao {
  id: number;
  userId: number;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

export default function AdminTransacoes() {
  const [lista, setLista] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const me = await apiGet("/auth/me");

        if (me?.role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
          setLoading(false);
          return;
        }

        const res = await apiGet("/admin/transactions");
        setLista(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function atualizar(id: number, status: string) {
    try {
      // Backend funciona com POST
      await apiPost("/admin/transactions/update", { id, status });

      setLista((old) =>
        old.map((t) => (t.id === id ? { ...t, status } : t))
      );
    } catch (err: any) {
      alert("Erro ao atualizar: " + err.message);
    }
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Sem permissão de administrador.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transações</h1>

      <div className="space-y-4">
        {lista.map((t) => (
          <div key={t.id} className="bg-white border border-slate-200 shadow p-4 rounded-xl">
            <p className="text-gray-700 font-semibold">
              ID: {t.id} — {t.type === "deposit" ? "Depósito" : "Levantamento"}
            </p>

            <p className="text-sm text-gray-600">
              Valor: <strong>{t.amount.toLocaleString()} Kz</strong>
            </p>

            <p className="text-sm text-gray-600">Usuário: {t.userId}</p>

            <p className="text-sm text-gray-600">
              Data: {new Date(t.createdAt).toLocaleString()}
            </p>

            <p className="text-sm text-gray-700 mt-1">
              Estado:{" "}
              <span
                className={
                  t.status === "pending"
                    ? "text-yellow-600"
                    : t.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {t.status}
              </span>
            </p>

            {t.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => atualizar(t.id, "approved")}
                  className="flex-1 bg-green-600 text-white py-2 rounded-xl shadow"
                >
                  Aprovar
                </button>

                <button
                  onClick={() => atualizar(t.id, "rejected")}
                  className="flex-1 bg-red-600 text-white py-2 rounded-xl shadow"
                >
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
