// src/pages/Historico.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Historico() {
  const userId = Number(localStorage.getItem("userId"));
  const [lista, setLista] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const r = await apiGet(`/api/historico/${userId}`);
      setLista(r || []);
    })();
  }, [userId]);

  const grupos = lista.reduce((acc: any, item: any) => {
    const d = item.data.split("T")[0];
    if (!acc[d]) acc[d] = [];
    acc[d].push(item);
    return acc;
  }, {});

  const dias = Object.keys(grupos);

  return (
    <div className="p-4">

      <h1 className="text-xl font-bold mb-4">Histórico</h1>

      {dias.length === 0 && (
        <div className="text-gray-500">Nenhum movimento encontrado.</div>
      )}

      {dias.map((dia) => (
        <div key={dia} className="mb-6">
          <h2 className="font-bold mb-2">{dia}</h2>

          <div className="space-y-2">
            {grupos[dia].map((item: any) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded shadow flex justify-between"
              >
                <div>{item.tipo}</div>
                <div className="font-bold">{item.valor} KZ</div>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
