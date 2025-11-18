// src/services/investmentService.ts
import api from "./api"; // ✅ usa a base configurada (Render/local)

// 🔹 Criar um novo investimento
export const createInvestment = async (productId: number, valor: number) => {
  const { data } = await api.post("/investments", { productId, valor });
  return data;
};

// 🔹 Obter lista de investimentos ativos do usuário
export const getActiveInvestments = async () => {
  const { data } = await api.get("/investments/ativos");
  return data;
};

// 🔹 Obter histórico completo de investimentos (finalizados)
export const getInvestmentHistory = async () => {
  const { data } = await api.get("/investments/historico");
  return data;
};

// 🔹 Resgatar investimento (encerrar e devolver fundos ao saldo)
export const redeemInvestment = async (id: number) => {
  const { data } = await api.post(`/investments/resgatar/${id}`);
  return data;
};
