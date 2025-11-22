// src/services/historicoService.ts
import { apiGet } from "./api";

export async function getHistorico(userId: number) {
  return apiGet(`/transactions/history/${userId}`);
}
