import { useState, useEffect } from "react";
import api from "../services/api";

export default function MeuBanco() {
  const [banco, setBanco] = useState<any>(null);
  const [form, setForm] = useState({ nome: "", conta: "", iban: "" });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    api.get("/finance/banco").then((res) => setBanco(res.data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/finance/banco", form);
      setMensagem("✅ Banco cadastrado com sucesso!");
      setBanco(res.data);
    } catch {
      setMensagem("❌ Erro ao cadastrar banco.");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Meu Banco</h1>
      {banco ? (
        <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-md">
          <p>
            <b>Nome:</b> {banco.nome}
          </p>
          <p>
            <b>Conta:</b> {banco.conta}
          </p>
          <p>
            <b>IBAN:</b> {banco.iban}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow-md w-full max-w-md flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Nome do Banco"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Número da Conta"
            value={form.conta}
            onChange={(e) => setForm({ ...form, conta: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="IBAN"
            value={form.iban}
            onChange={(e) => setForm({ ...form, iban: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <button className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
            Salvar
          </button>
          {mensagem && <p className="text-center text-sm mt-2">{mensagem}</p>}
        </form>
      )}
    </div>
  );
}
