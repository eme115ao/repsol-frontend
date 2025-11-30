// src/services/historicoService.ts
import { apiGet } from "./api";

export async function listarHistoricoCompleto(userId: number) {
  return apiGet(`/api/transactions/historico/${userId}`);
}
