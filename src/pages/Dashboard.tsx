// src/pages/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import { apiGet } from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

type ProdutoUser = {
  id: number;
  userId: number;
  productId: number;
  investido: number;
  rendimentoAcumulado: number;
  createdAt: string;
  product: {
    id: number;
    nome: string;
    imagem?: string | null;
  };
};

type DashboardResponse = {
  totalInvestido: number;
  totalRendimento: number;
  produtos: ProdutoUser[];
};

const COLORS = ["#FF7A00", "#FDBA74", "#F97316", "#F59E0B", "#D97706", "#FFA94D"];

function formatDate(d: string) {
  const dt = new Date(d);
  return dt.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "2-digit"
  });
}

export default function Dashboard() {
  const userId = Number(localStorage.getItem("userId"));
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet(`/dashboard/${userId}`);

        setData({
          totalInvestido: res.totalInvestido ?? 0,
          totalRendimento: res.totalRendimento ?? 0,
          produtos: res.products ?? res.produtos ?? []
        });
      } catch {
        setData(null);
      }
      setLoading(false);
    })();
  }, [userId]);

  const series = useMemo(() => {
    if (!data) return [];

    const map: Record<string, number> = {};

    data.produtos.forEach((p) => {
      const dia = formatDate(p.createdAt);
      map[dia] = (map[dia] || 0) + p.investido;
    });

    const arr = Object.keys(map).map((k) => ({
      date: k,
      value: map[k]
    }));

    arr.sort((a, b) => {
      const [da, ma] = a.date.split("/").map(Number);
      const [db, mb] = b.date.split("/").map(Number);
      return ma === mb ? da - db : ma - mb;
    });

    let acumulado = 0;
    return arr.map((e) => ({
      date: e.date,
      total: (acumulado += e.value)
    }));
  }, [data]);

  const pizza = useMemo(() => {
    if (!data) return [];

    const map = new Map<string, number>();

    data.produtos.forEach((p) => {
      const nome = p.product?.nome ?? `Produto ${p.productId}`;
      map.set(nome, (map.get(nome) || 0) + p.investido);
    });

    return Array.from(map).map(([name, value]) => ({
      name,
      value
    }));
  }, [data]);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (!data) return <div className="p-6">Erro ao carregar.</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="text-gray-500 text-sm">Total Investido</div>
          <div className="text-2xl font-bold">
            {data.totalInvestido.toLocaleString()} KZ
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <div className="text-gray-500 text-sm">Total em Rendimentos</div>
          <div className="text-2xl font-bold text-orange-600">
            {data.totalRendimento.toLocaleString()} KZ
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <div className="text-gray-500 text-sm">Nº Produtos</div>
          <div className="text-2xl font-bold">{data.produtos.length}</div>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Histórico de Investimentos</h2>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#FF7A00"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Distribuição por Produto</h2>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pizza}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pizza.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LISTAGEM */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Seus Investimentos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.produtos.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-xl shadow flex items-center gap-4"
            >
              <img
                src={`/assets/${p.product?.imagem ?? "placeholder.png"}`}
                className="w-20 h-14 rounded object-cover"
                onError={(e: any) =>
                  (e.currentTarget.src = "/assets/placeholder.png")
                }
              />

              <div className="flex-1">
                <div className="font-semibold">{p.product?.nome}</div>
                <div className="text-sm text-gray-500">
                  Investido: {p.investido.toLocaleString()} KZ
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Rendimento</div>
                <div className="font-bold text-orange-600">
                  {p.rendimentoAcumulado.toLocaleString()} KZ
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
