// src/components/AppLayout.tsx
import React from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Conteúdo */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0 p-4">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
