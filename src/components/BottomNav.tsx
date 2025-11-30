// src/components/BottomNav.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLayers, FiUsers, FiUser } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-between px-6 py-2 text-xs text-gray-600">

        {/* Início */}
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiHome size={20} />
          <span>Início</span>
        </NavLink>

        {/* Produtos */}
        <NavLink
          to="/produtos"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiLayers size={20} />
          <span>Produtos</span>
        </NavLink>

        {/* Equipa */}
        <NavLink
          to="/equipa"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiUsers size={20} />
          <span>Equipa</span>
        </NavLink>

        {/* Minha Conta */}
        <NavLink
          to="/minha"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiUser size={20} />
          <span>Minha</span>
        </NavLink>

      </div>
    </nav>
  );
}
