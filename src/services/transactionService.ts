// src/services/transactionService.ts
import api from "./api"; // ✅ base central (Render + Local)

// 🔹 Criar uma nova transação (depósito ou saque)
export const createTransaction = async (
  type: "deposito" | "saque",
  amount: number
) => {
  const { data } = await api.post("/transactions", { type, amount });
  return data;
};

// 🔹 Listar todas as transações do usuário logado
export const getUserTransactions = async () => {
  const { data } = await api.get("/transactions");
  return data;
};

// 🔹 Listar todas as transações (apenas admin)
export const getAllTransactions = async () => {
  const { data } = await api.get("/admin/transacoes");
  return data;
};

// 🔹 Aprovar uma transação (painel admin)
export const approveTransaction = async (id: number) => {
  const { data } = await api.post(`/admin/transacoes/aprovar/${id}`);
  return data;
};

// 🔹 Rejeitar uma transação (painel admin)
export const rejectTransaction = async (id: number) => {
  const { data } = await api.post(`/admin/transacoes/rejeitar/${id}`);
  return data;
};
