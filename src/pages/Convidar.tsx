// src/pages/Convidar.tsx
import { useEffect, useState } from "react";
import { getReferrals, buildInviteLink } from "../services/referralService";

export default function Convidar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const inviteCode = user?.inviteCode || null;

  const [lista, setLista] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getReferrals(userId);
        setLista(res);
      } catch (err: any) {
        console.error(err);
      }
    }
    load();
  }, []);

  const link = buildInviteLink(userId, inviteCode);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">Convidar</h1>

      <p className="mb-3">Seu link de convite:</p>

      <div className="bg-gray-100 p-3 rounded break-all mb-4">
        {link}
      </div>

      <h2 className="text-xl font-semibold mb-2">Seus convidados</h2>

      {lista.length === 0 && <p>Nenhum convidado ainda.</p>}

      {lista.length > 0 && (
        <ul className="space-y-2">
          {lista.map((i) => (
            <li key={i.id} className="p-3 bg-white shadow rounded">
              <p>ID: {i.referredUser?.id}</p>
              <p>Telefone: {i.referredUser?.phone}</p>
              <p>Data: {new Date(i.referredUser?.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
