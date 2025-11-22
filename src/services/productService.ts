// src/services/productService.ts
import { apiGet } from "./api";

export async function getAllProducts() {
  return apiGet("/products");
}

export async function getProductById(id: number) {
  return apiGet(`/products/${id}`);
}
