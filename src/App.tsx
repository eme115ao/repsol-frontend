// src/App.tsx
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

/* Páginas públicas */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Páginas internas */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Produtos from "./pages/Produtos";
import ProductDetail from "./pages/ProductDetail";

import Loja from "./pages/Loja";
import Deposito from "./pages/Deposito";
import ConfirmarDeposito from "./pages/ConfirmarDeposito";
import DepositoSucesso from "./pages/DepositoSucesso";

import Levantamento from "./pages/Levantamento";
import LevantamentoSucesso from "./pages/LevantamentoSucesso";

import Historico from "./pages/Historico";
import MeuBanco from "./pages/MeuBanco";

import Convidar from "./pages/Convidar";
import Equipa from "./pages/Equipa";

import Regras from "./pages/Regras";
import Minha from "./pages/Minha";

export default function App() {
  return (
    <HashRouter>
      <Routes>

        {/* Rota inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Home */}
          <Route path="/home" element={<Home />} />
          <Route path="/inicio" element={<Navigate to="/home" replace />} />

          {/* Produtos */}
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProductDetail />} />

          {/* Loja */}
          <Route path="/loja" element={<Loja />} />

          {/* Depósitos */}
          <Route path="/deposito" element={<Deposito />} />
          <Route path="/deposito/confirmar" element={<ConfirmarDeposito />} />
          <Route path="/deposito/sucesso" element={<DepositoSucesso />} />

          {/* Levantamento */}
          <Route path="/levantamento" element={<Levantamento />} />
          <Route path="/levantamento/sucesso" element={<LevantamentoSucesso />} />

          {/* Histórico */}
          <Route path="/historico" element={<Historico />} />

          {/* Banco */}
          <Route path="/meubanco" element={<MeuBanco />} />

          {/* Convites */}
          <Route path="/convidar" element={<Convidar />} />
          <Route path="/equipa" element={<Equipa />} />

          {/* Outras páginas */}
          <Route path="/regras" element={<Regras />} />
          <Route path="/minha" element={<Minha />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </HashRouter>
  );
}
