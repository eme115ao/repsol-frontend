// src/services/transactionService.ts
import { apiGet, apiPost } from "./api";

/**
 * Registrar DEPÓSITO do usuário.
 * O depósito entra como status "pending" e será confirmado pelo admin.
 */
export async function registrarDeposito(
  userId: number,
  amount: number,
  bancoEmpresaId: number
) {
  return apiPost("/api/transactions/depositar", {
    userId,
    amount,
    bancoEmpresaId,
  });
}

/**
 * Registrar LEVANTAMENTO (saque) do usuário.
 * O saque também entra como pending até aprovação manual.
 */
export async function registrarLevantamento(
  userId: number,
  amount: number,
  bancoUsuarioId: number
) {
  return apiPost("/api/transactions/levantar", {
    userId,
    amount,
    bancoUsuarioId,
  });
}

/**
 * Histórico geral do usuário:
 * Depósitos + Saques + Investimentos.
 */
export async function listarHistorico(userId: number) {
  return apiGet(`/api/transactions/user/${userId}`);
}
