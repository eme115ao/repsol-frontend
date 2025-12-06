// src/pages/Convidar.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { FaWhatsapp, FaCopy, FaUsers } from "react-icons/fa";

export default function Convidar() {
  const [inviteCode, setInviteCode] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);

  const inviteURL = `${window.location.origin}/#/register?ref=${inviteCode}`;

  useEffect(() => {
    carregarCodigo();
  }, []);

  async function carregarCodigo() {
    try {
      const res = await apiGet("/referral/invite-code");

      if (res && res.inviteCode) {
        setInviteCode(res.inviteCode);
      }
    } catch (e) {
      console.error("Erro ao carregar código:", e);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(inviteURL);
    setCopyStatus(true);

    setTimeout(() => setCopyStatus(false), 1800);
  }

  function sendToWhatsApp() {
    const msg = `Junte-se à plataforma Repsol S.A e ganhe rendimentos diários! Cadastre-se com meu link: ${inviteURL}`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-6 pb-24 max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">
        Convidar Amigos
      </h1>

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 space-y-5">

        <div className="flex items-center gap-3">
          <FaUsers className="text-orange-600" size={30} />
          <p className="text-lg font-bold text-gray-800">
            Compartilhe e ganhe comissões
          </p>
        </div>

        {/* CÓDIGO */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Seu código de convite:</p>
          <div className="bg-slate-100 rounded-xl px-4 py-3 text-center font-bold text-gray-900 text-lg border">
            {inviteCode || "..."}
          </div>
        </div>

        {/* LINK */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Link de referência:</p>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 bg-slate-100 px-3 py-3 rounded-xl border text-gray-700 text-sm"
              value={inviteURL}
              readOnly
            />

            <button
              onClick={copyLink}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-xl shadow active:scale-95 transition"
            >
              <FaCopy size={18} />
            </button>
          </div>

          {copyStatus && (
            <p className="text-green-600 text-sm mt-2 text-center">
              Link copiado com sucesso!
            </p>
          )}
        </div>

        {/* WHATSAPP */}
        <button
          onClick={sendToWhatsApp}
          className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-lg text-lg active:scale-95 transition flex items-center justify-center gap-2"
        >
          <FaWhatsapp size={22} />
          Enviar pelo WhatsApp
        </button>
      </div>
    </div>
  );
}
