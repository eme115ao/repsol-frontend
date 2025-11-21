// src/components/Layout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r p-6">
        <div className="text-2xl font-bold mb-8">Repsol</div>
        <nav className="space-y-3">
          <Link to="/" className="block">Início</Link>
          <Link to="/produtos" className="block">Produtos</Link>
          <Link to="/dashboard" className="block">Dashboard</Link>
          <Link to="/historico" className="block">Histórico</Link>
          <Link to="/perfil" className="block">Perfil</Link>
          <Link to="/admin" className="block">Admin</Link>
          <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} className="mt-8 text-red-600">Sair</button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
