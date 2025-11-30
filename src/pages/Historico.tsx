import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { FaArrowDown, FaArrowUp, FaCoins } from "react-icons/fa";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function Historico() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const data = await apiGet("/api/transaction");

      const lista: Transaction[] = Array.isArray(data.transactions)
        ? data.transactions
        : [];

      // CORREÇÃO FINAL DO SORT
      lista.sort((a: Transaction, b: Transaction) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setItems(lista);
    } catch (err) {
      console.error("Erro ao carregar transações:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando histórico...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Histórico Geral
      </h1>

      {items.length === 0 && (
        <div className="text-gray-500 text-center mt-10">
          Nenhum registro encontrado.
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <HistoricoItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function HistoricoItem({ item }: { item: Transaction }) {
  let icon;
  let cor;
  let titulo;

  switch (item.type) {
    case "deposit":
      icon = <FaArrowDown className="text-blue-600" size={20} />;
      cor = "text-blue-600";
      titulo = "Depósito";
      break;

    case "withdraw":
      icon = <FaArrowUp className="text-red-600" size={20} />;
      cor = "text-red-600";
      titulo = "Levantamento";
      break;

    case "investment":
      icon = <FaCoins className="text-orange-600" size={20} />;
      cor = "text-orange-600";
      titulo = "Investimento";
      break;

    default:
      icon = <FaCoins className="text-gray-600" size={20} />;
      cor = "text-gray-600";
      titulo = item.type || "Registo";
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="font-semibold text-gray-800">{titulo}</p>
          <p className="text-xs text-gray-500">
            {item.status ? `Status: ${item.status}` : ""}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className={`font-bold ${cor}`}>
        {item.amount.toLocaleString()} Kz
      </p>
    </div>
  );
}
