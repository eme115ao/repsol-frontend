// src/services/transactionService.ts
import { apiPost, apiGet } from "./api";

export async function deposit(userId: number, amount: number, comprovativo: string) {
  return apiPost("/transactions/deposit", { userId, amount, comprovativo });
}

export async function withdraw(userId: number, amount: number) {
  return apiPost("/transactions/withdraw", { userId, amount });
}

export async function getPendingWithdrawals() {
  return apiGet("/transactions/withdraw/pending");
}
