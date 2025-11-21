// src/components/BottomNav.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, User } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();

  const menu = [
    { icon: <Home />, to: "/dashboard" },
    { icon: <Wallet />, to: "/deposito" },
    { icon: <User />, to: "/perfil" }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around p-3">
      {menu.map((m, i) => (
        <Link
          key={i}
          to={m.to}
          className={`p-2 ${
            pathname === m.to ? "text-orange-600" : "text-gray-400"
          }`}
        >
          {m.icon}
        </Link>
      ))}
    </div>
  );
}
