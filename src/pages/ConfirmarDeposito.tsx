import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";
import { FaCopy, FaUpload, FaCheckCircle } from "react-icons/fa";

interface Banco {
  id: number;
  nome: string;
  titular: string;
  conta: string;
}

// Função que resolve ícones reais dos bancos
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
  const location = useLocation();
  const navigate = useNavigate();

  const banco: Banco | undefined = location.state?.banco;

  const [valor, setValor] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [comprovativoBase64, setComprovativoBase64] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  if (!banco) {
    return (
      <div className="p-6 text-center">
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (!f) {
      setPreview(null);
      setComprovativoBase64(null);
      return;
    }

    // Preview da imagem
    setPreview(URL.createObjectURL(f));

    // conversão base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setComprovativoBase64(result);
      }
    };
    reader.readAsDataURL(f);
  }

  async function confirmarDeposito() {
    if (!valor || valor <= 0) {
      alert("Insira o valor do depósito.");
      return;
    }
    if (!file || !comprovativoBase64) {
      alert("Envie o comprovativo.");
      return;
    }

    setLoading(true);

    try {
      await apiPost("/api/transaction/deposit", {
        amount: valor,
        comprovativo: comprovativoBase64,
      });

      navigate("/deposito/sucesso");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao enviar depósito.");
    } finally {
      setLoading(false);
    }
  }

  const logo = getBankLogo(banco.nome);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fadeIn">
        Confirmar Depósito
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl p-6 border border-gray-200 space-y-6 animate-slideUp">

        {/* CARD DO BANCO */}
        <div className="p-5 rounded-xl bg-slate-100 border border-slate-300 shadow-sm transition hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              className="w-14 h-14 rounded-xl border shadow-sm bg-white object-contain"
            />

            <div>
              <p className="text-xl font-bold text-gray-900">{banco.nome}</p>
              <p className="text-gray-700 -mt-1">
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

        {/* VALOR DO DEPÓSITO */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Valor do Depósito (Kz)
          </label>
          <input
            type="number"
            placeholder="Ex: 9000"
            value={valor || ""}
            onChange={(e) => setValor(Number(e.target.value))}
            className="w-full mt-1 p-3 bg-slate-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* ENVIO DO COMPROVATIVO */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Enviar Comprovativo
          </label>

          <label className="w-full mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-5 text-gray-600 cursor-pointer hover:border-orange-500 transition">
            <FaUpload className="text-3xl mb-2" />
            <span className="text-sm">
              {file ? file.name : "Escolher ficheiro"}
            </span>

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

        {/* BOTÃO CONFIRMAR */}
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
