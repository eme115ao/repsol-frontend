// src/pages/AdminPanel.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPanel() {
  const [allowed, setAllowed] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    // Só permite se telefone igual ao admin "934096717"
    if (phone === "934096717") {
      setAllowed(true);
      loadUsers();
    } else {
      setAllowed(false);
    }
  }, [phone]);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users"); // endpoint hipotético, pode falhar se não existir
      setUsers(res.data);
    } catch (err) {
      // ignore — backend pode não ter rota admin
    }
  };

  if (!allowed) return <div className="p-6">Painel admin não disponível para este usuário.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Painel Admin</h1>
      <div className="mb-4">Você está logada como admin (telefone: {phone}).</div>

      <div>
        <h2 className="font-semibold mb-2">Usuários</h2>
        {users.length === 0 ? (
          <div className="text-gray-500">Sem dados de usuários (ou rota admin não implementada).</div>
        ) : (
          <ul>
            {users.map((u: any) => (
              <li key={u.id} className="mb-2">
                {u.phone} — {u.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
