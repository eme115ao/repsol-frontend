// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/api";

interface Product {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimentoDia: number;
  duracaoDias: number;
  imagem: string | null;
}

interface InvestmentResponse {
  id: number;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<any>(`/products/${id}`);
        const p = res.product || res;

        setProduct({
          ...p,
          rendimentoDia: Number(p.rendimentoDia),
        });
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function resolveImage(img?: string | null) {
    if (!img) return "/assets/placeholder.png";
    return `/assets/${img}`;
  }

  async function handleBuy() {
    if (!product || processing) return;

    setProcessing(true);

    const res = await apiPost<InvestmentResponse>("/investments", {
      productId: product.id,
      amount: product.valorMinimo,
    });

    setProcessing(false);

    // ❌ SEM id → compra NÃO ocorreu
    if (!res || !res.id) {
      alert("Compra não realizada. Verifique seu saldo ou o status do produto.");
      return;
    }

    // ✅ Sucesso REAL — envia investmentId para a página protegida
    navigate("/compra/sucesso", {
      state: { investmentId: res.id },
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Atualizando produto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-6 max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">
        {product.nome}
      </h1>

      {/* IMAGEM GRANDE */}
      <div className="w-full h-60 rounded-3xl bg-white shadow border border-slate-200 mb-6 overflow-hidden flex items-center justify-center">
        <img
          src={resolveImage(product.imagem)}
          alt={product.nome}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* DETALHES */}
      <div className="card p-6 space-y-4">
        <p className="text-gray-700 text-lg">
          Preço mínimo:{" "}
          <span className="font-bold text-gray-900">
            {product.valorMinimo.toLocaleString()} Kz
          </span>
        </p>

        <p className="text-gray-700 text-lg">
          Rendimento diário:{" "}
          <span className="font-bold text-green-700">
            {product.rendimentoDia.toLocaleString()} Kz
          </span>
        </p>

        <p className="text-gray-700 text-lg">
          Duração:{" "}
          <span className="font-bold text-gray-900">
            {product.duracaoDias} dias
          </span>
        </p>
      </div>

      {/* BOTÃO */}
      <button
        onClick={handleBuy}
        disabled={processing}
        className="btn-primary w-full mt-6"
      >
        {processing ? "Processando..." : "Comprar agora"}
      </button>
    </div>
  );
}
