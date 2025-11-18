import { useEffect, useState } from "react";
import api from "../services/api";

export default function Convidar() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/referral/link")
      .then((res) => setLink(res.data.link))
      .catch(() => setLink("Erro ao gerar link"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Convidar Amigos</h1>
      {loading ? (
        <p>Gerando link...</p>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="mb-2">Envie este link aos seus convidados:</p>
          <input
            type="text"
            value={link}
            readOnly
            className="border p-2 rounded w-80 text-center"
          />
          <button
            onClick={() => navigator.clipboard.writeText(link)}
            className="bg-orange-500 text-white px-4 py-2 rounded mt-3 hover:bg-orange-600 transition"
          >
            Copiar
          </button>
        </div>
      )}
    </div>
  );
}
