// src/pages/Loja.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

interface ProdutoInvestido {
  id: number;
  nome: string;
  imagem: string | null;
  rendimento?: number;
  valorMinimo?: number;
  rendimentoDiario?: number;
}

interface Investimento {
  id: number;
  product: ProdutoInvestido;
  amount?: number;
  investido?: number;
  createdAt: string;
}

export default function Loja() {
  const [lista, setLista] = useState<Investimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<any>("/api/investment");

        const lista: Investimento[] = Array.isArray(res)
          ? res
          : Array.isArray(res?.investments)
          ? res.investments
          : [];

        setLista(lista);
      } catch (err) {
        console.error("Erro ao carregar produtos comprados:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function resolveImage(img?: string | null) {
    if (!img) return "/assets/placeholder.png";
    if (!img.startsWith("/assets/")) {
      return `/assets/${img}`;
    }
    return img;
  }

  function formatKz(v: number | undefined | null) {
    if (!v) return "0 Kz";
    return `${v.toLocaleString()} Kz`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando…
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-md mx-auto min-h-screen bg-slate-50 pb-24">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Minha Loja</h1>

      {lista.length === 0 && (
        <p className="text-center text-gray-600">
          Você ainda não comprou nenhum produto.
        </p>
      )}

      <div className="space-y-4">
        {lista.map((item) => {
          const produto = item.product || ({} as ProdutoInvestido);
          const investido = item.amount ?? item.investido ?? 0;

          const base = investido || produto.valorMinimo || 0;
          const rendimentoDia =
            produto.rendimentoDiario ??
            (produto.rendimento
              ? Math.round(base * (produto.rendimento / 100))
              : 0);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center border border-slate-200"
            >
              <div className="w-16 h-16 rounded-xl bg-orange-50 border border-orange-200 overflow-hidden flex items-center justify-center">
                <img
                  src={resolveImage(produto.imagem)}
                  alt={produto.nome}
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">
                  {produto.nome}
                </p>

                <p className="text-sm text-gray-600">
                  Investido:{" "}
                  <span className="font-semibold">{formatKz(investido)}</span>
                </p>

                <p className="text-sm text-gray-600">
                  Desde:{" "}
                  <span className="font-semibold">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p className="text-sm text-blue-600 font-semibold">
                  Rende {formatKz(rendimentoDia)} / dia
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
