// src/pages/Levantamento.tsx
import React, { useState } from "react";
import { apiPost } from "../services/api";

export default function Levantamento() {
  const [valor, setValor] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const userId = Number(localStorage.getItem("userId") || 0);

  async function solicitar() {
    if (!valor || Number(valor) <= 0) {
      alert("Insira um valor válido.");
      return;
    }

    setLoading(true);
    try {
      await apiPost("/withdraw", {
        userId,
        valor: Number(valor),
        status: "pending"
      });

      alert("Pedido de levantamento enviado. Aguarde processamento.");
      setValor("");
    } catch (err: any) {
      alert("Erro ao solicitar levantamento: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Levantamento</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Valor (KZ)</span>
          <input
            type="number"
            min={0}
            step="1"
            value={valor === "" ? "" : valor}
            onChange={(e) => setValor(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full p-3 border rounded mt-1"
            placeholder="Ex: 10000"
          />
        </label>

        <button
          onClick={solicitar}
          className="w-full bg-red-600 text-white py-3 rounded"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Solicitar Levantamento"}
        </button>

        <p className="text-xs text-gray-500">
          Os pedidos serão processados manualmente. Verifique a página "Meu Banco" para confirmar seus dados bancários de levantamento.
        </p>
      </div>
    </div>
  );
}
