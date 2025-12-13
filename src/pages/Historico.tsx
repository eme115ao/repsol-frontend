import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { FaArrowDown, FaArrowUp, FaCoins, FaClock } from "react-icons/fa";

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
      const data = await apiGet<Transaction[]>("/transactions/history");

      const lista = Array.isArray(data)
        ? [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
        : [];

      setItems(lista);
      setErrorMsg("");
    } catch (err) {
      console.error("Erro histórico:", err);
      setErrorMsg("Erro ao carregar histórico.");
      setItems([]);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-8">
        Histórico Geral
      </h1>

      {errorMsg && (
        <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
      )}

      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum registro encontrado.
        </p>
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

function HistoricoItem({ item }: { item: Transaction }) {
  let icon = <FaCoins />;
  let cor = "text-gray-600";
  let titulo = item.type;

  if (item.type === "DEPOSIT") {
    icon = <FaArrowDown className="text-blue-600" />;
    cor = "text-blue-600";
    titulo = "Depósito";
  }

  if (item.type === "WITHDRAW") {
    icon = <FaArrowUp className="text-red-600" />;
    cor = "text-red-600";
    titulo = "Levantamento";
  }

  if (item.type === "INVESTMENT_YIELD") {
    icon = <FaCoins className="text-green-600" />;
    cor = "text-green-600";
    titulo = "Rendimento Diário";
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow flex justify-between">
      <div className="flex gap-4">
        <div className="w-14 h-14 bg-slate-100 flex items-center justify-center rounded-xl">
          {icon}
        </div>
        <div>
          <p className="font-bold">{titulo}</p>
          <p className="text-xs text-gray-500">
            Status: {item.status}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FaClock size={10} />
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className={`font-bold text-lg ${cor}`}>
        {Number(item.amount).toLocaleString()} Kz
      </p>
    </div>
  );
}
