import React, { useEffect, useState } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";

export default function Equipa() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState("...");
  const [total, setTotal] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const inviteURL = `${window.location.origin}/#/register?invite=${inviteCode}`;

  useEffect(() => {
    async function load() {
      try {
        const codeRes = await apiGet("/api/referral/my-code");
        setInviteCode(codeRes.code || "N/A");

        const totalRes = await apiGet("/api/referral/invite-count");
        setTotal(totalRes.total || 0);
      } catch (err) {
        console.error("Erro ao carregar dados da equipa:", err);
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-28">

      <header className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-20">
        <ArrowLeft
          size={22}
          onClick={() => navigate("/minha")}
          className="cursor-pointer text-gray-700 active:scale-90 transition"
        />
        <h1 className="text-lg font-bold">Minha Equipa</h1>
      </header>

      <div className="p-4 max-w-[550px] mx-auto mt-2">

        {/* CONVITES */}
        <div className="bg-white shadow rounded-xl p-5 mb-6">
          <p className="text-gray-600 text-sm mb-2">Seu código de convite:</p>

          <input
            value={inviteCode}
            readOnly
            className="w-full bg-gray-100 px-3 py-2 rounded-lg text-center font-semibold"
          />

          <p className="text-gray-600 text-sm mt-4 mb-1">Link de convite:</p>

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

        {/* TOTAL DE PESSOAS */}
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-600 text-sm mb-1">Total de convidados:</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

      </div>
    </div>
  );
}
