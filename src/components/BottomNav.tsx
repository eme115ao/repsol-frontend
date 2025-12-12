import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLayers, FiUsers, FiUser } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 shadow-xl z-50">
      <div className="mx-auto w-full max-w-md flex justify-between px-6 py-3 text-gray-700">

        {/* ITEM */}
        <NavItem to="/inicio" icon={FiHome} label="Início" />

        <NavItem to="/produtos" icon={FiLayers} label="Produtos" />

        <NavItem to="/equipa" icon={FiUsers} label="Equipa" />

        <NavItem to="/minha" icon={FiUser} label="Minha" />

      </div>
    </nav>
  );
}

/** Subcomponente para deixar o código mais limpo */
function NavItem({ to, icon: Icon, label }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 transition-all duration-200 ${
          isActive ? "text-orange-600 font-semibold scale-[1.08]" : "opacity-80"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative flex items-center justify-center">
            <Icon size={28} />

            {/* Indicador de ativo */}
            {isActive && (
              <span className="absolute -bottom-2 w-2 h-2 bg-orange-600 rounded-full"></span>
            )}
          </div>

          <span className="text-sm leading-tight">{label}</span>
        </>
      )}
    </NavLink>
  );
}
