// src/pages/MeuBanco.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

export default function MeuBanco() {
  const [banco, setBanco] = useState("");
  const [conta, setConta] = useState("");
  const [titular, setTitular] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarBanco();
  }, []);

  async function carregarBanco() {
    try {
      const res = await apiGet("/api/bancos/usuario");
      if (res.bancos && res.bancos.length > 0) {
        const b = res.bancos[0];
        setBanco(b.banco || "");
        setConta(b.conta || "");
        setTitular(b.titular || "");
      }
    } catch {
      console.warn("Nenhuma conta cadastrada.");
    }
  }

  async function handleSave() {
    try {
      setLoading(true);

      await apiPost("/api/bancos/usuario", {
        banco,
        conta,
        titular,
      });

      alert("Conta bancária salva com sucesso!");
      carregarBanco();

    } catch (error: any) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Meu Banco</h2>

      <div className="bg-white shadow-md rounded-lg p-4 space-y-4">

        <div>
          <label className="block text-sm font-medium">Banco</label>
          <input
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="BAI, BFA, etc"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">IBAN / Nº Conta</label>
          <input
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Digite o número da conta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Titular</label>
          <input
            value={titular}
            onChange={(e) => setTitular(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Nome completo"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
