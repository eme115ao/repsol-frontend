// src/pages/Investimentos.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import { Link } from "react-router-dom";

type Invest = {
  id: number;
  productId: number;
  investido: number;
  rendimentoAcumulado: number;
  createdAt: string;
  product?: { id: number; nome: string; imagem?: string; rendimento?: number };
};

export default function Investimentos() {
  const [items, setItems] = useState<Invest[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet(`/api/dashboard/${userId}`);
        const produtos = res.produtos ?? res.products ?? [];
        setItems(produtos);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meus Investimentos</h1>

      {items.length === 0 ? (
        <div className="text-gray-500">Nenhum investimento ativo.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it) => (
            <div key={it.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
              <img src={`/assets/${it.product?.imagem ?? "placeholder.png"}`} className="w-20 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{it.product?.nome ?? `Produto ${it.productId}`}</div>
                <div className="text-sm text-gray-500">Investido: {Number(it.investido).toLocaleString()} KZ</div>
                <div className="text-sm text-gray-500">Criado: {new Date(it.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Rendimento</div>
                <div className="font-semibold text-orange-600">{Number(it.rendimentoAcumulado).toLocaleString()} KZ</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
