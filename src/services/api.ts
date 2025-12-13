// src/services/api.ts
import axios from "axios";

// ==============================================================
// BASE URL — definida no .env (SEM adicionar /api no código)
// ==============================================================
const API_URL = import.meta.env.VITE_API_URL;

// Instância Axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

// ==============================================================
// TOKEN
// ==============================================================
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ==============================================================
// GET — sempre retorna dados ou {}
// ==============================================================
export async function apiGet<T = any>(url: string): Promise<T> {
  try {
    const res = await api.get<T>(url, { headers: getAuthHeaders() });
    return res.data;
  } catch (err: any) {
    console.error("API GET ERROR:", err?.response?.data);
    return {} as T;
  }
}

// ==============================================================
// POST — retorna dados OU { errorCode, message }
// ==============================================================
export async function apiPost<T = any>(url: string, body?: any): Promise<T> {
  try {
    const res = await api.post<T>(url, body, { headers: getAuthHeaders() });
    return res.data;
  } catch (err: any) {
    const data = err?.response?.data;

    // 🔑 Padronização de erro
    if (data?.errorCode) {
      return {
        errorCode: data.errorCode,
        message: data.message,
      } as T;
    }

    console.error("API POST ERROR:", data);
    return {} as T;
  }
}

// ==============================================================
// PUT — mesmo padrão do POST
// ==============================================================
export async function apiPut<T = any>(url: string, body?: any): Promise<T> {
  try {
    const res = await api.put<T>(url, body, { headers: getAuthHeaders() });
    return res.data;
  } catch (err: any) {
    const data = err?.response?.data;

    if (data?.errorCode) {
      return {
        errorCode: data.errorCode,
        message: data.message,
      } as T;
    }

    console.error("API PUT ERROR:", data);
    return {} as T;
  }
}

// ==============================================================
// UPLOAD — mantém padrão
// ==============================================================
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
  } catch (err: any) {
    const data = err?.response?.data;

    if (data?.errorCode) {
      return {
        errorCode: data.errorCode,
        message: data.message,
      } as T;
    }

    console.error("API UPLOAD ERROR:", data);
    return {} as T;
  }
}

// ==============================================================
// ENDPOINTS
// ==============================================================
export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",

  dashboard: "/dashboard",

  products: "/products",
  productId: (id: string | number) => `/products/${id}`,

  investments: "/investments",

  deposit: "/transactions/deposit",
  withdraw: "/transactions/withdraw",

  empresaBancos: "/banco/empresa",

  referralStats: "/referral",
  myReferralCode: "/referral/my-code",

  profile: "/users",
  me: "/auth/me",
};
