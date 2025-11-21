// src/pages/dashboard/AdminTransacoes.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../services/api";

export default function AdminTransacoes() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet("/api/admin/transactions/pending");
        setList(res || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  async function aprovar(id: number) {
    try {
      await apiPost(`/api/admin/transactions/${id}/approve`, {});
      setList((s) => s.filter((x) => x.id !== id));
    } catch (e) {
      alert("Erro ao aprovar");
    }
  }

  async function recusar(id: number) {
    try {
      await apiPost(`/api/admin/transactions/${id}/reject`, {});
      setList((s) => s.filter((x) => x.id !== id));
    } catch (e) {
      alert("Erro ao recusar");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transações Pendentes</h1>

      {list.length === 0 && <div className="text-gray-500">Nenhuma transação pendente.</div>}

      <div className="space-y-3">
        {list.map((t) => (
          <div key={t.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">#{t.id} — {t.type}</div>
              <div className="text-sm text-gray-500">{t.userPhone} — {Number(t.amount).toLocaleString()} KZ</div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => aprovar(t.id)} className="bg-green-600 text-white px-3 py-1 rounded">Aprovar</button>
              <button onClick={() => recusar(t.id)} className="bg-gray-300 px-3 py-1 rounded">Recusar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
