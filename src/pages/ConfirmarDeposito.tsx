import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";
import { FaCopy, FaUpload } from "react-icons/fa";

interface Banco {
  id: number;
  nome: string;
  titular: string;
  conta: string;
}

function getBankLogo(bankName: string) {
  const nome = bankName.toLowerCase();
  if (nome.includes("bai")) return "/assets/bancos/bai.png";
  if (nome.includes("bfa")) return "/assets/bancos/bfa.png";
  if (nome.includes("bic")) return "/assets/bancos/bic.png";
  if (nome.includes("atl")) return "/assets/bancos/atlantico.png";
  return "/assets/bancos/default.png";
}

export default function ConfirmarDeposito() {
  const navigate = useNavigate();
  const location = useLocation();
  const banco: Banco | undefined = location.state?.banco;

  const [valor, setValor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [comprovativoBase64, setComprovativoBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!banco) {
    navigate("/deposito");
    return null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (!f) return;

    setPreview(URL.createObjectURL(f));
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setComprovativoBase64(reader.result);
      }
    };
    reader.readAsDataURL(f);
  }

  async function confirmarDeposito() {
    setError("");

    if (!valor || Number(valor) <= 0) {
      setError("Informe um valor válido.");
      return;
    }

    if (!comprovativoBase64) {
      setError("Envie o comprovativo.");
      return;
    }

    try {
      setLoading(true);

      await apiPost("/transactions/deposit", {
        amount: Number(valor),
        comprovativo: comprovativoBase64,
      });

      navigate("/deposito/sucesso");
    } catch (err: any) {
      setError(err.message || "Erro ao enviar depósito.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">

        <h1 className="text-2xl font-bold text-center text-gray-900">
          Confirmar Depósito
        </h1>

        {/* BANCO */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border">
          <img
            src={getBankLogo(banco.nome)}
            className="w-14 h-14 rounded-lg border object-contain"
          />
          <div>
            <p className="font-bold text-gray-900">{banco.nome}</p>
            <p className="text-sm text-gray-600">{banco.titular}</p>
          </div>
        </div>

        {/* CONTA */}
        <div className="bg-slate-50 p-4 rounded-xl border">
          <p className="text-sm text-gray-600 mb-1">Conta / IBAN</p>
          <p className="font-mono font-semibold break-all text-gray-900">
            {banco.conta}
          </p>

          <button
            onClick={() => navigator.clipboard.writeText(banco.conta)}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600"
          >
            <FaCopy /> Copiar
          </button>
        </div>

        {/* VALOR */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Valor do Depósito (Kz)
          </label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 25 000"
            className="w-full mt-1 p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* COMPROVATIVO */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Comprovativo
          </label>

          <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 cursor-pointer bg-slate-50 hover:border-orange-500">
            <FaUpload className="text-2xl text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {file ? file.name : "Selecionar ficheiro"}
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {preview && (
            <img
              src={preview}
              className="mt-3 w-full rounded-xl border"
            />
          )}
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {/* AÇÕES */}
        <button
          onClick={confirmarDeposito}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 disabled:bg-gray-400"
        >
          {loading ? "Enviando..." : "Confirmar Depósito"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-200 py-3 rounded-xl"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
