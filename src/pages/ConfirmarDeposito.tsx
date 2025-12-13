// src/pages/CompraSucesso.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  investmentId?: number;
}

export default function CompraSucesso() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // 🔒 Proteção da rota
  useEffect(() => {
    if (!state?.investmentId) {
      // Acesso direto ou inválido
      navigate("/produtos", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.investmentId) {
    return null; // evita flicker
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full border border-slate-200">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-5xl">✓</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Compra Realizada!
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Seu pedido foi submetido com sucesso.
          <br />
          A equipa Repsol irá confirmar a compra e processar o mais rápido possível.
        </p>

        <button
          onClick={() => navigate("/minha")}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold shadow"
        >
          Ir para Minha Conta
        </button>
      </div>
    </div>
  );
}
