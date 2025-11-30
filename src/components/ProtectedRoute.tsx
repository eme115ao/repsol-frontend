// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiGet } from "../services/api";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSession() {
      const token = localStorage.getItem("token");

      if (!token) {
        setValid(false);
        return;
      }

      try {
        // ROTA CORRETA
        await apiGet("/api/auth/me");

        setValid(true);
      } catch (err) {
        console.error("Sessão inválida:", err);

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("phone");
        localStorage.removeItem("inviteCode");

        setValid(false);
      }
    }

    checkSession();
  }, []);

  if (valid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Validando sessão...
      </div>
    );
  }

  if (valid === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
