// src/services/api.ts
// Helpers simples para chamadas ao backend usando fetch.
// Usa VITE_API_URL (definido no .env)

const BASE = import.meta.env.VITE_API_URL as string;

type HeadersInput = Record<string, string> | undefined;

function buildHeaders(headers?: HeadersInput) {
  const token = localStorage.getItem("token");

  const h: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers || {})
  };

  if (token) h["Authorization"] = `Bearer ${token}`;

  return h;
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: buildHeaders()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} — ${text}`);
  }

  return await res.json();
}

export async function apiPost<T = any>(
  path: string,
  body?: any,
  headers?: HeadersInput
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} failed: ${res.status} — ${text}`);
  }

  return await res.json();
}

export async function apiPut<T = any>(
  path: string,
  body?: any
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${path} failed: ${res.status} — ${text}`);
  }

  return await res.json();
}

export async function apiDelete<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: buildHeaders()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DELETE ${path} failed: ${res.status} — ${text}`);
  }

  return await res.json();
}

/**
 * Upload de arquivos (foto de perfil)
 * NÃO usar JSON aqui.
 */
export async function apiUpload(path: string, formData: FormData): Promise<any> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
      // sem Content-Type -> browser define automaticamente
    },
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`UPLOAD ${path} failed: ${res.status} — ${text}`);
  }

  return await res.json();
}
