// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-md py-3 px-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <Link to="/dashboard" className="text-lg font-bold text-orange-600">
        Repsol Invest
      </Link>

      <Link to="/perfil">
        <img
          src="/assets/user.png"
          alt="perfil"
          className="w-9 h-9 rounded-full border"
        />
      </Link>
    </header>
  );
}
