// src/pages/Perfil.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPut, apiUpload } from "../services/api";

export default function Perfil() {
  const userId = Number(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [phone, setPhone] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await apiGet(`/users/${userId}`);

      setNome(res.nome || "");
      setPhone(res.phone || "");
      setFoto(res.foto || null);

      setLoading(false);
    })();
  }, [userId]);

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function salvarPerfil() {
    try {
      let fotoFinal = foto;

      if (uploadFile) {
        const form = new FormData();
        form.append("file", uploadFile);

        const up = await apiUpload("/upload/profile", form);
        fotoFinal = up.url;
      }

      await apiPut(`/users/${userId}`, {
        nome,
        foto: fotoFinal,
      });

      alert("Perfil atualizado!");
      window.location.reload();
    } catch {
      alert("Erro ao atualizar perfil");
    }
  }

  async function trocarSenha() {
    if (novaSenha !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (novaSenha.length < 4) {
      alert("Senha muito curta.");
      return;
    }

    await apiPut("/auth/change-pass", {
      userId,
      novaSenha,
    });

    alert("Senha alterada.");
    setNovaSenha("");
    setConfirmSenha("");
  }

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4">

      <h1 className="text-xl font-bold mb-4">Meu Perfil</h1>

      {/* FOTO */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={preview ?? foto ?? "/assets/user.png"}
          className="w-28 h-28 rounded-full border shadow"
        />

        <input type="file" className="mt-2" onChange={onFile} />
      </div>

      {/* DADOS */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <div>
          <label className="font-semibold text-sm">Nome</label>
          <input
            className="w-full border rounded p-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold text-sm">Telemóvel</label>
          <input
            className="w-full border rounded p-2 bg-gray-100"
            value={phone}
            disabled
          />
        </div>

        <button
          className="bg-orange-600 text-white w-full p-3 rounded"
          onClick={salvarPerfil}
        >
          Guardar alterações
        </button>
      </div>

      {/* SENHA */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-lg font-semibold">Alterar Senha</h2>

        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full border rounded p-2"
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          className="bg-black text-white w-full p-3 rounded"
          onClick={trocarSenha}
        >
          Alterar senha
        </button>
      </div>

    </div>
  );
}
