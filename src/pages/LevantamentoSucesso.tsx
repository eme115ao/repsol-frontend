// src/pages/LevantamentoSucesso.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function LevantamentoSucesso() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 pb-24">
      
      <FaCheckCircle size={90} className="text-green-500 mb-6 drop-shadow" />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Pedido Enviado!
      </h1>

      <p className="text-center text-gray-600 max-w-sm mb-8 leading-relaxed">
        Seu pedido de levantamento foi submetido com sucesso. 
        A equipa Repsol irá verificar e processar o mais rápido possível.
      </p>

      <Link
        to="/minha"
        className="bg-orange-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow hover:bg-orange-700 transition"
      >
        Ir para Minha Conta
      </Link>
    </div>
  );
}
