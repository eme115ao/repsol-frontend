// src/services/api.ts
import axios from "axios";

// ============================================================
// BASE URL — definida no .env (SEM adicionar /api no código)
// ============================================================
const API_URL = import.meta.env.VITE_API_URL;

// Instância Axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

// ============================================================
// Extrair mensagens de erro
// ============================================================
function extractError(err: any): string {
  if (err?.response?.data?.error) return err.response.data.error;
  if (err?.response?.data?.message) return err.response.data.message;
  if (typeof err?.response?.data === "string") return err.response.data;
  return "Erro inesperado na requisição";
}

// ============================================================
// TOKEN
// ============================================================
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ============================================================
// GET
// ============================================================
export async function apiGet<T = any>(url: string): Promise<T> {
  try {
    const res = await api.get<T>(url, { headers: getAuthHeaders() });
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

// ============================================================
// POST
// ============================================================
export async function apiPost<T = any>(url: string, body?: any): Promise<T> {
  try {
    const res = await api.post<T>(url, body, { headers: getAuthHeaders() });
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

// ============================================================
// PUT
// ============================================================
export async function apiPut<T = any>(url: string, body?: any): Promise<T> {
  try {
    const res = await api.put<T>(url, body, { headers: getAuthHeaders() });
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

// ============================================================
// UPLOAD (multipart/form-data)
// ============================================================
export async function apiUpload<T = any>(
  url: string,
  formData: FormData
): Promise<T> {
  try {
    const res = await api.post<T>(url, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

// ============================================================
// ENDPOINTS OFICIAIS — SEM /api
// ============================================================
export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",

  dashboard: "/dashboard",

  products: "/products",
  productId: (id: string | number) => `/products/${id}`,

  investments: "/investments",
  invest: "/investments",

  deposit: "/transactions/deposit",
  withdraw: "/transactions/withdraw",

  // CORRIGIDO DEFINITIVO
  allTransactions: "/transactions",

  empresaBancos: "/banco/empresa",

  referralStats: "/referral",
  myReferralCode: "/referral/my-code",

  profile: "/users",
  me: "/auth/me",
};
