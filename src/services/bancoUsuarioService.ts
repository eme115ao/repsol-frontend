// src/services/bancoUsuariosService.ts
import { apiGet, apiPost, apiDelete } from "./api";

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

export async function removerBancoUsuario(id: number) {
  return apiDelete(`${BASE}/remover/${id}`);
}
