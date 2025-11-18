// src/services/adminService.ts
import api from "./api";

// 🔹 Estatísticas gerais do painel admin
export const getAdminStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

// 🔹 Listar todas as transações (depósitos e saques)
export const listarTransacoes = async () => {
  const { data } = await api.get("/admin/transacoes");
  return data;
};

// 🔹 Aprovar transação
export const aprovarTransacao = async (id: number) => {
  const { data } = await api.post(`/admin/transacoes/aprovar/${id}`);
  return data;
};

// 🔹 Rejeitar transação
export const rejeitarTransacao = async (id: number) => {
  const { data } = await api.post(`/admin/transacoes/rejeitar/${id}`);
  return data;
};

// 🔹 Listar todos os usuários
export const listarUsuarios = async () => {
  const { data } = await api.get("/admin/usuarios");
  return data;
};

// 🔹 Atualizar saldo de um usuário
export const atualizarSaldoUsuario = async (userId: number, novoSaldo: number) => {
  const { data } = await api.post("/admin/atualizar-saldo", { userId, novoSaldo });
  return data;
};

// 🔹 Remover usuário
export const deletarUsuario = async (userId: number) => {
  const { data } = await api.delete(`/admin/usuarios/${userId}`);
  return data;
};
