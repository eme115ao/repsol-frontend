// src/pages/Loja.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Loja() {
  const [meus, setMeus] = useState<any[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setErro("");
      const investments = await apiGet("/investments");

      setMeus(Array.isArray(investments) ? investments : []);
    } catch (e: any) {
      console.error("Erro ao carregar loja:", e);
      setErro("Erro ao carregar seus produtos.");
    }
  }

  function resolveImage(img?: string | null) {
    if (!img) return "/assets/placeholder.png";
    return `/assets/${img}`;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-6 max-w-md mx-auto">

      {/* ERRO */}
      {erro && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-xl text-center font-semibold shadow">
          {erro}
        </div>
      )}

      {/* TÍTULO */}
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Meus Produtos
      </h1>

      {/* SEM PRODUTOS */}
      {meus.length === 0 && (
        <p className="text-gray-500 text-center text-sm">
          Você ainda não comprou nenhum produto.
        </p>
      )}

      {/* LISTA DE PRODUTOS */}
      <div className="space-y-5">
        {meus.map((inv) => {
          const p = inv.product || {};
          const img = resolveImage(p.imagem);

          return (
            <div
              key={inv.id}
              className="
                bg-white p-5 rounded-3xl shadow-xl border border-slate-200 
                flex gap-5 items-center 
                hover:shadow-2xl active:scale-[0.98] transition-all
              "
            >
              {/* IMAGEM */}
              <div className="w-20 h-20 rounded-2xl bg-orange-50 overflow-hidden border border-orange-200 flex items-center justify-center shadow-inner">
                <img
                  src={img}
                  alt={p.nome || "Produto"}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* TEXTO */}
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">
                  {p.nome || "Produto indefinido"}
                </p>

                <p className="text-sm text-gray-600">
                  Investido:{" "}
                  <span className="font-semibold">
                    {(inv.investido ?? 0).toLocaleString()} Kz
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  Rend. acumulado:{" "}
                  <span className="font-semibold">
                    {(inv.rendimentoAcumulado ?? 0).toLocaleString()} Kz
                  </span>
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Desde: {new Date(inv.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
