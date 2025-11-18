// src/components/Navbar.tsx
import React from "react";

export default function Navbar() {
  const phone = localStorage.getItem("userPhone");
  const isLogged = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userPhone");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-orange-600 text-white py-3 shadow">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-bold text-lg">Repsol</span>

          <div className="ml-6 flex gap-4">
            <a href="/dashboard" className="hover:underline">Dashboard</a>
            <a href="/products" className="hover:underline">Produtos</a>
            <a href="/deposito" className="hover:underline">Depósito</a>
            <a href="/levantamento" className="hover:underline">Levantamento</a>
            <a href="/historico" className="hover:underline">Histórico</a>
            <a href="/perfil" className="hover:underline">Perfil</a>
            {phone === "934096717" && <a href="/admin" className="hover:underline">Admin</a>}
          </div>
        </div>

        <div>
          {isLogged ? (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Sair</button>
          ) : (
            <a href="/login" className="bg-white text-orange-600 px-3 py-1 rounded">Entrar</a>
          )}
        </div>
      </div>
    </nav>
  );
}
