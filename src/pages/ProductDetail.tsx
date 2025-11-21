// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await apiGet(`/api/products/${id}`);
      setProduct(res);
    })();
  }, [id]);

  async function investir() {
    if (!valor || valor < product.valorMinimo) {
      alert(`Valor mínimo é ${product.valorMinimo.toLocaleString()} KZ`);
      return;
    }

    const res = await apiPost("/api/invest", {
      productId: product.id,
      valor,
    });

    if (res.error) {
      alert(res.error);
      return;
    }

    alert("Investimento realizado com sucesso!");
    navigate("/dashboard");
  }

  if (!product) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4">

      <img
        src={`/assets/${product.imagem}`}
        className="w-full h-52 object-cover rounded-xl mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{product.nome}</h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-2 mb-6">
        <p><strong>Mínimo:</strong> {product.valorMinimo.toLocaleString()} KZ</p>
        <p><strong>Duração:</strong> {product.duracaoDias} dias</p>
        <p><strong>Rendimento:</strong> {(product.rendimento * 100).toFixed(2)}% ao dia</p>
      </div>

      <input
        type="number"
        className="border p-3 rounded w-full mb-4"
        placeholder="Valor a investir"
        onChange={(e) => setValor(Number(e.target.value))}
      />

      <button
        onClick={investir}
        className="bg-orange-600 text-white w-full py-3 rounded-xl font-bold"
      >
        Investir Agora
      </button>

    </div>
  );
}
