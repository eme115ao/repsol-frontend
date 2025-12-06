import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiGet, endpoints } from "../services/api";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Se não tiver token → sai imediatamente
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Validação silenciosa da sessão
  useEffect(() => {
    async function validar() {
      try {
        await apiGet(endpoints.me); // fundo, sem bloquear tela
      } catch {
        localStorage.clear();
        window.location.href = "/#/login";
      }
    }
    validar();
  }, [location.pathname]);

  // Interface aparece sempre imediatamente
  return children;
}
