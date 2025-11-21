// src/pages/Deposito.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Deposito() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  function formatValue(v: number | "") {
    if (v === "") return "";
    return Number(v).toLocaleString();
  }

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const numeric = Number(amount);
    if (!numeric || numeric <= 0) {
      setError("Insira um valor válido.");
      return;
    }

    // ir para confirmar com state
    navigate("/deposito/confirmar", { state: { amount: numeric } });
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Depositar</h1>

      <form onSubmit={handleConfirm} className="bg-white p-6 rounded shadow space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Valor (KZ)</span>
          <input
            type="number"
            min={0}
            step="1"
            value={amount === "" ? "" : amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full p-3 border rounded mt-1"
            placeholder="Ex: 5000"
          />
        </label>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-orange-600 text-white py-2 rounded">
            Confirmar depósito
          </button>
          <button type="button" onClick={() => { setAmount(""); setError(null); }} className="px-4 py-2 border rounded">
            Limpar
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Após confirmar, aparecerão os dados bancários para transferência. Use o número do telemóvel como referência.
        </p>
      </form>
    </div>
  );
}
