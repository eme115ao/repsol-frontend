// src/components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 text-white w-full py-3 rounded-xl shadow font-semibold hover:bg-red-600 transition"
    >
      Terminar Sessão
    </button>
  );
}
