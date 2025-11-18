import { useState } from "react";

export default function WhatsAppFloating() {
  const [open, setOpen] = useState(false);

  const gerente = "https://wa.me/244947565811";
  const grupo = "https://chat.whatsapp.com/HutYfZBPKRd4ORkeV2iN11";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-2 flex flex-col gap-2 items-end">
          <a
            href={gerente}
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            💬 Falar com o gerente
          </a>

          <a
            href={grupo}
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            📲 Aderir ao grupo
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        aria-label="WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.52 3.48A11.95 11.95 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.093 1.6 5.86L0 24l6.45-1.667A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.244-6.19-3.48-8.52z"
            fill="currentColor"
            opacity="0.12"
          />
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.148-.198.297-.77.967-.945 1.165-.174.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.884-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.52-.075-.148-.672-1.618-.922-2.218-.243-.581-.49-.502-.672-.512l-.573-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.463 1.063 2.883 1.212 3.081.149.198 2.095 3.2 5.077 4.487 2.982 1.288 2.982.858 3.52.804.538-.056 1.758-.72 2.006-1.414.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
