// src/services/bancoUsuariosService.ts
import { apiGet, apiPost } from "./api";

const BASE = "/api/bancos/usuario";

export async function listarBancosUsuario(userId: number) {
  return apiGet(`${BASE}/${userId}`);
}

export async function adicionarBancoUsuario(data: {
  userId: number;
  banco: string;
  titular: string;
  conta: string;
}) {
  return apiPost(`${BASE}/criar`, data);
}

// O backend NÃO usa DELETE real, sempre POST
export async function removerBancoUsuario(id: number) {
  return apiPost(`${BASE}/remover`, { id });
}
