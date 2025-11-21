// src/services/referralService.ts
import { apiGet } from "./api";

export type ReferralItem = {
  id: number;
  referredUser?: {
    id: number;
    phone: string | null;
    createdAt: string;
  } | null;
};

const BASE = "/referral";

export async function getReferrals(userId: number | string): Promise<ReferralItem[]> {
  return apiGet<ReferralItem[]>(`${BASE}/${userId}`);
}

/**
 * Monta link de convite REAL baseado na configuração atual
 * Exemplo final gerado:
 * https://repsol-ag.netlify.app/register?ref=12345
 */
export function buildInviteLink(userId: number | string, inviteCode?: string) {
  const base =
    (import.meta.env.VITE_APP_URL as string) ||
    window.location.origin;

  // Se houver inviteCode, priorizamos:
  if (inviteCode) {
    return `${base}/register?ref=${encodeURIComponent(inviteCode)}`;
  }

  // Caso não tenha inviteCode, usamos o ID mesmo
  return `${base}/register?ref=${encodeURIComponent(String(userId))}`;
}
