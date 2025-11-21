// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
