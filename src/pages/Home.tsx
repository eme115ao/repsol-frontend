// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet("/api/products");
        setProducts(res);
      } catch (e) {
        console.log("Erro ao carregar produtos", e);
      }
    })();
  }, []);

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">Repsol Invest</h1>

      {/* Destaques */}
      <div className="bg-orange-600 text-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold">Ganhe rendimento diário</h2>
        <p className="text-sm opacity-90">Segurança • Rentabilidade • Automático</p>
      </div>

      {/* Produtos em destaque */}
      <h2 className="text-lg font-semibold mb-3">Produtos disponíveis</h2>

      <div className="space-y-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/produto/${p.id}`}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-100 transition"
          >
            <div>
              <div className="font-semibold text-gray-800">{p.nome}</div>
              <div className="text-sm text-gray-500">
                Mínimo: {p.valorMinimo.toLocaleString()} KZ
              </div>
            </div>

            <img
              src={`/assets/${p.imagem}`}
              className="w-16 h-16 rounded object-cover"
            />
          </Link>
        ))}
      </div>

    </div>
  );
}
