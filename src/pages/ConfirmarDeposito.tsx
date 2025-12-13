// src/pages/ConfirmarDeposito.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Banco {
  id: number;
  nome: string;
  titular: string;
  conta: string;
  iban?: string | null;
}

interface LocationState {
  banco?: Banco;
}

export default function ConfirmarDeposito() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const banco = state?.banco;

  // 🔒 Proteção correta da rota
  useEffect(() => {
    if (!banco) {
      toast.error("Selecione um banco primeiro");
      navigate("/deposito", { replace: true });
    }
  }, [banco, navigate]);

  if (!banco) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        Confirmar Depósito
      </h1>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-3">
        <p className="text-lg font-bold text-gray-900">{banco.nome}</p>
        <p className="text-sm text-gray-700">Titular: {banco.titular}</p>
        <p className="text-sm font-semibold text-gray-900">{banco.conta}</p>

        {banco.iban && (
          <p className="text-sm text-gray-700">IBAN: {banco.iban}</p>
        )}
      </div>

      <button
        onClick={() => navigate("/deposito/sucesso")}
        className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold shadow"
      >
        Já efetuei a transferência
      </button>
    </div>
  );
}
