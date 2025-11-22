// src/services/investmentService.ts
import { apiPost, apiGet } from "./api";

export async function getUserInvestments(userId: number) {
  return apiGet(`/products/user/${userId}`);
}

export async function invest(userId: number, productId: number, amount: number) {
  return apiPost("/products/invest", { userId, productId, amount });
}
