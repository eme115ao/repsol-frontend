import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { FaUsers } from "react-icons/fa";

interface Overview {
  inviteCode: string;
  totalInvites: number;
  levelData: {
    level1: number;
    level2: number;
    level3: number;
  };
  team: {
    id: number;
    phone: string;
    createdAt: string;
    level: number;
  }[];
}

export default function ReferralDashboard() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet<Overview>("/api/referral/overview");
        setData(res);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-md mx-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard de Referências
      </h1>

      {/* Estatísticas principais */}
      <div className="bg-white shadow rounded-xl p-4 border mb-6">
        <p className="text-gray-700 font-semibold">Código de convite:</p>
        <p className="text-xl font-bold text-orange-600">{data.inviteCode}</p>

        <div className="mt-4">
          <p className="text-gray-700 font-semibold">Total de convidados:</p>
          <p className="text-2xl font-bold text-orange-600">
            {data.totalInvites}
          </p>
        </div>
      </div>

      {/* Níveis */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border text-center">
          <p className="font-semibold text-gray-700">Nível 1</p>
          <p className="text-xl text-orange-600">{data.levelData.level1}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border text-center">
          <p className="font-semibold text-gray-700">Nível 2</p>
          <p className="text-xl text-orange-600">{data.levelData.level2}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border text-center">
          <p className="font-semibold text-gray-700">Nível 3</p>
          <p className="text-xl text-orange-600">{data.levelData.level3}</p>
        </div>
      </div>

      {/* Lista da equipe */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">Minha Equipa</h2>

      {data.team.length === 0 && (
        <p className="text-gray-500">Nenhum membro na equipa.</p>
      )}

      <div className="space-y-3">
        {data.team.map((m) => (
          <div
            key={m.id}
            className="bg-white p-4 rounded-xl shadow border flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <FaUsers />
            </div>

            <div>
              <p className="font-semibold">#{m.id} • {m.phone}</p>
              <p className="text-sm text-gray-600">
                Nível {m.level} • {new Date(m.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
