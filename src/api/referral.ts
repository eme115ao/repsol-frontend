// src/api/referral.ts
import { apiGet } from "../services/api";

// BASE já contém /api, portanto:
// CORRETO → "/referral/team"
// ERRADO  → "/api/referral/team"

export async function getMyInviteCode(): Promise<string> {
  const res = await apiGet<{ code: string }>("/referral/my-code");
  return res.code;
}

export async function getInviteCount(): Promise<number> {
  const res = await apiGet<{ total: number }>("/referral/team-count");
  return res.total;
}

export async function getTeam(): Promise<any[]> {
  const res = await apiGet<any[]>("/referral/team");
  return Array.isArray(res) ? res : [];
}
