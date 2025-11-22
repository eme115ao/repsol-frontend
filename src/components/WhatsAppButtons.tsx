// src/components/WhatsAppButton.tsx
import React, { useState } from "react";

type Props = {
  managerPhone: string; // e.g. +244975658117
  groupLink: string;
};

export default function WhatsAppButton({ managerPhone, groupLink }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 60 }}>
      <div className="flex flex-col items-end gap-2">
        {open && (
          <div className="flex flex-col gap-2 mb-2">
            <a
              href={`https://wa.me/${managerPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white border rounded shadow text-sm"
            >
              Falar com Gerente
            </a>
            <a
              href={groupLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white border rounded shadow text-sm"
            >
              Entrar no Grupo
            </a>
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="WhatsApp"
          className="p-3 rounded-full bg-green-500 shadow-lg text-white"
        >
          {open ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
}
