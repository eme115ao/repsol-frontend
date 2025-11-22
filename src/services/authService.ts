// src/services/authService.ts
import { apiPost } from "./api";

export async function login(phone: string, password: string) {
  return apiPost("/auth/login", { phone, password });
}

export async function register(phone: string, password: string, invitedBy: number | null) {
  return apiPost("/auth/register", { phone, password, invitedBy });
}
