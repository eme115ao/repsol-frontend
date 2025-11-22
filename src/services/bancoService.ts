// src/services/bancoService.ts
import { apiGet, apiPut } from "./api";

export async function getBanco(userId: number) {
  return apiGet(`/banco/${userId}`);
}

export async function updateBanco(
  userId: number,
  data: { nome: string; titular: string; conta: string; endereco?: string }
) {
  return apiPut(`/banco/${userId}`, data);
}
