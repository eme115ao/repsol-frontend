import { useState } from "react";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  // Edite estes links conforme quiser
  const gerente = "https://wa.me/934096717"; // gerente
  const grupo = "https://chat.whatsapp.com/SEU_LINK_DO_GRUPO"; // grupo

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {open && (
        <div className="mb-2 flex flex-col gap-2">
          <a href={gerente} target="_blank" rel="noreferrer" className="bg-white px-3 py-2 rounded shadow text-sm">
            Falar com gerente
          </a>
          <a href={grupo} target="_blank" rel="noreferrer" className="bg-white px-3 py-2 rounded shadow text-sm">
            Entrar no grupo
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((s) => !s)}
        className="w-14 h-14 rounded-full bg-green-500 shadow-lg text-white flex items-center justify-center"
        aria-label="WhatsApp"
      >
        W
      </button>
    </div>
  );
}
