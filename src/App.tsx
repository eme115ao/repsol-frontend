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
import Produtos from "./pages/Produtos";
import ProductDetail from "./pages/ProductDetail";
import Loja from "./pages/Loja";

/* Depósitos */
import Deposito from "./pages/Deposito";
import ConfirmarDeposito from "./pages/ConfirmarDeposito";
import DepositoSucesso from "./pages/DepositoSucesso";

/* Levantamento */
import Levantamento from "./pages/Levantamento";
import LevantamentoSucesso from "./pages/LevantamentoSucesso";

/* Outros */
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
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/inicio" element={<Navigate to="/home" replace />} />

          <Route path="/minha" element={<Minha />} />

          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProductDetail />} />

          <Route path="/loja" element={<Loja />} />

          <Route path="/deposito" element={<Deposito />} />
          <Route path="/deposito/confirmar" element={<ConfirmarDeposito />} />
          <Route path="/deposito/sucesso" element={<DepositoSucesso />} />

          <Route path="/levantamento" element={<Levantamento />} />
          <Route
            path="/levantamento/sucesso"
            element={<LevantamentoSucesso />}
          />

          <Route path="/historico" element={<Historico />} />
          <Route path="/meubanco" element={<MeuBanco />} />

          <Route path="/convidar" element={<Convidar />} />
          <Route path="/equipa" element={<Equipa />} />

          <Route path="/regras" element={<Regras />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}
