// src/api/referral.ts
import { apiGet } from "../services/api";

/* 
  Todas as rotas oficiais do backend:

  GET /api/referral/my-code
  GET /api/referral/invite-count
  GET /api/referral/team
  GET /api/referral/team2
  GET /api/referral/stats
  GET /api/referral/team-summary
*/

// Meu código de convite
export async function getMyInviteCode(): Promise<string> {
  const res = await apiGet<{ code: string }>("/api/referral/my-code");
  return res.code;
}

// Total de convidados (nível 1)
export async function getInviteCount(): Promise<number> {
  const res = await apiGet<{ total: number }>("/api/referral/invite-count");
  return res.total || 0;
}

// Lista de membros nível 1
export async function getTeamLevel1(): Promise<any[]> {
  const res = await apiGet<any[]>("/api/referral/team");
  return Array.isArray(res) ? res : [];
}

// Lista de membros nível 2
export async function getTeamLevel2(): Promise<any[]> {
  const res = await apiGet<any[]>("/api/referral/team2");
  return Array.isArray(res) ? res : [];
}

// Estatísticas de comissões
export async function getCommissionStats(): Promise<{
  commissionsToday: number;
  commissionsYesterday: number;
  commissionsTotal: number;
}> {
  return await apiGet("/api/referral/stats");
}

// Depósitos e saques da equipe
export async function getTeamSummary(): Promise<{
  teamDeposits: number;
  teamWithdrawals: number;
}> {
  return await apiGet("/api/referral/team-summary");
}
