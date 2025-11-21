// src/pages/ProductList.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiGet("/api/products");
      setItems(res);
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Produtos</h1>

      {items.map((p) => (
        <Link
          key={p.id}
          to={`/produto/${p.id}`}
          className="block bg-white p-4 rounded-xl shadow hover:bg-gray-100 mb-3"
        >
          <div className="font-semibold">{p.nome}</div>
          <div className="text-sm text-gray-600">
            Mínimo: {p.valorMinimo.toLocaleString()} KZ
          </div>
        </Link>
      ))}
    </div>
  );
}
