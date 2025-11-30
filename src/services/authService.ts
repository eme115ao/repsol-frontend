// src/services/authService.ts
import { apiPost } from "./api";

export async function login(phone: string, password: string) {
  return apiPost("/api/auth/login", { phone, password });
}

export async function register(
  phone: string,
  password: string,
  inviteCode?: string
) {
  return apiPost("/api/auth/register", {
    phone,
    password,
    inviteCode: inviteCode || null
  });
}
