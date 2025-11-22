// src/pages/Equipa.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Equipa() {
  const userId = Number(localStorage.getItem("userId"));
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet(`/api/referral/my/${userId}`);
        setMembers(res || []);
      } catch (err) {
        console.error("Equipa:", err);
      }
    })();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Equipa</h1>

      {members.length === 0 && <div className="text-gray-500">Nenhum membro ainda.</div>}

      <div className="space-y-3">
        {members.map(m => (
          <div key={m.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">ID: {m.id}</div>
              <div className="text-sm text-gray-500">{m.phone}</div>
            </div>
            <div className="text-sm text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
