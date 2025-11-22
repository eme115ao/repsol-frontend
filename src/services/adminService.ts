// src/services/adminService.ts
import { apiGet } from "./api";

export async function getAllUsers() {
  return apiGet("/auth/all");
}

export async function getAllTransactions() {
  return apiGet("/transactions/all");
}

export async function getAllInvestments() {
  return apiGet("/products/all-users");
}
