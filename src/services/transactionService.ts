import { apiPost, apiGet, endpoints } from "./api";

export async function deposit(amount: number, bank: string) {
  return apiPost(endpoints.deposit, { amount, bank });
}

export async function withdraw(amount: number) {
  return apiPost(endpoints.withdraw, { amount });
}

export async function getHistory() {
  return apiGet(endpoints.history);
}
