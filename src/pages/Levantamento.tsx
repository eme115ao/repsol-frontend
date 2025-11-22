// src/pages/Levantamento.tsx
import { useState } from "react";
import { apiPost } from "../services/api";

export default function Levantamento() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);

  async function solicitar(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost("/transactions/levantamento", {
        userId,
        amount: Number(valor)
      });

      alert("Solicitação enviada com sucesso");
      setValor("");
    } catch (err: any) {
      alert("Erro: " + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Levantamento</h1>

      <form onSubmit={solicitar} className="space-y-3">
        <input
          type="number"
          placeholder="Valor a levantar"
          className="border p-3 w-full rounded"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <button
          className="bg-orange-600 text-white py-3 w-full rounded"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Solicitar Levantamento"}
        </button>
      </form>
    </div>
  );
}
