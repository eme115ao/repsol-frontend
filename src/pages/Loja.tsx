// src/pages/Loja.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../api";
import { useNavigate } from "react-router-dom";

export default function Loja() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet("/api/products");
        setItems(res || []);
      } catch (err) {
        console.error("Erro Loja:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Carregando loja...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loja</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex flex-col">
            <img src={`/assets/${p.imagem ?? "placeholder.png"}`} alt={p.nome} className="w-full h-36 object-cover rounded mb-3"/>
            <div className="flex-1">
              <div className="font-semibold">{p.nome}</div>
              <div className="text-sm text-gray-500">Min: {Number(p.valorMinimo).toLocaleString()} KZ</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => nav(`/produto/${p.id}`)} className="flex-1 bg-orange-600 text-white py-2 rounded">Detalhes / Investir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
