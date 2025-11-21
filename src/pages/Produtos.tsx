// src/pages/Produtos.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiGet("/api/products");
      setProdutos(res);
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Todos os Produtos</h1>

      <div className="grid grid-cols-1 gap-4">
        {produtos.map((p) => (
          <Link
            key={p.id}
            to={`/produto/${p.id}`}
            className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:bg-gray-100 transition"
          >
            <img
              src={`/assets/${p.imagem}`}
              className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1">
              <div className="font-semibold">{p.nome}</div>
              <div className="text-sm text-gray-500">
                Mínimo: {p.valorMinimo.toLocaleString()} KZ
              </div>
              <div className="text-sm text-gray-500">
                Rendimento: {p.rendimento * 100}% / dia
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
