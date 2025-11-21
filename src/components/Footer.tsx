// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const isLogged = !!localStorage.getItem("token");

  return (
    <footer className="bg-gray-50 border-t mt-6">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <strong>Repsol</strong> © {new Date().getFullYear()}
        </div>
        <div className="flex gap-3 items-center">
          <Link to="/terms" className="text-sm">Termos</Link>
          <Link to="/privacy" className="text-sm">Privacidade</Link>
          {isLogged ? <Link to="/dashboard" className="text-sm">Minha Conta</Link> : <Link to="/login" className="text-sm">Entrar</Link>}
        </div>
      </div>
    </footer>
  );
}
