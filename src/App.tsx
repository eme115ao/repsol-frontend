// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import ProductDetail from "./pages/ProductDetail";

import Deposito from "./pages/Deposito";
import ConfirmarDeposito from "./pages/ConfirmarDeposito";
import Levantamento from "./pages/Levantamento";

import Historico from "./pages/Historico";
import Perfil from "./pages/Perfil";
import MeuBanco from "./pages/MeuBanco";
import Convidar from "./pages/Convidar";
import Regras from "./pages/Regras";
import Equipas from "./pages/Equipa";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Autenticadas */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProductDetail />} />

          <Route path="/deposito" element={<Deposito />} />
          <Route path="/deposito/confirmar" element={<ConfirmarDeposito />} />

          <Route path="/levantamento" element={<Levantamento />} />

          <Route path="/historico" element={<Historico />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/meubanco" element={<MeuBanco />} />

          <Route path="/convidar" element={<Convidar />} />
          <Route path="/regras" element={<Regras />} />
          <Route path="/equipas" element={<Equipas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
