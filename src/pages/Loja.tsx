// src/pages/Loja.tsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

type LojaItem = {
  id: number;
  nome: string;
  descricao?: string;
  preco?: number;
  imagem?: string;
};

export default function Loja() {
  const [items, setItems] = useState<LojaItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Assumi endpoint /loja
        const data = await apiGet<LojaItem[]>("/loja");
        setItems(data);
      } catch (err) {
        console.error("Erro loja", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (!items || items.length === 0) return <div>Nenhum produto disponível.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Loja</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white p-4 rounded shadow">
            {it.imagem && <img src={it.imagem} alt={it.nome} className="w-full h-40 object-cover rounded mb-3" />}
            <h3 className="font-semibold">{it.nome}</h3>
            <p className="text-sm text-gray-600">{it.descricao}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-orange-600 font-bold">{it.preco ? `${it.preco} KZ` : ""}</span>
              <button
                className="bg-orange-600 text-white px-3 py-2 rounded"
                onClick={async () => {
                  try {
                    await apiPost("/loja/buy", { itemId: it.id });
                    alert("Compra solicitada.");
                  } catch (err: any) {
                    alert("Erro: " + (err?.message || err));
                  }
                }}
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
