import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimento: number;
  duracaoDias: number;
  imagem: string | null;
}

export default function Produtos() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<any>("/api/products");

        const list = Array.isArray(res)
          ? res
          : Array.isArray(res.products)
          ? res.products
          : [];

        setProducts(list);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function resolveImage(img?: string | null) {
    if (!img) return "/assets/placeholder.png";
    return `/assets/${img}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando produtos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-8 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        Produtos
      </h1>

      <div className="max-w-xl mx-auto space-y-6">
        {products.map((p) => {
          const rendimentoReal = Math.round(p.valorMinimo * (p.rendimento / 100));

          return (
            <div
              key={p.id}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 flex gap-6 items-center hover:shadow-2xl transition-all"
            >
              <div className="w-24 h-24 rounded-2xl bg-orange-50 overflow-hidden border-2 border-orange-200 flex items-center justify-center shadow-inner">
                <img
                  src={resolveImage(p.imagem)}
                  alt={p.nome}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <p className="text-xl font-bold text-gray-900 leading-tight">
                  {p.nome}
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  Mínimo: <span className="font-semibold text-gray-900">{p.valorMinimo.toLocaleString()} Kz</span>
                </p>

                <p className="text-sm text-gray-700">
                  Rendimento diário:{" "}
                  <span className="font-semibold text-green-700">
                    {rendimentoReal.toLocaleString()} Kz
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  Duração: {p.duracaoDias} dias
                </p>
              </div>

              <Link
                to={`/produto/${p.id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-2xl shadow active:scale-95 transition-all whitespace-nowrap"
              >
                Comprar
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
