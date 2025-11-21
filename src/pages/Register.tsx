// src/pages/Register.tsx
import { useState } from "react";
import { apiPost } from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const inviteCode = params.get("ref") || null;

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        phone,
        password,
        inviteCode
      };

      const res = await apiPost("/auth/register", payload);

      alert("Registrado com sucesso!");
      navigate("/login");
    } catch (err: any) {
      alert(err.message || "Erro ao registrar.");
    }

    setLoading(false);
  }

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar Conta</h1>

      {inviteCode && (
        <p className="text-green-600 text-sm text-center mb-3">
          Código de convite: <b>{inviteCode}</b>
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
          className="w-full bg-orange-600 text-white py-3 rounded"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Criar Conta"}
        </button>
      </form>
    </div>
  );
}
