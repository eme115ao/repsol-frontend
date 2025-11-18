// src/components/WhatsAppButtons.tsx
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButtons() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {open && (
        <div className="flex flex-col gap-2 mb-2">
          <a
            href="https://wa.me/244947565811"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            💬 Falar com o gerente
          </a>
          <a
            href="https://chat.whatsapp.com/HutYfZBPKRd4ORkeV2iN11"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            📲 Aderir ao grupo
          </a>
        </div>
      )}

      <motion.button
        onClick={() => setOpen((s) => !s)}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        whileHover={{ scale: 1.05 }}
      >
        <FaWhatsapp size={22} />
      </motion.button>
    </motion.div>
  );
}
