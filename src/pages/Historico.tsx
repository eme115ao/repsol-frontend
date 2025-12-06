// src/pages/Historico.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import {
  FaArrowDown,
  FaArrowUp,
  FaCoins,
  FaClock,
} from "react-icons/fa";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function Historico() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const data = await apiGet<Transaction[]>("/transactions");

      const lista = Array.isArray(data)
        ? [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
        : [];

      setItems(lista);
      setErrorMsg("");
    } catch (err: any) {
      console.error("Erro histórico:", err?.message || err);
      setErrorMsg("Erro ao carregar histórico.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">

      {/* TÍTULO PROFISSIONAL */}
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">
        Histórico Geral
      </h1>

      {errorMsg && (
        <p className="text-red-600 text-sm mb-3 text-center">
          {errorMsg}
        </p>
      )}

      {items.length === 0 ? (
        <div className="text-gray-500 text-center mt-10 text-sm">
          Nenhum registro encontrado.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <HistoricoItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================================================================== */
/* ===================== CARD PROFISSIONAL DO ITEM ====================== */
/* ===================================================================== */

function HistoricoItem({ item }: { item: Transaction }) {
  let icon, cor, titulo;

  switch (item.type.toUpperCase()) {
    case "DEPOSIT":
      icon = <FaArrowDown size={24} className="text-blue-600" />;
      cor = "text-blue-600";
      titulo = "Depósito";
      break;

    case "WITHDRAW":
      icon = <FaArrowUp size={24} className="text-red-600" />;
      cor = "text-red-600";
      titulo = "Levantamento";
      break;

    case "INVESTMENT":
    case "INVESTMENT_YIELD":
      icon = <FaCoins size={24} className="text-orange-600" />;
      cor = "text-orange-600";
      titulo = "Investimento";
      break;

    case "REFERRAL_BONUS":
      icon = <FaCoins size={24} className="text-green-600" />;
      cor = "text-green-600";
      titulo = "Bónus de Referido";
      break;

    default:
      icon = <FaCoins size={24} className="text-gray-600" />;
      cor = "text-gray-600";
      titulo = item.type || "Registo";
  }

  return (
    <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:scale-[1.01] transition-all flex justify-between items-center gap-3">

      {/* ESQUERDA */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shadow-inner">
          {icon}
        </div>

        <div>
          <p className="text-base font-extrabold text-gray-900">
            {titulo}
          </p>

          <p className="text-xs text-gray-500 mt-0.5 capitalize">
            Status: {item.status || "—"}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <FaClock size={11} />
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* VALOR */}
      <p className={`text-lg font-extrabold ${cor} whitespace-nowrap`}>
        {Number(item.amount).toLocaleString()} Kz
      </p>
    </div>
  );
}
