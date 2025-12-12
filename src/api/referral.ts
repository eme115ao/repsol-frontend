// src/api/referral.ts
import { apiGet } from "../services/api";

/* ROTAS OFICIAIS DO BACKEND
   /api/referral/summary
   /api/referral/invite-code
   /api/referral/invite-count
   /api/referral/level1
   /api/referral/level2
   /api/referral/stats
*/

// ===============================
// 1. RESUMO COMPLETO
// ===============================
export async function getReferralSummary() {
  return await apiGet("/referral/summary");
}

// ===============================
// 2. Código de convite
// ===============================
export async function getInviteCode() {
  const res = await apiGet<{ inviteCode: string }>("/referral/invite-code");
  return res.inviteCode || "";
}

// ===============================
// 3. Contagem de nível 1
// ===============================
export async function getInviteCount() {
  const res = await apiGet<{ total: number }>("/referral/invite-count");
  return res.total ?? 0;
}

// ===============================
// 4. Nível 1
// ===============================
export async function getTeamLevel1() {
  return await apiGet<any[]>("/referral/level1");
}

// ===============================
// 5. Nível 2
// ===============================
export async function getTeamLevel2() {
  return await apiGet<any[]>("/referral/level2");
}

// ===============================
// 6. Estatísticas (hoje, ontem, total)
// ===============================
export async function getReferralStats() {
  return await apiGet("/referral/stats");
}
