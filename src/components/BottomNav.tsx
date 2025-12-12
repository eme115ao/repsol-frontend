// src/components/BottomNav.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLayers, FiUsers, FiUser } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="mx-auto w-full max-w-md flex justify-between px-3 py-1 text-[11px] text-gray-600">

        {/* Início */}
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiHome size={18} />
          <span className="leading-tight">Início</span>
        </NavLink>

        {/* Produtos */}
        <NavLink
          to="/produtos"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiLayers size={18} />
          <span className="leading-tight">Produtos</span>
        </NavLink>

        {/* Equipa */}
        <NavLink
          to="/equipa"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiUsers size={18} />
          <span className="leading-tight">Equipa</span>
        </NavLink>

        {/* Minha */}
        <NavLink
          to="/minha"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${
              isActive ? "text-orange-600 font-semibold" : ""
            }`
          }
        >
          <FiUser size={18} />
          <span className="leading-tight">Minha</span>
        </NavLink>

      </div>
    </nav>
  );
}
