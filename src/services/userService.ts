// src/services/userService.ts
import { apiGet } from "./api";

/**
 * Retorna o perfil completo do usuário:
 * - id
 * - phone
 * - saldo
 * - inviteCode
 * - createdAt
 * - etc.
 */
export async function getUserProfile() {
  return apiGet("/api/dashboard/profile");
}

/**
 * Retorna informações financeiras do dashboard:
 * - totalInvestido
 * - rendimentoTotal
 * - produtosAtivos
 * - operações recentes
 */
export async function getUserDashboard() {
  return apiGet("/api/dashboard");
}

/**
 * Retorna os produtos que o usuário comprou (UserProduct)
 */
export async function getUserProducts() {
  return apiGet("/api/dashboard/products");
}
