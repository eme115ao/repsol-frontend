import { useState } from "react";
import api from "../services/api";
import WhatsAppFloating from "../components/WhatsAppFloating";

export default function Levantamento() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [amount, setAmount] = useState<number | "">("");
  const [banco, setBanco] = useState("");
  const [conta, setConta] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submitWithdrawal(e: any) {
    e.preventDefault();
    setMsg("");
    if (!amount || Number(amount) <= 0) {
      setMsg("Informe um valor válido.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId: user.id,
        amount: Number(amount),
        banco,
        conta,
      };

      // endpoint /levantamento
      const res = await api.post("/levantamento", payload);
      if (res.data?.ok) {
        setMsg("Pedido de levantamento enviado — pendente de aprovação.");
      } else {
        setMsg(res.data?.error || "Erro ao solicitar levantamento.");
      }
    } catch (e) {
      setMsg("Erro ao enviar pedido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Levantamento</h1>

      <div className="bg-white p-4 rounded-xl shadow max-w-md">
        <p className="mb-3">Saldo disponível: <strong>Kz {user?.saldo ?? 0}</strong></p>

        <form onSubmit={submitWithdrawal} className="space-y-3">
          <label className="block font-semibold">Valor (Kz)</label>
          <input
            type="number"
            value={amount as any}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="border p-2 rounded w-full"
            placeholder="5000"
          />

          <label className="block font-semibold">Banco</label>
          <input
            type="text"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Nome do banco"
          />

          <label className="block font-semibold">Conta</label>
          <input
            type="text"
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Número da conta"
          />

          <button disabled={loading} className="bg-orange-600 text-white px-4 py-2 rounded">
            {loading ? "Enviando..." : "Solicitar Levantamento"}
          </button>
        </form>

        {msg && <p className="mt-3">{msg}</p>}
      </div>

      <WhatsAppFloating />
    </div>
  );
}
