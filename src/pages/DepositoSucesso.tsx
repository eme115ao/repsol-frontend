import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DepositoSucesso() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 animate-fadeIn">
      <FaCheckCircle className="text-green-500 text-7xl mb-4 animate-bounce" />

      <h1 className="text-2xl font-bold text-gray-800">
        Depósito Enviado!
      </h1>

      <p className="text-gray-600 text-center mt-2 max-w-sm">
        Seu comprovativo foi enviado com sucesso.  
        A equipa Repsol irá analisar e aprovar o mais rápido possível.
      </p>

      <button
        onClick={() => navigate("/minha")}
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition"
      >
        Ir para Minha Conta
      </button>
    </div>
  );
}
