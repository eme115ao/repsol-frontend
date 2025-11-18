// src/pages/Register.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("REPSOL-0001"); // default
  const [error, setError] = useState("");

  useEffect(() => {
    // se existe ?invite=... no URL, usa
    const params = new URLSearchParams(window.location.search);
    const invite = params.get("invite");
    if (invite) setInviteCode(invite);
  }, []);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      // corpo de registro mínimo (ajuste conforme API)
      await api.post("/auth/register", {
        phone,
        password,
        inviteCode,
      });

      // após registro, tentar login automático
      const loginRes = await api.post("/auth/login", { phone, password });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("userId", String(loginRes.data.user.id));
      localStorage.setItem("userPhone", loginRes.data.user.phone ?? phone);

      window.location.href = "/dashboard";
    } catch (err: any) {
      // mostrar mensagem vinda do backend se existir
      const msg = err?.response?.data?.message || "Erro ao registrar. Verifique os dados.";
      setError(msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Criar Conta</h1>

        <input
          type="text"
          placeholder="Número de Telefone"
          className="w-full mb-3 p-2 border rounded bg-blue-50"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-3 p-2 border rounded bg-blue-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Código de Convite"
          className="w-full mb-4 p-2 border rounded bg-white"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
          Registrar
        </button>

        <div className="text-center mt-3 text-sm">
          Já possui conta? <a href="/login" className="text-blue-600 underline">Entrar</a>
        </div>
      </form>
    </div>
  );
}
