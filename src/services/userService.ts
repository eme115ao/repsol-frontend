import { apiGet, apiPut, apiPost, endpoints } from "./api";

export async function getUser() {
  return apiGet(endpoints.user);
}

export async function updateUserBank(bankData: any) {
  return apiPut(endpoints.updateUserBank, bankData);
}
