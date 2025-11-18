import { useState } from "react";
import api from "../services/api";
import WhatsAppFloating from "../components/WhatsAppFloating";

export default function Deposito() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submitDeposit(e: any) {
    e.preventDefault();
    setMsg("");
    if (!amount || Number(amount) <= 0) {
      setMsg("Informe um valor válido.");
      return;
    }

    setLoading(true);
    try {
      // endpoint /deposito - o backend já tem depósito. Ajuste se necessário.
      const payload = {
        userId: user.id,
        amount: Number(amount),
      };

      const res = await api.post("/deposito", payload);
      if (res.data?.ok) {
        setMsg("Depósito enviado — pendente de aprovação do admin.");
      } else {
        setMsg(res.data?.error || "Depósito enviado — aguarde aprovação.");
      }
    } catch (e) {
      setMsg("Erro ao enviar depósito.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Depósito</h1>

      <div className="bg-white p-4 rounded-xl shadow max-w-md">
        <p className="mb-3">Saldo atual: <strong>Kz {user?.saldo ?? 0}</strong></p>

        <form onSubmit={submitDeposit} className="space-y-3">
          <label className="block font-semibold">Valor (Kz)</label>
          <input
            type="number"
            value={amount as any}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="border p-2 rounded w-full"
            placeholder="9000"
          />

          <button disabled={loading} className="bg-orange-600 text-white px-4 py-2 rounded">
            {loading ? "Enviando..." : "Solicitar Depósito"}
          </button>
        </form>

        {msg && <p className="mt-3">{msg}</p>}
      </div>

      <WhatsAppFloating />
    </div>
  );
}
