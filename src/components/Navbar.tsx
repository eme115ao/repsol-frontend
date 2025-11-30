// src/components/Navbar.tsx
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  title?: string;
}

export default function Navbar({ title = "" }: Props) {
  const navigate = useNavigate();
  const loc = useLocation();

  // Páginas raiz que NÃO mostram botão voltar
  const noBack = [
    "/home",
    "/produtos",
    "/convidar",
    "/historico",
    "/minha"
  ];

  const showBack = !noBack.includes(loc.pathname);

  return (
    <div className="w-full bg-white shadow px-4 py-3 flex items-center gap-3">
      {showBack && (
        <button onClick={() => navigate(-1)}>
          <FaChevronLeft className="text-gray-700" size={20} />
        </button>
      )}

      <h1 className="text-lg font-bold text-gray-800">{title}</h1>
    </div>
  );
}
