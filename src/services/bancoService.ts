// src/services/bancoService.ts
import { apiGet, apiPost } from "./api";

/**
 * Recupera bancos da empresa (usados para DEPÓSITO).
 */
export async function listarBancosEmpresa() {
  return apiGet("/api/bancos/empresa");
}

/**
 * Lista bancos cadastrados pelo usuário (para SAQUES).
 */
export async function listarBancosUsuario(userId: number) {
  return apiGet(`/api/bancos/usuario/${userId}`);
}

/**
 * Registra novo banco do usuário para saques.
 */
export async function cadastrarBancoUsuario(
  userId: number,
  banco: string,
  titular: string,
  conta: string
) {
  return apiPost("/api/bancos/usuario", {
    userId,
    banco,
    titular,
    conta,
  });
}
