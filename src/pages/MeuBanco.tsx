// src/pages/MeuBanco.tsx
import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../services/api";

export default function MeuBanco() {
  const userId = Number(localStorage.getItem("userId"));

  const [nome, setNome] = useState("");
  const [banco, setBanco] = useState("");
  const [iban, setIban] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await apiGet(`/banco/${userId}`);

      setNome(r.nome || "");
      setBanco(r.banco || "");
      setIban(r.iban || "");

      setLoading(false);
    })();
  }, [userId]);

  async function salvar() {
    await apiPut(`/banco/${userId}`, {
      nome,
      banco,
      iban,
    });

    alert("Dados bancários atualizados!");
  }

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Meu Banco</h1>

      <div className="space-y-3 bg-white p-4 rounded shadow">

        <input
          className="w-full border p-2 rounded"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Banco"
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
          className="w-full bg-orange-600 text-white p-3 rounded"
          onClick={salvar}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
