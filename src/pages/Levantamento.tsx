// src/pages/Levantamento.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import { FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BancoUsuario {
  id: number;
  banco: string;
  titular: string;
  conta: string;
  userId: number;
}

export default function Levantamento() {
  const [bancos, setBancos] = useState<BancoUsuario[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logos: Record<string, string> = {
    BAI: "/assets/banks/bai.png",
    BFA: "/assets/banks/bfa.png",
    BIC: "/assets/banks/bic.png",
    ATLANTICO: "/assets/banks/atlantico.png",
    SOL: "/assets/banks/sol.png",
    KEVE: "/assets/banks/keve.png"
  };

  useEffect(() => {
    (async () => {
      try {
        // CORREÇÃO 1: rota correta
        const res = await apiGet<{ bancos: BancoUsuario[] }>("/api/bancos/usuario");

        if (res.bancos && Array.isArray(res.bancos)) {
          setBancos(res.bancos);

          if (res.bancos.length > 0) {
            setSelected(res.bancos[0].id); // selecionar automaticamente
          }
        }
      } catch (err) {
        console.error("Erro ao carregar bancos:", err);
      }
    })();
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();

    if (!selected) return alert("Selecione um banco.");
    if (!valor || Number(valor) <= 0) return alert("Insira um valor válido.");

    setLoading(true);

    try {
      // CORREÇÃO 2: rota correta
      await apiPost("/api/transactions/withdraw", {
        bancoId: selected,
        amount: Number(valor)
      });

      navigate("/levantamento/sucesso");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao solicitar levantamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-4 px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Levantamento
      </h1>

      <div className="space-y-4">
        <p className="text-gray-700 font-semibold">Selecione sua conta bancária:</p>

        {bancos.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum banco cadastrado.</p>
        )}

        {bancos.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelected(b.id)}
            className={`p-4 rounded-xl border shadow-sm cursor-pointer transition flex items-center gap-4
              ${
                selected === b.id
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-slate-200 bg-white"
              }`}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={logos[b.banco] || "/assets/bank.png"}
                alt={b.banco}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{b.banco}</p>
              <p className="text-sm text-gray-600">Titular: {b.titular}</p>
              <p className="text-sm text-gray-600">{b.conta}</p>
            </div>

            {selected === b.id && (
              <div className="text-orange-600 font-bold text-xl">✓</div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={enviar} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Valor do Levantamento (Kz)
          </label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 50000"
            className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-orange-700 transition flex items-center justify-center gap-2 text-lg"
        >
          <FaMoneyBillWave size={20} />
          {loading ? "Enviando..." : "Solicitar Levantamento"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          A validação pode levar até 24 horas.
        </p>
      </form>
    </div>
  );
}
