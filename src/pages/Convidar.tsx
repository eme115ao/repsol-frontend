// src/pages/Convidar.tsx
import { useEffect, useState } from "react";
import { getReferrals, buildInviteLink } from "../services/referralService";
import { apiGet } from "../services/api";

export default function Convidar() {
  const [userId, setUserId] = useState<number | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [lista, setLista] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados do usuário logado
  useEffect(() => {
    async function loadUser() {
      try {
        const perfil = await apiGet<any>("/auth/me");

        setUserId(perfil.id);
        setInviteCode(perfil.inviteCode || null);

        const link = buildInviteLink(perfil.id, perfil.inviteCode);
        setInviteLink(link);

        const refe = await getReferrals(perfil.id);
        setLista(refe);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) return <div className="p-4 text-center">Carregando…</div>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-3">Convide Pessoas</h1>

      <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-gray-700">
        <p className="mb-2">Seu link de convite:</p>

        <input
          value={inviteLink}
          readOnly
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <button
          className="mt-3 w-full bg-blue-600 p-2 rounded font-semibold"
          onClick={() => {
            navigator.clipboard.writeText(inviteLink);
            alert("Link copiado!");
          }}
        >
          Copiar link
        </button>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-3">Convidados</h2>

      {lista.length === 0 ? (
        <p>Nenhum convidado encontrado.</p>
      ) : (
        <div className="space-y-3">
          {lista.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-3 rounded border border-gray-700"
            >
              <p>
                <strong>Telefone:</strong>{" "}
                {item.referredUser?.phone || "N/A"}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {item.referredUser?.createdAt
                  ? new Date(item.referredUser.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
