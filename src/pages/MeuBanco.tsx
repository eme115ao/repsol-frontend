// src/pages/MeuBanco.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPut } from "../services/api";

export default function MeuBanco() {
  const userId = Number(localStorage.getItem("userId"));

  const [nome, setNome] = useState("");
  const [banco, setBanco] = useState("");
  const [iban, setIban] = useState("");

  useEffect(() => {
    (async () => {
      const r = await apiGet(`/api/banco/${userId}`);
      if (r) {
        setNome(r.nome || "");
        setBanco(r.banco || "");
        setIban(r.iban || "");
      }
    })();
  }, [userId]);

  async function salvar() {
    await apiPut(`/api/banco/${userId}`, {
      nome,
      banco,
      iban
    });

    alert("Dados bancários atualizados.");
  }

  return (
    <div className="p-4">

      <h1 className="text-xl font-bold mb-4">Meu Banco</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">

        <input
          className="w-full border p-2 rounded"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Nome do Banco"
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="IBAN"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
        />

        <button
          onClick={salvar}
          className="bg-orange-600 text-white p-3 rounded w-full"
        >
          Guardar
        </button>
      </div>

    </div>
  );
}
