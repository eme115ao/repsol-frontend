// src/pages/Register.tsx
import { useState } from "react";
import { apiPost } from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const inviter = params.get("ref") || null;

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost("/auth/register", {
        phone,
        password,
        invitedBy: inviter ? Number(inviter) : null,
      });

      alert("Registrado com sucesso!");
      navigate("/login");
    } catch (err: any) {
      alert("Erro ao registrar: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar Conta</h1>

      {inviter && (
        <p className="mb-3 text-sm text-green-600">
          Você está sendo convidado por ID: <b>{inviter}</b>
        </p>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          className="w-full border p-3 rounded"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Criar Conta"}
        </button>
      </form>
    </div>
  );
}
