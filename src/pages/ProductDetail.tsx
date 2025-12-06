// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/api";

interface Product {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimentoDia: number; // CORRETO
  duracaoDias: number;
  imagem: string | null;
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

        // BACKEND retorna direto o objeto, sem "product"
        const p = res.product || res;

        setProduct({
          ...p,
          rendimentoDia: Number(p.rendimentoDia), // garantir número
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
    if (!img.startsWith("/assets/")) return `/assets/${img}`;
    return img;
  }

  async function handleBuy() {
    if (!product) return;

    setProcessing(true);

    try {
      await apiPost("/investments", {
        productId: product.id,
        amount: product.valorMinimo,
      });

      alert("Compra realizada com sucesso!");
      navigate("/loja");
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("Saldo insuficiente")) {
        alert("Saldo insuficiente! Faça um depósito.");
        navigate("/deposito");
        return;
      }
      alert(msg || "Erro ao processar compra.");
    } finally {
      setProcessing(false);
    }
  }

  // ---------- UI DE CARREGAMENTO rápido, sem tela branca -----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-sm">
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

  // Cálculo CORRETO do backend (rendimentoDia é valor fixo KZ)
  const rendimentoReal = Number(product.rendimentoDia) || 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.nome}</h1>

      <div className="w-full h-48 rounded-2xl bg-white shadow border border-slate-200 mb-4 overflow-hidden">
        <img
          src={resolveImage(product.imagem)}
          alt={product.nome}
          className="w-full h-full object-contain p-4"
        />
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border border-slate-100 space-y-3">
        <p className="text-gray-700">
          Preço mínimo:{" "}
          <strong>{product.valorMinimo.toLocaleString()} Kz</strong>
        </p>

        <p className="text-gray-700">
          Rendimento diário real:{" "}
          <strong>{rendimentoReal.toLocaleString()} Kz</strong>
        </p>

        <p className="text-gray-700">
          Duração: <strong>{product.duracaoDias} dias</strong>
        </p>
      </div>

      <button
        onClick={handleBuy}
        disabled={processing}
        className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow hover:bg-orange-600 transition disabled:bg-gray-400"
      >
        {processing ? "Processando..." : "Comprar agora"}
      </button>
    </div>
  );
}
