// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/api";
import toast from "react-hot-toast";

interface Product {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimentoDia: number;
  duracaoDias: number;
  imagem: string | null;
  bloqueado?: boolean;
}

interface InvestmentResponse {
  id?: number;
  errorCode?: string;
  message?: string;
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
      } catch {
        toast.error("Erro ao carregar produto");
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

    if (product.bloqueado) {
      toast("Brevemente disponível ⏳", { icon: "🔒" });
      return;
    }

    setProcessing(true);

    const res = await apiPost<InvestmentResponse>("/investments", {
      productId: product.id,
      amount: product.valorMinimo,
    });

    setProcessing(false);

    if (!res || !res.id) {
      switch (res?.errorCode) {
        case "INSUFFICIENT_BALANCE":
          toast.error("Saldo insuficiente");
          navigate("/deposito");
          return;

        case "PRODUCT_LIMIT_REACHED":
          toast("Limite atingido para este produto", { icon: "⚠️" });
          return;

        case "PRODUCT_BLOCKED":
          toast("Brevemente disponível ⏳", { icon: "🔒" });
          return;

        default:
          toast.error("Compra não realizada");
          return;
      }
    }

    toast.success("Compra realizada com sucesso!");
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

  const disabled = processing || product.bloqueado;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-6 max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">
        {product.nome}
      </h1>

      <div className="w-full h-60 rounded-3xl bg-white shadow border border-slate-200 mb-6 overflow-hidden flex items-center justify-center relative">
        {product.bloqueado && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
            Indisponível
          </div>
        )}
        <img
          src={resolveImage(product.imagem)}
          alt={product.nome}
          className="w-full h-full object-contain p-4"
        />
      </div>

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

      <button
        onClick={handleBuy}
        disabled={disabled}
        className={`w-full mt-6 py-3 rounded-xl font-bold transition
          ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 text-white"
          }`}
      >
        {product.bloqueado
          ? "Indisponível"
          : processing
          ? "Processando..."
          : "Comprar agora"}
      </button>
    </div>
  );
}
