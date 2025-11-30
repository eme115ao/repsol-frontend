// src/pages/Convidar.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Convidar() {
  const [codigo, setCodigo] = useState<string>("...");
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const codigoRes = await apiGet("/api/referral/my-code");
        setCodigo(codigoRes.code || "N/A");

        const totalRes = await apiGet("/api/referral/invite-count");
        setTotal(totalRes.total || 0);
      } catch (err) {
        console.error("Erro ao carregar dados do convite:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function copiarCodigo() {
    navigator.clipboard.writeText(codigo);
    alert("Código copiado!");
  }

  function copiarLink() {
    const link = `https://repsolinvest.netlify.app/#/register?ref=${codigo}`;
    navigator.clipboard.writeText(link);
    alert("Link de convite copiado!");
  }

  if (loading) {
    return <p className="text-center py-10">Carregando…</p>;
  }

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Sistema de Convite</h1>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <p className="font-semibold mb-2">Seu código:</p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={codigo}
            disabled
            className="flex-1 bg-gray-100 rounded-lg p-2 text-center"
          />
          <button
            onClick={copiarCodigo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Copiar
          </button>
        </div>

        <button
          onClick={copiarLink}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          Copiar link de convite
        </button>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="font-semibold mb-2">Total de convidados:</p>
        <p className="text-3xl font-bold">{total}</p>
      </div>
    </div>
  );
}
