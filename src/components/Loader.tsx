// src/components/Loader.tsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-orange-600">
      <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-2"></div>
      <p className="text-xs font-semibold">Carregando...</p>
    </div>
  );
}
