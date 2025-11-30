// src/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimento: number; // percentual (ex.: 3)
  duracaoDias: number;
  imagem: string | null;
}

export default function ProductCard({ p }: { p: Product }) {
  // valor real em Kz/dia a partir do percentual
  const rendimentoReal = Math.round(p.valorMinimo * (p.rendimento / 100));

  return (
    <Link
      to={`/produto/${p.id}`}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex gap-3 hover:shadow-md transition"
    >
      <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-xl overflow-hidden flex items-center justify-center">
        {p.imagem ? (
          <img
            src={`/assets/${p.imagem}`}
            alt={p.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-orange-600 font-bold text-2xl">
            {p.nome[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{p.nome}</h3>

        <p className="text-sm text-gray-600">
          Mínimo:{" "}
          <span className="font-semibold">
            {p.valorMinimo.toLocaleString()} Kz
          </span>
        </p>

        <p className="text-sm text-gray-600">
          Rendimento:{" "}
          <span className="font-semibold text-green-700">
            {rendimentoReal.toLocaleString()} Kz/dia
          </span>
        </p>

        <p className="text-sm text-gray-600">
          Duração: <span className="font-semibold">{p.duracaoDias} dias</span>
        </p>
      </div>
    </Link>
  );
}
