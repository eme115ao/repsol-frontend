// src/pages/ConfirmarDeposito.tsx
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
  if (nome.includes("sol")) return "/assets/bancos/sol.png";
  if (nome.includes("keve")) return "/assets/bancos/keve.png";
  return "/assets/bancos/default.png";
}

export default function ConfirmarDeposito() {
  const navigate = useNavigate();
  const location = useLocation();

  const banco: Banco | undefined = location.state?.banco;

  const [valor, setValor] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [comprovativoBase64, setComprovativoBase64] = useState<string | null>(null);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!banco) {
    return (
      <div className="p-6 text-center bg-slate-50 min-h-screen">
        <p className="text-red-600 font-semibold">Nenhum banco selecionado.</p>
        <button
          onClick={() => navigate("/deposito")}
          className="mt-4 bg-gray-200 px-4 py-2 rounded-xl"
        >
          Voltar
        </button>
      </div>
    );
  }

  /* ============================================================================
     UPLOAD DO COMPROVATIVO
  ============================================================================ */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (!f) {
      setPreview(null);
      setComprovativoBase64(null);
      return;
    }

    setPreview(URL.createObjectURL(f));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setComprovativoBase64(reader.result);
      }
    };
    reader.readAsDataURL(f);
  }

  /* ============================================================================
     CONFIRMAR DEPÓSITO — sem tela branca, sem alertas feios
  ============================================================================ */
  async function confirmarDeposito() {
    setMsg("");
    setError("");

    if (!valor || Number(valor) <= 0) {
      setError("Insira o valor do depósito.");
      return;
    }
    if (!file || !comprovativoBase64) {
      setError("Envie o comprovativo.");
      return;
    }

    try {
      setLoading(true);

      await apiPost("/transactions/deposit", {
        amount: Number(valor),
        comprovativo: comprovativoBase64,
      });

      setMsg("Depósito enviado com sucesso!");

      setTimeout(() => {
        navigate("/deposito/sucesso");
      }, 1000);

    } catch (err: any) {
      setError(err.message || "Erro ao enviar depósito.");
    } finally {
      setLoading(false);
    }
  }

  const logo = getBankLogo(banco.nome);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">

      {msg && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded-lg text-center font-semibold">
          {msg}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center font-semibold">
          {error}
        </div>
      )}

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Confirmar Depósito
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200 space-y-6">

        {/* BANCO */}
        <div className="p-5 rounded-xl bg-slate-100 border border-slate-300 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              className="w-14 h-14 rounded-xl border shadow-sm object-contain"
            />

            <div>
              <p className="text-xl font-bold text-gray-900">{banco.nome}</p>
              <p className="text-gray-700">
                Titular: <span className="font-semibold">{banco.titular}</span>
              </p>
            </div>
          </div>

          <p className="text-gray-700">
            Conta:{" "}
            <span className="font-semibold select-all">{banco.conta}</span>
          </p>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `Banco: ${banco.nome}\nConta: ${banco.conta}\nTitular: ${banco.titular}`
              )
            }
            className="mt-3 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl shadow hover:bg-orange-600 transition"
          >
            <FaCopy /> Copiar dados
          </button>
        </div>

        {/* VALOR */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Valor do Depósito (Kz)
          </label>
          <input
            type="number"
            placeholder="Ex: 9000"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full mt-1 p-3 bg-slate-50 border border-gray-300 rounded-xl"
          />
        </div>

        {/* COMPROVATIVO */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Enviar Comprovativo
          </label>

          <label className="w-full mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-5 text-gray-600 cursor-pointer hover:border-orange-500 transition">
            <FaUpload className="text-3xl mb-2" />
            <span className="text-sm">{file ? file.name : "Escolher ficheiro"}</span>

            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Pré-visualização:</p>
              <img
                src={preview}
                className="w-full rounded-xl shadow-md border"
              />
            </div>
          )}
        </div>

        {/* CONFIRMAR */}
        <button
          disabled={loading}
          onClick={confirmarDeposito}
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow hover:bg-orange-600 transition disabled:bg-gray-400"
        >
          {loading ? "Enviando..." : "Confirmar Depósito"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-200 py-3 rounded-xl text-gray-800"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
