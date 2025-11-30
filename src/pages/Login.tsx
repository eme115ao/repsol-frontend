import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../services/api";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      // ROTA CORRETA DO BACKEND
      const res = await apiPost("/api/auth/login", { phone, password });

      if (!res || !res.token) {
        throw new Error("Resposta inesperada do servidor");
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", String(res.user.id));
      localStorage.setItem("phone", res.user.phone);
      localStorage.setItem("inviteCode", res.user.inviteCode || "");

      navigate("/home");
    } catch (error: any) {
      const backendMsg =
        error?.response?.data?.message || error.message || "Erro ao entrar";
      setErr(backendMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow w-full max-w-md text-center"
      >
        <img
          src="/logo.png"
          alt="Repsol"
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />

        <h2 className="text-2xl font-bold text-orange-600 mb-1">
          REPSOL ANGOLA S.A.
        </h2>
        <p className="text-sm text-gray-500 mb-6">Faça login para continuar</p>

        {err && <div className="text-sm text-red-600 mb-3">{err}</div>}

        <input
          placeholder="Número de telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-3 p-3 border rounded w-full text-sm"
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-3 border rounded w-full text-sm"
        />

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded w-full font-semibold text-sm"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="text-center mt-4 text-sm">
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-orange-600 font-semibold">
            Criar conta
          </Link>
        </div>
      </form>
    </div>
  );
}
