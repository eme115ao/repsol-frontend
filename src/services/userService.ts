// src/services/userService.ts
import api from "./api";

// 🔹 Obter perfil completo do usuário logado
export const getUserProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

// 🔹 Atualizar senha ou telefone do usuário
export const updateUserProfile = async (updateData: {
  phone?: string;
  password?: string;
}) => {
  const { data } = await api.put("/auth/profile", updateData);
  return data;
};

// 🔹 Obter informações bancárias do usuário
export const getUserBanco = async () => {
  const { data } = await api.get("/banco");
  return data;
};

// 🔹 Criar ou atualizar informações bancárias
export const updateUserBanco = async (bancoData: {
  nomeBanco: string;
  iban: string;
  nomeCompleto: string;
}) => {
  const { data } = await api.post("/banco", bancoData);
  return data;
};

// 🔹 Obter saldo atual do usuário
export const getSaldo = async () => {
  const { data } = await api.get("/dashboard");
  return data.resumo?.saldo || 0;
};

// 🔹 Atualizar manualmente o saldo (apenas admin)
export const updateSaldoAdmin = async (userId: number, novoSaldo: number) => {
  const { data } = await api.post("/admin/atualizar-saldo", { userId, novoSaldo });
  return data;
};
