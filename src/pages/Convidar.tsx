import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { SITE_URL } from "../config/constants";

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
    const link = `${SITE_URL}/register?ref=${codigo}`;
    navigator.clipboard.writeText(link);
    alert("Link de convite copiado!");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white bg-gradient-to-br from-orange-500 to-red-600">
        Carregando…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-yellow-500 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Sistema de Convite
        </h1>

        <div className="bg-gray-50 rounded-xl shadow p-4 mb-6">
          <p className="font-semibold mb-2 text-gray-700">Seu código:</p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={codigo}
              disabled
              className="flex-1 bg-white border border-gray-300 rounded-lg p-2 text-center font-bold text-gray-900"
            />
            <button
              onClick={copiarCodigo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
            >
              Copiar
            </button>
          </div>

          <button
            onClick={copiarLink}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-lg active:scale-95 transition"
          >
            Copiar link de convite
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl shadow p-4 text-center">
          <p className="font-semibold text-gray-700 mb-1">Total de convidados:</p>
          <p className="text-4xl font-extrabold text-gray-900">{total}</p>
        </div>
      </div>
    </div>
  );
}
