// src/pages/Deposito.tsx
import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Deposito() {
  const [bancos, setBancos] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiGet("/products/bancos");
        setBancos(res);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Depósito</h1>

      {bancos.map((b) => (
        <div
          key={b.id}
          className="p-4 mb-3 border rounded shadow bg-white"
        >
          <p><b>Banco:</b> {b.nome}</p>
          <p><b>Titular:</b> {b.titular}</p>
          <p><b>IBAN:</b> {b.conta}</p>
        </div>
      ))}
    </div>
  );
}
