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
  [k: string]: any;
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
    <div className="min-h-screen bg-slate-50 pb-24 pt-8 px-4">

      {/* TÍTULO PRINCIPAL */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        Produtos
      </h1>

      {/* LISTA DE PRODUTOS */}
      <div className="max-w-xl mx-auto space-y-8">
        {products.map((p) => {
          const rendimentoDiario = getRendimentoDiario(p);

          return (
            <div
              key={p.id}
              className="
                bg-white rounded-3xl p-6 flex gap-6 items-center 
                border border-slate-200 shadow-xl 
                hover:shadow-[0_12px_26px_rgba(0,0,0,0.15)]
                hover:scale-[1.015]
                transition-all duration-300 ease-out
              "
            >
              {/* IMAGEM DO PRODUTO */}
              <div
                className="
                  w-24 h-24 rounded-2xl bg-orange-50 overflow-hidden 
                  border-2 border-orange-200 flex items-center justify-center shadow-inner
                "
              >
                <img
                  src={resolveImage(p.imagem)}
                  alt={p.nome}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* INFORMAÇÕES */}
              <div className="flex-1">
                <p className="text-xl font-bold text-gray-900 leading-tight">
                  {p.nome}
                </p>

                <p className="text-sm text-gray-700 mt-2">
                  Mínimo:{" "}
                  <span className="font-semibold text-gray-900">
                    {p.valorMinimo.toLocaleString()} Kz
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  Rendimento diário:{" "}
                  <span className="font-semibold text-green-700">
                    {rendimentoDiario.toLocaleString()} Kz
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  Duração:{" "}
                  <span className="font-semibold text-gray-900">
                    {p.duracaoDias} dias
                  </span>
                </p>
              </div>

              {/* BOTÃO */}
              <Link
                to={`/produto/${p.id}`}
                className="
                  bg-orange-500 hover:bg-orange-600 
                  text-white font-bold px-6 py-3 
                  rounded-2xl shadow active:scale-95 
                  transition-all duration-200 whitespace-nowrap
                "
              >
                Comprar
              </Link>
            </div>
          );
        })}

        {/* VAZIO */}
        {products.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            Nenhum produto disponível
          </p>
        )}
      </div>
    </div>
  );
}
