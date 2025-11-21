// src/services/api.ts
// Cliente HTTP usado pelo frontend Repsol

const BASE =
  (import.meta.env.VITE_API_URL as string) ||
  "https://repsol-backend-complete.onrender.com/api";

function getToken() {
  return localStorage.getItem("token") || "";
}

function buildHeaders(extra?: Record<string, string>) {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {})
  };
}

async function handle(res: Response) {
  let data = null;

  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.error || `Erro HTTP ${res.status}`);
  }

  return data;
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(BASE + path, {
    method: "GET",
    headers: buildHeaders()
  });
  return handle(res);
}

export async function apiPost<T = any>(
  path: string,
  body?: any
): Promise<T> {
  const res = await fetch(BASE + path, {
    method: "POST",
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });
  return handle(res);
}

export async function apiPut<T = any>(
  path: string,
  body?: any
): Promise<T> {
  const res = await fetch(BASE + path, {
    method: "PUT",
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });
  return handle(res);
}

export async function apiDelete<T = any>(path: string): Promise<T> {
  const res = await fetch(BASE + path, {
    method: "DELETE",
    headers: buildHeaders()
  });
  return handle(res);
}
