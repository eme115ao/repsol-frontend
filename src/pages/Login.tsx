// src/pages/Login.tsx
import { useState } from "react";
import { apiPost } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { phone, password };
      const res = await apiPost("/auth/login", data);

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", String(res.user.id));
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/dashboard");
    } catch (err: any) {
      alert("Erro ao fazer login: " + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Entrar</h1>

      <form onSubmit={handleLogin} className="space-y-4">
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
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
