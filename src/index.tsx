// URL fixa do backend hospedado no Render
export const API_BASE = "https://repsol-backend-complete.onrender.com";

// GET
export async function apiGet(path: string) {
  const res = await fetch(API_BASE + path, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// POST
export async function apiPost(path: string, data?: any) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUT
export async function apiPut(path: string, data?: any) {
  const res = await fetch(API_BASE + path, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// UPLOAD (multipart/form-data)
export async function apiUpload(path: string, formData: FormData) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Endpoints centralizados
export const endpoints = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  dashboard: "/api/dashboard",
  products: "/api/products",
  invest: "/api/invest",
  deposit: "/api/deposit",
  withdraw: "/api/withdraw",
  referrals: "/api/referrals",
  profile: "/api/users",
};
