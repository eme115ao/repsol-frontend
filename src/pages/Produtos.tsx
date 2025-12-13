// src/pages/Produtos.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

interface ProductRaw {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimento?: number;
  rendimentoDia?: number;
  duracaoDias: number;
  imagem: string | null;
  bloqueado?: boolean;
}

export default function Produtos() {
  const [products, setProducts] = useState<ProductRaw[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<any>("/products");

        const list: ProductRaw[] = Array.isArray(res)
          ? res
          : Array.isArray(res.products)
          ? res.products
          : [];

        const normalized = list.map((p) => ({
          ...p,
          valorMinimo: Number(p.valorMinimo || 0),
          rendimentoDia:
            p.rendimentoDia !== undefined
              ? Number(p.rendimentoDia)
              : undefined,
          rendimento:
            p.rendimento !== undefined ? Number(p.rendimento) : undefined,
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    })();
  }, []);

  function resolveImage(img?: string | null) {
    if (!img) return "/assets/placeholder.png";
    return `/assets/${img}`;
  }

  function getRendimentoDiario(p: ProductRaw): number {
    if (typeof p.rendimentoDia === "number") return p.rendimentoDia;

    if (typeof p.rendimento === "number") {
      if (p.rendimento > 100) return Math.round(p.rendimento);
      return Math.round(p.valorMinimo * (p.rendimento / 100));
    }

    return 0;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-6">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 tracking-tight">
        Produtos
      </h1>

      <div className="max-w-md mx-auto space-y-6 px-4">
        {products.map((p) => {
          const rendimentoDiario = getRendimentoDiario(p);
          const isBlocked = p.bloqueado === true;

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md border border-slate-200
                         p-4 flex items-center gap-4 relative"
            >
              {/* OVERLAY BLOQUEADO */}
              {isBlocked && (
                <div className="absolute inset-0 bg-black/50 rounded-2xl
                                flex items-center justify-center z-10">
                  <span className="text-white font-bold text-lg">
                    Indisponível
                  </span>
                </div>
              )}

              {/* IMAGEM */}
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={resolveImage(p.imagem)}
                  alt={p.nome}
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>

              {/* TEXTO */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <p className="text-xl font-bold text-gray-900">{p.nome}</p>

                  <p className="text-sm text-gray-700 mt-1">
                    Preço mínimo:{" "}
                    <span className="font-bold text-gray-900">
                      {p.valorMinimo.toLocaleString()} Kz
                    </span>
                  </p>

                  <p className="text-sm text-gray-700">
                    Renda diária:{" "}
                    <span className="font-bold text-green-700">
                      {rendimentoDiario.toLocaleString()} Kz
                    </span>
                  </p>

                  <p className="text-sm text-gray-700">
                    Duração:{" "}
                    <span className="font-bold text-gray-900">
                      {p.duracaoDias} dias
                    </span>
                  </p>
                </div>

                {/* BOTÃO */}
                {isBlocked ? (
                  <div className="mt-3 bg-gray-400 text-white text-center py-1.5
                                  rounded-lg font-semibold cursor-not-allowed">
                    Indisponível
                  </div>
                ) : (
                  <Link
                    to={`/produto/${p.id}`}
                    className="mt-3 bg-orange-600 text-white text-center
                               py-1.5 rounded-lg font-semibold
                               active:scale-95 transition"
                  >
                    Comprar
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            Nenhum produto disponível
          </p>
        )}
      </div>
    </div>
  );
}
