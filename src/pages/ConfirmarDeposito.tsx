// src/pages/ConfirmarDeposito.tsx
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";

type Bank = {
  name: string;
  iban: string;
  titular: string;
};

const BANKS: Bank[] = [
  { name: "Banco A", iban: "AO00 0000 0000 0000 0000", titular: "Repsol - Banco A" },
  { name: "Banco B", iban: "AO11 1111 1111 1111 1111", titular: "Repsol - Banco B" },
  { name: "Banco C", iban: "AO22 2222 2222 2222 2222", titular: "Repsol - Banco C" },
  { name: "Banco D", iban: "AO33 3333 3333 3333 3333", titular: "Repsol - Banco D" },
  { name: "Banco E", iban: "AO44 4444 4444 4444 4444", titular: "Repsol - Banco E" },
  { name: "Banco F", iban: "AO55 5555 5555 5555 5555", titular: "Repsol - Banco F" },
];

export default function ConfirmarDeposito() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { amount } = (loc.state as any) || { amount: 0 };

  const userId = Number(localStorage.getItem("userId") || 0);

  const displayAmount = useMemo(() => {
    return Number(amount || 0).toLocaleString();
  }, [amount]);

  if (!amount || Number(amount) <= 0) {
    return <div className="p-6">Valor do depósito não encontrado. Volte e tente novamente.</div>;
  }

  async function informDeposit(bank: Bank) {
    try {
      // registra pedido de depósito no backend para auditoria/manual confirmation
      await apiPost("/deposit", {
        userId,
        amount,
        bankName: bank.name,
        bankIban: bank.iban,
        bankTitular: bank.titular,
        status: "pending"
      });

      alert("Pedido registrado. Envie o comprovante e aguarde confirmação.");
      navigate("/dashboard");
    } catch (err: any) {
      alert("Erro ao informar depósito: " + (err.message || err));
    }
  }

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Confirme o Depósito</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-4">Valor a depositar: <strong>Kz {displayAmount}</strong></p>
        <p className="mb-4 text-sm text-gray-600">Faça a transferência para um dos bancos abaixo. Coloque o seu número de telemóvel no campo referência/descrição.</p>

        <div className="space-y-3">
          {BANKS.map((b, i) => (
            <div key={i} className="border rounded p-3 flex justify-between items-center">
              <div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-sm">IBAN: <code>{b.iban}</code></div>
                <div className="text-sm">Titular: {b.titular}</div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  className="bg-gray-200 px-3 py-1 rounded"
                  onClick={() => { navigator.clipboard.writeText(`${b.iban} — ${b.titular}`); alert("Dados copiados."); }}
                >
                  Copiar
                </button>

                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => informDeposit(b)}
                >
                  Informar Depósito
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button className="px-4 py-2 bg-gray-200 rounded mr-2" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
