import { useEffect, useState } from "react";
import axios from "axios";

export default function Loja({ userId }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`/api/loja/${userId}`).then((res) => {
      setProdutos(res.data.data);
    });
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meus Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((p) => (
          <div className="border p-4 rounded shadow" key={p.id}>
            <h2 className="font-semibold">{p.nome}</h2>
            <p>Investido: {p.investido} KZ</p>
            <p>Rendimento acumulado: {p.rendimentoAcumulado} KZ</p>
            <p>Valor atual: {p.valorAtual} KZ</p>
            <p className="text-green-600">
              Rendimento diário: {p.rendimentoDiarioReal} KZ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
