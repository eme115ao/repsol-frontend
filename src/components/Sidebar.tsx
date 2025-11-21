// src/components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  ArrowDownToLine,
  History,
  User,
  Users,
  Gift,
  BookOpen
} from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard />, to: "/dashboard" },
    { label: "Produtos", icon: <ShoppingBag />, to: "/produtos" },
    { label: "Depósito", icon: <Wallet />, to: "/deposito" },
    { label: "Levantamento", icon: <ArrowDownToLine />, to: "/levantamento" },
    { label: "Histórico", icon: <History />, to: "/historico" },
    { label: "Meu Banco", icon: <Wallet />, to: "/meubanco" },
    { label: "Perfil", icon: <User />, to: "/perfil" },
    { label: "Equipa", icon: <Users />, to: "/equipas" },
    { label: "Convidar", icon: <Gift />, to: "/convidar" },
    { label: "Regras", icon: <BookOpen />, to: "/regras" }
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 fixed left-0 top-0">
      <h1 className="text-xl font-bold mb-6 text-orange-600">REPSOL</h1>

      <div className="space-y-2">
        {menu.map((m, idx) => (
          <Link
            key={idx}
            to={m.to}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              pathname === m.to
                ? "bg-orange-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {m.icon}
            <span>{m.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
