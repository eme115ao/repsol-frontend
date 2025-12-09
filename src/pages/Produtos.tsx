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
            p.rendimentoDia !== undefined ? Number(p.rendimentoDia) : undefined,
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
    <div className="min-h-screen bg-slate-50 pb-24 pt-6 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        Produtos
      </h1>

      <div className="max-w-md mx-auto space-y-10">
        {products.map((p) => {
          const rendimentoDiario = getRendimentoDiario(p);

          return (
            <div
              key={p.id}
              className="
                card p-6 flex gap-6
                hover:scale-[1.01] hover:shadow-2xl
                transition-all duration-300 ease-out
              "
            >
              {/* IMAGEM REALISTA GRANDE */}
              <div className="w-32 h-32 rounded-xl overflow-hidden">
                <img
                  src={resolveImage(p.imagem)}
                  alt={p.nome}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* COLUNA DE TEXTO */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {p.nome}
                  </p>

                  <p className="text-base text-gray-700 mt-3">
                    Preço mínimo:{" "}
                    <span className="font-bold text-gray-900">
                      {p.valorMinimo.toLocaleString()} Kz
                    </span>
                  </p>

                  <p className="text-base text-gray-700">
                    Renda diária:{" "}
                    <span className="font-bold text-green-700">
                      {rendimentoDiario.toLocaleString()} Kz
                    </span>
                  </p>

                  <p className="text-base text-gray-700">
                    Duração:{" "}
                    <span className="font-bold text-gray-900">
                      {p.duracaoDias} dias
                    </span>
                  </p>
                </div>

                <Link
                  to={`/produto/${p.id}`}
                  className="btn-primary text-center mt-4"
                >
                  Comprar
                </Link>
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
