import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminTransacoes() {
  const [transacoes, setTransacoes] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/transacoes").then((res) => setTransacoes(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Transações</h1>
      {transacoes.length > 0 ? (
        <table className="w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th>ID</th>
              <th>Usuário</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr key={t.id} className="border-t text-center">
                <td>{t.id}</td>
                <td>{t.usuario?.phone}</td>
                <td>{t.valor} Kz</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma transação registrada.</p>
      )}
    </div>
  );
}
