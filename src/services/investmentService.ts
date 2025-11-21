import { apiPost, apiGet, endpoints } from "./api";

export async function invest(productId: string) {
  return apiPost(`${endpoints.products}/${productId}/invest`, {});
}

export async function getUserInvestments() {
  return apiGet(`${endpoints.user}/investments`);
}
