// src/pages/Login.tsx
import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        phone,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", String(res.data.user.id));
      localStorage.setItem("userPhone", res.data.user.phone ?? phone);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Entrar</h1>

        <input
          type="text"
          placeholder="Telefone"
          className="w-full mb-3 p-2 border rounded bg-blue-50"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 border rounded bg-blue-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
          Entrar
        </button>

        <div className="text-center mt-3 text-sm">
          Não tem conta? <a href="/register" className="text-blue-600 underline">Criar agora</a>
        </div>
      </form>
    </div>
  );
}
