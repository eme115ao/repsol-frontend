// src/pages/Equipa.tsx
import React, { useEffect, useState } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";

interface LevelUser {
  id: number;
  phone: string;
  createdAt: string;
}

interface StatsResponse {
  commissionsToday: number;
  commissionsYesterday: number;
  totalCommissions: number;
}

export default function Equipa() {
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");
  const [inviteCount, setInviteCount] = useState(0);
  const [level1, setLevel1] = useState<LevelUser[]>([]);

  const [stats, setStats] = useState<StatsResponse>({
    commissionsToday: 0,
    commissionsYesterday: 0,
    totalCommissions: 0
  });

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const inviteURL = `${window.location.origin}/#/register?ref=${inviteCode}`;

  useEffect(() => {
    async function load() {
      try {
        const codeRes = await apiGet("/referral/invite-code");
        setInviteCode(codeRes.inviteCode || "");

        const countRes = await apiGet("/referral/invite-count");
        setInviteCount(countRes.total || 0);

        const listRes = await apiGet("/referral/");
        setLevel1(Array.isArray(listRes) ? listRes : []);

        const statsRes = await apiGet("/referral/stats");
        setStats(statsRes);
      } catch (err) {
        console.error("Erro carregando equipa:", err);
      }
    }
    load();
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(inviteURL);
    setCopyStatus("copied");
    setTimeout(() => setCopyStatus("idle"), 1500);
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28">

      {/* HEADER */}
      <header className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-20 border-b border-slate-200">
        <ArrowLeft
          size={22}
          onClick={() => navigate("/minha")}
          className="cursor-pointer text-gray-700 active:scale-90 transition"
        />
        <h1 className="text-lg font-bold">Minha Equipa</h1>
      </header>

      <div className="p-4 max-w-md mx-auto mt-3">

        {/* CARDS DE ESTATISTICAS */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-blue-600 font-medium">Comissões Hoje</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {stats.commissionsToday.toFixed(2)}
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-indigo-600 font-medium">Comissões Ontem</p>
            <p className="text-2xl font-bold text-indigo-700 mt-1">
              {stats.commissionsYesterday.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-700 font-medium">Total de Comissões</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalCommissions.toFixed(2)}
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-orange-700 font-medium">Total de Membros</p>
            <p className="text-2xl font-bold text-orange-800 mt-1">
              {inviteCount}
            </p>
          </div>
        </div>

        {/* CÓDIGO + LINK */}
        <div className="bg-white border shadow-sm rounded-xl p-5">
          <p className="text-gray-700 text-sm mb-2">Seu código de convite:</p>

          <input
            className="w-full bg-gray-100 px-3 py-2 rounded-lg text-center font-bold"
            value={inviteCode || "..."}
            readOnly
          />

          <div className="flex items-center gap-2 mt-3">
            <input
              className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm"
              value={inviteURL}
              readOnly
            />
            <button
              onClick={copyLink}
              className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg active:scale-95 transition"
            >
              <Copy size={18} />
            </button>
          </div>

          {copyStatus === "copied" && (
            <p className="text-green-600 text-sm mt-2 text-center">
              Link copiado!
            </p>
          )}
        </div>

        {/* NÍVEL 1 */}
        <div className="bg-white border shadow-sm rounded-xl p-5 mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Tamanho da Equipa
          </h3>
          <p className="text-gray-700 text-sm">
            Agente Nível 1: <strong>{level1.length} pessoas</strong>
          </p>
        </div>

      </div>
    </div>
  );
}
