import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import WhatsAppFloating from "./WhatsAppFloating";

export default function AppLayout() {
  const loc = useLocation();

  // Tratamento correto para HashRouter
  const current =
    loc.hash && loc.hash.startsWith("#/")
      ? loc.hash.replace("#", "")
      : loc.pathname;

  // Títulos fixos da aplicação
  const titles: Record<string, string> = {
    "/inicio": "Início",
    "/dashboard": "Dashboard",
    "/produtos": "Produtos",
    "/loja": "Minha Loja",
    "/deposito": "Depósito",
    "/deposito/confirmar": "Confirmar Depósito",
    "/levantamento": "Levantamento",
    "/historico": "Histórico",
    "/meubanco": "Meu Banco",
    "/regras": "Regras",
    "/equipa": "Equipa",     // CORRIGIDO
    "/minha": "Minha Conta"
  };

  // Páginas onde Navbar e BottomNav devem sumir
  const hideNav = [
    "/produto/",       // CORRETO para páginas de produto
    "/admin",
    "/admin/dashboard",
    "/admin/transacoes"
  ];

  const shouldHide = hideNav.some((prefix) => current.startsWith(prefix));

  // Títulos dinâmicos
  let title = titles[current] || "";

  if (current.startsWith("/produto/")) title = "Detalhes do Produto";
  if (current.startsWith("/deposito/confirmar")) title = "Confirmar Depósito";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!shouldHide && <Navbar title={title} />}

      <main className="flex-1 w-full max-w-md mx-auto">
        <Outlet />
      </main>

      {!shouldHide && <BottomNav />}
      {!shouldHide && <WhatsAppFloating />}
    </div>
  );
}
