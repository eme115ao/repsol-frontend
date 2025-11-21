import { apiPost, endpoints } from "./api";

export async function loginUser(data: { phone: string; password: string }) {
  return apiPost(endpoints.login, data);
}

export async function registerUser(data: any) {
  return apiPost(endpoints.register, data);
}
