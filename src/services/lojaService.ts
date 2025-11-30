// src/services/lojaService.ts
import { apiGet } from "./api";

export async function listarProdutosDaLoja(userId: number) {
  return apiGet(`/api/investments/user/${userId}`);
}
