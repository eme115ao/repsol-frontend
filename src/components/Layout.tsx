// src/components/Layout.tsx
import React from "react";
import BottomNav from "./BottomNav";

interface Props {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto w-full px-4 pb-24">
        {children}
      </div>

      {showNav && <BottomNav />}
    </div>
  );
}
