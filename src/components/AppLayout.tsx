// src/components/AppLayout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  const loc = useLocation();

  // Normalizar caminho REAL quando usando HashRouter
  let current = loc.hash.startsWith("#/")
    ? loc.hash.replace("#", "")
    : loc.pathname;

  // Remover query params e anchors do caminho
  current = current.split("?")[0].split("#")[0];

  // ----------------------
  // Títulos oficiais
  // ----------------------
  const titles: Record<string, string> = {
    "/home": "Início",
    "/inicio": "Início",
    "/produtos": "Produtos",
    "/loja": "Minha Loja",
    "/deposito": "Depósito",
    "/deposito/confirmar": "Confirmar Depósito",
    "/deposito/sucesso": "Depósito Sucesso",
    "/levantamento": "Levantamento",
    "/levantamento/sucesso": "Levantamento Sucesso",
    "/historico": "Historico",
    "/meubanco": "Meu Banco",
    "/regras": "Regras",
    "/convidar": "Convidar",
    "/equipa": "Equipa",
    "/minha": "Minha Conta"
  };

  // ----------------------
  // Páginas que escondem Navbar e BottomNav
  // ----------------------
  const hideNavPrefixes = [
    "/produto/",
    "/deposito/confirmar",
    "/admin",
    "/admin/dashboard",
    "/admin/transacoes"
  ];

  const shouldHide = hideNavPrefixes.some((prefix) =>
    current.startsWith(prefix)
  );

  // ----------------------
  // Título dinâmico
  // ----------------------
  let title = titles[current] || "";

  if (current.startsWith("/produto/")) {
    title = "Detalhes do Produto";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!shouldHide && <Navbar title={title} />}

      <main className="flex-1 w-full max-w-md mx-auto">
        <Outlet />
      </main>

      {!shouldHide && <BottomNav />}

      {/* WhatsAppFloating removido para evitar erro e usar apenas o botão da Home */}
    </div>
  );
}
