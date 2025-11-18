import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductList() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    api.get("/produtos").then((res) => setProdutos(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Produtos</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{p.nome}</h2>
            <p>{p.descricao}</p>
            <p className="text-orange-600 font-bold">{p.valorMinimo} Kz</p>
          </div>
        ))}
      </div>
    </div>
  );
}
