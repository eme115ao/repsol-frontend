import { apiGet } from "./api";

// Buscar estatísticas completas da equipa
export function getReferralStats() {
  return apiGet("/api/referral/stats");
}
