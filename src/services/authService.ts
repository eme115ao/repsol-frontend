import { apiPost } from "./api";

// LOGIN
export function login(phone: string, password: string) {
  return apiPost("/auth/login", { phone, password });
}

// REGISTER
export function registerUser(
  phone: string,
  password: string,
  inviteCode?: string
) {
  return apiPost("/auth/register", {
    phone,
    password,
    inviteCode
  });
}
