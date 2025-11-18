import { useEffect, useState } from "react";
import api from "../services/api";
import WhatsAppFloating from "../components/WhatsAppFloating";

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState<number | "">("");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setSaldo(parsed.saldo ?? 0);
    }
    setLoading(false);
  }, []);

  async function saveProfile() {
    if (!user) return;
    setMsg("");
    try {
      // tenta atualizar no backend se endpoint existir, caso contrário só atualiza localStorage
      const payload = { ...user, saldo: Number(saldo) };
      await api.put(`/users/${user.id}`, payload).catch(() => {
        // ignora erro se endpoint não existir
      });

      const updated = { ...user, saldo: Number(saldo) };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setMsg("Perfil atualizado.");
    } catch (e) {
      setMsg("Falha ao atualizar.");
    }
  }

  if (loading) return <div className="p-4">Carregando perfil...</div>;

  if (!user)
    return (
      <div className="p-4">
        <p>Usuário não encontrado. Faça login.</p>
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Perfil</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-4 max-w-lg">
        <p className="font-semibold">Telefone</p>
        <p className="mb-2">{user.phone}</p>

        <p className="font-semibold">Admin</p>
        <p className="mb-2">{user.isAdmin ? "Sim" : "Não"}</p>

        <label className="block font-semibold mt-2">Saldo (Kz)</label>
        <input
          type="number"
          value={saldo as any}
          onChange={(e) => setSaldo(e.target.value === "" ? "" : Number(e.target.value))}
          className="border p-2 rounded w-full mb-3"
        />

        <div className="flex gap-2">
          <button onClick={saveProfile} className="bg-orange-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
          <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }} className="bg-red-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>

      <WhatsAppFloating />
    </div>
  );
}
