// src/services/authService.ts
import api from "./api"; // ✅ Importa do arquivo correto (src/services/api.ts)

// 🔹 Login de usuário
export const login = async (phone: string, password: string) => {
  const { data } = await api.post("/auth/login", { phone, password });

  // Armazena token e dados do usuário localmente
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// 🔹 Registro de novo usuário
export const register = async (phone: string, password: string) => {
  const { data } = await api.post("/auth/register", { phone, password });
  return data;
};

// 🔹 Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
