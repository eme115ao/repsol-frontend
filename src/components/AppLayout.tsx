// src/components/AppLayout.tsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButtons";
import LogoutButton from "./LogoutButton";

export default function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6 border-b">
          <Link to="/" className="text-2xl font-bold text-orange-600">REPSOL</Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/dashboard">
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/produtos">
                <span>Produtos</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/loja">
                <span>Loja</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/deposito">
                <span>Depósito</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/levantamento">
                <span>Levantamento</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/historico">
                <span>Histórico</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/meubanco">
                <span>Meu Banco</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/perfil">
                <span>Perfil</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/convidar">
                <span>Convidar</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 p-3 rounded hover:bg-orange-50" to="/regras">
                <span>Regras</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-h-screen">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div />
          <div className="flex items-center gap-3">
            {/* Place for profile / small actions */}
            <button
              className="hidden md:inline-block text-sm px-3 py-1 border rounded"
              onClick={() => {
                const t = localStorage.getItem("token");
                alert(t ? "Autenticado" : "Sem sessão");
              }}
            >
              Status
            </button>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* WhatsApp floating with two options */}
      <WhatsAppButton
        managerPhone="+244975658117"
        groupLink="https://chat.whatsapp.com/Dg1G3Kdinhq7zvE1MZSKcx?mode=hqrt3"
      />
    </div>
  );
}
