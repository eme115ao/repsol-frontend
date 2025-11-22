// src/components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // if you use any other persisted state clear here
    navigate("/login");
    // optionally reload to reset in-memory state
    setTimeout(() => window.location.reload(), 200);
  }

  return (
    <button
      onClick={logout}
      className="w-full bg-red-600 text-white py-2 rounded hover:opacity-95"
    >
      Logout
    </button>
  );
}
