// src/services/adminService.ts
import { apiGet, apiPost } from "./api";

export async function adminListarTransacoesPendentes() {
  return apiGet("/api/transactions/pendentes");
}

export async function adminAprovarTransacao(id: number) {
  return apiPost(`/api/transactions/aprovar/${id}`);
}

export async function adminRejeitarTransacao(id: number) {
  return apiPost(`/api/transactions/rejeitar/${id}`);
}

export async function adminListarUsuarios() {
  return apiGet("/api/auth/users");
}

export async function adminDashboard() {
  return apiGet("/api/dashboard/admin");
}
