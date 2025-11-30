// src/services/api.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

function extractError(err: any) {
  if (err?.response?.data?.error) {
    return err.response.data.error;
  }

  if (typeof err?.response?.data === "string") {
    return err.response.data;
  }

  return "Erro inesperado na requisição";
}

export async function apiGet<T = any>(url: string): Promise<T> {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get<T>(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res.data;
  } catch (err: any) {
    console.error("Erro GET:", err?.response?.data || err);
    throw new Error(extractError(err));
  }
}

export async function apiPost<T = any>(url: string, body?: any): Promise<T> {
  try {
    const token = localStorage.getItem("token");

    const res = await api.post<T>(url, body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res.data;
  } catch (err: any) {
    console.error("Erro POST:", err?.response?.data || err);
    throw new Error(extractError(err));
  }
}
