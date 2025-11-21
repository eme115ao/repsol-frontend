// src/components/Loader.tsx
import React from "react";

export default function Loader({ text = "A carregar..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="text-gray-500">{text}</div>
    </div>
  );
}
