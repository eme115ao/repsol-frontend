// src/services/productService.ts
import api from "./api"; // ✅ Importa o axios configurado corretamente

// 🔹 Buscar lista de produtos disponíveis
export const getProducts = async () => {
  const { data } = await api.get("/investments/produtos");
  return data;
};

// 🔹 Buscar resumo financeiro do usuário
export const getSummary = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
