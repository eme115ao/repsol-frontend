// src/pages/Minha.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Minha() {
  const phone = localStorage.getItem("phone") || "Usuário";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>
      <div className="bg-white p-6 rounded shadow max-w-md space-y-3">
        <div className="font-semibold text-lg">{phone}</div>

        <Link to="/perfil" className="block text-orange-600">Perfil</Link>
        <Link to="/meubanco" className="block text-orange-600">Meu Banco</Link>
        <Link to="/historico" className="block text-orange-600">Histórico</Link>
        <Link to="/equipas" className="block text-orange-600">Equipa</Link>
        <Link to="/convidar" className="block text-orange-600">Convidar Amigos</Link>

        <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} className="mt-4 text-red-600">Sair</button>
      </div>
    </div>
  );
}
