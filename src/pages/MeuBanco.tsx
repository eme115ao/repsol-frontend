import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import { FaUniversity, FaUser, FaHashtag } from "react-icons/fa";

export default function MeuBanco() {
  const [banco, setBanco] = useState("");
  const [conta, setConta] = useState("");
  const [titular, setTitular] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // ==========================================================
  // CARREGAR BANCO DO USUÁRIO
  // ==========================================================
  useEffect(() => {
    carregarBanco();
  }, []);

  async function carregarBanco() {
    try {
      const res = await apiGet("/banco/usuario");

      if (res && res.bancos && res.bancos.length > 0) {
        const ultimo = res.bancos[0];
        setBanco(ultimo.banco || "");
        setConta(ultimo.conta || "");
        setTitular(ultimo.titular || "");
      }
    } catch (e) {
      console.warn("Nenhuma conta cadastrada.");
    }
  }

  // ==========================================================
  // VALIDAÇÕES DO FORMULÁRIO
  // ==========================================================
  function validar() {
    setError("");

    if (!banco.trim()) return setError("O banco é obrigatório.");
    if (!conta.trim()) return setError("O número da conta é obrigatório.");

    if (!/^[0-9]{12,21}$/.test(conta))
      return setError("A conta deve ter entre 12 e 21 dígitos numéricos.");

    if (!titular.trim())
      return setError("O titular é obrigatório.");

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/i.test(titular))
      return setError("O titular deve conter apenas letras.");

    return true;
  }

  // ==========================================================
  // SALVAR/CRIAR BANCO DO USUÁRIO
  // ==========================================================
  async function handleSave() {
    if (!validar()) return;

    try {
      setLoading(true);
      setMsg("");
      setError("");

      const body = {
        banco: banco.trim().toUpperCase(),
        conta: conta.trim(),
        titular: titular.trim().toUpperCase(),
      };

      const res = await apiPost("/banco/usuario", body);

      if (res && res.banco) {
        setMsg("Conta bancária salva com sucesso!");

        setTimeout(() => {
          window.location.href = "/#/minha";
        }, 1200);
      } else {
        setError("Erro inesperado ao salvar.");
      }
    } catch (e: any) {
      setError("Erro ao salvar: " + (e.message || "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // INTERFACE (UI)
  // ==========================================================
  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-6 pb-24 max-w-md mx-auto">

      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">
        Meu Banco
      </h1>

      {msg && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded-xl text-center font-semibold shadow">
          {msg}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-xl text-center font-semibold shadow">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200 space-y-5">

        {/* BANCO */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Banco
          </label>
          <div className="relative">
            <FaUniversity className="absolute left-3 top-3 text-gray-500" />
            <input
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
              className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 shadow-sm focus:ring-2 focus:ring-orange-400"
              placeholder="Ex: BAI, BFA, BIC..."
            />
          </div>
        </div>

        {/* CONTA */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Número da Conta / IBAN
          </label>
          <div className="relative">
            <FaHashtag className="absolute left-3 top-3 text-gray-500" />
            <input
              value={conta}
              maxLength={21}
              onChange={(e) => setConta(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 shadow-sm focus:ring-2 focus:ring-orange-400"
              placeholder="Somente números"
            />
          </div>
        </div>

        {/* TITULAR */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Titular da Conta
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              value={titular}
              onChange={(e) => setTitular(e.target.value)}
              className="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-3 shadow-sm focus:ring-2 focus:ring-orange-400"
              placeholder="Nome completo"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full text-white py-3 rounded-xl font-bold shadow-md text-lg transition-all ${
            loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700 active:scale-95"
          }`}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
