// src/components/AppLayout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import WhatsAppMenuButton from "./WhatsAppMenuButton";

export default function AppLayout() {
  const loc = useLocation();

  let current = loc.hash.startsWith("#/")
    ? loc.hash.replace("#", "")
    : loc.pathname;

  current = current.split("?")[0].split("#")[0];

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
    "/minha": "Minha Conta",
  };

  const hideNavPrefixes = [
    "/produto/",
    "/deposito/confirmar",
    "/admin",
    "/admin/dashboard",
    "/admin/transacoes",
  ];

  const shouldHide = hideNavPrefixes.some((prefix) =>
    current.startsWith(prefix)
  );

  let title = titles[current] || "";
  if (current.startsWith("/produto/")) title = "Detalhes do Produto";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      {!shouldHide && <Navbar title={title} />}

      <main className="flex-1 w-full max-w-md mx-auto">
        <Outlet />
      </main>

      {!shouldHide && <BottomNav />}
      {!shouldHide && <WhatsAppMenuButton />}
    </div>
  );
}
