// src/components/BottomNav.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLayers, FiUsers, FiUser } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 pb-safe">
      <div className="max-w-md mx-auto flex justify-between px-6 py-2 h-16">

        {/* Início */}
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[60px] gap-0 leading-none ${
              isActive ? "text-orange-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <FiHome size={22} />
          <span className="text-[11px]">Início</span>
        </NavLink>

        {/* Produtos */}
        <NavLink
          to="/produtos"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[60px] gap-0 leading-none ${
              isActive ? "text-orange-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <FiLayers size={22} />
          <span className="text-[11px]">Produtos</span>
        </NavLink>

        {/* Equipa */}
        <NavLink
          to="/equipa"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[60px] gap-0 leading-none ${
              isActive ? "text-orange-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <FiUsers size={22} />
          <span className="text-[11px]">Equipa</span>
        </NavLink>

        {/* Minha Conta */}
        <NavLink
          to="/minha"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[60px] gap-0 leading-none ${
              isActive ? "text-orange-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <FiUser size={22} />
          <span className="text-[11px]">Minha</span>
        </NavLink>

      </div>
    </nav>
  );
}
