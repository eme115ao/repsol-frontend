import React, { useEffect, useState } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getReferralStats } from "../services/referralStats";

interface LevelUser {
  id: number;
  phone: string;
  createdAt: string;
}

export default function Equipa() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState("");
  const [stats, setStats] = useState({
    commissionsToday: 0,
    commissionsYesterday: 0,
    commissionsTotal: 0,
    teamDeposits: 0,
    teamWithdrawals: 0,
    teamMembersTotal: 0,
    level1: [] as LevelUser[],
    level2: [] as LevelUser[],
  });

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const inviteURL = `${window.location.origin}/register?code=${inviteCode}`;

  useEffect(() => {
    async function load() {
      try {
        const data = await getReferralStats();

        setStats(data);
        setInviteCode(data.inviteCode || "N/A");
      } catch (err) {
        console.error("Erro carregando estatísticas:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(inviteURL);
    setCopyStatus("copied");
    setTimeout(() => setCopyStatus("idle"), 1200);
  }

  // Avatar baseado no ID
  function getAvatarColor(id: number) {
    const colors = ["#F97316", "#3B82F6", "#10B981", "#EAB308", "#6366F1"];
    return colors[id % colors.length];
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* HEADER */}
      <header className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-20">
        <ArrowLeft
          size={22}
          onClick={() => navigate("/minha")}
          className="cursor-pointer text-gray-700 active:scale-90 transition"
        />
        <h1 className="text-lg font-bold">Minha Equipa</h1>
      </header>

      <div className="p-4 max-w-[550px] mx-auto mt-2">

        {/* GRID PRINCIPAL IGUAL AO MODELO */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
            <p className="text-sm text-gray-600">Comissões Hoje</p>
            <h2 className="text-2xl font-bold text-blue-700">
              {stats.commissionsToday.toFixed(2)}
            </h2>
          </div>

          <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
            <p className="text-sm text-gray-600">Comissões Ontem</p>
            <h2 className="text-2xl font-bold text-blue-700">
              {stats.commissionsYesterday.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-sm text-gray-600">Total de Comissões</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.commissionsTotal.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-sm text-gray-600">Total de Membros</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.teamMembersTotal}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-sm text-gray-600">Depósitos da Equipe</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.teamDeposits.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-sm text-gray-600">Saques da Equipe</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.teamWithdrawals.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* LINK DE REFERÊNCIA */}
        <div className="bg-white border shadow-sm rounded-xl p-5 mb-6">
          <p className="text-gray-600 text-sm mb-2">Link de Referência:</p>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm"
              value={inviteURL}
              readOnly
            />
            <button
              onClick={copyLink}
              className="bg-blue-600 text-white p-2 rounded-lg active:scale-95"
            >
              <Copy size={18} />
            </button>
          </div>

          {copyStatus === "copied" && (
            <p className="text-green-500 text-sm mt-2">Link copiado!</p>
          )}
        </div>

        {/* LISTA DE NÍVEIS */}
        <div className="bg-white border shadow-sm rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Tamanho da Equipa</h3>

          {/* Nível 1 */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-700 mb-2">Agente Nível 1</h4>

            {stats.level1.length === 0 ? (
              <p className="text-gray-500 text-sm">0 Pessoas</p>
            ) : (
              stats.level1.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg mb-2"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: getAvatarColor(m.id) }}
                  >
                    {m.phone.slice(-2)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{m.phone}</p>
                    <p className="text-xs text-gray-500">
                      Desde {new Date(m.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Nível 2 */}
          <div>
            <h4 className="font-bold text-gray-700 mb-2">Agente Nível 2</h4>

            {stats.level2.length === 0 ? (
              <p className="text-gray-500 text-sm">0 Pessoas</p>
            ) : (
              stats.level2.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg mb-2"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: getAvatarColor(m.id) }}
                  >
                    {m.phone.slice(-2)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{m.phone}</p>
                    <p className="text-xs text-gray-500">
                      Desde {new Date(m.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
