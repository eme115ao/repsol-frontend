import { apiGet, endpoints } from "./api";

export async function adminDashboard() {
  return apiGet(`${BASE_URL}/admin/dashboard`);
}

export async function adminTransactions() {
  return apiGet(`${BASE_URL}/admin/transactions`);
}
