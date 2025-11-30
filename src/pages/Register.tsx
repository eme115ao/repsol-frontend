// src/pages/Register.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiPost } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  const code = params.get("ref");
  if (code) setInviteCode(code);
}, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiPost("/api/auth/register", {
        phone,
        password,
        inviteCode: inviteCode || undefined,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id);
      localStorage.setItem("phone", res.user.phone);
      localStorage.setItem("inviteCode", res.user.inviteCode);

      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="w-full flex justify-center mb-4">
          <img src="/logo.png" alt="Repsol" className="w-20 h-20 rounded-full shadow" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Criar Conta</h2>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <div className="flex items-stretch gap-2 mb-3">
          <div className="bg-orange-500 text-white px-3 py-3 rounded">+244</div>

          <input
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 p-3 border rounded"
          />
        </div>

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 p-3 border rounded w-full"
        />

        <input
          placeholder="Código convite (opcional)"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded w-full font-semibold"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>

        <div className="text-center mt-4 text-sm">
          Já tem conta?{" "}
          <a href="/login" className="text-orange-600 font-semibold">
            Entrar
          </a>
        </div>
      </form>
    </div>
  );
}
