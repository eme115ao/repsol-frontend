import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLayers, FiUsers, FiUser } from "react-icons/fi";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 shadow-xl z-50">
      <div className="mx-auto w-full max-w-md flex justify-between px-5 py-2.5 text-gray-700">
        <NavItem to="/inicio" icon={FiHome} label="Início" />
        <NavItem to="/produtos" icon={FiLayers} label="Produtos" />
        <NavItem to="/equipa" icon={FiUsers} label="Equipa" />
        <NavItem to="/minha" icon={FiUser} label="Minha" />
      </div>
    </nav>
  );
}

/* Subcomponente mais limpo e profissional */
function NavItem({ to, icon: Icon, label }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 transition-all duration-200 ${
          isActive ? "text-orange-600 font-semibold scale-[1.05]" : "opacity-80"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative flex items-center justify-center">
            {/* Ícone em tamanho reduzido: 24px */}
            <Icon size={24} />

            {/* Indicador de ativo (ponto inferior) */}
            {isActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            )}
          </div>

          {/* Label compacta e elegante */}
          <span className="text-[11px] leading-tight">{label}</span>
        </>
      )}
    </NavLink>
  );
}
