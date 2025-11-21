import { apiGet, endpoints } from "./api";

export async function getTransactions() {
  return apiGet(endpoints.history);
}
