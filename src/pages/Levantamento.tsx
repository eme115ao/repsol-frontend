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
  const [saldo, setSaldo] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logos: Record<string, string> = {
    BAI: "/assets/banks/bai.png",
    BFA: "/assets/banks/bfa.png",
    BIC: "/assets/banks/bic.png",
    ATLANTICO: "/assets/banks/atlantico.png",
    SOL: "/assets/banks/sol.png",
    KEVE: "/assets/banks/keve.png",
  };

  const hoje = new Date();
  const diaSemana = hoje.getDay();
  const saqueBloqueado = diaSemana === 0 || diaSemana === 5 || diaSemana === 6;

  useEffect(() => {
    (async () => {
      try {
        // BANCOS DO USUÁRIO
        const res = await apiGet<{ bancos: BancoUsuario[] }>("/banco/usuario");

        if (res.bancos && Array.isArray(res.bancos)) {
          setBancos(res.bancos);
          if (res.bancos.length > 0) setSelected(res.bancos[0].id);
        }

        // SALDO — DASHBOARD
        const saldoRes = await apiGet<{ saldoDisponivel: number }>("/dashboard");
        setSaldo(saldoRes.saldoDisponivel || 0);

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    })();
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();

    if (!selected) return alert("Selecione um banco.");
    if (!valor || Number(valor) <= 0) return alert("Insira um valor válido.");
    if (Number(valor) > saldo) return alert("Valor excede o saldo disponível.");
    if (saqueBloqueado)
      return alert("Os levantamentos só podem ser feitos de segunda a quinta-feira.");

    setLoading(true);

    try {
      const valorOriginal = Number(valor);
      const valorComDesconto = Number((valorOriginal * 0.86).toFixed(2)); // 14% desconto

      await apiPost("/withdraw", {
        bancoId: selected,
        amount: valorComDesconto,
        valorOriginal,
        desconto: "14%",
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
    <div className="min-h-screen bg-slate-50 pb-24 pt-5 px-4 max-w-md mx-auto">

      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center tracking-tight">
        Levantamento
      </h1>

      <div className="mb-6 bg-white shadow-lg p-5 rounded-2xl border border-slate-200 transform scale-[1.02]">
        <p className="text-gray-600 text-sm">Saldo disponível</p>
        <p className="text-3xl font-extrabold text-orange-600 mt-1">
          {saldo.toLocaleString()} Kz
        </p>
      </div>

      {/* BANCOS */}
      <div className="space-y-4">
        <p className="text-gray-800 font-semibold text-lg">
          Selecione sua conta bancária:
        </p>

        {bancos.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum banco cadastrado.</p>
        )}

        {bancos.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelected(b.id)}
            className={`p-4 rounded-2xl border shadow-sm cursor-pointer transition-all duration-200 flex items-center gap-4 hover:scale-[1.02]
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
              <p className="font-bold text-gray-900 text-lg">{b.banco}</p>
              <p className="text-sm text-gray-600">Titular: {b.titular}</p>
              <p className="text-sm text-gray-600">{b.conta}</p>
            </div>

            {selected === b.id && (
              <div className="text-orange-600 font-bold text-xl">✓</div>
            )}
          </div>
        ))}
      </div>

      {/* FORM */}
      <form onSubmit={enviar} className="mt-8 space-y-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Valor do Levantamento (Kz)
          </label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 50000"
            className="w-full p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-orange-400 text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading || saqueBloqueado}
          className={`w-full text-white py-3 rounded-xl font-bold shadow text-lg flex items-center justify-center gap-2
            ${
              saqueBloqueado
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
        >
          <FaMoneyBillWave size={22} />
          {loading ? "Processando..." : "Solicitar Levantamento"}
        </button>

        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-blue-800 leading-relaxed text-center">
            O seu pedido de saque será processado o mais breve possível.
            Os levantamentos são realizados apenas de segunda a quinta-feira,
            com tempo de processamento entre 24 a 48 horas.
            Após enviar a solicitação, aguarde com paciência enquanto a equipa
            conclui a validação.
          </p>
        </div>
      </form>
    </div>
  );
}
