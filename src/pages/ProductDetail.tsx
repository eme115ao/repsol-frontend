// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/api";

interface Product {
  id: number;
  nome: string;
  valorMinimo: number;
  rendimento: number;
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
        // ROTA CORRETA DO BACKEND
        // GET /api/products/:id
        const res = await apiGet<any>(`/api/products/${id}`);

        // aceita tanto { product: {...} } quanto o objeto direto
        setProduct(res.product || res);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function resolveImage(img?: string | null) {
    if (!img) return "/assets/placeholder.png";
    if (!img.startsWith("/assets/")) {
      return `/assets/${img}`;
    }
    return img;
  }

  async function handleBuy() {
    if (!product) return;

    setProcessing(true);

    try {
      // ROTA CORRETA DO BACKEND:
      // POST /api/investment
      // body: { productId, amount }
      const body = {
        productId: product.id,
        amount: product.valorMinimo,
      };

      await apiPost("/api/investment", body);

      alert("Compra realizada com sucesso!");
      navigate("/loja");
    } catch (err: any) {
      console.error("Erro ao comprar produto:", err);

      const msg = err?.message || "";

      if (msg.includes("Saldo insuficiente")) {
        alert("Saldo insuficiente! Faça um depósito para continuar.");
        navigate("/deposito");
        return;
      }

      alert(msg || "Erro ao processar compra.");
    } finally {
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando produto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Produto não encontrado.
      </div>
    );
  }

  const rendimentoReal = Math.round(
    product.valorMinimo * (product.rendimento / 100)
  );

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
