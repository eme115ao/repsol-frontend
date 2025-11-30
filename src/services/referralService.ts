// src/services/referralService.ts
import { apiGet } from "./api";

/**
 * Lista usuários que foram indicados pelo usuário atual.
 */
export async function listarIndicados(userId: number) {
  return apiGet(`/api/referral/my/${userId}`);
}

/**
 * Gera link de convite profissional
 * Exemplo final:
 * https://meusite.com/register?ref=ABC123
 */
export function gerarLinkConvite(inviteCode: string | null) {
  const base =
    import.meta.env.VITE_APP_URL?.trim() ||
    window.location.origin;

  const code = encodeURIComponent(inviteCode || "");

  return `${base}/register?ref=${code}`;
}
