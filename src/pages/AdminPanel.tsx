// src/pages/AdminPanel.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Validação REAL no backend
        // Rota correta:
        // GET /auth/me  -> retorna { id, phone, inviteCode, role }
        const me = await apiGet("/auth/me");

        if (me?.role === "admin") {
          localStorage.setItem("isAdmin", "true");
          setAllowed(true);
        } else {
          localStorage.removeItem("isAdmin");
          setAllowed(false);
        }
      } catch (err) {
        console.error("Erro ao validar admin:", err);
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Verificando acesso...
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-center px-6">
        Acesso negado.  
        <br />
        Conta não possui privilégios administrativos.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Painel Administrativo
      </h1>

      <div className="space-y-4">
        <Link
          to="/admin/dashboard"
          className="block bg-white shadow border border-slate-200 rounded-xl p-4 font-semibold text-gray-700 hover:bg-slate-100 transition"
        >
          Dashboard Geral
        </Link>

        <Link
          to="/admin/transacoes"
          className="block bg-white shadow border border-slate-200 rounded-xl p-4 font-semibold text-gray-700 hover:bg-slate-100 transition"
        >
          Transações
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="w-full bg-red-600 text-white py-3 rounded-xl shadow font-semibold hover:bg-red-700 transition"
        >
          Sair do Admin
        </button>
      </div>
    </div>
  );
}
