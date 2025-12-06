// src/pages/Deposito.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

interface Banco {
  id: number;
  nome: string;
  titular: string;
  conta: string;
  iban?: string | null;
}

export default function Deposito() {
  const [bancos, setBancos] = useState<Banco[]>([]);

  /* ============================================================================
     CARREGAMENTO EM BACKGROUND — SEM TELA BRANCA, SEM LOADING
  ============================================================================ */
  useEffect(() => {
    async function load() {
      try {
        const res = await apiGet<any>("/banco/empresa");

        const lista: Banco[] = Array.isArray(res)
          ? res
          : Array.isArray(res.bancos)
          ? res.bancos
          : [];

        setBancos(lista);
      } catch (err) {
        console.error("Erro ao carregar bancos:", err);
      }
    }

    load(); // dispara sem bloquear renderização
  }, []);

  const bancoIcons: Record<string, string> = {
    BAI: "/assets/icons/bai.png",
    BFA: "/assets/icons/bfa.png",
    BIC: "/assets/icons/bic.png",
    ATLANTICO: "/assets/icons/atlantico.png",
    SOL: "/assets/icons/sol.png",
    KEVE: "/assets/icons/keve.png",
  };

  const defaultIcon = "/assets/icons/repsol-mini.png";

  return (
    <div className="px-4 py-6 max-w-xl mx-auto min-h-screen bg-slate-50">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">
        Depósito
      </h1>

      <p className="text-center text-gray-600 mb-6 text-sm">
        Escolha o banco para efetuar a transferência.
      </p>

      {/* Lista aparece imediatamente, vazia no início, sem loading */}
      {bancos.length === 0 && (
        <p className="text-center text-gray-400 text-sm">
          Nenhum banco disponível no momento.
        </p>
      )}

      <div className="space-y-5 mt-4">
        {bancos.map((b) => (
          <Link
            to="/deposito/confirmar"
            key={b.id}
            state={{ banco: b }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 flex items-center gap-5 transition hover:shadow-xl active:scale-[0.98]"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-300 flex items-center justify-center overflow-hidden shadow-inner">
              <img
                src={bancoIcons[b.nome] || defaultIcon}
                alt={b.nome}
                className="w-12 h-12 object-contain"
              />
            </div>

            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900">{b.nome}</p>
              <p className="text-sm text-gray-600">Titular: {b.titular}</p>
              <p className="text-sm font-semibold text-gray-800">{b.conta}</p>
            </div>

            <div className="text-gray-400 text-xl">›</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
