// src/components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-white border-r border-slate-200 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <nav className="space-y-3">

        <Link className="block text-gray-700 font-medium" to="/inicio">
          Início
        </Link>

        <Link className="block text-gray-700 font-medium" to="/produtos">
          Produtos
        </Link>

        <Link className="block text-gray-700 font-medium" to="/loja">
          Loja
        </Link>

        <Link className="block text-gray-700 font-medium" to="/convidar">
          Convidar
        </Link>

        <Link className="block text-gray-700 font-medium" to="/minha">
          Minha Conta
        </Link>

        <Link className="block text-gray-700 font-medium" to="/historico">
          Histórico
        </Link>
      </nav>
    </div>
  );
}
