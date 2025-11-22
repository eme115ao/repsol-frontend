// src/services/lojaService.ts
import { apiGet, apiPost } from "./api";

export async function getLojaItems() {
  return apiGet("/loja");
}

export async function buyItem(itemId: number) {
  return apiPost("/loja/buy", { itemId });
}
