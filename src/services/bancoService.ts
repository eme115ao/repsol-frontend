import { apiGet, apiPut, endpoints } from "./api";

export async function getBankInfo() {
  return apiGet(endpoints.user);
}

export async function updateBankInfo(data: any) {
  return apiPut(endpoints.updateUserBank, data);
}
